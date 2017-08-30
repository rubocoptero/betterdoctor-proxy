# BetterDoctor API proxy challenge

## Prerequisites

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/installation/mac/) for Mac OS X
* [Install instructions](https://docs.docker.com/installation/ubuntulinux/) for Ubuntu Linux
* [Install instructions](https://docs.docker.com/installation/) for other platforms

Install [Docker Compose](http://docs.docker.com/compose/) on your system.

* Python/pip: `sudo pip install -U docker-compose`
* Other: ``curl -L https://github.com/docker/compose/releases/download/1.1.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose; chmod +x /usr/local/bin/docker-compose``
## Setup

Run `docker-compose build`.

Create a `.env` file in the root directory and set `BETTER_DOCTOR_USER_KEY` with your BetterDoctor API user key.

## Start

Run `docker-compose up` to create and start both `web` and `elastic` container. The app should then be running on your docker daemon on port 3030.

The web container is exposed to the host through [http://localhost:3030](http://localhost:3030).

## Test

Run the tests with `docker-compose exec web npm test`.
