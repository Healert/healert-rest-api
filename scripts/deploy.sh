docker login  -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD" 
export BUILD="build-$(git rev-parse --short ${TRAVIS_COMMIT})"
docker build -t enyachoke/healert-rest-api:$BUILD .
export API_IMAGE=enyachoke/healert-rest-api:$BUILD
docker push $CONFIG_IMAGE
export PATH=$PATH:$PWD/
git clone https://$GITHUB_USERNAME:$GITHUB_PASSWORD@github.com/Healert/healert-rest-api-cd-config.git
export APP_NAME=$TRAVIS_BRANCH
export APP_NAME_LOWER=$(echo $APP_NAME | tr "[:upper:]" "[:lower:]")
cd healert-rest-api-cd-config/
git checkout $APP_NAME || git checkout -b $APP_NAME
git pull origin master -s recursive -X theirs
sed -i "s~.*image=.*~  image='$CONFIG_IMAGE',~g" healert-jsonnet/healert-jsonnet.jsonnet
git add .
git commit -m "Update image to $CONFIG_IMAGE"
git push origin $APP_NAME -f