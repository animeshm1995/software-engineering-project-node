/**
 * @file Implements API for Likes related data access object methods
 */
import LikeDaoI from "../../interfaces/likes/LikeDaoI";
import Like from "../../models/likes/Like";
import LikeModel from "../../mongoose/likes/LikeModel";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton dao instance
     * @return LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    /**
     * Finds users who have liked the tuit
     * @param {string} tid Primary key of tuit which is liked
     * @returns Promise To be notified when users who have liked is retrieved from database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Finds tuits liked by the user
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when tuits who have been liked is retrieved from database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Inserts likes instance into the database
     * @param {string} uid Primary key of tuit getting liked
     * @param {string} tid Primary key of user who is liking the tuit
     * @returns Promise To be notified when liked is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Finds user who has liked the tuit
     * @param {string} uid Primary key of user who has liked
     * @param {string} tid Primary key of tuit which is liked
     * @returns Promise To be notified when users who have liked is retrieved from database
     */
    findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.findOne({tuit: tid, likedBy: uid});

    /**
     * Removes likes instance into the database
     * @param {string} uid Primary key of tuit getting liked
     * @param {string} tid Primary key of user who is liked the tuit
     * @returns Promise To be notified when liked is removed into the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});

    /**
     * Finds count of users who has liked the tuit
     * @param {string} uid Primary key of user who has liked
     * @returns Promise To be notified when count of users who have liked is retrieved from database
     */
    countHowManyLikedTuit = async (tid: string): Promise<any> =>
        LikeModel.count({tuit: tid});
}