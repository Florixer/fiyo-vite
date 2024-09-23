#!/bin/bash

# Variables
REPO="florixer/fiyo-vite"  # Your repository

# Fetch the most recent run ID
RUN_ID=$(gh run list --repo $REPO --limit 1 --json databaseId --jq '.[0].databaseId')

# Fetch and display a summary of the latest run, including the commit message
if [ -n "$RUN_ID" ]; then
  echo "Fetching summary for latest run ID: $RUN_ID"
  
  # Fetch the status, conclusion, and headSha (commit hash)
  SUMMARY=$(gh run view $RUN_ID --repo $REPO --json status,conclusion,headSha --jq '.status, .conclusion, .headSha')
  
  # Extract the headSha (commit hash) from the summary
  STATUS=$(echo "$SUMMARY" | sed -n '1p')
  CONCLUSION=$(echo "$SUMMARY" | sed -n '2p')
  HEAD_SHA=$(echo "$SUMMARY" | sed -n '3p')

  # Fetch the commit message using the headSha
  COMMIT_MSG=$(gh api repos/$REPO/commits/$HEAD_SHA --jq '.commit.message')

  # Display the fetched information
  echo "Status: $STATUS"
  echo "Conclusion: $CONCLUSION"
  echo "Commit Message: $COMMIT_MSG"
else
  echo "No recent runs found."
fi