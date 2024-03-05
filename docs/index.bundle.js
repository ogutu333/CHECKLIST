"use strict";
(self["webpackChunkCHECKLIST"] = self["webpackChunkCHECKLIST"] || []).push([["index"],{

/***/ "./modules/ContainerPresenter.js":
/*!***************************************!*\
  !*** ./modules/ContainerPresenter.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TaskFormPresenter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TaskFormPresenter.js */ "./modules/TaskFormPresenter.js");
/* harmony import */ var _TaskListPresenter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TaskListPresenter.js */ "./modules/TaskListPresenter.js");
/* harmony import */ var _TaskRepository_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TaskRepository.js */ "./modules/TaskRepository.js");
/* harmony import */ var _TaskListHeaderPresenter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TaskListHeaderPresenter.js */ "./modules/TaskListHeaderPresenter.js");





class ContainerPresenter {
  #taskRepository;

  #parent;

  #header;

  #form;

  #taskList;

  #view;

  constructor(parent, taskRepository = null) {
    this.#parent = parent;
    this.#taskRepository = taskRepository === null
      ? new _TaskRepository_js__WEBPACK_IMPORTED_MODULE_2__["default"]()
      : taskRepository;
    this.#view = document.createElement('section');
    this.#view.setAttribute('id', 'list-cont');
    this.#view.setAttribute('class', 'center');
    this.#view.addEventListener('newTask', this.#newTask);
    this.#view.addEventListener('removeAllCompleted', this.#removeAllCompleted);
    this.#view.addEventListener('removeTask', this.#removeTask);
    this.#view.addEventListener('changeState', this.#changeState);
    this.#header = new _TaskListHeaderPresenter_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.#header.setCompletedCount(this.#taskRepository.getCompletedCount());
    this.#view.appendChild(this.#header.getView());
    this.#form = new _TaskFormPresenter_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.#view.appendChild(this.#form.getView());
    this.#taskList = new _TaskListPresenter_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.#taskRepository);
    this.#view.appendChild(this.#taskList.getView());
    this.#parent.appendChild(this.#view);
  }

  #changeState = () => {
    this.#taskRepository.updateStorage();
    this.#header.setCompletedCount(this.#taskRepository.getCompletedCount());
  }

  #newTask = (evt) => {
    const newTask = this.#taskRepository.addTask(evt.detail);
    this.#taskList.addTaskView(newTask);
  }

  #removeTask = (evt) => {
    this.#taskRepository.removeTask(evt.detail);
    this.#header.setCompletedCount(this.#taskRepository.getCompletedCount());
  }

  #removeAllCompleted = () => {
    this.#taskRepository.removeAllCompleted();
    this.#header.setCompletedCount(this.#taskRepository.getCompletedCount());
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContainerPresenter);


/***/ }),

/***/ "./modules/Task.js":
/*!*************************!*\
  !*** ./modules/Task.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Task {
  index;

  description;

  completed;

  constructor(index, description, completed = false) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);


/***/ }),

/***/ "./modules/TaskFormPresenter.js":
/*!**************************************!*\
  !*** ./modules/TaskFormPresenter.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TaskFormPresenter {
  #input;

  #submit;

  #view;

  constructor() {
    this.#view = document.createElement('form');
    this.#input = document.createElement('input');
    this.#input.setAttribute('placeholder', 'Add to your list...');
    this.#input.setAttribute('id', 'new-item');
    this.#input.setAttribute('type', 'text');
    this.#view.appendChild(this.#input);
    this.#submit = document.createElement('input');
    this.#submit.setAttribute('class', 'icon-return');
    this.#submit.setAttribute('id', 'submit-new-item');
    this.#submit.setAttribute('type', 'submit');
    this.#submit.setAttribute('value', '');
    this.#submit.setAttribute('title', 'click this or press enter to submit');
    this.#view.appendChild(this.#submit);
    this.#view.addEventListener('submit', this.#submitTask);
  }

  getView = () => this.#view;

  cleanForm = () => {
    this.#input.value = '';
  }

  #submitTask = () => {
    const newTask = new CustomEvent('newTask', {
      detail: this.#input.value,
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.#view.dispatchEvent(newTask);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskFormPresenter);


/***/ }),

/***/ "./modules/TaskListHeaderPresenter.js":
/*!********************************************!*\
  !*** ./modules/TaskListHeaderPresenter.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_icon_arrows_ccw_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/icon-arrows-ccw.svg */ "./src/icon-arrows-ccw.svg");


class TaskListHeaderPresenter {
  #completedCount;

  #listStats;

  #view;

  constructor() {
    this.#view = document.createElement('div');
    this.#view.setAttribute('class', 'list-header');
    const title = document.createElement('h2');
    title.setAttribute('class', 'list-header');
    title.innerText = 'Demo';
    this.#view.appendChild(title);
    this.#listStats = document.createElement('div');
    this.#listStats.setAttribute('class', 'list-stats');
    this.#view.appendChild(this.#listStats);
    this.#completedCount = document.createElement('span');
    this.#completedCount.setAttribute('class', 'changes-count');
    this.#listStats.appendChild(this.#completedCount);
    const icon = document.createElement('img');
    icon.setAttribute('class', 'icon-arrows-ccw');
    icon.setAttribute('src', _src_icon_arrows_ccw_svg__WEBPACK_IMPORTED_MODULE_0__);
    this.#listStats.appendChild(icon);
  }

  getView = () => this.#view;

  setCompletedCount = (count) => {
    this.#completedCount.innerText = count;
    if (count === 0) this.#completedCount.classList.add('hidden');
    else this.#completedCount.classList.remove('hidden');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskListHeaderPresenter);


/***/ }),

/***/ "./modules/TaskListPresenter.js":
/*!**************************************!*\
  !*** ./modules/TaskListPresenter.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TaskPresenter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TaskPresenter.js */ "./modules/TaskPresenter.js");


class TaskListPresenter {
  #presenters;

  #taskList;

  #clearAllBtn;

  #view;

  constructor(taskRepository) {
    this.#presenters = [];

    this.#view = document.createElement('div');
    this.#taskList = document.createElement('ul');
    this.#taskList.setAttribute('class', 'list');
    const tasks = taskRepository.allTasks();

    if (tasks !== null) {
      tasks.forEach((task) => this.addTaskView(task));
    }

    this.#view.appendChild(this.#taskList);
    this.#clearAllBtn = document.createElement('button');
    this.#clearAllBtn.setAttribute('type', 'button');
    this.#clearAllBtn.setAttribute('class', 'clear-all-btn');
    this.#clearAllBtn.innerText = 'Clear all completed';
    this.#clearAllBtn.addEventListener('click', this.removeAllCompleted);
    this.#view.appendChild(this.#clearAllBtn);
  }

  getView = () => this.#view;

  addTaskView = (task) => {
    const taskPresenter = new _TaskPresenter_js__WEBPACK_IMPORTED_MODULE_0__["default"](task);
    this.#presenters.push(taskPresenter);
    this.#taskList.appendChild(taskPresenter.getView());
  }

  removeAllCompleted = () => {
    const newArray = this.#presenters.filter((presenter) => {
      if (presenter.getCheckedState() === true) {
        presenter.getView().remove();
        return false;
      } return true;
    });

    this.#presenters = newArray;
    const removeAllCompleted = new CustomEvent('removeAllCompleted', {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.#view.dispatchEvent(removeAllCompleted);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskListPresenter);


/***/ }),

/***/ "./modules/TaskPresenter.js":
/*!**********************************!*\
  !*** ./modules/TaskPresenter.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_icon_more_vert_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/icon-more-vert.svg */ "./src/icon-more-vert.svg");
/* harmony import */ var _src_icon_check_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/icon-check.svg */ "./src/icon-check.svg");
/* harmony import */ var _src_icon_trash_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/icon-trash.svg */ "./src/icon-trash.svg");




