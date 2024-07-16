 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const promotionSlice = createSlice({
  name: "promotion",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setPromotion: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setPromotion } = promotionSlice.actions;

export default promotionSlice.reducer;
