Meteor.startup(function() {

	Houston.add_collection(Meteor.users);

	//Groups.remove({});
	/*var group_data = [
		{
			category: "food",
			capacity: 3,
			content: "group message",
			owner_id: "DNEDpt9PPzLj3ExEB",
			participants_ids: ["ZH2H2nbgjwZstvQeH"],
			createdAt: new Date(),
			latLng:["123","-123"]
		},
		{
			category: "food",
			capacity: 4,
			content: "group message",
			owner_id: "DNEDpt9PPzLj3ExEB",
			participants_ids: ["ZH2H2nbgjwZstvQeH","ZH2H2nbgjwZstvQeH","ZH2H2nbgjwZstvQeH"],
			createdAt: new Date(),
			latLng:["123","-100"]
		},
		{
			category: "food",
			capacity: 5,
			content: "group message",
			owner_id: "ZH2H2nbgjwZstvQeH",
			participants_ids: ["ZH2H2nbgjwZstvQeH","ZH2H2nbgjwZstvQeH","ZH2H2nbgjwZstvQeHlf"],
			createdAt: new Date(),
			latLng:["111","-123"]
		}
	];




	if (Groups.find().count() === 0) {
		_.each(group_data,function(group) {
			Groups.insert({
				category: group.category,
				capacity: group.capacity,
				content: group.content,
				owner_id: group.owner_id,
				participants_ids: group.participants_ids,
				createdAt: group.createdAt
			})
		});
	}*/

	//console.log("groups created");
	//console.log(Groups.find({}).fetch());


	/*Messages.remove({});
	var message_data = [
		{
			group_id: "sdklfds",
			messages: [
				{
					sender_id:"12321",date:new Date(),content:"dslkfjsd"
				},
				{
					sender_id:"12321",date:new Date(),content:"dslkfjsd"
				}
			]
		}
	];

	if (Messages.find().count() === 0) {
		_.each(message_data,function(message) {
			Messages.insert({
				group_id:message.group_id,
				messages:message.messages
			})
		});
	}

	console.log("message created");
	console.log(Messages.find({}).fetch());


	FriendList.remove({});
	var friend_data = [
		{
			user_id: "sdklfds",
			friend_id: []
		}
	];

	if (FriendList.find().count() === 0) {
		_.each(friend_data,function(friendlist) {
			FriendList.insert({
				user_id:friendlist.user_id,
				friend_id:friendlist.friend_id
			})
		});
	}

	console.log("friendlist created");
	console.log(FriendList.find({}).fetch());


	RecentList.remove({});
	var recent_data = [
		{
			user_id: "sdklfds",
			recent_id: []
		}
	];

	if (RecentList.find().count() === 0) {
		_.each(recent_data,function(recentlist) {
			RecentList.insert({
				user_id:recentlist.user_id,
				recent_id:recentlist.recent_id
			})
		});
	}

	console.log("recentlist created");
	console.log(RecentList.find().fetch());*/

});
