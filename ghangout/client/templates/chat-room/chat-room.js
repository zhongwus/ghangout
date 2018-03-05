
document.ontouchstart = function(e){ return true; }

Template.chatRoom.onRendered(function() {
  Session.set('CURRENT_GROUP_ID',Router.current().params._id);
  Session.set('bodyHeight',$("body").height());
  //scroll to bottom

  var t = $('.all-message-container').last();

  t.scrollTop(t.get(0).scrollHeight);

  var addParticipant = function() {
    var group_id = Session.get('CURRENT_GROUP_ID');

    Meteor.call('insertTempParticipant',group_id,Meteor.userId(),function(err,result) {
      if (err) {
        console.log(err);
      } else {
        Session.set('IN_CHAT_ROOM',true);
      }
    });

  }();

  this.autorun(function(c) {
    var keyboardHeight = Session.get("keyboardHeight");
    $(".send-container").last().css({
      "bottom":keyboardHeight
    });

    $(".all-message-container").last().css({
      "bottom":keyboardHeight
    });
  });

  //updating scroll position
  this.autorun(function(c) {
    if (Session.get('messages')) {
      Meteor.setTimeout(function() {
        var t = $('.all-message-container').last();
        t.scrollTop(t.get(0).scrollHeight);
      },100);
    }
  });

  this.autorun(function(c) {

    var group_id = Router.current().params._id;
    var group = Groups.findOne({_id:group_id});
    var temp_participants_ids = group.temp_participants_ids;
    var participants_ids = group.participants_ids;
    var me = Meteor.userId();
    if (Session.get('IN_CHAT_ROOM')) {
      if (_.indexOf(temp_participants_ids,me) === -1 && _.indexOf(participants_ids,me) === -1) {
        alert('You are removed from the group');
        //h.clearUserFromGroup(group_id);
        Router.go('grouplist',{groupCategory:group});
        c.stop();
      } else {
        var groupMembers = _.union(participants_ids,temp_participants_ids);
        Meteor.call('getUserInfo',groupMembers,function(err,result) {
          if (!err) {
            result.sort(function(a,b) {
              return _.indexOf(participants_ids,b._id) - _.indexOf(participants_ids,a._id);
            });
            Session.set('CURRENT_MEMBERS',result);
          } else {
            console.log(err);
          }
        });
      }
    }
  });

});

Template.chatRoom.helpers({
  messages:function() {
    var group_id = Router.current().params._id;

    var messages = Messages.findOne({
      group_id:group_id
    }).messages.sort(function(a,b) {
      return a-b;
    });
    Session.set('messages',messages);
    return messages;
  },
  isOwner:function() {
    var owner_id = Router.current().params.owner_id;
    var me = Meteor.userId();
    Session.set('IS_OWNER',owner_id===me);
    return owner_id === me;
  },
  inGroup:function() {
    var myGroups = Session.get('myGroups');
    var group_id = Router.current().params._id;
    return _.indexOf(myGroups,group_id) !== -1;
  },
  'bodyHeight':function() {
    return Session.get('bodyHeight');
  }
});

Template.chatRoom.onDestroyed(function() {
  var group_id = Session.get('CURRENT_GROUP_ID');
  Session.set('IN_CHAT_ROOM',false);
  Meteor.call('removeTempParticipant',group_id,Meteor.userId(),function(err,result) {
    if (!err) {
      Session.clear('CURRENT_GROUP_ID');
    } else {
      console.log(err);
    }
  });
});

Template.chatRoom.events({
  'focus .send-message-input':function() {
    //$('.msg-box').animate({
    //scrollTop: $('.msg-box').get(0).scrollHeight}, 0);

    /*if (Session.get('deviceType') === "gcm") {
        document.ontouchstart = function(e){ e.stopPropagation();}
    } else {
        document.ontouchstart = function(e){ e.preventDefault();}
    }*/
    /*$("#msg").on('input',function() {
        if ($("#msg").val() !== "") {
            $(".send-message").removeClass('disabled');
        } else {
            $(".send-message").addClass('disabled');
        }
    });*/
    Meteor.setTimeout(function() {
      var t = $('.all-message-container').last();

      t.scrollTop(t.get(0).scrollHeight);
    },100);
  },
  'click .chat-room-confirm-button':function(e) {
    var group_id = Session.get('CURRENT_GROUP_ID');
    var user_id = Meteor.userId();
    Meteor.call('insertParticipant',group_id,user_id,function(err,result) {
      if (!err) {
        //h.insertToGroupSession(group_id)
      } else {
        console.log(err);
      }
    })
  },
  'click .chat-room-sidebar':function() {
    $(".ui.sidebar")
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('setting','mobileTransition','overlay')
    .sidebar('toggle');
  }
})
