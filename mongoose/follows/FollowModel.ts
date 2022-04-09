/**
 * @file Implements mongoose model to CRUD
 * documents in the follows collection
 */
import mongoose from "mongoose";
import FollowSchema from "../follows/FollowSchema";
const FollowModel = mongoose.model("FollowModel", FollowSchema);
export default FollowModel;