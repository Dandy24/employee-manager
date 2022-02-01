set -e
cd api
#pipenv shell
pipenv install
pipenv run python manage.py testserver test-data &
cd ../frontend
npm run ci
