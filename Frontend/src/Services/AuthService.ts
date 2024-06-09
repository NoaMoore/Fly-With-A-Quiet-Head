import axios from "axios";
import UserModel from "../Models/UserModel";
import { appConfig } from "../Utils/AppConfig";
import { jwtDecode } from "jwt-decode";
import { appStore } from "../Redux/Store";
import CredentialsModel from "../Models/CredentialsModel";
import { authActionsCreators } from "../Redux/AuthSlice";

class AuthService {

    // Constructor:
    public constructor() {

        // Get token from session storage: 
        const token = sessionStorage.getItem("token");

        // If exists: 
        if (token) {

            // Extract the user from the token: 
            const loggedInUser = jwtDecode<{ user: UserModel }>(token).user;

            // Update global state: 
            appStore.dispatch(authActionsCreators.login(loggedInUser));
        }
    }

    // Register a new user: 
    public async register(user: UserModel): Promise<void> {

        // Send the new user to backend: 
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Extract the JWT token:
        const token = response.data;

        // Extract the user from the token: 
        const registeredUser = jwtDecode<{ user: UserModel }>(token).user;

        // Update global state: 
        appStore.dispatch(authActionsCreators.register(registeredUser));

        // Save token in the session storage: 
        sessionStorage.setItem("token", token);
    }

    // Login existing user:
    public async login(credentials: CredentialsModel): Promise<void> {

        // Send the credentials to backend: 
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Extract the JWT token:
        const token = response.data;

        // Extract the user from the token: 
        const loggedInUser = jwtDecode<{ user: UserModel }>(token).user;

        // Update global state: 
        appStore.dispatch(authActionsCreators.login(loggedInUser));

        // Save token in the session storage: 
        sessionStorage.setItem("token", token);
    }

    // Logout:
    public logout(): void {

        // Update global state: 
        appStore.dispatch(authActionsCreators.logout());

        // remove token from session storage: 
        sessionStorage.removeItem("token");
    }

}

export const authService = new AuthService();

