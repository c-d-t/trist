class SocketController
{
  async run(data, socket)
  {
    this._socket = socket;
    await this.implementation(data);
  }

  async implementation()
  {
    throw new Error('ERR_NOT_IMPLEMENTED');
  }

  socketResponse()
  {
    this._socket.emit()
  }
}

module.exports = SocketController;
