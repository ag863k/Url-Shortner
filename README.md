# URL Shortener

A full-stack URL shortening service with a modern React frontend and Spring Boot backend. Features user authentication, analytics dashboard, and comprehensive URL management.

## 🚀 Features

### Frontend Features
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **User Authentication**: Login/Register with JWT token management
- **Dashboard Analytics**: Interactive charts showing click statistics
- **URL Management**: Create, view, and manage shortened URLs
- **Real-time Updates**: Instant UI updates after URL creation
- **Copy to Clipboard**: One-click URL copying functionality
- **Mobile Responsive**: Optimized for all device sizes

### Backend Features
- **RESTful API**: Clean REST endpoints for all operations
- **JWT Authentication**: Secure token-based authentication
- **Database Integration**: PostgreSQL with JPA/Hibernate
- **Click Tracking**: Detailed analytics and click event logging
- **CORS Support**: Cross-origin requests handling
- **Security**: Spring Security integration
- **URL Validation**: Input validation and sanitization

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom configuration
- **State Management**: React Context API + React Query
- **UI Components**: Material-UI (MUI) components
- **Charts**: Chart.js with React-ChartJS-2
- **HTTP Client**: Axios
- **Routing**: React Router DOM v7
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: React Icons
- **Animations**: Framer Motion

### Backend
- **Framework**: Spring Boot 3.4.0
- **Language**: Java 17
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA with Hibernate
- **Security**: Spring Security + JWT
- **Build Tool**: Maven
- **Development**: Lombok for boilerplate reduction

## 📁 Project Structure

```
url-shortener/
├── url-shortener-frontend/          # React Frontend
│   ├── src/
│   │   ├── components/             # React components
│   │   │   ├── Dashboard/          # Dashboard-specific components
│   │   │   │   ├── CreateNewShorten.jsx
│   │   │   │   ├── DashboardLayout.jsx
│   │   │   │   ├── Graph.jsx
│   │   │   │   ├── ShortenItem.jsx
│   │   │   │   ├── ShortenPopUp.jsx
│   │   │   │   └── ShortenUrlList.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── ...
│   │   ├── api/                   # API configuration
│   │   ├── contextApi/            # Context providers
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── utils/                 # Utility functions
│   │   └── ...
│   ├── public/                    # Static assets
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env                       # Environment variables
└── url-shortener-sb/              # Spring Boot Backend
    ├── src/main/java/com/url/shortener/
    │   ├── controller/            # REST controllers
    │   │   ├── AuthController.java
    │   │   ├── RedirectController.java
    │   │   └── UrlMappingController.java
    │   ├── models/                # JPA entities
    │   │   ├── User.java
    │   │   ├── UrlMapping.java
    │   │   └── ClickEvent.java
    │   ├── repository/            # Data repositories
    │   ├── service/               # Business logic
    │   ├── security/              # Security configuration
    │   ├── dtos/                  # Data transfer objects
    │   └── UrlShortenerSbApplication.java
    ├── src/main/resources/
    │   └── application.properties # App configuration
    ├── pom.xml                    # Maven dependencies
    └── Dockerfile                 # Docker configuration
```

## ⚙️ Installation & Setup

### Prerequisites
- **Frontend**: Node.js 18+ and npm
- **Backend**: Java 17+ and Maven
- **Database**: PostgreSQL 13+

### 1. Clone Repository
```bash
git clone https://github.com/ag863k/url-shortener.git
cd url-shortener
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd url-shortener-sb

# Set environment variables
# Create application-local.properties or set environment variables:
export DATABASE_URL=jdbc:postgresql://localhost:5432/url_shortener
export DATABASE_USERNAME=your_db_username
export DATABASE_PASSWORD=your_db_password
export DATABASE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
export JWT_SECRET=your_super_secret_jwt_key_here
export FRONTEND_URL=http://localhost:5173

# Install dependencies and run
./mvnw clean install
./mvnw spring-boot:run
```

**Backend will run on:** `http://localhost:8080`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd url-shortener-frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_REACT_FRONT_END_URL=http://localhost:5173" >> .env
echo "VITE_API_BASE_URL=http://localhost:8080" >> .env

# Start development server
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

## 🔧 Configuration

### Backend Environment Variables
```properties
DATABASE_URL=jdbc:postgresql://localhost:5432/url_shortener
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
JWT_SECRET=your_jwt_secret_key_minimum_32_characters
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment Variables
```env
VITE_REACT_FRONT_END_URL=http://localhost:5173
VITE_API_BASE_URL=http://localhost:8080
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### URL Management
- `POST /api/urls/shorten` - Create shortened URL
- `GET /api/urls/myurls` - Get user's URLs
- `GET /api/urls/totalClicks` - Get click analytics
- `GET /s/{shortUrl}` - Redirect to original URL

### Analytics
- `GET /api/urls/totalClicks?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` - Get click statistics

## 🚀 Deployment Scripts

### Frontend
```bash
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
./mvnw clean package                    # Create JAR file
java -jar target/url-shortener-sb-0.0.1-SNAPSHOT.jar  # Run JAR
```

## 🎨 Custom Styling

The project includes extensive Tailwind CSS customization:

```javascript
// Custom colors
colors: {
  customRed: "#dc2626",
  navbarColor: "#ffffff",
  btnColor: "#3364F7"
}

// Custom gradients
backgroundImage: {
  "custom-gradient": "linear-gradient(to right, #3b82f6, #9333ea)",
  "card-gradient": "linear-gradient(to right, #38b2ac, #4299e1)"
}

// Custom shadows
boxShadow: {
  custom: "0 0 15px rgba(0, 0, 0, 0.3)"
}
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: BCrypt password encryption
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: JPA/Hibernate query protection

## 📊 Key Dependencies

### Frontend Dependencies
- `react`, `react-dom` - Core React
- `react-router-dom` - Routing
- `react-query` - Server state management
- `axios` - HTTP client
- `react-hook-form` - Form handling
- `@mui/material` - UI components
- `chart.js`, `react-chartjs-2` - Analytics charts
- `tailwindcss` - Styling framework

### Backend Dependencies
- `spring-boot-starter-web` - Web framework
- `spring-boot-starter-data-jpa` - Database integration
- `spring-boot-starter-security` - Security framework
- `postgresql` - Database driver
- `jjwt-*` - JWT handling
- `lombok` - Code generation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request