#!/bin/bash

find $3 -exec sed -i '' "s%$1%$2%g" '{}' \;
