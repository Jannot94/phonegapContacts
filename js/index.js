function contactsFind_onSuccess(contacts) {
    alert('Found ' + contacts.length + ' navigator.contacts.');
    var div = document.getElementById("contactList");

    var p = "";
    for( var i = 0; i < contacts.length; i++) {
        p = p + "<li class='list-group-item'>" + contacts[i].displayName + "</li>";
    }

    div.innerHTML = p;
/*
    $.each(contacts, function(key, contact) {
        $("#contactList").append('<li class="list-group-item">' + contact.displayName + '</li>');
    ));

*/

}

function contactsFind_onError(contactError) { 
    alert('onError!');
}

function getContacts() {
     var options     = new ContactFindOptions();
    options.filter   = "";
    options.multiple = true;
    var fields       = ["displayName", "name"];
    navigator.contacts.find(fields, contactsFind_onSuccess, contactsFind_onError, options);
}

function onDeviceReady() {
    /*var parentElement = document.getElementById("deviceready");
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');
    */
    phonegapDeferred.resolve();
    //alert('Received Event: deviceready');
}

function initialize() {
    alert('Very ready!');
    getContacts();
}

document.addEventListener('deviceready', onDeviceReady, false);

$( document ).ready(function() {
    jQueryDeferred.resolve();
    //alert('jQuery Event: document ready');
});
