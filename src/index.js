import "./styles.css";
import BoxMethod from './four-box.js';

window.addEventListener("load", function () {
  // Start the process with the kitchen
  const box = new BoxMethod("box");
  box.populateItem("kitchen");
  
});