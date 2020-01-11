# ClubMembers

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Development server

This application will not run using `ng serve` because it uses json-server to provide api services. You must start it with the provided NPM script located in package.json, so enter `npm run start-dev` and then go to http://localhost:4200. 

## Build

Run `npm run build` to build the project for production. The build artifacts will be stored in the `dist/` directory. 

## Running unit tests

Sorry, no unit or e2e tests yet. That's still on my long list of things to learn.

## About the application

This application is a demo, created as a portfolio project to demonstrate to employers how I design and code. I am providing it as open source so anyone can use all or portions of the code, but I actually expect it to act more as a learning tool. For instance, I had a terrible time getting ngx-datatable to refresh when a row was added or deleted. You'll find a way to make that work in here. This application demonstrates the use of several technologies and techniques such as:
* Angular Material styling
* Bootstrap ngx-datatable with sorting and pagination
* Material dialogs managed by a service
* A reactive form using Material elements
* Flex-Layout (still learning this so it's not perfect)
* Json-server for creating REST services. 
