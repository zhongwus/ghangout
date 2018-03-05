var countdown;

Template.registerEmail.events({
	'click .register-button':function(e) {

		$(e.currentTarget).addClass('disabled');
		var email = $("input[name=email]").last().val();
		var password = $("input[name=password]").last().val();
		h.register(email,password);
	},
	'click .send-verification-button':function(e) {

		$(e.currentTarget).addClass('disabled');
		var email = $("input[name=email]").last().val();

		Meteor.call('checkEmailExistance',email,function(error,result) {
			if (error) {
				alert(error);
				$(e.currentTarget).removeClass('disabled');
				Router.go('login');
				return false;
			} else {
				Meteor.call('sendVerificationEmail',email,function(error,result) {
					if (!error) {
						Session.set('CODE_SENT', true);
						countdown = new ReactiveCountdown(90);
						Session.set('START_COUNTDOWN', true);

						countdown.start(function() {

						    Session.set('START_COUNTDOWN', false);
						    $(e.currentTarget).removeClass('disabled');
							Meteor.call('removeEmailVerificationCode',email,function(error,result) {

							});
						});
					}
				});
			}
		});

	},
	'click .code-confirm-button':function() {
		var verification_code = parseInt($("input[name=verification_code]").last().val());
		var email = $("input[name=email]").last().val();
		Meteor.call('verifyEmailCode',email,verification_code,function(error,result) {
			if (!error) {
				Session.set('EMAIL_VERIFIED',true);
				Session.set('CODE_SENT', false);
				$(".register-button").last().removeClass('disabled');

				Meteor.call('removeEmailVerificationCode',email,function(error,result) {

				});

			} else {
				console.log(error.error);
			}
		});
	}
});

Template.registerEmail.onRendered(function() {
	Session.set('START_COUNTDOWN',false);
	Session.set('EMAIL_VERIFIED', false);
	Session.set('CODE_SENT', false);
});

Template.registerEmail.helpers({

    getCountdown: function() {
    	if (Session.get('START_COUNTDOWN')) {
    		return countdown ? countdown.get() : "00";
    	}
    	return "Verify";
    },
    verified:function() {
    	return Session.get('EMAIL_VERIFIED');
    },
		code_sent: function() {
			return Session.get('CODE_SENT');
		}

});
