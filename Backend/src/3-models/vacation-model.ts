import Joi, { required } from "joi";
import { ValidationError } from "./client-errors";
import { UploadedFile } from "express-fileupload";

export class VacationModel {

    public id: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public image: UploadedFile;
    public likesAmount: number;
    public isLiked: number;

    public constructor(vacation: VacationModel) { // Copy Constructor
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.image = vacation.image;
        this.likesAmount = vacation.likesAmount;
        this.isLiked = vacation.isLiked;

        
    }

    // Build validation insert schema:
    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        destination: Joi.string().required(),
        description: Joi.string().required().max(180),
        startDate: Joi.date().min(Date.now()).required(),
        endDate: Joi.date().greater(Joi.ref('startDate')).required(),
        price: Joi.number().required().max(10000).positive(),
        // imageName: Joi.string(),
        image: Joi.object().required(),
        likesAmount: Joi.optional(),
        isLiked: Joi.optional()
    });


    private static updateValidationSchema = Joi.object({
        id: Joi.number().required().min(1).integer(),
        destination: Joi.string().required(),
        description: Joi.string().required().max(180),
        startDate: Joi.date().required(),
        endDate: Joi.date().greater(Joi.ref('startDate')).required(),
        price: Joi.number().required().max(10000).positive(),
        // imageName: Joi.string(),
        image: Joi.object().optional(),
        likesAmount: Joi.optional(),
        isLiked: Joi.optional()
    });


    // Validate insert:
    public validateInsert(): void {
        const result = VacationModel.insertValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    // Validate update:
    public validateUpdate(): void {
        const result = VacationModel.updateValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);

    }

}
