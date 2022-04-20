/**
 * @file Implements mongoose schema for BookMark
 */
import mongoose, {Schema} from "mongoose";
import UnbookMark from "../../models/bookmarks/Unbookmark";

/**
 * @typedef UnBookMark Represents Unbookmark made on tuit
 * @property {ObjectId[]} UnbookMarkedTuit Array of Tuit IDs
 * @property {ObjectId[]} UnbookMarkedBy Array of BookMark IDs
 */
const UnbookMarkSchema = new mongoose.Schema<UnbookMark>({
    unbookMarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    unbookMarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "unbookmark"});

export default UnbookMarkSchema;