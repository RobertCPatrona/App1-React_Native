## App1-React_Native

#### User Authentication is done with Firebase and the Database with SQLite. 

#### Pre existing credetials. Can be used directly:

Normal user: <br />
Email: user1@gmail.com <br />
Password: user1pass

Admin (only this one): <br />
Email: admin@gmail.com<br />
Password: adminpass

#### Main page <br />
-> The user can `Sign Up` (create an account) or `Log In` (with existing account). <br />
-> If the user is authenticated, you can see 2 pages: `List of Food Items` and `List of House Items`. <br />
-> If logged in as Admin, you can access the `List of Users`. <br />

#### Foot Items & House Items <br />
-> If logged in as Admin, you can `Add, Edit or Remove` an Item. 

#### To Run <br />
-> Download the Explo Client mobile app on your phone. <br />
-> Run `npm install --global expo-cli` to install expo, then navigate to the code directory and run `npm install`. <br />
-> To start the app, run `npm start` and scan the QR code with the Expo mobile app. The app will run on your phone. <br />
-> If there are issues on Windows with `npm install`, downgrade the `node` version to 12 or 13, for example version `v12.20.1`.
