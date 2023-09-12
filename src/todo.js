const inputForm = document.getElementById('inputField'); //입력창
const addToDo = document.getElementById('addToDo'); // 버튼
const toDoList = document.getElementById('todo_lists');
const doneList = document.getElementById('done_lists');

addToDo.addEventListener('click', function () {
  let todolist = document.createElement('li'); //버튼 누르면 list 추가
  if (!inputForm.value)
    // input에 아무 내용이 없으면
    alert('내용을 입력해 주세요!');
  else {
    todolist.innerText = inputForm.value; //innerText값으로 리스트 만듬
    toDoList.appendChild(todolist); //todoList에 추가
    console.log('입력');
    inputForm.value = ''; // 할 일 입력창 초기화
  }

  todolist.addEventListener('click', function () {
    // list 클릭하면 done으로 이동, 줄긋기
    doneList.appendChild(this);
    this.style.textDecoration = 'line-through';
  });

  doneList.addEventListener('click', function (event) {
    if (event.target.parentNode === doneList) {
      // 현재 클릭된 요소의 부모가 doneList인 경우에만 실행
      const li = event.target.closest('li');

      if (li) {
        toDoList.appendChild(li); // 클릭된 <li>를 todo로 이동
        li.style.textDecoration = 'none';
      }
    }
  });
});
