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
} = userCounter.actions;

export const selectUserCounter = (state) => state.settingsCounter.value;

export default userCounter.reducer;
