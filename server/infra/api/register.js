async function register(req, res) {
  const { username, password, displayName } = req;
  try {

    const accountResult = await registration.createAccount({ username, password });
    if (accountResult.failed()) {
      return this.fail(400, accountResult.error);
    }

    return this.ok('You have registered successfully. Check you email to verify your account.')

  } catch(e) {
    console.log(e);
  }
}