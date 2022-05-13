const { execSync } = require('child_process');
const { ncp } = require('ncp');
const fs = require('fs');
const del = require('del');

del.sync(['dist/**', '!dist/index.html']);

execSync('tsc');

ncp(
    'src',
    'dist',
    {
        filter: (source) => {
            if (fs.lstatSync(source).isDirectory()) {
                return true;
            } else {
                return source.match(/.*\.(html|css)$/) != null;
            }
        }
    },
    (err) => {
        if (err) console.error(err);
        console.log('Files copied');
    }
);
