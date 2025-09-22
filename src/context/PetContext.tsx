import { createContext, ReactNode, useContext, useReducer } from "react";
import {
  components,
  PathsPetFindByStatusGetParametersQueryStatus as PetStatus,
} from "../type/schema.d";

// Kiểu dữ liệu cho Pet
type Pet = components["schemas"]["Pet"];

type SearchParams = {
  petId?: number;
  status?: PetStatus;
};

// State trong context
type PetState = {
  pets: Pet[];
  petId: number | null;
  searchParams: SearchParams;
};

// Các loại action
type PetAction =
  | { type: "SEARCH_DATA"; payload: number | null }
  | { type: "ADD_PET"; payload: Pet }
  | { type: "SET_PETS"; payload: Pet[] }
  | { type: "SEARCH_PARAMS"; payload: SearchParams };

// Reducer
function petReducer(state: PetState, action: PetAction): PetState {
  switch (action.type) {
    case "SEARCH_DATA":
      return {
        ...state,
        petId: action.payload,
      };
    case "ADD_PET":
      return {
        ...state,
        pets: [...state.pets, action.payload],
      };
    case "SET_PETS": {
      return {
        ...state,
        pets: action.payload,
      };
    }
    case "SEARCH_PARAMS": {
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
}

// Context type
type PetContextType = {
  state: PetState;
  dispatch: React.Dispatch<PetAction>;
};

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(petReducer, {
    pets: [],
    petId: null,
    searchParams: {
      status: PetStatus.available,
    },
  });

  return (
    <PetContext.Provider value={{ state, dispatch }}>
      {children}
    </PetContext.Provider>
  );
};

// Custom hook
export const useContextPet = () => {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error("PetContext must be used within Provider");
  return ctx;
};
