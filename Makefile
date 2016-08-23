MAKEFLAGS += --warn-undefined-variables
SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := all
.DELETE_ON_ERROR:
.SUFFIXES:

################
# Helpers

empty :=
space = $(empty) $(empty)
comma := ,

define current_dir
./$(firstword $(subst /,$(space),$@))
endef

################
# Environment Variables

################
# Sanity checks

env_file := .env
ifeq ($(wildcard $(env_file)),)
$(shell cp $(env_file:=.base) $(env_file))
$(info Created a base configuration in $(env_file))
endif
ifeq ($(wildcard $(env_file)),)
$(warn $(env_file) does not exist)
endif

################
# .env variables

define newline


endef

# Somewhat hacky code to load the variables from the current .env file into our
# makefile so that we can use them
ENV_VARIABLES :=
$(eval \
  $(subst @@@,$(newline),\
    $(shell \
while true; do \
  read line || break; \
  [ "$${#line}" -eq 0 ] && continue; \
  [ "$${line:0:1}" = "#" ] && continue; \
  var=$${line%%=*}; \
  value=$${line#*=}; \
  echo "define $$var@@@$$value@@@endef@@@export $$var@@@"; \
  echo 'ENV_VARIABLES := $$(ENV_VARIABLES)'"$${var:+$$var }@@@"; \
  done <$(env_file) \
)))

################
# Includes
export PREFIX := api/
-include api/Makefile

export PREFIX := frontend/
-include frontend/Makefile

export PREFIX := nginx/
-include nginx/Makefile

################
# Standard Targets

.PHONY: all
all: run

.PHONY: run
run:
	+$(MAKE) -j 3 api/run frontend/run nginx/run

.PHONY: depend
depend: api/depend frontend/depend nginx/depend

.PHONY: check
check: env-check

.PHONY: noop
noop:

################
# My Targets
.PHONY: env-check
env-check:
	./scripts/diff_env.bash

################
# Debugging

.PHONY: echo.%
echo.%:
	@echo $*=$($*)
