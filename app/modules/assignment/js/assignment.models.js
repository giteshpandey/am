var Assignment = function(name, desc, status, owner) {
	this.id = '';
	this.name = name;
	this.desc = desc;
	this.status = "NEW";
	this.owner = "Admin";
	this.assignmentItems = [];
};

Assignment.prototype.toString = function(){
	return ('Assignment: [ID - ' + this.id + 'Name - ' + this.name + " : Desc - "+ this.desc +" : Status - " + this.status + " : Owner - "+ this.owner + "]");
}

Assignment.prototype.reset = function(){
	this.name = '';
	this.desc = '';
	this.status = '';
	this.owner = '';
}

var AssignmentItem = function(id, desc, itemType, weightage) {
	this.id = id;
	this.desc = desc;
	this.itemType = itemType;
	this.weightage = weightage;
	this.itemChoices = [];
}


AssignmentItem.prototype.reset = function(){	
	this.id = '';
	this.desc = '';
	this.itemType = '';
	this.noOfChoices = '';
	this.weightage = '';
	this.itemChoices = [];
}

AssignmentItem.prototype.copy = function(newAssignmentItem){	
	this.id = newAssignmentItem.id;
	this.desc = newAssignmentItem.desc;
	this.itemType = newAssignmentItem.itemType;
	this.noOfChoices = newAssignmentItem.noOfChoices;
	this.weightage = newAssignmentItem.weightage;
	this.itemChoices = newAssignmentItem.itemChoices;
}

var ItemChoice = function(desc) {
    this.id=''; 	
	this.desc = desc;
	this.isCorrect = 'Incorrect';	
};

ItemChoice.prototype.toString = function(){
	return ('Choice: [ID - ' + this.id + " : Desc - "+ this.desc + " : isCorrect - "+ this.isCorrect + "]");
}

ItemChoice.prototype.reset = function(){	
	this.desc = '';
	this.isCorrect = '';	
}