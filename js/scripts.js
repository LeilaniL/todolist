function TodoList(){
    this.tasks =[]
    this.currentId = 0;
}

TodoList.prototype.addTask = function(task) {
    task.id = this.assignId();
    this.tasks.push(task);
}

TodoList.prototype.assignId = function(){
    this.currentId +=1;
    return this.currentId;
}

TodoList.prototype.findTask = function(id){
    for (var i = 0; i< this.tasks.length; i++){
        if(this.tasks[i]){
            if(this.tasks[i].id == id){
                return this.tasks[i];
            }
        }
    };
    return false;
}

TodoList.prototype.deleteTask = function(id){
    for (var i=0; i< this.tasks.length; i++ ){
        if(this.tasks[i]){
            if(this.tasks[i].id == id){
                delete this.tasks[i];
                return true;
            }
        }
    };
    return false;
    }
    function Task(task, dueDate, priority){
        this.task=task,
        this.dueDate=dueDate,
        this.priority=priority
    }
// User Interface
var todoList = new TodoList();
function displayTaskDetails(todoListToDisplay) {
    var tasksList = $("ul#tasks");
    var htmlForTaskInfo = "";
    todoListToDisplay.tasks.forEach(function(task){
        htmlForTaskInfo += "<li id=" + task.id + ">" + task.task+ " " + task.dueDate + " " + task.priority + "</li>";
        
    });
    tasksList.html(htmlForTaskInfo);
};

function showTask(taskId){
    var task = todoList.findTask(taskId);
    $("#show-task").show();
    $(".task").html(task.task);
    $(".due-date").html(task.dueDate);
    $(".priority").html(task.priority);
    
}
function attachTaskListeners(){
    $("ul#tasks").on("click", "li", function(){
        $(this).toggleClass("strike-through")
    })

    $("ul#tasks").on("click", ".deleteButton", function(){
        todoList.deleteTask(this.id);
        $("#show-task").hide();
        displayTaskDetails(todoList);
    });
};
$(document).ready(function(){
    attachTaskListeners();
    $("form#new-task").submit(function(event){
        event.preventDefault();
        var inputtedTask = $("input#task").val();
        var inputtedDueDate = $("input#due-date").val();
        var inputtedPriority = $("select").children("option:selected").val();
        
        $("input#task").val("");
        $("input#due-date").val("");

        var newTask = new Task(inputtedTask, inputtedDueDate, inputtedPriority);
        todoList.addTask(newTask);
        displayTaskDetails(todoList);

        $("li:contains('high')").css('background-color','pink');
        $("li:contains('medium')").css('background-color','yellow');
        $("li:contains('low')").css('background-color','green').css('color', 'white');
    });

});
