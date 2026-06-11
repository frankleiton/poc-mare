import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WavesIcon from "@mui/icons-material/Waves";
import StorageIcon from "@mui/icons-material/Storage";

export default function AboutPage() {
  return (
    <Card>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack spacing={2}>
          <Typography variant="h4">Sobre o Mare</Typography>
          <Typography color="text.secondary">
            Mare é uma POC que consome a API pública do CPTEC/INPE através da{" "}
            <Link
              href="https://brasilapi.com.br/"
              target="_blank"
              rel="noopener"
            >
              BrasilAPI
            </Link>{" "}
            para exibir condições meteorológicas e oceânicas das cidades
            brasileiras.
          </Typography>

          <List>
            <ListItem disableGutters>
              <ListItemIcon>
                <WbSunnyIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Previsão do tempo"
                secondary="Condição atual e próximos 5 dias, com temperatura e índice UV."
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon>
                <WavesIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="Previsão oceânica"
                secondary="Altura das ondas, agitação e vento para cidades litorâneas."
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon>
                <StorageIcon color="action" />
              </ListItemIcon>
              <ListItemText
                primary="Persistência local"
                secondary="A cidade escolhida fica salva no localStorage e é recarregada a cada visita."
              />
            </ListItem>
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
}
