/**
 * @file Controller RESTful Web service API for Messages resource
 */
import MessageControllerI from "../../interfaces/messages/MessageController";
import {Express, Request, Response} from "express";
import MessageDao from "../../daos/messages/MessageDao";

/**
 * @class MessageController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:touserid/receivedmessages to retrieve all the messages received by a user
 *     </li>
 *     <li>GET /users/:fromuserid/sentmessages to retrieve all the messages sent by a user
 *     </li>
 *     <li>POST /users/:fromuserid/messages/:touserid to record that a user messages another user
 *     </li>
 *     <li>PUT /messages/:messageid to record that a user
 *     updates a message</li>
 *     <li>DELETE /users/:fromuserid/messages/:messageid to record that a user
 *     deleted the message</li>
 *     <li>DELETE /users/:fromuserid/messages/ to record that a user
 *     deletes all his messages</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {

    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();

            app.get("/users/:fromuserid/sentmessages", MessageController.messageController.findMessagesSentByUser);
            app.get("/users/:touserid/receivedmessages", MessageController.messageController.findMessagesReceivedByUser);
            app.post("/users/:fromuserid/messages/:touserid", MessageController.messageController.messageUser);
            app.put('/messages/:messageid', MessageController.messageController.updateMessage);
            app.delete("/messages/:messageid/", MessageController.messageController.deleteMessage);
            app.delete("/users/:fromuserid/messages/", MessageController.messageController.deleteAllMessagesOfUser);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client,
     * representing the user that is messaging another user
     * and the other user receiving the message and the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    messageUser = (req: Request, res: Response) =>
        MessageController.messageDao.messageUser(req.params.fromuserid,req.params.touserid, req.body.message)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters messageid representing the message that is being deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.messageid)
            .then(status => res.json(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters fromuserid representing the user who has sent messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the messages that were sent by the user.
     */
    findMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSentByUser(req.params.fromuserid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters touserid representing the user who received the messages.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing all the messages received by the user.
     */
    findMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesReceivedByUser(req.params.touserid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters messageid representing the message that is being deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    deleteAllMessagesOfUser = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessagesOfUser(req.params.fromuserid)
            .then(status => res.json(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters messageid representing the message being updated
     * @param {Response} res Represents response to client, including status
     * on whether updating the message was successful or not
     */
    updateMessage = (req: Request, res: Response) =>
        MessageController.messageDao.updateMessage(req.params.messageid, req.body.message)
            .then(status => res.json(status));
}