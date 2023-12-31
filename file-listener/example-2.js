const fs = require('fs');
const cache = {};

function inconsistentRead(filename, callback) {
    if (cache[filename]) {
        console.log("load from cache")
        callback(cache[filename]);
    } else {
        fs.readFile(filename, 'utf8', function (err, data) {
            cache[filename] = data;
            callback(data);
        });
    }
}

function createFileReader(filename) {
    const listeners = [];
    inconsistentRead(filename, function (value) {
        console.log("inconsistentRead CB")
        listeners.forEach(function (listener) {
            listener(value);
        });
    });
    return {
        onDataReady: function (listener) {
            console.log("onDataReady")
            listeners.push(listener);
        }
    };
}

const reader1 = createFileReader('./data.txt');
reader1.onDataReady(function (data) {
    console.log('First call data: ' + data);
})

setTimeout(function () {
    const reader2 = createFileReader('./data.txt');
    reader2.onDataReady(function (data) {
        console.log('Second call data: ' + data);
    })
}, 100)