MAKEFLAGS += --warn-undefined-variables
SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := all
.DELETE_ON_ERROR:
.SUFFIXES:

################
# Environment Variables

ifndef PREFIX
PREFIX :=
endif

ifndef PYTHONPATH
PYTHONPATH := $(PREFIX)
endif
export PYTHONPATH

################
# Local Variables

################
# Standard Targets

.PHONY: $(PREFIX)all
$(PREFIX)all: $(PREFIX)run

.PHONY: $(PREFIX)run
$(PREFIX)run: $(PREFIX).depend.secondary $(PREFIX).migrate.secondary
	cd $(current_dir) && \
	source venv/bin/activate && \
	./manage.py runserver $(API_PORT)

.PHONY: $(PREFIX)depend
$(PREFIX)depend: $(PREFIX).depend.secondary

################
# My Targets

.PHONY: $(PREFIX)testing
$(PREFIX)testing:
	cd $(current_dir) && \
	source venv/bin/activate && \
	./manage.py makemigrations

.PHONY: $(PREFIX)migrate
$(PREFIX)migrate: $(PREFIX).migrate.secondary

.SECONDARY: $(PREFIX).migrate.secondary
$(PREFIX).migrate.secondary: $(wildcard $(PREFIX)api/**/models.py) | $(PREFIX)api/db.sqlite3
	cd $(current_dir) && \
	source venv/bin/activate && \
	./manage.py makemigrations && \
	./manage.py migrate
	touch $@

.SECONDARY: $(PREFIX).depend.secondary
$(PREFIX).depend.secondary: $(PREFIX)requirements.txt
	cd $(current_dir) && \
	if [ ! -e venv ]; then python3 -m virtualenv venv; fi && \
	source venv/bin/activate && \
	python3 -m pip install -r $(notdir $<) && \
	./manage.py make_my_superuser && \
	touch $(notdir $@)
