/**
 * @file Controller RESTful Web service API for Authentication resource
 */
import {Request, Response, Express} from "express";
import UserDao from "../../daos/users/UserDao";
const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * @class AuthenticationController Implements RESTful Web service API for authentication resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/auth/login to allow the users to login</li>
 *     <li>POST /api/auth/register to allow the users to register</li>
 *     <li>POST /api/auth/profile to allow the users to view their profile</li>
 *     <li>POST /api/auth/logout to allow the users to logout</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user authentication CRUD operations
 * RESTful Web service API
 */
const AuthenticationController = (app: Express) => {
    
    const userDao: UserDao = UserDao.getInstance();

    /**
     * Allows the users to login to the Tuiter application.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, an error
     * message if the user who is not an existing user tries to login.
     */
    const login = async (req: Request, res: Response) => {

        console.log("==> login")
        console.log("==> req.session")

        const user = req.body;
        const username = user.username;
        const password = user.password;
        console.log(password)
        const existingUser = await userDao
            .findUserByUsername(username);
        if (existingUser != null) {
            const match = await bcrypt.compare(password, existingUser.password);

            if (match) {
                existingUser.password = '*****';
                // @ts-ignore
                req.session['profile'] = existingUser;
                res.json(existingUser);
            } else {
                res.sendStatus(403);
            }
        }
        else {
            res.sendStatus(404);
        }
    }

    /**
     * Allows the users to register to the Tuiter application.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, an error
     * message if the user who is an existing user tries to register.
     */
    const register = async (req: Request, res: Response) => {
        console.log("==> register")
        console.log("==> req.session")

        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await userDao
            .findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao
                .createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    /**
     * Allows the users to view their profile in the Tuiter application.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client,including their profile
     * consisting of their tuits,likes and dislikes..
     */
    const profile = (req: Request, res: Response) => {
        // @ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    /**
     * Allows the users to logout of the Tuiter application.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client,including their session to be destroyed.
     */
    const logout = (req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    app.post("/api/auth/login", login);
    app.post("/api/auth/register", register);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
}

export default AuthenticationController;