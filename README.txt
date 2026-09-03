CamStack README for running it in deliverable 1

my git repo for camstack:
https://github.com/DeclanAtTuks/CamStack-u21760222-IMY220

Build and run the backend(cd into backend from my parent folder): 
docker build -t camstack-backend .
docker run -p 1337:1337 camstack-backend

Build and run the frontend (cd into frontend from my parent folder):
docker build -t camstack-frontend .
docker run -p 5173:5173 camstack-frontend

go to http://localhost:5173 to see CamStack
