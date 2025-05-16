import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi"
import { parseUnits } from "viem"
import Confidex_ABI from "@/abi/Confidex.json"

export const useDeposit = ({
  tokenAddress,
  amount,
  decimals = 18,
  onDepositSuccess,
}: {
  tokenAddress?: `0x${string}`
  amount?: string
  decimals?: number
  onDepositSuccess?: () => void
}) => {
  const { writeContractAsync } = useWriteContract()
  const { address } = useAccount()

  const depositTokens = async (): Promise<`0x${string}`> => {
    if (!tokenAddress || !amount || !address) throw new Error("Missing params")

    const txHash = await writeContractAsync({
      address: "0xb8BCD03794B61210dc21f0a6e4Ac89569B4eC21B" as `0x${string}`,
      abi: Confidex_ABI,
      functionName: "depositToken",
      args: [tokenAddress, parseUnits(amount, decimals)],
      account: address,
    })

    return txHash
  }

  return {
    depositTokens,
  }
}
