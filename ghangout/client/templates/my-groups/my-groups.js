Template.myGroups.onRendered(function() {
  Session.set('MY_GROUPS_EDIT_MODE',false);
});

Template.myGroups.helpers({
  'groups':function() {
    var groupsId = Session.get('myGroups');
    console.log(Groups.find({}).fetch());
    return Groups.find({});
  },
  editMode:function() {
    return Session.get('MY_GROUPS_EDIT_MODE');
  }
});

Template.myGroups.events({
  'click .my-groups-add-button':function() {

    Router.go('addGroup');
  },
  'click .my-groups-edit-button':function() {
    Session.set('MY_GROUPS_EDIT_MODE',true);
    $(".my-groups-single-item").addClass('move-right disable-click');
    $(".my-groups-delete-button").addClass('animite-show');
  },
  'click .my-groups-done-button':function() {
    Session.set('MY_GROUPS_EDIT_MODE',false);
    $(".my-groups-single-item").removeClass('move-right');
    $(".my-groups-delete-button").removeClass('animite-show');
  }
});
