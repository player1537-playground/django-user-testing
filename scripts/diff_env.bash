#!/bin/bash

get-variables() {
    local filename var value
    filename=$1

    while true; do
        read line || break;
        if [ "${#line}" -eq 0 ] || [ "${line:0:1}" = "#" ]; then
            printf '%s\n' "$line"
            continue
        fi

        var=${line%%=*};
        value=${line#*=};
        printf '%s\n' "$var";
    done < "$filename"
}

diff_env() {
    local columns ret
    columns=${COLUMNS:-$(tput cols)}

    if diff <(get-variables .env) <(get-variables .env.base) &>/dev/null; then
        return 0
    fi

    diff --side-by-side -W "$columns" \
         <(get-variables .env) \
         <(get-variables .env.base)
    ret=$?

    fold -w "$columns" -s <<EOF

On the left is the current set of variables as defined in your current settings, and on the right is the set of variables in the .env.base file.

Lines with a ">" between them are ones that you should add to your current .env file, and lines with a "<" are those which have been deprecated.

EOF

    return $ret
}

diff_env "$@"
