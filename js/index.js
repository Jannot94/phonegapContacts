function contactsFind_onSuccess(contacts) {
    var res = new Array();
    for( var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        if( contact.emails != null ) {
            for( var j = 0; j < contact.emails.length; j++) {
                var email = contact.emails[j].value;
                if(checkEmail(email)) {
                    $.merge(res, new Array(email));
                    //res.push(email);
                }
            }
        }
    }
    res.sort(SortByEmail);
    refreshContactView(res);
}

function checkEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return filter.test(email);
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