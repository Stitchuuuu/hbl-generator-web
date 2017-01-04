
const fs   = require('fs');
const path = require('path');
const util = require('util');
const extend = util._extend;

module.exports = new (function ExpressC() {

    /**
     * Initialise un répertoire de controlleur
     *
     * @param {String} dirpath Le répertoire à initialiser
     * @param {Application} app l'objet Application fournit par Express
     * @param {express()} express retour de la fonction express()
     */
    function initDirectory(dirpath, app, express, mainControllerFilename, relativePath) {
        var mainControllerPath = path.join(dirpath, mainControllerFilename);
        if (typeof(relativePath) === "undefined") {
            relativePath = dirpath;
        }
        if (fs.existsSync(mainControllerPath)) {
            console.log(util.format("[ExpressC] Initiating controller [%s] from path /%s", mainControllerFilename, path.relative(relativePath, dirpath)));
            var controller = require(mainControllerPath);
            controller.init(app, express);
        }

        if (app.canStartServer !== false) {
            var files = fs.readdirSync(dirpath);

            for (var i in files) {
                var filepath = path.join(dirpath, files[i]);
                if (fs.statSync(filepath).isDirectory()) {
                    initDirectory(filepath, app, express, mainControllerFilename, relativePath);
                } else if (files[i] === mainControllerFilename) {
                    continue;
                } else {
                    console.log(util.format("[ExpressC] Initiating controller [%s] from path /%s", files[i], path.relative(relativePath, dirpath)));
                    var controller = require(filepath);
                    controller.init(app, express);
                }
            }
        }
    }

    this.configure = function(options) {
        options = extend(options, {
            dirpath:        "controllers/",
            mainController: "main.controller.js",
        });
        if (!options.app) {
            throw new Error("ExpressC.configure must have the app property defined.")
        }
        if (!options.express) {
            throw new Error("ExpressC.configure must have the express property defined.")
        }
        options.app.canStartServer = true;
        initDirectory(path.join(path.dirname(module.parent.filename), options.dirpath), options.app, options.express, options.mainController);

        if (!options.app.canStartServer) {
            throw new Error("Server cannot be started, check the precedent error send by a controller.")
        }
    }
})();
