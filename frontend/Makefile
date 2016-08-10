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

################
# Local Variables

################
# Standard Targets

.PHONY: $(PREFIX)all
$(PREFIX)all: $(PREFIX)run

.PHONY: $(PREFIX)run
$(PREFIX)run:
	cd $(current_dir); \
	./node_modules/.bin/webpack-dev-server \
	--host $(FRONTEND_SERVER_NAME) \
	--port $(FRONTEND_PORT)

.PHONY: $(PREFIX)depend
$(PREFIX)depend: $(PREFIX).depend.secondary

.PHONY: $(PREFIX)clean
$(PREFIX)clean:
	cd $(current_dir); rm -rf -- $(notdir $(PREFIX).depend.secondary)

################
# My Targets

.SECONDARY: $(PREFIX).depend.secondary
$(PREFIX).depend.secondary: $(PREFIX)package.json
	cd $(current_dir); \
	npm install; \
	touch $(notdir $@)
