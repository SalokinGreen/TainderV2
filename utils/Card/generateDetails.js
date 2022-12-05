// Import functions from Details folder
import getAttributes from "./Details/getAttributes";
import getAge from "./Details/getAge";
import getCountry from "./Details/getCountry";
import getName from "./Details/getName";
import getWork from "./Details/getWork";

// Function to return json with those details
export default function generateDetails(pref) {
  // generate gender 50/50
  const gender = Math.random() < 0.5 ? "Man" : "Woman";
  return {
    name: getName(gender),
    age: getAge(pref.minAge, pref.maxAge),
    attributes: getAttributes(),
    from: getCountry(),
    work: getWork(),
    gender,
  };
}
