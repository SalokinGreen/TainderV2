import axios from "axios";
const parameters = {
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
  prefix:
    "euterpe-v2:fb8bfb7793070e6dbcaa465304c93c384a7a7d26a9039958ce42c4db04be0e18:f632afc16a5085bf22e92ef06bed09abdb474ee3a24b1ce3d3800b76ee11a657",
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
};
export default async function chatGeneration(chat, naiKey) {
  const response = await axios.post(
    "https://api.novelai.net/ai/generate",
    {
      input: chat,
      parameters,
      model: "euterpe-v2",
    },
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${naiKey}`,
      },
    }
  );
  return response.data.output;
}
