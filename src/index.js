
import "./styles.css";
import ToolTip from "./tooltip";
import BoxMethod from './four-box.js'
import ApplyAnimation from "./animate-item.js";

window.addEventListener("load", function () {
  mouseOverFormat("cans");
  mouseOverFormat("pot");
  mouseOverFormat("forks");
  mouseOverFormat('winter');
  setOnStart();
});

function setOnStart(){
  const fourbox = new BoxMethod('box');
  return fourbox;
}

function mouseOverFormat(elementId) {
  const animate = new ApplyAnimation(elementId);
  animate.toBox();
  const elemToolTip = new ToolTip(elementId);
    document
      .getElementById(elementId)
      .addEventListener("mouseover", function(){
        elemToolTip.add();
      });

    document
      .getElementById(elementId)
      .addEventListener("mouseleave", function () {
        elemToolTip.remove();
      });
}
