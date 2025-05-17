import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi"
import Confidex_ABI from "@/abi/Confidex.json"

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
      address: "0x571F608851ABf768F332233A43B6D54240cDA01E" as `0x${string}`,
      abi: Confidex_ABI,
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
