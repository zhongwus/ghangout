Router.configure({
	loadingTemplate: 'loading'
	/*waitOn:function() {
		return Meteor.subscribe('sdf');
	}*/
});

Router.route('index', {
	path: '/',
	template: 'index',
	layoutTemplate:'commonLayout',
	onBeforeAction: function() {
		if (Meteor.userId()) {
			Router.go('grouplist',{groupCategory:'all'});
		} else {
			this.next();
		}
	},
	action:function() {
	    if (this.ready()) {
	      this.render();
	    }
	}
});

Router.route('login',{
	path:"/login",
	template:'login',
	layoutTemplate:'commonLayout',
	onBeforeAction: function() {
		if (Meteor.userId()) {

			Router.go('home');
		} else {
			this.next();
		}
	},
	action:function() {
	    if (this.ready()) {
	      this.render();
	    }
	}
});

Router.route('completeProfile',{
	path:"/complete-profile",
	template:'completeProfile',
	layoutTemplate:'commonLayout',
	onBeforeAction: function() {
		if (!Meteor.userId()) {
			Router.go('index');
		} else {
			this.next();
		}
	},
	action:function() {
	    if (this.ready()) {
	      this.render();
	    }
	}
});

Router.route('registerEmail',{
	path:"/register/email",
	template:'registerEmail',
	layoutTemplate:'commonLayout',
	onBeforeAction: function() {
		if (Meteor.userId()) {
			Router.go('completeProfile');
		} else {
			this.next();
		}
	},
	action:function() {
	    if (this.ready()) {
	      this.render();
	    }
	}
});

Router.route('registerPhone',{
	path:"/register/phone",
	template:'registerPhone',
	layoutTemplate:'commonLayout',
	onBeforeAction: function() {
		if (Meteor.userId()) {
			Router.go('home');
		} else {
			this.next();
		}
	},
	action:function() {
	    if (this.ready()) {
	      this.render();
	    }
	}
});

Router.route('home',{
	path:"/home",
	template:'home',
	layoutTemplate:'commonLayout',
	onBeforeAction: function() {
		if (!Meteor.userId()) {
			Router.go('index');
		} else {
			this.next();
		}
	},
	action:function() {
	    if (this.ready()) {
	      this.render();
	    }
	}
});

Router.route('grouplist',{
	path:"/home/group/:groupCategory",
	template:'grouplist',
	layoutTemplate:'tabLayout',
	waitOn:function() {
		return [
			Meteor.subscribe('groups',this.params.groupCategory)
		];
	},
	fastRender: true,
	onBeforeAction: function() {
		if (!Meteor.userId()) {
			Router.go('index');
		} else {
			this.next();
		}
	},
	action:function() {
	    if (this.ready()) {
	      this.render();
	    }
	},
	data:function() {
		return this.params.groupCategory;
	}

});

Router.route('addGroup',{
	path:"/home/add-group",
	template:"addGroup",
	layoutTemplate:'tabLayout',
	onBeforeAction:function() {
		GoogleMaps.load({
			key:Meteor.settings.public.googleApiKey,
			libraries:'places'
		});
		this.next();
	},
	action:function() {
		if (this.ready()) {
			this.render();
		}
	}
});

Router.route('chatRoom', {
	path:'/home/group/:groupCategory/:_id/:owner_id',
	template:"chatRoom",
	layoutTemplate:'tabLayout',
	waitOn:function() {
		return [
			Meteor.subscribe('getMessages',this.params._id),
			Meteor.subscribe('groups',this.params.groupCategory)
		];
	},
	fastRender: true,
	action:function() {
		if (this.ready()) {
			this.render();
		}
	}
});

Router.route('myGroups', {
	path:"/my-groups",
	template:'myGroups',
	layoutTemplate:'tabLayout',
	waitOn:function() {
		return [Meteor.subscribe('myGroups')];
	},
	action:function() {
		if (this.ready()) {
			this.render();
		}
	}
});

// get geolocation
Router.onBeforeAction(function() {
	if (!Session.get('geoLocation') || Session.get('geoLocation') === null) {
			Session.set('geoLocation',Geolocation.latLng());
	}
	this.next();
}, {only: ['addGroup','grouplist','myGroups']});

// check user logged in and completed profile
Router.onBeforeAction(function() {
	this.next();
}, {only: ['addGroup']});
