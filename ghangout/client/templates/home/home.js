Template.home.events({
	'click .home-cell':function(e) {
		var groupCategory = $(e.currentTarget).attr('data-group');
		Session.set('category',groupCategory);
		Router.go('grouplist',{groupCategory:groupCategory});
	},
	'click .home-skip-button':function() {
		Session.set('category','all');
		Router.go('grouplist',{groupCategory:'all'});
	}
});

Template.home.helpers({
});
