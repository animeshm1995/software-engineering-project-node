import {Request, Response} from "express";

/**
 * @file UnBookMarkController interface Represents web services for bookmark resources
 */
export default interface UnbookMarkControllerI {
    userTogglesTuitUnbookmarks (req: Request, res: Response): void;
};