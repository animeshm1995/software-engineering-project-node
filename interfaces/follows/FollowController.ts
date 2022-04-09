/**
 * @file Declares API for Follows related controller methods
 */
import {Request, Response} from "express";

export default interface FollowController {

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters userid and userFollowedId representing the user that is following another user
     * and the other user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user being followed that was inserted in the
     * database
     */
    followsUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters userid and userfollowedid representing the user that is unfollowing
     * another user and the other user being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the unfollowed user was successful or not
     */
    unfollowsUser (req: Request, res: Response): void;

    /**
     * Retrieves all the followers of a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter userid representing the user followers
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that
     * represent the follows of the user
     */
    getUserFollowersList (req: Request, res: Response): void;

    /**
     * Retrieves all users followed by a particular user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter userid representing the user followings
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that the user follows
     */
    getUserFollowingList (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters userid representing the user that is unfollowing all users
     * @param {Response} res Represents response to client, including status
     * on whether deleting the unfollowed user was successful or not
     */
    unfollowAllUsers(req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters userid representing the user that is removing all his followers
     * @param {Response} res Represents response to client, including status
     * on whether deleting the unfollowed user was successful or not
     */
    removeAllFollowers(req: Request, res: Response): void;
};