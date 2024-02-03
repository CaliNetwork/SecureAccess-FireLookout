import { Elysia } from "elysia";
import { ip } from "elysia-ip";
import { staticPlugin } from '@elysiajs/static';
import toolbx from "toolbx";
import { loadConfigure } from "./utils/loadConfigure";
import { processNodeData } from "./api/processNodeData";
import { TOML } from "bun";


let main: any = {};
let nodeData: any = {};
main.args = require('minimist')(Bun.argv.slice(2));
main.version = 'California@1.0.0-OSS';
main.debug = main.args.v || main.args.verbose || false;
main.listen = main.args.l || main.args.listen || '0.0.0.0';
main.port = main.args.p || main.args.port || 8271;
const conf = TOML.parse(await Bun.file('./config.toml').text());

toolbx.logger(`Launching SecureAccess™ - FireLookout Server Version ${main.version}`, 0)

loadConfigure(conf);

const app = new Elysia()
  .use(ip())
  .use(staticPlugin(
    {
      prefix: "/assets",
      assets: "dashboard/assets",
      alwaysStatic: true
    }
  ))
  .get('/', () => Bun.file('dashboard/index.html'))
  .ws('/api/nodeData', {
    message(ws) {
      setInterval(() => {
        ws.send(nodeData)
      }, 1000)
    }
  })
  .ws('/api/upload/:servername/:key', {
    message(ws, message) {
      const { servername, key } = ws.data.params;
      ws.send(processNodeData(nodeData, message, servername, key, conf, ws.data.ip.address))
    }
  })
  .listen({
    hostname: main.listen,
    port: main.port
  });
toolbx.logger(`[CORE] Ready to handle inbound requests at ws://${main.listen}:${main.port} and http://${main.listen}:${main.port}`, 1);
