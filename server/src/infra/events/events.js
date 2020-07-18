const socketIo = require('socket.io');
const cookieParser = require('socket.io-cookie-parser');
const jwt = require('../../app/account/services/jwt');
class EventEmitter
{
  constructor(messagingView)
  {
    this._messagingView = messagingView;
  }

  init(http)
  {
    this.io = socketIo(http);
    this.io.use(cookieParser());
    this.io.on('connect', (socket) => {
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

      socket.on('join-channel', ({ channelId }) => {
        socket.join(channelId);
      });

      socket.on('leave-channel', ({ channelId }) => {
        socket.leave(channelId);
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

  async messageCreated(channel, message)
  {
    const messageToSend = await this._messagingView.findMessageById(message.id);
    if (channel.type === 0 || channel.type === 1)
    {
      this.emitEventToAccounts(channel.participantIds, 'message-created', { message: messageToSend });
    }
    else
    {
      this.emitEventToAccount(channel.id, 'message-created', { message: messageToSend });
    }
  }
}

module.exports = EventEmitter;
