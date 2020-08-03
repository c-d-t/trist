const Application = require('../../../../core/Application');
const Notification = require('../../domain/notification');

class MakeNotificationApplication extends Application
{
  constructor(notificationRepo)
  {
    super();
    this._notificationRepo = notificationRepo;
  }

  /**
   * @param {Object} input
   * @param {string} input.thisAccountId
   * @param {string} input.otherAccountId
   * @param {string} input.type
   */
  async run(input)
  {
    const notificationResult = Notification.make({ senderId: input.thisAccountId, receiverId: input.otherAccountId, type: input.type });
    if (notificationResult.failed)
    {
      return this.failed();
    }
    const notification = notificationResult.value;

    await this._notificationRepo.save(notification);

    return this.ok();
  }
}

module.exports = MakeNotificationApplication;
