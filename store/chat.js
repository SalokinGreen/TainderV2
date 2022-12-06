import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const chatCounter = createSlice({
  name: "chatCounter",
  initialState: {
    id: {},
    name: "",
    avatar: "",
    messages: [],
    gotAvatar: false,
    settings: {
      model: "euterpe-v2",
    },
  },
  reducers: {
    replacePartner: (state, action) => {
      state.id = action.payload.uuid;
      state.name = action.payload.name;
      state.about = action.payload.about;
      state.age = action.payload.age;
      state.attributes = action.payload.attributes;
      state.messages = action.payload.chat;
      state.dislikes = action.payload.dislikes;
      state.likes = action.payload.likes;
      state.from = action.payload.from;
      state.work = action.payload.work;
      state.user_id = action.payload.user_id;
      state.gender = action.payload.gender;
      state.avatar = action.payload.image;
    },
    getAvatar: (state) => {
      state.gotAvatar = true;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    changeChat: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { replacePartner, getAvatar, addMessage, changeChat } =
  chatCounter.actions;

export const selectChatCounter = (state) => state.chatCounter.value;

export default chatCounter.reducer;
