# Verifying Account Proof

This is a sample Next.js app showing you how to verify a user owns an account upon logging in to your website. <a href="https://www.youtube.com/watch?v=dFcVRpfYRY4" target="_blank">Here is the corresponding YouTube video.</a>

## Thanks

First of all, thank you SO MUCH to Greg who helped me with literally all of this. This would not be possible without his help (and he's also the one who developed this slick stuff!). Check out his GitHub here: https://github.com/gregsantos

## What is this all about?

<img src="https://i.imgur.com/Ekxf26s.png" />

Often times when creating an application, you want to know a user actually owns an account to get access to certain information. For example, when you use instagram, only you can see your archived posts because they are hidden just for you. 

When creating Decentralized Applications, we don't use a username and password. Instead, we use a wallet. So how can we verfify our account to a backend so we can get access to our personalized data? The answer is account proofs.

## Overview

<img src="https://i.imgur.com/5CudWVm.png" />

For helpful information, please see the corresponding documentation: https://github.com/onflow/fcl-js/blob/master/docs/reference/proving-authentication.mdx#authenticating-a-user-using-account-proof

I will simplify an overview for you here:
1. User clicks a login button.
2. Website asks server for a "nonce." You need this nonce to generate an account proof.
3. An account proof is generated, and is sent to a server to check if that nonce was generated by that backend. If it wasn't the validation is invalid. If it does exist, delete it, and continue.
4. Server verified the account proof is valid using FCL.
5. If both of the above are true, the user is validated.

## Developer Perpsective

### Generating an account proof
For account proofs to work, you must configure these in your fcl.config:
```javascript
fcl.config()
  .put("accessNode.api", "https://rest-testnet.onflow.org") // points us to testnet
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn") // allows us to use blocto wallet
  .put("fcl.accountProof.resolver", resolver) // allows us to generate account proof
  .put("env", "testnet") // allows us to validate account proof
```

Furthermore, your resolver function must return an `appIdentifier` and a `nonce`. The nonce is generated by your backend (`./pages/api/generate.js`), and the appIdentifier is a string naming your application.

```javascript
const resolver = async () => {
  const response = await fetch('/api/generate');
  const { nonce } = await response.json();
  return {
    appIdentifier: "JacobRocks",
    nonce
  }
}
```

### Verifying an account proof

This is done by passing the account proof to a backend (`./utils/login.js`) and verifying both the nonce and the account proof (`./pages/api/verify.js`).