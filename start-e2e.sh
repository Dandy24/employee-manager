cd empmanager
source venv/bin/activate
python3 manage.py runserver
cd ../frontend2
npm run test:e2e
