'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Hex } from 'viem';
import { supportedChains } from '@inco/js';
import { Lightning } from '@inco/js/lite';
import { useWalletClient } from 'wagmi';

interface EncryptedBalanceProps {
  encryptedBalance: Hex;
  tokenSymbol: string;
}

export const EncryptedBalance = ({ encryptedBalance, tokenSymbol }: EncryptedBalanceProps) => {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [decryptedValue, setDecryptedValue] = useState<string | null>(null);
  const { data: walletClient } = useWalletClient();

  // Add debug logs
  console.log('EncryptedBalance props:', { encryptedBalance, tokenSymbol });
  console.log('Wallet client:', walletClient);

  const handleToggle = async () => {
    if (!isDecrypted && walletClient) {
      try {
        console.log('Attempting to decrypt balance:', encryptedBalance);
        const chainId = supportedChains.baseSepolia;
        const zap = Lightning.latest('testnet', chainId);
        const reencryptor = await zap.getReencryptor(walletClient);
        const resultPlaintext = await reencryptor({ handle: encryptedBalance });
        console.log('Decryption result:', resultPlaintext);
        setDecryptedValue(resultPlaintext.value.toString());
      } catch (error) {
        console.error('Error decrypting balance:', error);
      }
    }
    setIsDecrypted(!isDecrypted);
  };

  return (
    <div className="flex items-center gap-2 bg-gray-100/10 p-1 rounded">
      <span className="text-sm text-gray-500">
        {isDecrypted ? `${decryptedValue} ${tokenSymbol}` : '*****'}
      </span>
      <button
        onClick={handleToggle}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        title={isDecrypted ? 'Hide balance' : 'Show balance'}
      >
        {isDecrypted ? (
          <EyeOff className="w-4 h-4 text-gray-500" />
        ) : (
          <Eye className="w-4 h-4 text-gray-500" />
        )}
      </button>
    </div>
  );
}; 