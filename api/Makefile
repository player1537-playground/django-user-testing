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
$(PREFIX)run: $(PREFIX).depend.secondary
	cd $(current_dir) && \
	source venv/bin/activate && \
	if ./manage.py showmigrations --list | grep ' \[ \]' >/dev/null; then \
		./manage.py makemigrations && \
		./manage.py migrate; \
	fi && \
	./manage.py runserver $(API_PORT)

.PHONY: $(PREFIX)depend
$(PREFIX)depend: $(PREFIX).depend.seconadry

################
# My Targets

.PHONY: $(PREFIX)testing
$(PREFIX)testing:
	cd $(current_dir) && \
	source venv/bin/activate && \
	./manage.py migrate index zero

.SECONADRY: $(PREFIX).migrate.secondary
$(PREFIX).migrate.secondary:
	cd $(current_dir); \
	source venv/bin/activate; \
	./manage.py makemigrations; \
	./manage.py migrate; \
	touch $(notdir $@)

.SECONDARY: $(PREFIX).depend.secondary
$(PREFIX).depend.secondary: $(PREFIX)requirements.txt
	cd $(current_dir); \
	[ ! -e venv ] && python3 -m virtualenv venv; \
	source venv/bin/activate; \
	python3 -m pip install -r $(notdir $<); \
	touch $(notdir $@)
