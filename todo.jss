//Task List - 1. Add Task 2. remove task 3. save all 4. restore all
// Task - 1. Name 2. Priority 3. Duedate 4. projectName

//Add Task - 1. Add to Model 2. Display Task list

TaskList = function() {
	this.list = [];
	this.addTask = function(task) {
		this.list.push(task);
	}
	// This is probably too complicated by about a billion
	this.removeTask = function(task, id) {
		this.newlist = []
		for (var i = 0; i < this.list.length; i++) {
			var current = this.list.pop();
			if (current != 1) {
				this.newlist.push(current);
			}
		}
		this.list = this.newlist.slice(0);
	}

	this.save = function() {

	}
	this.load = function() {

	}
}

Task = function(name, priority, due, project, status) {
	this.name = name;
	this.priority = priority;
	this.due = due;
	this.project = project;
	// 1 = done; 0 = not done
	this.status = status;
}