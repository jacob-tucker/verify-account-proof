import * as fcl from "@onflow/fcl";

export async function login() {
  let res = await fcl.authenticate();

  const accountProofService = res.services.find(services => services.type === 'account-proof' );

  if (accountProofService) {
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(accountProofService.data)
    })

    const verified = await response.json();
    console.log(verified);
  }
}