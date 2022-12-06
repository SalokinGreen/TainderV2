import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import _ from "lodash";
import TokenizerService from "../../utils/tokenizers/gptTokenizer";
import PileTokenizer from "../../utils/tokenizers/PileTokenizer";
import buildContext from "../../utils/Chat/buildContext";
import axios from "axios";
export default function Test() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const ai = {
    chat: [
      { from: "user", text: "Hello" },
      { from: "ai", text: "Hi" },
      { from: "user", text: "How are you?" },
      { from: "ai", text: "I'm fine, thanks." },
      { from: "user", text: "What are you doing?" },
      { from: "ai", text: "I'm coding." },
      { from: "user", text: "That's cool." },
      { from: "ai", text: "Yeah." },
      { from: "user", text: "What language?" },
      { from: "ai", text: "JavaScript." },
      { from: "user", text: "Cool." },
      { from: "ai", text: "Yeah." },
      { from: "user", text: "What are you coding?" },
      { from: "ai", text: "A chatbot." },
      { from: "user", text: "Cool." },
      { from: "ai", text: "Yeah." },
      { from: "user", text: "What's it called?" },
      { from: "ai", text: "Nai." },
      { from: "user", text: "Cool." },
      { from: "ai", text: "Yeah." },
      { from: "user", text: "What does it do?" },
      { from: "ai", text: "It talks." },
      { from: "user", text: "Cool." },
      { from: "ai", text: "Yeah." },
      { from: "user", text: "What does it talk about?" },
      { from: "ai", text: "Anything." },
      { from: "user", text: "Cool." },
      { from: "ai", text: "Yeah." },
      { from: "user", text: "What's it's favorite topic?" },
      { from: "ai", text: "It doesn't have one." },
      { from: "user", text: "Cool." },
      { from: "ai", text: "Yeah." },
      { from: "user", text: "What's it's favorite color?" },
      { from: "ai", text: "It doesn't have one." },
      { from: "user", text: "Cool." },
      { from: "ai", text: "Yeah." },
      { from: "user", text: "What's it's favorite food?" },
      { from: "ai", text: "Pasta!" },
    ],
    settings: { model: "krake" },
    name: "Nai",
  };
  const user = { name: "Nick" };
  // button function
  const button = async () => {
    // get avatar urls
    const about = await axios.post(
      "https://api.novelai.net/ai/generate",
      {
        input: "Text generation example.",
        model: "euterpe-v2",
        parameters: {
          use_string: true,
          temperature: 1,
          min_length: 10,
          max_length: 30,
        },
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldjR09admZSeW1pcGZyQmlHZmxXeiIsIm5jIjoiUHNLd21YV241UWRUaXREbkNwWlFiIiwiaWF0IjoxNjcwMjg1OTgxLCJleHAiOjE2NzI4Nzc5ODF9.bx0lTZkTAbE_ZExsX2yNoz4kIbmE5RDkoeWRO-oqBsU",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        },
      }
    );
    console.log(about);
  };

  return <button onClick={() => button()}>Test</button>;
}
