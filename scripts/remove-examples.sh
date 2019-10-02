#!/usr/bin/env bash

# remove examples
rm ./cypress/e2e/bar-page.e2e.js
rm ./cypress/smoke/bar-page.smoke.js
rm -rf ./src/app/components/HeadNavigation
rm -rf ./src/app/modules/bar
rm -rf ./src/app/routes/BarRoute
rm -rf ./src/app/routes/PrivateRoute
rm ./src/app/sagas/index.spec.js
rm ./test/integration/client/bar.route.test.js
rm ./test/integration/client/private.route.test.js

# update non example code to not use example code
cp -R ./starter-code/app/* ./src/app/
cp -R ./starter-code/server/* ./src/server/
cp -R ./starter-code/test/* ./test/
