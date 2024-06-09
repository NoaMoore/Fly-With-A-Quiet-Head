import Joi from "joi";
import { ValidationError } from "./client-errors";

export class UserModel {

    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: number;

    
    
    public constructor(user: UserModel) {

        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

       // Build validation insert schema:
       private static registerValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        firstName: Joi.string().required().min(2).max(25),
        lastName: Joi.string().required().min(2).max(20),
        email: Joi.string().email({ minDomainSegments: 2 }).domain({ tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().min(4).required,
        roleId: Joi.number().optional().integer().min(1).max(2),
    });

    // Validate insert:
    public validateRegister(): void {
        const result = UserModel.registerValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }  

}
