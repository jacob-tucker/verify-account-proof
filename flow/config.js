import * as fcl from "@onflow/fcl";

const resolver = async () => {
  const response = await fetch('/api/generate');
  const { nonce } = await response.json();
  return {
    appIdentifier: "JacobRocks",
    nonce
  }
}

fcl.config()
  .put("accessNode.api", "https://rest-testnet.onflow.org") // points us to testnet
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn") // allows us to use blocto wallet
  .put("fcl.accountProof.resolver", resolver)
  .put("env", "testnet")