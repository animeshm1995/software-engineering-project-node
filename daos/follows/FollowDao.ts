/**
 * @file Implements API for Follows related data access object methods
 */
import FollowDaoI from "../../interfaces/follows/FollowDao";
import FollowModel from "../../mongoose/follows/FollowModel";
import Follow from "../../models/follows/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {

    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton dao instance
     * @return FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Inserts follows instance into the database
     * @param {string} userid Primary key of user who follows another user
     * @param {string} userfollowedid Primary key of user who is followed by another user
     * @returns Promise To be notified when follows is inserted into the database
     */
    followsUser = async (userid: string, userfollowedid: string): Promise<any> =>
        FollowModel.create({userFollowed: userid, userFollowing: userfollowedid});

    /**
     * Removes follows from the database.
     * @param {string} userid  Primary key of user who follows another user
     * @param {string} userfollowedid  Primary key of user who is followed by another user
     * @returns Promise To be notified when follows entry is removed from the database
     */
    unfollowsUser = async (userid: string, userfollowedid: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: userid, userFollowing: userfollowedid});

    /**
     * Uses FollowModel to retrieve all following documents from follows collection
     * @returns Promise To be notified when the following are retrieved from
     * database
     */
    getUserFollowingList = async (userid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: userid})
            .populate("userFollowing")
            .exec();

    /**
     * Uses FollowModel to retrieve all followers documents from follows collection
     * @returns Promise To be notified when the followers are retrieved from
     * database
     */
     getUserFollowersList = async (userid: string): Promise<Follow[]> =>
         FollowModel
             .find({userFollowing: userid})
             .populate("userFollowed")
             .exec();

    /**
     * Removes follows from the database.
     * @param {string} userid  Primary key of user who follows all users
     * @returns Promise To be notified when follows entry is removed from the database
     */
    unfollowAllUsers = async (userid: string): Promise<any> =>
        FollowModel.deleteMany({userFollowed: userid});

    /**
     * Removes follows from the database.
     * @param {string} userid  Primary key of user who is removing all his followers
     * @returns Promise To be notified when follows entry is removed from the database
     */
    removeAllFollowers = async (userid: string): Promise<any> =>
        FollowModel.deleteMany({userFollowing: userid});
}