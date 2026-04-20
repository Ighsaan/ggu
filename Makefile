.PHONY: format format-check lint typecheck build precommit

format:
	npm run format

format-check:
	npm run format:check

lint:
	npm run lint

typecheck:
	npm run typecheck

build:
	npm run build

precommit: format lint typecheck build
