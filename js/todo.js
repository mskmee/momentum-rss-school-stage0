export const todoMenu = document.querySelector('.todo-word');

const todoBlock = document.querySelector('.todo-block'),
      todoWraper = document.querySelector('.todo-wraper'),
      toDoModeList = document.querySelector('.todo-name-list'),
      todoClose = document.querySelector('.todo-close'),
      todoInbox = document.querySelector('.todo-inbox'),
      todoToday = document.querySelector('.todo-today'),
      todoDone = document.querySelector('.todo-done'),
      overLay = document.querySelector('.choose-block'),
      inboxValue = document.querySelector('.todo-inbox-value'),
      todayValue = document.querySelector('.todo-today-value'),
      doneValue = document.querySelector('.todo-done-value'),
      todoNameBlock = document.querySelector('.todo-name'),
      newTodoInput = document.querySelector('.new-todo-input'),
      todoList = document.querySelector('.todo-list'),
      newTodoBtn = document.querySelector('.todo-btn'),
      donePlaceHolder = document.querySelector('.todo-done-placeholder'),
      doneToTodayUrl = document.querySelector('.today-list-url'),
      todoPlaceHolder = document.querySelector('.todo-placeholder');

      let inboxArr = [],
      todayArr = [],
      doneArr = [];

// localStorage.clear()
const getMainTodoArray = () => {
    if(localStorage.getItem('today')){
        todayArr = JSON.parse(localStorage.getItem('today'));
        inboxArr = JSON.parse(localStorage.getItem('inbox'));
        doneArr = JSON.parse(localStorage.getItem('done'));
    }else{
        localStorage.setItem('today', JSON.stringify(todayArr));
        localStorage.setItem('inbox', JSON.stringify(inboxArr));
        localStorage.setItem('done', JSON.stringify(doneArr));
    }
}

const setMainTodoArray = () => {
    localStorage.setItem('today', JSON.stringify(todayArr));
    localStorage.setItem('inbox', JSON.stringify(inboxArr));
    localStorage.setItem('done', JSON.stringify(doneArr));
}

window.addEventListener('load', getMainTodoArray);
window.addEventListener('beforeunload', setMainTodoArray);

const setValueToTodosLists = (inbox, today, done) => {
    inboxValue.textContent = inbox.length;
    todayValue.textContent = today.length;
    doneValue.textContent = done.length;
}

const openTodo = (e) => {
    overLay.classList.add('_active');
    todoBlock.classList.add('_active');
    changeTodoList('inbox');
}

const findAngChangeTodoStatus = () => {
    const allTodosElements = document.querySelectorAll('.todo-element');
    const allTodosCheckboxs = document.querySelectorAll('.todo-checkbox');
    allTodosCheckboxs.forEach((box) =>{
        box.addEventListener('click', (e)=>{
            const allArr = Array.from(allTodosCheckboxs);
            const allTodos = allArr.filter(el => el === e.target);
            if(allTodos){
                const numberOfElementArr = e.target.classList[0].split('-')
                const numberOfElement = numberOfElementArr[numberOfElementArr.length - 1];
                allTodosElements[numberOfElement].querySelector('.todo-value').classList.toggle('_complited')
                const nameOfArr = todoNameBlock.textContent.toLocaleLowerCase();
                changeOnOffValueInTodo(nameOfArr, numberOfElement);
            }
        })
    })
}

const changeOnOffValueInTodo = (arr, num) =>{
    let element;
    const doneElement = {};
    switch(arr){
        case 'today':
            element = todayArr[num];
            for(const [key, val] of Object.entries(element)){
                if(val === 'on'){
                    todayArr.splice(num, 1);
                    doneElement[key] = 'off';
                    todayArr.unshift(doneElement);
                }else{
                    todayArr.splice(num, 1);
                    doneElement[key] = 'on';
                    todayArr.push(doneElement)
                }
            }
            changeTodoList('today')
            break

        case 'inbox':
            element = inboxArr[num];
            for(const [key, val] of Object.entries(element)){
                if(val === 'on'){
                    inboxArr.splice(num, 1);
                    doneElement[key] = 'off';
                    inboxArr.unshift(doneElement);
                }else{
                    inboxArr.splice(num, 1);
                    doneElement[key] = 'on';
                    inboxArr.push(doneElement)
                }
            }
            changeTodoList('inbox');
            break
        
        case 'done':
            element = doneArr[num];
            for(const [key, val] of Object.entries(element)){
                if(val === 'off'){
                    doneArr.splice(num, 1);
                    doneElement[key] = 'on';
                    doneArr.unshift(doneElement);
                }else{
                    doneArr.splice(num, 1);
                    doneElement[key] = 'off';
                    doneArr.push(doneElement)
                }
            }
            changeTodoList('done')
            break
    }
}
const setTodoFromArr = (arr) =>{
    for(let i = 0; i < arr.length; i++){
        const todoData = Object.entries(arr[i])
        const todoElement = document.createElement('div');
        const todoCheckbox = document.createElement('input');
        const todoValue = document.createElement('input');
        const deleteIcon = document.createElement('div');
        const editIcon = document.createElement('div');

        editIcon.classList.add('todo-settings-element', 'todo-edit-div', `todo-edit-item-${i}`);
        deleteIcon.classList.add('todo-settings-element', 'todo-delete-div', `todo-delete-item-${i}`)
        todoElement.classList.add('todo-element');
        todoCheckbox.setAttribute('type', 'checkbox');
        todoCheckbox.setAttribute('id', `checkbox-${i}`);
        todoCheckbox.classList.add(`todo-check-${i}`, 'todo-checkbox');
        todoValue.setAttribute('type', 'text');
        todoValue.classList.add('todo-value', `todo-value-${i}`);
        try{
            todoValue.value = todoData[0][0];
        } catch (err) {
            arr.splice(i, 1)
        }
        if(todoData[0][1] === 'off'){
            todoCheckbox.checked = true;
            todoValue.classList.add('_complited')
        }
        todoElement.append(todoCheckbox, todoValue, editIcon, deleteIcon);
        todoList.append(todoElement);
    }
}

