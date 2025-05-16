import { createWalletClient, http } from "viem"
import { getViemChain, supportedChains } from "@inco/js"
import { Lightning } from "@inco/js/lite"
import { useAccount } from "wagmi"

export const setupWallet = () => {
  const chainId = supportedChains.baseSepolia
  const zap = Lightning.latest("testnet", chainId)

  // Get the account from wagmi
  const { address } = useAccount()

  // Create the wallet client
  const walletClient = createWalletClient({
    chain: getViemChain(chainId),
    account: address as `0x${string}`,
    transport: http(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL),
  })

  return {
    zap,
    walletClient,
    chainId,
  }
}
