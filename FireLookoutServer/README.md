# SecureAccess™ FireLookout Server

SecureAccess™ FireLookout is a tool that can help you monitor server status.

## Tech details

### > API Structure

|Endpoint|Connection type|Purpose|
|-|-|-|
|/|http|serve static files like the dashboard|
|/api/nodeData|WebSocket|Provide data for the dashboard|
|/api/upload/:servername/:key|WebSocket|Receive data from the backend on servers|

### > Params

|Short|Long|Purpose|
|-|-|-|
|v|verbose|Show debug messages|
|l|listen|Bind server to an address|
|p|port|Bind server to a port|

one `-` for short, two `-` for long

### > Code Structure

```
src
├── api
│   └── processNodeData.ts
├── index.ts
└── utils
    └── loadConfigure.ts
```