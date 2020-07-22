class Application
{
  ok(data)
  {
    return { success: true, data };
  }

  /**
   * Returns as failed and the type of error.
   * @param {number} errorType 
   */
  makeError(errorType, message)
  {
    return { success: false, data: { errorType, message } };
  }

  failed(message)
  {
    return this.makeError(0, message);
  }

  unauthorized(message)
  {
    return this.makeError(2, message);
  }
  
  notFound(message)
  {
    return this.makeError(4, message)
  }
  
  conflict(message)
  {
    return this.makeError(9, message);
  }

  invalidFields(message)
  {
    return this.makeError(22, message);
  }

  tooMany(message)
  {
    return this.makeError(29, message);
  }
}

module.exports = Application;
