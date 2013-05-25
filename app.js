
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , twilio = require('twilio')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//make twilio connection
var TWILIO_ACCOUNT_SID = "";
var TWILIO_AUTH_TOKEN = "";
var client = new twilio.RestClient('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');


app.get('/', routes.index);
app.get('/users', user.list);
app.get('/twilio',function(req,res){
  var resp = new twilio.TwimlResponse();
   
    // The <Gather> verb requires nested TwiML, so we pass in a function
    // to generate the child nodes of the XML document
  resp.gather({ timeout:30, finishOnKey:"#", action:"/process_gather", method:"GET" }, function() {
 
        // In the context of the callback, "this" refers to the parent TwiML
        // node.  The parent node has functions on it for all allowed child
        // nodes. For <Gather>, these are <Say> and <Play>.
        this.say('Enter');
 
    });
 
  
   // The TwiML response object will have functions on it that correspond
    // to TwiML "verbs" and "nouns".  This example uses the "Say" verb.
    // Passing in a string argument sets the content of the XML tag.
    // Passing in an object literal sets attributes on the XML tag.
   // resp.say({voice:'woman'}, 'Enter Phone Num');
 
    //Render the TwiML document using "toString"
    res.writeHead(200, {
        'Content-Type':'text/xml'
    });
    res.end(resp.toString());
 
});

app.get('/process_gather',function(req,res){
  console.log(req.query.Digits);
 var numbertodial=  req.query.Digits;
    var resp = new twilio.TwimlResponse();
    resp.dial(numbertodial);
      //Render the TwiML document using "toString"
    res.writeHead(200, {
        'Content-Type':'text/xml'
    });
    res.end(resp.toString());
});

        

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
