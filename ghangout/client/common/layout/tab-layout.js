Template.tabLayout.helpers({
  category:function() {
    return Session.get('category') ? Session.get('category') : 'all';
  },
  inChatRoom:function() {
    if (Session.get('IN_CHAT_ROOM')) {

    } else {
      $('body').removeClass();
    }
    return Session.get('IN_CHAT_ROOM');
  },
  isOwner:function() {
    return Session.get('IS_OWNER');
  },
  groupMember:function() {
    return Session.get('CURRENT_MEMBERS');
  }
});

Template.tabLayout.onRendered(function() {
});

Template.tabLayout.events({
  'click .close-button':function() {
    window.history.back();
  },
  'click .sidebar-remove-button':function(e) {
    var group_id = Router.current().params._id;
    var user_id = $(e.currentTarget).parent().parent().attr('data-user');
    Meteor.call('removeUserFromGroup',group_id,user_id,function(err,result) {
      if (!err) {
        console.log('removed from db');
      } else {
        console.log(err);
      }
    });
  }
});
