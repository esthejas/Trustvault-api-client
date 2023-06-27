import { createContext,  useState } from "react";

const Secrertdata = createContext();

export function Keyprovider({ children }) {

  const [secr, setsecr] = useState();

  const usergvndata = (vaultSecretKey,vId) => {
    setsecr({vaultSecretKey,vId});
  };

  return (
    <Secrertdata.Provider value={{ secr, usergvndata }}>
      {children}
    </Secrertdata.Provider>
  );
}

export default Secrertdata;
