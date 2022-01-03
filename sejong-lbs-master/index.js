const AGIServer = require("ding-dong");
const handler = require("./router/index");

const agi = new AGIServer(handler);
agi.start(9999);
