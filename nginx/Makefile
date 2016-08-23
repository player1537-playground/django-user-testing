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

nginx_command := nginx
ifeq ($(NGINX_REQUIRE_SUDO),true)
nginx_command := sudo $(nginx_command)
endif

################
# Standard Targets

.PHONY: $(PREFIX)all
$(PREFIX)all: $(PREFIX)run

.PHONY: $(PREFIX)run
$(PREFIX)run: $(PREFIX)nginx.conf
	cd $(current_dir); \
	$(nginx_command) -c $(abspath $(PREFIX)nginx.conf) -g 'daemon off;'

.PHONY: $(PREFIX)depend
$(PREFIX)depend: $(PREFIX)nginx.conf

.PHONY: $(PREFIX)clean
$(PREFIX)clean:
	cd $(current_dir); rm -rf -- nginx.conf

################
# My Targets

$(PREFIX)nginx.conf: $(PREFIX)nginx.conf.template
	cd $(current_dir); \
	envsubst '$$PWD,$(subst $(space),$(comma),$(addprefix $$,$(ENV_VARIABLES)))' < $(notdir $<) > $(notdir $@)
