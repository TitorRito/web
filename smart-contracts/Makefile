# Makefile for Ethereum Smart Contract development

# Default network
NETWORK ?= localhost
# Arguments for deploy-generic, allowing space-separated contract names
CONTRACTS ?=

# Help command
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make compile         - Compile smart contracts"
	@echo "  make test            - Run tests"
	@echo "  make clean           - Clean build artifacts"
	@echo "  make deploy          - Deploy contracts to localhost (default)"
	@echo "  make deploy-lv2      - Deploy ErikGameLv2 to localhost"
	@echo "  make deploy-erik     - Deploy Erik1155 to localhost"
	@echo "  make dep CONTRACTS=\"Contract1 Contract2 ...\" - Deploy specified contracts (generic deployment)"
	@echo "  make dep20           - Deploy Erik token and ErikForge contracts"
	@echo "  make deploy-NETWORK=<network> - Deploy to specific network"
	@echo "  make serve           - Start a local Hardhat node"

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
	npx hardhat run scripts/deployGame.js --network $(NETWORK)

# Deploy ErikGameLv2 specifically
.PHONY: deploy-lv2
deploy-lv2: compile
	@echo "Deploying ErikGameLv2 to $(NETWORK)..."
	npx hardhat run scripts/deployGameLv2.js --network $(NETWORK)

# Deploy Erik1155 specifically
.PHONY: deploy-erik
deploy-erik: compile
	@echo "Deploying Erik1155 to $(NETWORK)..."
	npx hardhat run scripts/deployErik.js --network $(NETWORK)

# Generic contract deployment
.PHONY: dep
dep: compile
	@echo "Deploying specified contracts to $(NETWORK)..."
	npx hardhat run scripts/deployGeneric.js --network $(NETWORK)

# Deploy Erik token and ErikForge contracts
.PHONY: dep20
dep20: compile
	@echo "Deploying Erik token and ErikForge contracts to $(NETWORK)..."
	npx hardhat run scripts/deploy20.js --network $(NETWORK)

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

# Start a local Hardhat node
.PHONY: serve
serve:
	@echo "Starting local Hardhat node..."
	npx hardhat node

# Default target
.DEFAULT_GOAL := help
