import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Card from "../components/card";
import Login from "../components/loginModal/login";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { decode } from "base64-arraybuffer";
import Alert from "@mui/material/Alert";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import ChatList from "../components/Chat/chatSideBar";
import {
  addMatch,
  generatingMatches,
  loggingIn,
  updateLastUpdated,
  changeNaiKey,
  dislikeMatch,
} from "../store/user";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import generateDetails from "../utils/Card/generateDetails";
import { MdSettings, MdChatBubble } from "react-icons/md";
import generateCard from "../utils/Card/generateCard";
import { useRouter } from "next/router";
import getNaiAccessKey from "../utils/misc/important/getNaiAccessToken";
import MenuSettings from "../components/menuSettings";
import UserCard from "../components/userCard";
export default function Home() {
  // function to get api data
  const session = useSession();
  const supabase = useSupabaseClient();
  const [openSettings, setOpenSettings] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [workingKey, setWorkingKey] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [variation, setVariation] = useState("error");
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const naiKey = useSelector((state) => state.user.naiKey);
  const router = useRouter();
  const matches = useSelector((state) => state.user.matches);
  const id = useSelector((state) => state.user._id);
  // const isGeneratingMatches = useSelector(
  //   (state) => state.user.settings.isGeneratingMatches
  // );

  const getUserData = async () => {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("user_id", session.user.id);
    if (error) {
      console.log(error);
    } else {
      console.log(data[0]);
      dispatch(loggingIn(data[0]));
    }
  };
  let match;

  useEffect(() => {
    if (!loggedIn) {
      if (session) {
        getUserData();
        setLoggedIn(true);
      }
    }
  });
  useEffect(() => {
    if (matches.length < 5 && !generating) {
      generate();
    }
  }, [matches]);
  useEffect(() => {
    if (session) {
      updateMatchesOnDatabase();
    }
  }, [matches]);
  try {
    if (matches[0] === null) {
      dispatch(dislikeMatch());
    } else {
      matches.length > 0 ? (match = matches[0]) : (match = null);
    }
  } catch (error) {
    console.log(error);
  }

  const updateMatchesOnDatabase = async () => {
    const { data, error } = await supabase
      .from("users")
      .update({ matches: matches })
      .eq("user_id", session.user.id);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };
  const generate = async () => {
    if (matches.length > 3 || !session || generating) {
      return null;
    } else {
      await new Promise((r) => setTimeout(r, 2000));
    }
    setGenerating(true);
    let naiKey;
    try {
      naiKey = localStorage.getItem("naiToken");
      console.log("Got the key");
    } catch (error) {
      console.log(error);
      return null;
    }
    // const numberToGenerate = matches ? 5 - matches.length : 5;
    if (matches !== null) {
      if (matches[0] === null) {
        dispatch(dislikeMatch());
      }
    }
    dispatch(generatingMatches());
    console.log("Generating");
    console.log(naiKey);
    let matchesGenerated = await generateCard(
      `Bearer ${naiKey}`,
      { minAge: 18, maxAge: 100 },
      {},
      "euterpe-v2",
      user.settings.generateImages,
      id
    ).catch((err) => {
      console.log(err);
    });
    if (matchesGenerated) {
      if (matchesGenerated.image !== "") {
        let { data, error } = await supabase.storage
          .from("avatars")
          .upload(
            `${session.user.id}/${matchesGenerated.id}.png`,
            decode(matchesGenerated.image),
            {
              contentType: "image/png",
            }
          );
        const { data: data2, error: error2 } = supabase.storage
          .from("avatars")
          .getPublicUrl(`${session.user.id}/${matchesGenerated.id}.png`);
        if (data2) {
          matchesGenerated.image = data2.publicUrl;
        }
      } else {
        matchesGenerated.image = "";
      }
    }
    console.log("Generated Match", matchesGenerated);
    dispatch(addMatch(matchesGenerated));
    console.log("Done Generating");
    // if (session) {
    //   const { data, error } = await supabase
    //     .from("users")
    //     .update({ matches: matches })
    //     .match({ user_id: session.user.id });

    //   console.log(data, error);
    // }
    setGenerating(false);
  };

  // if (matches.length < 4 && !generating && session && workingKey) {
  //   setGenerating(true);
  //   generate();
  // } else {
  //   null;
  // }
  return !session ? (
    <div className={styles.homeScree}>
      {error ? (
        <div onClick={() => setError(false)} className={styles.errorContainer}>
          <ClickAwayListener onClickAway={() => setError(false)}>
            <Alert variant="filled" severity={variation}>
              {errorMessage}
            </Alert>
          </ClickAwayListener>
        </div>
      ) : null}
      <Login />
    </div>
  ) : (
    <div className={styles.homeScreen}>
      {error ? (
        <div onClick={() => setError(false)} className={styles.errorContainer}>
          <ClickAwayListener onClickAway={() => setError(false)}>
            <Alert
              variant="filled"
              severity={variation}
              className={styles.error}
            >
              {errorMessage}
            </Alert>
          </ClickAwayListener>
        </div>
      ) : null}
      {loggedIn && match && !editing ? (
        <Card match={match} generate={generate} />
      ) : generating ? (
        <CircularProgress />
      ) : null}
      <ChatList
        openChat={openChat}
        setOpenChat={setOpenChat}
        generate={generate}
      />
      <div className={styles.menuButtons}>
        <MdChatBubble
          onClick={() => setOpenChat(!openChat)}
          className={styles.chat}
        />
        <MdSettings
          onClick={() => setOpenSettings(!openSettings)}
          className={styles.settings}
        />
      </div>
      {editing ? (
        <UserCard user={user.profile} setEditing={setEditing} />
      ) : null}
      <MenuSettings
        open={openSettings}
        setOpen={setOpenSettings}
        activateNai={setWorkingKey}
        generate={generate}
        setError={setError}
        setErrorMessage={setErrorMessage}
        setVariation={setVariation}
        setEditing={setEditing}
      />
    </div>
  );
}
