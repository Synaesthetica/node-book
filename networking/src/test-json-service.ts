import * as net from 'net';

const server = net.createServer(conn => {
    console.log("Subscriber connected!");
    const chunk1 = '{"type":"changed","timesta';
    const chunk2 = 'mp":1450694370094}\n';
    conn.write(chunk1);
    const timer = setTimeout(() => {
        conn.write(chunk2);
        conn.end();
    },100);

    conn.on('end',() => {
        clearTimeout(timer);
        console.log("Subscriber gone!");
    });
});

server.listen(60300, ()=> console.log("Listening for subscribers..."));