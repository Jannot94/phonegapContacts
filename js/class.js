// define the Discussions class
function Discussions()
{
    this.list = null;
}

Discussions.prototype.get = function()
{
    this.list = [
        { recipients : ["benoit.toulet@gmail.com", "pgil80@yahoo.fr"] },
        { recipients : ["benoit.toulet@gmail.com"] }
    ];
}

Discussions.prototype.new = function(recipients)
{
    this.list.push( { recipients : recipients } );
}


var chats = [];

chats.init = function() {
	this.push(
		{
			recipients : ["jeansahler@gmail.com", "pgil80@yahoo.fr", "benoit.toulet@gmail.com"],
	    	chat : [
		    	{ sender : "jeansahler@gmail.com", blob : "http://fdsfsdfsd", date:"06/02/2014-12:02:51"},
		    	{ sender : "pgil80@yahoo.fr", blob : "http://fdsfsdfsd", date:"06/02/2014-12:02:42"},
		    	{ sender : "benoit.toulet@gmail.com", blob : "http://fdsfsdfsd", date:"06/02/2014-12:02:42"},
		    	{ sender : "pgil80@yahoo.fr", blob : "http://fdsfsdfsd", date:"06/02/2014-12:02:42"},
		    	{ sender : "pgil80@yahoo.fr", blob : "http://fdsfsdfsd", date:"06/02/2014-12:02:42"}
		    ]
		},
	    {
			recipients : ["jeansahler@gmail.com", "benoit.toulet@gmail.com"],
	    	chat : [
		    	{ sender : "jeansahler@gmail.com", blob : "http://fdsfsdfsd", date:"06/02/2014-12:02:51"},
		    	{ sender : "benoit.toulet@gmail.com", blob : "http://fdsfsdfsd", date:"06/02/2014-12:02:42"}
		    ]
		}
	);
}

chats.getRecipients = function(chatId) {
	console.log(this[chatId]);
	var chat = this[chatId];
	return this[chatId].recipients;
}

chats.init();