@echo off
set service=%1%
gcloud run deploy %service:"=% --allow-unauthenticated --source=.