#!/bin/sh
rm -rf installer/server/dashboard

cd FireLookoutServer/public

# uncomment this to build frontend
# bun install && bun run build && mv dist ../../installer/server/dashboard

cd ..

# comment this to avoid building ApiBackend
bun install && bun build ./src/index.ts --outfile FLS --compile && mv FLS ../installer/server/

cd ../FireLookoutClient

# comment this to avoid building NodeBackend
bun install && bun build ./src/index.ts --outfile FLC --compile && mv FLC ../installer/client
