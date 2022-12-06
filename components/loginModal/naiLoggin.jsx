import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getNaiAccessToken from "../../utils/misc/important/getNaiAccessToken";
import { changeNaiKey } from "../../store/user";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function NaiLoggin({
  activateNai,
  generate,
  setError,
  setErrorMessage,
  setVariation,
}) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const id = useSelector((state) => state.user._id);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    const token = await getNaiAccessToken(username, password, id);
    dispatch(changeNaiKey(token));
    activateNai(true);
    if (!token) {
      setVariation("error");
      setError(true);
      setErrorMessage("Wrong NovelAI credentials");
      return;
    } else {
      setVariation("success");
      setError(true);
      setErrorMessage("Successfully logged into NovelAI");
      localStorage.setItem("naiToken", token);
      generate();
    }

    setUsername("");
    setPassword("");
  };

  return (
    <form action="naiAccess" onSubmit={submitHandler}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="Log in" />
    </form>
  );
}