class TaskPresenter {
  #task;

  #view;

  #checkIcon;

  #label;

  #input;

  #moreIcon;

  #changeState;

  constructor(task) {
    this.#changeState = new CustomEvent('changeState', {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.#task = task;
    this.#view = document.createElement('li');
    this.#view.setAttribute('class', 'todo');
    this.#view.setAttribute('draggable', true);

    const div = document.createElement('div');
    div.setAttribute('class', 'desc-cont');
    this.#checkIcon = document.createElement('img');
    this.#checkIcon.addEventListener('click', this.toggleCheckState);
    this.#label = document.createElement('label');
    this.#label.setAttribute('class', 'todo-label');
    this.#label.addEventListener('click', this.editState);
    this.#label.setAttribute('for', `task-${this.#task.index}`);
    div.appendChild(this.#label);
    this.#input = document.createElement('input');
    this.#input.setAttribute('id', `task-${this.#task.index}`);
    this.#input.setAttribute('type', 'text');
    this.#input.setAttribute('class', 'todo-label');
    div.appendChild(this.#input);
    this.#moreIcon = document.createElement('img');

    this.#view.appendChild(this.#checkIcon);
    this.#view.appendChild(div);
    this.#view.appendChild(this.#moreIcon);
    this.showState();
  }

  getView = () => this.#view;

  getCheckedState = () => this.#task.completed;

  removeFromDom = () => {
    const removeTask = new CustomEvent('removeTask', {
      detail: this.#task,
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.#view.dispatchEvent(removeTask);
    this.#view.remove();
  }

  showState = () => {
    this.#view.classList.remove('edit-task');
    this.#input.classList.add('hidden');
    this.#label.classList.remove('hidden');
    this.#checkIcon.setAttribute('class', 'icon-check');
    this.#checkIcon.setAttribute('src', _src_icon_check_svg__WEBPACK_IMPORTED_MODULE_1__);
    this.#view.classList.remove('hidden');
    if (this.#task.completed) this.#checkIcon.classList.add('task-completed');
    else this.#checkIcon.classList.remove('task-completed');

    this.#label.innerText = this.#task.description;
    this.#input.classList.add('hidden');

    this.#moreIcon.setAttribute('class', 'icon-more-vert');
    this.#moreIcon.setAttribute('src', _src_icon_more_vert_svg__WEBPACK_IMPORTED_MODULE_0__);
    this.#moreIcon.removeEventListener('click', this.removeFromDom);
  }

  hiddenState = () => {
    this.#view.classList.remove('hidden');
  }

  editState = () => {
    this.#view.classList.add('edit-task');
    this.#input.classList.remove('hidden');
    this.#label.classList.add('hidden');
    this.#input.setAttribute('value', this.#task.description);
    this.#input.focus();
    this.#input.addEventListener('blur', () => {
      this.#task.description = this.#input.value;
      this.#view.dispatchEvent(this.#changeState);
      this.showState();
    });
    this.#input.addEventListener('keypress', (evt) => {
      if (evt.key === 'Enter') {
        this.#task.description = this.#input.value;
        this.#view.dispatchEvent(this.#changeState);
        this.showState();
      }
    });
    this.#moreIcon.setAttribute('class', 'icon-trash');
    this.#moreIcon.setAttribute('src', _src_icon_trash_svg__WEBPACK_IMPORTED_MODULE_2__);
    this.#moreIcon.addEventListener('click', this.removeFromDom);
  }

  toggleCheckState = () => {
    this.#task.completed = !this.#task.completed;
    this.#checkIcon.classList.toggle('task-completed');
    this.#label.classList.toggle('completed');
    this.#view.dispatchEvent(this.#changeState);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskPresenter);


/***/ }),

/***/ "./modules/TaskRepository.js":
/*!***********************************!*\
  !*** ./modules/TaskRepository.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task.js */ "./modules/Task.js");
/* harmony import */ var _TaskStorage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TaskStorage.js */ "./modules/TaskStorage.js");
/* harmony import */ var _User_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./User.js */ "./modules/User.js");




class TaskRepository {
  #tasks;

  #storage;

  #user;

  constructor(user = null, storageName = null) {
    this.#user = user === null
      ? new _User_js__WEBPACK_IMPORTED_MODULE_2__["default"]('Guess', 'guess')
      : user;
    this.#storage = storageName === null
      ? new _TaskStorage_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.#user, 'default')
      : new _TaskStorage_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.#user, storageName);
    this.#tasks = this.#storage.load();
    this.#user = user;
  }

  updateStorage = () => this.#storage.save(this.#tasks);

  addTask = (description) => {
    const task = new _Task_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.#newIndex(), description);
    this.#tasks.push(task);
    this.#storage.save(this.#tasks);
    return task;
  }

  removeTask = (task) => {
    const newArray = this.#tasks.filter((element) => task !== element);
    this.#tasks = newArray;
    this.#orderIndexs();
    this.#storage.save(this.#tasks);
  }

  allTasks = () => this.#tasks;

  getCompletedCount = () => this.#tasks.filter((task) => task.completed === true).length;

  removeAllCompleted = () => {
    const newArray = this.#tasks.filter((element) => element.completed !== true);
    this.#tasks = newArray;
    this.#orderIndexs();
    this.#storage.save(this.#tasks);
  }

  #orderIndexs = () => {
    this.#tasks.sort((a, b) => a.index - b.index);
    for (let i = 0; i < this.#tasks.length; i += 1) {
      this.#tasks[i].index = i;
    }
  }

  #newIndex = () => this.#tasks.length;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskRepository);


/***/ }),

/***/ "./modules/TaskStorage.js":
/*!********************************!*\
  !*** ./modules/TaskStorage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const DEFAULT_BOOK_STORAGE_KEY = 'sh9bniCUuU';

class TaskStorage {
  #key;

  constructor(user, storage) {
    this.#key = `${DEFAULT_BOOK_STORAGE_KEY}-${user.key}-${storage}`;
  }

  load = () => {
    if (localStorage.getItem(this.#key) === null) return [];
    return JSON.parse(localStorage.getItem(this.#key));
  }

  save = (books) => {
    localStorage.setItem(this.#key, JSON.stringify(books));
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskStorage);


/***/ }),

/***/ "./modules/User.js":
/*!*************************!*\
  !*** ./modules/User.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class User {
  name;

  key;

  constructor(name, key) {
    this.name = name;
    this.key = key;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./icon-enter.png */ "./src/icon-enter.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
  font-family: 'Open Sans', 'Lucida Grande', tahoma, verdana, arial, sans-serif;
  font-size: 1rem;
  font-weight: 200;
}

main {
  position: relative;
  height: 100vh;
}

h1 {
  font-size: 3.5rem;
  text-align: center;
  color: #2e8ae6;
}

form {
  cursor: auto;
}

.changes-count {
  background: red;
  cursor: pointer;
  color: white;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  font-size: 9px;
  min-width: 14px;
  padding: 0 3px;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 0 0 2px white;
}

#new-item {
  width: 100%;
  padding: 0 2.5rem 0 1rem;
  font-style: italic;
  vertical-align: middle;
  border: none;
  outline: none;
  overflow: hidden;
  resize: none;
  display: inline-block;
}

#submit-new-item {
  border: none;
  outline: none;
  display: inline-block;
  appearance: none;
  background-color: transparent;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-repeat: no-repeat;
  background-position: center;
  width: 2.5rem;
  height: 2.6rem;
  cursor: pointer;
}

#list-cont {
  width: 100%;
  max-width: 31.25rem;
  box-sizing: border-box;
  border-radius: 0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background: #f1f2f5;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

form,
.list-header,
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  min-height: 2.5rem;
}

.todo {
  cursor: move;
}

.list-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.desc-cont {
  width: 100%;
  overflow: hidden;
}

