Template.completeProfile.events({
  'click .cp-take-photo-button':function() {
    MeteorCamera.getPicture(function(err,data) {
      if (!err) {
          $(".cp-avatar").last().attr('src',data);
      } else {
        console.log(err);
      }
    });
  },
  'click .cp-upload-photo-button':function() {
    if (Meteor.isCordova) {
      MeteorCamera.getPicture({
        width: 80,
        height: 80,
        quality: 100,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      },function(err,data) {
        $(".cp-avatar").last().attr('src',data);
      });
    } else {
      alert('Cordova only feature.');
    }
  },

  'click .cp-submit-button':function() {
    var profile = {};
    profile.nickName = $("input[name=username]").last().val();
    var birthday = $("input[name=birthday]").last().val();
    console.log(birthday);
    if (birthday.trim().length === 0) {
      profile.age = "";
    } else {
        profile.age = moment().diff(moment(birthday),'year').toString();
    }
    profile.sex = $("select[name=sex]").last().val().toLowerCase();

    profile.avatar = $(".cp-avatar").last().attr('src');

    console.log(profile);
    Meteor.call('updateProfile',profile,function(err,result) {
      if (!err) {
        Session.setPersistent('myProfile',Meteor.user().profile);
        Router.go('home');
      } else {
        console.log(err);
      }
    });
  },
  'click .cp-skip-button':function() {
    Router.go('home');
  }
});

Template.completeProfile.helpers({

});
