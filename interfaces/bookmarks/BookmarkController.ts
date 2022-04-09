/**
 * @file Declares API for Bookmarks related controller methods
 */
import {Request, Response} from "express";

export default interface BookmarkController {

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters userid and tuitid representing the user that is bookmarking the tuit
     * and the tuit being bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    bookmarkTuit (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters userid and tuitid representing the user that is unbookmarking
     * the tuit and the tuit being unbookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    unbookmarkTuit (req: Request, res: Response): void;

    /**
     * Retrieves all tuits that a user bookmarked from the database
     * @param {Request} req Represents request from client, including the path
     * parameter userid representing the user who bookmarked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
    findAllBookmarkedTuitsByUser (req: Request, res: Response): void;

    /**
     * Retrieves all tuits that a user bookmarked from the database
     * @param {Request} req Represents request from client, including the path
     * parameter userid representing the user who bookmarked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
    unbookmarkAllTuitsByUser (req: Request, res: Response): void;

};