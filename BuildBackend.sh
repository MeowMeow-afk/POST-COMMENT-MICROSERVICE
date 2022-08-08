docker rm -f comment-container eventbus-container posts-container query-container
docker rmi -f comment eventbus posts query
cd backend/comments && npm run dockerBuildAndRun
cd ..
cd ..
cd backend/EventBuss && npm run dockerBuildAndRun
cd ..
cd ..
cd backend/posts && npm run dockerBuildAndRun
cd ..
cd ..
cd backend/query && npm run dockerBuildAndRun
