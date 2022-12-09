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
    top_a: 0.072,
    typical_p: 0.98,
    tail_free_sampling: 0.997,
    repetition_penalty: 1.0236,
    repetition_penalty_range: 610,
    repetition_penalty_slope: 0.85,
    repetition_penalty_frequency: 0,
    repetition_penalty_presence: 0,
    bad_words_ids: [
      [60],
      [62],
      [544],
      [683],
      [696],
      [880],
      [905],
      [1008],
      [1019],
      [1084],
      [1092],
      [1181],
      [1184],
      [1254],
      [1447],
      [1570],
      [1656],
      [2194],
      [2470],
      [2479],
      [2498],
      [2947],
      [3138],
      [3291],
      [3455],
      [3725],
      [3851],
      [3891],
      [3921],
      [3951],
      [4207],
      [4299],
      [4622],
      [4681],
      [5013],
      [5032],
      [5180],
      [5218],
      [5290],
      [5413],
      [5456],
      [5709],
      [5749],
      [5774],
      [6038],
      [6257],
      [6334],
      [6660],
      [6904],
      [7082],
      [7086],
      [7254],
      [7444],
      [7748],
      [8001],
      [8088],
      [8168],
      [8562],
      [8605],
      [8795],
      [8850],
      [9014],
      [9102],
      [9259],
      [9318],
      [9336],
      [9502],
      [9686],
      [9793],
      [9855],
      [9899],
      [9955],
      [10148],
      [10174],
      [10943],
      [11326],
      [11337],
      [11661],
      [12004],
      [12084],
      [12159],
      [12520],
      [12977],
      [13380],
      [13488],
      [13663],
      [13811],
      [13976],
      [14412],
      [14598],
      [14767],
      [15640],
      [15707],
      [15775],
      [15830],
      [16079],
      [16354],
      [16369],
      [16445],
      [16595],
      [16614],
      [16731],
      [16943],
      [17278],
      [17281],
      [17548],
      [17555],
      [17981],
      [18022],
      [18095],
      [18297],
      [18413],
      [18736],
      [18772],
      [18990],
      [19181],
      [20095],
      [20197],
      [20481],
      [20629],
      [20871],
      [20879],
      [20924],
      [20977],
      [21375],
      [21382],
      [21391],
      [21687],
      [21810],
      [21828],
      [21938],
      [22367],
      [22372],
      [22734],
      [23405],
      [23505],
      [23734],
      [23741],
      [23781],
      [24237],
      [24254],
      [24345],
      [24430],
      [25416],
      [25896],
      [26119],
      [26635],
      [26842],
      [26991],
      [26997],
      [27075],
      [27114],
      [27468],
      [27501],
      [27618],
      [27655],
      [27720],
      [27829],
      [28052],
      [28118],
      [28231],
      [28532],
      [28571],
      [28591],
      [28653],
      [29013],
      [29547],
      [29650],
      [29925],
      [30522],
      [30537],
      [30996],
      [31011],
      [31053],
      [31096],
      [31148],
      [31258],
      [31350],
      [31379],
      [31422],
      [31789],
      [31830],
      [32214],
      [32666],
      [32871],
      [33094],
      [33376],
      [33440],
      [33805],
      [34368],
      [34398],
      [34417],
      [34418],
      [34419],
      [34476],
      [34494],
      [34607],
      [34758],
      [34761],
      [34904],
      [34993],
      [35117],
      [35138],
      [35237],
      [35487],
      [35830],
      [35869],
      [36033],
      [36134],
      [36320],
      [36399],
      [36487],
      [36586],
      [36676],
      [36692],
      [36786],
      [37077],
      [37594],
      [37596],
      [37786],
      [37982],
      [38475],
      [38791],
      [39083],
      [39258],
      [39487],
      [39822],
      [40116],
      [40125],
      [41000],
      [41018],
      [41256],
      [41305],
      [41361],
      [41447],
      [41449],
      [41512],
      [41604],
      [42041],
      [42274],
      [42368],
      [42696],
      [42767],
      [42804],
      [42854],
      [42944],
      [42989],
      [43134],
      [43144],
      [43189],
      [43521],
      [43782],
      [44082],
      [44162],
      [44270],
      [44308],
      [44479],
      [44524],
      [44965],
      [45114],
      [45301],
      [45382],
      [45443],
      [45472],
      [45488],
      [45507],
      [45564],
      [45662],
      [46265],
      [46267],
      [46275],
      [46295],
      [46462],
      [46468],
      [46576],
      [46694],
      [47093],
      [47384],
      [47389],
      [47446],
      [47552],
      [47686],
      [47744],
      [47916],
      [48064],
      [48167],
      [48392],
      [48471],
      [48664],
      [48701],
      [49021],
      [49193],
      [49236],
      [49550],
      [49694],
      [49806],
      [49824],
      [50001],
      [50256],
      [0],
      [1],
    ],
    stop_sequences: [[187]],
    generate_until_sentence: true,
    use_cache: false,
    use_string: true,
    return_full_text: false,
    prefix: "vanilla",
    logit_bias_exp: [
      {
        sequence: [9264],
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
    order: [1, 4, 0, 3, 5],
  },
};
export default function ChatSettings({ open, setOpen, activateNai, generate }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const settings = user.settings.global;
  const [normal, setNormal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElPresets, setAnchorElPresets] = useState(null);
  const session = useSession();
  const supabase = useSupabaseClient();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const anchorOpen = Boolean(anchorEl);
  const id = open ? "models" : undefined;

  const handleClickPresets = (event) => {
    setAnchorElPresets(event.currentTarget);
  };

  const handleClosePresets = () => {
    setAnchorElPresets(null);
  };

  const anchorOpenPresets = Boolean(anchorElPresets);
  const idPresets = open ? "presets" : undefined;

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
  const setModel = () => {
    dispatch(changeModel());
    handleClose();
  };
  const newPreset = () => {
    let id = uuidv4();
    // check if id already exists
    let exists = false;
    for (let i = 0; i < user.presets.length; i++) {
      if (user.presets[i].id === id) {
        exists = true;
        break;
      }
    }
    while (exists) {
      id = uuidv4();
      exists = false;
      for (let i = 0; i < user.presets.length; i++) {
        if (user.presets[i].id === id) {
          exists = true;
          break;
        }
      }
    }
    const parameters =
      chat.model === "euterpe-v2"
        ? defaultEuterpe.parameters
        : defaultKrake.parameters;
    let bob = {
      name: "New Preset",
      id: id,
      parameters: parameters,
    };
    dispatch(addPreset(bob));
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
          <div className={styles.model} onClick={handleClick}>
            {
              chat.model === "euterpe-v2"
                ? "Euterpe"
                : "Krake" /* {showModel()} */
            }
          </div>
          <div className={styles.presets} onClick={handleClickPresets}>
            DEFAULT
          </div>
        </div>
        <div className={styles.menuSettingsContentTitle}>Parameters</div>
        <div className={styles.menuSettingsContentItemParameters}>
          <Parameters />
        </div>
        <div className={styles.menuSettingsContentTitle}>Misc</div>
        <div className={styles.menuSettingsContentItem}>
          <Button variant="contained" color="error" onClick={() => remove()}>
            Delete
          </Button>
        </div>
      </div>
      <Popover
        id={id}
        open={anchorOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={styles.model} onClick={() => setModel()}>
          {chat.model === "euterpe-v2" ? "Krake" : "Euterpe"}
        </div>
      </Popover>
      <Popover
        id={idPresets}
        open={anchorOpenPresets}
        anchorEl={anchorElPresets}
        onClose={handleClosePresets}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={styles.model} onClick={() => newPreset()}>
          + New Preset
        </div>
        {user.presets.map((presets) => (
          <div className={styles.model}>{presets.name}</div>
        ))}
      </Popover>
    </div>
  );
}
