help:
	@echo "\nThis is a front-end and back-end directory focused on DApp development."
	@echo "The back-end (smart contracts) is located under the 'smart-contracts' directory."
	@echo "The front-end is located in the 'web-app' directory and is written in Next.js."
	@echo ""
	@echo "Available commands:"
	@echo "  make init   - Initialize the project by installing dependencies."
	@echo "  make run    - Deploy smart contracts and start the front-end development server."
	@echo "  make front  - Run only the front-end development server.\n"


front:
	cd web-app && npm run dev

run:
	make -C smart-contracts dep
	cd web-app && npm install && npm run dev

init:
	@if ! command -v npm >/dev/null 2>&1; then \
		echo "Error: npm is not installed. Please install npm and try again."; \
		exit 1; \
	fi
	@echo "Running npm install..."
	npm install
