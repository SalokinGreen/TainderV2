import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import mouseCounterReducer from "./mouse";
import userCounterReducer from "./user";
import chatCounterReducer from "./chat";

export function makeStore() {
  return configureStore({
    reducer: {
      chat: chatCounterReducer,
      mouse: mouseCounterReducer,
      user: userCounterReducer,
    },
  });
}

const store = makeStore();

export default store;
