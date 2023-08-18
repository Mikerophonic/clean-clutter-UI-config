
window.addEventListener("load", function () {
  mouseOverAnimate("cans");
  mouseOverAnimate("pot");
  mouseOverAnimate("forks");

});

class AddArrow{
  constructor(elementId){
    this.element = document.getElementById(elementId);
    this.element.addEventListener('mouseover', () => {
      document.createElement('i').classList.add('fas', 'fa-arrow-right');
      this.element.classList.add('small');
    });
  }
}

function addToolTip(elementId){
  document.getElementById(elementId).style.border = "3px solid red";
  const tooltip = document.createElement("div");
  tooltip.textContent = "Your tooltip text here!";
  tooltip.style.position = "absolute";
  tooltip.style.background = "#f9f9f9";
  tooltip.style.border = "1px solid #ccc";
  tooltip.style.padding = "5px";
  tooltip.id = "tooltip-" + elementId;
  document.body.appendChild(tooltip);
  var rect = document.getElementById(elementId).getBoundingClientRect();
  tooltip.style.left = rect.left + "px";
  tooltip.style.top = rect.bottom + "px";
}

function removeToolTip(elementId){
  const tooltip = document.getElementById("tooltip-"+elementId);
  tooltip.remove();
  document.getElementById(elementId).style.border = "none";
}

function mouseOverAnimate(elementId) {
    document
      .getElementById(elementId)
      .addEventListener("mouseover", function(){
        addToolTip(elementId);
      });

    document
      .getElementById(elementId)
      .addEventListener("mouseleave", function () {
        removeToolTip(elementId);
      });
}
