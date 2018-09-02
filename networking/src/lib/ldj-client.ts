import { EventEmitter } from "events";
import { Stream } from "stream";

class LDJClient extends EventEmitter {
    constructor(stream: Stream) {
        super();
        let buffer = '';
        stream.on('data', data => {
            buffer += data;
            let boundary = buffer.indexOf('\n');
            while (boundary !== -1) {
                const input = buffer.substring(0,boundary);
                buffer = buffer.substring(boundary + 1);
                this.emit('message',JSON.parse(input));
                boundary = buffer.indexOf('\n');
            }
        });
    }
    static connect(stream: Stream) {
        return new LDJClient(stream);
    }
}

export { LDJClient };