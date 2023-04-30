.. post:: 05 Mar, 2021
    :category: Network
    :excerpt: 1
    :nocomments:

#######################
Running a node manually
#######################

This guide walks you through the process of setting up a node to join **Bitxor** public network.

You can safely experiment connecting to Bitxor network by connecting to the test network (testnet) instead of the main public network (mainnet). Testnet might be offline or replaced without notice because it is used extensively for testing purposes, though. To work in a private environment network, install a local network for learning and development purposes instead.

*********************
Hardware requirements
*********************

Running a blockchain node is **very demanding** in terms of disk space, memory and CPU requirements. Failure to meet the **following minimum requirements** will produce a node that will struggle to keep up with the rest of the network. The global blockchain will not be affected but the node will rarely be eligible to collect any node rewards.

.. note:: It is **strongly recommended** to use **dedicated CPU and RAM**. When they are shared (as is the case on some Virtual Server providers) performance is heavily impacted.

.. csv-table:: Minimum node specifications
   :header: "Requirement", "Peer node", "API node", "Dual & Voting node"
   :delim: ;

   CPU; 2 cores; 4 cores; 4 cores
   RAM; 8GB; 16GB; 16GB
   Disk size; 500 GB; 750 GB; 750 GB
   Disk speed; 1500 |iops| |ssd|; 1500 |iops| |ssd|; 1500 |iops| |ssd|

The following table shows the **recommended requirements**. Using these will provide a much smoother experience and provide a certain degree of future proofing.

.. csv-table:: Recommended node specifications
   :header: "Requirement", "Peer node", "API node", "Dual & Voting node"
   :delim: ;

   CPU; 4 cores; 8 cores; 8 cores
   RAM; 16GB; 32GB; 32GB
   Disk size; 500 GB; 750 GB; 750 GB
   Disk speed; 1500 |iops| |ssd|; 1500 |iops| |ssd|; 1500 |iops| |ssd|

Runtime server requirements are network dependent. For example, networks with higher throughput will likely have higher requirements.

Although you might be able to run the software in less powerful instances, you might encounter some issues while installing or running the node.

******************
Port requirements
******************

The port **7900-7902** is required by bitxorcore for communicate between nodes. Make sure that the node's host is accessible from the internet and that the port is open and available.

The port **3000-3002** is required by api-rest for communicate between api-nodes. Make sure that the node's host is accessible from the internet and that the port is open and available.

The port **80,443** is required for generate SSL Certificate. Make sure that the node's host is accessible from the internet and that the port is open and available.

#########################
Deploy BitxorCore Server
#########################
************************
Preparing the server
************************
Your fist need access to root user and follow the next commands

.. code-block:: bitxor-bootstrap

   su
   cd ~
   sudo apt update
   sudo apt install unzip build-essential git cmake ninja-build pkg-config mongodb -y

Download BitxorCore and Seed Config

.. code-block:: bitxor-bootstrap

   cd ~
   wget https://github.com/BitxorCorp/BitxorCore/releases/download/v1.1.0.1/bitxorcore-1.1.0.1-ubuntu-focal-little-endian.zip
   unzip -o bitxorcore-1.1.0.1-ubuntu-focal-little-endian.zip
   cd BitxorCore
   wget https://github.com/BitxorCorp/BitxorCore/releases/download/v1.1.0.1/1.1.0.1-seedconfig.zip
   unzip -o 1.1.0.1-seedconfig.zip
   rm 1.1.0.1-seedconfig.zip
   rm bitxorcore-1.1.0.1-ubuntu-focal-little-endian.zip
   echo '/root/BitxorCore/deps' >> /etc/ld.so.conf
   ldconfig


***************************************
Configure the Certificate and Name Node
***************************************

Prerequisites Commands

.. code-block:: bitxor-bootstrap

   cd ~
   mkdir certgen
   cd certgen
   sudo apt install openssl

You need a Private Key, this will sign the Main Account and generate the Transport Cert, you can generate your private key with the next commands

