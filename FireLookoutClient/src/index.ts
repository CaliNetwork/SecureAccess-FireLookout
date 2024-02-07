import toolbx from "toolbx";
import { connectWebSocket } from "./data/websocket";


export let main: any = {};
main.version = 'JadeCipher@1.0.0-OSS';
main.args = require('minimist')(Bun.argv.slice(2));
main.debug = main.args.v || main.args.verbose || false;
main.host = main.args.h || main.args.host || null;
main.node = main.args.n || main.args.node || null;
main.key = main.args.k || main.args.key || null;
main.tmp= { net: {} }

toolbx.logger(`Launching SecureAccess™ - FireLookout Client Version ${main.version}`, 0);

connectWebSocket(main.host, main.node, main.key);