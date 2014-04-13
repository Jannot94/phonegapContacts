function contactsFind_onSuccess(contacts) {
    alert('Found ' + contacts.length + ' navigator.contacts.');
}

function contactsFind_onError(contactError) { 
    alert('onError!');
}

function onDeviceReady() {
    var parentElement = document.getElementById("deviceready");
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    alert('Received Event: deviceready');

    // find all contacts with 'Bob' in any name field
    var options      = new ContactFindOptions();
    options.filter   = "Jean";
    options.multiple = true;
    var fields       = ["displayName", "name"];
    navigator.contacts.find(fields, contactsFind_onSuccess, contactsFind_onError, options);
}

function initialize() {
    document.addEventListener('deviceready', onDeviceReady, false);
}