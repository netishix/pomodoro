# Pomodoro

This repository holds a time management App that uses the Pomodoro technique. It is built with ```Typescript```, ```NextJS```, ```Redux```, ```Bootstrap 5``` and ```Sass```.

The App uses redux (with react-redux and redux-toolkit) and LocalStorage as the main datasource. This will change in future releases.

Check the [live demo](https://netishix-pomodoro.herokuapp.com/).

## Installation

1. Install dependencies with npm. ```npm install```
2. Generate a build. ```npm run build```
3. Define the ```$PORT``` variable in your environment.
4. Run the app. ```npm start```

## NextJS pages

The app contains the following pages:
* ```/``` - Pomodoro Timer

## Usage

The app aims to improve your focus and concentration while you are working on a set of tasks. 
To get started follow the following steps:
1. Create a new task by typing a title and selecting the number of Pomodoros it will take.
2. Select the new created task by clicking the button with the "Play" icon.
3. Start the timer by clicking the "Start" button on the Tomato.
4. Start working on your task.

Your task will be planned and scheduled by using the following iteration types:  
* Pomodoro: 25 minutes (Work period)
* Short break: 5 minutes (Break period, run after each pomodoro)
* Long break: 15 minutes (Break period, run after 4 completed pomodoros)

All your data will be stored within LocalStorage, so be careful, if you clean your LocalStorage all your data will be lost!

The minutes of each iteration can be modified accordingly to your needs. The alarm sound (sounds after each completed iteration) can also be configured.
To do so, just click on the "Settings" section and update your settings as you wish.

## TODOs

* Unit test components
* Install and setup eslint
* Add authentication for users (with social login)
* Design a data-model for the backend
* Choose a datasource for the backend
* Rehydrate redux store with the backend datasource 

## Linting

At the moment no linting tool has been installed. Linting may be provided by ```eslint``` and ```@typescript-eslint/parser``` 

## Versioning

This repository is versioned using [SemVer (Semantic Versioning)](https://semver.org/) and commits are formatted by using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Testing

At the moment the app has not been tested. 

## Author

Nahuel Vazquez [(@netishix)](https://www.github.com/netishix)
