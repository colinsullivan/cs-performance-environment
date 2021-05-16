export const keyClickHandler = function (e, note, handler) {
  const keyHeight = e.target.clientHeight;
  const clickHeight = e.nativeEvent.offsetY;
  const clickHeightPercent = 1.0 - clickHeight / keyHeight;
  handler(note, clickHeightPercent);
};


