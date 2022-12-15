const form = document.querySelector('.todo-list-form');
const alert = document.querySelector('.alert');
const input = document.getElementById('todo-list');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.todo-list-container');
const list = document.querySelector('.todo-list');
const clearBtn = document.querySelector('.clear-btn');



// Edit options

let editElement
let editFlag = false;  // это флаг - кнопка в режиме редактиврования. По дефолту false
let editId = ''

// ---------------- Слушатели Listeners ----------------


// Submit form

form.addEventListener('submit', addItem)
clearBtn.addEventListener('click', clearItems)


// ---------------- Функции ----------------

function addItem(e) {
    e.preventDefault()
    const value = input.value
    // submitBtn.hidden = list.children.length >= 10;
    // if (list.children.length > 10) {
    //     alert.innerHTML = 'Достигнуто максимальное количество элементов!'
    //     alert.style.border = '1px solid black'
    //     alert.style.background = 'pink'
    //     alert.style.padding = '7px'

    //     return
    // }
    if(value && !editFlag) {
        const element = document.createElement('div')
        element.classList.add('todo-list__item')
        element.innerHTML = `
            <p class="title">${value} - ${timeAdd}</p>
            <div class="btn-container">
                <button type="button" class="edit-btn">Редактировать</button>
                <button type="button" class="delete-btn">Удалить</button>
            </div>
        `
        // добавляем слушателей (listeners) на кнопку удаления
        const deleteBtn = element.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', deleteItem)

        // добавляем слушателей (listeners) на кнопку редактирования
        const editBtn = element.querySelector('.edit-btn');
        editBtn.addEventListener('click', editItem)
    

        // тут мы добавляем верхний элемент в разметку HTML
        list.appendChild(element)

        // тут при добавлении элемента очищается инпут до дефолта
        setBackToDefault()

        // добавляем алёрт
        displayAlert('Элемент добавлен!', 'success')

    } else if (value && editFlag) {
        editElement.innerText = value
        setBackToDefault()
    } else {
        displayAlert('Пожалуйста, введите значение!', 'error')

 }
} 
 
function setBackToDefault () {
    input.value = ''
    editFlag = false
    submitBtn.textContent = 'Добавить'
}

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement
    // console.log('delete')
    list.removeChild(element)
    // if (list.children.length <= 10) {
    //     submitBtn.hidden = false }

    displayAlert('Элемент удален!', 'success')

}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement

    editElement = e.currentTarget.parentElement.previousElementSibling

    input.value = editElement.innerText
    editFlag = true
    submitBtn.textContent = 'Отредактировать'
    submitBtn.style = 'block'
    // console.log('edit')
}

function clearItems() {
    const items = document.querySelectorAll('.todo-list__item')
    if (items.length > 0) {
        displayAlert('Все элементы удалены !', 'success')
        items.forEach(function(item)  {
            list.removeChild(item)
        })
    } else {
     displayAlert('Элементы и так отсутствуют!', 'success')

    }
    setBackToDefault()
    submitBtn.hidden = false
    console.log(items)
}


function displayAlert(text, type) {
    alert.textContent = text
    alert.classList.add('show-alert')
    alert.classList.add(`${type}-alert`)

    setTimeout(function() {
        alert.textContent = ''
        alert.classList.remove('show-alert')
        alert.classList.remove(`${type}-alert`)
    }, 2000)
}


// Добавляем время
let timeNow = new Date();
let timeHours = timeNow.getHours();
let timeMinutes = timeNow.getMinutes();
let timeAdd = ( `${timeHours}:${timeMinutes}`)

