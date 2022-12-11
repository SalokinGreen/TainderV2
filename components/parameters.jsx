import { useSelector, useDispatch } from "react-redux";
import { changePreset } from "../store/user";
import styles from "../styles/parameters.module.css";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material/Typography";
import { useEffect } from "react";
export default function Parameters({ index, defaultPreset }) {
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  let preset = chat.preset === "default" ? defaultPreset : user.presets[index];
  const disabled = chat.preset === "default" ? true : false;
  useEffect(() => {
    preset = chat.preset === "default" ? defaultPreset : user.presets[index];
  }, [chat.preset]);
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
              step={0.1}
              value={preset.parameters.temperature}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "temperature",
                    value: e.target.value,
                  })
                );
              }}
              disabled={disabled}
            />
            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                step={0.1}
                disabled={disabled}
                value={preset.order.temperature.order}
              />
            </div>
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            value={preset.parameters.temperature}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "temperature",
                  value: e.target.value,
                })
              );
            }}
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
              step={1}
              disabled={disabled}
              value={preset.parameters.max_length}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "max_length",
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
            value={preset.parameters.max_length}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "max_length",
                  value: e.target.value,
                })
              );
            }}
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
              step={0.1}
              disabled={disabled}
              value={preset.parameters.repetition_penalty}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "repetition_penalty",
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
            value={preset.parameters.repetition_penalty}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "repetition_penalty",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
        <h3>Advanced</h3>
        <h5>Sampling</h5>
        <i className={styles.description}>
          Turn the sampling value to 1 to disable it.
        </i>
        <div className={styles.part}>
          <h5 className={styles.title}>Top K</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={300}
              min={0}
              className={styles.number}
              step={1}
              disabled={disabled}
              value={preset.parameters.top_k}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "top_k",
                    value: e.target.value,
                  })
                );
              }}
            />
            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                step={0.1}
                disabled={disabled}
                value={preset.order.top_k.order}
              />
            </div>
          </div>
          <Slider
            defaultValue={1}
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0}
            max={300}
            step={1}
            disabled={disabled}
            value={preset.parameters.top_k}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "top_k",
                  value: e.target.value,
                })
              );
            }}
          />
          <div className={styles.part}>
            <h5 className={styles.title}>Top-A</h5>
            <div className={styles.numberContainer}>
              <input
                type="number"
                max={1}
                min={0.001}
                className={styles.number}
                step={0.01}
                disabled={disabled}
                value={preset.parameters.top_a}
                onChange={(e) => {
                  dispatch(
                    changePreset({
                      index: index,
                      change: "top_a",
                      value: e.target.value,
                    })
                  );
                }}
              />
              <div className={styles.numberOrder}>
                Order
                <input
                  type="number"
                  max={3}
                  min={0.1}
                  className={styles.number}
                  step={0.1}
                  disabled={disabled}
                  value={preset.order.top_a.order}
                />
              </div>
            </div>
            <Slider
              className={styles.slider}
              valueLabelDisplay="auto"
              max={1}
              min={0.001}
              step={0.001}
              disabled={disabled}
              value={preset.parameters.top_a}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "top_a",
                    value: e.target.value,
                  })
                );
              }}
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
              step={0.1}
              disabled={disabled}
              value={preset.parameters.tail_free_sampling}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "tail_free_sampling",
                    value: e.target.value,
                  })
                );
              }}
            />
            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                step={0.1}
                disabled={disabled}
                value={preset.order.tfs.order}
              />
            </div>
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            max={1}
            min={0.001}
            step={0.001}
            disabled={disabled}
            value={preset.parameters.tail_free_sampling}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "tail_free_sampling",
                  value: e.target.value,
                })
              );
            }}
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
              step={0.1}
              disabled={disabled}
              value={preset.parameters.typical_p}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "typical_p",
                    value: e.target.value,
                  })
                );
              }}
            />

            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                step={0.1}
                disabled={disabled}
                value={preset.order.typical_p.order}
              />
            </div>
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            max={1}
            min={0.001}
            step={0.001}
            disabled={disabled}
            value={preset.parameters.typical_p}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "typical_p",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Nucleus</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={1}
              min={0.001}
              className={styles.number}
              step={0.01}
              disabled={disabled}
              value={preset.parameters.top_p}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "top_p",
                    value: e.target.value,
                  })
                );
              }}
            />
            <div className={styles.numberOrder}>
              Order
              <input
                type="number"
                max={3}
                min={0.1}
                className={styles.number}
                step={0.1}
                disabled={disabled}
                value={preset.order.top_p.order}
              />
            </div>
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            max={1}
            min={0.001}
            step={0.001}
            disabled={disabled}
            value={preset.parameters.top_p}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "top_p",
                  value: e.target.value,
                })
              );
            }}
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
              step={0.1}
              disabled={disabled}
              value={preset.parameters.repetition_penalty_range}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "repetition_penalty_range",
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
            value={preset.parameters.repetition_penalty_range}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "repetition_penalty_range",
                  value: e.target.value,
                })
              );
            }}
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
              step={0.1}
              disabled={disabled}
              value={preset.parameters.repetition_penalty_slope}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "repetition_penalty_slope",
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
            value={preset.parameters.repetition_penalty_slope}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "repetition_penalty_slope",
                  value: e.target.value,
                })
              );
            }}
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
              step={0.1}
              disabled={disabled}
              value={preset.parameters.repetition_penalty_presence}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "repetition_penalty_presence",
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
            value={preset.parameters.repetition_penalty_presence}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "repetition_penalty_presence",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className={styles.part}>
          <h5 className={styles.title}>Frequency</h5>
          <div className={styles.numberContainer}>
            <input
              type="number"
              max={3}
              min={0.1}
              className={styles.number}
              step={0.1}
              disabled={disabled}
              value={preset.parameters.repetition_penalty_frequency}
              onChange={(e) => {
                dispatch(
                  changePreset({
                    index: index,
                    change: "repetition_penalty_frequency",
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
          <Slider
            className={styles.slider}
            valueLabelDisplay="auto"
            min={0.1}
            max={3}
            step={0.1}
            disabled={disabled}
            value={preset.parameters.repetition_penalty_frequency}
            onChange={(e) => {
              dispatch(
                changePreset({
                  index: index,
                  change: "repetition_penalty_frequency",
                  value: e.target.value,
                })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
