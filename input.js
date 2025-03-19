const todoInputElem = document.querySelector('.todo-input');
const todoListElem = document.querySelector('.todo-list'); // 해야 할 일
const todoListCompleted = document.querySelector('.completed-list'); // 해낸 일

let todos = [];
let id = 0;

// 할 일 목록을 설정하는 함수
const setTodos = (newTodos) => {
    todos = newTodos;
};

// 현재 모든 할 일 가져오기
const getAllTodos = () => todos;

// 완료된 할 일 가져오기
const getAllCompletedTodos = () => {
    return todos.filter(todo => todo.isCompleted);
};

// 새로운 할 일 추가
const appendTodos = (text) => {
    const newId = id++;
    const newTodos = [...getAllTodos(), { id: newId, isCompleted: false, content: text }];
    setTodos(newTodos);
    paintTodos();
};

// 할 일 삭제 (완료 리스트에서도 삭제)
const deleteTodo = (todoId) => {
    const newTodos = getAllTodos().filter(todo => todo.id !== todoId);
    setTodos(newTodos);
    paintTodos();
    paintCompletedTodos();
};

// 완료/미완료 토글 기능
const toggleComplete = (todoId) => {
    const newTodos = getAllTodos().map(todo => 
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
    paintTodos();
    paintCompletedTodos();
};

// 해야 할 일 리스트 렌더링
const paintTodos = () => {
    todoListElem.innerHTML = '';

    getAllTodos()
        .filter(todo => !todo.isCompleted) // 완료되지 않은 할 일만 표시
        .forEach(todo => {
            const todoItemElem = document.createElement('li');
            todoItemElem.classList.add('todo-item');

            const todoElem = document.createElement('div');
            todoElem.classList.add('todo');
            todoElem.innerText = todo.content;

            const checkBtnElem = document.createElement('button');
            checkBtnElem.classList.add('checkBtn');
            checkBtnElem.innerText = '✔'; // 완료 버튼
            checkBtnElem.addEventListener('click', () => toggleComplete(todo.id));

            todoItemElem.appendChild(todoElem);
            todoItemElem.appendChild(checkBtnElem);
            todoListElem.appendChild(todoItemElem);
        });
};

// 해낸 일 리스트 렌더링
const paintCompletedTodos = () => {
    todoListCompleted.innerHTML = '';

    getAllCompletedTodos().forEach(todo => {
        const todoItemElem = document.createElement('li');
        todoItemElem.classList.add('todo-item', 'completed');

        const todoElem = document.createElement('div');
        todoElem.classList.add('todo');
        todoElem.innerText = todo.content;

        const deleteBtnElem = document.createElement('button');
        deleteBtnElem.classList.add('delBtn');
        deleteBtnElem.innerText = 'x'; // 삭제 버튼
        deleteBtnElem.addEventListener('click', () => deleteTodo(todo.id));

        todoItemElem.appendChild(todoElem);
        todoItemElem.appendChild(deleteBtnElem);
        todoListCompleted.appendChild(todoItemElem);
    });
};

// 초기화 (Enter 입력 시 할 일 추가)
const init = () => {
    todoInputElem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            appendTodos(e.target.value.trim());
            todoInputElem.value = '';
        }
    });
};

init();
