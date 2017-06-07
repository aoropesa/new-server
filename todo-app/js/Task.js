const escape = require('escape-html')

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
