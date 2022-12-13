#!/bin/sh

bitxor-cli transaction accountkeylink \
    --linked-public-key <REMOTE_PUBLIC_KEY> \
    --action Link \
    --sync
