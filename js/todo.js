const todoListBox = document.querySelector('.todo-list-box');
const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');
const todoAddBtn = document.querySelector('.todo-add');
const todoClearBtn = document.querySelector('.todo-clear');
const todoDone = document.querySelector('.todo-complete');
const todoRecent = document.querySelector('.todo-recent');
const todoShowHide = document.querySelector('.todo-hidden');
let doneNum = 0;
let recentNum = 0;

function translateTodo() {
    todoInput.setAttribute('placeholder', `${translation[lang].todoPlaceholder}`);
} 

function checkTodoInput() {
    
    if (!todoInput.value) {

        todoAddBtn.setAttribute('disabled','disabled');
        todoAddBtn.classList.add('button-disabled');
        return false;

    } else {

        todoAddBtn.removeAttribute('disabled');
        todoAddBtn.classList.remove('button-disabled');
        return true;

    }

};

function checkTodoList() {
    
    if (!todoList.querySelector('li')) {

        todoClearBtn.setAttribute('disabled','disabled');
        todoClearBtn.classList.add('button-disabled');
        todoShowHide.setAttribute('disabled','disabled');
        todoShowHide.classList.add('button-disabled');

        doneNum = 0;
        recentNum = 0;

    } else {

        todoClearBtn.removeAttribute('disabled');
        todoClearBtn.classList.remove('button-disabled');
        todoShowHide.removeAttribute('disabled');
        todoShowHide.classList.remove('button-disabled');

    }

    todoDone.textContent = doneNum;
    todoRecent.textContent = recentNum;

}

function chechTodoListOnDelete() {
    if (!todoList.innerHTML) {

         todoClearBtn.setAttribute('disabled','disabled');
         todoClearBtn.classList.add('button-disabled');
         todoShowHide.setAttribute('disabled','disabled');
         todoShowHide.classList.add('button-disabled');
         
         doneNum = 0;
         recentNum = 0;

    } 
 }

function doneTodoItem(el) {
    el.addEventListener('click', () => {
        el.closest('.todo-item').firstChild.classList.add('todo-item-done');
        el.classList.add('button-disabled');
        el.setAttribute('disabled','disabled');

        doneNum++;
        todoDone.textContent = doneNum;
    });
}

function removeTodoItem(el) {
    el.addEventListener('click', () => {
        if (el.previousSibling.classList.contains('button-disabled')) {
            
            doneNum--;
            todoDone.textContent = doneNum;
            recentNum--;
            todoRecent.textContent = recentNum;

            el.closest('.todo-item').remove();
        
        } else {

            recentNum--;
            todoRecent.textContent = recentNum;

            el.closest('.todo-item').remove();

        }

        chechTodoListOnDelete();
    });
}


function addTodoItem() {

    if (checkTodoInput()) {

        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');

        const todoItemText = document.createElement('span');
        todoItemText.classList.add('todo-text');
        todoItemText.textContent = todoInput.value;

        const todoItemButtons = document.createElement('div');
        todoItemButtons.classList.add('todo-item-buttons');

        const doneItemBtn = document.createElement('button');
        doneItemBtn.classList.add('button');
        doneItemBtn.classList.add('todo-mini');
        doneItemBtn.classList.add('todo-done');
        doneTodoItem(doneItemBtn);

        const delItemBtn = document.createElement('button');
        delItemBtn.classList.add('button');
        delItemBtn.classList.add('todo-mini');
        delItemBtn.classList.add('todo-delete');
        removeTodoItem(delItemBtn);
        

        todoItemButtons.append(doneItemBtn);
        todoItemButtons.append(delItemBtn);
        todoItem.append(todoItemText);
        todoItem.append(todoItemButtons);
        todoList.append(todoItem);

        todoInput.value = '';
        recentNum++;
    }

    checkTodoInput();
    checkTodoList();

}

todoInput.addEventListener('input', checkTodoInput);
todoInput.addEventListener('keydown', (el) => {
    if (el.key === `Enter`) {
        addTodoItem();
    }
});
todoAddBtn.addEventListener('click', addTodoItem);
todoClearBtn.addEventListener('click', () => {
    todoList.innerHTML = '';
    checkTodoList();
});
todoShowHide.addEventListener('click', () => {
    todoListBox.classList.toggle('hidden');
    todoListBox.classList.toggle('config-slide');
    todoShowHide.classList.toggle('todo-shown');

    const delButtons = todoListBox.querySelectorAll('.todo-delete');

    if (todoListBox.classList.contains('hidden')) {
        for (let button of delButtons) {
            button.setAttribute('disabled', 'disabled');
        }
    } else {
        for (let button of delButtons) {
            button.removeAttribute('disabled');
        }
    }
});