const cron = require('node-cron');

class CronJobs
{
  constructor(clearPrivateChannels)
  {
    this._clearPrivateChannels = clearPrivateChannels;
  }

  init()
  {
    cron.schedule("0 0 * * *", async () => this._clearPrivateChannels.run());
  }
}

module.exports = CronJobs;
