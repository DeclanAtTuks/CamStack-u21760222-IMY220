CamStack README for running it in deliverable 1

my git repo for camstack:
https://github.com/DeclanAtTuks/CamStack-u21760222-IMY220

Build and run the backend: (Please note you have to run these in my parent folder and not in each individual folder - backend/frontend)
docker build -t camstack-backend ./backend
docker run -p 1337:1337 camstack-backend

Build and run the frontend:(Please note you have to run these in my parent folder and not in each individual folder - backend/frontend)
docker build -t camstack-frontend ./frontend
docker run -p 5173:5173 camstack-frontend

Once both containers are running, open your browser to:
http://localhost:5173