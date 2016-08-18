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
$(PREFIX)run: $(PREFIX)nginx.conf
	cd $(current_dir); \
	nginx -c $(abspath $(PREFIX)nginx.conf) -g 'daemon off;'

.PHONY: $(PREFIX)depend
$(PREFIX)depend: $(PREFIX)nginx.conf

.PHONY: $(PREFIX)clean
$(PREFIX)clean:
	cd $(current_dir); rm -rf -- nginx.conf

################
# My Targets

$(PREFIX)nginx.conf: $(PREFIX)nginx.conf.template
	cd $(current_dir); \
	envsubst '$(subst $(space),$(comma),$(addprefix $$,$(ENV_VARIABLES)))' < $(notdir $<) > $(notdir $@)
