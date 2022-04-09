/**
 * @file Controller RESTful Web service API for Session resource
 */
import {Request, Response, Express} from "express";

/**
 * @class SessionController Implements RESTful Web service API for session resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/session/set/:name/:value to allow the users to set a session for a user</li>
 *     <li>GET /api/session/get/:name to get session details</li>
 *     <li>GET /api/session/get to get all session details</li>
 *     <li>GET /api/session/reset to reset a session</li>
 * </ul>
 * RESTful Web service API
 */
const SessionController = (app: Express) => {
    const setSession = (req: Request, res: Response) => {
        var name = req.params['name'];
        var value = req.params['value'];
        // @ts-ignore
        req.session[name] = value;
        // @ts-ignore
        res.send(req.session);
    }

    /**
     * Allows to get the session details.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including session details.
     */
    const getSession = (req: Request, res: Response) => {
        var name = req.params['name'];
        // @ts-ignore
        var value = req.session[name];
        res.send(value);
    }

    /**
     * Allows to get all the session details.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including all session details.
     */
    const getSessionAll = (req: Request, res: Response) => {
        // @ts-ignore
        res.send(req.session);
    }

    /**
     * Allows to reset the session .
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including session being destroyed.
     */
    const resetSession = (req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy();
        res.send(200);
    }
    
    app.get('/api/session/set/:name/:value',
        setSession);
    app.get('/api/session/get/:name',
        getSession);
    app.get('/api/session/get',
        getSessionAll);
    app.get('/api/session/reset',
        resetSession);
}

export default SessionController;