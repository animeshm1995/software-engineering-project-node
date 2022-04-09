/**
 * @file Service RESTful Web service API for authentication resource
 */
import mongoose from "mongoose";
import UserDao from "../daos/users/UserDao";

const userDao: UserDao = UserDao.getInstance();

/**
 * connect to the database
 */
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = "jain.shreya@northeastern.edu";//process.env.DB_USERNAME;
const DB_PASSWORD = "Shreya@2014";//process.env.DB_PASSWORD;
const HOST = "cluster0.9yuzq.mongodb.net";
const DB_NAME = "tuiter";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose.connect(connectionString);

/**
 * Allows the users to login to the Tuiter application.
 * @param {string} u Represents username from client
 * @param {string} p Represents password to client, an error
 * message if the user who is not an existing user tries to login.
 */
export const login = (u: string, p: string) =>
  userDao.findUserByCredentials(u, p)
    .then(user => {
      if (user) {
        return user;
      } else {
        throw "Unknown user"
      }
    })
    .then(user => user)
    .catch(e => e)

/**
 * Allows the users to register to the Tuiter application.
 * @param {string} u Represents username from client
 * @param {string} p Represents password to client, an error
 * @param {string} e Represents email to client, an error
 */
export const register = (u: string, p: string, e: string) =>
  userDao.findUserByUsername(u)
    .then(user => {
      if (user) {
        throw 'User already exists';
      } else {
        return userDao.createUser({
          username: u, password: p, email: e
        });
      }
    })
    .then(newUser => newUser)
    .catch(e => e);

