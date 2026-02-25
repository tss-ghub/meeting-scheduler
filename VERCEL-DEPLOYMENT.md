# Vercel Deployment Guide

Complete step-by-step guide to deploy your Outlook Meeting Scheduler on Vercel.

## 🎯 What You'll Deploy

A serverless Outlook meeting scheduler that:
- ✅ Creates meetings in Outlook/Exchange
- ✅ Sends automatic invitations
- ✅ Cancels meetings for all participants
- ✅ Lists upcoming meetings
- ✅ Generates Teams meeting links

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ GitHub account (https://github.com)
- ✅ Vercel account (https://vercel.com)
- ✅ Azure account with App Registration (see Azure Setup below)
- ✅ Git installed on your computer
- ✅ Node.js installed (v18+)

## Part 1: Azure Setup (20 minutes)

### Step 1: Create Azure App Registration

1. **Go to Azure Portal:** https://portal.azure.com
2. **Navigate to App Registrations:**
   - Search for "App registrations" in the top search bar
   - Click on "App registrations"

3. **Create New Registration:**
   - Click "+ New registration"
   - Fill in:
     ```
     Name: Meeting Scheduler
     Supported account types: Single tenant
     Redirect URI: Leave blank
     ```
   - Click "Register"

4. **Save Your Credentials:**
   Copy these values (you'll need them later):
   - **Application (client) ID:** `12345678-1234-1234-1234-123456789abc`
   - **Directory (tenant) ID:** `87654321-4321-4321-4321-cba987654321`

### Step 2: Create Client Secret

1. **Navigate to Certificates & Secrets:**
   - Click "Certificates & secrets" in left menu
   - Click "+ New client secret"

2. **Create Secret:**
   ```
   Description: Meeting Scheduler Secret
   Expires: 24 months
   ```
   - Click "Add"
   - **IMMEDIATELY COPY THE VALUE** (you can't see it again!)
   - Save it as: `CLIENT_SECRET=aBcDeFgH...`

### Step 3: Configure API Permissions

1. **Add Permissions:**
   - Click "API permissions" in left menu
   - Click "+ Add a permission"
   - Select "Microsoft Graph"
   - Select "Application permissions" (NOT Delegated)

2. **Add These Permissions:**
   - Search for and add: `Calendars.ReadWrite`
   - Search for and add: `User.Read.All`
   - Click "Add permissions"

3. **Grant Admin Consent:**
   - Click "Grant admin consent for [Your Organization]"
   - Click "Yes"
   - Wait for green checkmarks to appear

✅ **Azure setup complete!** Keep your credentials handy.

## Part 2: Local Setup & Testing (10 minutes)

### Step 1: Prepare the Project

1. **Extract the project folder** to your computer
   ```
   Example: C:\Users\YourName\meeting-scheduler-vercel
   ```

2. **Open Terminal/Command Prompt** in the project folder
   - Windows: Navigate to folder, type `cmd` in address bar
   - Mac: Right-click folder → "New Terminal at Folder"

3. **Install Dependencies:**
   ```bash
   npm install
   ```

### Step 2: Configure Environment

1. **Create `.env` file:**
   ```bash
   # Windows
   copy .env.example .env
   
   # Mac/Linux
   cp .env.example .env
   ```

2. **Edit `.env` with your Azure credentials:**
   ```env
   CLIENT_ID=your_client_id_from_azure
   CLIENT_SECRET=your_client_secret_from_azure
   TENANT_ID=your_tenant_id_from_azure
   ORGANIZER_EMAIL=your.email@company.com
   ```

### Step 3: Test Locally (Optional)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Run Local Dev Server:**
   ```bash
   vercel dev
   ```

3. **Test in Browser:**
   - Open: http://localhost:3000
   - Try creating a test meeting
   - Check your Outlook calendar

4. **Stop the server:** Press `Ctrl + C`

## Part 3: Push to GitHub (5 minutes)

### Step 1: Create GitHub Repository

1. **Go to GitHub:** https://github.com/new
2. **Create Repository:**
   ```
   Repository name: outlook-meeting-scheduler-vercel
   Description: Outlook meeting scheduler with Vercel serverless
   Visibility: Public or Private (your choice)
   ```
   - **DO NOT** check "Add a README file"
   - Click "Create repository"

### Step 2: Push Your Code

In your terminal (in the project folder):

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Vercel serverless meeting scheduler"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/outlook-meeting-scheduler-vercel.git

# Push to GitHub
git branch -M main
git push -u origin main
```

If prompted, enter your GitHub username and password/token.

✅ **Refresh your GitHub page** - your files should be there!

## Part 4: Deploy to Vercel (10 minutes)

### Step 1: Sign Up & Connect GitHub

1. **Go to Vercel:** https://vercel.com
2. **Sign Up:**
   - Click "Sign Up"
   - Choose "Continue with GitHub"
   - Authorize Vercel to access your repositories

### Step 2: Import Your Project

1. **Import Repository:**
   - Click "Add New..." → "Project"
   - Find your `outlook-meeting-scheduler-vercel` repository
   - Click "Import"

2. **Configure Project:**
   ```
   Framework Preset: Other
   Root Directory: ./
   Build Command: (leave default)
   Output Directory: (leave default)
   ```

### Step 3: Add Environment Variables

**CRITICAL:** Click "Environment Variables" and add these:

```
Name: CLIENT_ID
Value: [Your Azure Client ID]

Name: CLIENT_SECRET
Value: [Your Azure Client Secret]

Name: TENANT_ID
Value: [Your Azure Tenant ID]

Name: ORGANIZER_EMAIL
Value: [Your email address]
```

**Important:** 
- Add these for "Production", "Preview", and "Development"
- Or just select "Production" if you only want production deployment

### Step 4: Deploy

1. **Click "Deploy"**
2. **Wait for deployment** (takes 1-3 minutes)
3. **You'll see a success screen with your URL!**

Your app is now live at: `https://your-project-name.vercel.app`

### Step 5: Update Azure Redirect URI (Important!)

Even though we're using serverless functions, update Azure for consistency:

1. **Copy your Vercel URL:** `https://your-project-name.vercel.app`
2. **Go to Azure Portal:**
   - Your App Registration → Authentication
   - Click "+ Add a platform" → Web
   - Add redirect URI:
     ```
     https://your-project-name.vercel.app/auth/callback
     ```
   - Click "Configure"

## Part 5: Test Your Live App (2 minutes)

1. **Visit your Vercel URL** in a browser
2. **Schedule a test meeting:**
   - Fill in the form
   - Use your email as attendee
   - Pick a future time
   - Click "Schedule Meeting"

3. **Check your Outlook calendar** - meeting should appear!

4. **Test cancellation:**
   - Click "Cancel Meeting"
   - Check calendar - should be removed

🎉 **Success!** Your serverless meeting scheduler is live!

## 📊 Understanding Vercel Deployment

### How It Works

**Vercel uses serverless functions:**
- Each API endpoint is a separate function
- Functions are deployed to edge locations worldwide
- Auto-scales based on traffic
- Pay-per-execution (free tier is generous)

**Your endpoints:**
```
POST   /api/create-meeting    - Creates meetings
DELETE /api/cancel-meeting    - Cancels meetings
GET    /api/list-meetings     - Lists meetings
GET    /api/health           - Health check
```

**Static files:**
```
/                    - Your frontend (index.html)
/public/*           - Static assets
```

### Vercel Free Tier Limits

✅ **Included for FREE:**
- 100 GB bandwidth/month
- 100 GB-hours serverless function execution
- 6,000 serverless function invocations/day
- Automatic HTTPS
- Global CDN
- Automatic deployments from Git

🎯 **Perfect for this app** - you'll likely never hit limits!

## 🔄 Making Updates

### Update Your Code

1. **Edit files locally**
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push
   ```
3. **Vercel auto-deploys** (takes 1-2 minutes)
4. **Check deployment status** in Vercel dashboard

### Update Environment Variables

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Settings → Environment Variables**
4. **Edit variables**
5. **Redeploy** (Deployments → … → Redeploy)

## 🎨 Customization

### Change the Design

Edit `public/index.html`:
- Colors in `<style>` section
- Text content
- Add your logo

Push to GitHub → Vercel auto-deploys!

### Add Features

1. Create new serverless function in `/api/` folder
2. Update frontend to call new endpoint
3. Push to GitHub

## 🔍 Monitoring & Logs

### View Logs

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Click "Deployments"**
4. **Click on latest deployment**
5. **Click "Functions"** to see function logs

### Monitor Usage

1. **Dashboard → Analytics**
   - See request counts
   - Response times
   - Error rates

2. **Dashboard → Usage**
   - Bandwidth used
   - Function executions
   - Build minutes

## ❓ Troubleshooting

### "Failed to create meeting"

**Check:**
- Environment variables are set correctly in Vercel
- Azure API permissions granted
- ORGANIZER_EMAIL matches Azure tenant

**Fix:**
1. Vercel Dashboard → Settings → Environment Variables
2. Verify all 4 variables exist
3. Redeploy if you made changes

### "Token acquisition failed"

**Check:**
- CLIENT_SECRET hasn't expired
- CLIENT_ID and TENANT_ID are correct
- Admin consent granted in Azure

**Fix:**
1. Generate new client secret in Azure
2. Update in Vercel environment variables
3. Redeploy

### "Function timeout"

**Possible causes:**
- First request (cold start) can take 5-10 seconds
- Microsoft Graph API slow response

**Fix:**
- This is normal for first request
- Subsequent requests are faster
- Consider upgrading to paid plan for faster cold starts

### Deployment fails

**Check build logs:**
1. Vercel Dashboard → Deployments
2. Click failed deployment
3. Read error message

**Common issues:**
- Missing dependencies in `package.json`
- Syntax errors in code
- Missing files

## 🔒 Security Best Practices

### Environment Variables
- ✅ Never commit `.env` to Git
- ✅ Use Vercel's encrypted environment variables
- ✅ Rotate client secrets regularly (every 6-12 months)

### Access Control
Consider adding:
- User authentication (OAuth)
- API rate limiting
- Email verification
- Admin approval for meetings

### HTTPS
- ✅ Vercel provides automatic HTTPS
- ✅ All data encrypted in transit
- ✅ SSL certificates auto-renewed

## 📱 Custom Domain (Optional)

Want your own domain? (e.g., meetings.yourcompany.com)

1. **Buy a domain** (Namecheap, Google Domains, etc.)
2. **In Vercel Dashboard:**
   - Settings → Domains
   - Add your domain
   - Follow DNS setup instructions
3. **Update Azure redirect URI** with new domain

## 🚀 Performance Tips

### Optimize Cold Starts
- Keep functions small and focused
- Minimize dependencies
- Cache access tokens (already implemented)

### Improve Response Times
- Use Vercel's edge network (automatic)
- Enable compression (automatic)
- Optimize frontend assets

### Scale Considerations
- Free tier handles ~6,000 meetings/day
- For higher volume, upgrade to Pro ($20/month)
- Consider moving to dedicated backend if >10,000 meetings/day

## 📞 Support & Resources

### Vercel Documentation
- Docs: https://vercel.com/docs
- Serverless Functions: https://vercel.com/docs/functions
- Environment Variables: https://vercel.com/docs/environment-variables

### Microsoft Graph
- API Docs: https://learn.microsoft.com/en-us/graph/
- Calendar API: https://learn.microsoft.com/en-us/graph/api/resources/calendar

### Getting Help
1. Check Vercel deployment logs
2. Review Azure API permissions
3. Test locally with `vercel dev`
4. Open GitHub issue with:
   - Error message
   - Steps to reproduce
   - Screenshots

## 🎓 What's Different from Regular Deployment?

**Vercel (Serverless):**
- ✅ No persistent server
- ✅ Auto-scales to zero
- ✅ Pay per execution
- ✅ Global edge deployment
- ❌ No persistent database (uses Graph API directly)
- ❌ Functions reset on each invocation

**Traditional Hosting:**
- Server always running
- Fixed capacity
- Monthly cost regardless of usage
- Single location
- Can use SQLite/databases
- Maintains state between requests

**For this app:** Vercel is perfect because we don't need persistent storage - all data is in Outlook/Exchange!

## 🎉 Congratulations!

You've successfully deployed a serverless Outlook meeting scheduler on Vercel!

### What You Accomplished:
- ✅ Built a full-stack serverless application
- ✅ Integrated with Microsoft Graph API
- ✅ Deployed to global edge network
- ✅ Set up automatic deployments from Git
- ✅ Configured secure environment variables
- ✅ Learned Azure Active Directory integration

### Next Steps:
1. Share your URL with colleagues
2. Customize the design
3. Add new features
4. Monitor usage in Vercel dashboard
5. Consider adding authentication

Enjoy your serverless meeting scheduler! 🚀
