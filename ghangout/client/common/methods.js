Meteor.methods({
  'handleError':function(error) {
    console.log(error);
  }
});

h = {
  login:function(username,password) {
    Meteor.loginWithPassword(username, password, function(e) {
      if (e) {
        alert(e.reason);
      } else {

      }
    });
  },
  logout:function() {
    if (Session.get('loggedIn')) {
      Session.clear('loggedIn');
    }

    if (Session.get('myProfile')) {
      Session.clear('myProfile');
    }

    if (Session.get('myGroups')) {
      Session.clear('myGroups');
    }

    Meteor.logout(function(err) {

    });
  },
  register:function(email,password) {
    Meteor.call('registerByEmail',email,password,function(err,result) {
      if (!err) {
        h.login(email,password);
      }
    });
  },
  /*insertToGroupSession:function(group_id) {
    if (Session.get('myGroups')) {
      var groups = Session.get('myGroups');
      if (_.indexOf(groups,group_id) === -1) {
          groups.push(group_id);
          Session.update('myGroups',groups);
      }
    } else {
      Session.setPersistent('myGroups',[group_id]);
    }
    console.log(Session.get('myGroups'));
  },*/
  /*clearUserFromGroup:function(group_id) {
    // remove from my groups
    console.log('cleared session');
    var groups = Session.get('myGroups');
    groups = _.without(groups,group_id);
    Session.update('myGroups',groups);
  }*/
}
