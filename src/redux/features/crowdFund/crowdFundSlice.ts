 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const crowdFundSlice = createSlice({
  name: "crowdFund",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setCrowdFund: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setCrowdFund } = crowdFundSlice.actions;

export default crowdFundSlice.reducer;
