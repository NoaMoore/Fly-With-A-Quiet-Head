import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import VacationModel from "../Models/VacationModel";

// Our slice's data is products array.

// Reducer for adding all vacations to the slice: 
function initAll(currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {
    // action.payload is all products fetched from backend.
    const allVacations = action.payload;
    const newState = allVacations;
    return newState;
}

// Reducer for adding one vacation to the slice:  
function addVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    // action.payload is a single vacation to add.
    const vacationToAdd = action.payload;

      // Check if the vacation already exists in the state by ID
  const existVacationIndex = currentState.findIndex(
    (v) => v.id === vacationToAdd.id
  );

  // If the vacation is not already in the state, add it
  if (existVacationIndex === -1) {
    const newState = [...currentState, vacationToAdd];
    return newState;
  }

  // If the vacation already exists, update it in the state
  const newState = [...currentState];
  newState[existVacationIndex] = vacationToAdd;
  return newState;
}

// Reducer for updating one vacation in the slice:  
function updateVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    // action.payload is a single vacation to update.
    const vacationToUpdate = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(v => v.id === vacationToUpdate.id);
    if(index >= 0) newState[index] = vacationToUpdate;
    return newState;
}

// Reducer for deleting one vacation from the slice:  
function deleteVacation(currentState: VacationModel[], action: PayloadAction<number>): VacationModel[] {
    // action.payload is the id of the vacation to delete.
    const idToDelete = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(v => v.id === idToDelete);
    if(index >= 0) newState.splice(index, 1); // 1 = how many to delete
    return newState;
}

// Reducer for liking one vacation from the slice:
function addLike(
    currentState: VacationModel[],
    action: PayloadAction<number>
  ): void {
    // action.payload is the id of the vacation to like.
    const idToLike = action.payload;
    const vacation = currentState.find((v) => v.id === idToLike);
    if (vacation) {
      vacation.likesCount += 1;
      vacation.isLiked = 1;
    }
  }
  
  // Reducer for removing like from one vacation from the slice:
  function unLike(
    currentState: VacationModel[],
    action: PayloadAction<number>
  ): void {
    // action.payload is the id of the vacation to dislike.
    const idToLike = action.payload;
    const vacation = currentState.find((v) => v.id === idToLike);
    if (vacation) {
      vacation.likesCount -= 1;
      vacation.isLiked = 0;
    }
}

// function resetState(
//     currentState: VacationModel[],
//     action: PayloadAction
//   ): VacationModel[] {
//     return [];
//   }

function resetFilters(currentState: VacationModel[], action: PayloadAction): VacationModel[] {
  return [];
}

// Create the vacations slice - containing and managing only the products array: 
const vacationsSlice = createSlice({
    name: "vacations", // Unique name for the slice
    initialState: [],
    reducers: { initAll, addVacation, updateVacation, deleteVacation, addLike, unLike, resetFilters }
});

// Expose a single object containing functions for creating Action objects:
export const vacationActionCreators = vacationsSlice.actions;

// Expose a single object containing all reducers:
export const vacationReducersContainer = vacationsSlice.reducer;
