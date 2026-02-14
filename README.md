# Global Explorer

An interactive web application for exploring countries, their details, and their geographic locations. Built with a focus on modern Angular standards and using Taiga UI.

Has a dark and a light mode, text search and a world map to pick and choose different countries.

# Usage & Setup
## Prerequisites

* Node.js (v18+)

* Angular CLI 
``` Bash
npm install -g @angular/cli
```

## Installation
Clone the repository:

``` Bash
git clone https://github.com/VitaliyStaskevich/global-explorer.git
cd global-explorer
```
Install dependencies:

``` Bash
npm install
```
Run the development server:
``` Bash
ng serve
```
Navigate to `http://localhost:4200`

To search for the country, start typing (at least 2 characters) and choose one from the list. Clicking on it will bring up all the relevant info about it.

## e2e testing
The testing is done using Cypress.
Running the tests:
``` Bash
ng e2e
```

# Technologies used
* Angular 19
* Taiga UI 4
* RxJS
* RESTCountries API
* AmCharts 5


