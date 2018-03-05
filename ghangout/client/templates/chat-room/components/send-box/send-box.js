Template.sendBox.events({
  'click .send-message-button':function(e) {
    var json = {};
    json.content = $(e.currentTarget).parent().prev().find('.send-message-input').val();
    if (json.content.trim().length > 0) {
      json.group_id = Router.current().params._id;
      json.sender_id = Meteor.userId();
      var avatar = Meteor.users.findOne({_id:json.sender_id}).profile.avatar;
      json.sender_avatar = avatar;
      $(e.currentTarget).addClass('disabled');
      Meteor.call('sendMessage',json,function(err,result) {
        if (!err) {
          $(e.currentTarget).removeClass('disabled');

          Meteor.setTimeout(function() {
            var t = $('.all-message-container').last();

            t.scrollTop(t.get(0).scrollHeight);
          },100);

        } else {
          console.log(err);
        }
      });
    } else {
      alert("message cannot be empty");
    }

  }
});
