class Controller
{
  async run(req, res)
  {
    this._res = res;
    await this.implementation(req);
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
        return this.failed();
      case 1:
        return this.unauthorized();
      case 3:
        return this.forbidden();
      case 4:
        return this.notFound();
      case 9:
        return this.conflict();
      case 22:
        return this.invalidFields();
      case 29:
        return this.tooMany();
    }
  }

  jsonResponse(code, data)
  {
    this._res.status(code);
    if (!data)
    {
      return this._res.end();
    }
    this._res.json({ data });
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
