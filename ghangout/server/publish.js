//get groups by category
Meteor.publish('groups',function(groupCategory) {
	var category = groupCategory.toLowerCase();
	return (category === "all") ? Groups.find({}) : Groups.find({category:category});
});

// get my groups
Meteor.publish('myGroups',function() {
	var groupsId = Meteor.users.findOne({_id:this.userId}).myGroupsId;
	return Groups.find({_id:{$in:groupsId}});
});

Meteor.publish('allUsers',function() {
	return Meteor.users.find({});
});

Meteor.publish('getMessages',function(group_id) {
	return Messages.find({group_id:group_id});
});

Meteor.publish('me',function() {
	return Meteor.users.find({_id:this.userId});
});
