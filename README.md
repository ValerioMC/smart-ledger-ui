# Smart Ledger UI

Applicazione frontend per Smart Ledger - Sistema di gestione finanziaria intelligente.

## Tecnologie Utilizzate

- **Angular 20** - Framework JavaScript per applicazioni web
- **Tailwind CSS 4** - Framework CSS utility-first per design moderno
- **TypeScript** - Linguaggio di programmazione tipizzato
- **RxJS** - Libreria per programmazione reattiva

## Prerequisiti

- Node.js 18+ e npm
- Backend Smart Ledger in esecuzione (vedi `smart-ledger-be/README.md`)

## Installazione

```bash
# Installare le dipendenze
npm install
```

## Configurazione

L'applicazione utilizza file di environment per la configurazione:

- `src/environments/environment.ts` - Configurazione sviluppo
- `src/environments/environment.prod.ts` - Configurazione produzione

### Configurazione Backend URL

Modificare il file `src/environments/environment.ts` per puntare al backend:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'  // URL del backend
};
```

## Sviluppo

```bash
# Avviare il server di sviluppo
npm start

# L'applicazione sarà disponibile su http://localhost:4200
```

Il server di sviluppo si ricaricherà automaticamente quando vengono modificati i file sorgente.

## Build

```bash
# Build di produzione
npm run build

# I file compilati saranno nella cartella `dist/smart-ledger-ui`
```

## Test

```bash
# Eseguire i test unitari
npm test
```

## Struttura del Progetto

```
src/
├── app/
│   ├── auth/                 # Modulo autenticazione
│   │   ├── login/           # Componente login
│   │   ├── auth.ts          # Servizio autenticazione
│   │   ├── auth-guard.ts    # Guard per rotte protette
│   │   └── auth-interceptor.ts  # Interceptor JWT
│   ├── dashboard/           # Componente dashboard
│   ├── app.routes.ts        # Configurazione routing
│   └── app.config.ts        # Configurazione app
├── environments/            # File di configurazione
└── styles.css              # Stili globali Tailwind
```

## Funzionalità Principali

### Autenticazione
- Login con username e password
- Autenticazione JWT con il backend
- Gestione automatica del token nelle richieste HTTP
- Protezione delle rotte tramite guard

### Dashboard
- Visualizzazione riepilogo finanziario
  - Entrate totali
  - Uscite totali
  - Bilancio corrente
- Lista transazioni recenti
- Design moderno e responsive

## Deployment

### Build di Produzione

```bash
npm run build
```

### Deploy su Server Web

1. Copiare il contenuto della cartella `dist/smart-ledger-ui` sul server web
2. Configurare il server per servire `index.html` per tutte le rotte (routing lato client)

### Esempio Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist/smart-ledger-ui;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy per API backend
    location /api {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Note di Sicurezza

- Il token JWT viene salvato in localStorage
- Le rotte protette richiedono autenticazione valida
- Tutte le richieste API includono automaticamente il token JWT nell'header Authorization

## Sviluppo Futuro

- Gestione transazioni (CRUD)
- Grafici e statistiche avanzate
- Categorie personalizzabili
- Export dati in vari formati
- Notifiche in tempo reale

## Licenza

Tutti i diritti riservati © 2025
