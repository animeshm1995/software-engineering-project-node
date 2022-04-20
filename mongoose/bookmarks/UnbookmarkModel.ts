/**
 * @file Implements mongoose model to CRUD
 * documents in the BookMark collection
 */
import mongoose from "mongoose";
import UnbookMarkSchema from "../bookmarks/UnBookmarkSchema";

const UnBookMarkModel = mongoose.model("BookMarkModel", UnbookMarkSchema);

export default UnBookMarkModel;