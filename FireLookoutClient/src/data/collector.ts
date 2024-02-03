import os from 'os';
import { currentLoad, cpu, networkStats, fsSize, osInfo, mem } from "systeminformation"
import { main } from '../index'
import toolbx from 'toolbx';

export const dataCollector = async () => {
    let nodeData: any = {};
    nodeData.loadavg = os.loadavg();
    nodeData.uptime = os.uptime();
    nodeData.platform = os.platform();
    const [
        cpuData,
        currentLoadData,
        memData,
        osInfoData,
        networkStatsData,
        fsSizeData,
    ] = await Promise.all([
        cpu(),
        currentLoad(),
        mem(),
        osInfo(),
        networkStats(),
        fsSize(),
    ]);

    nodeData.cpu = {
        cores: cpuData.cores,
        speedMax: cpuData.speedMax,
        speedMin: cpuData.speedMin,
        usage: Math.round(currentLoadData.currentLoad),
    };
    nodeData.mem = {
        used: memData.active,
        total: memData.total,
        swap: {
            used: memData.swapused,
            total: memData.swaptotal,
        },
    };
    nodeData.oslogo = osInfoData.logofile;
    nodeData.network = {
        rx: networkStatsData[0].rx_bytes,
        tx: networkStatsData[0].tx_bytes,
        rx_current: Math.round(networkStatsData[0].rx_sec) || 0,
        tx_current: Math.round(networkStatsData[0].tx_sec) || 0,
    };

    let totalSize = 0;
    let usedSize = 0;
    for (const fs of fsSizeData) {
        if (
            fs.type !== 'udev' &&
            fs.type !== 'tmpfs' &&
            fs.type !== 'overlay' &&
            fs.type !== 'devtmpfs' &&
            fs.type !== 'efivarfs'
        ) {
            totalSize += fs.size;
            usedSize += fs.used;
        }
    }
    nodeData.fs = {
        total: totalSize,
        used: usedSize,
    };


    if (main.debug) toolbx.logger(`Pushing with following data ${JSON.stringify(nodeData)}`, 4);

    return JSON.stringify(nodeData);
}