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
import { setGenerateImages, restoreUserChats } from "../store/user";
import styles from "../styles/settingsMenu.module.css";
import EditingCard from "./editingCard";
import UserCard from "./userCard";
export default function MenuSettings({
  open,
  setOpen,
  activateNai,
  generate,
  setError,
  setErrorMessage,
  setVariation,
  setEditing,
}) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const settings = user.settings;
  const restoreChats = async () => {
    let chats = [];
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .eq("user_id", session.user.id);
    if (error) {
      console.log(error);
    } else {
      data.forEach((chat) => {
        chats.push({ name: chat.name, uuid: chat.uuid, image: chat.image });
      });
      dispatch(restoreUserChats(chats));
    }
  };
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("error", error);
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
        <div className={styles.menuSettingsContentItem}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={user.settings.generateImages}
                  onChange={() => dispatch(setGenerateImages())}
                />
              }
              label="Generate Images"
              labelPlacement="start"
            />
          </FormGroup>
        </div>
        <div className={styles.menuSettingsContentTitle}>NAI Login</div>
        <div className={styles.menuSettingsContentItem}>
          <NaiLoggin
            activateNai={activateNai}
            generate={generate}
            setError={setError}
            setErrorMessage={setErrorMessage}
            setVariation={setVariation}
          />
        </div>
        <div className={styles.menuSettingsContentTitle}>Misc</div>
        <div className={styles.menuSettingsContentItem}>
          <Button variant="contained" color="error" onClick={() => logout()}>
            LOGOUT
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => setEditing(true)}
          >
            Profile
          </Button>
        </div>
        <div className={styles.menuSettingsContentItem}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => restoreChats()}
          >
            Restore existing chats
          </Button>
        </div>
      </div>
    </div>
  );
}
