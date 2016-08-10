#!/bin/bash
set -euo pipefail

create_pass() {
    local len=$1
    local i
    if [ $((len % 4)) -ne 0 ]; then
        echo "Invalid length. Must be divisible by 4." >&2
        return 1
    fi

    for ((i=0; i<len; i+=2)); do
        printf "%02x" $((RANDOM & 0xFF))
    done
    printf "\n"
}

create_pass "$@"
