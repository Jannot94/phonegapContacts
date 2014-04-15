function contactsFind_onSuccess(contacts) {
    var res = new Array();
    for( var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        if( contact.emails != null ) {
            for( var j = 0; j < contact.emails.length; j++) {
                var email = contact.emails[j].value;
                if(checkEmail(email)) {
                    //$.merge(res, new Array(email));
                    res.push(email);
                }
            }
        }
    }
    // Remove duplicates in the array
    res = unique(res);
    // Sort the array in alphabetical order
    res.sort(SortByEmail);
    // refresh the view
    refreshContactView(res);
}

function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
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
        $("#contactsList").append('<li class="list-group-item">' + contacts[i] + '</li>');
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

function captureAudio() {
    navigator.device.capture.captureAudio(captureSuccess, captureError, {limit: 1});
}

function captureSuccess(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        getUploadUrl(mediaFiles[i]);
    }       
}

function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
}

function getUploadUrl(fileToUpload) {

    var recipients = [];
    
    var data = {
        method : "GetUploadUrl"/*,
        recipients : "test@email.fr"*/
    };
    
    $.ajax({
        data     : data
    })
    .done(function( data ) {
        alert("url to uplad : " + data.Result.url);
        uploadFile(fileToUpload, data.Result.url);
    })
    .fail( function() {
        alert("ajax failed");
    });
}

function sendRecording(urlToUpload) {
    
    var fd = new FormData();
    //fd.append('myFile', 'test.wav');
    fd.append('data', currentBlob);
    
    $.ajax({
        type: "POST",
        url: urlToUpload,
        data: fd,
        processData: false,
        contentType: false
    })
    .done(function(data) {
        alert("Recording saved in blob store");
    })
    .fail( function() {
        alert("sendRecording failed");
    });
}

function uploadFile(mediaFile, url) {
    var ft = new FileTransfer(),
        path = mediaFile.fullPath,
        name = mediaFile.name;

    ft.upload(path,url,
        function(result) {
            //console.log('Upload success: ' + result.responseCode);
            alert(result.bytesSent + ' bytes sent');
        },
        function(error) {
            alert('Error uploading file ' + path + ': ' + error.code);
        },
        { fileName: name });
}

function start() {
    getContacts();
}

function onDeviceReady() {
    phonegapDeferred.resolve();
}

document.addEventListener('deviceready', onDeviceReady, false);

/*
$( document ).ready(function() {
    jQueryDeferred.resolve();
});
*/

var mediaRec = null;

function record() {

    mediaRec = new Media("myrecording.mp3",
        // success callback
        function() {
            alert("recordAudio():Audio Success");
        },

        // error callback
        function(err) {
            alert("recordAudio():Audio Error: "+ err.code);
        }
    );

    // Record audio
    mediaRec.startRecord();
}

function stop() {
    alert("stopRecord()");
    mediaRec.stopRecord();
}

$(document).on('pageinit', function() {
    jQueryDeferred.resolve();

    $.ajaxSetup({
        type     : "GET",
        url      : "http://vooxangels.appspot.com/ajax",
        dataType : "json",
        async    : true
    });
});
$( "#sendButton" ).click(function(event) {
    //event.preventDefault();
    getUploadUrl("");
});

$( "#stopButton" ).click(function(event) {
    //event.preventDefault();
    stop();
});

$( "#recButton" ).click(function(event) {
    //event.preventDefault();
    record("");
});