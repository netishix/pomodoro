# Pomodoro

This repository holds a time management App that uses the Pomodoro technique. It is built with ```Typescript```, ```NextJS```, ```Redux```, ```Bootstrap 5``` and ```Sass```.

The App uses redux and LocalStorage as the main datasource. This will change in future releases.

Check the [live demo](https://netishix-pomodoro.herokuapp.com/).

## Installation

1. Install dependencies with npm. ```npm install```
2. Generate a build. ```npm run build```
3. Define the ```$PORT``` variable in your environment.
4. Run the app. ```npm start```

## NextJS pages

The app contains the following pages:
* ```/``` - Home

## TODOs

* When updating the timer settings, re render the tomato using the latest settings
* When changing the alarm sound while the timer is running, unsubscribe from the timer 'targetAchieved' event
* Integrate the tasks list feature with the timer

## Linting

At the moment no linting tool has been installed. Linting may be provided by ```eslint``` and ```@typescript-eslint/parser``` 

## Versioning

This repository is versioned using [SemVer (Semantic Versioning)](https://semver.org/) and commits are formatted by using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Testing

At the moment the app has not been tested. 

## Author

Nahuel Vazquez [(@netishix)](https://www.github.com/netishix)
