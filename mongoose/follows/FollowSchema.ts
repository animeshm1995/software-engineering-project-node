/**
 * @file Implements mongoose schema to CRUD
 * documents in the follows collection
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";
import UserModel from "../users/UserModel";

/**
 * @typedef Follow Represents follows activities of user
 * @property {ObjectId} userFollowed user id
 * @property {ObjectId} userFollowing user id
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;