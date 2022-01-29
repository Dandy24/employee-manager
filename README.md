[![Node.js CI](https://github.com/Dandy24/employee-manager/actions/workflows/node.js.yml/badge.svg)](https://github.com/Dandy24/employee-manager/actions/workflows/node.js.yml)

## INSTALLATION

BE:
```
pipenv shell
pipenv install
pipenv run python manage.py migrate
pipenv run python manage.py runserver
```


FE:
 - setup .env
```
npm i
npm run start
```

## RUNNING TESTS

 - UNIT
```
npm run test
```
 - E2E
   - Using shell script start-e2e.sh
    
   - Using npm command
    ```
    npm run test:e2e
    ```
   
 - CODE COVERAGE
```
npm run test:coverage
```
