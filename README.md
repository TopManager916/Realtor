<p align="center">Universal online real estate market for everyone! Realtor app allows users to find there dream homes or rental properties, and it also allows users to list their properties for rent or sale.</p>

## :rocket: Quick start

### Installation
 <i>General requirement</i> - <br/>
  In order for those projects to work, you'll need to have: <br/>
  <ul>
  <li>
    An IDE of your choice, but I'd really recommand Visual Studio code. If you do not own it yet, take a look
    <a href="https://code.visualstudio.com/"> here </a>.
  </li>
  </ul>

### Step 1: Clone the repo
- Either clone the repo or download the app and open the folder in the cli
- To clone the repo locally by doing -
```sh
git clone https://github.com/Topmanager916/realtor-react.git
```

### Step 2: Install dependencies
  - Install all dependencies using the `npm install` command
  - To do so, open your IDE, select the persistence Project and open the terminal, type `npm install` 

### Step 3: Setup firebase
- Go to firebase app, create a Firebase project and register your app
- Install the SDK and initialize Firebase, take a look at the documentation <a href="https://firebase.google.com/docs/web/setup"> here </a>.
- Don't use my `firebase.js` file, which is inside `src` folder, because my firebase configuration is different from yours, please read the documentation mentioned in 2nd point.
- Start the web server using the `npm start` command. The app will be served at http://localhost:3000/
