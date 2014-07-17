/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    myth = require('myth'),
    fs = require('fs'),
    methodOverride = require('method-override');

// all environments
app.set('port', process.argv[2] || process.env.PORT || 3000);
app.use(methodOverride());

app.get("*.css", function(req, res) { //*.css
    var path = __dirname + req.url;
    fs.readFile(path, "utf8", function(err, data) {
        res.header("Content-type", "text/css");
        if (err) {
            console.error("Yo dawg, I heard you like files that don't exist. ", err);
            res.send("");
            return;
        }
        try {
            res.send(myth(data));
        } catch (e) {
            console.log(e);
            res.send(data);
        }
    });
});

app.use(express.static(path.join(__dirname, '')));

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});