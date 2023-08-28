function setLocalStorage() {
    localStorage.setItem('name', nameInput.value);
    localStorage.setItem('city', city.value);
    localStorage.setItem('bg-tags-input', bgTagsInput.value);
    localStorage.setItem('todo-list', todoList.innerHTML);
    localStorage.setItem('doneNum', doneNum);
    localStorage.setItem('recentNum', recentNum);

    for (let i = 0; i < radioLang.length; i++) {
        localStorage.setItem(`radioLangChecked${i}`, radioLang[i].checked);
    }

    for (let i = 0; i < radioBg.length; i++) {
        localStorage.setItem(`radioBgChecked${i}`, radioBg[i].checked);
    }
    
    for (let i = 0; i < blocks.length; i++) {
        localStorage.setItem(`switcher${i}`, blokSwitchers[i].classList.contains('checked'));
    }
  }

function getLocalStorage() {

    if(localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    }

    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }

    if(localStorage.getItem('bg-tags-input')) {
        bgTagsInput.value = localStorage.getItem('bg-tags-input');
    }

    for (let i = 0; i < radioLang.length; i++) {
        if(localStorage.getItem(`radioLangChecked${i}`) === `true`) {
            radioLang[i].setAttribute('checked', '');
            lang = radioLang[i].value;
        }
    }

    for (let i = 0; i < radioBg.length; i++) {
        if(localStorage.getItem(`radioBgChecked${i}`) === `true`) {
            radioBg[i].setAttribute('checked', '');
        }
    }
    

    if(localStorage.getItem('todo-list')) {
        todoList.innerHTML = localStorage.getItem('todo-list');
        doneNum = localStorage.getItem('doneNum');
        recentNum = localStorage.getItem('recentNum');

        let delButtons = todoList.querySelectorAll('.todo-delete');
        let doneButtons = todoList.querySelectorAll('.todo-done');

        
        for (let button of doneButtons) {
            doneTodoItem(button);
        }

        for (let button of delButtons) {
            removeTodoItem(button);
        }

    }


    for (let i = 0; i < blocks.length; i++) {
        if (localStorage.getItem(`switcher${i}`) === `false`) {

            blocks[i].classList.add('hidden');
            blokSwitchers[i].classList.remove('checked');
            switchPoints[i].classList.remove('on-off');
            
        }
    }   

  }

  window.addEventListener('load', getLocalStorage);
  window.addEventListener('load', showTime);
  window.addEventListener('load', setBg);
  window.addEventListener('load', translateConfig);
  window.addEventListener('load', translateTodo);
  window.addEventListener('load', checkCityInput);
  window.addEventListener('load', translateCityDefault);
  window.addEventListener('load', checkTodoInput);
  window.addEventListener('load', checkTodoList);
  window.addEventListener('load', setInputWidth);
  window.addEventListener('load', setGreetingInputPlaceholderLang);
  window.addEventListener('load', getQuotes);
  window.addEventListener('load', changeBg);
  window.addEventListener('beforeunload', setLocalStorage);

