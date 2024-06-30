 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const groupSlice = createSlice({
  name: "group",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setGroup: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setGroup } = groupSlice.actions;

export default groupSlice.reducer;
