#! /bin/bash 
 
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" 
lessc --yui-compress $DIR/less/main.less $DIR/min.css
curl -X POST -s --data-urlencode "input@$DIR/js/intro.js" http://javascript-minifier.com/raw > $DIR/min.js
curl -X POST -s --data-urlencode "input@$DIR/js/structure.js" http://javascript-minifier.com/raw >> $DIR/min.js
