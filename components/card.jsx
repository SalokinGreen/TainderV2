// Standard imports
import React from "react";
import styles from "../styles/card.module.css";
// Libraries
import axios from "axios";
import { decode } from "base64-arraybuffer";
import cleanNaiImgResponse from "../utils/misc/cleanNaiImgResponse";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import getAge from "../utils/Card/Details/getAge";
import getAttributes from "../utils/Card/Details/getAttributes";
import getCountry from "../utils/Card/Details/getCountry";
import getName from "../utils/Card/Details/getName";
import getWork from "../utils/Card/Details/getWork";

// Store
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { likeMatch, dislikeMatch, setChats, rerollMatch } from "../store/user";
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

// Dating Profile like card

export default function Card({ match, generate }) {
  let sendMatch;
  const [cardDetails, setCardDetails] = useState(false);
  const [rerolling, setRerolling] = useState(false);
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
    img = match.image;
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
      image: match.image,
    });
    uploadMatch();
    dispatch(
      setChats({
        uuid: match.id,
        name: match.name,
        lastMessage: {},
        image: match.image,
      })
    );
    dispatch(likeMatch());
    // update chats
    let { data, error } = await supabase
      .from("users")
      .update({ chats: sendChat })
      .match({ user_id: session.user.id });
    // generate();
    const { data: data2, error: error2 } = await supabase
      .from("users")
      .update({ matches: matches.slice(1) })
      .eq("user_id", session.user.id);
    if (error2) {
      console.log(error2);
    }
  };
  const dislike = async () => {
    if (match.image !== "") {
      console.log("deleting image");
      console.log(match.id);
      console.log(session.user.id);
      const { data, error } = await supabase.storage
        .from("avatars")
        .remove([`${session.user.id}/${match.id}.png`]);
      error ? console.log(error) : console.log(data);
    }

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
        image: match.image,
      },
    ]);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };
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
        dispatch(rerollMatch({ type: "age", value: getAge(18, 100) }));
        break;
      case "gender":
        // 50/50 chance
        const gender = Math.random() < 0.5 ? "Man" : "Woman";
        dispatch(rerollMatch({ type: "gender", value: gender }));
        break;
      case "name":
        const existingGender = matches[0].gender === "Man" ? "man" : "woman";
        dispatch(rerollMatch({ type: "name", value: getName(existingGender) }));
        break;

      case "work":
        dispatch(rerollMatch({ type: "work", value: getWork() }));
        break;
      case "from":
        dispatch(rerollMatch({ type: "from", value: getCountry() }));
        break;
      case "attributes":
        dispatch(rerollMatch({ type: "attributes", value: getAttributes() }));
        break;
      case "likes":
        dispatch(rerollMatch({ type: "likes", value: "Generating..." }));
        const likes = await axios.post("api/reroll", {
          type: "likes",
          input: match,
          key: naiKey,
          model: "euterpe-v2",
        });
        console.log(likes);
        dispatch(rerollMatch({ type: "likes", value: likes.data.output }));
        break;
      case "dislikes":
        dispatch(rerollMatch({ type: "dislikes", value: "Generating..." }));
        const dislikes = await axios.post("api/reroll", {
          type: "dislikes",
          input: match,
          key: naiKey,
          model: "euterpe-v2",
        });
        console.log(dislikes);
        dispatch(
          rerollMatch({ type: "dislikes", value: dislikes.data.output })
        );
        break;
      case "about":
        dispatch(rerollMatch({ type: "about", value: "Generating..." }));
        const about = await axios.post("api/reroll", {
          type: "about",
          input: match,
          key: naiKey,
          model: "euterpe-v2",
        });
        console.log(about);
        dispatch(rerollMatch({ type: "about", value: about.data.output }));
        break;
      case "image":
        dispatch(rerollMatch({ type: "image", value: "/loading.gif" }));
        const image = await axios.post("api/reroll", {
          type: "image",
          input: match,
          key: naiKey,
          model: "euterpe-v2",
        });
        console.log(image);
        const cleanImage = cleanNaiImgResponse(image.data);
        if (match.image === "") {
          let { data, error } = await supabase.storage
            .from("avatars")
            .upload(`${session.user.id}/${match.id}.png`, decode(cleanImage), {
              contentType: "image/png",
            });
          error ? console.log(error) : null;
          const { data: data2, error: error2 } = supabase.storage
            .from("avatars")
            .getPublicUrl(`${session.user.id}/${match.id}.png`);
          if (data2) {
            dispatch(rerollMatch({ type: "image", value: data2.publicUrl }));
          } else {
            console.log(error2);
          }
        } else {
          const imageUrl = match.image;
          const { data: data2, error: error2 } = await supabase.storage
            .from("avatars")
            .remove([`${session.user.id}/${match.id}.png`]);
          error2 ? console.log(error2) : console.log(data2);
          const { data, error } = await supabase.storage
            .from("avatars")
            .upload(`${session.user.id}/${match.id}.png`, decode(cleanImage), {
              contentType: "image/png",
            });
          error ? console.log(error) : console.log(data);

          dispatch(
            rerollMatch({ type: "image", value: imageUrl + `?${new Date()}` })
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
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.gender}>
          <BsFillMoonStarsFill
            className={styles.icon}
            onClick={() => reroll("age")}
          />{" "}
          {match.age}
        </div>
        <div className={styles.gender}>
          {match.gender}{" "}
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
          <p className={styles.title} onClick={() => reroll("name")}>
            {match.name}
          </p>
        </div>
        <div className={styles.likes}>
          <AiFillLike className={styles.icon} onClick={() => reroll("likes")} />
          <p>{match.likes}</p>
        </div>
        <div className={styles.dislikes}>
          <AiFillDislike
            className={styles.icon}
            onClick={() => reroll("dislikes")}
          />
          <p>{match.dislikes}</p>
        </div>
        <div className={styles.dislikes}>
          <SiAboutdotme
            className={styles.icon}
            onClick={() => reroll("about")}
          />
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
            <MdWork className={styles.icon} onClick={() => reroll("work")} />{" "}
            <p>{match.work}</p>
          </div>
          <div className={styles.details}>
            <BiWorld className={styles.icon} onClick={() => reroll("from")} />{" "}
            <p>{match.from}</p>
          </div>
          <div className={styles.details}>
            <AiFillStar
              className={styles.icon}
              onClick={() => reroll("attributes")}
            />
            <p>{match.attributes}</p>
          </div>
        </div>
        <div className={styles.choice}>
          <GiBrokenHeart onClick={rerolling ? null : () => dislike()} />
          <GiHearts onClick={rerolling ? null : () => like()} />
        </div>
      </div>
    </div>
  );
}
