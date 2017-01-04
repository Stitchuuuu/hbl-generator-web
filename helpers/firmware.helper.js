const util         = require('util');

var FirmwareList   = require("./firmware.list.js");

module.exports = new (function() {


    function getVersions(prefix, versions) {
        var results = [];
        Object.keys(versions).forEach(function(key) {
            var iteration = false;

            var newPrefix = prefix+"."+key;
            var recursiveResults = getVersions(newPrefix, versions[key]);

            if (!recursiveResults.length) {
                results.push(newPrefix.split("."));
            } else {
                results = results.concat(recursiveResults);
            }

        });
        return results;
    }

     this.get = function(version) {
        var partsVersion = version.split(".");
        var currentListFirmware = FirmwareList;
        for (var i = 0; i < partsVersion.length-1; i++) {
            var partVersion = partsVersion[i];
            currentListFirmware = currentListFirmware[partVersion];
        }

        var lastPart = partsVersion.pop();
        var versionsArray = [];
        var versions = {};

        // On récupère uniquement la dernière partie qui corresponds
        // Ex: 11.2 => 11.2, 11.21, 11.23, ...
        for (var firmwarePartVersion in currentListFirmware) {
            if (firmwarePartVersion.indexOf(lastPart) === 0) {
                versions[firmwarePartVersion] = currentListFirmware[firmwarePartVersion];
            }
        }
        versionsArray = getVersions(partsVersion.join("."), versions);

        var format = "%s.%s.%s.%s %s";
        versions = {};

        versionsArray.forEach(function(versionArray) {
            var args = versionArray;
            var id = args.join("_");
            args.unshift(format);
            versions[id] = util.format.apply(this, args);
        });


        return versions;
    };


})();
