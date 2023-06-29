const finishBtn = document.getElementById('fin');
const actBtn = document.getElementById('activate');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const p3 = document.getElementById('p3');
const activeProj = document.getElementById('prod-list');
const finishList = document.getElementById('finished-list');


class ActiveProject {
  constructor(title, desc, id) {
    this.title = title;
    this.desc = desc;
    this.id = id;
    
  };

  finishProject(prodEl) {
    console.log(activeProjects);
    console.log(prodEl);
    const index = activeProjects.findIndex(e=> e.id === this.id);
    activeProjects.splice(index, 1);
    console.log(index);
    activeProj.children[index].remove();
    console.log(activeProjects);
    this.convertToActivate(prodEl)

  };

  convertToActivate(prodEl) {
    const newActiveProj = new FinishedProject(prodEl);
    const newElem = newActiveProj.renderItem(prodEl);
    finishList.append(newElem);
    // const finBtn = prodEl.querySelector('#');
    // finBtn.innerHTML = `
    // <button id='activate'>Activate</button>
    // `;
    // finBtn.addEventListener('click', () => this.finishProject(prodEl));
    // finishList.append(prodEl);
    finishedProjects.push(newActiveProj);
    console.log(finishedProjects);
  }

  renderItem() {
    const prodEl = document.createElement('li');
    prodEl.id = this.id;
    prodEl.className = 'card';
    prodEl.innerHTML = `
    <h2>${this.title}</h2>
    <p>${this.desc}</p>
    <button class="alt">More Info</button>
    <button id='fin'">Finish</button>
    `;
    const finBtn = prodEl.querySelector('#fin');
    finBtn.addEventListener('click', () => this.finishProject(prodEl));
    activeProjects.push(prodEl);
    activeProj.append(prodEl);
    // return prodEl
  };
}

class FinishedProject {
  constructor(title, desc, id) {
    this.title = title;
    this.desc = desc;
    this.id = id;
  };

  activateProject(prodEl) {
    console.log(prodEl);
    console.log(this.id);
    const index = finishList.findIndex(e=> e.id === this.id);
    console.log(index);
    finishList.children[index].remove();
    this.convertToFinish(prodEl);
  }

  convertToFinish() {

  }

  renderItem() {
    const prodEl = document.createElement('li');
    prodEl.id = this.id;
    prodEl.className = 'card';
    prodEl.innerHTML = `
    <h2>${this.title}</h2>
    <p>${this.desc}</p>
    <button class="alt">More Info</button>
    <button id='active'">Activate</button>
    `;
    const finBtn = prodEl.querySelector('#active');
    finBtn.addEventListener('click', () => this.activateProject(prodEl));
    finishedProjects.push();
    activeProj.append(prodEl);
    return prodEl
  };
}

let finishedProjects = [new FinishedProject('Book Hotel', 'Academind conference takes place in December, dont forget to book a hotel', 'p3')]
let activeProjects = [new ActiveProject('Finish the Course', 'Finish the course within the next two weeks', 'p1'), new ActiveProject('Buy Groceries', 'Dont forget to pick up groceries today', 'p2')];
const projectNew = new ActiveProject('hell', 'the only one', 'p4');
projectNew.renderItem();

