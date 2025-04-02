export enum SolItemType {
  READ = 'read',
  WRITE = 'write',
  EVENT = 'event'
}

export interface SolParam {
  name: string;
  type: string;
}

export interface SolItem {
  name: string;
  type: 'function' | 'event' | 'error' | 'constructor';
  inputs: SolParam[];
  outputs?: SolParam[];
  stateMutability?: string;
  itemType?: SolItemType; // Used to categorize as READ, WRITE, EVENT
}

// AIHelper function to parse ABI
export const parseAbiString = (abiString: string): SolItem | null => {
  const parts = abiString.match(/(constructor|error|event|function)\s+(\w+)\s*\((.*?)\)(?:\s+(view|pure))?(?:\s+returns\s*\((.*?)\))?/i);
  if (!parts) return null;

  const [, type, name, inputsStr, stateMutability, outputsStr] = parts;

  const parseParams = (str?: string): SolParam[] => {
    if (!str) return [];
    return str.split(',').map((param, index) => {
      const [type, name = `arg${index}`] = param.trim().split(/\s+/).reverse();
      return { name, type };
    });
  };

  // Determine the itemType
  let itemType: SolItemType | undefined;
  if (type === 'event') {
    itemType = SolItemType.EVENT;
  } else if (type === 'function') {
    itemType = (stateMutability === 'view' || stateMutability === 'pure') 
      ? SolItemType.READ 
      : SolItemType.WRITE;
  }

  return {
    type: type as 'function' | 'event' | 'error' | 'constructor',
    name,
    inputs: parseParams(inputsStr),
    outputs: type === 'function' ? parseParams(outputsStr || '') : undefined,
    stateMutability: stateMutability || (type === 'function' ? 'nonpayable' : undefined),
    itemType
  };
};

// Parse and categorize ABI
export const parseAndCategorizeAbi = (abi: any) => {
  const abiAsStringArray = typeof abi === 'string'
    ? [abi]
    : Array.isArray(abi)
      ? abi.map(item => typeof item === 'string' ? item : JSON.stringify(item))
      : [];

  const abiJson = abiAsStringArray.map(parseAbiString).filter(Boolean) as SolItem[];

  const reads = abiJson.filter(item => item.itemType === SolItemType.READ);
  const writes = abiJson.filter(item => item.itemType === SolItemType.WRITE);
  const events = abiJson.filter(item => item.itemType === SolItemType.EVENT);

  return { reads, writes, events };
};
