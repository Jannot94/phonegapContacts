
function refreshRecordView(recipients) {
    $('#recipients').empty();
    for( var i = 0; i < recipients.length; i++) {
        $("#recipients").append('<input type="button" id="recipientId'+ i + '" data-icon="delete" data-mini="true" data-iconpos="right" data-inline="true" value="' + recipients[i] + '">');
    }
    $('#record-page').trigger('create');
}

function refreshDiscussionsView() {
    var discussions = new Discussions();
    discussions.get();
    $("#discussionsList").empty();
    for( var i = 0; i < chats.length; i++) {
        $("#discussionsList").append('<li id="chatId' + i + '"><img src="img/defaultChat.png"/>' +  chats.getRecipients(i).join(", ") + '</li>');
    }
    $( "#discussionsList" ).listview( "refresh" );
}

function refreshContactView(contacts) {
    for( var i = 0; i < contacts.length; i++) {
        $("#contactsList").append('<li class="list-group-item"><img src="'+ contacts[i].img +'"/>' +  contacts[i].emailType + " : " + contacts[i].email + '</li>');
    }
}