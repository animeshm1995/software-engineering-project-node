/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef UnbookMark Represents bookmarks relationship between a user and a tuit,
 * as in a user unbookmarks a tuit
 * @property {Tuit} unbookMarkedTuit Tuit being unbookmarked
 * @property {User} unBookmarkedBy User unbookmarking the tuit
 */
export default interface UnbookMark {
    unbookMarkedTuit: Tuit,
    unbookMarkedBy: User
};