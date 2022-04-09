/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../../daos/bookmarks/BookmarkDao";
import BookmarkControllerI from "../../interfaces/bookmarks/BookmarkController";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:userid/bookmarks to retrieve all the tuits bookmarked by the user
 *     </li>
 *     <li>POST /users/:userid/bookmarks/tuits/:tuitid to record that a user bookmarks a tuit
 *     </li>
 *     <li>DELETE /users/:userid/unbookmarks/tuits/:tuitid to record that a user
 *     unbookmarks a tuit</li>
 *     <li>DELETE /users/:userid/unbookmarks to record that a user
 *     unbookmarks all his bookmarked tuits</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {

    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();

            app.get("/users/:userid/bookmarks", BookmarkController.bookmarkController.findAllBookmarkedTuitsByUser);
            app.post("/users/:userid/bookmarks/tuits/:tuitid", BookmarkController.bookmarkController.bookmarkTuit);
            app.delete("/users/:userid/unbookmarks/tuits/:tuitid", BookmarkController.bookmarkController.unbookmarkTuit);
            app.delete("/users/:userid/unbookmarks", BookmarkController.bookmarkController.unbookmarkAllTuitsByUser);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    /**
     * Retrieves all tuits that a user bookmarked from the database
     * @param {Request} req Represents request from client, including the path
     * parameter userid representing the user who bookmarked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
    findAllBookmarkedTuitsByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllBookmarkedTuitsByUser(req.params.userid)
            .then(bookmarks => res.json(bookmarks));
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters userid and tuitid representing the user that is bookmarking the tuit
     * and the tuit being bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    bookmarkTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.bookmarkTuit(req.params.userid, req.params.tuitid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters userid and tuitid representing the user that is unbookmarking
     * the tuit and the tuit being unbookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    unbookmarkTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.unbookmarkTuit(req.params.userid, req.params.tuitid)
            .then(status => res.send(status));

    /**
     * Removes all tuits that a user bookmarked from the database
     * @param {Request} req Represents request from client, including the path
     * parameter userid representing the user who bookmarked the tuits
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmarks were successful or not
     */
    unbookmarkAllTuitsByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.unbookmarkAllTuitsByUser(req.params.userid)
            .then(bookmarks => res.json(bookmarks));
}