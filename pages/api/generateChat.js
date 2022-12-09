import chatGeneration from "../../utils/Chat/chatGeneration";

export default async function handler(req, res) {
  const response = await chatGeneration(
    req.body.chat,
    req.body.naiKey,
    req.body.parameters
  );
  const answer = response.includes("\n") ? response.split("\n")[0] : response;
  res.status(200).json(answer);
}
