import "./styles.css";
import EventEmitter from 'events'; 
 
export default class Tooltip extends EventEmitter{

  constructor(elementId) {
    super();
    this.element = document.getElementById(elementId);
    this.hasTooltip = false;
    this.config ={
      backgroundColor: 'white',
      borderRadius: '25px',
      border: '1px solid #ccc',
      padding: '5px',
      fontSize: '10px',
      rect:  this.element.getBoundingClientRect(),
      left:  this.element.getBoundingClientRect().left + "px",
      right: this.element.getBoundingClientRect().right + "px"
    };
  }

  add() { 
    console.log(this);
    if(this.hasTooltip) return;
    const tooltip = document.createElement("div");
    tooltip.textContent = "Throw me in the box!";
    tooltip.classList.add("tooltip"); 
    Object.assign(tooltip.style, this.config);
    this.element.appendChild(tooltip);
    this.hasTooltip = true;
    this.emit('tooltip:added', {target:this});
  }

  remove() {
    if(!this.hasTooltip) return;
    this.element.removeChild(this.element.lastElementChild);
    this.hasTooltip = false;
    this.emit('tooltip:removed');
  }
}
