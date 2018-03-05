/*Template.registerHelper('getGroupOwnerAvatar',function(owner_id) {
  var profile = Meteor.users.findOne({_id:owner_id}).profile;
  return profile ? profile.avatar : null;
});*/

Template.registerHelper('getGroupDistance',function(latLng) {


  var myGeo = Session.get('geoLocation');

  if (myGeo) {
    var lat1 = myGeo.lat;
    var lon1 = myGeo.lng;
  } else {
    return "?";
  }

  var lat2 = latLng.lat;
  var lon2 = latLng.lng;

  var radlat1 = Math.PI * lat1/180;
  var radlat2 = Math.PI * lat2/180;
  var radlon1 = Math.PI * lon1/180;
  var radlon2 = Math.PI * lon2/180;
  var theta = lon1-lon2;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist.toFixed(2);
  //if (unit=="K") { dist = dist * 1.609344 };
  //if (unit=="N") { dist = dist * 0.8684 }; //miles
  //if (unit=="ME") { dist = dist * 1.609344 * 1000};
  dist = dist * 0.8684;
  return dist.toFixed(2);

});

Template.registerHelper('getGroupLiveNumber',function(participants_ids,temp_participants_ids) {
  return _.union(participants_ids,temp_participants_ids).length;
});

Template.registerHelper('checkMe',function(sender_id) {
  if (Meteor.userId()) {
    return Meteor.userId() === sender_id;
  } else return false;
});

Template.registerHelper('GroupNotClickable',function(isFull,_id) {
  return (isFull && _.indexOf(Session.get('myGroups'),_id) === -1);
});

Template.registerHelper('CheckInGroup',function(myGroupsId) {
  return _.indexOf(myGroupsId,Session.get('CURRENT_GROUP_ID')) !== -1;
});
