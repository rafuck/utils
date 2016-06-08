//blah
var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),


var isReports  = false;
var reportsDir = './report';

page.viewportSize = {
    width: 1400,
    height: 800
};

function loginURL(){
    return 'http://login/URL';
}

function spiderEntryURL(){
    return "http://spider/first/request";
}

// -----------------------------------------------------------
var requestCounter = 0;

if(isReports){
    fs.makeDirectory(reportsDir);
}

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.onPageReady = function(msg){
    requestCounter++;

    if (msg.type == 'onReady'){
        page.evaluate(function() {
            console.log('function evaluated in page context');
            page.onPageReady({
                type: 'onSpiderDone'
            });
        });
    }
    else if(msg.type == 'onSpiderDone'){
        console.log('Spider done');
        if (isReports){
            page.render(reportsDir+('00000'+requestCounter).slice(-5)+'.png');
        }
    }
    else{
        console.log(msg.type);
    }
};

function Logout(onSuccess){
    // -- IF Logout before Login is needed --
    /* 
    page.open("logoutURL", function (status) {
        if (onSuccess instanceof Function){
            onSuccess();
        }
    });
    */
    if (onSuccess instanceof Function){
        onSuccess();
    }
}

function Login(){
    page.open(loginURL(), 'POST', 'login=USER&passwd=PASSWD', function(status) {
        SpiderEntry();
    });
}

function SpiderEntry(){
    page.open(spiderEntryURL(), function(status){
        page.onPageReady({
            type: 'onReady'
        });
    });
}


Logout(Login);