set -e
cd empmanager
source venv/bin/activate
pipenv install
pipenv shell
python3 manage.py testserver test-data &
cd ../frontend2
npm run test:e2e &
cd ../frontend2
npm run start
