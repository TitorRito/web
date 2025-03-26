# Makefile for Ethereum Smart Contract development

# Default network
NETWORK ?= localhost

# Help command
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make compile         - Compile smart contracts"
	@echo "  make test            - Run tests"
	@echo "  make clean           - Clean build artifacts"
	@echo "  make deploy          - Deploy contracts to localhost (default)"
	@echo "  make deploy-lv2      - Deploy ErikGameLv2 to localhost"
	@echo "  make deploy-NETWORK=<network> - Deploy to specific network"

# Compile contracts
.PHONY: compile
compile:
	@echo "Compiling contracts..."
	npx hardhat compile

# Run tests
.PHONY: test
test: compile
	@echo "Running tests..."
	npx hardhat test

# Clean build artifacts
.PHONY: clean
clean:
	@echo "Cleaning build artifacts..."
	npx hardhat clean
	rm -rf cache artifacts

# Deploy all contracts
.PHONY: deploy
deploy: compile
	@echo "Deploying contracts to $(NETWORK)..."
	npx hardhat run scripts/deploy.js --network $(NETWORK)

# Deploy ErikGameLv2 specifically
.PHONY: deploy-lv2
deploy-lv2: compile
	@echo "Deploying ErikGameLv2 to $(NETWORK)..."
	npx hardhat run scripts/deployGameLv2.js --network $(NETWORK)

# Start a local Ganache instance
.PHONY: ganache
ganache:
	@echo "Starting Ganache..."
	npx ganache-cli

# Run tests with coverage
.PHONY: coverage
coverage:
	@echo "Running test coverage..."
	npx hardhat coverage

# Default target
.DEFAULT_GOAL := help
