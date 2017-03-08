# system-smart

Smart bundle genrator for [systemjs/builder](https://github.com/systemjs/builder)


## Use

Generate smart bundles

```javascript

    var Builder = require('systemjs-builder');
    require('system-smart');

    var builder = new Builder(/* ... */);

    builder
        .smart(['entrypoint-a.js', 'entrypoint-b.js' /* , 'other entrypoints'*/], './dist')
        .then(result => {
            // result =
            [
                { // entrypoint-a.js
                    hash: '[SHA1]', // content hash
                    name: '[SHA1].bundle.js', // output filename
                    path: '/path/to/dist/[SHA1].bundle.js', // output dest
                    source: '...',
                    sourceMap: '...',
                    modules: [ 'entrypoint-a.js', /* depencies */ ]
                },
                { // entrypoint-b.js
                    hash: '[SHA1]', // content hash
                    name: '[SHA1].bundle.js', // output filename
                    path: '/path/to/dist/[SHA1].bundle.js', // output dest
                    source: '...',
                    sourceMap: '...',
                    modules: [ 'entrypoint-b.js', /* depencies */ ]
                },
                { // Smart bundles
                    hash: '[SHA1]', // content hash
                    name: '[SHA1].bundle.js', // output filename
                    path: '/path/to/dist/[SHA1].bundle.js', // output dest
                    source: '...',
                    sourceMap: '...',
                    modules: [ /* commond depencies */ ]
                },
                // More smart bundles
            ]
        })
```

Add bundles to systemjs configuration

```javascript

    javascript
    SystemJS.config({
        bundles: {
            'dist/[SHA1].bundle.js': [ 'entrypoint-a.js', /* depencies */ ],
            'dist/[SHA1].bundle.js': [ 'entrypoint-b.js', /* depencies */ ],
            'dist/[SHA1].bundle.js': [ /* commond depencies */ ],
            // [outputDir + result.name]: result.modules
        }
    });
```