const fs = require('fs');
const xml2js = require('xml2js').parseString;

module.exports = new (function() {


    function GetHomebrewInfoXML(req, path) {
        return function(resolve, reject) {
            var descFileXML = fs.readFileSync(path);
            xml2js(descFileXML, function(err, descFileObj) {
                var descriptionsXML = descFileObj.desc.description;
                var descriptions = {};
                descriptionsXML.forEach(function(description) {
                    descriptions[description.$.lang] = description._;
                });
                var langForBrowser = req.acceptsLanguages.apply(req, Object.keys(descriptions));
                if (langForBrowser === false) {
                    langForBrowser = "en";
                }

                resolve({
                    name: descFileObj.desc.name.pop(),
                    lang: langForBrowser,
                    description: descriptions[langForBrowser],
                    version: descFileObj.desc.version.pop()
                });
            });
        };
    }

    this.get = function(req) {
        var rootHomebrewDirectory = "data/homebrew/";
        var folders = fs.readdirSync(rootHomebrewDirectory);
        var listHomebrew = [];
        var promisesXML = [];
        for (var i = 0; i < folders.length; i++) {
            var folder = rootHomebrewDirectory+folders[i];
            if (fs.statSync(folder).isDirectory()) {
                promisesXML.push(new Promise(GetHomebrewInfoXML(req, folder+"/desc.xml")));
            }
        }
        return Promise.all(promisesXML);
    };

})();
