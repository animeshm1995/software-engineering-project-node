/**
 * @file Declares API for dislikes related data access object methods
 */
import UnbookMark from "../../models/bookmarks/Unbookmark";
import Bookmark from "../../models/bookmarks/Bookmark";


export default interface UnbookmarkDaoI {

    /**
     * Inserts bookmark instance into the database
     * @param {string} tid Primary key of user who adds the bookmark
     * @param {string} uid Primary key of tuit which is to be bookmarked
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userUnbookmarksTuit (tid: string, uid: string): Promise<any>;

    /**
     * Removes bookmark from the database.
     * @param {string} uid  Primary key of user whose bookmark is to be removed
     * @param {string} tid  Primary key of tuit which has to be unbookmarked
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUndoUnbookmarkTuit (tid: string, uid: string): Promise<any>;

    /**
     * Uses BookmarkModel to retrieve all bookmark documents from bookmarks collection
     * @param {string} tid  Primary key of user whose bookmark is to be removed
     * @param {string} uid  Primary key of user whose bookmark is to be removed
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findUserUnbookmarksTuit (tid: string, uid: string): Promise<UnbookMark>;

    /**
     * Removes all bookmarks of that user from the database.
     * @param {string} tid  Primary key of user whose bookmark is to be removed
     * @returns Promise To be notified when bookmark is removed from the database
     */
    countHowManyUnbookmarkedTuit (tid: string): Promise<any>;
};