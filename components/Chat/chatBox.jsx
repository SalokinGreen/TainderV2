import styles from "../../styles/chatBox.module.css";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { replacePartner } from "../../store/chat";
import _ from "lodash";
import Image from "next/image";
export default function ChatBox({ name, id }) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const dispatch = useDispatch();
  const [image, setImage] = useState("/placeholder.png");
  const [gotImage, setGotImage] = useState(false);
  let avatars = [];
  const router = useRouter();
  const getImage = async () => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .list(session.user.id, {
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (data) {
      data.forEach((file) => {
        let name = file.name.replace(".png", "");
        avatars.push(name);
      });
      const result = _.includes(avatars, id);
      if (result) {
        const { data: data2, error: error2 } = supabase.storage
          .from("avatars")
          .getPublicUrl(`${session.user.id}/${id}.png`);
        if (data2) {
          setImage(data2.publicUrl);
        }
      }
    }
  };
  if (!gotImage) {
    getImage();
    setGotImage(true);
  }
  const goToChat = async () => {
    if (router.pathname === "/") {
      router.push(`/messages`);
    }
    const { data, error } = await supabase
      .from("chats")
      .select()
      .eq("user_id", session.user.id)
      .eq("uuid", id);
    if (data) {
      dispatch(replacePartner(data[0]));
    } else {
      console.log(error);
    }
  };
  return (
    <div className={styles.chatBox} onClick={() => goToChat()}>
      <Image
        src={image}
        width={50}
        height={50}
        className={styles.chatBoxAvatar}
        alt="avatar"
      />
      <div className={styles.chatBoxName}>
        <h1>{name}</h1>
      </div>
    </div>
  );
}
