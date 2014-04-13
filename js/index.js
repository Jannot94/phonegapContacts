function contactsFind_onSuccess(contacts) {
    alert('Found ' + contacts.length + ' navigator.contacts.');

    var div = document.getElementById("contactList");

    var p = "";
    for( var i = 0; i < contacts.length; i++) {
        p = p + "<p>"+contacts[i].displayName + "</p>";
    }

    div.innerHTML = p;
    //var contact = 
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
    var fields       = ["displayName"];
    navigator.contacts.find(fields, contactsFind_onSuccess, contactsFind_onError, options);
}

function initialize() {
    document.addEventListener('deviceready', onDeviceReady, false);
}