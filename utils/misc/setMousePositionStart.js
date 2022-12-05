import { useSelector, useDispatch } from "react-redux";
import { replaceStart } from "../store/mouse";

const getMousePositionStart = (e) => {
  const dispatch = useDispatch();
  const start = useSelector((state) => state.mouse.value.start);
  const stop = useSelector((state) => state.mouse.value.stop);
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx =
      e.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    posy =
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  const mouse = {
    x: posx,
    y: posy,
  };
  dispatch(replaceStart(mouse));
};
