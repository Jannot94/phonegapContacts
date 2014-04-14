function contactsFind_onSuccess(contacts) {
    for( var i = 0; i < contacts.length; i++) {
        if( contacts[i].emails != null ) {
            for( var j = 0; j < contacts[i].emails.length; i++) {
                $("#contactList").append('<li class="list-group-item">' + contacts[i].emails[j].value + '</li>');
            }
        }
    }
}

function contactsFind_onError(contactError) { 
    alert('contactsFind_onError!');
}

function getContacts() {
    var options      = new ContactFindOptions();
    options.filter   = "";
    options.multiple = true;
    var fields       = ["emails"];
    navigator.contacts.find(fields, contactsFind_onSuccess, contactsFind_onError, options);
}

function start() {
    getContacts();
}

function onDeviceReady() {
    phonegapDeferred.resolve();
}

document.addEventListener('deviceready', onDeviceReady, false);

$( document ).ready(function() {
    jQueryDeferred.resolve();
});