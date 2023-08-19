import "./styles.css";
import EventEmitter from 'events'; 

export default class Tooltip extends EventEmitter{

  constructor(elementId) {
    super();
    this.element = document.getElementById(elementId);
    this.config ={
      backgroundColor: 'white',
      border: '1px solid #ccc',
      padding: '5px',
      fontSize: '10px',
      rect :this.element.getBoundingClientRect(),
      left: this.element.getBoundingClientRect().left + "px",
      right: this.element.getBoundingClientRect().right + "px"

    };
  }

  add() { 
    if(this.hasTooltip) return;
    const tooltip = document.createElement("div");
    tooltip.textContent = "Throw me in the box!";
    tooltip.classList.add("tooltip");
    Object.assign(tooltip.style, this.config);
    this.element.appendChild(tooltip);
    this.emit('tooltip:added');
  }

  remove() {
    if(!this.hasTooltip) return;
    this.element.removeChild(this.element.lastElementChild);
    this.emit('tooltip:removed');
  }
}
