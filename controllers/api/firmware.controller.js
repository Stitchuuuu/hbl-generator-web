/**
 * Controlleur lié à la page d'accueil du site, c'est à dire /
 */

var FirmwareHelper = require("../../helpers/firmware.helper.js");

module.exports = new (function() {

    function get(req, res) {

        var versions = FirmwareHelper.get(req.query.name);
        var data = [];
        Object.keys(versions).forEach(function(key) {
            data.push({
                value: key,
                label: versions[key]
            });
        });

        res.json(data);
    }

    this.init = function(app, express) {
         app.get("/api/firmware", get);
    };
})();
