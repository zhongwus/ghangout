Meteor.startup(function() {
	if (Meteor.isCordova) {
		//cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		cordova.plugins.Keyboard.disableScroll(true);
		Session.set("keyboardHeight",0);
		window.addEventListener('native.keyboardshow', keyboardShowHandler);
    window.addEventListener('native.keyboardhide', keyboardHideHandler);

	} else {
	}

	Tracker.autorun(function(c) {
		if (Meteor.userId()) {
			var s = Meteor.subscribe('me');

			if (s.ready()) {
				var me = Meteor.users.findOne({});
				if (me && me.myGroupsId) {
					if (Session.get('myGroups')) {
						Session.update('myGroups',me.myGroupsId);
					} else {
						Session.setPersistent('myGroups',me.myGroupsId);
					}

					Session.setPersistent('myProfile',Meteor.user().profile);
				}
			}
			//var user = Meteor.users.findOne({_id:Meteor.userId()});
			//console.log(user);
		}
	});
});

function keyboardShowHandler(e){
    Session.set("keyboardHeight",e.keyboardHeight);
}


function keyboardHideHandler(e){
    Session.set("keyboardHeight",0);
}
