# Fakedalus

An exploratory fork of [Daedalus wallet](https://github.com/input-output-hk/daedalus) used to create our own cryptocurrency based on Cardano technology.

This is a 2 part tutorial showing how you can create your own sovereign cryptocurrency using existing Cardano software.

[Part I](https://crypto.bi/tape/cardano/) explains how to set up a genesis block and get your own network of nodes to start producing blocks and bootstrap a new cryptocurrency.

[Part II](https://crypto.bi/tape/daedalus/) shows you how to tinker with Daedalus to customize your own wallet for the new cryptocurrency.

Complete wallet customization instructions in article: [Building Daedalus Cardano wallet without nix](https://crypto.bi/tape/daedalus/)

## Sample Implementation 

See `config/` subdirectory for example configurations.

`run-node-{1,2}.sh` scripts run two block producing nodes

`run-common-node.sh` runs a client node like Daedalus would

To use this cryptocurrency, configure your custom Daedalus to the same specs as `run-common-node.sh` 

## Notes

Experimental software: not meant for production environment. Do not reuse secret keys contained in this repository.

These files were generated for our 2 part tutorial.

**All the secret keys in this subdirectory have been exposed. Do not reuse any of the keys contained in this example implementation.**

## Legal

All files provided under Daedalus wallet's own license terms. 

See `LICENSE` file on the root directory of this repo for details.

**This is NOT an official Cardano product. We are in no way affiliated with IOHK or Cardano.** 
