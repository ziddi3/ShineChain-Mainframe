#!/bin/bash

# Firebase Auto-Deploy Token Setup Script
# Run this on your LOCAL machine (not in the sandbox)

echo "🔥 Firebase Auto-Deploy Token Setup"
echo "===================================="
echo ""
echo "This script will help you generate a Firebase CI token"
echo "for GitHub Actions auto-deployment."
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found!"
    echo ""
    echo "Please install it first:"
    echo "  npm install -g firebase-tools"
    echo ""
    exit 1
fi

echo "✅ Firebase CLI found"
echo ""

# Generate token
echo "📝 Generating Firebase CI token..."
echo ""
echo "A browser window will open. Please:"
echo "  1. Sign in with your Google account"
echo "  2. Grant permissions"
echo "  3. Copy the token that appears in the terminal"
echo ""
read -p "Press Enter to continue..."

firebase login:ci

echo ""
echo "===================================="
echo "✅ Token generated!"
echo ""
echo "Next steps:"
echo "  1. Copy the token above (the long string starting with 1//...)"
echo "  2. Go to: https://github.com/ziddi3/ShineChain-Mainframe/settings/secrets/actions"
echo "  3. Click 'New repository secret'"
echo "  4. Name: FIREBASE_TOKEN"
echo "  5. Value: Paste the token"
echo "  6. Click 'Add secret'"
echo ""
echo "🚀 Once added, every push to main will auto-deploy to Firebase!"
echo ""