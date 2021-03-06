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
          select: 'username lastActivity pfp',
        },
        options: {
          sort: {
            lastActivity: -1,
          },
        },
        select: '-__v',
      });

      const dms = dmIds.map((dm) => {
        let name;
        if (dm.type === 0)
        {
          name = dm.participantIds[0].username;
        }
        else
        {
          name = dm.title;
        }
        return {
          id: dm._id,
          user: {
            pfp: dm.participantIds[0].pfp.url,
            id: dm.participantIds[0].id,
            name,
          },
        };
      });
  
      return dms;
    }
    catch(e)
    {
      return [];
    }
  }

  async findOpenChannels()
  {
    try {
      const channels = await this._channelModel.find({ type: 3 });
      return channels;
    }
    catch (e)
    {
      return [];
    }
  }

  async getDmName(channelId, thisAccountId)
  {
    try
    {
      const channel = await this._channelModel.findById(channelId).select('participantIds')
      .populate({
        path: 'participantIds',
        match: { _id: { $ne: thisAccountId } },
        select: 'username status',
      });

      return channel.participantIds[0].username;
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
        select: '_id username pfp',
      }).sort({ timeCreated: -1 }).skip(startingPoint || 0).limit(50); 

      messages = messages.map((message) => {
        return {
          id: message._id,
          author: {
            id: message.authorId._id,
            name: message.authorId.username,
            pfp: message.authorId.pfp.url,
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
        select: 'username pfp',
      });
  
      message = {
        id: message._id,
        channelId: message.channelId,
        author: {
          id: message.authorId._id,
          name: message.authorId.username,
          pfp: message.authorId.pfp.url,
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
        select: 'username'
      });
      
      channel = {
        id: channel._id,
        participants: channel.participantIds.map((participantId) => {
          return {
            id: participantId.id,
            name: participantId.username,
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