export function hread(bytes, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;
    const units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
  
    let u = -1;
    const r = 10 ** dp;
  
    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  
    return bytes.toFixed(dp) + ' ' + units[u];
  }
  export function secondsToTime(seconds) {
    let days = Math.floor(seconds / (24 * 60 * 60));
    let hours = Math.floor(seconds / (60 * 60));
    let minutes = Math.floor(seconds / 60);

    if (days > 0) {
        return `${days} days`;
    } else if (hours > 0) {
        return `${hours} hours`;
    } else if (minutes > 0) {
        return `${minutes} minutes`;
    } else {
        return `${seconds} seconds`;
    }
}