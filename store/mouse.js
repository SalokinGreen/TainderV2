import { createSlice } from "@reduxjs/toolkit";

export const mouseCounter = createSlice({
  name: "mouseCounter",
  initialState: {
    value: { start: { x: 0, y: 0 }, stop: { x: 0, y: 0 } },
  },
  reducers: {
    replaceStart: (state, action) => {
      state.value.start = action.payload;
    },
    replaceStop: (state, action) => {
      state.value.stop = action.payload;
    },
  },
});

export const { replaceStart, replaceStop } = mouseCounter.actions;

export const selectMouseCounter = (state) => state.mouseCounter.value;

export default mouseCounter.reducer;
