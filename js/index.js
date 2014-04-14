function contactsFind_onSuccess(contacts) {
    //var res = [];
    for( var i = 0; i < contacts.length; i++) {
        if( contacts[i].emails != null ) {
            for( var j = 0; j < contacts[i].emails.length; i++) {
                //res.push( contacts[i].emails[j].value );
                $("#contactList").append('<li class="list-group-item">' + contacts[i].emails[j].value + '</li>');
            }
        }
    }
    //res.sort(SortByEmail);
    //refreshContactView(res);
}

function SortByEmail(a, b){
  var aEmail = a.toLowerCase();
  var bEmail = b.toLowerCase(); 
  return ((aEmail < bEmail) ? -1 : ((aEmail > bEmail) ? 1 : 0));
}

function refreshContactView(contacts) {
    for( var i = 0; i < contacts.length; i++) {
        $("#contactList").append('<li class="list-group-item">' + contacts[i] + '</li>');
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