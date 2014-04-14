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

function onDeviceReady() {
    /*var parentElement = document.getElementById("deviceready");
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');
    */
    alert('Received Event: deviceready');

    // find all contacts with 'Bob' in any name field
    var options      = new ContactFindOptions();
    options.filter   = "";
    options.multiple = true;
    var fields       = ["displayName", "name"];
    navigator.contacts.find(fields, contactsFind_onSuccess, contactsFind_onError, options);
}

function initialize() {
    document.addEventListener('deviceready', onDeviceReady, false);
}

/*
$( document ).ready(function() {
    alert('jQuery Event: document ready');
});
*/