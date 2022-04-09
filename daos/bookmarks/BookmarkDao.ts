/**
 * @file Implements API for Bookmarks related data access object methods
 */
import BookmarkDaoI from "../../interfaces/bookmarks/BookmarkDao";
import Bookmark from "../../models/bookmarks/Bookmark";
import BookmarkModel from "../../mongoose/bookmarks/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {

    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton dao instance
     * @return BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    /**
     * Inserts bookmark instance into the database
     * @param {string} userid Primary key of user who adds the bookmark
     * @param {string} tuitid Primary key of tuit which is to be bookmarked
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    bookmarkTuit = async (userid: string, tuitid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedTuit: tuitid, bookmarkedBy: userid});

    /**
     * Removes bookmark from the database.
     * @param {string} userid  Primary key of user whose bookmark is to be removed
     * @param {string} tuitid  Primary key of tuit which has to be unbookmarked
     * @returns Promise To be notified when bookmark is removed from the database
     */
    unbookmarkTuit = async (userid: string, tuitid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit: tuitid, bookmarkedBy: userid});

    /**
     * Uses BookmarkModel to retrieve all bookmark documents from bookmarks collection
     * @param {string} userid  Primary key of user whose bookmarked tuits are to be fetched
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllBookmarkedTuitsByUser = async (userid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: userid})
            .populate("bookmarkedTuit")
            .exec();


    /**
     * Removes all bookmarks of that user from the database.
     * @param {string} userid  Primary key of user whose bookmark is to be removed
     * @returns Promise To be notified when bookmark is removed from the database
     */
    unbookmarkAllTuitsByUser = async (userid: string): Promise<any> =>
        BookmarkModel.deleteMany({bookmarkedBy: userid});
}