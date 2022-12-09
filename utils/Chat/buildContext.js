import TokenizerService from "../tokenizers/gptTokenizer";
import PileTokenizer from "../tokenizers/PileTokenizer";
import _ from "lodash";
import { useSelector } from "react-redux";
export default function buildContext(user, ai, message, type) {
  // if type retry filter out the last message
  let startingChat;
  if (type === "retry") {
    const lastMessage = ai.messages[ai.messages.length - 1];
    startingChat = ai.messages.filter(
      (message) => message.id !== lastMessage.id
    );
  } else {
    startingChat = ai.messages;
  }
  // turn chat array backwards
  let reversedChat = _.cloneDeep(startingChat).reverse();
  const newMessageFrom = type === "user" ? `> ${ai.name}:` : `> ${ai.name}:`;
  const newMessage = type === "user" ? `> ${user.name}: ` + message + "\n" : "";
  let startingContext = `${user.name}\nAge: ${user.age}\nGender: ${user.gender}\nFrom: ${user.from}\nOccupation: ${user.work}\nLikes: ${user.likes}\nDislikes: ${user.dislikes}\nAttributes: ${user.attributes}\nAbout me: ${user.about}\n----\n${ai.name}\nAge: ${ai.age}\nGender: ${ai.gender}\nFrom: ${ai.from}\nOccupation: ${ai.work}\nLikes: ${ai.likes}\nDislikes: ${ai.dislikes}\nAttributes: ${ai.attributes}\nAbout me: ${ai.about}\n***\n[ This is a chat between ${user.name} and ${ai.name} in a dating app. ]`;
  let context = "";
  const contextLength =
    ai.model === "krake-v2"
      ? PileTokenizer.encode(startingContext).length +
        PileTokenizer.encode(newMessageFrom).length +
        PileTokenizer.encode(newMessage).length
      : TokenizerService.encode(startingContext).length +
        TokenizerService.encode(newMessageFrom).length +
        TokenizerService.encode(newMessage).length;
  reversedChat.forEach((message) => {
    let line = "";
    if (message.from === "user") {
      line = `> ${user.name}: ` + message.message + "\n";
    } else {
      line = `> ${ai.name}: ` + message.message + "\n";
    }
    if (ai.model === "krake-v2") {
      if (
        TokenizerService.encode(context).length +
          TokenizerService.encode(line).length <
        2000 - contextLength
      ) {
        context += line;
      }
    } else {
      if (
        PileTokenizer.encode(context).length +
          PileTokenizer.encode(line).length <
        2000 - contextLength
      ) {
        context += line;
      }
    }
  });

  // turn context array backwards
  const reversedContext = context.split("\n").reverse();
  startingContext += reversedContext.join("\n");
  if (type === "user") {
    startingContext += "\n" + newMessage;
  } else {
    startingContext += "\n";
  }
  startingContext += newMessageFrom;
  while (startingContext.includes("  ")) {
    startingContext = startingContext.replace("  ", " ");
  }

  while (startingContext.includes(" \n")) {
    startingContext = startingContext.replace(" \n", "\n");
  }
  while (startingContext.includes("\n ")) {
    startingContext = startingContext.replace("\n ", "\n");
  }
  while (startingContext.includes(":\n")) {
    startingContext = startingContext.replace(":\n", ": ");
  }
  while (startingContext.includes("\n\n")) {
    startingContext = startingContext.replace("\n\n", "\n");
  }
  return startingContext;
}
