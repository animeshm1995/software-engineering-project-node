/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../../daos/follows/FollowDao";
import FollowControllerI from "../../interfaces/follows/FollowController";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:userid/followers to retrieve all the followers of a user
 *     </li>
 *     <li>GET /users/:userid/following to retrieve all users the current user follows
 *     </li>
 *     <li>POST /users/:userid/follows/:userfollowedid to record that a user follows another user
 *     </li>
 *     <li>DELETE /users/:userid/unfollows/:userfollowedid to record that a user
 *     no longer follows another user</li>
 *     <li>DELETE /users/:userid/removeallfollowing/ to record that a user
 *     no longer follows any user</li>
 *     <li>DELETE /users/:userid/removeallfollowers/ to record that a user
 *     no longer has any followers</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {

    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();

            app.get("/users/:userid/followers", FollowController.followController.getUserFollowersList);
            app.get("/users/:userid/following", FollowController.followController.getUserFollowingList);
            app.post("/users/:userid/follows/:userfollowedid", FollowController.followController.followsUser);
            app.delete("/users/:userid/unfollows/:userfollowedid", FollowController.followController.unfollowsUser);
            app.delete("/users/:userid/removeallfollowing/", FollowController.followController.unfollowAllUsers);
            app.delete("/users/:userid/removeallfollowers/", FollowController.followController.removeAllFollowers);
        }
        return FollowController.followController;
    }

    private constructor() {}


    /**
     * Retrieves all the followers of a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter userid representing the user followers
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that
     * represent the follows of the user
     */
    getUserFollowersList(req: Request, res: Response): void {
        FollowController.followDao.getUserFollowersList(req.params.userid)
             .then(followers => res.json(followers));
    }

    /**
     * Retrieves all users followed by a particular user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter userid representing the user followings
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that the user follows
     */
    getUserFollowingList(req: Request, res: Response): void {
        FollowController.followDao.getUserFollowingList(req.params.userid)
            .then(following => res.json(following));
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters userid and userFollowedId representing the user that is following another user
     * and the other user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user being followed that was inserted in the
     * database
     */
    followsUser(req: Request, res: Response): void {
        FollowController.followDao.followsUser(req.params.userid, req.params.userfollowedid)
            .then(follows => res.json(follows));

    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters userid and userfollowedid representing the user that is unfollowing
     * another user and the other user being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the unfollowed user was successful or not
     */
    unfollowsUser(req: Request, res: Response): void {
        FollowController.followDao.unfollowsUser(req.params.userid, req.params.userfollowedid)
            .then(status => res.send(status));
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters userid representing the user that is unfollowing all users
     * @param {Response} res Represents response to client, including status
     * on whether deleting the unfollowed user was successful or not
     */
    unfollowAllUsers(req: Request, res: Response): void {
        FollowController.followDao.unfollowAllUsers(req.params.userid)
            .then(status => res.send(status));
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters userid representing the user that is removing all his followers
     * @param {Response} res Represents response to client, including status
     * on whether deleting the unfollowed user was successful or not
     */
    removeAllFollowers(req: Request, res: Response): void {
        FollowController.followDao.removeAllFollowers(req.params.userid)
            .then(status => res.send(status));
    }

}