import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User Represents user who is creating his account
 * @property {string} username username of the user
 * @property {string} password password of the user
 * @property {string} email email of the user
 * @property {string} firstName first name of the user
 * @property {string} lastName last name of the user
 * @property {string} profilePhoto profile photo of the user
 * @property {string} headerImage header image of the user
 * @property {string} biography biography of the user
 * @property {Date} dateOfBirth date of birth of the user
 * @property {AccountType} accountType type of account of the user
 * @property {MaritalStatus} maritalStatus type of account of the user
 * @property {Location} location location of the user
 * @property {number} salary date of joining of the user
 */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    email: string,
    firstName?: string,
    lastName?: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};