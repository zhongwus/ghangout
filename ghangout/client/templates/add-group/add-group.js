Template.addGroup.events({
  'click .add-group-submit-button':function(e) {
    var info = {};
    info.content = $("textarea[name=add-content]").last().val();
    info.size = $("select[name=add-size]").last().val();
    info.location = $("input[name=location]").last().val();
    info.category = $("select[name=add-category]").last().val();
    info.latLng = {};
    info.owner_id = Meteor.userId();
    info.owner_profile = Meteor.user().profile;
    if (info.location.split(' ').join('').length === 0) {

      info.location = "null";

      Tracker.autorun(function(c) {
        if (Session.get('geoLocation') && Session.get('geoLocation') !== null) {
          info.latLng = Session.get('geoLocation');
          c.stop();

          $(e.currentTarget).addClass('disabled');
          Meteor.call('addGroup',info,function(err,result) {
            if (!err) {
              //h.insertToGroupSession(result);
              Router.go('grouplist',{groupCategory:info.category});
            } else {
              console.log(err);
            };
          });
        }
      });
    } else {
      Meteor.call('getLatLng',info.location,function(err,result) {

        if (!err) {
          info.latLng.lat = result[0].latitude;
          info.latLng.lng = result[0].longitude;
          $(e.currentTarget).addClass('disabled');
          Meteor.call('addGroup',info,function(err,result1) {
            if (!err) {
              //h.insertToGroupSession(result1);
              Router.go('grouplist',{groupCategory:info.category});
            } else {
              console.log(err);
            };
          });
        } else {
          handleError(err);
        }
      });
    }
  },
  'focus .add-group-content':function(e) {
    $(e.currentTarget).attr('placeholder','');
  },
  'blur .add-group-content':function(e) {
      $(e.currentTarget).attr('placeholder',"What's in your mind?");
  }
});

Template.addGroup.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("input[name=location]").last().geocomplete();
    }
  });

});
