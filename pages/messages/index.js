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
import ChatSettings from "../../components/chatSettings";
import _ from "lodash";
import axios from "axios";
import EditingCard from "../../components/editingCard";
const defaultEuterpe = {
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
  id: "default",
  name: "Euterpe Default",
};
const defaultKrake = {
  parameters: {
    temperature: 0.6887,
    max_length: 40,
    min_length: 1,
    top_p: 0.8421,
    tail_free_sampling: 0.9751,
    repetition_penalty: 1.0004,
    repetition_penalty_range: 53,
    repetition_penalty_frequency: 0.11,
    repetition_penalty_presence: 0.601,
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
    order: [2, 3, 0],
  },
  id: "default",
  name: "Default Krake",
};
export default function Messages() {
  const [openChat, setOpenChat] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [generating, setGenerating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);
  let formRef = useRef(null);
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

  useEffect(() => {
    if (!loggedIn) {
      try {
        if (session.user) {
          getUserData();
          setLoggedIn(true);
        }
      } catch {}
    }
  });
  useEffect(() => {
    editing ? null : scrollToBottom();

    if (session) {
      saveChat();
    }
  }, [chat]);
  useEffect(() => {
    if (message.includes("\n")) {
      setMessage("");
      editing ? null : scrollToBottom();
    }
  }, [message]);

  const chatting = async (e) => {
    try {
      e.preventDefault();
    } catch {}

    let exists;
    let id;
    let from;
    let sendMessage = message;
    const lastMessage = chat.messages[chat.messages.length - 1];
    const newMessages = chat.messages.filter(
      (message) => message.id !== lastMessage.id
    );
    setMessage("");
    setGenerating(true);
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
        scrollToBottom();
        break;
      case (sendMessage.match(/^\s*$/) || []).length > 0:
        generate("ai");
        break;
      case sendMessage.includes("/r"):
        sendMessage = "";
        dispatch(changeChat(newMessages));
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
        id = uuidv4();
        // Check if id exists in chat with lodash
        if (sendMessage !== "") {
          exists = _.find(chat.messages, { id: id });
          if (exists) {
            id = uuidv4();
            exists = _.find(chat.messages, { id: id });
          }
          dispatch(addMessage({ message: sendMessage, from: "user", id: id }));
        }
        generate("user");
        break;
    }
  };
  useEffect(() => {
    scrollToBottom(), [generating, chat.messages];
  });
  const generate = async (type) => {
    scrollToBottom();
    let naiKey = "";
    let id;
    let exists;
    try {
      naiKey = localStorage.getItem("naiToken");
      console.log("Got the key");
    } catch {
      console.log("No key");
    }
    let preset;
    if (chat.preset === "default") {
      preset = chat.model === "euterpe-v2" ? defaultEuterpe : defaultKrake;
    } else {
      const index = _.findIndex(user.presets, { id: chat.preset });
      preset = user.presets[index];
    }
    const response = await axios.post("/api/generateChat", {
      chat: buildContext(user.profile, chat, message, type),
      naiKey: naiKey,
      parameters: preset.parameters,
    });

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
  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      chatting();
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
            chat.avatar === ""
              ? styles.chatroomHeaderNoAvatar
              : styles.chatroomHeader
          }
          onClick={() => setEditing(!editing)}
        >
          {chat.avatar === "" ? null : (
            <Image
              src={chat.avatar}
              width={256}
              height={256}
              alt="avatar"
              className={styles.chatroomHeaderAvatar}
            />
          )}

          <div
            className={
              chat.avatar === ""
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
          {generating ? (
            <Image
              src={"/typing.gif"}
              width={50}
              height={40}
              className={styles.typing}
              alt="typing"
              ref={messagesEndRef}
            ></Image>
          ) : null}

          <div ref={messagesEndRef} className={styles.chatAnker} />
        </div>
        <form
          className={styles.chatroomFooter}
          onSubmit={chatting}
          ref={(el) => (formRef = el)}
        >
          <textarea
            className={styles.textInput}
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onEnterPress}
          />
          <button
            className={
              generating ? styles.Generating : styles.chatroomFooterSendButton
            }
            type="submit"
            onClick={chatting}
          >
            {">"}
          </button>
        </form>
      </div>
      {editing ? <EditingCard chat={chat} setEditing={setEditing} /> : null}
      {openSettings ? (
        <ChatSettings open={openSettings} setOpen={setOpenSettings} />
      ) : null}
      <div className={styles.backGround}></div>
    </div>
  );
}
