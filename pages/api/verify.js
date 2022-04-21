import * as fcl from "@onflow/fcl";
import { checkNonce, removeNonce } from "../../storage";

export default async function handler(req, res) {
  const data = req.body;
  const nonce = data.nonce;
  
  if (!checkNonce(nonce)) {
    return res.status(200).json({ verified: false });
  }

  removeNonce(nonce);

  const verified = await fcl.AppUtils.verifyAccountProof(
    "JacobRocks",
    data
  )

  res.status(200).json({ verified })
}