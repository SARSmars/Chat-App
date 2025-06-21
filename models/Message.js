import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
},{timestamps: true});

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
