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
  let image;
  let matches = [];

  for (let i = 0; i < n; i++) {
    // generate card details
    const input = generateDetails(pref);
    // generate card
    const likes = await axios.post("/api/match", {
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
      type: 1,
    });
    const dislikes = await axios.post("/api/match", {
      key: key,
      input: {
        name: input.name,
        age: input.age,
        gender: input.gender,
        attributes: input.attributes,
        from: input.from,
        work: input.work,
        likes: likes.data,
      },
      parameters,
      model,
      img,
      type: 2,
    });
    const about = await axios.post("/api/match", {
      key: key,
      input: {
        name: input.name,
        age: input.age,
        gender: input.gender,
        attributes: input.attributes,
        from: input.from,
        work: input.work,
        likes: likes.data,
        dislikes: dislikes.data,
      },
      parameters,
      model,
      img,
      type: 3,
    });
    if (img) {
      const requestImage = await axios.post("/api/match", {
        key: key,
        input: {
          name: input.name,
          age: input.age,
          gender: input.gender,
          attributes: input.attributes,
          from: input.from,
          work: input.work,
          likes: likes.data,
          dislikes: dislikes.data,
          about: about.data,
        },
        parameters,
        model,
        img,
        type: 4,
      });
      image = cleanNaiImgResponse(requestImage.data);
    } else {
      image = "";
    }
    // dispatch match to user counter
    // const data = response.data;
    // const image = data.img === "" ? "" : cleanNaiImgResponse(data.img);
    console.log("AAAAAAAAAAAAAA");
    console.log(likes, dislikes, about, image);
    const match = {
      name: input.name,
      age: input.age,
      gender: input.gender,
      attributes: input.attributes,
      from: input.from,
      work: input.work,
      image: image,
      likes: likes.data,
      dislikes: dislikes.data,
      about: about.data,
      chat: [],
      id: uuidv4(),
    };
    console.log("MATCH", match);
    return match;
  }
}
// Maybe adding hobbies later
//{name: 'Alison Grey', age: "20", attributes: 'blonde, blue eyes, white, small, glasses', from: 'america', work: 'student'}
