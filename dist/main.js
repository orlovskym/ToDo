/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "publish": () => (/* binding */ publish),
/* harmony export */   "subscribe": () => (/* binding */ subscribe)
/* harmony export */ });
let devMode = false;
let events = [];
let funktions = [];


function subscribe(eventName, funktion) {
    if (devMode) console.log('New subscription: ' + eventName);
    events.push(eventName);
    funktions.push(funktion);
}

function publish(eventName, data) {
    if (devMode) console.log('Broadcast: ' + eventName + ' with ' + data);

       for (let i=0; i<events.length; i++){
           if (events[i]==eventName){
               funktions[i](data);
           }
       }
}



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initialize": () => (/* binding */ initialize)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


(0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.subscribe)('updatedToDos',drawTiles)

const initialize = (()=>{
    console.log('it lives');

    newToDo.addEventListener('click', () => {
        _drawTileModInterface();
        _drawNewTileButton();
    })

})();



function drawTile(toDo) {
    const container = document.createElement('div')
    container.classList.add('tile')
    const titleBar = document.createElement('div')
    titleBar.innerText = toDo.title;
    titleBar.classList.add('tileTop')

    const buttons=document.createElement('div')
    buttons.classList.add('tileButtons')
    const editButton = document.createElement('img')
    editButton.src='./images/book.svg';    
    const closeButton = document.createElement('img')
    closeButton.src='./images/close.svg';


    editButton.addEventListener('click',e=>{
        _drawTileModInterface();
        _drawEditTileButton(whatsMyIndex(e));
        })

    closeButton.addEventListener('click',e=>{
        ;(0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.publish)('deleteTile',whatsMyIndex(e))
    })

    titleBar.append(buttons);
    buttons.append(editButton, closeButton);


    const descBar = document.createElement('div')
    descBar.innerText = toDo.description;
    const dueBar = document.createElement('div')
    dueBar.innerText = toDo.dueDate;
    const prioBar = document.createElement('div')
    prioBar.innerText = toDo.priority;

    container.append(titleBar, descBar, dueBar, prioBar)
    display.append(container)
}

function whatsMyIndex(e){
    //returns the index corresponding to the tile in which a button was clicked
    let thisTile=(e.target.parentNode.parentNode.parentNode)
    return(Array.from(thisTile.parentNode.children).indexOf(thisTile))
}

function drawTiles(array) {
    _clearDisplay();
    for (let i = 0; i < array.length; i++) {
        drawTile(array[i]);
    }
}

function _drawTileModInterface() {
    _clearControls();
    const container = document.createElement('form')
    container.id='container'
    const nameRow = document.createElement('div')
    nameRow.classList.add('formRow')
    const nameLabel = document.createElement('label')
    nameLabel.htmlFor = ('name');
    nameLabel.innerText = 'Name: '
    const nameInput = document.createElement('input')
    nameInput.type = 'text';
    nameInput.id='nameInput'
    nameRow.append(nameLabel, nameInput)

    const descLabel = document.createElement('label')
    descLabel.htmlFor = ('desc');
    descLabel.innerText = 'Description: '
    const descBox = document.createElement('textarea')
    descBox.id='descBox'

    const dueRow = document.createElement('div')
    const dueLabel = document.createElement('label')
    dueLabel.htmlFor = ('due');
    dueLabel.innerText = 'Due Date: '
    const dueInput = document.createElement('input')
    dueInput.type = 'date';
    dueInput.id='dueInput'
    dueRow.append(dueLabel, dueInput)

    const prioRow = document.createElement('div')
    prioRow.innerText = 'Priority: '
    const prioButtons = document.createElement('div')
    prioButtons.classList.add('formRow')
    const highPLabel = document.createElement('div')
    highPLabel.innerText = 'High'
    const highPButton = document.createElement('input')
    highPButton.type = 'radio'
    highPButton.name = 'prio'
    highPButton.id='highPButton'
    const lowPLabel = document.createElement('div')
    lowPLabel.innerText = 'Low'
    const lowPButton = document.createElement('input')
    lowPButton.type = 'radio'
    lowPButton.name = 'prio'
    lowPButton.id='lowPButton'
    prioButtons.append(highPLabel, highPButton, lowPLabel, lowPButton)

    container.append(nameRow, descLabel, descBox, dueRow, prioRow, prioButtons)
    tempControls.append(container)
}
function _whichPriorityIsChecked(){
    if (!highPButton.checked&&!lowPButton.checked) return null;
    if (highPButton.checked) return 'High';
    if (lowPButton.checked) return 'Low';}


function _validateTileInput(){
    if (!nameInput.value || !descBox.value || !dueInput.value || !_whichPriorityIsChecked()) {
        alert('All fields require an entry.')
        return 0;
    }else return 1;
}

function _drawNewTileButton(){
    const subButton = document.createElement('button')
    subButton.innerText = 'Submit'
    subButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!_validateTileInput()) return;
        (0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.publish)('createToDo', { title: nameInput.value, description: descBox.value, dueDate: dueInput.value, priority: _whichPriorityIsChecked(), completed: false })
    })
    container.append(subButton)
}

function _drawEditTileButton(i){
    const editButton = document.createElement('button')
    editButton.innerText = 'Submit'
    editButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!_validateTileInput()) return;

        (0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.publish)('editToDo',{ title: nameInput.value, description: descBox.value, dueDate: dueInput.value, priority: _whichPriorityIsChecked(), completed: false, index:i })
    })
    container.append(editButton)
}

function _clearControls() {
    tempControls.replaceChildren();
}

function _clearDisplay(){
    display.replaceChildren();
}



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _toDoDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);




const projectFactory = (name) => {
    console.log('i am a new project, my name is ' + name)
    let _toDos = [];

    function toDoFactory ({title, description, dueDate, priority, completed}) {
        console.log('making a todo named ' + title)
        function toggleCompletion() {
            this.completed = !this.completed;
        }
        let toDo = { title, description, dueDate, priority, completed, toggleCompletion }
        _toDos.push(toDo);
        _notifyUpdatedToDos();
    }

    function editToDo({title, description, dueDate, priority, completed, index}) {
        let i = _toDos[index];
        i.title=title;
        i.description=description;
        i.dueDate=dueDate;
        i.priority=priority;
        i.completed=completed;
        _notifyUpdatedToDos();
    }

    function getToDoByIndex(i) {
        return _toDos[i];
    }

    function removeToDoByIndex(i) {
        _toDos.splice(i, 1);
        _notifyUpdatedToDos();
    }

    function getAllToDos() {
        return _toDos;
    }

    function _notifyUpdatedToDos() {
        (0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.publish)('updatedToDos', _toDos)
    }

    return {name, toDoFactory, editToDo};
}


const projectManager = (() => {
    let projects = [];
    let activeProject = undefined;

    const createProject = (name) => {
        projects.push(projectFactory(name));
        activeProject=projects[projects.length-1]
    }

    const renameProject = (name,index) =>{
        projects[index].name=name;
    }


    //initialize subscriptions and the default project
    ;(0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.subscribe)('createProject',createProject);
    (0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.publish)('createProject','default')
    ;(0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.subscribe)('createToDo',activeProject.toDoFactory)
    ;(0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.subscribe)('editToDo',activeProject.editToDo)

    //testing content below
  /*  publish('createToDo',{title:1,description:2,dueDate:3,priority:4,completed:5})
    publish('editToDo',({title:2,description:2,dueDate:3,priority:4,completed:5, index:0}))
    console.log(projects)*/

})();


})();

/******/ })()
;