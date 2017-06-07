const formInput = document.querySelector('.form input')
const tasksContainer = document.querySelector('.tasks-container')
const editor = document.querySelector('.editor')
const editorInput = document.querySelector('.editor input')
const editorBtn = document.querySelector('.editor button')
const actions = require('./actions.js')

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
