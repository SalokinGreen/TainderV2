import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/parameters.module.css";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material/Typography";
export default function Parameters() {
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);

  return (
    <div className={styles.parameters}>
      <div className={styles.general}>
        <div className={styles.randomness}>
          <h5>Craziness</h5>
        </div>
      </div>
    </div>
  );
}
