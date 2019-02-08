#!/bin/bash

echo $3

find $3 -exec sed -i '' "s%$1%$2%g" '{}' \;