const appendNewTodoToMainArr = () => {
    const arr = todoNameBlock.textContent.toLowerCase();
    const newTodoValue = newTodoInput.value
    switch(arr){
        case 'today':
            if(newTodoValue){
                const newTodo = {};
                newTodo[newTodoValue] = 'on'
                todayArr.push(newTodo);
                newTodoInput.value = '';
            }
            changeTodoList('today');
            break

        case 'inbox':
            if(newTodoValue){
                const newTodo = {};
                newTodo[newTodoValue] = 'on'
                inboxArr.push(newTodo);
                newTodoInput.value = '';
            }
            changeTodoList('inbox');
            break
        
        case 'done':
            if(newTodoValue){
                const newTodo = {};
                newTodo[newTodoValue] = 'on'
                doneArr.push(newTodo);
                newTodoInput.value = '';
            }
            changeTodoList('done');
            break
    }
}

const showPlaceHolder = (arr) => {
    newTodoInput.removeEventListener('change', appendNewTodoToMainArr)
    const arrName = todoNameBlock.textContent.toLowerCase();
    if(arr.length === 0){
        if(arrName === 'done'){
            todoPlaceHolder.classList.remove('_active');
            newTodoInput.classList.add('_hidden');
            donePlaceHolder.classList.add('_active');
            doneToTodayUrl.addEventListener('click', function(e){
                changeTodoList('today');
            })

        }else{
            donePlaceHolder.classList.remove('_active');
            todoPlaceHolder.classList.add('_active');
            newTodoInput.classList.add('_hidden');
            newTodoBtn.addEventListener('click', function(e){
                newTodoInput.classList.remove('_hidden');
                todoPlaceHolder.classList.remove('_active');
                newTodoInput.focus();
                newTodoInput.addEventListener('change', appendNewTodoToMainArr)
            })
        }
    }
    else{
        if(arrName === 'done'){
            newTodoInput.classList.add('_hidden');
            todoPlaceHolder.classList.remove('_active');
            donePlaceHolder.classList.remove('_active');
        }else{
            todoPlaceHolder.classList.remove('_active');
            donePlaceHolder.classList.remove('_active');
            newTodoInput.classList.remove('_hidden');
            newTodoInput.addEventListener('change', appendNewTodoToMainArr)
            newTodoInput.focus();
        }
    }
}

const clearOldTodos = () => {
    if(todoList.firstChild){
        while(todoList.firstChild){
            todoList.removeChild(todoList.firstChild)
        }
    }
}

const sortTodosToRighteArr = () => {
    let todayArrIndex = [];
    let todayCheckContinue = true;
    let inboxArrIndex = [];
    let inboxCheckContinue = true;
    let doneArrIndex = [];
    let doneCheckContinue = true;
    for(let i = 0; i < todayArr.length; i++){
        if(todayCheckContinue){
            for(const [key, value] of Object.entries(todayArr[i])){
                if(value === 'off'){
                    let valueToDone = {}; 
                    valueToDone[key] = value;
                    doneArr.push(valueToDone);
                    todayArrIndex.push(i)
                }
                else{
                    todayCheckContinue = false
                }
            }
        }else{
            break
        }
    }
    todayArrIndex.length > 0 ? todayArr.splice(0, todayArrIndex.length) : 0

    for(let i = 0; i < inboxArr.length; i++){
        if(inboxCheckContinue){
            for(const [key, value] of Object.entries(inboxArr[i])){
                if(value === 'off'){
                    let valueToDone = {}; 
                    valueToDone[key] = value;
                    doneArr.push(valueToDone);
                    inboxArrIndex.push(i)
                }
            }
        }else{
            break
        }
    }
    inboxArrIndex.length > 0 ? inboxArr.splice(0, inboxArrIndex.length) : 0;
    for(let i = 0; i < doneArr.length; i++){
        if(doneCheckContinue){
            for(const [key, value] of Object.entries(doneArr[i])){
                if(value === 'on'){
                    let valueToDone = {}; 
                    valueToDone[key] = value;
                    todayArr.push(valueToDone);
                    doneArrIndex.push(i);
                }else{
                    doneCheckContinue = false
                }
            }
        }else{
            break
        }
    }
    doneArrIndex.length > 0 ? doneArr.splice(0, doneArrIndex.length) : 0;
}

