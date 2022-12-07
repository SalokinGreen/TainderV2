// This is the right side menu with all the settings
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import { MdSettings, MdChatBubble } from "react-icons/md";
import NaiLoggin from "./loginModal/naiLoggin";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { setGenerateImages, removeChat } from "../store/user";
import { deletePartner } from "../store/chat";
import styles from "../styles/settingsMenu.module.css";
export default function ChatSettings({ open, setOpen, activateNai, generate }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const settings = user.settings;
  const session = useSession();
  const supabase = useSupabaseClient();

  const remove = async () => {
    if (chat.avatar !== "") {
    } else {
      const { data, error } = await supabase.storage
        .from("avatars")
        .remove([`${session.user.id}/${chat.id}.png`]);
      if (error) {
        console.log("error", error);
        return error;
      }
    }

    const { error: error2 } = await supabase
      .from("chats")
      .delete()
      .match({ uuid: chat.id, user_id: session.user.id });
    if (error2) {
      console.log("error", error2);
      return error2;
    }
    dispatch(removeChat(chat.id));
    dispatch(deletePartner());
  };
  // const logout = () => {
  //   localStorage.removeItem("id");
  //   window.location.reload(false);
  // };
  return (
    <div className={open ? styles.menuSettingsOpen : styles.menuSettings}>
      <div className={styles.menuSettingsHeader}>
        <div
          className={styles.menuSettingsHeaderClose}
          onClick={() => setOpen(false)}
        >
          X
        </div>
        <div className={styles.menuSettingsHeaderTitle}>Settings</div>
      </div>
      <div className={styles.menuSettingsContent}>
        <div className={styles.menuSettingsContentTitle}>General</div>
        <div className={styles.menuSettingsContentItem}></div>

        <div className={styles.menuSettingsContentTitle}>Misc</div>
        <div className={styles.menuSettingsContentItem}>
          <Button variant="contained" color="error" onClick={() => remove()}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
