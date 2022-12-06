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
    changeDetails: (state, action) => {
      switch (action.payload.type) {
        case "name":
          state.name = action.payload.value;
          break;
        case "age":
          state.age = action.payload.value;
          break;
        case "about":
          state.about = action.payload.value;
          break;
        case "from":
          state.from = action.payload.value;
          break;
        case "work":
          state.work = action.payload.value;
          break;
        case "likes":
          state.likes = action.payload.value;
          break;
        case "dislikes":
          state.dislikes = action.payload.value;
          break;
        case "attributes":
          state.attributes = action.payload.value;
          break;

        default:
          state.gender = action.payload.value;
          break;
      }
    },
  },
});

export const {
  replacePartner,
  getAvatar,
  addMessage,
  changeChat,
  changeDetails,
} = chatCounter.actions;

export const selectChatCounter = (state) => state.chatCounter.value;

export default chatCounter.reducer;
