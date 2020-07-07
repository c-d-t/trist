const socketIo = require('socket.io');
const cookieParser = require('socket.io-cookie-parser');
const jwt = require('../../app/account/services/jwt');
let io = null;
class Sockets
{
  constructor(http)
  {
    io = socketIo(http);
    io.use(cookieParser());
    this._initSockets();
  }

  _emitEventToAccount(accountId, event, data)
  {
    io.to(accountId).emit(event, data);
  }

  _emitEventToAccounts(accountIds, event, data)
  {
    accountIds.foreach((accountId) => {
      io.to(accountId).emit(event, data);
    });
  }

  middleware()
  {
    return (req, _res, next) =>
    {
      req.emitEventToAccount = this._emitEventToAccount;
      req.emitEventToAccounts = this._emitEventToAccounts;
      next();
    }
  }

  _initSockets()
  {
    io.on('connect', (socket) => {
      const token = socket.request.cookies[jwt];
      const { accountId } = jwt.decode(token);
      if (!accountId)
      {
        return socket.disconnect();
      }
      socket.leaveAll();
      socket.join(accountId);
      socket.currentChannelId = null;

      socket.on('channel:listen', (data) => {
        socket.join(data.channelId);
      });

      socket.on('channel:ignore', (data) => {
        socket.leave(data.channelId);
      });
    });
  }
}

module.exports = Sockets;