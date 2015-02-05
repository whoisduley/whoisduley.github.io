// ONLY THING LEFT IS PROJECTS
TaskList = function() {
	this.objectList = [];
}

TaskList.prototype = {
	addTask : function(taskInput) {
		var list, newTask, cb, label, text;
		list = document.getElementById('list');

		if(taskInput) {
			newTask = new Task();
			newTask.name = taskInput.name;
			newTask.due = taskInput.due;
			newTask.priority = taskInput.priority;
			newTask.project = taskInput.project;
		}
		else {
			newTask = new Task();
			newTask.name = document.getElementById('nameInput').value;
			newTask.due = document.getElementById('dueInput').value;
			newTask.priority = document.getElementById('priorityInput').value;
			newTask.project = document.getElementById('projectInput').value;
		}

		this.objectList.push(newTask);

		cb = document.createElement('input');
		cb.type = 'checkbox';

		label = document.createElement('label');
		text = document.createTextNode(newTask.name + " " + newTask.due + " " + newTask.priority + " ");

		label.appendChild(cb);
		label.appendChild(text);

		if (newTask.project) {
			
		}

		list.appendChild(label);

		cb.onclick = function() {
			label.style.textDecoration='line-through';
			taskList.save();
		}

		taskList.save();
	},

	removeTask : function(label) {
		this.objectList.splice()
		list.splice(index, 1);
	},

	save : function() {
		var saveList = [];
		var list = document.getElementById('list');
		for (var j = 0; j < list.length; j++) {
			if (list[j].checked === false) {
				saveList.push(this.objectList[j]);
			}
		}
		localStorage.setItem("todoDatabase", JSON.stringify(saveList));
	},

	load : function() {
		var getList, list, cb, newTask, label, text;
		getList = JSON.parse(localStorage.getItem("todoDatabase"));
		for (var i = 0; i < getList.length; i++) {
			taskList.addTask(getList[i]);
		}
	}

	addProject : function() {
		var newProject, text, projectLabel;
		newProject = document.getElementById('projectInput');
		projectLabel = document.createElement('label');
		text = document.createTextNode(newProject);
		list.appendChild()
	}

};

Task = function(name, priority, due, project, done) {
	this.name = name;
	this.priority = priority;
	this.due = due;
	this.project = project;
};