const fixRotateDirection = (
  e: React.MouseEvent<HTMLDivElement>,
  prevDeg: number,
  criteria: "window" | "element"
) => {
  let rotateDeg: number;

  if (criteria === "window") {
    // *** windowの左右を基準に回転方向を決め ***
    const mouseXatWindow = e.clientX;
    const windowWidth = window.innerWidth;

    if (prevDeg <= -1350 || prevDeg >= 1350) {
      rotateDeg = 0;
    } else {
      rotateDeg = mouseXatWindow <= windowWidth / 2 ? prevDeg - 90 : prevDeg + 90;
    }
  } else {
    // *** ターゲットのエレメントの左右を基準に回転方向を決め ***
    // ターゲットのサーズ [width, height]
    const targetSize = [e.currentTarget.offsetWidth, e.currentTarget.offsetHeight];
    // ターゲット上のマウスの座標 [x, y]
    const mouseAtTarget = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];

    const angle1st = [0, 360, 720, 1080];
    const angle2nd = angle1st.map((item) => item + 90);
    const angle3rd = angle1st.map((item) => item + 180);
    const angle4th = angle1st.map((item) => item + 270);

    const prevDegAbs = Math.abs(prevDeg);
    switch (true) {
      case angle1st.includes(prevDegAbs):
        rotateDeg = mouseAtTarget[0] <= targetSize[0] / 2 ? prevDeg - 90 : prevDeg + 90;
        break;
      case angle3rd.includes(prevDegAbs):
        rotateDeg = mouseAtTarget[0] >= targetSize[0] / 2 ? prevDeg - 90 : prevDeg + 90;
        break;
      case angle2nd.includes(prevDegAbs):
        if (prevDeg < 0) {
          rotateDeg = mouseAtTarget[1] <= targetSize[1] / 2 ? prevDeg - 90 : prevDeg + 90;
        } else {
          rotateDeg = mouseAtTarget[1] <= targetSize[1] / 2 ? prevDeg + 90 : prevDeg - 90;
        }
        break;
      case angle4th.includes(prevDegAbs):
        if (prevDeg < 0) {
          rotateDeg = mouseAtTarget[1] >= targetSize[1] / 2 ? prevDeg - 90 : prevDeg + 90;
        } else {
          rotateDeg = mouseAtTarget[1] >= targetSize[1] / 2 ? prevDeg + 90 : prevDeg - 90;
        }
        break;
      default:
        rotateDeg = 0;
        break;
    }
  }

  return rotateDeg;
};

const fixRotateDirectionAtTouch = (
  e: React.TouchEvent<HTMLDivElement>,
  prevDeg: number,
  criteria: "window" | "antiClockwise"
) => {
  let rotateDeg: number;

  if (criteria === "window") {
    // windowの左右を基準に回転方向を決め
    const mouseXatWindow = e.touches[0].clientX;
    const windowWidth = window.innerWidth;

    if (prevDeg <= -1350 || prevDeg >= 1350) {
      rotateDeg = 0;
    } else {
      rotateDeg = mouseXatWindow <= windowWidth / 2 ? prevDeg - 90 : prevDeg + 90;
    }
  } else {
    // 一律逆方向回転
    rotateDeg = prevDeg <= -1350 || prevDeg >= 1350 ? (rotateDeg = 0) : prevDeg - 90;
  }

  return rotateDeg;
};

export { fixRotateDirection, fixRotateDirectionAtTouch };
