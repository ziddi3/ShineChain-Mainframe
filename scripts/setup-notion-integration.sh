#!/bin/bash
# === ShineChain Notion Deployment Log Setup ===
# Author: Jiraiya / Voxflare Systems
# Purpose: Create Notion database schema + bind to Zapier webhook for Ever-Deploy v5

echo "🛰️ Initializing ShineChain Notion Schema Setup..."

# === Prerequisites Check ===
if [ -z "$NOTION_API_KEY" ]; then
  echo "❌ ERROR: NOTION_API_KEY environment variable not set"
  echo "Please set it with: export NOTION_API_KEY='your_integration_token'"
  exit 1
fi

if [ -z "$NOTION_PARENT_PAGE_ID" ]; then
  echo "❌ ERROR: NOTION_PARENT_PAGE_ID environment variable not set"
  echo "Please set it with: export NOTION_PARENT_PAGE_ID='your_page_id'"
  exit 1
fi

# Step 1: Build Notion JSON schema for Deployment Log
echo "📝 Creating Notion database schema..."
cat > notion_deployment_schema.json <<EOF
{
  "parent": { "type": "page_id", "page_id": "${NOTION_PARENT_PAGE_ID}" },
  "title": [{ "type": "text", "text": { "content": "🌞 ShineChain Deployment Log" } }],
  "properties": {
    "Project": { "title": {} },
    "Status": { "select": {
      "options": [
        { "name": "Success", "color": "green" },
        { "name": "Failure", "color": "red" },
        { "name": "In Progress", "color": "yellow" }
      ]
    }},
    "Commit SHA": { "rich_text": {} },
    "Workflow": { "rich_text": {} },
    "Deployed At": { "date": {} },
    "Deployment URL": { "url": {} },
    "Notes": { "rich_text": {} }
  }
}
EOF

# Step 2: Create Notion database using the API
echo "🚀 Creating Notion database..."
curl -X POST "https://api.notion.com/v1/databases" \
  -H "Authorization: Bearer ${NOTION_API_KEY}" \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2022-06-28" \
  -d @notion_deployment_schema.json > notion_db_response.json

# Step 3: Extract database ID
if command -v jq &> /dev/null; then
  NOTION_DB_ID=$(jq -r '.id' notion_db_response.json)
  if [ "$NOTION_DB_ID" != "null" ] && [ -n "$NOTION_DB_ID" ]; then
    echo "✅ Created Notion Database ID: $NOTION_DB_ID"
    echo ""
    echo "📋 Next steps:"
    echo "1. Add this database ID to GitHub Secrets:"
    echo "   gh secret set NOTION_DEPLOYMENT_DB_ID --body '$NOTION_DB_ID'"
    echo ""
    echo "2. View your new database in Notion"
    echo "3. Configure Zapier to write to this database"
  else
    echo "❌ Failed to create Notion database. Response:"
    cat notion_db_response.json
    exit 1
  fi
else
  echo "⚠️  jq not installed. Database response saved to notion_db_response.json"
  echo "Please extract the 'id' field manually and add it to GitHub Secrets"
fi

# Step 4: Test webhook (if ZAPIER_WEBHOOK_URL is set)
if [ -n "$ZAPIER_WEBHOOK_URL" ]; then
  echo ""
  echo "🔗 Testing Zapier webhook connection..."
  curl -X POST "$ZAPIER_WEBHOOK_URL" \
    -H "Content-Type: application/json" \
    -d "{
      &quot;type&quot;: &quot;notion_binding&quot;,
      &quot;database_id&quot;: &quot;$NOTION_DB_ID&quot;,
      &quot;workspace&quot;: &quot;ShineChain Mainframe&quot;,
      &quot;message&quot;: &quot;Zapier connected to Notion deployment log.&quot;,
      &quot;timestamp&quot;: &quot;$(date -u '+%Y-%m-%dT%H:%M:%SZ')&quot;
    }"
  echo ""
  echo "✅ Webhook test sent to Zapier"
fi

# Cleanup
rm -f notion_deployment_schema.json

echo ""
echo "🌞 ShineChain Notion Schema setup complete!"
echo "🔗 Database ID: $NOTION_DB_ID"
echo ""
echo "📚 Full setup guide: EVER-DEPLOY-V5-SETUP.md"