/**
 * Controlleur API
 */

module.exports = new (function() {

    function prefilter(req, res, next) {
        req.app.set("etag", false); // On enlève le etag pour éviter la mise en cache automatique des données
        next();
        postfilter(req, res);
    }

    function postfilter(req, res) {

    }

    this.init = function(app, express) {
        app.use("/api/", prefilter);
    };
})();
