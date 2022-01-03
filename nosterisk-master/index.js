import net from "net";
import router from "./router/router.js";
import { byte2str } from "./util/string.js";

let server = net.createServer((socket) => {
    socket.on("data", (chunk) => {
        console.log(chunk);
        let listenStr = byte2str(chunk);
        console.log(listenStr);
        let body = router(listenStr);
        if (body !== undefined) {
            let buffer = Buffer.from(body);
            console.log(body);
            socket.write(buffer);
        }
    });

    socket.on("end", function () {
        console.log("클라이언트 접속 종료");
    });
});

server.on("listening", function () {
    console.log("Server is listening");
});

server.on("close", function () {
    console.log("Server closed");
});

server.listen(9999);
