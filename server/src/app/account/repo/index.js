const memoryDB = [];

let incrementId = 0;

module.exports = {
  save: (account) => {
    account._id = incrementId++;
    memoryDB.push(account); 
    // memoryDB.forEach((account) => console.log(account));
    return account;
  },
  findByUsername: (username) => {
    const found = memoryDB.find((account) => {
      return account.username.equals(username);
    });
    return found;
  },
  findByEmail: (email) => memoryDB.find((account) => account.email.equals(email)),
};
