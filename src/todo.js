const inputForm = document.getElementById('inputField'); //입력창
const addButton = document.getElementById('addButton'); // 버튼
const toDoList = document.getElementById('todo_lists'); //todo리스트 ul
const doneList = document.getElementById('done_lists'); //done리스트 ul

window.onload = () => {
  //html 이후 js 실행되도록

  loadTodos();
  countTodo();
  countDone();

  addButton.onclick = () => {
    addTodo(toDoList); // 버튼 누르면 todo를 add
  };

  document.addEventListener('keydown', e => {
    if (e.key == 'Enter' && !e.isComposing) {
      // 엔터키 입력이 발생하는경우 실행되는 함수
      // 한글입력시 두번 실행되는것을 방지함
      addTodo(toDoList);
    }
  });
};

const createTodo = todoInput => {
  let newlist = document.createElement('div'); //버튼 누르면 div 추가
  let todoText = document.createTextNode(todoInput);
  let checkIcon = document.createElement('span'); // check icon
  let deleteIcon = document.createElement('span'); // delete icon

  checkIcon.classList.add('todo-check', 'fa-solid', 'fa-check');
  deleteIcon.classList.add('todo-delete', 'fa-solid', 'fa-trash');
  newlist.classList.add('todo-list');

  deleteIcon.onclick = () => deleteTodo(deleteIcon);
  newlist.onclick = () => moveList(newlist);

  newlist.appendChild(checkIcon);
  newlist.appendChild(todoText);
  newlist.appendChild(deleteIcon);
  return newlist;
};

const addTodo = todolist => {
  if (!inputForm.value)
    // input에 아무 내용이 없으면
    alert('내용을 입력해 주세요!');
  else {
    todolist.appendChild(createTodo(inputForm.value)); //todoList에 추가
    console.log('입력');
    saveTodos(); //local strage에 저장
    inputForm.value = ''; // 할 일 입력창 초기화
    countTodo();
  }
};

const deleteTodo = elem => {
  elem.parentNode.parentNode.removeChild(elem.parentNode);
  // 인자로 받아진 노드의 부모의 부모노드로 거슬러올라가 todolist 삭제
  saveTodos();
  countTodo();
  countDone();
};

const moveList = todolist => {
  if (todolist.parentNode === toDoList) {
    doneList.appendChild(todolist);
    todolist.style.textDecoration = 'line-through';
    saveTodos();
    countTodo(); //리스트 개수를 다시 세고 숫자 바꿔줌
    countDone();
  } else if (todolist.parentNode === doneList) {
    toDoList.appendChild(todolist);
    todolist.style.textDecoration = 'none';
    saveTodos();
    countTodo();
    countDone();
  }
};

const countTodo = () => {
  const todoLength = document.querySelectorAll('ul#todo_lists .todo-list');
  const todoNum = document.querySelector('span#todo_num');

  todoNum.textContent = `To Do : ${todoLength.length}`;
};

const countDone = () => {
  const doneLength = document.querySelectorAll('ul#done_lists .todo-list');
  const doneNum = document.querySelector('span#done_num');

  doneNum.textContent = `Done : ${doneLength.length}`;
};

//local storage용 함수
const saveTodos = () => {
  const todoLists = Array.from(document.querySelectorAll('ul#todo_lists .todo-list')).map(list => list.textContent);
  const doneLists = Array.from(document.querySelectorAll('ul#done_lists .todo-list')).map(list => list.textContent);

  //문자열로 변환 후 local storage에 저장
  localStorage.setItem('todoLists', JSON.stringify(todoLists));
  localStorage.setItem('doneLists', JSON.stringify(doneLists));
};

const loadTodos = () => {
  //저장한 todolists, donelists 가져옴
  const savedTodoLists = JSON.parse(localStorage.getItem('todoLists')) || [];
  const savedDoneLists = JSON.parse(localStorage.getItem('doneLists')) || [];

  //todo에 있는 것들은 바로 appendChild
  savedTodoLists.forEach(todo => {
    toDoList.appendChild(createTodo(todo));
  });

  //doneList에 있는 것들은 선을 그어서 다시 로드해야하기 때문에 줄 긋고 appendChild
  savedDoneLists.forEach(done => {
    let listItem = createTodo(done);
    listItem.style.textDecoration = 'line-through';
    doneList.appendChild(listItem);
  });
};
