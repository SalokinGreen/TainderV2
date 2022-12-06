// Standard imports
import React from "react";
import styles from "../styles/editingCard.module.css";
// Libraries
import axios from "axios";
import { decode } from "base64-arraybuffer";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

// Store
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { likeMatch, dislikeMatch, setChats } from "../store/user";
import { changeDetails } from "../store/chat";
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
  return (
    <ClickAwayListener onClickAway={() => setEditing(false)}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.gender}>
            <BsFillMoonStarsFill className={styles.icon} />{" "}
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
            <BsGenderTrans className={styles.icon} />
          </div>
        </div>
        <div className={styles.image}>
          <figure className={styles.image}>
            {/* <img src={word.value} alt="Placeholder image" /> */}
            <Image src={img} alt="Placeholder image" width={512} height={512} />
          </figure>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.titleContainer}>
            <input
              value={chat.name}
              className={styles.nameInput}
              onChange={(e) =>
                dispatch(changeDetails({ type: "name", value: e.target.value }))
              }
            ></input>
          </div>
          <div className={styles.likes}>
            <AiFillLike className={styles.icon} />
            <input
              value={chat.likes}
              className={styles.Inputs}
              onChange={(e) =>
                dispatch(
                  changeDetails({ type: "likes", value: e.target.value })
                )
              }
            ></input>
          </div>
          <div className={styles.dislikes}>
            <AiFillDislike className={styles.icon} />
            <input
              value={chat.dislikes}
              className={styles.Inputs}
              onChange={(e) =>
                dispatch(
                  changeDetails({ type: "dislikes", value: e.target.value })
                )
              }
            ></input>
          </div>
          <div className={styles.dislikes}>
            <SiAboutdotme className={styles.icon} />
            <input
              value={chat.about}
              className={styles.Inputs}
              onChange={(e) =>
                dispatch(
                  changeDetails({ type: "about", value: e.target.value })
                )
              }
            ></input>
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
              <MdWork className={styles.icon} />{" "}
              <input
                value={chat.work}
                className={styles.Inputs}
                onChange={(e) =>
                  dispatch(
                    changeDetails({ type: "work", value: e.target.value })
                  )
                }
              ></input>
            </div>
            <div className={styles.details}>
              <BiWorld className={styles.icon} />{" "}
              <input
                value={chat.from}
                className={styles.Inputs}
                onChange={(e) =>
                  dispatch(
                    changeDetails({ type: "from", value: e.target.value })
                  )
                }
              ></input>
            </div>
            <div className={styles.details}>
              <AiFillStar className={styles.icon} />
              <input
                value={chat.attributes}
                className={styles.Inputs}
                onChange={(e) =>
                  dispatch(
                    changeDetails({ type: "attributes", value: e.target.value })
                  )
                }
              ></input>
            </div>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
}
