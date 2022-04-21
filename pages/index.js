import { login } from '../utils/login'
import "../flow/config.js";
import { useState, useEffect } from 'react';
import * as fcl from "@onflow/fcl";

export default function Home() {
  const [user, setUser] = useState();

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, [])

  return (
    <div>
      <pre>{JSON.stringify({ user }, null, 2)}</pre>
      <button onClick={login}>Log In</button>
      <button onClick={() => fcl.unauthenticate()}>Log Out</button>
    </div>
  )
}
