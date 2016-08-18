# django-user-testing

This is a project to attempt to incorporate Django 1.10, DjangoRestFramework,
Webpack, VueJS, and Nginx into a simple blog application. This application will
act as a testbed for doing user authentication and may even act as a base for a
Django + DRF + VueJS tutorial/demonstration.

# Pre-requisites

Make sure these are installed:

* python3
* python3 -m pip
* python3 -m virtualenv
* node
* npm
* nginx
* envsubst

# Running the project

Ideally, it will just work if you run

```console
$ make noop                      # Copies .env.base to .env
$ ./scripts/create_pass.sh 128   # Generate any passwords you need
964d4af...
$ vi .env                        # Add the passwords you generated, and change CONFIGURED to true
$ make migrate                   # Optional, if `make` by itself doesn't work
$ make                           # Start the servers
```

But inevitably, something will not be correct or break, so here's an explanation
of some of the things that the Makefile does:

1. It loads all of your .env variables and exports them to the other processes
   that Make runs.
2. It imports 3 sub-makefiles from the 3 different major processes (api,
   frontend, and nginx).
3. It runs the `run` command on from each of the 3 other makefiles.
4. Each of the `run` commands also makes sure that any dependencies it has are
   met, which means it will do the necessary `pip install` or `npm install`.
5. Then each one will actually start their servers (`manage.py runserver`,
   `webpack-dev-server`, and `nginx`).

To kill the servers, Ctrl-C the Make process.
