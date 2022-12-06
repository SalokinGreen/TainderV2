import styles from "../../styles/chatBox.module.css";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { replacePartner } from "../../store/chat";
import _ from "lodash";
import Image from "next/image";
export default function ChatBox({ name, id, ogImage }) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const dispatch = useDispatch();
  const [image, setImage] = useState("/placeholder.png");
  const [gotImage, setGotImage] = useState(false);
  let avatars = [];
  const router = useRouter();
  useEffect(() => {
    if (!gotImage) {
      if (ogImage !== "") {
        setImage(ogImage);
        setGotImage(true);
      }
    }
  });

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
