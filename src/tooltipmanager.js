export default class ToolTipManager{
  constructor(){
    this.tooltips = {};
  }

  manage(toolTip){
    this.tooltips[toolTip.element.id] = toolTip;
    

  }
}