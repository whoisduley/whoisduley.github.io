Task = function(name, priority, due, project, status) {
	this.name = name;
	this.priority = priority;
	this.due = due;
	this.project = project;
	// 1 = done; 0 = not done
	this.status = status;
}

function ListModel(items) {
	this._items = items;
	this._selectedIndex = -1;

	this.itemAdded = new ToDoEvent(this);
	this.itemChecked = new ToDoEvent(this);
    this.selectedIndexChanged = new ToDoEvent(this);
}

ListModel.prototype = {
	getItems : function() {
		return [].concat(this._items);
	},

	addItem : function(item) {
		this._items.push(item);
		this.itemAdded.notify({item : item})
	},

	checkItemAt : function(index) {
		var item;
		item = this._items[index];
		item.status = 1;
		//this._items[index].children[1].style.textDecoration='line-through';
		this.itemChecked.notify({item : item});
		if (index === this._selectedIndex) {
			this.setSelectedIndex(-1);
		}
	},

	getSelectedIndex : function () {
        return this._selectedIndex;
    },

	setSelectedIndex : function(index) {
		var previousIndex;

		previiousIndex = this._selectedIndex;
		this._selectedIndex = index;
		this.selectedIndexChanged.notify({previous : previiousIndex});
	}
};

function ToDoEvent(sender) {
	this._sender = sender;
	this._listeners = [];
}

ToDoEvent.prototype = {
	attach : function(listener) {
		this._listeners.push(listener);
	},

	notify : function(args) {
		var index;

		for(index = 0; index < this._listeners.length; index += 1) {
			this._listeners[index](this._sender, args);
		}
	}
};

function ListView(model, elements) {
	this._model = model;
	this._elements = elements;

	this.listModified = new ToDoEvent(this);
	this.addButtonClicked = new ToDoEvent(this);
	this.cbClicked = new ToDoEvent(this);
	// this.cdUnchecked = new ToDoEvent(this);

	var _this = this;

	this._model.itemAdded.attach(function() {
		_this.rebuildList();
	});
	this._model.itemChecked.attach(function() {
		_this.rebuildList();
	});

	// Elements are gotten by ID in the HTML
	this._elements.list.onchange = function(e) {
		_this.listModified.notify({index : e.target.selectedIndex});
	};
	this._elements.addButton.onclick = function() {
		_this.addButtonClicked.notify();
	};
	//Checking the checkboxes will make this more complicated
	// this._elements.cbClicked.onclick = function() {
	// 	_this.cbClicked.notify();
	// };
}

ListView.prototype = {
	show : function() {
		this.rebuildList();
	},

	rebuildList : function() {
		var list, items, key;

		list = this._elements.list;
		list.innerHTML = ""

		items = this._model.getItems();
		for(key in items) {
			if(items.hasOwnProperty(key)) {
				var label = document.createElement('label');
				var text = document.createTextNode(items[key].name + " " + items[key].due + " " + items[key].priority);
				alert(text);
				//text.style.textDecoration='line-through';

				var cb = document.createElement("input");
				cb.type = 'checkbox';
				cb.id = 'cbClicked' + [key];

				label.appendChild(cb);
				label.appendChild(text);

				list.appendChild(label);

				// if(items[key].status = 1) {
				// 	cb.checked = true;
				// 	text.style.textDecoration='line-through';
				// }
			}
		}
		this._model.setSelectedIndex(-1);
	},

	checkboxChecked : function() {

	}
};

function ListController(model, view) {
	this._model = model;
	this._view = view;

	var _this = this;

	this._view.listModified.attach(function (sender, args) {
		_this.updateSelected(args.index);
	});

	this._view.addButtonClicked.attach(function() {
		_this.addItem();
	});

	this._view.cbClicked.attach(function() {
		_this.cbChecked();
	});
}

ListController.prototype = {
	addItem : function() {
		newTask = new Task();
        newTask.name = taskInput.value;
        newTask.due = dueInput.value;
        newTask.priority = priorityInput.value;
        newTask.status = 0;

        if (newTask) {
        	this._model.addItem(newTask);
        }
	},

	cbChecked : function() {
		var index;
		index = this._model.getSelectedIndex();

		if (index !== -1) {
			this._model.checkItemAt(this._model.getSelectedIndex());
		}
	},

	updateSelected : function(index) {
		this._model.setSelectedIndex(index);
	}
};