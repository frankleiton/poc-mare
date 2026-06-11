import { useEffect, useMemo, useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PlaceIcon from "@mui/icons-material/Place";
import { useCidade, useCidades } from "@/hooks/useWeatherQueries";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { Cidade, CidadeSelecionada } from "@/types/cptec";

interface CitySelectorProps {
  value: CidadeSelecionada | null;
  onChange: (cidade: CidadeSelecionada | null) => void;
  label?: string;
  /** Renderização compacta para uso na barra superior. */
  dense?: boolean;
  fullWidth?: boolean;
  autoFocus?: boolean;
}

// Limita a renderização: a lista do CPTEC tem milhares de cidades.
const filterOptions = createFilterOptions<Cidade>({
  limit: 60,
  stringify: (option) => `${option.nome} ${option.estado}`,
});

const optionLabel = (c: Cidade) => `${c.nome} - ${c.estado}`;

const semAcento = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export default function CitySelector({
  value,
  onChange,
  label = "Cidade",
  dense = false,
  fullWidth = true,
  autoFocus = false,
}: CitySelectorProps) {
  const { data: cidades, isLoading, isError } = useCidades();

  const baseOptions = useMemo(() => cidades ?? [], [cidades]);

  // Texto digitado pelo usuário, com debounce para a busca remota.
  const [inputValue, setInputValue] = useState(
    value ? `${value.nome} - ${value.estado}` : "",
  );

  // Sincroniza o input quando a cidade selecionada muda fora do componente
  // (ex.: troca via header ou cidade restaurada do localStorage).
  useEffect(() => {
    setInputValue(value ? `${value.nome} - ${value.estado}` : "");
  }, [value?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const termoBusca = useDebouncedValue(inputValue.trim(), 400);
  const termoNorm = semAcento(termoBusca);

  // Há correspondência na lista já carregada? (ignora acentos)
  const temMatchLocal = useMemo(() => {
    if (termoNorm.length < 3) return true;
    return baseOptions.some((c) =>
      semAcento(`${c.nome} ${c.estado}`).includes(termoNorm),
    );
  }, [baseOptions, termoNorm]);

  // Só consulta a API por nome quando a lista local não tem a cidade.
  const buscaRemotaAtiva =
    !isLoading && !temMatchLocal && termoNorm.length >= 3;
  const { data: cidadesRemotas, isFetching: buscandoRemoto } = useCidade(
    buscaRemotaAtiva ? termoBusca : null,
  );

  // Mescla a lista local com os resultados remotos (sem duplicar por id).
  const options = useMemo(() => {
    if (!cidadesRemotas?.length) return baseOptions;
    const ids = new Set(baseOptions.map((c) => c.id));
    return [...baseOptions, ...cidadesRemotas.filter((c) => !ids.has(c.id))];
  }, [baseOptions, cidadesRemotas]);

  // Reconcilia o valor persistido com a opção da lista (mesma referência).
  const selected = useMemo(() => {
    if (!value) return null;
    return (
      options.find((c) => c.id === value.id) ?? {
        id: value.id,
        nome: value.nome,
        estado: value.estado,
      }
    );
  }, [value, options]);

  const carregando = isLoading || buscandoRemoto;

  return (
    <Autocomplete
      size={dense ? "small" : "medium"}
      fullWidth={fullWidth}
      sx={dense ? { minWidth: { xs: 180, sm: 260 } } : undefined}
      options={options}
      loading={carregando}
      value={selected}
      inputValue={inputValue}
      onInputChange={(_, newInput, reason) => {
        // ignora o reset do input ao selecionar/limpar via value controlado
        if (reason !== "reset") setInputValue(newInput);
      }}
      onChange={(_, option) => {
        onChange(
          option
            ? { id: option.id, nome: option.nome, estado: option.estado }
            : null,
        );
        setInputValue(option ? optionLabel(option) : "");
      }}
      filterOptions={filterOptions}
      getOptionLabel={optionLabel}
      isOptionEqualToValue={(opt, val) => opt.id === val.id}
      noOptionsText={
        isError
          ? "Erro ao carregar cidades"
          : buscandoRemoto
            ? "Buscando cidade..."
            : termoNorm.length >= 3
              ? "Nenhuma cidade encontrada"
              : "Digite para buscar..."
      }
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
            <PlaceIcon fontSize="small" color="action" />
            <span>{option.nome}</span>
            <Box component="span" sx={{ ml: "auto", color: "text.secondary" }}>
              {option.estado}
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          autoFocus={autoFocus}
          placeholder="Ex.: Rio de Janeiro"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <LocationCityIcon
                  color={dense ? "inherit" : "primary"}
                  fontSize="small"
                />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {carregando ? (
                  <CircularProgress color="inherit" size={18} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
