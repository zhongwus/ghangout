Template.index.events({
	'click .index-login-button':function(e) {
    Router.go('login');

  },
  'click .index-register-button':function(e) {
    Router.go('registerEmail');
  }
});

Template.index.helpers({
});
