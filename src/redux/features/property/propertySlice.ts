 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const propertySlice = createSlice({
  name: "property",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setProperty: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setProperty } = propertySlice.actions;

export default propertySlice.reducer;
