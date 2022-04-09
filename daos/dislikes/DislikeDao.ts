/**
 * @file Implements API for Dislikes related data access object methods
 */
import Dislike from "../../models/dislikes/Dislike";
import DislikeModel from "../../mongoose/dislikes/DislikeModel";
import DislikeDaoI from "../../interfaces/dislikes/DislikeDaoI";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI{
    private static dislikeDao: DislikeDao | null = null;
    /**
     * Creates singleton dao instance
     * @return DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}

    /**
     * Finds users who have disliked the tuit
     * @param {string} tid Primary key of tuit which is disliked
     * @returns Promise To be notified when users who have disliked is retrieved from database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Finds tuits disliked by the user
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when tuits who have been disliked is retrieved from database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Inserts dislikes instance into the database
     * @param {string} uid Primary key of tuit getting disliked
     * @param {string} tid Primary key of user who is disliking the tuit
     * @returns Promise To be notified when dislikes is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Finds user who has disliked the tuit
     * @param {string} uid Primary key of user who has disliked
     * @param {string} tid Primary key of tuit which is disliked
     * @returns Promise To be notified when users who have disliked is retrieved from database
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * Removes dislikes instance into the database
     * @param {string} uid Primary key of tuit getting disliked
     * @param {string} tid Primary key of user who is disliking the tuit
     * @returns Promise To be notified when dislikes is removed into the database
     */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    /**
     * Finds count of users who has disliked the tuit
     * @param {string} uid Primary key of user who has disliked
     * @returns Promise To be notified when count of users who have disliked is retrieved from database
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}