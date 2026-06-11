# Mare · Tempo & Oceano

POC em **Vite + React + TypeScript** que consome a API do **CPTEC/INPE** através da
[BrasilAPI](https://brasilapi.com.br/) para exibir previsão do tempo e previsão
oceânica das cidades brasileiras. Interface responsiva com **MUI** e **MUI Icons**.

## Recursos

- 🏙️ Tela inicial pede a localidade e a salva no `localStorage` — recarregada a cada visita.
- 🔎 Seletor de cidade no menu superior (carrega a lista completa do CPTEC e troca os dados ao selecionar).
- ☀️ Tempo atual + previsão dos próximos 5 dias (temperatura, condição e índice UV).
- 🌊 Previsão oceânica atual e dos próximos 5 dias (altura das ondas, agitação, vento e direção).
- 📱 Layout responsivo (mobile-first) com tema personalizado.

## Stack

| Camada            | Tecnologia                          |
| ----------------- | ----------------------------------- |
| Build             | Vite 5                              |
| UI                | React 18 + TypeScript               |
| Componentes       | MUI 6 + MUI Icons + Emotion         |
| Dados / cache     | TanStack React Query 5              |
| Rotas             | React Router 6                      |

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
```

Outros scripts:

```bash
npm run build    # type-check + build de produção
npm run preview  # serve o build
npm run lint     # type-check (tsc --noEmit)
```

## Estrutura

```
src/
├── api/            # cliente HTTP da BrasilAPI (CPTEC)
├── components/     # componentes de UI reutilizáveis
├── context/        # LocationContext (cidade selecionada + persistência)
├── hooks/          # useLocalStorage + hooks de dados (React Query)
├── pages/          # HomePage, AboutPage, NotFoundPage
├── types/          # tipos das respostas da API
├── utils/          # formatação de datas e mapeamento de ícones
├── App.tsx         # providers (tema, query, location, router)
├── router.tsx      # definição das rotas
└── main.tsx        # entrypoint
```

## Endpoints utilizados (CPTEC via BrasilAPI)

- `GET /cptec/v1/cidade` — lista de cidades
- `GET /cptec/v1/clima/previsao/{cityCode}/{dias}` — previsão do tempo
- `GET /cptec/v1/ondas/{cityCode}/{dias}` — previsão oceânica (cidades litorâneas)

> A previsão oceânica só está disponível para cidades do litoral; para as demais
> a aplicação exibe um aviso amigável.
