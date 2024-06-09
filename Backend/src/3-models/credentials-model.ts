import Joi from "joi";
import { ValidationError } from "./client-errors";

export class CredentialsModel {

    public email: string;
    public password: string;
    
    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    private static loginValidationSchema = Joi.object({
        email: Joi.string().required().min(12).email(),
        password: Joi.string().required().min(4)
    });
    
    public validateLogin(): void {
        const result = CredentialsModel.loginValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
    
}
