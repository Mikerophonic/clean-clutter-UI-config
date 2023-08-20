import EventEmitter from "events";
import ApplyAnimation from "./animate-item";
import Tooltip from "./tooltip.js";
const confetti = require("canvas-confetti");

export default class BoxMethod extends EventEmitter {
  constructor(boxElementId) {
    super();
    this.done = false;
    this.counter = 0;
    this.boxElement = document.getElementById(boxElementId);
    this.state = {
      0: "trash",
      1: "put-away",
      2: "store",
      3: "donate",
      4: "done",
    };

    this.elems = {
      "trash": document.getElementsByClassName("trash"),
      "donate": document.getElementsByClassName("donate"),
      "put-away": document.getElementById("put-away"),
      "store": document.getElementById("store"),
    };

    console.log('elems', this.elems);
    console.log('trash', this.elems["trash"]);

    this.calculateRect();
    this.boxText = null;

    this.config = {
      backgroundColor: "white",
      borderRadius: "25px",
      border: "1px solid #ccc",
      padding: "5px",
      color: "clay",
      width: "50%",
      fontSize: "20px",
      textAlign: "center",
      position: "absolute",
      bottom: "0px",
      rect: this.rect,
      left: this.left + "px",
      right: this.right + "px",
    };
    this.formatBoxText();
  }

  putAway() {
    this.nextState();
    this.formatBoxText();
  }

  getState() {
    return this.state[this.counter];
  }

  nextState() {
    if (this.counter===3) {
      this.done = true;
      this.finish();
      this.emit("box:done", { target: this });
    }
    this.counter++;
    console.log('counter', this.counter);
    console.log('state', this.state[this.counter]);
  }

  calculateRect() {
    const rect = this.boxElement.getBoundingClientRect();
    this.rect = rect;
    this.left = rect.left;
    this.right = rect.right;
  }

  populateItem(room) {
    for (let i = 0; i < 4; i++) {
      const stateValue = this.state[i];
      const className = `${stateValue}-${room}`;
      // Select all elements with the specific class name
      const elements = document.getElementsByClassName(className);
  
      // Append each selected element to the parent div
      for (const element of elements) {
        const elemToolTip = new Tooltip(element.id);
        element.addEventListener('mouseover', () => {
          if (element.className.includes(this.getState())) {
            elemToolTip.add();
          }
        });
      document
      .getElementById(element.id)
      .addEventListener("mouseleave", function () {
        elemToolTip.remove();
      });
      element.addEventListener("click", () => {
        // Check if the class name of the clicked element matches the current state
        if (element.className.includes(this.getState())) {
          this.animateItem(element.id);
          this.putAway();
          console.log(element.id);
        }
      });
      }
    }
  }

  animateItem(elementId) {
    const animate = new ApplyAnimation(elementId);
    console.log('animated ', elementId);
    animate.toBox();
  }
  
  
  formatBoxText() {
    // Check if this.boxText exists, and create it if not
    if (!this.boxText) {
      this.boxText = document.createElement("div");
      this.boxText.classList.add("box-text");
      Object.assign(this.boxText.style, this.config);
      this.boxElement.appendChild(this.boxText);
    }

    // Update the textContent and id based on the current state
    this.boxText.textContent = this.state[this.counter];
    this.boxText.setAttribute("id", `${this.state[this.counter]}`);
    this.boxTextId = this.state[this.counter];
  }

  finish() {
    const myCanvas = document.createElement("canvas");
    console.log('finished');
    document.querySelector('#kitchen').prepend(myCanvas);
    myCanvas.style.position = 'absolute';
    myCanvas.style.width = "100%";
    myCanvas.style.top='30px';
    myCanvas.style.left="300px";
    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });
    myConfetti({
      particleCount: 400,
      spread: 260
    });
  }
}
