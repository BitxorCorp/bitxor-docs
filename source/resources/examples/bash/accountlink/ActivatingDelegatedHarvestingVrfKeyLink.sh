#!/bin/sh

bitxor-cli transaction vrfkeylink \
    --linked-public-key <VRF_PUBLIC_KEY> \
    --action Link \
    --sync
