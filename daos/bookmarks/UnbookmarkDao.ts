import UnbookmarkDaoI from "../../interfaces/bookmarks/UnBookMarkDao";
import UnbookMark from "../../models/bookmarks/Unbookmark";

export default class UnbookmarkDao {
    private static unbookmarkDao: UnbookmarkDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns BookMarkDao
     */
    public static getInstance = (): UnbookmarkDao => {
        if(UnbookmarkDao.unbookmarkDao === null) {
            UnbookmarkDao.unbookmarkDao = new UnbookmarkDao();
        }
        return UnbookmarkDao.unbookmarkDao;
    }


    countHowManyUnbookmarkedTuit(tid: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    /*findUserUnbookmarksTuit(tid: string, uid: string): Promise<UnbookMark> {
        return Promise.resolve(undefined);
    }*/

    userUnbookmarksTuit(tid: string, uid: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    userUndoUnbookmarkTuit(tid: string, uid: string): Promise<any> {
        return Promise.resolve(undefined);
    }

}