import crypto from "crypto";
import { addNonce } from "../../storage.js";

export default function handler(req, res) {
  const nonce = crypto.randomBytes(32).toString('hex');
  addNonce(nonce);
  res.status(200).json({ nonce });
}