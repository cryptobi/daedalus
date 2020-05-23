cardano-node run \
    --config configuration.yaml \
    --topology genesis/node-2/topology.json \
    --database-path genesis/node-2/db \
    --socket-path genesis/node-2/node.sock \
    --shelley-kes-key genesis/node-2/kes.skey \
    --shelley-vrf-key genesis/node-2/vrf.skey \
    --shelley-operational-certificate genesis/node-2/cert \
    --port 3002