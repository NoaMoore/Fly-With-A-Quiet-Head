import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { appStore } from "../Redux/Store";
import VacationModel from "../Models/VacationModel";
import { vacationActionCreators } from "../Redux/VacationsSlice";

class VacationsService {

    // Get all vacations from backend:
    public async getAllVacations(): Promise<VacationModel[]> {
        // Get all vacations from global state: 
        let vacations = appStore.getState().vacations;
        let user = appStore.getState().user;
        // If we have the vacations in the global state - return them:
        if (vacations.length > 0) return vacations;
        // Get all vacations from backend: 
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl+user.id);
        // Extract vacations from the response:
        vacations = response.data;
        // Create action for init all vacations: 
        const action = vacationActionCreators.initAll(vacations);
        // Send action to global state: 
        appStore.dispatch(action);
        // Return vacations to the component:
        return vacations;
    }

    // Get one vacation: 
    public async getOneVacation(id: number): Promise<VacationModel> {
        // Get all vacations from global state: 
        let vacations = appStore.getState().vacations;
        // Find the desired vacation: 
        let vacation = vacations.find(v => v.id === id);
        // If we have that vacation in the global state - return it:
        if (vacation) return vacation;
        // Get that vacation from the backend: 
        const response = await axios.get<VacationModel>(appConfig.vacationUrl + id);        
        // Extract the product from the response: 
        vacation = response.data;        
        return vacation;
    }

    // Add vacation: 
    public async addVacation(vacation: VacationModel): Promise<void> {
        // Add the new vacation to backend:
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, appConfig.axiosOptions);
        // Extract the added vacation from the response:
        const addedVacation = response.data;
        // Create action for adding a vacation to the global state: 
        const action = vacationActionCreators.addVacation(addedVacation);
        // Send action to global state: 
        appStore.dispatch(action);
    };

    // Update vacation: 
    public async updateVacation(vacation: VacationModel): Promise<void> {
       // Send the update to backend:
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.id, vacation, appConfig.axiosOptions);
        // Extract the updated vacation from the backend:
        const updatedVacation = response.data;
        // Create action for updating a vacation in the global state: 
        const action = vacationActionCreators.updateVacation(updatedVacation);
        // Send action to global state: 
        appStore.dispatch(action);

    }

    // Delete product: 
    public async deleteVacation(id: number): Promise<void> {
        // Delete vacation from backend: 
        await axios.delete(appConfig.vacationsUrl + id);
        // Create action for deleting a vacation from the global state: 
        const action = vacationActionCreators.deleteVacation(id);
        // Send action to global state: 
        appStore.dispatch(action);
    }

    // Add like:
    public async addLike(userId: number, vacationId: number): Promise<void> {
        // Add the new like to backend:
        const response = await axios.post(appConfig.likeUrl, {userId, vacationId});
        // Extract the added product from the response:
        const addedLikeByVacationId = response.data.vacationId;
        console.log(addedLikeByVacationId);
        const action = vacationActionCreators.addLike(vacationId);
        appStore.dispatch(action);
     }



    // Delete like: 
    public async unLike(userId: number, vacationId: number): Promise<void> {
        // Delete product from backend: 
        await axios.delete(appConfig.likeUrl+`${userId}/${vacationId}`);
        // Create action for deleting a product from the global state: 
        const action = vacationActionCreators.unLike(vacationId);
        // Send action to global state: 
        appStore.dispatch(action);
    }
    };


export const vacationsService = new VacationsService();
