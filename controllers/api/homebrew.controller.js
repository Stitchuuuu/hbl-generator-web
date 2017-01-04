/**
 * Controlleur lié à la page d'accueil du site, c'est à dire /
 */
const HomebrewHelper = require("../../helpers/homebrew.helper.js");

module.exports = new (function() {

    function get(req, res) {
        HomebrewHelper.get(req).then(function(listHomebrew) {
            res.json(listHomebrew);
        });
    }

    this.init = function(app, express) {
         app.get("/api/homebrew", get);
    };
})();
