const Task = require('./Task.js')

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
