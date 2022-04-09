/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>bookmarks</li>
 *     <li>follows</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */

import express from 'express';
import mongoose from "mongoose";
const cors = require("cors");
const session = require("express-session");

import UserController from "./controllers/users/UserController";
import TuitController from "./controllers/tuits/TuitController";
import FollowController from "./controllers/follows/FollowController";
import LikeController from "./controllers/likes/LikeController";
import MessageController from "./controllers/messages/MessageController";
import BookmarkController from "./controllers/bookmarks/BookmarkController";
import AuthenticationController from "./controllers/authentication/AuthenticationController";
import SessionController from "./controllers/session/SessionController";
import DislikeController from "./controllers/dislikes/DislikeController";

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN
}));

let sess = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production",
    }
}

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
}

// connect to the database
mongoose.connect('mongodb+srv://cs5500:Spring2022@cluster0.lgzrz.mongodb.net/tuiter?retryWrites=true&w=majority');
app.use(session(sess))
app.use(express.json());

app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})

// create RESTful Web service API
const userController = UserController.getInstance(app);

const tuitController = TuitController.getInstance(app);

const followController = FollowController.getInstance(app);

const likeController = LikeController.getInstance(app);

const messageController = MessageController.getInstance(app);

const bookmarkController = BookmarkController.getInstance(app);

const dislikeController = DislikeController.getInstance(app);

AuthenticationController(app);
SessionController(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;

app.listen(process.env.PORT || PORT);