.todo-label {
  display: block;
  width: 100%;
  line-height: 1.25rem;
  word-wrap: break-word;
  background: transparent;
  border: none;
  outline: none;
}

.icon-trash,
.icon-arrows-ccw,
.icon-check,
.icon-more-vert {
  color: gray;
  display: block;
  height: 1rem;
  width: 1rem;
  object-fit: contain;
}

.icon-trash {
  height: 1.5rem;
  width: 1.5rem;
}

.icon-check {
  cursor: pointer;
  border: 2px solid gray;
  border-radius: 2px;
}

.clear-all-btn {
  display: block;
  opacity: 0.5;
  margin: 1rem auto;
  border: 0;
  outline: none;
  background-color: transparent;
}

.edit-task {
  background: lightgoldenrodyellow;
}

.task-completed {
  filter: invert(49%) sepia(60%) saturate(2240%) hue-rotate(189deg) brightness(91%) contrast(98%);
  border: none;
}

.completed {
  text-decoration: line-through;
  color: #9d9ea0;
}

.hidden {
  display: none;
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,qBAAqB;EACrB,qBAAqB;EACrB,6EAA6E;EAC7E,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,aAAa;AACf;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,cAAc;AAChB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,eAAe;EACf,eAAe;EACf,YAAY;EACZ,yCAAyC;EACzC,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,kBAAkB;EAClB,2BAA2B;AAC7B;;AAEA;EACE,WAAW;EACX,wBAAwB;EACxB,kBAAkB;EAClB,sBAAsB;EACtB,YAAY;EACZ,aAAa;EACb,gBAAgB;EAChB,YAAY;EACZ,qBAAqB;AACvB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,qBAAqB;EACrB,gBAAgB;EAChB,6BAA6B;EAC7B,yDAAuC;EACvC,4BAA4B;EAC5B,2BAA2B;EAC3B,aAAa;EACb,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,mBAAmB;EACnB,sBAAsB;EACtB,sBAAsB;EACtB,yCAAyC;EACzC,mBAAmB;AACrB;;AAEA;EACE,SAAS;EACT,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,oCAAoC;EACpC,gCAAgC;AAClC;;AAEA;;;EAGE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,SAAS;EACT,eAAe;EACf,sBAAsB;EACtB,4CAA4C;EAC5C,kBAAkB;AACpB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,WAAW;EACX,oBAAoB;EACpB,qBAAqB;EACrB,uBAAuB;EACvB,YAAY;EACZ,aAAa;AACf;;AAEA;;;;EAIE,WAAW;EACX,cAAc;EACd,YAAY;EACZ,WAAW;EACX,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,aAAa;AACf;;AAEA;EACE,eAAe;EACf,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,YAAY;EACZ,iBAAiB;EACjB,SAAS;EACT,aAAa;EACb,6BAA6B;AAC/B;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,+FAA+F;EAC/F,YAAY;AACd;;AAEA;EACE,6BAA6B;EAC7B,cAAc;AAChB;;AAEA;EACE,aAAa;AACf","sourcesContent":["* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  list-style-type: none;\n  text-decoration: none;\n  font-family: 'Open Sans', 'Lucida Grande', tahoma, verdana, arial, sans-serif;\n  font-size: 1rem;\n  font-weight: 200;\n}\n\nmain {\n  position: relative;\n  height: 100vh;\n}\n\nh1 {\n  font-size: 3.5rem;\n  text-align: center;\n  color: #2e8ae6;\n}\n\nform {\n  cursor: auto;\n}\n\n.changes-count {\n  background: red;\n  cursor: pointer;\n  color: white;\n  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n  border-radius: 7px;\n  font-size: 9px;\n  min-width: 14px;\n  padding: 0 3px;\n  font-weight: 600;\n  text-align: center;\n  box-shadow: 0 0 0 2px white;\n}\n\n#new-item {\n  width: 100%;\n  padding: 0 2.5rem 0 1rem;\n  font-style: italic;\n  vertical-align: middle;\n  border: none;\n  outline: none;\n  overflow: hidden;\n  resize: none;\n  display: inline-block;\n}\n\n#submit-new-item {\n  border: none;\n  outline: none;\n  display: inline-block;\n  appearance: none;\n  background-color: transparent;\n  background-image: url(./icon-enter.png);\n  background-repeat: no-repeat;\n  background-position: center;\n  width: 2.5rem;\n  height: 2.6rem;\n  cursor: pointer;\n}\n\n#list-cont {\n  width: 100%;\n  max-width: 31.25rem;\n  box-sizing: border-box;\n  border-radius: 0.25rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n  background: #f1f2f5;\n}\n\n.center {\n  margin: 0;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -ms-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n}\n\nform,\n.list-header,\n.todo {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding: 0 1rem;\n  background-color: #fff;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n  min-height: 2.5rem;\n}\n\n.todo {\n  cursor: move;\n}\n\n.list-stats {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.desc-cont {\n  width: 100%;\n  overflow: hidden;\n}\n\n.todo-label {\n  display: block;\n  width: 100%;\n  line-height: 1.25rem;\n  word-wrap: break-word;\n  background: transparent;\n  border: none;\n  outline: none;\n}\n\n.icon-trash,\n.icon-arrows-ccw,\n.icon-check,\n.icon-more-vert {\n  color: gray;\n  display: block;\n  height: 1rem;\n  width: 1rem;\n  object-fit: contain;\n}\n\n.icon-trash {\n  height: 1.5rem;\n  width: 1.5rem;\n}\n\n.icon-check {\n  cursor: pointer;\n  border: 2px solid gray;\n  border-radius: 2px;\n}\n\n.clear-all-btn {\n  display: block;\n  opacity: 0.5;\n  margin: 1rem auto;\n  border: 0;\n  outline: none;\n  background-color: transparent;\n}\n\n.edit-task {\n  background: lightgoldenrodyellow;\n}\n\n.task-completed {\n  filter: invert(49%) sepia(60%) saturate(2240%) hue-rotate(189deg) brightness(91%) contrast(98%);\n  border: none;\n}\n\n.completed {\n  text-decoration: line-through;\n  color: #9d9ea0;\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_ContainerPresenter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/ContainerPresenter.js */ "./modules/ContainerPresenter.js");



document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main-cont');
  (() => new _modules_ContainerPresenter_js__WEBPACK_IMPORTED_MODULE_1__["default"](main))();
});


/***/ }),

/***/ "./src/icon-arrows-ccw.svg":
/*!*********************************!*\
  !*** ./src/icon-arrows-ccw.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "31d6cfe0d16ae931b73c.svg";

/***/ }),

/***/ "./src/icon-check.svg":
/*!****************************!*\
  !*** ./src/icon-check.svg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "31d6cfe0d16ae931b73c.svg";

/***/ }),

/***/ "./src/icon-enter.png":
/*!****************************!*\
  !*** ./src/icon-enter.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "31d6cfe0d16ae931b73c.png";

/***/ }),

/***/ "./src/icon-more-vert.svg":
/*!********************************!*\
  !*** ./src/icon-more-vert.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "31d6cfe0d16ae931b73c.svg";

/***/ }),

