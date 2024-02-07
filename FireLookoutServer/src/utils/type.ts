export interface nodeData {
    loadavg: number[];
    uptime: number;
    cpu: {
      cores: number;
      usage: number;
    };
    mem: {
      used: number;
      total: number;
      swap: {
        used: number;
        total: number;
      };
    };
    network: {
      rx_current: number;
      tx_current: number;
      rx: number;
      tx: number;
    };
    fs: {
      total: number;
      used: number;
    };
    os: {
      os: string;
      version: number;
    };
  }