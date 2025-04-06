# Parent directory Makefile to forward commands to smart-contracts directory

# Smart contracts directory path
CONTRACTS_DIR = smart-contracts

# Help command
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make serve           - Start a local Hardhat node"
	@echo "  make sc-command      - Run any command in smart-contracts directory (e.g., make sc-command command=test)"

# Start a local Hardhat node
.PHONY: serve
serve:
	@echo "Passing MakeServe to the children..."
	@$(MAKE) -C $(CONTRACTS_DIR) serve

# Generic command forwarding to smart-contracts directory
.PHONY: sc-command
sc-command:
	@$(MAKE) -C $(CONTRACTS_DIR) $(command)

front:
	cd web-app && npm run dev

# Default target
.DEFAULT_GOAL := help
