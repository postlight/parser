#!/bin/bash

echo $1
echo $2

find $3 -exec sed -i '' "s%$1%$2%g" '{}' \;
