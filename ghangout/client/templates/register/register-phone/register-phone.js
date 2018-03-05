var countdown;

Template.registerPhone.events({
	'click .register-button':function(e) {

		$(e.currentTarget).addClass('disabled');
		var phone = $("input[name=phone]").last().val();
		var password = $("input[name=password]").last().val();

		Meteor.call('registerByPhone',phone,password,function(err,result) {
			if (!err) {
				Meteor.loginWithPassword(phone, password, function(e) {

				});
			} else {
				console.log(err);
			}
		});
	},
	'click .send-verification-button':function(e) {

		$(e.currentTarget).addClass('disabled');
		var phone = $("input[name=phone]").last().val();

		Meteor.call('checkPhoneExistance',phone,function(error,result) {
			if (error) {
				alert(error);
				$(e.currentTarget).removeClass('disabled');
				Router.go('login');
				return false;
			} else {
				Meteor.call('sendVerificationPhone',phone,function(error,result) {
					if (!error) {
						Session.set("CODE_SENT",true);
						countdown = new ReactiveCountdown(90);
						Session.set('START_COUNTDOWN', true);

						countdown.start(function() {

						    Session.set('START_COUNTDOWN', false);
						    $(e.currentTarget).removeClass('disabled');
							Meteor.call('removePhoneVerificationCode',phone,function(error,result) {

							});

						});
					} else {
						console.log("error sending verification code.");
					}
				});
			}
		});

	},
	'click .code-confirm-button':function() {
		var verification_code = parseInt($("input[name=verification_code]").last().val());
		var phone = $("input[name=phone]").last().val();
		Meteor.call('verifyPhoneCode',phone,verification_code,function(error,result) {
			if (!error) {
				Session.set('PHONE_VERIFIED',true);
				Session.set("CODE_SENT",false);
				$(".register-button").last().removeClass('disabled');

				Meteor.call('removePhoneVerificationCode',phone,function(error,result) {

				});

			} else {
				console.log(error.error);
			}
		});
	}
});

Template.registerPhone.onRendered(function() {
	Session.set('START_COUNTDOWN',false);
	Session.set('PHONE_VERIFIED', false);
});

Template.registerPhone.helpers({

    getCountdown: function() {
    	if (Session.get('START_COUNTDOWN')) {
    		return countdown ? countdown.get() : "00";
    	}
    	return "Verify";
    },
    verified:function() {
    	return Session.get('PHONE_VERIFIED');
    },
		code_sent:function() {
			return Session.get('CODE_SENT');
		}

});
