import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/parameters.module.css";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material/Typography";
export default function Parameters() {
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const disabled = chat.preset === "default" ? true : false;
  return (
    <div className={styles.parameters}>
      <div className={styles.general}>
        <div className={styles.part}>
          {disabled ? (
            <i className={styles.descriptionWarning}>
              Change from the default preset to change these parameters.
            </i>
          ) : null}
          <h5 className={styles.title}>Craziness</h5>
          <i className={styles.description}>
            How random your chat partner gets.
          </i>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              steps={0.1}
              disabled={disabled}
            />
            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                steps={0.1}
                disabled={disabled}
              />
            </div>
          </div>
          <Slider
            defaultValue={1}
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
          />
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Output Length</h5>
          <i className={styles.description}>
            Up to how many tokens your chat partner can write in one Message.
          </i>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={100}
              min={1}
              className={styles.number}
              steps={1}
              disabled={disabled}
            />
          </div>
          <Slider
            defaultValue={1}
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
          />
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Repetitation Penality</h5>
          <i className={styles.description}>
            The higher the value the more your chat partner repeats themselfs.
          </i>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              steps={0.1}
              disabled={disabled}
            />
          </div>
          <Slider
            defaultValue={1}
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
          />
        </div>
        <h3>Avanced</h3>
        <h5>Sampling</h5>
        <i className={styles.description}>
          Turn the order to 0 to disable sampling.
        </i>
        <div className={styles.part}>
          <h5 className={styles.title}>Top K</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              steps={0.1}
              disabled={disabled}
            />
            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                steps={0.1}
                disabled={disabled}
              />
            </div>
          </div>
          <Slider
            defaultValue={1}
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
          />
          <div className={styles.part}>
            <h5 className={styles.title}>Top-A</h5>
            <div className={styles.numberContainer}>
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                steps={0.1}
                disabled={disabled}
              />
              <div className={styles.numberOrder}>
                Order
                <input
                  type="number"
                  max={3}
                  min={0.1}
                  className={styles.number}
                  steps={0.1}
                  disabled={disabled}
                />
              </div>
            </div>
            <Slider
              defaultValue={1}
              className={styles.slider}
              valueLabelDisplay="auto"
              min={0.1}
              max={3}
              step={0.1}
              disabled={disabled}
            />
          </div>
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Tail-Free</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              steps={0.1}
              disabled={disabled}
            />
            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                steps={0.1}
                disabled={disabled}
              />
            </div>
          </div>
          <Slider
            defaultValue={1}
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
          />
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Typical</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              steps={0.1}
              disabled={disabled}
            />

            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                steps={0.1}
                disabled={disabled}
              />
            </div>
          </div>
          <Slider
            defaultValue={1}
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
          />
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Nucleaus</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              steps={0.1}
              disabled={disabled}
            />
            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                steps={0.1}
                disabled={disabled}
              />
            </div>
          </div>
          <Slider
            defaultValue={1}
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
          />
        </div>
        <h5>Repetition Penality</h5>
        <div className={styles.part}>
          <h5 className={styles.title}>Range</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              steps={0.1}
              disabled={disabled}
            />
          </div>
          <Slider
            defaultValue={1}
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
          />
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Slope</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              steps={0.1}
              disabled={disabled}
            />
          </div>
          <Slider
            defaultValue={1}
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
          />
        </div>
        <h5>Alternative</h5>
        <div className={styles.part}>
          <h5 className={styles.title}>Presence</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              steps={0.1}
              disabled={disabled}
            />
          </div>
          <Slider
            defaultValue={1}
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
          />
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Frequenzy</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              steps={0.1}
              disabled={disabled}
            />
          </div>
          <Slider
            defaultValue={1}
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
