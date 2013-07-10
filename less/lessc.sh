#! /bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
lessc -x $DIR/main.less $DIR/../min.css
