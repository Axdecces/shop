# BBS1 Shop Project

This application is a shop system which was developed as a school project. It demonstrates a modern web application which can be accessed in a browser and downloaded as a PWA.

## Architecture

For the backend Django with a REST-Api was used. This API was created with the package 'django-rest-framework' and makes the application usable with just http(s) requests. 

The REST-API was created by utilizing the django-rest-framework ModelSerializer, which creates API-routes for all CRUD-Operations and cusomizing them to provide special usecases.

For easier conifguration the Django-Admin-Interface is also accessible at [http:localhost:8000/admin/](http:localhost:8000/admin/).

We used a SQLite database for the application because it doesn't need a separat server for running the database and we don't need special user roles for accessing the database.

For the frontend [React](https://reactjs.org/) in combination with [tailwindcss](https://tailwindcss.com/) was used.
React also provides a service-worker, which makes it possible to download the application as a PWA (progressive web app).

The styling of the application was inspired by this blog post: [Hype 4 Academy](https://hype4.academy/articles/design/neubrutalism-is-taking-over-web)




## Installation

### Backend

Setup virtual environment and dependencies

    $ cd backend/
    $ python3 -m venv venv
    $ source venv/bin/activate
    
    $ pip install -r requirements.txt

    $ python manage.py migrate


Start local development server

    $ python manage.py runserver

### Frontend

Install Node dependencies

    $ cd frontend
    $ npm install

Run local development server

    $ npm start