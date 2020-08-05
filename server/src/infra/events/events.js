const socketIo = require('socket.io');
const cookieParser = require('socket.io-cookie-parser');
const jwt = require('../../app/account/services/jwt');
const messagingController = require('../../app/messaging/use_cases');

class EventEmitter
{
  constructor(messagingView)
  {
    this._messagingView = messagingView;
    this._reconnections = {};
  }

  init(http)
  {
    this.io = socketIo(http, { wsEngine: 'ws' });
    this.io.use(cookieParser());
    this.io.on('connect', (socket) => {
      console.log('connected')
      // get jwt token
      const token = socket.request.cookies.jwt;
      const data = jwt.decode(token);
      if (!data)
      {
        return socket.disconnect();
      }
      const { id: accountId } = data;
      if (!accountId)
      {
        return socket.disconnect();
      }
      socket.join(accountId);

      // reconnect
      socket.on('socket:reconnected', ({ channelId }) => {
        if (this._reconnections[accountId])
        {
          socket.join(channelId);
          delete this._reconnections[accountId];
        }
      });

      // events
      socket.on('join-channel', ({ channelId }) => {
        socket.join(channelId);
      });

      socket.on('leave-channel', ({ channelId }) => {
        socket.leave(channelId);
      });

      socket.on('disconnect', () => {
        this._reconnections[accountId] = true;
        setTimeout(async () => {
          if (this._reconnections[accountId])
          {
            await messagingController.leavePrivateChannel.run({ thisAccount: { id: accountId }, query: { all: true } });
            delete this._reconnections[accountId];
          }
        }, 5000);
      });
    });
  }

  emitEventToAccount(accountId, event, data)
  {
    this.io.to(accountId).emit(event, data);
  }
  
  emitEventToAccounts(accountIds, event, data)
  {
    accountIds.forEach((accountId) => {
      this.io.to(accountId).emit(event, data);
    });
  }
  
  emitEventToRoom(roomId, event, data)
  {
    this.io.to(roomId).emit(event, data);
  }

  async messageCreated(channel, message)
  {
    const messageToSend = await this._messagingView.findMessageById(message.id);
    if (channel.type === 0 || channel.type === 1 || channel.type === 2)
    {
      this.emitEventToAccounts(channel.participantIds, 'message-created', { message: messageToSend });
    }
    else
    {
      this.emitEventToRoom(channel.id, 'message-created', { message: messageToSend });
    }
  }

  async connectionCreated(channel)
  {
    if (channel.type === 2)
    {
      const channelToSend = await this._messagingView.findPrivateChannelById(channel.id);
      this.emitEventToAccounts(channel.participantIds, 'connection-created', { channel: channelToSend });
    }
  }

  async connectionLost(channel)
  {
    if (channel.type === 2)
    {
      const channelToSend = await this._messagingView.findPrivateChannelById(channel.id);
      this.emitEventToAccounts(channel.participantIds, 'connection-lost', { channel: channelToSend });
    }
  }
}

module.exports = EventEmitter;
