// import LikeModel from "../Models/LikeModel";
import UserModel from "../Models/UserModel";
import VacationModel from "../Models/VacationModel";

// Application global state: 
export type AppState = {

    // First slice data - array of products: 
    vacations: VacationModel[];
    
    // Third slice data - the user:
    user: UserModel;
};
