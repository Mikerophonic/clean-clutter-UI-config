import { gsap } from "gsap";

export default class ApplyAnimation{
  constructor(elementId){
    this.toAnimate = document.getElementById(elementId);
    this.elementId=elementId;
    this.elemAdded = [];
  }
  toBox(){
    this.toAnimate.addEventListener('click', ()=>{
      gsap.to(`#${this.elementId}`, {x: -300, duration: .5, ease: 'power2.inOut'});
      gsap.to(`#${this.elementId}`, { opacity: 0 });
    })
  }
}