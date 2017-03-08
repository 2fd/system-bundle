var DependencyCollection = require('./dependency-collection');

describe('DependencyCollection', function () {

    var a = ['a.js', 'b.js', 'c.js', 'd.js', 'f.js'];
    var b = ['c.js', 'd.js', 'f.js', 'g.js', 'h.js'];
    var c = ['x.js', 'y.js', 'z.js'];
    var d = ['f.js', 'g.js', 'm.js', 'n.js'];
    var e = ['d.js', 'g.js', 'n.js', 'z.js'];

    it('#size', function(){
        var collection = new DependencyCollection;

        // no dependency
        expect(collection.size()).toEqual(0);

        // 1 dependency
        collection.add(a);
        expect(collection.size()).toEqual(1);

        // 2 dependency
        collection.add(b);
        expect(collection.size()).toEqual(3);

        // 3 dependency
        collection.add(c);
        expect(collection.size()).toEqual(7);

        // 4 dependency
        collection.add(d);
        expect(collection.size()).toEqual(15);

        // 5 dependency
        collection.add(e);
        expect(collection.size()).toEqual(31);
    })

    it('#dependeciesSize', function(){
        var collection = new DependencyCollection;

        // no dependency
        expect(collection.dependeciesSize()).toEqual(0);

        // 1 dependency
        collection.add(a);
        expect(collection.dependeciesSize()).toEqual(1);

        // 2 dependency
        collection.add(b);
        expect(collection.dependeciesSize()).toEqual(2);

        // 3 dependency
        collection.add(c);
        expect(collection.dependeciesSize()).toEqual(3);

        // 4 dependency
        collection.add(d);
        expect(collection.dependeciesSize()).toEqual(4);

        // 5 dependency
        collection.add(e);
        expect(collection.dependeciesSize()).toEqual(5);
    })

    it('#toConfig', function(){
        var collection = new DependencyCollection;

        // no dependency
        expect(collection.toConfig()).toEqual({});

        // 1 dependency
        collection.add(a);
        expect(collection.toConfig()).toEqual({
            '1': ['a.js', 'b.js', 'c.js', 'd.js', 'f.js']
        });
        expect(collection.toConfig(true)).toEqual({
            '1': ['a.js', 'b.js', 'c.js', 'd.js', 'f.js']
        });

        // 2 dependency
        collection.add(b);
        expect(collection.toConfig()).toEqual({
            '1': ['a.js', 'b.js'],
            '1-2': ['c.js', 'd.js', 'f.js'],
            '2': ['g.js', 'h.js'],
        });
        expect(collection.toConfig(true)).toEqual({
            '1': ['a.js', 'b.js'],
            '1-2': ['c.js', 'd.js', 'f.js'],
            '2': ['g.js', 'h.js'],
        });

        // 3 dependency
        collection.add(c);
        expect(collection.toConfig()).toEqual({
            '1': ['a.js', 'b.js'],
            '1-2': ['c.js', 'd.js', 'f.js'],
            '2': ['g.js', 'h.js'],
            '3': ['x.js', 'y.js', 'z.js'],
        });
        expect(collection.toConfig(true)).toEqual({
            '1': ['a.js', 'b.js'],
            '1-3': [],
            '1-2': ['c.js', 'd.js', 'f.js'],
            '1-2-3': [],
            '2': ['g.js', 'h.js'],
            '2-3': [],
            '3': ['x.js', 'y.js', 'z.js'],
        });

        // 4 dependency
        collection.add(d);
        expect(collection.toConfig()).toEqual({
            '1': ['a.js', 'b.js'],
            '1-2': ['c.js', 'd.js'],
            '1-2-4': ['f.js'],
            '2': ['h.js'],
            '2-4': ['g.js'],
            '3': ['x.js', 'y.js', 'z.js'],
            '4': ['m.js', 'n.js'],
        });
        expect(collection.toConfig(true)).toEqual({
            '1': ['a.js', 'b.js'],
            '1-4': [],
            '1-3': [],
            '1-3-4': [],
            '1-2': ['c.js', 'd.js'],
            '1-2-4': ['f.js'],
            '1-2-3': [],
            '1-2-3-4': [],
            '2': ['h.js'],
            '2-4': ['g.js'],
            '2-3': [],
            '2-3-4': [],
            '3': ['x.js', 'y.js', 'z.js'],
            '3-4': [],
            '4': ['m.js', 'n.js'],
        });

        // 5 dependency
        collection.add(e);
        expect(collection.toConfig()).toEqual({
            '1': ['a.js', 'b.js'],
            '1-2': ['c.js'],
            '1-2-5': ['d.js'],
            '1-2-4': ['f.js'],
            '2': ['h.js'],
            '2-4-5': ['g.js'],
            '3': ['x.js', 'y.js'],
            '3-5': ['z.js'],
            '4': ['m.js'],
            '4-5': ['n.js'],
        });
        expect(collection.toConfig(true)).toEqual({
            '1': ['a.js', 'b.js'],
            '1-5': [],
            '1-4': [],
            '1-4-5': [],
            '1-3': [],
            '1-3-5': [],
            '1-3-4': [],
            '1-3-4-5': [],
            '1-2': ['c.js'],
            '1-2-5': ['d.js'],
            '1-2-4': ['f.js'],
            '1-2-4-5': [],
            '1-2-3': [],
            '1-2-3-5': [],
            '1-2-3-4': [],
            '1-2-3-4-5': [],
            '2': ['h.js'],
            '2-5': [],
            '2-4': [],
            '2-4-5': ['g.js'],
            '2-3': [],
            '2-3-5': [],
            '2-3-4': [],
            '2-3-4-5': [],
            '3': ['x.js', 'y.js'],
            '3-5': ['z.js'],
            '3-4': [],
            '3-4-5': [],
            '4': ['m.js'],
            '4-5': ['n.js'],
            '5': [],
        });
    })

})