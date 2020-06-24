class Controller
{
  async run(req, res)
  {
    this._res = res;
    await this.useCaseImpl(req);
  }

  async implementation(_req)
  {
    throw new Error('ERR_NOT_IMPLEMENTED');
  }

  jsonResponse(code, data)
  {
    this._res.status(code).end();
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

  unauthorized()
  {
    this.jsonResponse(401, { access: 'Unauthorized.' });
  }

  forbidden()
  {
    this.jsonResponse(403, { access: 'Forbidden.' });
  }

  notFound()
  {
    this.jsonResponse(404, { acess: 'Not Found.'});
  }

  tooMany()
  {
    this.jsonResponse(429, { access: 'Too Many Requests.'});
  }
}

module.exports = Controller;
