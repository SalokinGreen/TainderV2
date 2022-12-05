import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import generateDetails from "./generateDetails";
import axios from "axios";
import cleanNaiImgResponse from "../misc/cleanNaiImgResponse";
// Function to generate a card
export default async function generateCard(
  n,
  key,
  pref,
  parameters,
  model,
  img,
  id
) {
  let matches = [];

  for (let i = 0; i < n; i++) {
    // generate card details
    const input = generateDetails(pref);
    // generate card
    const response = await axios.post("/api/match", {
      key: key,
      input: {
        name: input.name,
        age: input.age,
        gender: input.gender,
        attributes: input.attributes,
        from: input.from,
        work: input.work,
      },
      parameters,
      model,
      img,
    });
    // dispatch match to user counter
    const data = response.data;
    const image = data.img === "" ? "" : cleanNaiImgResponse(data.img);
    const match = {
      name: data.input.name,
      age: data.input.age,
      gender: data.input.gender,
      attributes: data.input.attributes,
      from: data.input.from,
      work: data.input.work,
      image: image,
      likes: data.likes.output,
      dislikes: data.dislikes.output,
      about: data.about.output,
      chat: [],
      id: uuidv4(),
    };
    matches.push(match);
  }
  return matches;
}
// Maybe adding hobbies later
//{name: 'Alison Grey', age: "20", attributes: 'blonde, blue eyes, white, small, glasses', from: 'america', work: 'student'}
