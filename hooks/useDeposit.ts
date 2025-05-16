import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi"
import CONFIDEX_ABI from "@/abi/Confidex.json"

export const useDeposit = ({
  tokenAddress,
  onDepositSuccess,
}: {
  tokenAddress?: `0x${string}`
  onDepositSuccess?: () => void
}) => {
  const { writeContractAsync } = useWriteContract()
  const { address } = useAccount()

  const depositTokens = async (
    encryptedAmount: `0x${string}`
  ): Promise<`0x${string}`> => {
    if (!tokenAddress || !encryptedAmount || !address) {
      throw new Error("Missing required parameters")
    }

    const txHash = await writeContractAsync({
      address: process.env
        .NEXT_PUBLIC_CONFIDEX_CONTRACT_ADDRESS as `0x${string}`,
      abi: CONFIDEX_ABI,
      functionName: "depositToken",
      args: [tokenAddress, encryptedAmount],
      account: address,
    })

    return txHash
  }

  return {
    depositTokens,
  }
}