const changeTodoList = (todoName) => {
    todoWraper.classList.remove('_active');
    switch(todoName){
        case 'today':
            clearOldTodos();
            todoNameBlock.textContent = 'Today';
            showPlaceHolder(todayArr);
            setTodoFromArr(todayArr);
            break

        case 'inbox':
            clearOldTodos();
            todoNameBlock.textContent = 'Inbox';
            showPlaceHolder(inboxArr);
            setTodoFromArr(inboxArr);
            break
        
        case 'done':
            clearOldTodos();
            todoNameBlock.textContent = 'Done';
            showPlaceHolder(doneArr);
            setTodoFromArr(doneArr);
            break
    }
    findAngChangeTodoStatus();
    openTodoSetingsList();
    openTodoDeleteList();
}

const openTodoSetingsList = () => {
    const allTodosEdists = document.querySelectorAll('.todo-edit-div');
    allTodosEdists.forEach(edit => {
        edit.addEventListener('click', function(e){
            const allEditsArr = Array.from(allTodosEdists);
            const allEdits = allEditsArr.filter(el => el === e.target);
            const nameOfArr = todoNameBlock.textContent.toLocaleLowerCase();
            if(allEdits){
                const numberOfElementArr = e.target.classList[2].split('-')
                const numberOfElement = numberOfElementArr[numberOfElementArr.length - 1];
                editTodoValue(nameOfArr, numberOfElement);
            }
        })
    })
}

const openTodoDeleteList = () => {
    const allTodosDeletes = document.querySelectorAll('.todo-delete-div');
    allTodosDeletes.forEach(item => {
        item.addEventListener('click', (e) => {
            const allDeletsArr = Array.from(allTodosDeletes);
            const deleteClick = allDeletsArr.filter(el => el === e.target);
            if(deleteClick){
                const numberOfElementArr = e.target.classList[2].split('-');
                const numberOfElement = numberOfElementArr[numberOfElementArr.length - 1];
                const nameOfArr = todoNameBlock.textContent.toLocaleLowerCase();
                deleteTodoValue(nameOfArr, numberOfElement);
            }
        })
    })
}

const deleteTodoValue = (nameOfArr, index) => {
    switch(nameOfArr){
        case 'today':
            todayArr.splice(index, 1);
            changeTodoList('today');
            break
        case 'inbox':
            inboxArr.splice(index, 1);
            changeTodoList('inbox');
            break
        case 'done':
            doneArr.splice(index, 1);
            changeTodoList('done');
            break
    }    
}

const editTodoValue = (nameOfArr, index) => {
    const allTodosElements = document.querySelectorAll('.todo-element');
    const todoValue = allTodosElements[index].querySelector('.todo-value')
    todoValue.focus();
    todoValue.classList.add('_active');
    todoValue.addEventListener('focusout', () =>{
    let newValue = '',
        oldValue = '';
    if(todoValue.value){
        switch(nameOfArr){
            case 'today':
                oldValue = Object.keys(todayArr[index]);
                newValue = todoValue.value;
                if(newValue !== oldValue){
                    todayArr[index][newValue] = todayArr[index][oldValue];
                    delete todayArr[index][oldValue];
                }
                break
            case 'inbox':
                oldValue = Object.keys(inboxArr[index]);
                newValue = todoValue.value;
                if(newValue !== oldValue){
                    inboxArr[index][newValue] = inboxArr[index][oldValue];
                    delete inboxArr[index][oldValue];
                }
                break
            case 'done':
                oldValue = Object.keys(doneArr[index]);
                newValue = todoValue.value;
                if(newValue !== oldValue){
                    doneArr[index][newValue] = doneArr[index][oldValue];
                    delete doneArr[index][oldValue];
                }
                break
        }    
    }
    todoValue.classList.remove('_active');
    });
}

todoMenu.addEventListener('click', e => openTodo(e));

toDoModeList.addEventListener('click', (e) => {
    setValueToTodosLists(inboxArr, todayArr, doneArr);
    todoWraper.classList.toggle('_active');
})

const closeTodoMenu = (e) =>{
    todoWraper.classList.remove('_active');
    todoBlock.classList.remove('_active');
}

overLay.addEventListener('click', (e) => closeTodoMenu(e))

document.addEventListener('click', (e) => {
    if(todoClose.contains(e.target)){
        sortTodosToRighteArr();
        closeTodoMenu(e);
    }

    if(!todoWraper.contains(e.target) && !toDoModeList.contains(e.target)){
        todoWraper.classList.remove('_active');
    }

    if(todoInbox.contains(e.target) || todoDone.contains(e.target) || todoToday.contains(e.target)){
        sortTodosToRighteArr();
        changeTodoList(e.target.classList[1].split('-')[1]);
    }
})