# AngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Create new project
This project is with node 20 

 ```bash
 ng new project-name 
```

``` bash
ng generate component name-component
```
## ERROR ReferenceError: sessionStorage is not defined
To change the rendering, go to angular.json,and add 
```json
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true,
              "ssr":false,
              "prerender":false
              }
```

And from app.config delete the providerClienteHydration