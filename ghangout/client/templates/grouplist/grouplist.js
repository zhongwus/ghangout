Template.grouplist.events({
	'click .grouplist-add-button':function() {

		Router.go('addGroup');
	},
	'click .grouplist-subheader-item':function(e) {
		var groupCategory = $(e.currentTarget).text().toLowerCase().trim();
		Session.set('category',groupCategory);
		Router.go('grouplist',{groupCategory:groupCategory});
	}
});

Template.grouplist.helpers({
	groups: function(){
		var result = {};
		var groups;
		var me = Meteor.userId();
		if (Session.get('category') && Session.get('category') === 'all') {
			groups = Groups.find({blacklist:{$nin:[me]}});
		} else {
			groups = Groups.find({category:Session.get('category'),blacklist:{$nin:[me]}});
		}

		/*_.each(groups.fetch(),function(item) {
			result[item._id] = item;
		});*/
		//Session.set('allGroups',result);

		return groups;
	},
	temp:function() {
		return "lele";
	}

});

Template.grouplist.onRendered(function() {
	Session.set("category",this.data);
	$(".grouplist-subheader").last().find("[data-group='" + Session.get('category') + "']").addClass('active');
});
