import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import type { ClimaDia } from "@/types/cptec";
import { weatherVisual, uvLevel } from "@/utils/weatherIcons";
import { formatarDataCurta } from "@/utils/format";
import SectionHeader from "./SectionHeader";

export default function ForecastSection({ dias }: { dias: ClimaDia[] }) {
  // pula o dia atual (índice 0) e mostra os próximos 5
  const proximos = dias.slice(1, 6);
  if (proximos.length === 0) return null;

  return (
    <Box>
      <SectionHeader
        icon={<CalendarMonthIcon color="primary" />}
        title="Próximos 5 dias"
        subtitle="Previsão do tempo"
      />
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(5, 1fr)",
          },
        }}
      >
        {proximos.map((dia) => {
          const { Icon, color } = weatherVisual(dia.condicao);
          const uv = uvLevel(dia.indice_uv);
          return (
            <Card key={dia.data} variant="outlined">
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 1,
                  "&:last-child": { pb: 2 },
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  {formatarDataCurta(dia.data)}
                </Typography>
                <Tooltip title={dia.condicao_desc}>
                  <Icon sx={{ fontSize: 44, color }} />
                </Tooltip>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ minHeight: 32, lineHeight: 1.2 }}
                >
                  {dia.condicao_desc}
                </Typography>
                <Stack direction="row" spacing={1.5}>
                  <Stack direction="row" spacing={0.25} alignItems="center">
                    <ArrowUpwardIcon
                      sx={{ fontSize: 16, color: "error.main" }}
                    />
                    <Typography fontWeight={600}>{dia.max}°</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.25} alignItems="center">
                    <ArrowDownwardIcon
                      sx={{ fontSize: 16, color: "primary.main" }}
                    />
                    <Typography color="text.secondary">{dia.min}°</Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                  sx={{ color: uv.color }}
                >
                  <WbSunnyIcon sx={{ fontSize: 14 }} />
                  <Typography variant="caption">UV {dia.indice_uv}</Typography>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
