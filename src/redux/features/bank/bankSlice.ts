 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const bankSlice = createSlice({
  name: "bank",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setBank: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setBank } = bankSlice.actions;

export default bankSlice.reducer;
