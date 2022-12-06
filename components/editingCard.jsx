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
import { useState } from "react";
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
    let { data, error } = await supabase
      .from("chats")
      .update({ likes: sendChat })
      .eq({ user_id: session.user.id })
      .eq({ uuid: chat.id });
    if (error) {
      console.log(error);
    }
  };
  const updateDislike = async () => {};
  const updateAge = async () => {};
  const updateGender = async () => {};
  const updateName = async () => {};
  const updateMe = async () => {};
  const updateWork = async () => {};
  const updateHome = async () => {};
  const updateAttributes = async () => {};
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
