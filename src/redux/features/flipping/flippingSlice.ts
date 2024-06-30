 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const flippingSlice = createSlice({
  name: "flipping",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setFlipping: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setFlipping } = flippingSlice.actions;

export default flippingSlice.reducer;
