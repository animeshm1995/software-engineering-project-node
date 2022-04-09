/**
 * @file Service RESTful Web service API for auhtentication resource
 */
import mongoose from "mongoose";
import UserDao from "../daos/users/UserDao";

const userDao: UserDao = UserDao.getInstance();

const PROTOCOL = "mongodb+srv";
const DB_USERNAME = "cs5500";//process.env.DB_USERNAME;
const DB_PASSWORD = "Spring2022";//process.env.DB_PASSWORD;
const HOST = "cluster0.lgzrz.mongodb.net";
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

/**
 * Allows the users to initialize salaries to the Tuiter application.
 * @param {number} salary Represents salary from client
 */
export const initializeSalaries = (salary: number) => {
  return userDao.findAllUsers()
    .then(users => {
      const sPromises = users.map(user =>
        userDao.updateUserSalaryByUsername(user.username, salary));
      const resultPromise = Promise.all(sPromises);
      resultPromise
        .then(values => {
          return values
        })
    })
}

/**
 * Allows the users to raise salaries to the Tuiter application.
 * @param {number} raise Represents salary from client
 */
export const giveRaise = (raise: number) => {
  return userDao.findAllUsers()
    .then(users => {
      const salaryPromises = users.map(user => {
        // @ts-ignore
        const newSalary = user.salary * (1 + raise / 100);
        return userDao.updateUserSalaryByUsername(
          user.username,
          newSalary)
      });
      const resultPromise = Promise.all(salaryPromises);
      resultPromise
        .then(values => {
          return values;
        })
    })
}

// giveRaise(50)
//   .then(results => console.log(results));
//
// initializeSalaries(50000)
//   .then(results => console.log(results));
//
// register('alice008', 'alice234', 'alice234@gmail.com')
//   .then(user => console.log(user))
//
login('alice008', 'alice234')
  .then(user => console.log(user))

// userDao.findAllUsers()
//   .then(users => console.log(users));
