// Chatroom
// This is the page where the user can chat with other users
import styles from "../../styles/chatroom.module.css";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import ChatList from "../../components/Chat/chatSideBar";
import Image from "next/image";
import buildContext from "../../utils/Chat/buildContext";
import { getAvatar, addMessage, changeChat } from "../../store/chat";
import { MdSettings, MdChatBubble } from "react-icons/md";
import { loggingIn, changeNaiKey } from "../../store/user";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import axios from "axios";
export default function Messages() {
  const [avatar, setAvatar] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const messagesEndRef = useRef(null);
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const getUserData = async () => {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("user_id", session.user.id);
    if (error) {
      console.log(error);
    } else {
      dispatch(loggingIn(data[0]));
    }
  };
  const getImage = async () => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .list(session.user.id, {
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (data) {
      let result = false;
      data.forEach((file) => {
        let name = file.name.replace(".png", "");
        if (name === chat.id) {
          result = true;
        }
      });
      if (result) {
        const { data: data2, error: error2 } = supabase.storage
          .from("avatars")
          .getPublicUrl(`${session.user.id}/${chat.id}.png`);
        if (data2) {
          setAvatar(data2.publicUrl);
        }
      } else {
        setAvatar("");
      }
    } else {
      setAvatar("");
      console.log(error);
    }
  };
  useEffect(() => {
    if (!loggedIn) {
      try {
        if (session.user) {
          getUserData();
          setLoggedIn(true);
        }
      } catch {}
    }
    if (!chat.gotAvatar) {
      if (session) {
        getImage();
        dispatch(getAvatar());
      }
    }
  });
  useEffect(() => {
    scrollToBottom();
    if (session) {
      saveChat();
    }
  }, [chat]);

  const chatting = async (e) => {
    try {
      e.preventDefault();
    } catch {}

    console.log(generating);
    let exists;
    let id;
    let from;
    let sendMessage = message;
    const lastMessage = chat.messages[chat.messages.length - 1];
    const newMessages = chat.messages.filter(
      (message) => message.id !== lastMessage.id
    );
    setMessage("");

    if (generating) {
      return null;
    } else {
      switch (true) {
        case sendMessage.includes("/d"):
          // remove last message from chat
          dispatch(changeChat(newMessages));
          break;
        case sendMessage.includes("/ai"):
          id = uuidv4();
          exists = _.find(chat.messages, { id: id });
          if (exists) {
            id = uuidv4();
            exists = _.find(chat.messages, { id: id });
          }
          dispatch(
            addMessage({
              message: sendMessage.replace("/ai", ""),
              from: "ai",
              id: id,
            })
          );
          break;
        case (sendMessage.match(/^\s*$/) || []).length > 0:
          generate("ai");
          break;
        case sendMessage.includes("/r"):
          sendMessage = "";
          dispatch(changeChat(newMessages));
          console.log();
          generate("retry");
          break;
        case sendMessage.includes("/e"):
          dispatch(changeChat(newMessages));
          from = lastMessage.from === "ai" ? "ai" : "user";
          id = uuidv4();
          exists = _.find(chat.messages, { id: id });
          if (exists) {
            id = uuidv4();
            exists = _.find(chat.messages, { id: id });
          }
          dispatch(
            addMessage({
              message: sendMessage.replace("/e", ""),
              from: from,
              id: id,
            })
          );
          break;
        default:
          setGenerating(true);
          id = uuidv4();
          // Check if id exists in chat with lodash
          if (sendMessage !== "") {
            exists = _.find(chat.messages, { id: id });
            if (exists) {
              id = uuidv4();
              exists = _.find(chat.messages, { id: id });
            }
            dispatch(
              addMessage({ message: sendMessage, from: "user", id: id })
            );
          }
          generate("user");
          break;
      }
      setGenerating(false);
    }
  };
  const generate = async (type) => {
    let naiKey = "";
    let id;
    let exists;
    try {
      naiKey = localStorage.getItem("naiToken");
      console.log("Got the key");
    } catch {
      console.log("No key");
    }
    const response = await axios.post("/api/generateChat", {
      chat: buildContext(user.profile, chat, message, type),
      naiKey: naiKey,
    });
    console.log(response.data);

    id = uuidv4();
    exists = _.find(chat.messages, { id: id });
    if (exists) {
      id = uuidv4();
      exists = _.find(chat.messages, { id: id });
    }
    dispatch(addMessage({ message: response.data, from: "ai", id: id }));
    setGenerating(false);
  };
  const saveChat = async () => {
    const { data: data2, error: error2 } = await supabase
      .from("chats")
      .update({ chat: chat.messages })
      .eq("user_id", session.user.id)
      .eq("uuid", chat.id);
    if (error2) {
      console.log(error2);
    }
  };
  return (
    <div className={styles.screen}>
      <ChatList openChat={openChat} setOpenChat={setOpenChat} />
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
      <div className={styles.chatroom}>
        <div
          className={
            avatar === ""
              ? styles.chatroomHeaderNoAvatar
              : styles.chatroomHeader
          }
        >
          {avatar === "" ? null : (
            <Image
              src={avatar}
              width={256}
              height={256}
              alt="avatar"
              className={styles.chatroomHeaderAvatar}
            />
          )}

          <div
            className={
              avatar === ""
                ? styles.chatroomHeaderTitleNoAvatar
                : styles.chatroomHeaderTitle
            }
          >
            <h1>{chat.name}</h1>
          </div>
        </div>
        <div className={styles.chatroomBody}>
          {chat.messages.map((message) => {
            return (
              <div
                className={
                  message.from === "ai" ? styles.messageAi : styles.messageUser
                }
                key={message.id}
              >
                {message.message}
              </div>
            );
          })}
          <div ref={messagesEndRef} className={styles.chatAnker} />
        </div>
        <form className={styles.chatroomFooter} onSubmit={chatting}>
          <input
            className={styles.textInput}
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className={
              generating ? styles.Generating : styles.chatroomFooterSendButton
            }
            type="submit"
          >
            {">"}
          </button>
        </form>
      </div>
      <div className={styles.backGround}></div>
    </div>
  );
}