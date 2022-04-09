/**
 * @file Declares API for Bookmarks related controller methods
 */
import {Request, Response} from "express";

export default interface MessageController {

    /**
     * @param {Request} req Represents request from client,
     * representing the user that is messaging another user
     * and the other user receiving the message and the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    messageUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters messageid representing the message that is being deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    deleteMessage (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters fromuserid representing the user who has sent messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the messages that were sent by the user.
     */
    findMessagesSentByUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters touserid representing the user who received the messages.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing all the messages received by the user.
     */
    findMessagesReceivedByUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters fromuserid representing the user whose messages are being deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    deleteAllMessagesOfUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters messageid representing the message being updated
     * @param {Response} res Represents response to client, including status
     * on whether updating the message was successful or not
     */
    updateMessage(req: Request, res: Response): void;
};