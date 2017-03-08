var DependecySet = require('./dependency-set.js');

/**
 * @constructor DependencyCollection
 * @property {Set[]} bundles
 * @property {string[][]} dependecies
 */
function DependencyCollection() {
    this.bundles = [];
}

/**
 * @return {number}
 * @return {number} - 0 => no dependecies
 * @return {number} - 1 => add a single set dependecies
 * @return {number} - (2^i) + 1 { with i >= 1 } => add a multiple set dependecies
 */
DependencyCollection.prototype.size = function () {
    return this.bundles.length;
}

/**
 * @return {number}
 */
DependencyCollection.prototype.dependeciesSize = function () {

    if (this.bundles.length === 0)
        return 0;

    var lastDependencies = this.bundles[this.bundles.length - 1]
    return lastDependencies.name;
}

/**
 * @param {string[]} dependecies
 */
DependencyCollection.prototype.add = function (dependecies) {

    if (this.bundles.length === 0) {
        this.bundles.push(new DependecySet(1, dependecies))

    } else {

        var currPosition = this.dependeciesSize() + 1;
        // Extend current bundles
        // bundles[i] => previous set of dependecies
        // bundles[i+1] => new intersect set of dependecies
        var bundles = this.bundles
            .reduce(function (result, currSet) {
                result.push(currSet);
                result.push(new DependecySet(currSet.name + '-' + currPosition));
                return result;
            }, []);

        var len = bundles.length;
        var newBundle = new DependecySet(currPosition);

        dependecies.forEach(function (dependecy) {

            for (var i = 0; i < len; i = i + 2) {
                /**
                 * @type {DependecySet} previousBundle
                 * @type {DependecySet} newIntersectBundle
                 */
                var previousBundle = bundles[i];
                var newIntersectBundle = bundles[i + 1];

                if (previousBundle.has(dependecy)) {
                    isNewDependecy = false;
                    previousBundle.delete(dependecy);
                    newIntersectBundle.add(dependecy);
                    return;
                }
            };

            newBundle.add(dependecy);
        });

        bundles.push(newBundle);
        this.bundles = bundles;
    }
}

/**
 * @params {boolean} includeAll
 * @return
 */
DependencyCollection.prototype.toConfig = function (includeAll) {
    var result = {};
    this.bundles.forEach(function (set) {

        var files = set.toArray();

        if (files.length > 0 || includeAll)
            result[set.name] = files;
    });
    return result;
}

// export 
module.exports = DependencyCollection