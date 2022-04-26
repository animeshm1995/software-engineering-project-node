/**
 * @file Implements DAO managing data storage of bookmark. Uses mongoose BookMarkModel
 * to integrate with MongoDB
 */
import BookMarkDaoI from "../../interfaces/bookmarks/BookmarkDao";
import Bookmark from "../../models/bookmarks/Bookmark";
import BookmarkModel from "../../mongoose/bookmarks/BookmarkModel";

/**
 * @class BookMarkModel Implements Data Access Object managing data storage
 * of bookmark
 * @property {BookMarkModel} bookmarkDao Private single instance of BookMarkModel
 */
export default class BookMarkDao implements BookMarkDaoI {
    private static bookmarkDao: BookMarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookMarkDao
     */
    public static getInstance = (): BookMarkDao => {
        if(BookMarkDao.bookmarkDao === null) {
            BookMarkDao.bookmarkDao = new BookMarkDao();
        }
        return BookMarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Uses BookMarkModel to retrieve all bookmark document from bookmark collection
     * @param {string} tid Tuits primary key
     * @returns Promise To be notified when bookmark is retrieved from the database
     */
    findAllUsersThatBookMarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedTuit: tid})
            .populate("bookMarkedBy")
            .exec();

    /**
     * Uses BookMarkModel to retrieve all bookmark document from bookmark collection
     * @param {string} uid Users primary key
     * @returns Promise To be notified when bookmark is retrieved from the database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();

    /**
     * Inserts bookmark instance into the database
     * @param {string} uid  Primary key of user
     * @param {string} tid  Primary key of tuit to be bookmarked
     * @returns Promise To be notified when user bookmark is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});

    /**
     * Removes bookmarks from the database.
     * @param {string} uid  Primary key of user
     * @param {string} tid  Primary key of tuit to be unbookmarked
     * @returns Promise To be notified when user bookmark is removed from the database
     */
    userUnBookMarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});


    /**
     * Remove all bookmark instances from the database bookmarked by a user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when bookmarks are removed from the database
     */
    userUnbookmarksAllTuit = async (uid: string): Promise<any> =>
        BookmarkModel.deleteMany({bookmarkedBy: uid})

    /**
     * Check if the user has already bookmarked the tuit
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmark is removed from the database
     */
    findUserBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.findOne({bookmarkedTuit: tid, bookmarkedBy: uid});

    /**
     * Count how many bookmarks this tuit has
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmark is removed from the database
     */
    countHowManyBookmarkedTuit = async (tid: string): Promise<any> =>
        BookmarkModel.count({bookmarkedTuit: tid});

}