Template.mySingleGroup.events({
  'click .my-groups-delete-button':function(e) {
    var group_id = $(e.currentTarget).parent().attr('data-id');
    var me = Meteor.userId();
    Meteor.call('quitGroup',group_id,me,function(err,result) {
      if (!err) {
        $(e.currentTarget).parent().next().remove();
        $(e.currentTarget).parent().remove();
      } else {
        console.log(result);
      }
    })
  },
  'click .my-groups-single-item':function(e) {
    var category = $(e.currentTarget).parent().attr('data-category');
    var _id = $(e.currentTarget).parent().attr('data-id');
    var owner_id = $(e.currentTarget).parent().attr('data-owner')
    Router.go('chatRoom',{groupCategory:category,_id:_id,owner_id:owner_id});
  }
});
