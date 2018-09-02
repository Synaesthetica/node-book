import * as net from 'net';
import * as fs from 'fs';
const filename = process.argv[2];

if (!filename) {
    throw Error('Error: No filename given!');
}

net.createServer(connection => {
    console.log('Subscriber jacked the fuck in!');
    connection.write(JSON.stringify({type: 'watching', file: filename}));

    const watcher : fs.FSWatcher = fs.watch(filename, () => 
        connection.write(JSON.stringify({type:'changed',timestamp: Date.now()}) + '\n'));

    connection.on('close',() => {
        console.log('Subscriber logged the fuck out!');
        watcher.close();
    });
}).listen(60300,() => console.log("I'm a fat gay and I want to rot in ice hell FTW"));