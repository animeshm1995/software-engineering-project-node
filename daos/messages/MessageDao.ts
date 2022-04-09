import MessageDaoI from "../../interfaces/messages/MessageDao";
import MessageModel from "../../mongoose/messages/MessageModel";
import Message from "../../models/messages/Message";
import Tuit from "../../models/tuits/Tuit";
import TuitModel from "../../mongoose/tuits/TuitModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {

    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton dao instance
     * @return MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    /**
     * Inserts message instance into the database
     * @param {string} fromuserid Primary key of user who messages another user
     * @param {string} touserid Primary key of user who receives the message from another user
     * @param {string} message message data being sent
     * @returns Promise To be notified when message is inserted into the database
     */
    messageUser = async (fromuserid: string, touserid: string, message: Message): Promise<any> =>
        MessageModel.create( {from: fromuserid,to:touserid, message: message});

    /**
     * Removes message from the database.
     * @param {string} messageid  Primary key of message is to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    deleteMessage = async ( messageid: string): Promise<any> =>
        MessageModel.deleteOne({_id: messageid});

    /**
     * Uses MessageModel to retrieve all message documents sent by the user from messages collection
     * @param {string} fromuserid  Primary key of user who sends the message
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findMessagesSentByUser = async (fromuserid: string): Promise<any> =>
        MessageModel.find({from: fromuserid});

    /**
     * Uses MessageModel to retrieve all message documents received by the user from messages collection
     * @param {string} touserid  Primary key of user who receives the message
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findMessagesReceivedByUser = async (touserid: string): Promise<any> =>
        MessageModel.find({to: touserid});

    /**
     * Removes all messages of the user from the database.
     * @param {string} fromuserid  Primary key of message is to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    deleteAllMessagesOfUser = async ( fromuserid: string): Promise<any> =>
        MessageModel.deleteMany({fromuserid: fromuserid});

    /**
     * Updates a message in the database.
     * @param {string} messageid  Primary key of message which has to be updated
     * @param {string} message  Content of message
     * @returns Promise To be notified when message is updated in the database
     */
    async updateMessage(messageid: string, message: string): Promise<any> {
        return await MessageModel.updateOne({_id: messageid}, {message: message});
    }
}