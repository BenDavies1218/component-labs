#!/bin/bash

# Load .env file from repo root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

if [ -f "$REPO_ROOT/.env" ]; then
  export $(grep -v '^#' "$REPO_ROOT/.env" | xargs)
fi

# Check if OTP is set
if [ -z "$OTP" ]; then
  echo "❌ Error: OTP not found in .env file"
  echo "Please add OTP=your_code to $REPO_ROOT/.env"
  exit 1
fi

# Run npm publish with OTP
echo "📦 Publishing with OTP from .env..."
npm publish --otp="$OTP"
