import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useLocation } from "@/context/LocationContext";
import { usePrevisaoClima, usePrevisaoOndas } from "@/hooks/useWeatherQueries";
import { CptecApiError } from "@/api/cptec";
import LocationPrompt from "@/components/LocationPrompt";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import ForecastSection from "@/components/ForecastSection";
import CurrentOceanCard from "@/components/CurrentOceanCard";
import OceanForecastSection from "@/components/OceanForecastSection";
import { ErrorView, InfoView, LoadingView } from "@/components/StateViews";

function DashboardSkeleton() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rounded" height={220} />
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(5, 1fr)" },
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={170} />
        ))}
      </Box>
    </Stack>
  );
}

export default function HomePage() {
  const { cidade } = useLocation();

  const clima = usePrevisaoClima(cidade?.id);
  const ondas = usePrevisaoOndas(cidade?.id);

  if (!cidade) {
    return <LocationPrompt />;
  }

  return (
    <Stack spacing={4}>
      {/* Tempo */}
      <section>
        {clima.isLoading && <DashboardSkeleton />}
        {clima.isError && (
          <ErrorView
            title="Não foi possível carregar a previsão do tempo"
            description={
              clima.error instanceof CptecApiError
                ? clima.error.message
                : "Tente novamente em instantes."
            }
            onRetry={() => clima.refetch()}
          />
        )}
        {clima.data && (
          <Stack spacing={3}>
            <CurrentWeatherCard previsao={clima.data} />
            <ForecastSection dias={clima.data.clima} />
          </Stack>
        )}
      </section>

      <Divider />

      {/* Oceano */}
      <section>
        {ondas.isLoading && (
          <LoadingView label="Carregando previsão do mar..." />
        )}
        {ondas.isError && (
          <InfoView
            title="Previsão oceânica indisponível"
            description="Esta localidade pode não ser litorânea — o CPTEC só fornece dados de ondas para cidades do litoral."
          />
        )}
        {ondas.data && ondas.data.ondas.length > 0 && (
          <Stack spacing={3}>
            <CurrentOceanCard dia={ondas.data.ondas[0]} />
            <OceanForecastSection dias={ondas.data.ondas} />
          </Stack>
        )}
        {ondas.data && ondas.data.ondas.length === 0 && (
          <InfoView
            title="Sem dados de ondas"
            description="Não há previsão oceânica disponível para esta cidade."
          />
        )}
      </section>
    </Stack>
  );
}
