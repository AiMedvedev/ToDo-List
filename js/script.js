'use-strict';

document.addEventListener("DOMContentLoaded", () => {
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));
    console.log(toDoList);


    const todoControl = document.querySelector('.todo-control');
    const headerInput = document.querySelector('.header-input');
    const todoList = document.querySelector('.todo-list');
    const todoCompleted = document.querySelector('.todo-completed');

    let toDoData = toDoList || [];


    const render = function () {
        todoList.innerHTML = '';
        todoCompleted.innerHTML = '';

        toDoData.forEach(function (item) {
            const li = document.createElement('li');

            li.classList.add('todo-item');
            li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
                '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
                '</div>';

            if (item.completed) {
                todoCompleted.append(li);
            } else {
                todoList.append(li);
            }

            li.querySelector('.todo-complete').addEventListener('click', function () {
                item.completed = !item.completed;
                localStorage.setItem('toDoList', JSON.stringify(toDoData));
                render();
            });

            li.querySelector('.todo-remove').addEventListener('click', function (e, i) {
                const newArr = toDoData.splice(i, 1);
                e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
                localStorage.setItem('toDoList', JSON.stringify(toDoData));
                return toDoData;
            });
        });


    };


    todoControl.addEventListener('submit', function (event) {
        event.preventDefault();

        if (headerInput.value !== '') {
            const newToDo = {
                text: headerInput.value,
                completed: false
            };

            toDoData.push(newToDo);

            localStorage.setItem('toDoList', JSON.stringify(toDoData));

            headerInput.value = '';

            render();
        }
    });
});