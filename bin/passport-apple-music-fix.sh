#!/bin/sh

set -e

ARGS=""
ME=$(basename "$0")

for ARG in "$@"; do
  case ${ARG} in
    -h|--help)
    HELP="YES"
    shift
    ;;
    *)
    ARGS="$ARGS$ARG "
    shift
    ;;
  esac
done

set -- ${ARGS% }

if [ "$#" -lt 1 ] || [ "$HELP" = "YES" ]; then
  cat >&2 <<EOF
$ME fixes the Apple Music Passport plugin

USAGE:
  $ME [--help] PASSPORT_APPLE_MUSIC_DIR

OPTIONS:
  -h, --help   Display this help message

EXAMPLE:
  $ME
EOF
  exit 1
fi

if [ ! -x "$(command -v jq)" ]; then
  >&2 echo "Error: 'jq' is not installed."
  exit 1
fi

if [ ! -d "$1" ]; then
  >&2 echo "Error: 'passport-apple-music' package not found."
  exit 1
fi

PASSPORT_APPLE_MUSIC_DIR=$(realpath "$1")

echo "================================================================================"
printf "\033[34mFixing '%s/package.json'\033[0m\n\n" "$PASSPORT_APPLE_MUSIC_DIR"
jq -r '.types="dist/index.d.ts"' < "$PASSPORT_APPLE_MUSIC_DIR/package.json" | sponge "$PASSPORT_APPLE_MUSIC_DIR/package.json"
cat "$PASSPORT_APPLE_MUSIC_DIR/package.json"
echo

echo "================================================================================"
printf "\033[34mAdding missing assets to '%s/dist'\033[0m\n\n" "$PASSPORT_APPLE_MUSIC_DIR"
cp -v "$(realpath index.html)" "$PASSPORT_APPLE_MUSIC_DIR/dist"
echo
