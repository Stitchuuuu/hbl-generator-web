
const path = require('path');
const os   = require('os');
const util = require('util');

var express          = require('express');
var expressc = require('./helpers/expressc.js');

function getIfacesIP() {

    var ifaces = os.networkInterfaces();
    var ifacesIPs = [];
    Object.keys(ifaces).forEach(function (ifname) {
      var alias = 0;

      ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }
        ifacesIPs.push(iface);
      });
    });
    return ifacesIPs;
}


var app = express();

expressc.configure({
    app:     app,
    express: express
});

app.server = app.listen(3000, function () {
    var ips = getIfacesIP();
    ips.forEach(function(iface) {
        console.log(util.format("[ExpressJS] Écoute sur l'adresse : http://%s:%s", iface.address, 3000));
    });
});

