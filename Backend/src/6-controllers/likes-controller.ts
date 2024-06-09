import express, { NextFunction, Request, Response } from "express";
import { securityMiddleware } from "../4-middleware/security-middleware";
import { likesService } from "../5-services/likes-service";
import { StatusCode } from "../3-models/status-codes";

class LikesController {

    // The router listen to different routes: 
    public readonly router = express.Router();

    // Ctor: 
    public constructor() {
        this.registerRoutes();
    }

    // Register different routes: 
    private registerRoutes(): void {

        // this.router.get("/api/likes", this.getAllLikes);
        this.router.post("/api/like/", securityMiddleware.validateLoggedIn, this.likeVacation);
        this.router.delete("/api/like/:userId/:vacationId", securityMiddleware.validateLoggedIn, this.unLikeVacation); 
    }

    // Get all likes: 

    // private async getAllLikes(request: Request, response: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const likes = await likesService.getAllLikes();
    //         response.json(likes);
    //     }
    //     catch (err: any) { next(err) }
    // }


    private async likeVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const userId = +request.body.userId;
            const vacationId = +request.body.vacationId;
            const liked = await likesService.likeVacation(userId, vacationId);
            response.status(StatusCode.Created).json(liked);
        }
        catch (err: any) { next(err) }
    }

    private async unLikeVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const userId = +request.params.userId;
            const vacationId = +request.params.vacationId;
            const unLiked = await likesService.unlikeVacation(userId, vacationId);
            response.json(unLiked);
        }
        catch (err: any) { next(err) }
    }


}

const likesController = new LikesController();
export const likesRouter = likesController.router;