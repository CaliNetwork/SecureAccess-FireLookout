# SecureAccess™ FireLookout Server

SecureAccess™ FireLookout is a tool that can help you monitor server status.

## Tech details

### > Params

|Short|Long|Purpose|
|-|-|-|
|v|verbose|Show debug messages|
|h|host|Remote server address*, for example: ws://127.0.0.1:8092|
|n|node|Server(node) name|
|k|key|Server(node) key|

one `-` for short, two `-` for long

### > Code Structure

```
src
├── data
│   ├── collector.ts
│   └── websocket.ts
└── index.ts
```