import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { CidadeSelecionada, Unidade } from "@/types/cptec";

const STORAGE_KEY = "mare:cidade-selecionada";

interface LocationContextValue {
  cidade: CidadeSelecionada | null;
  definirCidade: (cidade: CidadeSelecionada) => void;
  limparCidade: () => void;
  unidade: Unidade | null;
  setUnidade: (unidade: Unidade | null) => void;
}

const LocationContext = createContext<LocationContextValue | undefined>(
  undefined,
);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [cidade, setCidade, removeCidade] =
    useLocalStorage<CidadeSelecionada | null>(STORAGE_KEY, null);

  const [unidade, setUnidade] = useLocalStorage<Unidade | null>(
    "mare:unidade",
    "MS",
  );

  const value = useMemo<LocationContextValue>(
    () => ({
      cidade,
      definirCidade: setCidade,
      limparCidade: removeCidade,
      unidade,
      setUnidade: setUnidade,
    }),
    [cidade, setCidade, removeCidade, unidade, setUnidade],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocation deve ser usado dentro de <LocationProvider>");
  }
  return ctx;
}
