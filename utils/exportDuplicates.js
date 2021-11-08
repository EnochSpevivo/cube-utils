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

            let duplicates;
            
            for (let i = 0; i < parsedCubes.length; i++) {
                if (i === parsedCubes.length - 1) break;
                    
                if (!duplicates) {
                    duplicates = parsedCubes[i].filter(val => {
                        return parsedCubes[i + 1].indexOf(val) !== -1;
                    });
                } else {
                    duplicates = duplicates.filter(val => {
                        return parsedCubes[i + 1].indexOf(val) !== -1;
                    });
                }
            }

            const duplicatesFileName = 'cube-duplicates.txt';

            fs.writeFile(path.format({ dir: './', base: duplicatesFileName }), duplicates.join('\r\n'), err => {
                if (err) {
                    console.error(err);
                    return
                }

                console.log(`Duplicates written to ${duplicatesFileName}`);
            })
        });
    });
}


export default exportDuplicates;