.. code-block:: bitxor-bootstrap

   /root/BitxorCore/bin/bitxorcore.tools.addressgen -n mainnet

save your private key and your Encode/Decode Public Key.


Generate the certificate

.. code-block:: bitxor-bootstrap

   export privatekeyca=#ThePrivateKeyofNode
   export namenode=#TheNameofNodeTransport


Your must change the next words in the before commands, Where-
**#YourPrivateKey** is the private key previously obtained
**#TheNameofNodeTransport** is the name of the Node


.. code-block:: bitxor-bootstrap

   wget https://docs.bitxor.org/en/cert-generate.sh
   chmod 777 cert-generate.sh
   ./cert-generate.sh
   rm -r *

**********************
Configure a Peer node:
**********************

Peer nodes, also called a *harvester* nodes, are the backbone of the network. Among other things, they verify transactions and add new blocks to the blockchain, collecting fees in the process.

.. code-block:: bitxor-bootstrap

   cd ~
   export hostnamenode=#TheHostnameofNode


Your must change the next words in the before commands, Where-
**#TheHostnameofNode** is the hostname of the node, this can be a domain name or your ip address

.. code-block:: bitxor-bootstrap

   sed -i "s/yourhostnamenode/$hostnamenode/g" BitxorCore/resources/config-node.properties
   sed -i "s/yourfriendlyNamenode/$namenode/g" BitxorCore/resources/config-node.properties


Now we will install the services of BitxorCore and BitxorBroker

.. code-block:: bitxor-bootstrap

   echo -e "[Unit]\nDescription=BitxorCore\n\n[Service]\nWorkingDirectory=/root/BitxorCore/bin\nExecStartPre=/bin/bash -c 'rm /root/BitxorCore/data/server.lock || /bin/true'\nExecStart=/root/BitxorCore/bin/bitxorcore.server\nExecReload=/bin/bash -c 'rm /root/BitxorCore/data/server.lock'\nExecReload=/root/BitxorCore/bin/bitxorcore.server\nExecStop=/bin/bash -c 'rm /root/BitxorCore/data/server.lock'\nKillMode=process\nRestart=always\nRestartSec=30\n\n[Install]\nWantedBy=multi-user.target" > /etc/systemd/system/bitxorcore.service
   echo -e "[Unit]\nDescription=BitxorBroker\n\n[Service]\nWorkingDirectory=/root/BitxorCore/bin\nExecStartPre=/bin/bash -c 'rm /root/BitxorCore/data/broker.lock || /bin/true'\nExecStart=/root/BitxorCore/bin/bitxorcore.broker\nExecReload=/bin/bash -c 'rm /root/BitxorCore/data/broker.lock'\nExecReload=/root/BitxorCore/bin/bitxorcore.broker\nExecStop=/bin/bash -c 'rm /root/BitxorCore/data/broker.lock'\nKillMode=process\nRestart=always\nRestartSec=30\n\n[Install]\nWantedBy=multi-user.target" > /etc/systemd/system/bitxorbroker.service
   sudo systemctl daemon-reload




#######################
Deploy Api-REST Server
#######################

***********************
Preparing the server
***********************

Your fist need access to root user and follow the next commands

.. code-block:: bitxor-bootstrap

   su
   cd ~
   sudo apt update && sudo apt install curl -y
   curl -sL https://deb.nodesource.com/setup_14.x | sudo bash
   curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
   echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
   sudo apt update && sudo apt install yarn unzip pkg-config mongodb nodejs python3-pip -y


Download BitxorAPI-Rest and Install

