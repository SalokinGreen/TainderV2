// This is the right side menu with all the settings
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Parameters from "./parameters";
import { MdSettings, MdChatBubble } from "react-icons/md";
import NaiLoggin from "./loginModal/naiLoggin";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { setGenerateImages, removeChat } from "../store/user";
import { deletePartner } from "../store/chat";
import styles from "../styles/settingsMenu.module.css";
const defaultEuterpe = {
  name: "default",
  model: "euterpe-v2",
  parameters: {
    temperature: 1.07,
    max_length: 40,
    min_length: 1,
    top_k: 264,
    tail_free_sampling: 0.925,
    repetition_penalty: 1.087375,
    repetition_penalty_range: 404,
    repetition_penalty_slope: 0.84,
    repetition_penalty_frequency: 0,
    repetition_penalty_presence: 0,
    bad_words_ids: [
      [58],
      [60],
      [90],
      [92],
      [685],
      [1391],
      [1782],
      [2361],
      [3693],
      [4083],
      [4357],
      [4895],
      [5512],
      [5974],
      [7131],
      [8183],
      [8351],
      [8762],
      [8964],
      [8973],
      [9063],
      [11208],
      [11709],
      [11907],
      [11919],
      [12878],
      [12962],
      [13018],
      [13412],
      [14631],
      [14692],
      [14980],
      [15090],
      [15437],
      [16151],
      [16410],
      [16589],
      [17241],
      [17414],
      [17635],
      [17816],
      [17912],
      [18083],
      [18161],
      [18477],
      [19629],
      [19779],
      [19953],
      [20520],
      [20598],
      [20662],
      [20740],
      [21476],
      [21737],
      [22133],
      [22241],
      [22345],
      [22935],
      [23330],
      [23785],
      [23834],
      [23884],
      [25295],
      [25597],
      [25719],
      [25787],
      [25915],
      [26076],
      [26358],
      [26398],
      [26894],
      [26933],
      [27007],
      [27422],
      [28013],
      [29164],
      [29225],
      [29342],
      [29565],
      [29795],
      [30072],
      [30109],
      [30138],
      [30866],
      [31161],
      [31478],
      [32092],
      [32239],
      [32509],
      [33116],
      [33250],
      [33761],
      [34171],
      [34758],
      [34949],
      [35944],
      [36338],
      [36463],
      [36563],
      [36786],
      [36796],
      [36937],
      [37250],
      [37913],
      [37981],
      [38165],
      [38362],
      [38381],
      [38430],
      [38892],
      [39850],
      [39893],
      [41832],
      [41888],
      [42535],
      [42669],
      [42785],
      [42924],
      [43839],
      [44438],
      [44587],
      [44926],
      [45144],
      [45297],
      [46110],
      [46570],
      [46581],
      [46956],
      [47175],
      [47182],
      [47527],
      [47715],
      [48600],
      [48683],
      [48688],
      [48874],
      [48999],
      [49074],
      [49082],
      [49146],
      [49946],
      [10221],
      [4841],
      [1427],
      [2602, 834],
      [29343],
      [37405],
      [35780],
      [2602],
      [50256],
    ],
    stop_sequences: [[198]],
    generate_until_sentence: true,
    use_cache: false,
    use_string: true,
    return_full_text: false,
    prefix: "vanilla",
    logit_bias_exp: [
      {
        sequence: [8162],
        bias: -0.12,
        ensure_sequence_finish: false,
        generate_once: false,
      },
      {
        sequence: [46256, 224],
        bias: -0.12,
        ensure_sequence_finish: false,
        generate_once: false,
      },
    ],
    num_logprobs: 10,
    order: [1, 0, 3],
  },
};
export default function ChatSettings({ open, setOpen, activateNai, generate }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const settings = user.settings.global;
  const [normal, setNormal] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();

  const remove = async () => {
    if (chat.avatar !== "") {
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
      // console.log("error", error2);
      // return error2;
    }
    dispatch(removeChat(chat.id));
    dispatch(deletePartner());

    let { data, error } = await supabase
      .from("users")
      .update({ chats: user.chats })
      .match({ user_id: session.user.id });
    error ? console.log(error) : null;
  };

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
          <Button
            variant="contained"
            color="error"
            onClick={() => console.log(presetsq)}
          >
            log
          </Button>
        </div>
        <div className={styles.menuSettingsContentTitle}>Parameters</div>
        <div className={styles.menuSettingsContentItem}>
          <Parameters />
        </div>
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
