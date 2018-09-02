import * as net from 'net';
import {LDJClient} from './lib/ldj-client';
const ldjClient = LDJClient.connect(net.connect({port: 60300}));

ldjClient.on('message', message => {
    if (message.type === 'watching') {
        console.log(`Now watching ${message.file}`)
    } else if (message.type === 'changed') {
        console.log(`File changed: ${new Date(message.timestamp)}`);
    } else {
        throw Error(`Unrecogized message type: ${message.type}`);
    }
});