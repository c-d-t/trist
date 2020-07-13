class MessagingView
{
  constructor(userModel, messageModel)
  {
    this._userModel = userModel;
    this._messageModel = messageModel;
  }

  async findDmsByUserId(userId)
  {
    try {
      const { dmIds } = await this._userModel.findById(userId)
      .populate({
        path: 'dmIds',
        populate: {
          path: 'participantIds',
          match: { _id: { $ne: userId } },
          select: 'username displayName',
        },
        select: '-__v',
      });

      const dms = dmIds.map((dm) => {
        let title;
        if (dm.type === 0)
        {
          title = dm.participantIds[0].username || dm.participantIds[0].displayName;
        }
        else
        {
          title = dm.title;
        }
        return { id: dm._id, title };
      });
  
      return dms;
    }
    catch(e)
    {
      return null;
    }
  }

  async findMessagesByChannelId(channelId, startingPoint)
  {
    try
    {
      let messages = await this._messageModel.find({ channelId })
      .populate({
        path: 'authorId',
        select: 'username displayName',
      }).skip(startingPoint || 0).limit(20); 
      // FIXME: is this proper sorting?
      messages = messages.map((message) => {
        return {
          id: message._id,
          author: {
            id: message.authorId._id,
            name: message.authorId.displayName || message.authorId.username,
          },
          timeCreated: message.timeCreated,
          text: message.text,
          edited: message.__v !== 0,
        }
      });
  
      return messages
    }
    catch(e)
    {
      return null;
    }
  }

  async findMessageById(messageId)
  {
    try {
      let message = await this._messageModel.findById(messageId)
      .populate({
        path: 'authorId',
        select: 'username displayName',
      });
  
      message = {
        id: message._id,
        author: {
          id: message.authorId._id,
          name: message.authorId.displayName || message.authorId.username,
        },
        timeCreated: message.timeCreated,
        text: message.text,
        edited: message.__v !== 0,
      }
      
      return message;
    }
    catch(e)
    {
      return null;
    }
  }
}

module.exports = MessagingView;