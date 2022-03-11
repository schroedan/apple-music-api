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

if [ "$#" -lt 2 ] || [ "$HELP" = "YES" ]; then
  cat >&2 <<EOF
$ME generates the OpenAPI client from the OpenAPI spec

USAGE:
  $ME [--help] OPENAPI_SPEC OUTPUT_DIR

OPTIONS:
  -h, --help   Display this help message

EXAMPLE:
  $ME openapi.yaml node_modules
EOF
  exit 1
fi

for CMD in git openapi-generator-cli; do
  if [ ! -x "$(command -v $CMD)" ]; then
    >&2 echo "Error: '$CMD' is not installed."
    exit 1
  fi
done

OPENAPI_SPEC="$1"
OUTPUT_DIR="$2"

echo "================================================================================"
printf "\033[34mGenerating sources\033[0m\n\n"
openapi-generator-cli \
  generate \
    -g typescript-node \
    -i "$OPENAPI_SPEC" \
    -o "$OUTPUT_DIR"
echo

echo "================================================================================"
printf "\033[34mPatching sources\033[0m\n\n"
for FILE in "$OUTPUT_DIR/package.json" "$OUTPUT_DIR/README.md" "$OUTPUT_DIR/tsconfig.json" "$OUTPUT_DIR/tsconfig.lib.json"; do
  echo "'$(realpath $FILE)'"
  git checkout -- "$FILE"
done
echo
