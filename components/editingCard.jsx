// Standard imports
import React from "react";
import styles from "../styles/editingCard.module.css";
// Libraries
import axios from "axios";
import { decode } from "base64-arraybuffer";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import getAge from "../utils/Card/Details/getAge";
import getAttributes from "../utils/Card/Details/getAttributes";
import getCountry from "../utils/Card/Details/getCountry";
import getName from "../utils/Card/Details/getName";
import getWork from "../utils/Card/Details/getWork";

// Store
import { updateChatAvatar } from "../store/user";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { changeDetails, rerollChat } from "../store/chat";
// Components
import { MdWork } from "react-icons/md";
import {
  AiFillHeart,
  AiFillDislike,
  AiFillStar,
  AiFillLike,
} from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { BsGenderTrans, BsFillMoonStarsFill } from "react-icons/bs";
import { GiBrokenHeart, GiHearts } from "react-icons/gi";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { SiAboutdotme } from "react-icons/si";
import Image from "next/image";
// Utils
import cleanNaiImgResponse from "../utils/misc/cleanNaiImgResponse";
import chat from "../store/chat";
import { style } from "@mui/system";

// Dating Profile like card

export default function EditingCard({ chat, setEditing }) {
  const [cardDetails, setCardDetails] = useState(false);
  const [saving, setSaving] = useState(false);
  const [rerolling, setRerolling] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();
  const dispatch = useDispatch();

  let img;
  if (chat.avatar.length > 0) {
    img = chat.avatar;
  } else {
    img = "/placeholder.png";
  }
  const updateLike = async () => {
    const likes = chat.likes;
    const { data, error } = await supabase
      .from("chats")
      .update({ likes: likes })
      .match({ user_id: session.user.id, uuid: chat.id });
    if (error) {
      console.log(error);
    }
    setSaving(false);
  };
  const updateDislike = async () => {
    let { data, error } = await supabase
      .from("chats")
      .update({ chat: chat.messages })
      .match({ user_id: session.user.id, uuid: chat.id });
    if (error) {
      console.log(error);
    }
    setSaving(false);
  };
  const updateAge = async () => {
    let { data, error } = await supabase
      .from("chats")
      .update({ age: chat.age })
      .match({ user_id: session.user.id, uuid: chat.id });
    if (error) {
      console.log(error);
    }
    setSaving(false);
  };
  const updateGender = async () => {
    let { data, error } = await supabase
      .from("chats")
      .update({ gender: chat.gender })
      .match({ user_id: session.user.id, uuid: chat.id });
    if (error) {
      console.log(error);
    }
    setSaving(false);
  };
  const updateName = async () => {
    let { data, error } = await supabase
      .from("chats")
      .update({ name: chat.name })
      .match({ user_id: session.user.id, uuid: chat.id });
    if (error) {
      console.log(error);
    }
    setSaving(false);
  };
  const updateAbout = async () => {
    let { data, error } = await supabase
      .from("chats")
      .update({ about: chat.about })
      .match({ user_id: session.user.id, uuid: chat.id });
    if (error) {
      console.log(error);
    }
    setSaving(false);
  };
  const updateWork = async () => {
    let { data, error } = await supabase
      .from("chats")
      .update({ work: chat.work })
      .match({ user_id: session.user.id, uuid: chat.id });
    if (error) {
      console.log(error);
    }
    setSaving(false);
  };
  const updateFrom = async () => {
    let { data, error } = await supabase
      .from("chats")
      .update({ from: chat.from })
      .match({ user_id: session.user.id, uuid: chat.id });
    if (error) {
      console.log(error);
    }
    setSaving(false);
  };
  const updateAttributes = async () => {
    let { data, error } = await supabase
      .from("chats")
      .update({ attributes: chat.attributes })
      .match({ user_id: session.user.id, uuid: chat.id });
    if (error) {
      console.log(error);
    }
    setSaving(false);
  };
  const updateImage = async () => {
    let { data, error } = await supabase
      .from("chats")
      .update({ image: chat.avatar })
      .match({ user_id: session.user.id, uuid: chat.id });
    if (error) {
      console.log(error);
    }
    setSaving(false);
  };
  useEffect(() => {
    if (!saving) {
      setSaving(true);
      updateLike();
    }
  }, [chat.likes]);
  useEffect(() => {
    if (!saving) {
      setSaving(true);
      updateDislike();
    }
  }, [chat.dislikes]);
  useEffect(() => {
    if (!saving) {
      setSaving(true);
      updateAge();
    }
  }, [chat.age]);
  useEffect(() => {
    if (!saving) {
      setSaving(true);
      updateGender();
    }
  }, [chat.gender]);
  useEffect(() => {
    if (!saving) {
      setSaving(true);
      updateName();
    }
  }, [chat.name]);
  useEffect(() => {
    if (!saving) {
      setSaving(true);
      updateAbout();
    }
  }, [chat.about]);
  useEffect(() => {
    if (!saving) {
      setSaving(true);
      updateWork();
    }
  }, [chat.work]);
  useEffect(() => {
    if (!saving) {
      setSaving(true);
      updateFrom();
    }
  }, [chat.from]);
  useEffect(() => {
    if (!saving) {
      setSaving(true);
      updateAttributes();
    }
  }, [chat.attributes]);
  useEffect(() => {
    if (!saving) {
      setSaving(true);
      updateImage();
    }
  }, [chat.avatar]);

  const reroll = async (type) => {
    let naiKey;
    try {
      naiKey = localStorage.getItem("naiToken");
      console.log("Got the key");
    } catch (error) {
      console.log(error);
      return null;
    }
    setRerolling(true);
    switch (type) {
      case "age":
        dispatch(rerollChat({ type: "age", value: getAge(18, 100) }));
        break;
      case "gender":
        // 50/50 chance
        const gender = Math.random() < 0.5 ? "Man" : "Woman";
        dispatch(rerollChat({ type: "gender", value: gender }));
        break;
      case "name":
        const existingGender = chat.gender === "Man" ? "man" : "woman";
        dispatch(rerollChat({ type: "name", value: getName(existingGender) }));
        break;

      case "work":
        dispatch(rerollChat({ type: "work", value: getWork() }));
        break;
      case "from":
        dispatch(rerollChat({ type: "from", value: getCountry() }));
        break;
      case "attributes":
        dispatch(rerollChat({ type: "attributes", value: getAttributes() }));
        break;
      case "likes":
        dispatch(rerollChat({ type: "likes", value: "Generating..." }));
        const likes = await axios.post("api/reroll", {
          type: "likes",
          input: chat,
          key: naiKey,
          model: "euterpe-v2",
        });
        console.log(likes);
        dispatch(rerollChat({ type: "likes", value: likes.data.output }));
        break;
      case "dislikes":
        dispatch(rerollChat({ type: "dislikes", value: "Generating..." }));
        const dislikes = await axios.post("api/reroll", {
          type: "dislikes",
          input: chat,
          key: naiKey,
          model: "euterpe-v2",
        });
        console.log(dislikes);
        dispatch(rerollChat({ type: "dislikes", value: dislikes.data.output }));
        break;
      case "about":
        dispatch(rerollChat({ type: "about", value: "Generating..." }));
        const about = await axios.post("api/reroll", {
          type: "about",
          input: chat,
          key: naiKey,
          model: "euterpe-v2",
        });
        console.log(about);
        dispatch(rerollChat({ type: "about", value: about.data.output }));
        break;
      case "image":
        dispatch(rerollChat({ type: "image", value: "/loading.gif" }));
        const image = await axios.post("api/reroll", {
          type: "image",
          input: chat,
          key: naiKey,
          model: "euterpe-v2",
        });
        console.log(image);
        const cleanImage = cleanNaiImgResponse(image.data);
        if (chat.avatar === "") {
          let { data, error } = await supabase.storage
            .from("avatars")
            .upload(`${session.user.id}/${chat.id}.png`, decode(cleanImage), {
              contentType: "image/png",
            });
          error ? console.log(error) : null;
          const { data: data2, error: error2 } = supabase.storage
            .from("avatars")
            .getPublicUrl(`${session.user.id}/${chat.id}.png`);
          if (data2) {
            dispatch(rerollChat({ type: "image", value: data2.publicUrl }));
            dispatch(
              updateChatAvatar({
                uuid: chat.id,
                avatar: data2.publicUrl + `?${new Date()}`,
              })
            );
          } else {
            console.log(error2);
          }
        } else {
          const imageUrl = chat.avatar;
          const { data: data2, error: error2 } = await supabase.storage
            .from("avatars")
            .remove([`${session.user.id}/${chat.id}.png`]);
          error2 ? console.log(error2) : console.log(data2);
          const { data, error } = await supabase.storage
            .from("avatars")
            .upload(`${session.user.id}/${chat.id}.png`, decode(cleanImage), {
              contentType: "image/png",
            });
          error ? console.log(error) : console.log(data);

          dispatch(
            rerollChat({ type: "image", value: imageUrl + `?${new Date()}` })
          );
          dispatch(
            updateChatAvatar({
              uuid: chat.id,
              avatar: imageUrl + `?${new Date()}`,
            })
          );
        }
        break;
      default:
        console.log("Reroll error");
        break;
    }
    setRerolling(false);
  };
  return (
    <ClickAwayListener onClickAway={() => setEditing(false)}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.gender}>
            <BsFillMoonStarsFill
              className={styles.icon}
              onClick={() => reroll("age")}
            />{" "}
            <input
              value={chat.age}
              className={styles.ageInput}
              onChange={(e) =>
                dispatch(changeDetails({ type: "age", value: e.target.value }))
              }
            ></input>
          </div>
          <div className={styles.gender}>
            <input
              value={chat.gender}
              className={styles.genderInput}
              onChange={(e) =>
                dispatch(
                  changeDetails({ type: "gender", value: e.target.value })
                )
              }
            ></input>{" "}
            <BsGenderTrans
              className={styles.icon}
              onClick={() => reroll("gender")}
            />
          </div>
        </div>
        <div className={styles.image}>
          <figure
            className={styles.image}
            onClick={rerolling ? null : () => reroll("image")}
          >
            {/* <img src={word.value} alt="Placeholder image" /> */}
            <Image src={img} alt="Placeholder image" width={512} height={512} />
          </figure>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.titleContainer}>
            <textarea
              value={chat.name}
              className={styles.nameInput}
              onChange={(e) =>
                dispatch(changeDetails({ type: "name", value: e.target.value }))
              }
            ></textarea>
          </div>
          <div className={styles.likes}>
            <AiFillLike
              className={styles.icon}
              onClick={rerolling ? null : () => reroll("likes")}
            />
            <textarea
              value={chat.likes}
              className={styles.Inputs}
              onChange={(e) =>
                dispatch(
                  changeDetails({ type: "likes", value: e.target.value })
                )
              }
            ></textarea>
          </div>
          <div className={styles.dislikes}>
            <AiFillDislike
              className={styles.icon}
              onClick={rerolling ? null : () => reroll("dislikes")}
            />
            <textarea
              value={chat.dislikes}
              className={styles.Inputs}
              onChange={(e) =>
                dispatch(
                  changeDetails({ type: "dislikes", value: e.target.value })
                )
              }
            ></textarea>
          </div>
          <div className={styles.dislikes}>
            <SiAboutdotme
              className={styles.icon}
              onClick={rerolling ? null : () => reroll("about")}
            />
            <textarea
              value={chat.about}
              className={styles.Inputs}
              onChange={(e) =>
                dispatch(
                  changeDetails({ type: "about", value: e.target.value })
                )
              }
            ></textarea>
          </div>
        </div>

        <div className={styles.detailsOpen}>
          {cardDetails ? (
            <TiArrowSortedUp
              onClick={() => setCardDetails(false)}
              className={styles.cardArrow}
            />
          ) : (
            <TiArrowSortedDown
              onClick={() => setCardDetails(true)}
              className={styles.cardArrow}
            />
          )}
          <div
            style={{
              display: cardDetails ? "flex" : "none",
              flexDirection: "column",
              justifyContent: "center",
              alignSelf: "normal",
            }}
          >
            <div className={styles.details}>
              <MdWork className={styles.icon} onClick={() => reroll("work")} />{" "}
              <textarea
                value={chat.work}
                className={styles.Inputs}
                onChange={(e) =>
                  dispatch(
                    changeDetails({ type: "work", value: e.target.value })
                  )
                }
              ></textarea>
            </div>
            <div className={styles.details}>
              <BiWorld className={styles.icon} onClick={() => reroll("from")} />{" "}
              <textarea
                value={chat.from}
                className={styles.Inputs}
                onChange={(e) =>
                  dispatch(
                    changeDetails({ type: "from", value: e.target.value })
                  )
                }
              ></textarea>
            </div>
            <div className={styles.details}>
              <AiFillStar
                className={styles.icon}
                onClick={() => reroll("attributes")}
              />
              <textarea
                value={chat.attributes}
                className={styles.Inputs}
                onChange={(e) =>
                  dispatch(
                    changeDetails({ type: "attributes", value: e.target.value })
                  )
                }
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
}
