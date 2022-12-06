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
import { setGenerateImages } from "../store/user";
import styles from "../styles/settingsMenu.module.css";
export default function MenuSettings({
  open,
  setOpen,
  activateNai,
  generate,
  setError,
  setErrorMessage,
  setVariation,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const settings = user.settings;
  const supabase = useSupabaseClient();

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
        <div className={styles.menuSettingsContentTitle}>NAI Loggin</div>
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
        </div>
      </div>
    </div>
  );
}
