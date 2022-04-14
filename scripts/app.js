const form = document.querySelector(".form");
const formInput = form.querySelector(".form-input");
const template = document.querySelector(".template").content;
const eList = document.querySelector(".list")

const todosArr = JSON.parse(window.localStorage.getItem("todos")) || [];

const renderTodos = (arr, list) => {
  list.innerHTML = null;
  arr.forEach(item => {
    const cloneTemp = template.cloneNode(true)
    const templateText = cloneTemp.querySelector(".template-text");
    const templateCheckbox = cloneTemp.querySelector(".template-checkbox");
    const templateBtn = cloneTemp.querySelector(".template-btn");
    const templateItem = cloneTemp.querySelector(".template-item")
    templateText.textContent = item.content
    templateCheckbox.checked = item.isCompleted
    templateBtn.dataset.todoId = item.id
    templateCheckbox.dataset.todoId = item.id
    templateBtn.addEventListener("click", deleteTodo)
    templateCheckbox.addEventListener("change", checkedTodo)

    if (item.isCompleted) {
      templateItem.classList.add("checked")
    } else {
      templateItem.classList.remove("checked")
    }
    list.appendChild(cloneTemp)
  })
}
renderTodos(todosArr, eList)

function deleteTodo(e) {
  const todoId = e.target.dataset.todoId;
  const foundIndexTodo = todosArr.findIndex(item => item.id === +todoId)

  todosArr.splice(foundIndexTodo, 1)
  window.localStorage.setItem('todos', JSON.stringify(todosArr))
  renderTodos(todosArr, eList)
}

function checkedTodo(e) {
  const todoId = e.target.dataset.todoId;
  const foundTodo = todosArr.find(item => item.id === +todoId)
  foundTodo.isCompleted = !foundTodo.isCompleted
  window.localStorage.setItem('todos', JSON.stringify(todosArr))


  renderTodos(todosArr, eList)
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const inputValue = formInput.value.trim();
  if (inputValue === "") {
    return alert("Iltimos bo'sh qatorni to'ldiring!")
  }
  if (inputValue.length <= 5) {
    return alert("Iltimos 5 tadan ko'p harf kiriting!")
  } else {
    const newTodos = {
      id: new Date().getTime(),
      content: inputValue,
      isCompleted: false
    }
    todosArr.push(newTodos)
    window.localStorage.setItem('todos', JSON.stringify(todosArr))
    renderTodos(todosArr, eList)
    formInput.value = null
  }
})
