// Standard imports
import React from "react";
import styles from "../styles/card.module.css";
// Libraries
import axios from "axios";
import { decode } from "base64-arraybuffer";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

// Store
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { likeMatch, dislikeMatch, setChats } from "../store/user";
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

// Dating Profile like card

export default function Card({ match, generate }) {
  let sendMatch;
  const [cardDetails, setCardDetails] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();
  const chats = useSelector((state) => state.user.chats);
  const matches = useSelector((state) => state.user.matches);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user._id);
  const getImages = async () => {
    const response = await axios.get("/api/hello");
    const img = cleanNaiImgResponse(response.data.data);
    const returnImg = `data:image/jpeg;base64,${img}`;
    return returnImg;
  };

  let img;
  if (match.image.length > 0) {
    img = `data:image/png;base64,${match.image}`;
  } else {
    img = "/placeholder.png";
  }
  const like = async () => {
    let sendChat = [...chats];
    console.log(sendChat);

    sendChat.push({
      uuid: match.id,
      name: match.name,
      lastMessage: {},
    });
    uploadMatch();
    dispatch(setChats({ uuid: match.id, name: match.name, lastMessage: {} }));
    dispatch(likeMatch());
    // update chats
    let { data, error } = await supabase
      .from("users")
      .update({ chats: sendChat })
      .match({ user_id: session.user.id });
    generate();
    const { data: data2, error: error2 } = await supabase
      .from("users")
      .update({ matches: matches.slice(1) })
      .eq("user_id", session.user.id);
    if (error2) {
      console.log(error2);
    }
  };
  const dislike = async () => {
    dispatch(dislikeMatch());
    const { data, error } = await supabase
      .from("users")
      .update({ matches: matches.slice(1) })
      .eq("user_id", session.user.id);
    if (error) {
      console.log(error);
    } else {
    }
    generate();
    // generate();
  };
  const uploadMatch = async () => {
    let { data, error } = await supabase.from("chats").insert([
      {
        user_id: session.user.id,
        chat: [],
        name: match.name,
        uuid: match.id,
        likes: match.likes,
        dislikes: match.dislikes,
        about: match.about,
        age: match.age,
        work: match.work,
        attributes: match.attributes,
        gender: match.gender,
        from: match.from,
      },
    ]);
    if (match.image !== "") {
      let { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${session.user.id}/${match.id}.png`, decode(match.image), {
          contentType: "image/png",
        });
    }
  };
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.gender}>
          <BsFillMoonStarsFill className={styles.icon} /> {match.age}
        </div>
        <div className={styles.gender}>
          {match.gender} <BsGenderTrans className={styles.icon} />
        </div>
      </div>
      <div className={styles.image}>
        <figure className={styles.image} onClick={() => getImages()}>
          {/* <img src={word.value} alt="Placeholder image" /> */}
          <Image src={img} alt="Placeholder image" width={512} height={512} />
        </figure>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{match.name}</p>
        </div>
        <div className={styles.likes}>
          <AiFillLike className={styles.icon} />
          <p>{match.likes}</p>
        </div>
        <div className={styles.dislikes}>
          <AiFillDislike className={styles.icon} />
          <p>{match.dislikes}</p>
        </div>
        <div className={styles.dislikes}>
          <SiAboutdotme className={styles.icon} />
          <p>{match.about}</p>
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
            <MdWork className={styles.icon} /> <p>{match.work}</p>
          </div>
          <div className={styles.details}>
            <BiWorld className={styles.icon} /> <p>{match.from}</p>
          </div>
          <div className={styles.details}>
            <AiFillStar className={styles.icon} />
            <p>{match.attributes}</p>
          </div>
        </div>
        <div className={styles.choice}>
          <GiBrokenHeart onClick={() => dislike()} />
          <GiHearts onClick={() => like()} />
        </div>
      </div>
    </div>
  );
}
