import fs from 'fs';
import util from 'util';
import path from 'path';

import { trimChar } from './misc.js';

const readFile = util.promisify(fs.readFile);

const exportDuplicates = (dir) => {
    const trimmedDir = trimChar(dir, `'`);

    fs.readdir(trimmedDir, (err, files) => {
        const filePromises = [];

        files.forEach(file => {
            if (file.includes('.txt')) {
                const formattedCubePath = path.format({ dir: trimmedDir, base: file })

                filePromises.push(readFile(formattedCubePath, 'utf8'));
            }
        });

        Promise.all(filePromises).then(cubes => {
            const parsedCubes = cubes.map(cube => {
                return cube.split(/\r\n/)
            });

            let analysisObj = {};

            parsedCubes.forEach(parsedCube => {
                parsedCube.forEach(card => {
                    if (!analysisObj[card]) {
                        analysisObj[card] = 1;
                    } else {
                        analysisObj[card]++;
                    }
                });
            });

            const analysisFileName = 'frequency-analysis.txt';

            fs.writeFile(path.format({ dir: './', base: analysisFileName }), JSON.stringify(analysisObj), err => {
                if (err) {
                    console.error(err);
                    return
                }

                console.log(`Analysis data written to ${analysisFileName}`);
            })
        });
    });
}


export default exportDuplicates;