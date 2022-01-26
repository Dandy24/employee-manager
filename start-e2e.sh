set -e
cd api
source venv/bin/activate
pipenv install
pipenv shell
python3 manage.py testserver test-data &
cd ../frontend
npm run ci