/***/ "./src/icon-trash.svg":
/*!****************************!*\
  !*** ./src/icon-trash.svg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "31d6cfe0d16ae931b73c.svg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG1DQUFtQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLGdGQUFnRixVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFB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O0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNicUI7QUFDNkM7O0FBRWxFO0FBQ0E7QUFDQSxhQUFhLHNFQUFrQjtBQUMvQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQ0hFQ0tMSVNULy4vbW9kdWxlcy9Db250YWluZXJQcmVzZW50ZXIuanMiLCJ3ZWJwYWNrOi8vQ0hFQ0tMSVNULy4vbW9kdWxlcy9UYXNrLmpzIiwid2VicGFjazovL0NIRUNLTElTVC8uL21vZHVsZXMvVGFza0Zvcm1QcmVzZW50ZXIuanMiLCJ3ZWJwYWNrOi8vQ0hFQ0tMSVNULy4vbW9kdWxlcy9UYXNrTGlzdEhlYWRlclByZXNlbnRlci5qcyIsIndlYnBhY2s6Ly9DSEVDS0xJU1QvLi9tb2R1bGVzL1Rhc2tMaXN0UHJlc2VudGVyLmpzIiwid2VicGFjazovL0NIRUNLTElTVC8uL21vZHVsZXMvVGFza1ByZXNlbnRlci5qcyIsIndlYnBhY2s6Ly9DSEVDS0xJU1QvLi9tb2R1bGVzL1Rhc2tSZXBvc2l0b3J5LmpzIiwid2VicGFjazovL0NIRUNLTElTVC8uL21vZHVsZXMvVGFza1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vQ0hFQ0tMSVNULy4vbW9kdWxlcy9Vc2VyLmpzIiwid2VicGFjazovL0NIRUNLTElTVC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vQ0hFQ0tMSVNULy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9DSEVDS0xJU1QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL0NIRUNLTElTVC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL0NIRUNLTElTVC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9DSEVDS0xJU1QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vQ0hFQ0tMSVNULy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9DSEVDS0xJU1QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vQ0hFQ0tMSVNULy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL0NIRUNLTElTVC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL0NIRUNLTElTVC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL0NIRUNLTElTVC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFza0Zvcm1QcmVzZW50ZXIgZnJvbSAnLi9UYXNrRm9ybVByZXNlbnRlci5qcyc7XG5pbXBvcnQgVGFza0xpc3RQcmVzZW50ZXIgZnJvbSAnLi9UYXNrTGlzdFByZXNlbnRlci5qcyc7XG5pbXBvcnQgVGFza1JlcG9zaXRvcnkgZnJvbSAnLi9UYXNrUmVwb3NpdG9yeS5qcyc7XG5pbXBvcnQgVGFza0xpc3RIZWFkZXJQcmVzZW50ZXIgZnJvbSAnLi9UYXNrTGlzdEhlYWRlclByZXNlbnRlci5qcyc7XG5cbmNsYXNzIENvbnRhaW5lclByZXNlbnRlciB7XG4gICN0YXNrUmVwb3NpdG9yeTtcblxuICAjcGFyZW50O1xuXG4gICNoZWFkZXI7XG5cbiAgI2Zvcm07XG5cbiAgI3Rhc2tMaXN0O1xuXG4gICN2aWV3O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudCwgdGFza1JlcG9zaXRvcnkgPSBudWxsKSB7XG4gICAgdGhpcy4jcGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuI3Rhc2tSZXBvc2l0b3J5ID0gdGFza1JlcG9zaXRvcnkgPT09IG51bGxcbiAgICAgID8gbmV3IFRhc2tSZXBvc2l0b3J5KClcbiAgICAgIDogdGFza1JlcG9zaXRvcnk7XG4gICAgdGhpcy4jdmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICB0aGlzLiN2aWV3LnNldEF0dHJpYnV0ZSgnaWQnLCAnbGlzdC1jb250Jyk7XG4gICAgdGhpcy4jdmlldy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NlbnRlcicpO1xuICAgIHRoaXMuI3ZpZXcuYWRkRXZlbnRMaXN0ZW5lcignbmV3VGFzaycsIHRoaXMuI25ld1Rhc2spO1xuICAgIHRoaXMuI3ZpZXcuYWRkRXZlbnRMaXN0ZW5lcigncmVtb3ZlQWxsQ29tcGxldGVkJywgdGhpcy4jcmVtb3ZlQWxsQ29tcGxldGVkKTtcbiAgICB0aGlzLiN2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ3JlbW92ZVRhc2snLCB0aGlzLiNyZW1vdmVUYXNrKTtcbiAgICB0aGlzLiN2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZVN0YXRlJywgdGhpcy4jY2hhbmdlU3RhdGUpO1xuICAgIHRoaXMuI2hlYWRlciA9IG5ldyBUYXNrTGlzdEhlYWRlclByZXNlbnRlcigpO1xuICAgIHRoaXMuI2hlYWRlci5zZXRDb21wbGV0ZWRDb3VudCh0aGlzLiN0YXNrUmVwb3NpdG9yeS5nZXRDb21wbGV0ZWRDb3VudCgpKTtcbiAgICB0aGlzLiN2aWV3LmFwcGVuZENoaWxkKHRoaXMuI2hlYWRlci5nZXRWaWV3KCkpO1xuICAgIHRoaXMuI2Zvcm0gPSBuZXcgVGFza0Zvcm1QcmVzZW50ZXIoKTtcbiAgICB0aGlzLiN2aWV3LmFwcGVuZENoaWxkKHRoaXMuI2Zvcm0uZ2V0VmlldygpKTtcbiAgICB0aGlzLiN0YXNrTGlzdCA9IG5ldyBUYXNrTGlzdFByZXNlbnRlcih0aGlzLiN0YXNrUmVwb3NpdG9yeSk7XG4gICAgdGhpcy4jdmlldy5hcHBlbmRDaGlsZCh0aGlzLiN0YXNrTGlzdC5nZXRWaWV3KCkpO1xuICAgIHRoaXMuI3BhcmVudC5hcHBlbmRDaGlsZCh0aGlzLiN2aWV3KTtcbiAgfVxuXG4gICNjaGFuZ2VTdGF0ZSA9ICgpID0+IHtcbiAgICB0aGlzLiN0YXNrUmVwb3NpdG9yeS51cGRhdGVTdG9yYWdlKCk7XG4gICAgdGhpcy4jaGVhZGVyLnNldENvbXBsZXRlZENvdW50KHRoaXMuI3Rhc2tSZXBvc2l0b3J5LmdldENvbXBsZXRlZENvdW50KCkpO1xuICB9XG5cbiAgI25ld1Rhc2sgPSAoZXZ0KSA9PiB7XG4gICAgY29uc3QgbmV3VGFzayA9IHRoaXMuI3Rhc2tSZXBvc2l0b3J5LmFkZFRhc2soZXZ0LmRldGFpbCk7XG4gICAgdGhpcy4jdGFza0xpc3QuYWRkVGFza1ZpZXcobmV3VGFzayk7XG4gIH1cblxuICAjcmVtb3ZlVGFzayA9IChldnQpID0+IHtcbiAgICB0aGlzLiN0YXNrUmVwb3NpdG9yeS5yZW1vdmVUYXNrKGV2dC5kZXRhaWwpO1xuICAgIHRoaXMuI2hlYWRlci5zZXRDb21wbGV0ZWRDb3VudCh0aGlzLiN0YXNrUmVwb3NpdG9yeS5nZXRDb21wbGV0ZWRDb3VudCgpKTtcbiAgfVxuXG4gICNyZW1vdmVBbGxDb21wbGV0ZWQgPSAoKSA9PiB7XG4gICAgdGhpcy4jdGFza1JlcG9zaXRvcnkucmVtb3ZlQWxsQ29tcGxldGVkKCk7XG4gICAgdGhpcy4jaGVhZGVyLnNldENvbXBsZXRlZENvdW50KHRoaXMuI3Rhc2tSZXBvc2l0b3J5LmdldENvbXBsZXRlZENvdW50KCkpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBDb250YWluZXJQcmVzZW50ZXI7XG4iLCJjbGFzcyBUYXNrIHtcbiAgaW5kZXg7XG5cbiAgZGVzY3JpcHRpb247XG5cbiAgY29tcGxldGVkO1xuXG4gIGNvbnN0cnVjdG9yKGluZGV4LCBkZXNjcmlwdGlvbiwgY29tcGxldGVkID0gZmFsc2UpIHtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7XG4iLCJjbGFzcyBUYXNrRm9ybVByZXNlbnRlciB7XG4gICNpbnB1dDtcblxuICAjc3VibWl0O1xuXG4gICN2aWV3O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuI3ZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgdGhpcy4jaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuI2lucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCAnQWRkIHRvIHlvdXIgbGlzdC4uLicpO1xuICAgIHRoaXMuI2lucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV3LWl0ZW0nKTtcbiAgICB0aGlzLiNpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgIHRoaXMuI3ZpZXcuYXBwZW5kQ2hpbGQodGhpcy4jaW5wdXQpO1xuICAgIHRoaXMuI3N1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy4jc3VibWl0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbi1yZXR1cm4nKTtcbiAgICB0aGlzLiNzdWJtaXQuc2V0QXR0cmlidXRlKCdpZCcsICdzdWJtaXQtbmV3LWl0ZW0nKTtcbiAgICB0aGlzLiNzdWJtaXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgIHRoaXMuI3N1Ym1pdC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJycpO1xuICAgIHRoaXMuI3N1Ym1pdC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ2NsaWNrIHRoaXMgb3IgcHJlc3MgZW50ZXIgdG8gc3VibWl0Jyk7XG4gICAgdGhpcy4jdmlldy5hcHBlbmRDaGlsZCh0aGlzLiNzdWJtaXQpO1xuICAgIHRoaXMuI3ZpZXcuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy4jc3VibWl0VGFzayk7XG4gIH1cblxuICBnZXRWaWV3ID0gKCkgPT4gdGhpcy4jdmlldztcblxuICBjbGVhbkZvcm0gPSAoKSA9PiB7XG4gICAgdGhpcy4jaW5wdXQudmFsdWUgPSAnJztcbiAgfVxuXG4gICNzdWJtaXRUYXNrID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgQ3VzdG9tRXZlbnQoJ25ld1Rhc2snLCB7XG4gICAgICBkZXRhaWw6IHRoaXMuI2lucHV0LnZhbHVlLFxuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICB9KTtcbiAgICB0aGlzLiN2aWV3LmRpc3BhdGNoRXZlbnQobmV3VGFzayk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFRhc2tGb3JtUHJlc2VudGVyO1xuIiwiaW1wb3J0IGljb25BcnJvd3NDY3cgZnJvbSAnLi4vc3JjL2ljb24tYXJyb3dzLWNjdy5zdmcnO1xuXG5jbGFzcyBUYXNrTGlzdEhlYWRlclByZXNlbnRlciB7XG4gICNjb21wbGV0ZWRDb3VudDtcblxuICAjbGlzdFN0YXRzO1xuXG4gICN2aWV3O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuI3ZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLiN2aWV3LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGlzdC1oZWFkZXInKTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgdGl0bGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdsaXN0LWhlYWRlcicpO1xuICAgIHRpdGxlLmlubmVyVGV4dCA9ICdEZW1vJztcbiAgICB0aGlzLiN2aWV3LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICB0aGlzLiNsaXN0U3RhdHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLiNsaXN0U3RhdHMuc2V0QXR0cmlidXRlKCdjbGFzcycsICdsaXN0LXN0YXRzJyk7XG4gICAgdGhpcy4jdmlldy5hcHBlbmRDaGlsZCh0aGlzLiNsaXN0U3RhdHMpO1xuICAgIHRoaXMuI2NvbXBsZXRlZENvdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRoaXMuI2NvbXBsZXRlZENvdW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2hhbmdlcy1jb3VudCcpO1xuICAgIHRoaXMuI2xpc3RTdGF0cy5hcHBlbmRDaGlsZCh0aGlzLiNjb21wbGV0ZWRDb3VudCk7XG4gICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uLWFycm93cy1jY3cnKTtcbiAgICBpY29uLnNldEF0dHJpYnV0ZSgnc3JjJywgaWNvbkFycm93c0Njdyk7XG4gICAgdGhpcy4jbGlzdFN0YXRzLmFwcGVuZENoaWxkKGljb24pO1xuICB9XG5cbiAgZ2V0VmlldyA9ICgpID0+IHRoaXMuI3ZpZXc7XG5cbiAgc2V0Q29tcGxldGVkQ291bnQgPSAoY291bnQpID0+IHtcbiAgICB0aGlzLiNjb21wbGV0ZWRDb3VudC5pbm5lclRleHQgPSBjb3VudDtcbiAgICBpZiAoY291bnQgPT09IDApIHRoaXMuI2NvbXBsZXRlZENvdW50LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIGVsc2UgdGhpcy4jY29tcGxldGVkQ291bnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFRhc2tMaXN0SGVhZGVyUHJlc2VudGVyO1xuIiwiaW1wb3J0IFRhc2tQcmVzZW50ZXIgZnJvbSAnLi9UYXNrUHJlc2VudGVyLmpzJztcblxuY2xhc3MgVGFza0xpc3RQcmVzZW50ZXIge1xuICAjcHJlc2VudGVycztcblxuICAjdGFza0xpc3Q7XG5cbiAgI2NsZWFyQWxsQnRuO1xuXG4gICN2aWV3O1xuXG4gIGNvbnN0cnVjdG9yKHRhc2tSZXBvc2l0b3J5KSB7XG4gICAgdGhpcy4jcHJlc2VudGVycyA9IFtdO1xuXG4gICAgdGhpcy4jdmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuI3Rhc2tMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLiN0YXNrTGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xpc3QnKTtcbiAgICBjb25zdCB0YXNrcyA9IHRhc2tSZXBvc2l0b3J5LmFsbFRhc2tzKCk7XG5cbiAgICBpZiAodGFza3MgIT09IG51bGwpIHtcbiAgICAgIHRhc2tzLmZvckVhY2goKHRhc2spID0+IHRoaXMuYWRkVGFza1ZpZXcodGFzaykpO1xuICAgIH1cblxuICAgIHRoaXMuI3ZpZXcuYXBwZW5kQ2hpbGQodGhpcy4jdGFza0xpc3QpO1xuICAgIHRoaXMuI2NsZWFyQWxsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdGhpcy4jY2xlYXJBbGxCdG4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIHRoaXMuI2NsZWFyQWxsQnRuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2xlYXItYWxsLWJ0bicpO1xuICAgIHRoaXMuI2NsZWFyQWxsQnRuLmlubmVyVGV4dCA9ICdDbGVhciBhbGwgY29tcGxldGVkJztcbiAgICB0aGlzLiNjbGVhckFsbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVtb3ZlQWxsQ29tcGxldGVkKTtcbiAgICB0aGlzLiN2aWV3LmFwcGVuZENoaWxkKHRoaXMuI2NsZWFyQWxsQnRuKTtcbiAgfVxuXG4gIGdldFZpZXcgPSAoKSA9PiB0aGlzLiN2aWV3O1xuXG4gIGFkZFRhc2tWaWV3ID0gKHRhc2spID0+IHtcbiAgICBjb25zdCB0YXNrUHJlc2VudGVyID0gbmV3IFRhc2tQcmVzZW50ZXIodGFzayk7XG4gICAgdGhpcy4jcHJlc2VudGVycy5wdXNoKHRhc2tQcmVzZW50ZXIpO1xuICAgIHRoaXMuI3Rhc2tMaXN0LmFwcGVuZENoaWxkKHRhc2tQcmVzZW50ZXIuZ2V0VmlldygpKTtcbiAgfVxuXG4gIHJlbW92ZUFsbENvbXBsZXRlZCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdBcnJheSA9IHRoaXMuI3ByZXNlbnRlcnMuZmlsdGVyKChwcmVzZW50ZXIpID0+IHtcbiAgICAgIGlmIChwcmVzZW50ZXIuZ2V0Q2hlY2tlZFN0YXRlKCkgPT09IHRydWUpIHtcbiAgICAgICAgcHJlc2VudGVyLmdldFZpZXcoKS5yZW1vdmUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHRoaXMuI3ByZXNlbnRlcnMgPSBuZXdBcnJheTtcbiAgICBjb25zdCByZW1vdmVBbGxDb21wbGV0ZWQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3JlbW92ZUFsbENvbXBsZXRlZCcsIHtcbiAgICAgIGRldGFpbDoge30sXG4gICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgIH0pO1xuICAgIHRoaXMuI3ZpZXcuZGlzcGF0Y2hFdmVudChyZW1vdmVBbGxDb21wbGV0ZWQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2tMaXN0UHJlc2VudGVyO1xuIiwiaW1wb3J0IGljb25Nb3JlVmVydCBmcm9tICcuLi9zcmMvaWNvbi1tb3JlLXZlcnQuc3ZnJztcbmltcG9ydCBpY29uQ2hlY2sgZnJvbSAnLi4vc3JjL2ljb24tY2hlY2suc3ZnJztcbmltcG9ydCBpY29uVHJhc2ggZnJvbSAnLi4vc3JjL2ljb24tdHJhc2guc3ZnJztcblxuY2xhc3MgVGFza1ByZXNlbnRlciB7XG4gICN0YXNrO1xuXG4gICN2aWV3O1xuXG4gICNjaGVja0ljb247XG5cbiAgI2xhYmVsO1xuXG4gICNpbnB1dDtcblxuICAjbW9yZUljb247XG5cbiAgI2NoYW5nZVN0YXRlO1xuXG4gIGNvbnN0cnVjdG9yKHRhc2spIHtcbiAgICB0aGlzLiNjaGFuZ2VTdGF0ZSA9IG5ldyBDdXN0b21FdmVudCgnY2hhbmdlU3RhdGUnLCB7XG4gICAgICBkZXRhaWw6IHt9LFxuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICB9KTtcbiAgICB0aGlzLiN0YXNrID0gdGFzaztcbiAgICB0aGlzLiN2aWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0aGlzLiN2aWV3LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndG9kbycpO1xuICAgIHRoaXMuI3ZpZXcuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCB0cnVlKTtcblxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Rlc2MtY29udCcpO1xuICAgIHRoaXMuI2NoZWNrSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHRoaXMuI2NoZWNrSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlQ2hlY2tTdGF0ZSk7XG4gICAgdGhpcy4jbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuI2xhYmVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndG9kby1sYWJlbCcpO1xuICAgIHRoaXMuI2xhYmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5lZGl0U3RhdGUpO1xuICAgIHRoaXMuI2xhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgYHRhc2stJHt0aGlzLiN0YXNrLmluZGV4fWApO1xuICAgIGRpdi5hcHBlbmRDaGlsZCh0aGlzLiNsYWJlbCk7XG4gICAgdGhpcy4jaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuI2lucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCBgdGFzay0ke3RoaXMuI3Rhc2suaW5kZXh9YCk7XG4gICAgdGhpcy4jaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICB0aGlzLiNpbnB1dC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3RvZG8tbGFiZWwnKTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQodGhpcy4jaW5wdXQpO1xuICAgIHRoaXMuI21vcmVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICB0aGlzLiN2aWV3LmFwcGVuZENoaWxkKHRoaXMuI2NoZWNrSWNvbik7XG4gICAgdGhpcy4jdmlldy5hcHBlbmRDaGlsZChkaXYpO1xuICAgIHRoaXMuI3ZpZXcuYXBwZW5kQ2hpbGQodGhpcy4jbW9yZUljb24pO1xuICAgIHRoaXMuc2hvd1N0YXRlKCk7XG4gIH1cblxuICBnZXRWaWV3ID0gKCkgPT4gdGhpcy4jdmlldztcblxuICBnZXRDaGVja2VkU3RhdGUgPSAoKSA9PiB0aGlzLiN0YXNrLmNvbXBsZXRlZDtcblxuICByZW1vdmVGcm9tRG9tID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlbW92ZVRhc2sgPSBuZXcgQ3VzdG9tRXZlbnQoJ3JlbW92ZVRhc2snLCB7XG4gICAgICBkZXRhaWw6IHRoaXMuI3Rhc2ssXG4gICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgIH0pO1xuICAgIHRoaXMuI3ZpZXcuZGlzcGF0Y2hFdmVudChyZW1vdmVUYXNrKTtcbiAgICB0aGlzLiN2aWV3LnJlbW92ZSgpO1xuICB9XG5cbiAgc2hvd1N0YXRlID0gKCkgPT4ge1xuICAgIHRoaXMuI3ZpZXcuY2xhc3NMaXN0LnJlbW92ZSgnZWRpdC10YXNrJyk7XG4gICAgdGhpcy4jaW5wdXQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgdGhpcy4jbGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgdGhpcy4jY2hlY2tJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbi1jaGVjaycpO1xuICAgIHRoaXMuI2NoZWNrSWNvbi5zZXRBdHRyaWJ1dGUoJ3NyYycsIGljb25DaGVjayk7XG4gICAgdGhpcy4jdmlldy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICBpZiAodGhpcy4jdGFzay5jb21wbGV0ZWQpIHRoaXMuI2NoZWNrSWNvbi5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbXBsZXRlZCcpO1xuICAgIGVsc2UgdGhpcy4jY2hlY2tJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ3Rhc2stY29tcGxldGVkJyk7XG5cbiAgICB0aGlzLiNsYWJlbC5pbm5lclRleHQgPSB0aGlzLiN0YXNrLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuI2lucHV0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuXG4gICAgdGhpcy4jbW9yZUljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uLW1vcmUtdmVydCcpO1xuICAgIHRoaXMuI21vcmVJY29uLnNldEF0dHJpYnV0ZSgnc3JjJywgaWNvbk1vcmVWZXJ0KTtcbiAgICB0aGlzLiNtb3JlSWNvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVtb3ZlRnJvbURvbSk7XG4gIH1cblxuICBoaWRkZW5TdGF0ZSA9ICgpID0+IHtcbiAgICB0aGlzLiN2aWV3LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICB9XG5cbiAgZWRpdFN0YXRlID0gKCkgPT4ge1xuICAgIHRoaXMuI3ZpZXcuY2xhc3NMaXN0LmFkZCgnZWRpdC10YXNrJyk7XG4gICAgdGhpcy4jaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgdGhpcy4jbGFiZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgdGhpcy4jaW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHRoaXMuI3Rhc2suZGVzY3JpcHRpb24pO1xuICAgIHRoaXMuI2lucHV0LmZvY3VzKCk7XG4gICAgdGhpcy4jaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcbiAgICAgIHRoaXMuI3Rhc2suZGVzY3JpcHRpb24gPSB0aGlzLiNpbnB1dC52YWx1ZTtcbiAgICAgIHRoaXMuI3ZpZXcuZGlzcGF0Y2hFdmVudCh0aGlzLiNjaGFuZ2VTdGF0ZSk7XG4gICAgICB0aGlzLnNob3dTdGF0ZSgpO1xuICAgIH0pO1xuICAgIHRoaXMuI2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGV2dCkgPT4ge1xuICAgICAgaWYgKGV2dC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgdGhpcy4jdGFzay5kZXNjcmlwdGlvbiA9IHRoaXMuI2lucHV0LnZhbHVlO1xuICAgICAgICB0aGlzLiN2aWV3LmRpc3BhdGNoRXZlbnQodGhpcy4jY2hhbmdlU3RhdGUpO1xuICAgICAgICB0aGlzLnNob3dTdGF0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuI21vcmVJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbi10cmFzaCcpO1xuICAgIHRoaXMuI21vcmVJY29uLnNldEF0dHJpYnV0ZSgnc3JjJywgaWNvblRyYXNoKTtcbiAgICB0aGlzLiNtb3JlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVtb3ZlRnJvbURvbSk7XG4gIH1cblxuICB0b2dnbGVDaGVja1N0YXRlID0gKCkgPT4ge1xuICAgIHRoaXMuI3Rhc2suY29tcGxldGVkID0gIXRoaXMuI3Rhc2suY29tcGxldGVkO1xuICAgIHRoaXMuI2NoZWNrSWNvbi5jbGFzc0xpc3QudG9nZ2xlKCd0YXNrLWNvbXBsZXRlZCcpO1xuICAgIHRoaXMuI2xhYmVsLmNsYXNzTGlzdC50b2dnbGUoJ2NvbXBsZXRlZCcpO1xuICAgIHRoaXMuI3ZpZXcuZGlzcGF0Y2hFdmVudCh0aGlzLiNjaGFuZ2VTdGF0ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFza1ByZXNlbnRlcjtcbiIsImltcG9ydCBUYXNrIGZyb20gJy4vVGFzay5qcyc7XG5pbXBvcnQgVGFza1N0b3JhZ2UgZnJvbSAnLi9UYXNrU3RvcmFnZS5qcyc7XG5pbXBvcnQgVXNlciBmcm9tICcuL1VzZXIuanMnO1xuXG5jbGFzcyBUYXNrUmVwb3NpdG9yeSB7XG4gICN0YXNrcztcblxuICAjc3RvcmFnZTtcblxuICAjdXNlcjtcblxuICBjb25zdHJ1Y3Rvcih1c2VyID0gbnVsbCwgc3RvcmFnZU5hbWUgPSBudWxsKSB7XG4gICAgdGhpcy4jdXNlciA9IHVzZXIgPT09IG51bGxcbiAgICAgID8gbmV3IFVzZXIoJ0d1ZXNzJywgJ2d1ZXNzJylcbiAgICAgIDogdXNlcjtcbiAgICB0aGlzLiNzdG9yYWdlID0gc3RvcmFnZU5hbWUgPT09IG51bGxcbiAgICAgID8gbmV3IFRhc2tTdG9yYWdlKHRoaXMuI3VzZXIsICdkZWZhdWx0JylcbiAgICAgIDogbmV3IFRhc2tTdG9yYWdlKHRoaXMuI3VzZXIsIHN0b3JhZ2VOYW1lKTtcbiAgICB0aGlzLiN0YXNrcyA9IHRoaXMuI3N0b3JhZ2UubG9hZCgpO1xuICAgIHRoaXMuI3VzZXIgPSB1c2VyO1xuICB9XG5cbiAgdXBkYXRlU3RvcmFnZSA9ICgpID0+IHRoaXMuI3N0b3JhZ2Uuc2F2ZSh0aGlzLiN0YXNrcyk7XG5cbiAgYWRkVGFzayA9IChkZXNjcmlwdGlvbikgPT4ge1xuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayh0aGlzLiNuZXdJbmRleCgpLCBkZXNjcmlwdGlvbik7XG4gICAgdGhpcy4jdGFza3MucHVzaCh0YXNrKTtcbiAgICB0aGlzLiNzdG9yYWdlLnNhdmUodGhpcy4jdGFza3MpO1xuICAgIHJldHVybiB0YXNrO1xuICB9XG5cbiAgcmVtb3ZlVGFzayA9ICh0YXNrKSA9PiB7XG4gICAgY29uc3QgbmV3QXJyYXkgPSB0aGlzLiN0YXNrcy5maWx0ZXIoKGVsZW1lbnQpID0+IHRhc2sgIT09IGVsZW1lbnQpO1xuICAgIHRoaXMuI3Rhc2tzID0gbmV3QXJyYXk7XG4gICAgdGhpcy4jb3JkZXJJbmRleHMoKTtcbiAgICB0aGlzLiNzdG9yYWdlLnNhdmUodGhpcy4jdGFza3MpO1xuICB9XG5cbiAgYWxsVGFza3MgPSAoKSA9PiB0aGlzLiN0YXNrcztcblxuICBnZXRDb21wbGV0ZWRDb3VudCA9ICgpID0+IHRoaXMuI3Rhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5jb21wbGV0ZWQgPT09IHRydWUpLmxlbmd0aDtcblxuICByZW1vdmVBbGxDb21wbGV0ZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3QXJyYXkgPSB0aGlzLiN0YXNrcy5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQuY29tcGxldGVkICE9PSB0cnVlKTtcbiAgICB0aGlzLiN0YXNrcyA9IG5ld0FycmF5O1xuICAgIHRoaXMuI29yZGVySW5kZXhzKCk7XG4gICAgdGhpcy4jc3RvcmFnZS5zYXZlKHRoaXMuI3Rhc2tzKTtcbiAgfVxuXG4gICNvcmRlckluZGV4cyA9ICgpID0+IHtcbiAgICB0aGlzLiN0YXNrcy5zb3J0KChhLCBiKSA9PiBhLmluZGV4IC0gYi5pbmRleCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLiN0YXNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdGhpcy4jdGFza3NbaV0uaW5kZXggPSBpO1xuICAgIH1cbiAgfVxuXG4gICNuZXdJbmRleCA9ICgpID0+IHRoaXMuI3Rhc2tzLmxlbmd0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFza1JlcG9zaXRvcnk7XG4iLCJjb25zdCBERUZBVUxUX0JPT0tfU1RPUkFHRV9LRVkgPSAnc2g5Ym5pQ1V1VSc7XG5cbmNsYXNzIFRhc2tTdG9yYWdlIHtcbiAgI2tleTtcblxuICBjb25zdHJ1Y3Rvcih1c2VyLCBzdG9yYWdlKSB7XG4gICAgdGhpcy4ja2V5ID0gYCR7REVGQVVMVF9CT09LX1NUT1JBR0VfS0VZfS0ke3VzZXIua2V5fS0ke3N0b3JhZ2V9YDtcbiAgfVxuXG4gIGxvYWQgPSAoKSA9PiB7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuI2tleSkgPT09IG51bGwpIHJldHVybiBbXTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLiNrZXkpKTtcbiAgfVxuXG4gIHNhdmUgPSAoYm9va3MpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLiNrZXksIEpTT04uc3RyaW5naWZ5KGJvb2tzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFza1N0b3JhZ2U7XG4iLCJjbGFzcyBVc2VyIHtcbiAgbmFtZTtcblxuICBrZXk7XG5cbiAgY29uc3RydWN0b3IobmFtZSwga2V5KSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmtleSA9IGtleTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVc2VyO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vaWNvbi1lbnRlci5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBmb250LWZhbWlseTogJ09wZW4gU2FucycsICdMdWNpZGEgR3JhbmRlJywgdGFob21hLCB2ZXJkYW5hLCBhcmlhbCwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBmb250LXdlaWdodDogMjAwO1xufVxuXG5tYWluIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDEwMHZoO1xufVxuXG5oMSB7XG4gIGZvbnQtc2l6ZTogMy41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAjMmU4YWU2O1xufVxuXG5mb3JtIHtcbiAgY3Vyc29yOiBhdXRvO1xufVxuXG4uY2hhbmdlcy1jb3VudCB7XG4gIGJhY2tncm91bmQ6IHJlZDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtc2hhZG93OiAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICBib3JkZXItcmFkaXVzOiA3cHg7XG4gIGZvbnQtc2l6ZTogOXB4O1xuICBtaW4td2lkdGg6IDE0cHg7XG4gIHBhZGRpbmc6IDAgM3B4O1xuICBmb250LXdlaWdodDogNjAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDJweCB3aGl0ZTtcbn1cblxuI25ldy1pdGVtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDAgMi41cmVtIDAgMXJlbTtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHJlc2l6ZTogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4jc3VibWl0LW5ldy1pdGVtIHtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgd2lkdGg6IDIuNXJlbTtcbiAgaGVpZ2h0OiAyLjZyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuI2xpc3QtY29udCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDMxLjI1cmVtO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbiAgYmFja2dyb3VuZDogI2YxZjJmNTtcbn1cblxuLmNlbnRlciB7XG4gIG1hcmdpbjogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNTAlO1xuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xufVxuXG5mb3JtLFxuLmxpc3QtaGVhZGVyLFxuLnRvZG8ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMXJlbTtcbiAgcGFkZGluZzogMCAxcmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA4KTtcbiAgbWluLWhlaWdodDogMi41cmVtO1xufVxuXG4udG9kbyB7XG4gIGN1cnNvcjogbW92ZTtcbn1cblxuLmxpc3Qtc3RhdHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uZGVzYy1jb250IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi50b2RvLWxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4uaWNvbi10cmFzaCxcbi5pY29uLWFycm93cy1jY3csXG4uaWNvbi1jaGVjayxcbi5pY29uLW1vcmUtdmVydCB7XG4gIGNvbG9yOiBncmF5O1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiAxcmVtO1xuICB3aWR0aDogMXJlbTtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbn1cblxuLmljb24tdHJhc2gge1xuICBoZWlnaHQ6IDEuNXJlbTtcbiAgd2lkdGg6IDEuNXJlbTtcbn1cblxuLmljb24tY2hlY2sge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cblxuLmNsZWFyLWFsbC1idG4ge1xuICBkaXNwbGF5OiBibG9jaztcbiAgb3BhY2l0eTogMC41O1xuICBtYXJnaW46IDFyZW0gYXV0bztcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmVkaXQtdGFzayB7XG4gIGJhY2tncm91bmQ6IGxpZ2h0Z29sZGVucm9keWVsbG93O1xufVxuXG4udGFzay1jb21wbGV0ZWQge1xuICBmaWx0ZXI6IGludmVydCg0OSUpIHNlcGlhKDYwJSkgc2F0dXJhdGUoMjI0MCUpIGh1ZS1yb3RhdGUoMTg5ZGVnKSBicmlnaHRuZXNzKDkxJSkgY29udHJhc3QoOTglKTtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4uY29tcGxldGVkIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XG4gIGNvbG9yOiAjOWQ5ZWEwO1xufVxuXG4uaGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysc0JBQXNCO0VBQ3RCLHFCQUFxQjtFQUNyQixxQkFBcUI7RUFDckIsNkVBQTZFO0VBQzdFLGVBQWU7RUFDZixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGVBQWU7RUFDZixZQUFZO0VBQ1oseUNBQXlDO0VBQ3pDLGtCQUFrQjtFQUNsQixjQUFjO0VBQ2QsZUFBZTtFQUNmLGNBQWM7RUFDZCxnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCx3QkFBd0I7RUFDeEIsa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1oscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLDZCQUE2QjtFQUM3Qix5REFBdUM7RUFDdkMsNEJBQTRCO0VBQzVCLDJCQUEyQjtFQUMzQixhQUFhO0VBQ2IsY0FBYztFQUNkLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixzQkFBc0I7RUFDdEIseUNBQXlDO0VBQ3pDLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLFNBQVM7RUFDVCxvQ0FBb0M7RUFDcEMsZ0NBQWdDO0FBQ2xDOztBQUVBOzs7RUFHRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixTQUFTO0VBQ1QsZUFBZTtFQUNmLHNCQUFzQjtFQUN0Qiw0Q0FBNEM7RUFDNUMsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsY0FBYztFQUNkLFdBQVc7RUFDWCxvQkFBb0I7RUFDcEIscUJBQXFCO0VBQ3JCLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBOzs7O0VBSUUsV0FBVztFQUNYLGNBQWM7RUFDZCxZQUFZO0VBQ1osV0FBVztFQUNYLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysc0JBQXNCO0VBQ3RCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLFNBQVM7RUFDVCxhQUFhO0VBQ2IsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0UsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0UsK0ZBQStGO0VBQy9GLFlBQVk7QUFDZDs7QUFFQTtFQUNFLDZCQUE2QjtFQUM3QixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBmb250LWZhbWlseTogJ09wZW4gU2FucycsICdMdWNpZGEgR3JhbmRlJywgdGFob21hLCB2ZXJkYW5hLCBhcmlhbCwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiAyMDA7XFxufVxcblxcbm1haW4ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuaDEge1xcbiAgZm9udC1zaXplOiAzLjVyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzJlOGFlNjtcXG59XFxuXFxuZm9ybSB7XFxuICBjdXJzb3I6IGF1dG87XFxufVxcblxcbi5jaGFuZ2VzLWNvdW50IHtcXG4gIGJhY2tncm91bmQ6IHJlZDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtc2hhZG93OiAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYm9yZGVyLXJhZGl1czogN3B4O1xcbiAgZm9udC1zaXplOiA5cHg7XFxuICBtaW4td2lkdGg6IDE0cHg7XFxuICBwYWRkaW5nOiAwIDNweDtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3gtc2hhZG93OiAwIDAgMCAycHggd2hpdGU7XFxufVxcblxcbiNuZXctaXRlbSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDAgMi41cmVtIDAgMXJlbTtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHJlc2l6ZTogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuXFxuI3N1Ym1pdC1uZXctaXRlbSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaWNvbi1lbnRlci5wbmcpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gIHdpZHRoOiAyLjVyZW07XFxuICBoZWlnaHQ6IDIuNnJlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI2xpc3QtY29udCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1heC13aWR0aDogMzEuMjVyZW07XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTtcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xcbiAgYmFja2dyb3VuZDogI2YxZjJmNTtcXG59XFxuXFxuLmNlbnRlciB7XFxuICBtYXJnaW46IDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbn1cXG5cXG5mb3JtLFxcbi5saXN0LWhlYWRlcixcXG4udG9kbyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMXJlbTtcXG4gIHBhZGRpbmc6IDAgMXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA4KTtcXG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcXG59XFxuXFxuLnRvZG8ge1xcbiAgY3Vyc29yOiBtb3ZlO1xcbn1cXG5cXG4ubGlzdC1zdGF0cyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5kZXNjLWNvbnQge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4udG9kby1sYWJlbCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XFxuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbi5pY29uLXRyYXNoLFxcbi5pY29uLWFycm93cy1jY3csXFxuLmljb24tY2hlY2ssXFxuLmljb24tbW9yZS12ZXJ0IHtcXG4gIGNvbG9yOiBncmF5O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBoZWlnaHQ6IDFyZW07XFxuICB3aWR0aDogMXJlbTtcXG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XFxufVxcblxcbi5pY29uLXRyYXNoIHtcXG4gIGhlaWdodDogMS41cmVtO1xcbiAgd2lkdGg6IDEuNXJlbTtcXG59XFxuXFxuLmljb24tY2hlY2sge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG59XFxuXFxuLmNsZWFyLWFsbC1idG4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvcGFjaXR5OiAwLjU7XFxuICBtYXJnaW46IDFyZW0gYXV0bztcXG4gIGJvcmRlcjogMDtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLmVkaXQtdGFzayB7XFxuICBiYWNrZ3JvdW5kOiBsaWdodGdvbGRlbnJvZHllbGxvdztcXG59XFxuXFxuLnRhc2stY29tcGxldGVkIHtcXG4gIGZpbHRlcjogaW52ZXJ0KDQ5JSkgc2VwaWEoNjAlKSBzYXR1cmF0ZSgyMjQwJSkgaHVlLXJvdGF0ZSgxODlkZWcpIGJyaWdodG5lc3MoOTElKSBjb250cmFzdCg5OCUpO1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG4uY29tcGxldGVkIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1xcbiAgY29sb3I6ICM5ZDllYTA7XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBDb250YWluZXJQcmVzZW50ZXIgZnJvbSAnLi4vbW9kdWxlcy9Db250YWluZXJQcmVzZW50ZXIuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tY29udCcpO1xuICAoKCkgPT4gbmV3IENvbnRhaW5lclByZXNlbnRlcihtYWluKSkoKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9