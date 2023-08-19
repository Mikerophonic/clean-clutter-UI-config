
import "./styles.css";
import ToolTip from "./tooltip";


window.addEventListener("load", function () {
  mouseOverFormat("cans");
  mouseOverFormat("pot");
  mouseOverFormat("forks");
});




function mouseOverFormat(elementId) {
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
