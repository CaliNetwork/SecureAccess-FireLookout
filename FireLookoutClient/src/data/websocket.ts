import toolbx from "toolbx";
import { dataCollector } from "./collector";

export const connectWebSocket = async (host: string, node: string, key: string) => {
    const ws = new WebSocket(`${host}/api/upload/${node}/${key}`, {
        Headers: {
            "Content-Type": "application/json"
        }
    });
    //re-connect on connection closed event

    let transmitter: any

    ws.addEventListener("open", () => {
        let isDataCollectionInProgress = false;
        transmitter = setInterval(() => {
            if (!isDataCollectionInProgress) { // Only start collection if not already in progress
                isDataCollectionInProgress = true;
                (async () => {
                    try {
                        const data = await dataCollector();
                        ws.send(data);
                    } finally {
                        isDataCollectionInProgress = false; // Signal completion
                    }
                })();
            }
        }, 1000);
    })

    ws.addEventListener("close", () => {
        toolbx.logger("[connectWebSocket] Disconnected, trying to re-connect in 5 seconds.", 4)
        clearInterval(transmitter);
        ws.close();
        setTimeout(() => {
            connectWebSocket(host, node, key)
        }, 5000);
    });
}