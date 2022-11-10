(function(){
    let listArr = [],
    listName = '';
    
    function  createAppTitle( title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle
    }
    

    function createItemForm (){
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        button.textContent = 'Добавить дело';
        button.disabled = true;
        input.addEventListener('input',function(){

            if(input.value != ''){
                button.disabled = false;
            } else{
                button.disabled = true;
            }
        });
        input.placeholder = 'Введите новое дело';
        

        form.classList.add('input-group','mb-3');
        input.classList.add('form-control');
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');

        form.append(input);
        form.append(buttonWrapper);
        buttonWrapper.append(button);

        return{
            form,
            input,
            button,
        };
    }

    function createList(){
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createToDoItem(obj){
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let buttonDone = document.createElement('button');
        let buttonDelete = document.createElement('button');

        item.classList.add('list-group-item','d-flex', 'justify-content-between', 'aline-item-center');
        item.textContent = obj.name;

        if(obj.done){
            item.classList.add('list-group-item-success');
        }

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        buttonDone.classList.add('btn', 'btn-success');
        buttonDone.textContent = 'Готово'
        buttonDelete.classList.add('btn','btn-danger');
        buttonDelete.textContent = 'Удалить';


        buttonDone.addEventListener('click', function(){

            for (const el of listArr) {
                
                if(el.id === obj.id){
                    el.done =! el.done;
                }
            }
            saveList(listArr);
            item.classList.toggle('list-group-item-success');
        });
        buttonDelete.addEventListener('click', function(){
            if(confirm('Вы уверены?')){
                for (i=0; i<listArr.length; i++){
                    if(listArr[i].id === obj.id){
                        listArr.splice(i,1);
                    }
                }
                saveList(listArr);
                item.remove();
            }
        });

        buttonGroup.append(buttonDone);
        buttonGroup.append(buttonDelete);
        item.append(buttonGroup);
        

        return {
            item,
            buttonDelete,
            buttonDone,
        };

    }
    function getNewId (arr){
        let max = 0;
        for (const item of arr) {
            if(item.id > max){
                max = item.id;
            }
        }
        return max+1;
    }
    
    function createToDoApp (container, title, userName, defArr = []){

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createItemForm();
        let todoList = createList();


        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        listName = userName;

        let dataList = localStorage.getItem(listName);

        if(dataList!='' && dataList!= null){
            listArr = JSON.parse(dataList);
        } else{
            listArr = defArr;
            saveList(listArr);
        }
        for (const item of listArr) {
            let todoItem = createToDoItem(item);
            todoList.append(todoItem.item);
        }

        todoItemForm.form.addEventListener('submit', function (e){
        
            e.preventDefault();

            if (!todoItemForm.input.value){
                
                return;
            }

            let newItem = {
                id: getNewId(listArr),
                name: todoItemForm.input.value,
                done: false,
            }

            let todoItem = createToDoItem(newItem);

            listArr.push(newItem);
            console.log(listArr);

            todoList.append(todoItem.item);

            todoItemForm.input.value = "";
            todoItemForm.button.disabled = true;
            saveList(listArr);

        });

    }
    
   

    function saveList (arr){
        localStorage.setItem(listName,  JSON.stringify(arr));
    }

    console.log(localStorage.getItem(listName));

    window.createToDoApp = createToDoApp;
    

})();


