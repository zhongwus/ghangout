Meteor.startup(function () {
  smtp = {
    username: 'rocghangout@gmail.com',   // eg: server@gentlenode.com
    password: 'kavxuqwlqmdmahlj',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 465
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

  /*Accounts.sms.configure({
	twilio: {
	from: "+14804188808",
	sid: "AC86d5049dbb567b312c5bbe452b4c955d",
	token: "a28bf25f6535c5cebfbebd1b9d83fb52"
	}
  });*/
});
