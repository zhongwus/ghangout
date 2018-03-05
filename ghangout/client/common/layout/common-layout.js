Template.commonLayout.events({
  'click .close-button':function() {
    Router.go('index');
  },
  'click .register-close-button':function() {
    Router.go('index');
  },
  'click .logout-button':function() {
    h.logout();
  }
});
