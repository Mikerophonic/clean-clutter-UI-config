import EventEmitter from "events";
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
      cans: document.getElementsByClassName("trash"),
      pot: document.getElementsByClassName("donate"),
      forks: document.getElementById("put-away"),
      winter: document.getElementById("store"),
    };

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
    if (this.counter === 3) {
      this.counter++;
      this.done = true;
      this.finish();
      this.emit("box:done", { target: this });
    }
    this.counter++;
  }

  calculateRect() {
    const rect = this.boxElement.getBoundingClientRect();
    this.rect = rect;
    this.left = rect.left;
    this.right = rect.right;
  }

  populateItems(room) {
    for (let i = 0; i < 4; i++) {
      const stateValue = this.state[i];
      const className = `${stateValue}-${room}`;
      // Select all elements with the specific class name
      const elements = document.getElementsByClassName(className);
  
      // Append each selected element to the parent div
      for (const element of elements) {
        element.addEventListener("click", () => {
          this.putAway();
        });
      }
    }
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
    document.body.appendChild(myCanvas);

    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });
    myConfetti({
      particleCount: 100,
      spread: 160
    });
  }
}
