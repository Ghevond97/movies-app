# movies-app

this is a 2 part project for a movies application

once you have cloned the project to your machine you should be able to see 2 project folders

1. movies-api-package
2. movies-app-electron

part 1

1. from your terminal move into movies-api-package
2. run npm install
3. run npm run build
4. run npm link

this steps should be sufficient to start the sdk

part 2

1. open another terminal
2. move to movies-app-electron folder
3. run npm install
4. run npm link movies-api-pack
5. run npm run dev

you shoould be able to see the movies app running in a new electron window

note: the original api link provided for this assignment https://search.imdbot.workers.dev/ is not functioning properly therefore it was replaced by a more reputable and well functioning movie db api. the api key is provided in the .env file and is incorporated into the application, altough it is not a best practice and is only done for testing purposes, in future it will be removed.
