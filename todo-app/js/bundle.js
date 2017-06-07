/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const escape = __webpack_require__(3)

function Task (text, id){
  return `
    <div class = "task" id = "${id}">
      <p class = "text">${escape(text)}</p>
      <button class = "edit">✎</button>
      <button class = "delete">✖</button>
    </div>
  `
}

module.exports = Task


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Task = __webpack_require__(0)

function checkStorage(){
  if(JSON.stringify(data) === JSON.stringify({})) return true
  if(JSON.stringify(data) === 'null') return true
  return false
}

let data = JSON.parse(localStorage.getItem('tasks'))
//if data is empty, set tasks to be {} in localStorage
if(checkStorage()){
  localStorage.setItem('tasks', JSON.stringify({}))
}

function updateStorage(){
  localStorage.setItem('tasks', JSON.stringify(data))
}

function buildTasks(){
  let taskslist = ''

  for(let id in data){
    taskslist += Task(data[id], id)
  }

  return taskslist
}

function saveNewTask(text){
  const id = Math.round(Math.random()*Math.pow(10, 9))
  data[id] = text
  updateStorage()
}

function deleteTask(id) {
  delete data[id]
  updateStorage()
}

function editTask(id, text){
  data[id] = text
  updateStorage()
}

module.exports.buildTasks = buildTasks
module.exports.saveNewTask = saveNewTask
module.exports.deleteTask = deleteTask
module.exports.editTask = editTask


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const formInput = document.querySelector('.form input')
const tasksContainer = document.querySelector('.tasks-container')
const editor = document.querySelector('.editor')
const editorInput = document.querySelector('.editor input')
const editorBtn = document.querySelector('.editor button')
const actions = __webpack_require__(1)

function renderTasksContainer(){
  tasksContainer.innerHTML = actions.buildTasks()
}
renderTasksContainer()

formInput.addEventListener('keypress', function(e){
        //if user pressses the 'enter' key
  if(e.keyCode === 13){
    actions.saveNewTask(e.target.value)
    renderTasksContainer()
    formInput.value = ''  //clear the input
  }
})

tasksContainer.addEventListener('click', function(event){
  if(event.target.classList.contains('text')){
    event.target.classList.toggle('completed')
  }

if(event.target.classList.contains('delete')){
  const id = event.target.parentElement.id
  actions.deleteTask(id)
  renderTasksContainer()
}
if(event.target.classList.contains('edit')){
  //show the editor
  editor.dataset.id = event.target.parentElement.id
  editor.classList.toggle('open')
  editorInput.value = event.target.previousSibling.previousSibling.textContent
}
})

editorBtn.addEventListener('click', function(){
  actions.editTask(editor.dataset.id, editorInput.value)
  editor.classList.remove('open')
  renderTasksContainer()
})


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */



/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}


/***/ })
/******/ ]);