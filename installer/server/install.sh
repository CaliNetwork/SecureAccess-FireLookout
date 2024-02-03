#!/bin/sh
mkdir -p /opt/SecureAccess/FireLookout/server
cp -r FLS dashboard config.toml /opt/SecureAccess/FireLookout/server
cp firelookout-server.service /etc/systemd/system
chmod +x /opt/SecureAccess/FireLookout/server/FLS