Anongram Messenger - Deployment Guide
=====================================

DEPLOYMENT TO my.canva.site (Canva Sites)
------------------------------------------

IMPORTANT NOTE: my.canva.site is designed for static websites only. 
Since Anongram uses Python Flask (a backend framework), you have several options:

OPTION 1: Deploy to a Python-friendly hosting service
------------------------------------------------------
Recommended services that support Flask/Python:

1. **Render.com** (FREE tier available)
   Steps:
   a. Create account at https://render.com
   b. Click "New +" → "Web Service"
   c. Connect your GitHub repository or upload files
   d. Configure:
      - Build Command: pip install -r requirements.txt
      - Start Command: gunicorn app:app
   e. Add requirements: echo "gunicorn==21.2.0" >> requirements.txt
   f. Deploy!

2. **Railway.app** (FREE tier with limits)
   Steps:
   a. Create account at https://railway.app
   b. Click "New Project" → "Deploy from GitHub repo"
   c. Railway auto-detects Python and deploys
   d. Add Procfile with: web: gunicorn app:app

3. **PythonAnywhere.com** (FREE tier available)
   Steps:
   a. Create account at https://www.pythonanywhere.com
   b. Upload files via Files tab
   c. Create web app with Flask framework
   d. Point to your app.py file
   e. Configure virtualenv and install requirements

4. **Heroku** (Paid, but reliable)
   Steps:
   a. Install Heroku CLI
   b. Create Procfile: web: gunicorn app:app
   c. Run: heroku create
   d. Run: git push heroku main
   e. Run: heroku ps:scale web=1

5. **Vercel** (with serverless functions)
   Note: Requires modifying app structure for serverless
   
6. **DigitalOcean App Platform** (Paid)
7. **Google Cloud Run** (Paid, pay-per-use)
8. **AWS Elastic Beanstalk** (Paid)


OPTION 2: Convert to Static Site + Backend API
-----------------------------------------------
If you MUST use my.canva.site specifically:

1. Separate frontend (HTML/CSS/JS) from backend (Flask)
2. Deploy frontend to my.canva.site
3. Deploy backend API to a separate service (Render, Railway, etc.)
4. Update frontend API calls to point to backend URL

However, this requires significant code restructuring.


RECOMMENDED APPROACH: Use Render.com (Easiest FREE option)
-----------------------------------------------------------

Step-by-step instructions:

1. CREATE REQUIREMENTS FILE UPDATE
   Add gunicorn to requirements.txt:
   ```
   Flask==3.0.0
   Flask-SQLAlchemy==3.1.1
   Flask-Migrate==4.0.5
   Werkzeug==3.0.1
   gunicorn==21.2.0
   ```

2. CREATE Procfile (no extension)
   Content: web: gunicorn app:app

3. CREATE runtime.txt (optional, specifies Python version)
   Content: python-3.11.0

4. PUSH TO GITHUB
   - Create GitHub repository
   - Push all files

5. DEPLOY TO RENDER
   - Login to render.com
   - Create new Web Service
   - Connect GitHub repo
   - Auto-detect settings
   - Click Deploy

6. CONFIGURE DATABASE (for production)
   Render provides free PostgreSQL database
   Update app.py to use production database URL from environment variable


QUICK DEPLOYMENT COMMANDS (for local testing):
----------------------------------------------
# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py

# Access at http://localhost:5000


FEATURES INCLUDED:
------------------
✅ Professional responsive design (PC & Mobile)
✅ Login/Registration choice on startup
✅ Registration with login → nickname → 13 seed phrases
✅ Seed phrase generation and display
✅ Login with seed phrase auto-fill (paste from clipboard)
✅ Unique nicknames (no duplicates)
✅ Create groups
✅ Create channels
✅ Add contacts by nickname
✅ Real-time messaging
✅ Contact list management
✅ Group and channel management
✅ Beautiful gradient UI design
✅ Secure seed-based authentication


TROUBLESHOOTING:
----------------
Issue: Database errors
Solution: Delete anongram.db and restart

Issue: Port already in use
Solution: Change port in app.py line 488

Issue: Can't access my.canva.site
Solution: my.canva.site doesn't support Python backends - use Render instead


DOMAIN SETUP (my.canva.site alternative):
------------------------------------------
If you want a custom domain:
1. Buy domain from Namecheap, GoDaddy, etc.
2. Point DNS to your hosting provider
3. Configure SSL certificate (most providers include free Let's Encrypt)


For questions or issues, check the hosting provider documentation.
