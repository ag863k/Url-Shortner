# URL Shortener

A full-stack URL shortening service with React frontend and Spring Boot backend. Features user authentication, analytics dashboard, and comprehensive URL management.

## Features

- Modern React UI with Tailwind CSS
- JWT Authentication system
- Analytics Dashboard with interactive charts
- URL Management - create, view, and track shortened URLs
- Click Tracking and detailed analytics
- Mobile Responsive design
- PostgreSQL database with JPA/Hibernate
- Docker containerization ready

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Material-UI, Chart.js, Axios  
**Backend:** Spring Boot 3.4, Java 17, Spring Security, JWT, PostgreSQL  
**Build:** Maven, npm, Docker

## Project Structure

```
url-shortener/
├── url-shortener-frontend/          # React Frontend
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── api/                    # API configuration
│   │   ├── contextApi/             # Context providers
│   │   ├── hooks/                  # Custom hooks
│   │   └── utils/                  # Utilities
│   ├── package.json
│   ├── vite.config.js
│   └── .env
├── url-shortener-sb/               # Spring Boot Backend
│   ├── src/main/java/com/url/shortener/
│   │   ├── controller/             # REST controllers
│   │   ├── models/                 # JPA entities
│   │   ├── repository/             # Data repositories
│   │   ├── service/                # Business logic
│   │   ├── security/               # Security config
│   │   └── dtos/                   # Data transfer objects
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── application-prod.properties
│   ├── pom.xml
│   └── Dockerfile
└── README.md
```

## Setup

### Prerequisites
- Node.js 18+, Java 17+, PostgreSQL 13+

### Backend Setup
```bash
cd url-shortener-sb

# Set environment variables
export DATABASE_URL=jdbc:postgresql://localhost:5432/url_shortener
export DATABASE_USERNAME=your_username
export DATABASE_PASSWORD=your_password
export JWT_SECRET=your_jwt_secret_key

./mvnw spring-boot:run
```

**Backend runs on:** `http://localhost:8080`

### Frontend Setup
```bash
cd url-shortener-frontend

npm install

# Create .env file
echo "VITE_BACKEND_URL=http://localhost:8080" >> .env
echo "VITE_REACT_FRONT_END_URL=http://localhost:5173" >> .env

npm run dev
```

**Frontend runs on:** `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### URL Management
- `POST /api/urls/shorten` - Create shortened URL
- `GET /api/urls/myurls` - Get user's URLs
- `GET /s/{shortUrl}` - Redirect to original URL

### Analytics
- `GET /api/urls/totalClicks` - Get click statistics
- `GET /api/urls/analytics/{shortUrl}` - Get URL analytics

## Production Deployment

### Backend (Azure App Service)

The backend can be deployed to Azure App Service for production use:

#### Prerequisites
- Azure account with active subscription
- Azure CLI installed and configured
- Maven installed locally

#### Deployment Steps

1. **Prepare the application:**
```bash
cd url-shortener-sb
mvn clean package -DskipTests
```

2. **Create Azure App Service:**
```bash
# Create resource group
az group create --name url-shortener-rg --location "East US"

# Create App Service plan
az appservice plan create --name url-shortener-plan --resource-group url-shortener-rg --sku B1 --is-linux

# Create web app
az webapp create --resource-group url-shortener-rg --plan url-shortener-plan --name your-url-shortener-app --runtime "JAVA:17-java17"
```

3. **Configure environment variables:**
```bash
az webapp config appsettings set --resource-group url-shortener-rg --name your-url-shortener-app --settings \
  DATABASE_URL="jdbc:postgresql://your-db-server.postgres.database.azure.com:5432/url_shortener" \
  DATABASE_USERNAME="your_username" \
  DATABASE_PASSWORD="your_password" \
  JWT_SECRET="your_jwt_secret_key" \
  SPRING_PROFILES_ACTIVE="prod"
```

4. **Deploy the application:**
```bash
az webapp deploy --resource-group url-shortener-rg --name your-url-shortener-app --src-path target/url-shortener-sb-1.0.0.jar --type jar
```

#### Azure Database for PostgreSQL
```bash
# Create PostgreSQL server
az postgres server create --resource-group url-shortener-rg --name your-db-server --location "East US" --admin-user your_username --admin-password your_password --sku-name B_Gen5_1

# Create database
az postgres db create --resource-group url-shortener-rg --server-name your-db-server --name url_shortener

# Configure firewall (allow Azure services)
az postgres server firewall-rule create --resource-group url-shortener-rg --server your-db-server --name AllowAzureServices --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0
```

**Backend URL:** `https://your-url-shortener-app.azurewebsites.net`

### Backend (Docker)
```bash
cd url-shortener-sb
docker build -t url-shortener-backend .
docker run -p 8080:8080 -e DATABASE_URL=... url-shortener-backend
```

### Frontend

#### Local Development
```bash
cd url-shortener-frontend
npm install
npm run build
```

#### Azure Static Web Apps Deployment
```bash
# Build for production
npm run build

# Deploy using Azure CLI
az staticwebapp create --name your-url-shortener-frontend --resource-group url-shortener-rg --location "East US 2" --source ./dist --branch main --token your_github_token

# Or deploy to Azure Storage (Static Website)
az storage account create --name yoururlstorage --resource-group url-shortener-rg --location "East US" --sku Standard_LRS
az storage blob service-properties update --account-name yoururlstorage --static-website --index-document index.html
az storage blob upload-batch --account-name yoururlstorage --destination '$web' --source ./dist
```

**Frontend URL:** `https://your-url-shortener-frontend.azurestaticapps.net`

#### Alternative: Netlify/Vercel
```bash
cd url-shortener-frontend
npm run build
# Deploy dist/ to Netlify, Vercel, or any static hosting service
```

## Security Features

- JWT token-based authentication
- BCrypt password hashing
- CORS configuration
- Input validation
- SQL injection protection

## Key Features

- **Performance Optimized**: Fast API responses, minimal bundle size
- **Security First**: Comprehensive security measures
- **Analytics**: Detailed click tracking and reporting
- **Responsive**: Mobile-first design approach
- **Scalable**: Production-ready architecture
- **Azure Ready**: Configured for Azure App Service and Static Web Apps deployment

## Production Optimizations

This project has been fully optimized for production deployment:

- **Backend**: Removed all Lombok dependencies, explicit code structure
- **Security**: JWT authentication, BCrypt hashing, input validation
- **Database**: PostgreSQL with optimized queries and connection pooling
- **Frontend**: Build-optimized React with Vite, lazy loading
- **Cloud**: Azure deployment scripts and configuration
- **Monitoring**: Comprehensive logging and error handling
- **Performance**: Minimized bundle size and API response times

## Azure Deployment Benefits

- **Scalability**: Auto-scaling based on demand
- **Reliability**: 99.95% uptime SLA
- **Security**: Built-in SSL, DDoS protection
- **Monitoring**: Application Insights integration
- **Cost-Effective**: Pay-as-you-scale pricing model
- **Global**: Content delivery network (CDN) support
