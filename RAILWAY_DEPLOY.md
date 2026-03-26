# Railway Build Command

For Railway deployment, use these settings:

## Build Command
```bash
pip install -r requirements.txt
```

## Start Command
```bash
gunicorn app:app --timeout 120 --workers 4
```

## Or if using Custom Build Command field:
```bash
pip install -r requirements.txt && gunicorn app:app --timeout 120 --workers 4
```

## Environment Variables (add in Railway dashboard):

- `FLASK_ENV=production`
- `SECRET_KEY=your-random-secret-key-here`
- `DATABASE_URL=` (Railway will auto-generate this for PostgreSQL)

## Steps:

1. **Push to GitHub** (already done ✅)

2. **Connect Railway to GitHub:**
   - Go to https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `anongramchikk` repository

3. **Configure Build:**
   - In Railway dashboard, go to your project
   - Click on your service
   - Go to "Settings" tab
   - Under "Build", set:
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `gunicorn app:app --timeout 120 --workers 4`

4. **Add Database:**
   - In Railway dashboard, click "+ New"
   - Select "Database" → "PostgreSQL"
   - Railway will auto-provision and connect it

5. **Set Environment Variables:**
   - In Railway dashboard, go to "Variables" tab
   - Add:
     ```
     FLASK_ENV=production
     SECRET_KEY=<generate-random-string>
     ```

6. **Deploy:**
   - Railway will automatically deploy
   - Wait for build to complete (~2-3 minutes)
   - Click "Generate Domain" to get your URL

## Alternative: Using railway.toml

If you want to use the `railway.toml` file instead of manual configuration:

1. Railway will auto-detect `railway.toml`
2. No need to set build/start commands manually
3. Just make sure the file is in your repository root

## Troubleshooting:

### Error: "ModuleNotFoundError: No module named 'app'"
**Solution:** Make sure `app.py` is in the root directory (it is ✅)

### Error: "Database not found"
**Solution:** 
- Add PostgreSQL database in Railway
- Railway will auto-set `DATABASE_URL` environment variable
- Update `app.py` to use `DATABASE_URL` from environment

### Error: "Bind address already in use"
**Solution:** Railway handles port assignment automatically, don't specify port in `app.py`

### App crashes immediately
**Solution:** Check logs in Railway dashboard → "Deployments" → View Logs

## Production Database Setup

To use PostgreSQL instead of SQLite in production, update `app.py`:

```python
import os

# At the top of app.py
DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///anongram.db')

# Update the config
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
```

Then commit and push:
```bash
git add .
git commit -m "Add production database support"
git push
```

Railway will automatically redeploy!

---

**Railway Documentation:** https://docs.railway.app
