/**
 * @constructor
 * @param {string} name
 * @param {string[]} [dependecies=[]]
 */
function DependecySet (name, dependecies) {
    this.name = name;
    this.dependecies = new Set(dependecies || []);
}

/**
 * @param {string} dependecy
 * @return {boolean}
 */
DependecySet.prototype.has = function(dependecy){
    return this.dependecies.has(dependecy);
}

/**
 * @param {string} dependecy
 * @return {DependecySet}
 */
DependecySet.prototype.add = function(dependecy){
    this.dependecies.add(dependecy);
    return this;
}

/**
 * @param {string} dependecy
 * @return {boolean}
 */
DependecySet.prototype.delete = function(dependecy){
    return this.dependecies.delete(dependecy);
}

/**
 * @return {number}
 */
DependecySet.prototype.size = function(){
    return this.dependecies.size;
}


/**
 * @return {string[]}
 */
DependecySet.prototype.toArray = function(){
    return Array.from(this.dependecies);
}

module.exports = DependecySet;