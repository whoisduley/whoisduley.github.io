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
		this._items.splice(index, 1);
		this.itemChecked.notify({item : item});
		if (index === this._selectedIndex) {
			this.setSelectedIndex(-1);
		}
	},

	getSelectedIndex : function() {
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
	this.cbChecked = new ToDoEvent(this);
	this.cdUnchecked = new ToDoEvent(this);

	var _this = this;

	this._model.itemAdded.attach(function() {
		_this.rebuildList();
	});
	this._model.cbChecked.attach(function() {
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
	this._elements.cbClicked.onclick = function() {
		_this.cbClicked.notify();
	};
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
		//When building you probably will have to add the checks as well
		for(key in items) {
			if(items.hasOwnProperty(key)) {
				var newoption = document.createElement("option");
				newoption.innerText = items[key];
				list.appendChild(newoption);
			}
		}
		this._model.setSelectedIndex(-1);
	}
};