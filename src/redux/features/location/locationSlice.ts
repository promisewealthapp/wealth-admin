 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const locationSlice = createSlice({
  name: "location",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
