######
Client
######

|codename|-based networks rely on nodes to provide a trustless, high-performance, and secure blockchain platform.

These nodes are deployed using |bitxorcore-client| software, a C++ rewrite of the previous Java-written BITXOR distributed ledger that has been running since 2015.

Learn more about the protocol by reading the |techref| and this :doc:`documentation <concepts/node>`.

******************
Building the image
******************

To compile bitxorcore-client source code, follow the building |instructions|.

***********************
Running bitxorcore-client
***********************

bitxorcore-client executable can be used either to run different types of nodes or to launch new networks.
This section contains the instructions on how to run the bitxorcore-client for various purposes.

Running a network node
======================

To run a |codename| node follow :doc:`this guide <guides/network/running-a-bitxor-node>`.

Developers can also deploy testnet nodes to experiment with the offered transaction set in a live network without the loss of valuable assets.

Private test network
====================

With |codename|, businesses can launch and extend private networks by developing :doc:`custom plugins <concepts/plugin>` and extensions at the protocol level.
The package |bitxor-bootstrap| contains the necessary setup scripts to deploy a network for testing and development purposes with just one command.

To run a private test net, follow :doc:`this guide <guides/network/creating-a-private-test-net>`.

Private network
===============

Instructions on how to launch a secure and production-ready private chain will be released here.

.. |bitxorcore-client| raw:: html

   <a href="https://github.com/bitxorcorp/bitxorcore/tree/main" target="_blank">bitxorcore-client</a>

.. |instructions| raw:: html

   <a href="https://github.com/bitxorcorp/bitxorcore/tree/main/docs/README.md" target="_blank">instructions</a>

