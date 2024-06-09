import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/status-codes";
import { securityMiddleware } from "../4-middleware/security-middleware";
import { fileSaver } from "uploaded-file-saver";
import { vacationsService } from "../5-services/vacations-service";
import { VacationModel } from "../3-models/vacation-model";

class VacationsController {

    // The router listen to different routes: 
    public readonly router = express.Router();

    // Ctor: 
    public constructor() {
        this.registerRoutes();
    }

    // Register different routes: 
    private registerRoutes(): void {
        this.router.get("/api/vacations/:userId", this.getAllVacations);
        this.router.get("/api/vacation-by-id/:id", this.getOneVacation); // Route parameter
        this.router.post("/api/vacations", securityMiddleware.validateLoggedIn, securityMiddleware.validateAdmin, this.addVacation);
        this.router.put("/api/vacations/:id", securityMiddleware.validateLoggedIn, securityMiddleware.validateAdmin, this.updateVacation);
        this.router.delete("/api/vacations/:id", securityMiddleware.validateLoggedIn, securityMiddleware.validateAdmin, this.deleteVacation);
        this.router.get("/api/vacations/images/:imageName", this.getImageFile);
    }

    // Get all vacations: 
    private async getAllVacations(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const userId = +request.params.userId;
            const vacations = await vacationsService.getAllVacations(userId);
            response.json(vacations);
        }
        catch (err: any) { next(err) }
    }

    // Get one vacation:
    private async getOneVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id;
            const vacation = await vacationsService.getOneVacation(id);
            response.json(vacation);
        }
        catch (err: any) { next(err) }
    }

    // Add new vacation: 
    private async addVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.image = request.files?.image;
            const vacation = new VacationModel(request.body); // We must tell express to create this "body" from the given json.
            const addedVacation = await vacationsService.addVacation(vacation);
            response.status(StatusCode.Created).json(addedVacation);
        }
        catch (err: any) { next(err) }
    }

    // Update existing vacation: 
    private async updateVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.image = request.files?.image;
            request.body.id = +request.params.id;
            const vacation = new VacationModel(request.body); // We must tell express to create this "body" from the given json.
            const updatedVacation = await vacationsService.updateVacation(vacation);
            response.status(StatusCode.OK).json(updatedVacation);
        }
        catch (err: any) { next(err) }
    }

    // Delete existing vacation: 
    private async deleteVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id;
            await vacationsService.deleteVacation(id);
            response.sendStatus(StatusCode.NoContent); // Same as: response.status(StatusCode.NoContent).send();
        }
        catch (err: any) { next(err) }
    }

    // Get image file: 
    private async getImageFile(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const imageName = request.params.imageName;
            const imagePath = fileSaver.getFilePath(imageName);
            response.sendFile(imagePath);
        }
        catch (err: any) { next(err) }
    }

}

const vacationsController = new VacationsController();
export const vacationsRouter = vacationsController.router;
