let elForm = document.querySelector('.todo-form');
let eltodolist = document.querySelector('.todo-list');
let inputvalue = document.querySelector('.todo-input');

let ellcount = document.querySelector(".all-count");
let elcomplatedcound = document.querySelector(".complated-cound");
let elUncomplatedcound = document.querySelector(".Uncomplated-cound");
let elcountbtnwrapper = ellcount.parentElement.parentElement;

let elChoseninput = document.querySelector(".chosen-img");
let eluploadimg = document.querySelector(".upload-img");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let updateId = null;

elcountbtnwrapper.addEventListener("click", function (e) {
    if (e.target.matches(".count-btn")) {
        renderTodos(todos);
    } else if (e.target.matches(".complated-cound-btn")) {
        const filterArr = todos.filter(item => item.isComplate === true);
        renderTodos(filterArr);
    } else if (e.target.matches(".Uncomplated-cound-btn")) {
        const filterArr = todos.filter(item => item.isComplate === false);
        renderTodos(filterArr);
    }
});

elForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (updateId !== null) {
        todos = todos.map(item => {
            if (item.id === updateId) {
                return { ...item, todoValue: inputvalue.value };
            }
            return item;
        });
        updateId = null;
    } else {
        const data = {
            id: todos.length,
            todoValue: inputvalue.value,
            isComplate: false
        };
        todos.push(data);
    }

    e.target.reset();
    renderTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
});

function renderTodos(arr) {
    eltodolist.innerHTML = '';
    arr.forEach(item => {
        let elTodoitem = document.createElement('li');
        elTodoitem.className = `flex items-center justify-between p-2 rounded-lg bg-gray-50 shadow ${item.isComplate ? "opacity-70 line-through" : ""}`;
        elTodoitem.innerHTML = `
            <div>
              <span class="text-gray-500">${item.id}</span>
              <strong class="text-gray-700">${item.todoValue}</strong>
            </div>
            <div class="flex items-center space-x-2">
                <div onclick='handleCompleteClick(${item.id})' class="w-[20px] h-[20px] cursor-pointer rounded-full border-[2px] border-gray-500 relative">
                    <div class="absolute inset-[2px] ${item.isComplate ? "bg-primary" : ""} rounded-full"></div>
                </div>
                <button onclick='handleDelete(${item.id})' class="bg-danger text-white p-2 rounded-lg hover:bg-transparent hover:text-danger border-[2px] border-danger transition-all">Delete</button>
                <button onclick='handleUpdate(${item.id})' class="bg-primary text-white p-2 rounded-lg hover:bg-transparent hover:text-primary border-[2px] border-primary transition-all">Update</button>
            </div>
        `;
        eltodolist.append(elTodoitem);
    });

    ellcount.textContent = todos.length;
    elcomplatedcound.textContent = todos.filter(item => item.isComplate === true).length;
    elUncomplatedcound.textContent = todos.filter(item => item.isComplate !== true).length;
}

renderTodos(todos);

function handleCompleteClick(id) {
    const findedObj = todos.find(item => item.id === id);
    findedObj.isComplate = !findedObj.isComplate;
    renderTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function handleDelete(id) {
    todos = todos.filter(item => item.id !== id);
    renderTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function handleUpdate(id) {
    const findedObj = todos.find(item => item.id === id);
    inputvalue.value = findedObj.todoValue;
    updateId = id;
}

elChoseninput.addEventListener("change", function(e) {
    eluploadimg.src = URL.createObjectURL(e.target.files[0]);
});
