const socketIo = require('socket.io');
const cookieParser = require('socket.io-cookie-parser');
const jwt = require('../../app/account/services/jwt');

class Sockets
{
  constructor(http)
  {
    this._io = socketIo(http);
    this._io.use(cookieParser());
    this._initSockets();
  }

  middleware()
  {
    return function(req, _res, next)
    {
      req.emitEventToAccount = function(accountId, event, data)
      {
        this._io.to(accountId).emit(event, data);
      };
      req.emitEventToAccounts = function(accountIds, event, data)
      {
        accountIds.foreach((accountId) => {
          this._io.to(accountId).emit(event, data);
        });
      };
      req.emit()
      next();
    }
  }

  _initSockets()
  {
    this._io.on('connect', (socket) => {
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
