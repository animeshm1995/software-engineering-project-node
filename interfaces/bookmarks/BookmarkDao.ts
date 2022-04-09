/**
 * @file Declares API for Bookmarks related data access object methods
 */
import Bookmark from "../../models/bookmarks/Bookmark";

export default interface BookmarkDao {

    /**
     * Inserts bookmark instance into the database
     * @param {string} userid Primary key of user who adds the bookmark
     * @param {string} tuitid Primary key of tuit which is to be bookmarked
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    bookmarkTuit (tuitid: string, userid: string): Promise<Bookmark>;

    /**
     * Removes bookmark from the database.
     * @param {string} userid  Primary key of user whose bookmark is to be removed
     * @param {string} tuitid  Primary key of tuit which has to be unbookmarked
     * @returns Promise To be notified when bookmark is removed from the database
     */
    unbookmarkTuit (tuitid: string, userid: string): Promise<any>;

    /**
     * Uses BookmarkModel to retrieve all bookmark documents from bookmarks collection
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllBookmarkedTuitsByUser (userid: string): Promise<Bookmark[]>;

    /**
     * Removes all bookmarks of that user from the database.
     * @param {string} userid  Primary key of user whose bookmark is to be removed
     * @returns Promise To be notified when bookmark is removed from the database
     */
    unbookmarkAllTuitsByUser (userid: string): Promise<any>;
};