import { OkPacketParams } from "mysql2";
import { UserModel } from "../3-models/user-model";
import { dal } from "../2-utils/dal";
import { RoleModel } from "../3-models/role-model";
import { cyber } from "../2-utils/cyber";
import { CredentialsModel } from "../3-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";

class AuthService {

    // Register new user:
    public async register(user: UserModel): Promise<string> {
        user.validateRegister;
        // Is email taken:
        const isTaken = await this.isEmailTaken(user.email);
        if(isTaken) throw new ValidationError("Email already taken.");
        // Set role as User: 
        user.roleId = RoleModel.User;
        // Hash password: 
        user.password = cyber.hashPassword(user.password); 
        const sql = "INSERT INTO users(firstName, lastName, email, password, roleId) VALUES(?,?,?,?,?)";
        const values = [user.firstName, user.lastName, user.email, user.password, user.roleId];
        const info: OkPacketParams = await dal.execute(sql, values);
        user.id = info.insertId;
        // Create token:
        const token = cyber.getNewToken(user);
        return token;
    }

    // Login existing user:
    public async login(credentials: CredentialsModel): Promise<string> {
        credentials.validateLogin;
        // Hash password:
        credentials.password = cyber.hashPassword(credentials.password);
        // Create prepared statement:
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        const values = [credentials.email, credentials.password];
        const users = await dal.execute(sql, values);
        const user = users[0];
        if(!user) throw new UnauthorizedError("Incorrect email or password");
        // Create token:
        const token = cyber.getNewToken(user);
        return token;
    }

    // // Check in the db if email already exist:
    private async isEmailTaken(email: string): Promise<boolean> {   
        const sql = `SELECT * FROM users 
        WHERE email = ?`;
        const values = [email]
        const users = await dal.execute(sql, values);
        const user = users[0];
        if(user) return true;
        
    }

}

export const authService = new AuthService();
