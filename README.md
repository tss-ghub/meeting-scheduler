# Outlook Meeting Scheduler - Vercel Serverless

A serverless Outlook meeting scheduler deployed on Vercel with Microsoft Graph API integration.

## 🚀 Features

- ✅ Schedule meetings directly to Outlook calendar
- ✅ Automatic meeting invitations sent to attendees
- ✅ Cancel meetings (affects both organizer and attendees)
- ✅ View upcoming meetings
- ✅ Teams meeting integration
- ✅ Serverless architecture (auto-scales, pay-per-use)
- ✅ Global edge deployment

## 🎯 Quick Start

### 1. Prerequisites

- Node.js 18+
- Git
- GitHub account
- Vercel account (free)
- Azure account with admin access

### 2. Azure Setup (15 minutes)

**Complete Azure setup first** - see detailed instructions in `VERCEL-DEPLOYMENT.md`

You need:
- App Registration with Client ID and Secret
- API Permissions: `Calendars.ReadWrite`, `User.Read.All`
- Admin consent granted

### 3. Deploy to Vercel (5 minutes)

**Option A: Deploy Button (Fastest)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/outlook-meeting-scheduler-vercel)

**Option B: Manual Deploy**

```bash
# 1. Clone/download this repository
cd outlook-meeting-scheduler-vercel

# 2. Install Vercel CLI
npm install -g vercel

# 3. Install dependencies
npm install

# 4. Deploy
vercel

# Follow prompts and add environment variables when asked
```

**Option C: GitHub Integration (Recommended)**

1. Push this code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variables:
   - `CLIENT_ID`
   - `CLIENT_SECRET`
   - `TENANT_ID`
   - `ORGANIZER_EMAIL`
5. Click Deploy

### 4. Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
CLIENT_ID=your_azure_client_id
CLIENT_SECRET=your_azure_client_secret
TENANT_ID=your_azure_tenant_id
ORGANIZER_EMAIL=your.email@company.com
```

## 📁 Project Structure

```
outlook-meeting-scheduler-vercel/
├── api/
│   ├── _utils.js           # Shared Microsoft Graph utilities
│   ├── create-meeting.js   # POST /api/create-meeting
│   ├── cancel-meeting.js   # DELETE /api/cancel-meeting
│   ├── list-meetings.js    # GET /api/list-meetings
│   └── health.js           # GET /api/health
├── public/
│   └── index.html          # Frontend interface
├── package.json            # Dependencies
├── vercel.json            # Vercel configuration
└── VERCEL-DEPLOYMENT.md   # Complete deployment guide
```

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your Azure credentials
# Then run:
vercel dev

# Open http://localhost:3000
```

## 🌐 API Endpoints

- `POST /api/create-meeting` - Create a new meeting
- `DELETE /api/cancel-meeting?meetingId={id}` - Cancel a meeting
- `GET /api/list-meetings` - Get upcoming meetings
- `GET /api/health` - Health check

## 📖 Documentation

- **VERCEL-DEPLOYMENT.md** - Complete deployment guide
- **README.md** - This file (quick reference)

## 🔄 Update Your Deployment

```bash
# Make changes to your code
git add .
git commit -m "Update: description"
git push

# Vercel auto-deploys in 1-2 minutes!
```

## 🆘 Troubleshooting

### Common Issues

**"Failed to create meeting"**
- Check environment variables in Vercel
- Verify Azure API permissions granted
- Ensure ORGANIZER_EMAIL matches Azure tenant

**"Token acquisition failed"**
- Check CLIENT_SECRET hasn't expired
- Verify CLIENT_ID and TENANT_ID correct
- Confirm admin consent granted

**Function timeout**
- First request (cold start) can take 5-10 seconds
- This is normal - subsequent requests are faster

### View Logs

1. Vercel Dashboard → Your Project
2. Deployments → Latest Deployment
3. Functions → View logs

## 💰 Cost

**Vercel Free Tier includes:**
- 100 GB bandwidth/month
- 100 GB-hours function execution
- 6,000 function invocations/day
- Automatic HTTPS
- Global CDN

**Perfect for this app** - likely free forever unless you have high traffic!

## 🔒 Security

- HTTPS automatic (SSL certificates auto-renewed)
- Environment variables encrypted
- CORS configured
- Client credentials flow (OAuth 2.0)

**Recommended additions:**
- User authentication
- Rate limiting
- IP allowlisting

## 🚀 Why Vercel?

**Pros:**
- ✅ Serverless (no server management)
- ✅ Auto-scales to zero (no idle costs)
- ✅ Global edge network (fast everywhere)
- ✅ Automatic deployments from Git
- ✅ Free tier is generous
- ✅ Zero configuration needed

**Cons:**
- ❌ Cold starts (first request can be slow)
- ❌ No persistent storage (we use Graph API instead)
- ❌ Function execution limits (15 seconds max)

**For this app:** Vercel is ideal - we don't need persistent storage!

## 📱 Custom Domain

Want `meetings.yourcompany.com`?

1. Vercel Dashboard → Settings → Domains
2. Add your domain
3. Update DNS records
4. Update Azure redirect URI

## 🎨 Customization

**Change design:**
- Edit `public/index.html`
- Modify CSS in `<style>` section
- Push to GitHub → Auto-deploys!

**Add features:**
- Create new files in `/api/` for new endpoints
- Update frontend to call new endpoints
- Push to GitHub!

## 📞 Support

- **Full Guide:** See `VERCEL-DEPLOYMENT.md`
- **Vercel Docs:** https://vercel.com/docs
- **Graph API Docs:** https://learn.microsoft.com/en-us/graph/
- **Issues:** Open a GitHub issue

## 📄 License

MIT License - see LICENSE file

## 🙏 Acknowledgments

- Microsoft Graph API for calendar integration
- Vercel for serverless hosting
- Azure Active Directory for authentication

---

**Ready to deploy?** Start with `VERCEL-DEPLOYMENT.md` for the complete step-by-step guide!
