# Create a first time Web Client via Ethers

- I wanted to make a minimalist approach to interacting with a contract. Providing the users wallet, a contract that we can import or use from our logs.
- must style styling was not a priority

## notes

abi include
reads: Functions with view or pure (e.g., FLOWER(), balanceOf()).
writes: Functions without view/pure (e.g., mintTee(), safeTransferFrom()).
events: Entries with type: "event" (e.g., TransferSingle).

example abi to do, not json
abi: [
    "constructor()",
    "error ERC1155InsufficientBalance(address,uint256,uint256,uint256)",
    "event TransferSingle(address indexed,address indexed,address indexed,uint256,uint256)",
    "function FLOWER() view returns (uint256)",
    "function balanceOf(address,uint256) view returns (uint256)",
    "function mintTee(uint256)",
    // ... rest of your ABI
  ],
