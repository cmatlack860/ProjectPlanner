const finishBtn = document.getElementById('fin');
const actBtn = document.getElementById('activate');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const p3 = document.getElementById('p3');
const activeProj = document.getElementById('prod-list');
const finishList = document.getElementById('finished-list');


class Tooltip {
  constructor(id, func) {
    console.log(id);
    this.func = func;
    const el = document.getElementById(id);
    const desc = el.getAttribute('data-extra-info');
    this.desc = desc;
    console.log(desc);
  };

 remove() {
  this.element.remove();
  this.func()
 }

  show() {
    alert(this.desc);
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    this.element = tooltipElement;
    tooltipElement.textContent = this.desc;
    tooltipElement.addEventListener('click', this.remove.bind(this))
    document.body.append(tooltipElement);
  }
    
  
};

class domHelper {
  static moveElement(elementId, newDestination) {
    const element = document.getElementById(elementId);
    const destination = document.querySelector(newDestination);
    destination.append(element);
  };
  static clearEvent(el) {
    const cloneEl = el.cloneNode(true);
    el.replaceWith(cloneEl);
    return cloneEl;
  };
}

class ProjectItem {
  constructor(id, method, type) {
    this.method = method;
    this.id = id;
    this.connectMoreInfo(id);
    this.connectSwitchButton(type);

  };

  showInfo() {
    if (this.hasActivetooltip) {
      return
    };
    const toolTip = new Tooltip(this.id, ()=>{
      this.hasActivetooltip = false;
    });
    toolTip.show();
    this.hasActivetooltip = true;
  };


  connectMoreInfo(id) {
    const infoItemEl = document.getElementById(id);
    const infoBtn = infoItemEl.querySelector('button:first-of-type');
    console.log(id);
    this.id = id;
    infoBtn.addEventListener('click', this.showInfo.bind(this));
    console.log(this);
  };

  connectSwitchButton(type) {
    const projectItemEl = document.getElementById(this.id);
    console.log(projectItemEl);
    let finishButton = projectItemEl.querySelector('button:last-of-type');
    // const activateButton = projectItemEl.querySelector('#[activate]');
    // activateButton.addEventListener('click', this.method.bind(null, this.id));
    finishButton = domHelper.clearEvent(finishButton);
    finishButton.textContent = type === 'active' ? 'Finish' : 'Activate';
    finishButton.addEventListener('click', this.method.bind(null, this.id));

  };  

  update(updatePrjFunc, type) {
    this.method = updatePrjFunc;
    this.connectSwitchButton(type)
  
  };


}



class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    console.log(prjItems);
    console.log(this);
    for (const el of prjItems) {
      this.projects.push(new ProjectItem(el.id, this.switchProject.bind(this), this.type)); //switchproject is bound to list, not item
      
    }
    console.log(this.projects);
     
  };

  setSwitchHandler(switchHandler) {
    this.switchHandler = switchHandler;
  };

  switchProject(id) {
    this.switchHandler(this.projects.find(e=> e.id === id));
    const index = this.projects.findIndex(e=> e.id === id);
    this.projects.splice(index, 1);
  };

  addProject(newId) {
    console.log(newId);
    this.projects.push(newId);
    const htmlEl = document.querySelector(`#${newId.id}`);
    console.log(htmlEl);
    domHelper.moveElement(newId.id, `#${this.type}-projects ul`);
    console.log(this.projects);
    newId.update(this.switchProject.bind(this), this.type)
  }
}


class App {
  static init() {
    const activeProjectList = new ProjectList('active');
    const finishProjectList = new ProjectList('finished');
    activeProjectList.setSwitchHandler(finishProjectList.addProject.bind(finishProjectList));
    finishProjectList.setSwitchHandler(activeProjectList.addProject.bind(activeProjectList));
  }
};

App.init();







