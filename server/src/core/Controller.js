class Controller
{
  async run(req, res)
  {
    this._res = res;
    try {
      await this.implementation(req);
    }
    catch (e)
    {
      console.log(e);
      return this.jsonResponse(400);
    }
  }

  async implementation()
  {
    throw new Error('ERR_NOT_IMPLEMENTED');
  }

  /**
   * @param {Object} data 
   * @param {Number} data.errorType
   * @param {string | Object} data.message
   */
  handleError(data)
  {
    switch (data.errorType)
    {
      case 0:
        this.failed(data.message);
        break
      case 2:
        this.unauthorized(data.message);
        break;
      case 3:
        this.forbidden(data.message);
        break;
      case 4:
        this.notFound(data.message);
        break;
      case 9:
        this.conflict(data.message);
        break;
      case 22:
        this.invalidFields(data.message);
        break;
      case 29:
        this.tooMany(data.message);
        break;
      default:
        this.failed(data.message);
    }
  }

  jsonResponse(code, data)
  {
    if (this._res.headersSent)
    {
      return;
    }
    if (!this._res)
    {
      return;
    }

    if (!data)
    {
      return this._res.status(code).end();
    }
    return this._res.status(code).json({ data });
  }

  ok(data)
  {
    this.jsonResponse(200, data);
  }

  created(name)
  {
    this.jsonResponse(201, { [name.toLowerCase()]: `${name} was created.` });
  }

  failed(errors)
  {
    this.jsonResponse(400, errors);
  }

  unauthorized(message)
  {
    this.jsonResponse(401, message || 'Unauthorized.');
  }

  forbidden(message)
  {
    this.jsonResponse(403, message || 'Forbidden.');
  }

  notFound(message)
  {
    this.jsonResponse(404, message || 'Not Found.');
  }

  conflict(message)
  {
    this.jsonResponse(409, message || 'Conflict');
  }

  invalidFields(message)
  {
    this.jsonResponse(422, message || 'Invalid Fields');
  }

  tooMany(message)
  {
    this.jsonResponse(429, message || 'Too Many Requests.');
  }
}

module.exports = Controller;
