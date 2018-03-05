Meteor.methods({
	'registerByEmail':function(email,password) {
		var profile = {};
		profile.avatar = "/images/default-avatar.jpg";
		var id = Accounts.createUser({
			email:email,
			password:password,
			profile:profile,
			myGroupsId:[]
		});
		return id;
	},

	'registerByPhone':function(phone,password) {
		var profile = {};
		profile.avatar = "/images/default-avatar.jpg";
		var id = Accounts.createUser({
			username:phone,
			password:password,
			profile:profile,
			myGroupsId:[]
		});
		return id;
	},

	'sendVerificationEmail':function(receiver) {

		var veri_code = Math.floor((Math.random() * 9000) + 1000);

		VerificationCodes.insert({
			email:receiver,
			code:veri_code
		});

	    Email.send({
	      to: receiver,
	      from: "hello@hotmail.com",
	      subject: "test email",
	      text: veri_code + ""
	    });
	},

	'sendVerificationPhone':function(receiver) {

		var veri_code = Math.floor((Math.random() * 9000) + 1000);

		VerificationCodes.insert({
			phone:receiver,
			code:veri_code
		});

		var twilio = Twilio("AC679bffe89ef17a177801dc4493f8015f", "3a7b022679f456b05781162e6dd7d080");
	    twilio.sendSms({
	      to:receiver, // any number Twilio can deliver to// must be your Twilio account phone number
	      from:"+14804188808",
	      body: veri_code
	    }, function(err, responseData) { //executed when a response is received from Twilio
	      if (!err) {
	        // "responseData" is a JavaScript object containing data received from Twilio.
	        console.log(responseData.body);
	      } else {
	      	console.log(err);
	      } // outputs "here is your confirmaton"
	    });
	},
	'removeEmailVerificationCode':function(receiver) {
		VerificationCodes.remove({email:receiver});
	},

	'removePhoneVerificationCode':function(receiver) {
		VerificationCodes.remove({phone:receiver});
	},

	'verifyEmailCode':function(receiver,code) {
		if (!VerificationCodes.findOne({email:receiver,code:code})) {
			throw new Meteor.Error("Confirmation code does not match.");
		}
		//VerificationCodes.findOne({email:receiver,code:code}).fetch();
	},

	'verifyPhoneCode':function(receiver,code) {
		if (!VerificationCodes.findOne({phone:receiver,code:code})) {
			throw new Meteor.Error("Confirmation code does not match.");
		}
		//VerificationCodes.findOne({email:receiver,code:code}).fetch();
	},

	'checkEmailExistance':function(email) {
		check(email,String);
		if (Meteor.users.findOne({"emails.address":email})) {
			throw new Meteor.Error("User already exists.");
		};
	},

	'checkPhoneExistance':function(phone) {
		check(phone,String);
		if (Meteor.users.findOne({username:phone})) {
			throw new Meteor.Error("User already exists.");
		};
		console.log("user not found");
	},

	'addGroup':function(info) {

		var response = Async.runSync(function(done) {
			Groups.insert({
				category:info.category,
				capacity:info.size,
				content:info.content,
				owner_id:info.owner_id,
				participants_ids:[info.owner_id],
				temp_participants_ids:[],
				createdAt:new Date(),
				isFull:false,
				blacklist:[],
				owner_profile:info.owner_profile,
				latLng:info.latLng
			},function(err,result) {
				if (err) {
					throw new Meteor.Error(500,err);
				} else {
					Messages.insert({
						group_id:result,
						messages:[]
					},function(err,result2) {
						if (err) {
							throw new Meteor.Error(500,err);
						} else {
							Meteor.users.update({ _id: info.owner_id },{$push:{myGroupsId:result}},function(err,result3) {
								if (err) {
									throw new Meteor.Error(500,err);
								} else {
										done(err,result);
								}
							});
						}
					});
				}
			});
		});
		return response.result;
	},
	'getLatLng':function(location) {
		check(location,String);
		var geo = new GeoCoder({
			geocoderProvider: "google",
			apiKey: Meteor.settings.googleServerApiKey,
			httpAdapter: "https"
		});
		return geo.geocode(location);
	},
	'updateProfile':function(profile) {
		var userId = Meteor.userId();
		Meteor.users.update({ _id: userId },{$set:{profile:profile}});
	},
	'getMyGroups':function() {
		return Meteor.user().myGroupsId;
	},
	'sendMessage':function(json) {
		var messages = {};
		messages.sender_id = json.sender_id;
		messages.sender_avatar = json.sender_avatar;
		messages.createdAt = new Date();
		messages.content = json.content;
		var group_id = json.group_id;
		Messages.update(
			{group_id:group_id},
			{
				$push: {
					messages:messages
				}
			}
		);
	},
	'insertTempParticipant':function(group_id,temp_participant_id) {
		Groups.update(
			{_id:group_id},
			{
				$addToSet: {
					temp_participants_ids:temp_participant_id
				}
			}
		);

		var group = Groups.findOne({_id:group_id});
		var temp = group.temp_participants_ids;
		var real = group.participants_ids;
		var all_member = _.union(temp,real);
		if (all_member.length >= group.capacity) {
			Groups.update(
				{_id:group_id},
				{
					$set:
						{
							isFull:true
						}
				}
			);
		}

	},
	'insertParticipant':function(group_id,participant_id) {
		Groups.update(
			{_id:group_id},
			{
				$addToSet: {
					participants_ids:participant_id
				}
			}
		,function(err,result) {
			if (!err) {
				Meteor.users.update(
					{_id:participant_id},
					{$addToSet:{myGroupsId:group_id}},
					function(err,result1) {
							if (!err) {

							} else {
								console.log(err);
							}
					});
			}
		});

	},
	'quitGroup':function(group_id,user_id) {
		console.log(group_id);
		console.log(user_id);
		var group = Groups.findOne({_id:group_id});

		if (group.owner_id === user_id) {
			Groups.remove({_id:group_id});
			Messages.remove({group_id:group_id});
			Meteor.users.update(
				{_id:user_id},
				{
					$pull: {
						myGroupsId:group_id
					}
				}

			);

		} else {
			Groups.update(
				{_id:group_id},
				{
					$pull: {
						participants_ids:user_id
					},
					$set: {
						isFull:false
					}
				},function(err,result) {
					if (!err) {
						Meteor.users.update(
							{_id:user_id},
							{
								$pull: {
									myGroupsId:group_id
								}
							}

						);
					}
				}
			);
		}
	},
	'removeUserFromGroup':function(group_id,user_id) {
		Groups.update(
			{_id:group_id},
			{
				$pull: {
					temp_participants_ids:user_id,
					participants_ids:user_id
				},
				$set: {
					isFull:false
				},
				$addToSet: {
					blacklist:user_id
				}
			},function(err,result) {
				if (!err) {
					Meteor.users.update(
						{_id:user_id},
						{
							$pull: {
								myGroupsId:group_id
							}
						}

					);
				}
			}
		);
	},
	'removeTempParticipant':function(group_id,temp_participant_id) {

		Groups.update(
			{_id:group_id},
			{
				$pull: {
					temp_participants_ids:temp_participant_id
				}
			}
		);

		var group = Groups.findOne({_id:group_id});
		var real = group.participants_ids;
		if (_.indexOf(real,temp_participant_id) === -1) {
			Groups.update(
				{_id:group_id},
				{
					$set:
						{
							isFull:false
						}
				}
			);
		}
	},
	'getUserInfo':function(groupMemberArray) {

		return Meteor.users.find({_id:{$in:groupMemberArray}}).fetch();
	}
});
