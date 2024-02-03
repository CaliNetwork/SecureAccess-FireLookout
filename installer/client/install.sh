#!/bin/sh
mkdir -p /opt/SecureAccess/FireLookout/client
cp -r FLC /opt/SecureAccess/FireLookout/client
cp firelookout-client.service /etc/systemd/system
chmod +x /opt/SecureAccess/FireLookout/client/FLC