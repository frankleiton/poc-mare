import { Unidade } from "@/types/cptec";
import {
  Autocomplete,
  Box,
  createFilterOptions,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface UnitsSelectorProps {
  value: Unidade | null;
  onChange: (unidade: Unidade | null) => void;
  label?: string;
  /** Renderização compacta para uso na barra superior. */
  dense?: boolean;
  fullWidth?: boolean;
  autoFocus?: boolean;
}

export default function UnitsSelector({
  value,
  onChange,
  label = "Unidades",
  dense = false,
  fullWidth = true,
  autoFocus = false,
}: UnitsSelectorProps) {
  const options: Unidade[] = ["KMH", "MS", "KTS"];

  const [inputValue, setInputValue] = useState(
    value ? `${value === "MS" ? "m/s" : value === "KMH" ? "km/h" : "kts"}` : "",
  );

  const optionLabel = (unidade: Unidade) =>
    `${unidade === "MS" ? "m/s" : unidade === "KMH" ? "km/h" : "kts"}`;

  const filterOptions = createFilterOptions<Unidade>({
    limit: 60,
    stringify: (option) =>
      `${option === "MS" ? "m/s" : option === "KMH" ? "km/h" : "kts"}`,
  });
  return (
    <Autocomplete
      size={dense ? "small" : "medium"}
      fullWidth={fullWidth}
      sx={dense ? { minWidth: { xs: 180, sm: 260 } } : undefined}
      options={options}
      value={value}
      inputValue={inputValue}
      onInputChange={(_, newInput, reason) => {
        // ignora o reset do input ao selecionar/limpar via value controlado
        if (reason !== "reset") setInputValue(newInput);
      }}
      onChange={(_, option) => {
        onChange(option ?? null);
        setInputValue(option ? optionLabel(option) : "");
      }}
      filterOptions={filterOptions}
      getOptionLabel={optionLabel}
      isOptionEqualToValue={(opt, val) => opt === val}
      noOptionsText={"Digite para buscar..."}
      autoHighlight
      renderOption={(props, option) => {
        const { key, ...rest } = props as typeof props & { key: string };
        return (
          <Box
            component="li"
            key={key}
            {...rest}
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
          >
            <span>{optionLabel(option)}</span>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          autoFocus={autoFocus}
          placeholder="Selecione unidades de velocidade"
        />
      )}
    />
  );
}
