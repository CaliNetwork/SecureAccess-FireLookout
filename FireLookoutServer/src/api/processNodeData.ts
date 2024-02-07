import toolbx from "toolbx";
import type { nodeData } from "../utils/type";
import { main } from "../index";

const timeouts: { [servername: string]: NodeJS.Timeout } = {};

const setNodeTimeout = () => {

}

export const processNodeData = (nodeData: any, newData: any, servername: string, key: string, conf: any, ip: string) => {
    const time: string = new Date().toLocaleString()
    let result: any = {
        success: false
    };
    if (conf[servername]) {
        if (conf[servername].key == key) {
            if (timeouts[servername]) {
                clearTimeout(timeouts[servername]);
                timeouts[servername] = setTimeout(() => {
                    if (nodeData[servername]) {
                        nodeData[servername].status = false;
                    }
                }, 3000);
            } else {
                timeouts[servername] = setTimeout(() => {
                    if (nodeData[servername]) {
                        nodeData[servername].status = false;
                    }
                }, 3000);
            }
            if (newData as nodeData) {
                nodeData[servername] = newData
                result.success = true;
                nodeData[servername].status = true;
            } else {
                result.success = false;
                result.reason = 'Backend is reporting invalid data';
            }
        } else {
            result.success = false;
            result.reason = 'Wrong key';
        }
    } else {
        toolbx.logger(``, 4)
        result.reason = 'Node does not exist';
    }
    if (result.success) {
        if (main.debug) {
            toolbx.logger(`[processNodeData] <${time}> [ PASS  ] Data updated for node: ${servername} from ${ip}`, 4)
        }
    } else {
        toolbx.logger(`[processNodeData] <${time}> [BLOCKED] node: ${servername} blocked from ${ip}, reason: ${result.reason}`, 4)
    }
    return result
}