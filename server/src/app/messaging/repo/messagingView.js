class MessagingView
{
  constructor(userModel, messageModel, channelModel)
  {
    this._userModel = userModel;
    this._messageModel = messageModel;
    this._channelModel = channelModel;
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
        sort: {
          lastActivity: -1,
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
      return [];
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
      }).sort({ timeCreated: -1 }).skip(startingPoint || 0).limit(20); 

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
        channelId: message.channelId,
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

  async findPrivateChannelById(channelId)
  {
    try {
      let channel = await this._channelModel.findById(channelId)
      .populate({
        path: 'participantIds',
        select: 'username displayName'
      });
      
      channel = {
        id: channel._id,
        participants: channel.participantIds.map((participantId) => {
          return {
            id: participantId.id,
            name: participantId.displayName || participantId.username,
          };
        }),
      };

      return channel;
    }
    catch (e)
    {
      return null;
    }
  }
}

module.exports = MessagingView;