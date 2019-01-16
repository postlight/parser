#!/bin/bash

# if os x, should be `sed -i ''` followed by replacement
find $3 -exec sed -i "s%$1%$2%g" '{}' \;
