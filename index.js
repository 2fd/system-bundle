var Builder = require('systemjs-builder');
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var DependencyCollection = require('./dependency-collection');

/**
 * Calculate sha1 for filecontent
 * @param {string} content
 * @returns {string}
 */
function hash(content) {
    var hash = crypto.createHash('sha1');
    hash.update(content);
    return hash.digest('hex');
}

/**
 * @param {string[]} entrypoints
 * @param {string} [outputDir]
 * @param {{}}} [options]
 * @param {boolean} [options.minify=true]
 * @param {boolean} [options.mangle=true]
 * @param {*} [options.globalDefs={}]
 */
Builder.prototype.smart = function (entrypoints, outputDir, options) {

    var b = this;

    if (typeof outputDir === 'object') {
        options = outputDir
        outputDir = undefined;
    }

    if(outputDir){
        outputDir = fs.realpathSync(path.resolve(outputDir));
        outputStats = fs.statSync(outputDir)

        if(!outputStats.isDirectory()) {
            throw new TypeError(outputDir + ' is not a directory');
        
        }
    }

    options = Object.assign({
        minify: true,
        mangle: false,
        globalDefs: {},
    }, options || {});

    return Promise.all(
            entrypoints
            .map(function (entrypoint) {
                return b
                    .trace(entrypoint)
                    .then(Object.keys)
            })
        )
        .then(function (dependenciesByEntrypoint) {

            var collection = new DependencyCollection();
            dependenciesByEntrypoint
                .forEach(function (dependencies) {
                    collection.add(dependencies);
                });

            var bundles = collection
                .bundles
                .filter(function (set) {
                    return set.size() > 0
                });

            return Promise.all(bundles
                .map(function (set) {
                    return b.bundle(set.toArray(), options)
                        .then(function (result) {
                            result.hash = hash(result.source);
                            result.name = result.hash + '.bundle.js';

                            if(outputDir){
                                result.path = path.resolve(outputDir, result.name);
                                fs.writeFileSync(result.path, result.source);
                            }

                            return result;
                        });
                })
            );
        })
}