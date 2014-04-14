function contactsFind_onSuccess(contacts) {
    // alert('Found ' + contacts.length + ' navigator.contacts.');
    for( var i = 0; i < contacts.length; i++) {
        $("#contactList").append('<li class="list-group-item">' + contacts[i].displayName + '</li>');
    }
}

function contactsFind_onError(contactError) { 
    alert('onError!');
}

function getContacts() {
    var options      = new ContactFindOptions();
    options.filter   = "";
    options.multiple = true;
    var fields       = ["displayName"];
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