/**
 * Controlleur permettant d'initialiser les middleware
 */

const path = require('path');

var nunjucks   = require('nunjucks');
var bodyParser = require('body-parser');
var fs         = require('fs');

module.exports = new (function() {

    /**
     * Fonction exécutée avant toute action d'un controlleur
     */
    function prefilter(req, res, next) {
        next();
        postfilter(req, res);
    }

    /**
     * Fonction exécutée après toute action d'un controlleur
     */
    function postfilter(req, res) {

    }

    this.init = function(app, express) {


        nunjucks.configure('views', {
            autoescape: true,
            express: app,
            noCache: true
        });

        app.use(express.static('public'));
        app.use('/views', express.static('views/partial'));
        app.get('/homebrew/*/icon.png', function(r, s, n){
            s.sendFile(path.resolve('data/'+r.path));
        });

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        try {
            fs.writeFileSync("public/js/templates.js", nunjucks.precompile("views/partial", {include: [".*"]}));
        } catch (err) {
            console.log("[nunjucks] Can't generate templates.js file in [main.controller.js]. Server will not be started.");
            app.canStartServer = false;
        }
    };
})();
