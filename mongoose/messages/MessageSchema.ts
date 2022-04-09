/**
 * @file Implements mongoose schema to CRUD
 * documents in the messages collection
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

/**
 * @typedef Message Represents message between users
 * @property {String} message message to be sent
 * @property {ObjectId} to user id whom message is sent
 * @property {ObjectId} from user id who is sending the message
 * @property {Date} sentOn Date of sending of the message
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date,  default: Date.now}
}, {collection: "messages"});
export default MessageSchema;