import EventEmitter from 'events'; 
export default class BoxMethod extends EventEmitter {
  constructor(boxElementId) {
    super();
    this.done = false;
    this.counter = 0; 
    this.boxElement = document.getElementById(boxElementId);
    this.state = 
    {
      "0": "Trash",
      "1": "Put Away",
      "2": "Store",
      "3": "Donate",
      "4": "done"
    };
    this.calculateRect();
    this.config ={
      backgroundColor: 'white',
      borderRadius: '25px',
      border: '1px solid #ccc',
      padding: '5px',
      color: 'clay',
      width: '50%',
      fontSize: '20px',
      textAlign: 'center',
      position: 'absolute',
      bottom: '0px',
      rect :this.rect,
      left: this.left + "px",
      right: this.right + "px"
    };
    this.boxText = null;
    this.formatBoxText();
  }

  trashState(){
    

  }
  getState(){
    return this.state[this.counter];
  }

  nextState(){
    if(this.counter===3){
      this.counter++;
      this.done=true;
      this.emit('box:done', {target: this});
    }
    this.counter++;
  }

  calculateRect() {
    const rect = this.boxElement.getBoundingClientRect();
    this.rect = rect;
    this.left = rect.left;
    this.right = rect.right;
  }

  formatBoxText() {
    // Check if this.boxText exists, and create it if not
    if (!this.boxText) {
      this.boxText = document.createElement("div");
      this.boxText.classList.add('box-text');
      Object.assign(this.boxText.style, this.config);
      console.log('initialized');
      this.boxElement.appendChild(this.boxText);
    }
  
    // Update the textContent and id based on the current state
    this.boxText.textContent = this.state[this.counter];
    this.boxText.setAttribute('id', `${this.state[this.counter]}`);
    this.boxTextId = this.state[this.counter];
  }
  



}