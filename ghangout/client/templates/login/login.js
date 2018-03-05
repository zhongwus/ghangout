Template.login.events({
	'click .login-button':function() {
		var username = $("input[name=username]").last().val();
		var password= $("input[name=password]").last().val();
		h.login(username,password);
	}
});

Template.login.onRendered(function() {

});