.. code-block:: bitxor-bootstrap

   su
   cd ~
   wget https://github.com/BitxorCorp/Bitxor-ApiRest/archive/refs/tags/v1.0.1-beta.2.zip
   unzip -o v1.0.1-beta.2.zip
   mkdir BitxorApi
   cp -r Bitxor-ApiRest-1.0.1-beta.2/* BitxorApi
   rm -r Bitxor-ApiRest-1.0.1-beta.2 v1.0.1-beta.2.zip
   cd BitxorApi
   chmod 777 yarn_setup.sh
   ./yarn_setup.sh

****************
Install with SSL
****************

first your need have issued your certificate to your hostname and must have your privatekey and certificate files.

write your private key of your ssl certificate

.. code-block:: bitxor-bootstrap

   nano /root/BitxorCore/cert/ssl.bin

paste the content of your private key, you must open in your computer the private key with a text editor for copy this, after of paste the content, press `control + x` and after `Y` and press `enter`

Now your must write the certificate file of your ssl certificate

.. code-block:: bitxor-bootstrap

   nano /root/BitxorCore/cert/ssl.crt
   
paste the content of your certificate file, you must open in your computer the certificate file with a text editor for copy this, after of paste the content, press `control + x` and after `Y` and press `enter`
 
Now write the service

.. code-block:: bitxor-bootstrap

   echo -e "[Unit]\nDescription=BitxorApiRest\n\n[Service]\nWorkingDirectory=/root/BitxorApi/rest\nExecStart=/usr/bin/npm run start:ssl\nType=simple\nRestart=always\n\n\n[Install]\nWantedBy=multi-user.target" > /etc/systemd/system/bitxorapi.service
   sudo systemctl daemon-reload

********************
Install without SSL
********************

.. code-block:: bitxor-bootstrap

   echo -e "[Unit]\nDescription=BitxorApiRest\n\n[Service]\nWorkingDirectory=/root/BitxorApi/rest\nExecStart=/usr/bin/npm run start\nType=simple\nRestart=always\n\n\n[Install]\nWantedBy=multi-user.target" > /etc/systemd/system/bitxorapi.service
   sudo systemctl daemon-reload

---

************************
Running the BitxorCore
************************

Upon first launch the node will synchronize with the rest of the network, downloading the complete blockchain. This might take a few hours and during this time REST requests directed to your node (if it is an API node) might be delayed and report an incorrect chain height.
Your must run the next command for run the peer node
For run the BitxorCore run the next command

.. code-block:: bitxor-bootstrap

   service bitxorcore start

For know the status of BitxorCore run the next command

.. code-block:: bitxor-bootstrap

   systemctl status bitxorcore

For follow in live time the process of BitxorCore

.. code-block:: bitxor-bootstrap

   journalctl -f -u bitxorcore.service

For autoboot BitxorCore with the system

.. code-block:: bitxor-bootstrap

   systemctl enable bitxorcore

************************
Running the BitxorBroker
************************

For run the BitxorCore run the next command

.. code-block:: bitxor-bootstrap

   service bitxorbroker start

For know the status of BitxorCore run the next command

.. code-block:: bitxor-bootstrap

   systemctl status bitxorbroker

For follow in live time the process of BitxorCore

.. code-block:: bitxor-bootstrap

   journalctl -f -u bitxorbroker.service

For autoboot BitxorCore with the system

.. code-block:: bitxor-bootstrap

   systemctl enable bitxorbroker
   
**************************
Running the BitxorApi-REST
**************************

For run the BitxorApi-REST run the next command

.. code-block:: bitxor-bootstrap

   service bitxorapi start

For know the status of BitxorApi-REST run the next command

.. code-block:: bitxor-bootstrap

   systemctl status bitxorapi

For follow in live time the process of BitxorApi-REST

.. code-block:: bitxor-bootstrap

   journalctl -f -u bitxorapi.service

For autoboot BitxorApi-REST with the system

.. code-block:: bitxor-bootstrap

   systemctl enable bitxorapi

You now can see the api running, go to http://youripaddress:3000 without ssl or https://youripaddress:3001 with ssl enable


#########################
Configuration Additional
#########################

*****************
Enable Harvesting
*****************

1. First your must generate 2 Wallet Address with your privatekey with the next command:

.. code-block:: bitxor-bootstrap

   /root/BitxorCore/bin/bitxorcore.tools.addressgen -n mainnet -c 2

2. Now you will write the 2 private key in the file of configuration: /root/BitxorCore/resources/config-harvesting.properties

.. code-block:: bitxor-bootstrap

   nano /root/BitxorCore/resources/config-harvesting.properties

now put in variable 'harvesterSigningPrivateKey' a private key obtained in the step 1,
and put in variable 'harvesterVrfPrivateKey' the other private key obtained in the step 1
change the value of variable 'enableAutoHarvesting' to 'true'
in variable 'beneficiaryAddress' put your wallet where your will receive the percentage of node when this found a block.
now save, for save press ``control + x`` and after ``Y`` and press ``enter``
3. Enable Harvesting 

.. code-block:: bitxor-bootstrap

   nano /root/BitxorCore/resources/config-extensions-server.properties
   
change the variable 'extension.harvesting' to 'true'
now save, for save press ``control + x`` and after ``Y`` and press ``enter``

4. Restart BitxorCore

#########################
Enable Voting Node
#########################

********************************************
Node voting for the first time 
********************************************

1. First your must have in your wallet for Voting the minimum amount of BXR for voting program.

2. You will need create a voting private key in your node

.. code-block:: bitxor-bootstrap

   cd /root/BitxorCore/bin
   ./bitxorcore.tools.votingkey -b 3101 -e 6210 -o private_key_tree1.dat
   mkdir ../votingkeys
   cp -f private_key_tree1.dat ../votingkeys/private_key_tree1.dat

Copy your public key this will used for create the link voting key transaction.
Depending of the epoch which you stay, you will must change the options -b 3101 for the initial epoch and -e 6210 for the ending epoch
The maximum epoch range is 3110 blocks

3. You will need add the role of voting in your configuration of the node

.. code-block:: bitxor-bootstrap

   nano ../resources/config-node.properties

add the next text ``,Voting`` at the last character of the variable ``roles``

4. You must also enable finalization extension 

.. code-block:: bitxor-bootstrap

   nano ../resources/config-finalization.properties 

the configuration must be same to this configuration

.. code-block:: bitxor-bootstrap

   [finalization]

   enableVoting = true
   enableRevoteOnBoot = true

   size = 10'000
   threshold = 6'700
   stepDuration = 2m

   shortLivedCacheMessageDuration = 10m
   messageSynchronizationMaxResponseSize = 20MB

   maxHashesPerPoint = 512
   prevoteBlocksMultiple = 4

   unfinalizedBlocksDuration = 0m

   treasuryReissuanceEpoch = 0

You can copy all the configuration and replace in the configuration shown in your node.

5. You need create a link voting key from your wallet voting, this can be completed via the SDK or the Bitxor Wallet Desktop

********************************************
Voting node renewing voting key
********************************************

1. You will need create a new voting private key in your node

.. code-block:: bitxor-bootstrap

   cd /root/BitxorCore/bin
   ./bitxorcore.tools.votingkey -b 3101 -e 6210 -o private_key_tree2.dat
   mkdir ../votingkeys
   cp -f private_key_tree2.dat ../votingkeys/private_key_tree2.dat

Copy your public key this will used for create the link voting key transaction.
Depending of the epoch which you stay, you will must change the options -b 3101 for the initial epoch and -e 6210 for the ending epoch

The maximum epoch range is 3110 blocks.

Only if you using private_key_tree2.dat at the moment of crating the new private key and you have the Voting Public Key 1 expired
you will can use the name private_key_tree1.dat, also will can replace the voting public key 1 with obtained before.

2. You will need use the SDK or Bitxor Wallet for create the link voting key transaction.


**********
Next steps
**********

Now that your node is up and running, you can take a look at the following guides:

* :doc:`maintaining-a-bitxor-node`
* :ref:`Categorized list of Bitxor guides <blog-categories>`
