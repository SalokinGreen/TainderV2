import { createSlice } from "@reduxjs/toolkit";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export const userCounter = createSlice({
  name: "userCounter",
  initialState: {
    email: "",
    password: "",
    _id: "",
    settings: {
      cardDetailsOpen: false,
      isGeneratingMatches: false,
      generateImages: false,
    },
    matches: [],
    chats: [],
    naiKey: "",
    lastUpdated: Date.now(),
    profile: {
      name: "Nick",
      age: 21,
      about: "I'm a cool guy",
      likes: "I like to eat",
      dislikes: "I don't like mean people",
      from: "America",
      work: "Student",
      gender: "Man",
      image: "https://i.imgur.com/Unkf3Xe.png",
      attributes: "cool, tall, nice",
    },
  },
  reducers: {
    turnCard: (state) => {
      state.settings.cardDetailsOpen === true
        ? (state.settings.cardDetailsOpen = false)
        : (state.settings.cardDetailsOpen = true);
    },
    addMatch: (state, action) => {
      state.matches.push(action.payload);
    },
    likeMatch: (state, action) => {
      state.matches.shift();
    },
    dislikeMatch: (state) => {
      state.matches.shift();
    },
    generatingMatches: (state) => {
      state.settings.isGeneratingMatches
        ? (state.settings.isGeneratingMatches = false)
        : (state.settings.isGeneratingMatches = true);
    },
    loggingIn: (state, action) => {
      state.email = action.payload.email;
      state.matches = action.payload.matches;
      console.log(action.payload.chats);
      state.chats = action.payload.chats;
      state.naiKey = action.payload.naiKey;
      state.settings.global = action.payload.settings;
      action.payload.profile === null
        ? null
        : (state.profile = action.payload.profile);
    },
    updateLastUpdated: (state) => {
      state.lastUpdated = Date.now();
    },
    changeNaiKey: (state, action) => {
      state.naiKey = action.payload;
    },
    setGenerateImages: (state) => {
      state.settings.generateImages
        ? (state.settings.generateImages = false)
        : (state.settings.generateImages = true);
    },
    setChats: (state, action) => {
      state.chats.push(action.payload);
    },
    changeDetails: (state, action) => {
      switch (action.payload.type) {
        case "name":
          state.profile.name = action.payload.value;
          break;
        case "age":
          state.profile.age = action.payload.value;
          break;
        case "about":
          state.profile.about = action.payload.value;
          break;
        case "from":
          state.profile.from = action.payload.value;
          break;
        case "work":
          state.profile.work = action.payload.value;
          break;
        case "likes":
          state.profile.likes = action.payload.value;
          break;
        case "dislikes":
          state.profile.dislikes = action.payload.value;
          break;
        case "attributes":
          state.profile.attributes = action.payload.value;
          break;

        default:
          state.profile.gender = action.payload.value;
          break;
      }
    },
  },
});

export const {
  turnCard,
  addMatch,
  likeMatch,
  dislikeMatch,
  generatingMatches,
  loggingIn,
  updateLastUpdated,
  changeNaiKey,
  setGenerateImages,
  setChats,
  changeDetails,
} = userCounter.actions;

export const selectUserCounter = (state) => state.settingsCounter.value;

export default userCounter.reducer;
