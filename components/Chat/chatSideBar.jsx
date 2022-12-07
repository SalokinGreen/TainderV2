// Chat side bar
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import TextField from "@mui/material/TextField";
import styles from "../../styles/chatSideBar.module.css";
import ChatBox from "./chatBox";
import { useEffect } from "react";
export default function ChatList({ openChat, setOpenChat, generate }) {
  const [search, setSearch] = useState("");
  const chats = useSelector((state) => state.user.chats);
  // Filter chats
  const filteredChats = chats.filter((chat) => {
    return chat.name.toLowerCase().includes(search.toLowerCase());
  });
  const session = useSession();
  const supabase = useSupabaseClient();

  const dispatch = useDispatch();
  const router = useRouter();
  const handleAdd = () => {
    console.log(router.pathname);
    if (router.pathname === "/messages") {
      router.push("/");
    } else {
      generate();
    }
  };
  return (
    <div className={openChat ? styles.chatlist : styles.chatlistHidden}>
      <div className={styles.chatlistHeader}>
        <div className={styles.chatlistHeaderTitle}>
          <h1>Chats</h1>
        </div>
        <div className={styles.chatlistHeaderSearch}>
          {/* <input type="text" placeholder="Search" /> */}
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            focused
          />
          <p onClick={() => setOpenChat()}>X</p>
        </div>
      </div>
      <div className={styles.chatlistBody}>
        <div className={styles.chatlistBodyChat}>
          {filteredChats.map((chat) => (
            <ChatBox
              name={chat.name}
              id={chat.uuid}
              key={chat.uuid}
              ogImage={chat.image}
            />
          ))}
        </div>
        <div className={styles.chatlistBodyChatAdd} onClick={() => handleAdd()}>
          <p>+</p>
        </div>
      </div>
    </div>
  );
}
