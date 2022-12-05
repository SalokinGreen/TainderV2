import styles from "../../styles/login.module.css";
import Image from "next/image";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loggingIn } from "../../store/user";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const dispatch = useDispatch();
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [login, switchLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const loginHandler = () => {
    login ? switchLogin(false) : switchLogin(true);
  };
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
    if (login) {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.log(error);
        setError(error.message);
      }
    } else if (forgotPassword) {
      let { data, error } = await supabase.auth.api.resetPasswordForEmail(
        email
      );
      if (error) {
        console.log(error);
        setError(error.message);
      } else {
        setError("Check your email for a password reset link");
      }
    } else {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        console.log(error);
        setError(error.message);
      } else {
        console.log(data);
        // user id = data.user.id
        const { database, error } = await supabase
          .from("users")
          .insert([{ user_id: data.user.id, chats: [], matches: [] }]);
      }
    }
    setEmail("");
    setPassword("");
    switchLogin(true);
  };

  // return (
  //   <div className={styles.modal}>
  //     <div className={styles.modalContent}>
  //       <Auth
  //         supabaseClient={supabase}
  //         appearance={{ theme: ThemeSupa }}
  //         theme="dark"
  //       />
  //     </div>
  //   </div>
  // );
  return forgotPassword ? (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Forgot Password</h2>
        </div>

        <form onSubmit={submitHandler} className={styles.modalBody}>
          <input
            type="text"
            placeholder="Email"
            className={styles.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className={styles.modalButton}
            onClick={() => submitHandler()}
          >
            Enter
          </button>
        </form>
        <div className={styles.modalFooter}>
          <p onClick={() => setForgotPassword(false)}>{"Have an account?"}</p>
        </div>
        <p
          className={
            error.length === 0 ? styles.errorMessageNone : styles.errorMessage
          }
        >
          {error}
        </p>
      </div>
    </div>
  ) : (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          {login ? <h2>LOGIN</h2> : <h2>REGISTER</h2>}
        </div>

        <form onSubmit={submitHandler} className={styles.modalBody}>
          <input
            type="text"
            placeholder="Email"
            className={styles.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={styles.modalButton}
            onClick={() => submitHandler()}
          >
            Enter
          </button>
        </form>
        <div className={styles.modalFooter}>
          <p onClick={() => loginHandler()}>
            {login ? "Don't have an account?" : "Have an account?"}
          </p>
          <p onClick={() => setForgotPassword(true)}>Forgot password?</p>
        </div>
        <p
          className={
            error.length === 0 ? styles.errorMessageNone : styles.errorMessage
          }
        >
          {error}
        </p>
      </div>
    </div>
  );
}
