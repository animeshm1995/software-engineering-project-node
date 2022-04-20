/**
 * @file Controller RESTful Web service API for bookmark resource
 */
import {Express, Request, Response} from "express";
import BookMarkDao from "../../daos/bookmarks/BookmarkDao";
import BookMarkControllerI from "../../interfaces/bookmarks/BookmarkController";
import TuitDao from "../../daos/tuits/TuitDao";

/**
 * @class BookMarkController Implements RESTful Web service API for bookmark resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/bookmark to retrieve all the tuits bookmarked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/bookmark to retrieve all users that bookmarked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/bookmarks/:tid to record that a user bookmarks a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unbookmark/:tid to record that a user
 *     no londer bookamark a tuit</li>
 * </ul>
 * @property {BookMarkDao} BookMarkDao Singleton DAO implementing bookmark CRUD operations
 * @property {BookMarkController} BookMarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookMarkController implements BookMarkControllerI {
    private static bookmarkDao: BookMarkDao = BookMarkDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static bookmarkController: BookMarkController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookMarkController
     */
    public static getInstance = (app: Express): BookMarkController => {
        if(BookMarkController.bookmarkController === null) {
            BookMarkController.bookmarkController = new BookMarkController();


            app.get("/api/users/:uid/bookmarks", BookMarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.get("/api/tuits/:tid/bookmarks", BookMarkController.bookmarkController.findAllUsersThatBookMarkedTuit);
            app.post("/api/users/:uid/bookmarks/:tid", BookMarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tid", BookMarkController.bookmarkController.userUnbookmarksTuit);
            app.delete("/api/users/:uid/bookmarks", BookMarkController.bookmarkController.userUnbookmarksAllTuit);
            app.put("/api/users/:uid/bookmarks/:tid", BookMarkController.bookmarkController.userTogglesTuitBookMarks);
            app.get("/api/users/:uid/bookmarks/:tid", BookMarkController.bookmarkController.findUserBookmarkedTuit);

        }
        return BookMarkController.bookmarkController;
    }

    private constructor() {}

    /**
     * Retrieves all users that bookmark a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the bookmarked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    findAllUsersThatBookMarkedTuit = (req: Request, res: Response) =>
        BookMarkController.bookmarkDao.findAllUsersThatBookMarkedTuit(req.params.tid)
            .then(users => res.json(users));

    /**
     * Retrieves all tuits bookmarked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user bookmarked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === 'me' && profile ?
            profile._id : uid;
        if (userId === "me") {
            res.sendStatus(503);
            return;
        }
        try {
            BookMarkController.bookmarkDao.findAllTuitsBookmarkedByUser(userId)
                .then(bookmarks => {
                    // filter out likes with null tuits. Only keep defined tuits
                    // extract tuit object from likes respond with tuits
                    const bookmarksNonNullTuits = bookmarks.filter(bookmark => bookmark.bookmarkedTuit);
                    const tuitsFromBookmarks = bookmarksNonNullTuits.map(bookmark => bookmark.bookmarkedTuit);
                    res.json(tuitsFromBookmarks);
                });
        } catch (e) {
            res.sendStatus(404);
        }
    }


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmarked that was inserted in the
     * database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookMarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unbookmarking
     * the tuit and the tuit being bookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookMarkController.bookmarkDao.userUnBookMarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unbookmarking
     * the tuit and the tuits being bookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    userUnbookmarksAllTuit = (req: Request, res: Response) =>
        BookMarkController.bookmarkDao.userUnbookmarksAllTuit(req.params.uid)
            .then(status => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unbookmark
     * the tuit and the tuit being unbookmark
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmarked was successful or not
     */
    userTogglesTuitBookMarks = async (req: Request, res: Response) => {
        const bookMarkDao = BookMarkController.bookmarkDao;
        const tuitDao = BookMarkController.tuitDao;
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === 'me' && profile ?
            profile._id : uid;
        if (userId === "me") {
            res.sendStatus(503);
            return;
        }
        try {
            const userAlreadyBookmarkedTuit = await bookMarkDao.findUserBookmarksTuit(userId, tid);
            const howManyBookmarkedTuit = await bookMarkDao.countHowManyBookmarkedTuit(tid);
            let tuit = await tuitDao.findTuitById(tid);
            if (userAlreadyBookmarkedTuit) {
                await bookMarkDao.userUnBookMarksTuit(userId, tid);
                tuit.stats.bookmarks = howManyBookmarkedTuit - 1;
            } else {
                await BookMarkController.bookmarkDao.userBookmarksTuit(userId, tid);
                tuit.stats.bookmarks = howManyBookmarkedTuit + 1;
            }
            await tuitDao.updateBookmarks(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }

    /**
     * Check if the user has already bookmarked the tuit
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user, and the tid representing the tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object containing the bookmark objects or null
     */
    findUserBookmarkedTuit = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === 'me' && profile ?
            profile._id : uid;
        if (userId === "me") {
            res.sendStatus(503);
            return;
        }
        BookMarkController.bookmarkDao.findUserBookmarksTuit(userId, tid)
            .then(bookmark => res.json(bookmark));
    }
};