
import "./styles.css";
import ToolTip from "./tooltip";
import BoxMethod from './four-box.js'
import ApplyAnimation from "./animate-item.js";

window.addEventListener("load", function () {
  //start trash

  const box = new BoxMethod("box");
  box.populateItems("bedroom");

  const bedroomArr = ["cans", "pot", "forks", "winter"];
  formatAll(bedroomArr);
});

function formatAll(elemArr){
  elemArr.forEach((elem)=>{
    mouseOverFormat(elem);
  })
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
