import { useSelector, useDispatch } from "react-redux";
import { changePreset } from "../store/user";
import styles from "../styles/parameters.module.css";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material/Typography";
import { useEffect } from "react";
const defaultEuterpe = {
  name: "default",
  model: "euterpe-v2",
  order: {
    temperature: {
      value: 0,
      order: 2,
    },
    top_k: {
      value: 1,
      order: 1,
    },
    top_p: {
      value: 2,
      order: 0,
    },
    tfs: {
      value: 3,
      order: 3,
    },
    top_a: {
      value: 4,
      order: 0,
    },
    typical_p: {
      value: 5,
      order: 0,
    },
  },
  parameters: {
    temperature: 1.07,
    max_length: 40,
    min_length: 1,
    top_k: 264,
    top_a: 1,
    typical_p: 1,
    top_p: 1,
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
const defaultKrake = {
  name: "default",
  model: "krake-v2",
  id: "default",
  order: {
    Temperature: {
      value: 0,
      order: 3,
    },
    TopK: {
      value: 1,
      order: 1,
    },
    TopP: {
      value: 2,
      order: 0,
    },
    TFS: {
      value: 3,
      order: 2,
    },
    TopA: {
      value: 4,
      order: 0,
    },
    TypicalP: {
      value: 5,
      order: 0,
    },
  },
  parameters: {
    temperature: 1.05,
    max_length: 40,
    min_length: 1,
    top_k: 6,
    top_a: 0.25,
    typical_p: 0.95,
    tail_free_sampling: 0.9,
    repetition_penalty: 1.0333,
    repetition_penalty_range: 1536,
    repetition_penalty_frequency: 0.05,
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
    generate_until_sentence: true,
    use_cache: false,
    use_string: false,
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
    order: [3, 0, 5, 4, 1],
  },
};
export default function Parameters({ index }) {
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  console.log();
  let defaultPreset =
    chat.model === "euterpe-v2" ? defaultEuterpe : defaultKrake;

  const dispatch = useDispatch();
  let preset = chat.preset === "default" ? defaultPreset : user.presets[index];
  const disabled = chat.preset === "default" ? true : false;

  useEffect(() => {
    defaultPreset = chat.model === "euterpe-v2" ? defaultEuterpe : defaultKrake;
    preset = chat.preset === "default" ? defaultPreset : user.presets[index];
  }, [chat.preset, chat.model]);
  // useEffect(() => {

  // }, [chat.model]);
  return (
    <div className={styles.parameters}>
      <div className={styles.general}>
        <div className={styles.part}>
          {disabled ? (
            <i className={styles.descriptionWarning}>
              Change from the default preset to change these parameters.
            </i>
          ) : null}
          <h5 className={styles.title}>Craziness</h5>
          <i className={styles.description}>
            How random your chat partner gets.
          </i>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              step={0.1}
              value={preset.parameters.temperature}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "temperature",
                    value: e.target.value,
                  })
                );
              }}
              disabled={disabled}
            />
            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                step={0.1}
                disabled={disabled}
                value={preset.order.temperature.order}
              />
            </div>
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            value={preset.parameters.temperature}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "temperature",
                  value: e.target.value,
                })
              );
            }}
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
          />
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Output Length</h5>
          <i className={styles.description}>
            Up to how many tokens your chat partner can write in one Message.
          </i>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={100}
              min={1}
              className={styles.number}
              step={1}
              disabled={disabled}
              value={preset.parameters.max_length}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "max_length",
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
            value={preset.parameters.max_length}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "max_length",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Repetitation Penality</h5>
          <i className={styles.description}>
            The higher the value the more your chat partner repeats themselfs.
          </i>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              step={0.1}
              disabled={disabled}
              value={preset.parameters.repetition_penalty}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "repetition_penalty",
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
            value={preset.parameters.repetition_penalty}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "repetition_penalty",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
        <h3>Advanced</h3>
        <h5>Sampling</h5>
        <i className={styles.description}>
          Turn the sampling value to 1 to disable it.
        </i>
        <div className={styles.part}>
          <h5 className={styles.title}>Top K</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={300}
              min={0}
              className={styles.number}
              step={1}
              disabled={disabled}
              value={preset.parameters.top_k}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "top_k",
                    value: e.target.value,
                  })
                );
              }}
            />
            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                step={0.1}
                disabled={disabled}
                value={preset.order.top_k.order}
              />
            </div>
          </div>
          <Slider
            defaultValue={1}
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0}
            max={300}
            step={1}
            disabled={disabled}
            value={preset.parameters.top_k}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "top_k",
                  value: e.target.value,
                })
              );
            }}
          />
          <div className={styles.part}>
            <h5 className={styles.title}>Top-A</h5>
            <div className={styles.numberContainer}>
              <input
                type="number"
                max={1}
                min={0.001}
                className={styles.number}
                step={0.01}
                disabled={disabled}
                value={preset.parameters.top_a}
                onChange={(e) => {
                  dispatch(
                    changePreset({
                      index: index,
                      change: "top_a",
                      value: e.target.value,
                    })
                  );
                }}
              />
              <div className={styles.numberOrder}>
                Order
                <input
                  type="number"
                  max={3}
                  min={0.1}
                  className={styles.number}
                  step={0.1}
                  disabled={disabled}
                  value={preset.order.top_a.order}
                />
              </div>
            </div>
            <Slider
              className={styles.slider}
              valueLabelDisplay="auto"
              max={1}
              min={0.001}
              step={0.001}
              disabled={disabled}
              value={preset.parameters.top_a}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "top_a",
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Tail-Free</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              step={0.1}
              disabled={disabled}
              value={preset.parameters.tail_free_sampling}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "tail_free_sampling",
                    value: e.target.value,
                  })
                );
              }}
            />
            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                step={0.1}
                disabled={disabled}
                value={preset.order.tfs.order}
              />
            </div>
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            max={1}
            min={0.001}
            step={0.001}
            disabled={disabled}
            value={preset.parameters.tail_free_sampling}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "tail_free_sampling",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Typical</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              step={0.1}
              disabled={disabled}
              value={preset.parameters.typical_p}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "typical_p",
                    value: e.target.value,
                  })
                );
              }}
            />

            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                step={0.1}
                disabled={disabled}
                value={preset.order.typical_p.order}
              />
            </div>
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            max={1}
            min={0.001}
            step={0.001}
            disabled={disabled}
            value={preset.parameters.typical_p}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "typical_p",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Nucleus</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={1}
              min={0.001}
              className={styles.number}
              step={0.01}
              disabled={disabled}
              value={preset.parameters.top_p}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "top_p",
                    value: e.target.value,
                  })
                );
              }}
            />
            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                step={0.1}
                disabled={disabled}
                value={preset.order.top_p.order}
              />
            </div>
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            max={1}
            min={0.001}
            step={0.001}
            disabled={disabled}
            value={preset.parameters.top_p}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "top_p",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
        <h5>Repetition Penality</h5>
        <div className={styles.part}>
          <h5 className={styles.title}>Range</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              step={0.1}
              disabled={disabled}
              value={preset.parameters.repetition_penalty_range}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "repetition_penalty_range",
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
            value={preset.parameters.repetition_penalty_range}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "repetition_penalty_range",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Slope</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              step={0.1}
              disabled={disabled}
              value={preset.parameters.repetition_penalty_slope}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "repetition_penalty_slope",
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
            value={preset.parameters.repetition_penalty_slope}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "repetition_penalty_slope",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
        <h5>Alternative</h5>
        <div className={styles.part}>
          <h5 className={styles.title}>Presence</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              step={0.1}
              disabled={disabled}
              value={preset.parameters.repetition_penalty_presence}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "repetition_penalty_presence",
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
            value={preset.parameters.repetition_penalty_presence}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "repetition_penalty_presence",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Frequency</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              step={0.1}
              disabled={disabled}
              value={preset.parameters.repetition_penalty_frequency}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "repetition_penalty_frequency",
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
            value={preset.parameters.repetition_penalty_frequency}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "repetition_penalty_frequency",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
