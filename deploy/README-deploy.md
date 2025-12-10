# Study Pro Global - Deployment Guide

This guide covers the complete deployment setup for the Study Pro Global platform, including frontend (Admin & Flutter Web) deployment to Vercel and backend deployment to Google Cloud Run.

## 🏗️ Architecture Overview

- **Admin UI (React/Vite)**: Deployed to Vercel
- **Flutter Web App**: Built in GitHub Actions, deployed to Vercel
- **Backend (Node.js/Prisma)**: Deployed to Google Cloud Run via Docker
- **Database**: PostgreSQL (managed externally, e.g., Cloud SQL, Supabase, or other provider)
- **Storage**: AWS S3 or compatible service
- **Payments**: Stripe integration

## 📋 Prerequisites

### Required Accounts
1. **GitHub Account** - Repository access and Actions
2. **Vercel Account** - Frontend hosting
3. **Google Cloud Platform** - Backend hosting on Cloud Run
4. **Database Provider** - PostgreSQL database
5. **AWS Account** (or S3-compatible) - File storage
6. **Stripe Account** - Payment processing

### Required CLI Tools (for local setup)
- Node.js 18+
- Flutter SDK 3.16+
- Docker
- Google Cloud SDK (gcloud)
- Vercel CLI (optional)

## 🔐 GitHub Secrets Configuration

Navigate to your GitHub repository → Settings → Secrets and variables → Actions, and add the following secrets:

### Vercel Secrets
```
VERCEL_TOKEN              # Get from Vercel → Settings → Tokens
VERCEL_ORG_ID             # Get from Vercel CLI: vercel whoami
VERCEL_PROJECT_ID_ADMIN   # Get from Vercel → Project → Settings
VERCEL_PROJECT_ID_FLUTTER # Get from Vercel → Project → Settings
```

### Google Cloud Platform Secrets
```
GCP_PROJECT_ID            # Your GCP project ID
GCP_REGION                # e.g., us-central1, asia-south1
GCP_SA_KEY                # Service account JSON key (see below)
```

### Database Secrets
```
DATABASE_URL              # PostgreSQL connection string
                         # Format: postgresql://user:pass@host:5432/dbname
```

### Stripe Secrets
```
STRIPE_SECRET             # Stripe Secret Key (sk_...)
STRIPE_WEBHOOK_SECRET     # Stripe Webhook Signing Secret (whsec_...)
```

### AWS S3 Secrets
```
S3_BUCKET                 # S3 bucket name
S3_REGION                 # S3 region (e.g., us-east-1)
S3_ACCESS_KEY             # AWS Access Key ID
S3_SECRET_KEY             # AWS Secret Access Key
```

### Application Secrets
```
JWT_SECRET                # Random secret for JWT signing (min 32 chars)
                         # Generate with: openssl rand -base64 32
```

## 🔑 Setting Up Google Cloud Service Account

1. Go to GCP Console → IAM & Admin → Service Accounts
2. Create a new service account or use existing
3. Grant the following roles:
   - Cloud Run Admin
   - Service Account User
   - Storage Admin (for GCR)
4. Create a JSON key for the service account
5. Copy the entire JSON content and add it as `GCP_SA_KEY` secret

## 🌐 Vercel Project Setup

### Admin Project Setup
1. Go to Vercel Dashboard → Add New Project
2. Import the repository
3. Set **Root Directory** to `admin`
4. Framework Preset: Vite
5. Add Environment Variables:
   ```
   VITE_API_BASE=https://your-backend-url.run.app
   VITE_STRIPE_KEY=pk_...  # Stripe Publishable Key
   ```
6. Copy the Project ID and add as `VERCEL_PROJECT_ID_ADMIN`

### Flutter Project Setup
1. Go to Vercel Dashboard → Add New Project
2. Import the repository (or link same repo again)
3. Set **Root Directory** to `flutter/build/web`
4. Framework Preset: Other
5. Build Command: Leave empty (built by GitHub Actions)
6. Add Environment Variables (if needed):
   ```
   FLUTTER_WEB_API_BASE=https://your-backend-url.run.app
   ```
7. Copy the Project ID and add as `VERCEL_PROJECT_ID_FLUTTER`

## 🚀 Deployment Process

### Automatic Deployment
Once all secrets are configured, deployments are automatic:

1. **Push to `main` branch**
   - Admin changes trigger `deploy-admin.yml`
   - Flutter changes trigger `deploy-flutter.yml`
   - Backend changes trigger `deploy-backend-cloudrun.yml`

2. **Manual Deployment**
   - Go to Actions tab in GitHub
   - Select the workflow
   - Click "Run workflow"

### First-Time Backend Deployment

Before the first deployment, ensure your database is ready:

1. Create a PostgreSQL database
2. Set the `DATABASE_URL` secret
3. The Dockerfile automatically runs `prisma migrate deploy` on startup

### Monitoring Deployments

- **GitHub Actions**: Monitor in the Actions tab
- **Vercel**: View deployments in Vercel Dashboard
- **Cloud Run**: View in GCP Console → Cloud Run

