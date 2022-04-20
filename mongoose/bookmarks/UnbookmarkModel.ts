/**
 * @file Implements mongoose model to CRUD
 * documents in the BookMark collection
 */
import mongoose from "mongoose";
import UnbookMarkSchema from "./UnbookmarkSchema";

const UnBookMarkModel = mongoose.model("unBookMarkModel", UnbookMarkSchema);

export default UnBookMarkModel;