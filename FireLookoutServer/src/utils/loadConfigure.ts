import toolbx from "toolbx"

export const loadConfigure = async (conf: any) => {
    for (const node in conf) {
        toolbx.logger(`[loadConfigure] Checking node config for node: ${node}`, 4)
        if (conf[node].key == null || conf[node].key.length == 0) {
            toolbx.logger(`[loadConfigure] key is missing for node: ${node}`, 3)
        }
        if (conf[node].FancyName == null || conf[node].FancyName.length == 0) {
            conf[node].FancyName = false
        }
    }
}