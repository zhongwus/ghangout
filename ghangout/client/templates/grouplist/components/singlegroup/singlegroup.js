Template.singlegroup.helpers({

});

Template.singlegroup.events({
	'click .single-group-row':function(e) {
		var category = $(e.currentTarget).attr('data-category');
		var _id = $(e.currentTarget).attr('data-id');
		var owner_id = $(e.currentTarget).attr('data-owner')
		Router.go('chatRoom',{groupCategory:category,_id:_id,owner_id:owner_id});
	}
});

Template.singlegroup.onRendered(function() {

});
