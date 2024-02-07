import os from 'os';
import Stat from 'fetchsys';
import { main } from '../index.ts'
import toolbx from 'toolbx';

export const dataCollector = async () => {
    let nodeData: any = {};
    nodeData.loadavg = os.loadavg();
    nodeData.uptime = os.uptime();
    const [
        cpuData,
        memData,
        networkStatsData,
        fsData,
        osData
    ] = await Promise.all([
        Stat.cpu(),
        Stat.mem(),
        Stat.net(),
        Stat.fs(),
        Stat.os()
    ]);

    nodeData.cpu = {
        cores: cpuData.cores,
        usage: Math.round(cpuData.usage)
    };
    nodeData.mem = {
        used: memData.used,
        total: memData.total,
        swap: {
            used: memData.swap.used,
            total: memData.swap.total
        },
    };
    nodeData.network = {
        rx_current: networkStatsData.rx - main.tmp.net.rx || 0,
        tx_current: networkStatsData.tx - main.tmp.net.tx || 0,
        rx: networkStatsData.rx,
        tx: networkStatsData.tx
    };
    main.tmp.net.rx = networkStatsData.rx;
    main.tmp.net.tx = networkStatsData.tx;

    let totalSize = 0;
    let usedSize = 0;
    const skipFS: Array<string> = ['rootfs', 'unionfs', 'squashfs', 'cramfs', 'initrd', 'initramfs', 'devtmpfs', 'tmpfs', 'udev', 'devfs', 'specfs', 'type', 'appimaged', 'overlay', 'none'];
    for (const fs of fsData) {
        if (!skipFS.includes(fs.filesystem)) {
            totalSize += fs.size;
            usedSize += fs.used;
        }
    }
    nodeData.fs = {
        total: totalSize,
        used: usedSize,
    };

    nodeData.os = osData

    if (main.debug) toolbx.logger(`Pushing with following data ${JSON.stringify(nodeData)}`, 4);

    return JSON.stringify(nodeData);
}