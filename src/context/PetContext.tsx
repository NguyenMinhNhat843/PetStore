import { createContext, ReactNode, useContext, useState } from "react";

type PetContextType = {
  pets: any[];
  setPets: React.Dispatch<React.SetStateAction<any[]>>;
  petId: number | null;
  setPetId: (id: number | null) => void;
};

export const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetContextProvider = ({ children }: { children: ReactNode }) => {
  const [pets, setPets] = useState<any[]>([]);
  const [petId, setPetId] = useState<number | null>(null);

  return (
    <PetContext.Provider value={{ pets, setPets, petId, setPetId }}>
      {children}
    </PetContext.Provider>
  );
};

export const useContextPet = () => {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error("Lỗi");
  return ctx;
};
