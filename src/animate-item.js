import { gsap } from "gsap";

export default class ApplyAnimation{
  constructor(elementId){
    this.toAnimate = document.getElementById(elementId);
    this.elementId=elementId;
    console.log('animated ', elementId);
    this.elemAdded = [];
  }

  //animateItems
  toBox(){

    //click event listener
    const timeline = gsap.timeline();
    timeline.to(`#${this.elementId}`, { x: -300, duration: 0.5, ease: 'power2.inOut' })
            .to(`#${this.elementId}`, { opacity: 0, duration: 0.5 });
  }
}