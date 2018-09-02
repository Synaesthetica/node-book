import * as fs from 'fs';
import {spawn, ChildProcess } from 'child_process';

const filename : string = process.argv[2];

if (!filename) {
    throw Error('You need to give a file');
}

fs.watch('target.txt',()=> {
    const ls : ChildProcess = spawn('ls',['-l','-h',filename]);
    let output : string = '';
    ls.stdout.on('data',(chunk : Buffer)=> output += chunk);  
    ls.on('close',() => {
        const parts : string[] = output.split(/\s+/);
        console.log([parts[0],parts[4],parts[8]]);
    });
}); 

console.log(`Watching ${filename} for changes.`);