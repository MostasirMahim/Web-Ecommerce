import Conversation from "@/models/conversation.model";
import Message from "@/models/message.model";
import User from "@/models/user.model";
import { v2 as cloudinary } from "cloudinary";

export const sendMessage = async (data: {
  text: string;
  receiverId: string;
  images: string[];
  senderId: string;
}) => {
  try {
    const { text, receiverId } = await data;
    let { images } = await data;
    const senderId = await data.senderId;
    if ((!text || text === "") && images?.length === 0)
      return {
        success: false,
        error: "Please fill all the fields",
      };
    let reciver = await User.findById(receiverId);
    if (!reciver) {
      return {
        success: false,
        error: "User not found",
      };
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const uploadImage = async (imgs: string[]): Promise<void> => {
      try {
        if (imgs?.length > 0) {
          const uploadImage = await Promise.all(
            imgs.map(async (img) => {
              const upload = await cloudinary.uploader.upload(img);
              return upload.secure_url;
            })
          );
          images = uploadImage;
        }
      } catch (error) {
        console.log(error);
        throw new Error(JSON.stringify(error));
      }
    };

    await uploadImage(images);
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      images: images || [],
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id as any);
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal server error",
    };
  }
};

export const getMessage = async (senderId: string, receiverId: string) => {
  try {
    if (!senderId || !receiverId)
      return {
        success: false,
        error: "Sender/Receiver id not found",
      };
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation)
      return {
        success: true,
        data: [],
      };

    const messages = conversation.messages;

    return {
      success: true,
      data: messages,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal server error",
    };
  }
};

export const getCoversation = async (senderId: string, receiverId: string) => {
  try {
    if (!senderId || !receiverId)
      return {
        success: false,
        error: "Sender/Receiver id not found",
      };
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation)
      return {
        success: true,
        data: [],
      };

    return {
      success: true,
      data: conversation,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal server error",
    };
  }
};

export const getChatPeople = async (senderId: string) => {
  try {
    if (!senderId)
      return {
        success: false,
        error: "Sender id not found",
      };
    const conversations = await Conversation.find({ participants: senderId });

    if (!conversations || conversations.length === 0)
      return {
        success: true,
        data: [],
      };

    const lastMessages = await Promise.all(
      conversations.map(async (conversation) => {
        const lastOne = conversation.messages[conversation.messages.length - 1];
        let message = await Message.findById(lastOne);

        let opponent;
        if (message) {
          const opponentId =
            message.senderId.toString() == senderId.toString()
              ? message.receiverId
              : message.senderId;
          opponent = await User.findById(opponentId).select(
            "name profileImg _id"
          );
        }
        const lastMessage = {
          ...message,
          opponent,
        };
        return lastMessage;
      })
    );

    return {
      success: true,
      data: lastMessages,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal server error",
    };
  }
};
