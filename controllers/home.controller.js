/**
 * Controlleur lié à la page d'accueil du site, c'est à dire /
 */
module.exports = new (function() {

    function get(req, res) {
        res.render("index.html", {title: "Accueil", viewers: []});

    }

    this.init = function(app, express) {
         app.get("/", get);
    };
})();
