 #!/bin/sh

bitxor-cli transaction nodekeylink \
    --linked-public-key <NODE_PUBLIC_TLS_KEY> \
    --action Link \
    --sync
