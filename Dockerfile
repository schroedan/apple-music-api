FROM node:17.4 as node

LABEL maintainer="Daniel Schröder <daniel.schroeder@skriptfabrik.com>"

ENV NODE_ENV=development
ENV YARN_VERSION=1.22.17

WORKDIR /workspace

# Install package managers
RUN set -eux; \
    npm install --global --force --silent \
        yarn@${YARN_VERSION}; \
    rm -rf ~/.npm

FROM node

LABEL maintainer="Daniel Schröder <daniel.schroeder@skriptfabrik.com>"

ENV OPENAPI_GENERATOR_VERSION=5.4.0
ENV YQ_VERSION=4.19.1

# Install development dependencies
RUN set -eux; \
    apt-get update -qq; \
    apt-get install --no-install-recommends -qq \
        # ms-vscode-remote.remote-containers
        git \
        ssh \
        # openapi-generator
        default-jre \
        # utils
        jq \
        moreutils; \
    cp /usr/bin/sponge /usr/local/bin/; \
    apt-get autoremove --purge moreutils -qq; \
    rm -rf /var/lib/apt/lists/*; \
    wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/${OPENAPI_GENERATOR_VERSION}/openapi-generator-cli-${OPENAPI_GENERATOR_VERSION}.jar -P /opt; \
    echo '#!/bin/sh\nset -e\n\njava -ea ${JAVA_OPTS} -Xms512M -Xmx1024M -server -jar /opt/openapi-generator-cli-'${OPENAPI_GENERATOR_VERSION}'.jar "$@"' > /opt/openapi-generator-cli-${OPENAPI_GENERATOR_VERSION}.sh;\
    chmod +x /opt/openapi-generator-cli-${OPENAPI_GENERATOR_VERSION}.sh; \
    ln -s /opt/openapi-generator-cli-${OPENAPI_GENERATOR_VERSION}.sh /usr/local/bin//openapi-generator-cli; \
    wget https://github.com/mikefarah/yq/releases/download/v${YQ_VERSION}/yq_linux_amd64 -O /usr/bin/yq; \
    chmod +x /usr/bin/yq
