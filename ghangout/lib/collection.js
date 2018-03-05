Groups = new Mongo.Collection("groups");
Messages = new Mongo.Collection("messages");
FriendList = new Mongo.Collection("friendlist");
RecentList = new Mongo.Collection("recentlist");
VerificationCodes = new Mongo.Collection("verificationcodes");

var Schemas = {};

Schemas.UserProfile = new SimpleSchema({
	nickName: {
		type: String,
		regEx: /^[a-z0-9A-Z_]{1,15}$/,
		optional: true
	},
	sex: {
		type: String,
		optional: true
	},
	age: {
		type: String,
		optional: true
	},
	avatar: {
		type: String,
		optional: true
	}
});

Schemas.User = new SimpleSchema({
	//phone number
    username: {
        type: String,
        //regEx: /^\+[a-z0-9A-Z_]{3,15}$/,
        optional:true
    },

	emails: {
		type: [Object],
		optional: true
	},
	'emails.$.address': {
		type:String,
		regEx: SimpleSchema.RegEx.Email
	},
	'emails.$.verified': {
		type:Boolean
	},
	createdAt: {
		type:Date
	},
	profile: {
		type: Schemas.UserProfile,
		optional: true
	},
	myGroupsId: {
		type:[String],
		optional:true
	},
	services: {
		type: Object,
		optional:true,
		blackbox:true
	}
    /*(roles: {
        type: [String],
        optional: true
    }*/
});

Schemas.GeoLocation = new SimpleSchema({
	lat: {
		type:String
	},
	lng: {
		type:String
	}
});

Schemas.Group = new SimpleSchema({
	category:{
		type: String
	},
	capacity: {
		type: Number,
		max: 50
	},
	content: {
		type: String
	},
	owner_id: {
		type: String
	},
	owner_profile: {
		type:Schemas.UserProfile
	},
	participants_ids: {
		type: [String]
	},
	temp_participants_ids: {
		type:[String]
	},
	blacklist:{
		type:[String]
	},
	createdAt: {
		type: Date
	},
	isFull: {
		type: Boolean
	},
	latLng: {
		type:Schemas.GeoLocation,
		optional:true
	}

});

Schemas.MessageContent = new SimpleSchema({
	sender_id: {
		type: String
	},
	sender_avatar: {
		type:String
	},
	createdAt: {
		type:Date
	},
	content: {
		type:String,
		max:5000
	}
});

Schemas.Message = new SimpleSchema({
	group_id: {
		type: String
	},
	messages: {
		type: [Schemas.MessageContent]
	}
});

Schemas.FriendList = new SimpleSchema({
	user_id: {
		type:String
	},
	friend_id: {
		type: [String]
	}
});

Schemas.RecentList = new SimpleSchema({
	user_id: {
		type:String
	},
	recent_id: {
		type: [String]
	}
});

Schemas.VerificationCode = new SimpleSchema({
	phone: {
		type:String,
		optional:true
	},
	email: {
		type:String,
		optional:true
	},
	code: {
		type: Number,
		max:9999
	}
});

Meteor.users.attachSchema(Schemas.User);
Groups.attachSchema(Schemas.Group);
Messages.attachSchema(Schemas.Message);
FriendList.attachSchema(Schemas.FriendList);
RecentList.attachSchema(Schemas.RecentList);
VerificationCodes.attachSchema(Schemas.VerificationCode)
