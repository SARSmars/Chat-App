import ConversationModel from '../models/Conversation.js';
import MessageModel from '../models/Message.js';
import UserModel from '../models/User.js';

export const CreateMessage = async (req, res) => {
    try {
        const {senderId, receiverId, message} = req.body;
        if(!senderId || !receiverId || !message) {
            return res.status(400).json({success: false, message: `${!senderId ? "Sender ID is required" : !receiverId ? "Receiver ID is required" : !message ? "Message is required" : "" } is required` });
        }
        const newMessage = await MessageModel({
            UserId : senderId,
            message
        });
        const savedMessage = await newMessage.save();
        // check if thre exist a conversation between sender and receiver
        let conversation =  await ConversationModel.findOne({
            members: { $all: [senderId, receiverId],
                        $size: 2
             }
        });
        // if conversation exists, update it with the new message
        if(conversation) {
             conversation  = await ConversationModel.findByIdAndUpdate(
                conversation._id,
                { $push: { messages: [savedMessage._id] } },
                { new: true }
            );
        }   
        else {
        //  create a new conversation
            conversation = new ConversationModel({
                members: [senderId, receiverId],
                messages: [savedMessage._id]
            });
            await conversation.save();
            // this save the conversation instace in the database
        }
        return res.status(201).json({success: true,
             message: "Message sent successfully",
             data:{
                 newMessage: savedMessage,
                 conversation: conversation
             }
        });
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}   

export const GetMessages = async (req, res) => {
    try {
        const {senderId, receiverId} = req.body;
        if(!senderId || !receiverId) {
            return res.status(400).json({success: false, message: `${!senderId ? "Sender ID is required" : !receiverId ? "Receiver ID is required" : "" } is required` });
        }
        const conversation = await ConversationModel.findOne({
            members: { $all: [senderId, receiverId],
                        $size: 2
             }
        }).populate('messages');
        if(!conversation) {
            const newConversation = new ConversationModel({
                members: [senderId, receiverId],
                messages: []
            });
            await newConversation.save();
            return res.status(200).json({success: true, 
                message: "No messages found, but conversation created successfully",
                data: newConversation 
            });
        }
        return res.status(200).json({success: true,
             message: "Messages retrieved successfully",
              data: conversation 
        });
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const GetUser = async (req, res) => {
    try{
        const users = await UserModel.find()
        if(!users){
            return res.status(404).json({success: false, message: "No users found"});
        }
        return res.status(200).json({success: true, message: "Users retrieved successfully", data: users});
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
    // This function is not implemented yet
}