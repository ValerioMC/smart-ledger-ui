# Smart Ledger UI

Frontend application for Smart Ledger — an intelligent financial management system.

## Technologies Used

- **Angular 20** — JavaScript framework for web applications
- **Tailwind CSS 4** — Utility‑first CSS framework for modern design
- **TypeScript** — Typed programming language
- **RxJS** — Library for reactive programming

## Prerequisites

- Node.js 18+ and npm
- Smart Ledger backend running (see `smart-ledger-be/README.md`)

## Installation

```bash
# Install dependencies
npm install
```

## Configuration

The application uses environment files for configuration:

- `src/environments/environment.ts` — Development configuration
- `src/environments/environment.prod.ts` — Production configuration

### Backend URL Configuration

Edit `src/environments/environment.ts` to point to the backend:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'  // Backend URL
};
```

## Development

```bash
# Start the development server
npm start

# The app will be available at http://localhost:4200
```

The dev server will automatically reload when source files change.

## Build

```bash
# Production build
npm run build

# The compiled files will be in `dist/smart-ledger-ui`
```

## Tests

```bash
# Run unit tests
npm test
```

## Project Structure

```
src/
├── app/
│   ├── auth/                 # Authentication module
│   │   ├── login/            # Login component
│   │   ├── auth.ts           # Authentication service
│   │   ├── auth-guard.ts     # Guard for protected routes
│   │   └── auth-interceptor.ts  # JWT interceptor
│   ├── dashboard/            # Dashboard component
│   ├── app.routes.ts         # Routing configuration
│   └── app.config.ts         # App configuration
├── environments/             # Configuration files
└── styles.css                # Global Tailwind styles
```

## Main Features

### Authentication
- Login with username and password
- JWT authentication with the backend
- Automatic token handling in HTTP requests
- Route protection using guards

### Dashboard
- Financial summary view
  - Total income
  - Total expenses
  - Current balance
- Recent transactions list
- Modern and responsive design

## Deployment

### Production Build

```bash
npm run build
```

### Deploy to a Web Server

1. Copy the contents of `dist/smart-ledger-ui` to your web server
2. Configure the server to serve `index.html` for all routes (client‑side routing)

### Nginx Example

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist/smart-ledger-ui;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API proxy
    location /api {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Security Notes

- The JWT token is stored in localStorage
- Protected routes require valid authentication
- All API requests automatically include the JWT token in the Authorization header

## Future Development

- Transaction management (CRUD)
- Advanced charts and analytics
- Customizable categories
- Data export in various formats
- Real-time notifications

## License

All rights reserved © 2025
