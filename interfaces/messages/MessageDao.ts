/**
 * @file Declares API for Messages related data access object methods
 */
import Message from "../../models/messages/Message";
import Tuit from "../../models/tuits/Tuit";

export default interface MessageDao {

    /**
     * Inserts message instance into the database
     * @param {string} fromuserid Primary key of user who messages another user
     * @param {string} touserid Primary key of user who receives the message from another user
     * @param {string} message message data being sent
     * @returns Promise To be notified when message is inserted into the database
     */
    messageUser (fromuserid: string, touserid: string, message: Message): Promise<Message>;

    /**
     * Removes message from the database.
     * @param {string} messageid  Primary key of message is to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    deleteMessage (message_id: String): Promise<any>;

    /**
     * Uses MessageModel to retrieve all message documents sent by the user from messages collection
     * @param {string} fromuserid  Primary key of user who sends the message
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findMessagesSentByUser(userid: string): Promise<Message[]>;

    /**
     * Uses MessageModel to retrieve all message documents received by the user from messages collection
     * @param {string} touserid  Primary key of user who receives the message
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findMessagesReceivedByUser(userid: string) : Promise<Message[]>;

    /**
     * Removes message from the database.
     * @param {string} fromuserid  Primary key of user who messages are to be deleted
     * @returns Promise To be notified when message is removed from the database
     */
    deleteAllMessagesOfUser(fromuserid: String): Promise<any>;

    /**
     * Updates a message in the database.
     * @param {string} messageid  Primary key of message which has to be updated
     * @param {string} message  Content of message
     * @returns Promise To be notified when message is updated in the database
     */
    updateMessage(messageid: string, message: string): Promise<any>;
};