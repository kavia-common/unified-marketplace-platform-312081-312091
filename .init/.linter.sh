#!/bin/bash
cd /home/kavia/workspace/code-generation/unified-marketplace-platform-312081-312091/frontend_react
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

