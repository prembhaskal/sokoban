//TODO -Remove unnecessary comments

var gameController = null;

function initializeGame(table) {
    gameController = new GameController();
    gameController.initializeGame(table);
}

function playNextLevel(table) {
    gameController.playNextLevel(table);
    hidePopUp();
}

function playPreviousLevel(table) {
    gameController.playPreviousLevel(table);
    hidePopUp();
}

function resetPresentLevel(table) {
    gameController.resetPresentLevel(table);
    hidePopUp();
}

function undoMove() {
    gameController.undoMove();
}

function hidePopUp() {
    SokobanUtil.hidePopUp();
}


function showPopUp() {
    SokobanUtil.displayPopUp();
}


function menuAction() {
    gameController.menuAction();
}
function menuPrev() {
    gameController.menuPrev();
}
function menuNext() {
    gameController.menuNext();
}
function init() {
    initializeGame(getTable());
}

function startNextLevel() {
    playNextLevel(getTable());
}

function startPreviousLevel() {
    playPreviousLevel(getTable());
}

function replayPresentLevel() {
    resetPresentLevel(getTable());
}

function undo() {
    undoMove();
}

function getTable() {
    return SokobanUtil.getTable();
}

function showModalWindow() {
    showPopUp();
}

function hideModalWindow() {
    hidePopUp();
}

function addOnClickListener(elementId, clickListener) {
    if (document.getElementById(elementId) != undefined)
        document.getElementById(elementId).addEventListener('click', clickListener, false);
}

function sendAjax() {
    console.log('sending ajax request');
    $.ajax({
              url: "http://1-dot-testsoko.appspot.com/gae_test1",
              cache: true
            })
              .done(function( html ) {
                console.log('call success');
                console.log(html);
              });
              
    console.log('getting user identity');
    
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
         if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        }
        else {
            console.log('got some token ' + token);
            getUserInfo(token);
        }
    });
}

function getUserInfo(access_token) {
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/plus/v1/people/me',
        headers: {'Authorization' : 'Bearer ' + access_token}
    })
     .done(function(data){
         console.log('got response for user information');
         console.log(data);
         
         if (data) {
             var emails = data['emails'];
			 var email = emails['0'];
			 var userEmail = ((email && email['type']==='account') ? email['value'] : 'not present');
			 
			 console.log('users email id is ' + userEmail);
         }
     });
}

// Add all the event listeners below
$(document).ready(function () {
    window.addEventListener('load', init, false);
    // showWindow is used only for test purpose.
    addOnClickListener('showWindow', showModalWindow);
    addOnClickListener('button_popup_pre_level', startPreviousLevel);
    addOnClickListener('button_popup_next_level', startNextLevel);
    addOnClickListener('button_popup_reset_level', replayPresentLevel);
    addOnClickListener('button_pre_level', startPreviousLevel);
    addOnClickListener('button_next_level', startNextLevel);
    addOnClickListener('button_reset_level', replayPresentLevel);
    addOnClickListener('button_undo_move', undo);
    addOnClickListener('menubtn', menuAction);
    addOnClickListener('menuprevbtn', menuPrev);
    addOnClickListener('menunextbtn', menuNext);
    addOnClickListener('send_ajax_request', sendAjax);
});



