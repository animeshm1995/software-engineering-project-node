/**
 * @file Implements mongoose schema to CRUD
 * documents in the dislikes collection
 */
import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/dislikes/Dislike";

/**
 * @typedef Dislike Represents dislikes activities of user
 * @property {Tuit} tuit tuit object
 * @property {ObjectId} dislikedBy user id
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikeSchema;