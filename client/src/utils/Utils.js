export const lockWindowScroll = () => {
  document.getElementById("main-body-div").style.overflowY = "hidden";
};

export const unLockWindowScroll = () => {
  if (document.getElementById("main-body-div")) {
    document.getElementById("main-body-div").style.overflowY = "scroll";
  }
};
