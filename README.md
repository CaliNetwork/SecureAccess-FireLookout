# SecureAccess™ FireLookout Server

SecureAccess™ FireLookout is a tool that can help you monitor server status.

Opensourced with GPL3.

## Product purpose

to help you monitor your servers :>

## Deploy Instruction

**!Build before sh install.sh!**

### > Server Side

> On systemd-based Linux distros, x64(aka. amd64)

1. Setup files.
```
git clone https://github.com/CaliNetwork/SecureAccess-FireLookout

cd SecureAccess-FireLookout/installer/server

sudo sh install.sh
```
2. Configure SecureAccess™ FireLookout Server.

Use an file editor to open /etc/systemd/system/firelookout-server.service, and then configure Exec command.

Then, navi to /opt/SecureAccess/FireLookout/server, and modify config.toml as the example in it shows.

3. Configure reverse proxy to enable SSL, etc.

### > Client Side

> On systemd-based Linux distros, x64(aka. amd64)

1. Setup files.
```
git clone https://github.com/CaliNetwork/SecureAccess-FireLookout

cd SecureAccess-FireLookout/installer/client

sudo sh install.sh
```
2. Configure SecureAccess™ FireLookout Server.

Use a file editor to open /etc/systemd/system/firelookout-client.service, and then configure Exec command.

## Build instruction

Install bun on your machine,

modify build.sh and then sh build.sh