## 🌍 Custom Domain Setup (www.studyproglobal.com.bd)

### Vercel Domain Configuration

#### For Admin:
1. Go to Vercel → Admin Project → Settings → Domains
2. Add domain: `admin.studyproglobal.com.bd`
3. Follow DNS instructions provided by Vercel
4. Add CNAME record in your DNS provider

#### For Flutter Web:
1. Go to Vercel → Flutter Project → Settings → Domains
2. Add domain: `www.studyproglobal.com.bd`
3. Follow DNS instructions provided by Vercel
4. Add CNAME record in your DNS provider

### Cloud Run Domain Configuration

1. Go to GCP Console → Cloud Run → studypro-backend
2. Click "Manage Custom Domains"
3. Add domain: `api.studyproglobal.com.bd`
4. Follow DNS instructions provided by GCP
5. Update VITE_API_BASE in Vercel to use custom domain

### DNS Configuration Example

Add these records to your DNS provider:

```
Type    Name                       Value
------------------------------------------------------
CNAME   www                        cname.vercel-dns.com
CNAME   admin                      cname.vercel-dns.com
CNAME   api                        ghs.googlehosted.com
```

Note: Actual values will be provided by Vercel and GCP.

## 🧪 Testing Deployments

### Admin UI
```bash
curl https://admin.studyproglobal.com.bd
# Should return the admin interface
```

### Flutter Web
```bash
curl https://www.studyproglobal.com.bd
# Should return the main application
```

### Backend API
```bash
curl https://api.studyproglobal.com.bd/health
# Should return: {"status":"ok"}
```

## 🔧 Local Development Setup

### Admin
```bash
cd admin
npm install
npm run dev
```

### Flutter
```bash
cd flutter
flutter pub get
flutter run -d chrome
```

### Backend
```bash
cd server-node
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

## 📊 Environment Variables Reference

### Backend (Cloud Run)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `STRIPE_SECRET` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `S3_BUCKET` - S3 bucket name
- `S3_REGION` - S3 region
- `S3_ACCESS_KEY` - AWS access key
- `S3_SECRET_KEY` - AWS secret key
- `NODE_ENV` - Set to "production"
- `PORT` - Set to 8080 (Cloud Run default)

### Frontend (Vercel)
- `VITE_API_BASE` - Backend API URL
- `VITE_STRIPE_KEY` - Stripe publishable key
- Any other frontend environment variables

## 🔍 Troubleshooting

### Deployment Fails in GitHub Actions
- Check the Actions logs for specific errors
- Verify all secrets are correctly set
- Ensure service account has correct permissions

### Vercel Deployment Issues
- Check build logs in Vercel dashboard
- Verify environment variables are set
- Check that the root directory is correct

### Cloud Run Deployment Issues
- Check Cloud Run logs in GCP Console
- Verify service account permissions
- Check that Docker image built successfully
- Verify environment variables are set

### Database Connection Issues
- Verify DATABASE_URL format is correct
- Ensure database allows connections from Cloud Run
- Check firewall rules if using Cloud SQL

### Domain Not Working
- Wait for DNS propagation (up to 48 hours)
- Verify DNS records are correct
- Check SSL certificate status in Vercel/GCP

## 📱 Mobile-Friendly Management

- **GitHub Mobile App**: Monitor deployments and trigger workflows
- **Vercel Mobile App**: View deployment status and logs
- **Google Cloud Console**: Mobile-friendly interface for Cloud Run

## 🔄 Rollback Procedure

### Vercel Rollback
1. Go to Vercel Dashboard → Deployments
2. Find the previous successful deployment
3. Click "Promote to Production"

### Cloud Run Rollback
1. Go to GCP Console → Cloud Run → studypro-backend
2. Click "Revisions"
3. Select previous revision
4. Click "Manage Traffic" → Set to 100%

### Database Rollback
Prisma migrations are forward-only. For rollback:
1. Restore database from backup
2. Deploy previous backend version

## 📞 Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Flutter Web Documentation](https://flutter.dev/web)

## ⚠️ Security Best Practices

1. **Never commit secrets** to version control
2. **Rotate secrets regularly** (every 90 days)
3. **Use least-privilege** IAM roles
4. **Enable HTTPS only** for all services
5. **Monitor logs** for suspicious activity
6. **Keep dependencies updated** for security patches
7. **Use environment-specific** secrets (dev, staging, prod)

## 📝 Maintenance Checklist

### Weekly
- [ ] Review deployment logs
- [ ] Check error rates in monitoring
- [ ] Verify backups are running

### Monthly
- [ ] Update dependencies (npm, Flutter)
- [ ] Review and rotate secrets if needed
- [ ] Check cloud costs
- [ ] Review security alerts

### Quarterly
- [ ] Security audit
- [ ] Performance optimization review
- [ ] Update deployment documentation
- [ ] Disaster recovery drill

---

**Last Updated**: December 2024  
**Maintained By**: Study Pro Global Team
