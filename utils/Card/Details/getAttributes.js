const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "pink",
  "orange",
  "brown",
  "black",
  "white",
  "gray",
  "gold",
  "silver",
  "navy blue",
  "sky blue",
  "lime green",
  "teal",
  "indigo",
  "magenta",
  "violet",
  "khaki",
  "salmon",
  "crimson",
  "lavender",
  "plum",
  "blue violet",
  "olive",
  "cyan",
  "maroon",
  "beige",
];
const skinList = [
  "white",
  "brown",
  "black",
  "dark",
  "tan",
  "light",
  "olive",
  "pale",
];
const probsEyes = {
  brown: 0.8,
  blue: 0.9,
  hazel: 0.95,
  green: 0.98,
  grey: 0.99,
};
const probsBody = {
  average: 0.8,
  slim: 0.85,
  athletic: 0.9,
  curvy: 0.95,
  muscular: 0.98,
};
const probsHeight = {
  average: 0.5,
  tall: 0.75,
  short: 0.87,
  veryTall: 0.9,
};
export default function getAttributes() {
  let attributes = "";
  // generate attributes. Glasses, hair color, eye color, skin, height, body type
  // glasses 60% chance. 63% of adults wear glasses.
  Math.random() < 0.6 ? (attributes += "wears glasses, ") : null;
  // Eye color. 80% chance of brown eyes. 10% chance of blue eyes. 5% chance of hazel eyes. 3% chance of green eyes. 2% chance of grey eyes. 1% chance of amber eyes.
  const eyeColor = Math.random();
  if (eyeColor < probsEyes.brown) {
    attributes += "brown eyes, ";
  } else if (eyeColor < probsEyes.blue) {
    attributes += "blue eyes, ";
  } else if (eyeColor < probsEyes.hazel) {
    attributes += "hazel eyes, ";
  } else if (eyeColor < probsEyes.green) {
    attributes += "green eyes, ";
  } else if (eyeColor < probsEyes.grey) {
    attributes += "grey eyes, ";
  } else {
    attributes += "amber eyes, ";
  }
  // Hair color from list of colors.
  attributes += colors[Math.floor(Math.random() * colors.length)] + " hair, ";
  // skin color. Equal chances between brown, white, black, dark, tan, light, olive, and pale.
  attributes +=
    skinList[Math.floor(Math.random() * skinList.length)] + " skin, ";
  // Get body type. 60% chance of average. 20% chance of slim. 10% chance of athletic. 5% chance of curvy. 3% chance of chubby. 2% chance of fat.
  const bodyType = Math.random();
  if (bodyType < probsBody.average) {
    attributes += "average body, ";
  } else if (bodyType < probsBody.slim) {
    attributes += "slim, ";
  } else if (bodyType < probsBody.athletic) {
    attributes += "athletic, ";
  } else if (bodyType < probsBody.curvy) {
    attributes += "curvy, ";
  } else if (bodyType < probsBody.muscular) {
    attributes += "muscular, ";
  } else {
    attributes += "obese, ";
  }
  // Get height. 50% chance of average. 25% chance of tall. 12% chance of short. 10% chance of very tall. 3% chance of very short.
  const height = Math.random();
  if (height < probsHeight.average) {
    attributes += "average height";
  } else if (height < probsHeight.tall) {
    attributes += "tall";
  } else if (height < probsHeight.short) {
    attributes += "short";
  } else if (height < probsHeight.veryTall) {
    attributes += "very tall";
  } else {
    attributes += "very short";
  }
  // return attributes
  return attributes;
}

// Optimize this way.
// switch(true) {
//     case [0,6].includes(weekday):
//       return "8:00am-12:00pm";

//     case weekday === 1:
//       return "Closed";

//     default:
//       return "8:00am-20:00pm";
//   }
