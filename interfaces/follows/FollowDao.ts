import Follow from "../../models/follows/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDao {

    /**
     * Inserts follows instance into the database
     * @param {string} userid Primary key of user who follows another user
     * @param {string} userfollowedid Primary key of user who is followed by another user
     * @returns Promise To be notified when follows is inserted into the database
     */
    followsUser ( userid: string, followeduserid: string): Promise<Follow>;

    /**
     * Removes follows from the database.
     * @param {string} userid  Primary key of user who follows another user
     * @param {string} userfollowedid  Primary key of user who is followed by another user
     * @returns Promise To be notified when follows entry is removed from the database
     */
    unfollowsUser ( userid: string, followeduserid: string): Promise<any>;

    /**
     * Uses FollowModel to retrieve all followers documents from follows collection
     * @returns Promise To be notified when the followers are retrieved from
     * database
     */
    getUserFollowersList (userid: string): Promise<Follow[]>;
    /**
     * Uses FollowModel to retrieve all following documents from follows collection
     * @returns Promise To be notified when the following are retrieved from
     * database
     */
    getUserFollowingList (userid: string): Promise<Follow[]>;

    /**
     * Removes follows from the database.
     * @param {string} userid  Primary key of user who follows all users
     * @returns Promise To be notified when follows entry is removed from the database
     */
    unfollowAllUsers( userid: string): Promise<any>;

    /**
     * Removes follows from the database.
     * @param {string} userid  Primary key of user who is removing all his followers
     * @returns Promise To be notified when follows entry is removed from the database
     */
    removeAllFollowers( userid: string): Promise<any>;
};