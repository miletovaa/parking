#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cleanup() {
  echo ""
  echo "🧹 Cleaning up... Stopping Sail containers"
  cd backend
  ./vendor/bin/sail down
  exit
}

trap cleanup EXIT SIGINT SIGTERM

cd backend
./vendor/bin/sail up -d

cd ../frontend
nvm use
npm run dev &

sleep 3
open http://localhost:3000

wait