cardano-node run \
    --config configuration.yaml \
    --topology genesis/node-1/topology.json \
    --database-path genesis/node-1/db \
    --socket-path genesis/node-1/node.sock \
    --shelley-kes-key genesis/node-1/kes.skey \
    --shelley-vrf-key genesis/node-1/vrf.skey \
    --shelley-operational-certificate genesis/node-1/cert \
    --port 3001