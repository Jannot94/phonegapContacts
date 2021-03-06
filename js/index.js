function contactsFind_onSuccess(contacts) {
    var res = new Array();
    var defaultImagePath = "img/defaultUser.png";

    for( var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        if( contact.emails != null ) {
            var img     = (contact.photos != null) ? contact.photos[0].value : defaultImagePath
            for (var j = 0; j < contact.emails.length; j++) {
                var emailType = contact.emails[j].type;
                var email = contact.emails[j].value;
                if(checkEmail(email)) {
                    var alreadyIn = false;
                    for (var k = 0; k < res.length; k++) {
                        if (res[k].email == email) {
                            alreadyIn = true;
                            break;
                        }
                    }
                    if (alreadyIn == false) {
                        res.push( { "emailType": emailType, "email" : email, "img" : img } );
                    }
                }
            }
        }
    }
    res.sort(SortByEmail);
    // refresh the view
    refreshContactView(res);
}

/*
function returnValidPhoto(url, callback){
    var img = new Image();
    img.onload = function() {
    //Image is ok
        callback(url);
    };
    img.onerror = function(err) {
        //Returning a default image for users without photo 
        callback("img/defaultUser.png");
    }
    img.src = url;
}
*/

function checkEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return filter.test(email);
}

function SortByEmail(a, b){
  var aEmail = a.email.toLowerCase();
  var bEmail = b.email.toLowerCase(); 
  return ((aEmail < bEmail) ? -1 : ((aEmail > bEmail) ? 1 : 0));
}



function contactsFind_onError(contactError) { 
    alert('contactsFind_onError!');
}

function getContacts() {
    var options      = new ContactFindOptions();
    options.filter   = "";
    options.multiple = true;
    var fields       = ["emails", "photos"];
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
        uploadFile( data.Result.url);
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

function uploadFile(url) {
    var ft = new FileTransfer(),
        path = mediaPlayer.src.fullPath,
        name = mediaPlayer.src.name;

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

var mediaRecorder = null;
var mediaPlayer   = null;

function start() {
    //getContacts();
}

function player_onSuccess() {
    //alert("playAudio():player_onSuccess Success");
}

function player_onError(error) {
    alert('code: ' + error.code  + '\n' +  'message: ' + error.message + '\n');
}

function recorder_onSuccess() {
    //alert("playAudio():recorder_onSuccess Success");
}

function recorder_onError(error) {
    alert('code: ' + error.code  + '\n' +  'message: ' + error.message + '\n');
}

function onDeviceReady() {
    phonegapDeferred.resolve();
}

document.addEventListener('deviceready', onDeviceReady, false);


$(document).on('pageinit', function() {
    jQueryDeferred.resolve();

    $.ajaxSetup({
        type     : "GET",
        url      : "http://vooxangels.appspot.com/ajax",
        dataType : "json",
        async    : true
    });
});

$( "#recButton" ).click(function(event) {
    mediaRec = new Media("myrecording.wav", recorder_onSuccess, recorder_onError);
    mediaRec.startRecord();
});

$( "#stopButton" ).click(function(event) {
    if (mediaRec != null) {
        mediaRec.stopRecord();
    }
});

$( "#playButton" ).click(function(event) {
    mediaPlayer = new Media("myrecording.wav", player_onSuccess, player_onError);
    mediaPlayer.play();
});

$( "#sendButton" ).click(function(event) {
    getUploadUrl("");
});

$('#discussionsList').on('click', 'li', function() {
    //alert($(this).attr('id'));
   // $.mobile.changePage("#record-page", { data: {param1:"value1"}});
    $.mobile.pageContainer.pagecontainer( "change", "#record-page", { discussionsId: $(this).attr('id') } );
});

$('#contactsList').on('click', 'li', function() {
    //alert($(this).attr('id'));
    $.mobile.changePage("#record-page");
});

$('#contacts-page' ).on( "pagebeforeshow", function( event, data ){
    getContacts();
});
$('#discussions-page' ).on( "pagebeforeshow", function( event, data ){
     refreshDiscussionsView();
});
$('#discussion-page' ).on( "pagebeforeshow", function( event, data ){
     //console.log("data");
});
$('#record-page' ).on( "pagebeforeshow", function( event, data ){
     //console.log(event);
     //console.log(data);
     //if ( data.toPage[0].id == "pageX" ) {
       //var stuff = data.options.foo;
       //console.log(event);
        //console.log( data);
   // }
});


$( document ).on( "pagebeforechange" , function ( event, data ) {
    if ( data.toPage[0].id == "record-page" ) {
        var chatIdString = data.options.discussionsId;
        var chatId = parseInt(chatIdString.replace("chatId",""));
        var recipients = chats.getRecipients(chatId);
        refreshRecordView(recipients);
    }
    if ( data.options.fromPage) {
        console.log(data.options.fromPage[0].id);
    }
    
});