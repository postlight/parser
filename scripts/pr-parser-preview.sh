#!/bin/bash

changes=( `git diff origin/master --name-only` )

for fixture in "${changes[@]}"
do
	# If one of the changed files is a fixture, hold onto it
  if [[ $fixture == "fixtures/"* ]]; then
    fixtures=$fixture,$fixtures
  fi
done

if [[ $fixtures ]]; then
  # Take a screenshot of the fixture
  yarn phantomjs scripts/generate-fixture-preview.js $fixtures

  screenshots=( `find tmp/artifacts -type f | grep ".html.png"` )

  for screenshot in "${screenshots[@]}"
  do
    # Create a comment with a link to the screenshot
    # and json output for the fixture
    node scripts/comment-for-pr.js $screenshot
  done
else
  echo "No fixtures added in this PR, so no preview needed"
  node scripts/write-test-report.js
fi
