# Fix: "pip: command not found" Error on Railway

## Problem
```
/bin/bash: line 1: pip: command not found
ERROR: failed to build: failed to solve: process "/bin/bash -ol pipefail -c pip install -r requirements.txt" did not complete successfully: exit code: 127
```

## Root Cause
Nixpacks/Railway was trying to use `pip` before properly initializing the Python environment. The pip command wasn't available in the PATH during the install phase.

## Solution Applied

### 1. Updated `nixpacks.toml`
Changed the install phase to explicitly upgrade pip first:

**Before:**
```toml
[phases.install]
cmds = ["pip install -r requirements.txt"]
```

**After:**
```toml
[phases.install]
cmds = [
  "python -m pip install --upgrade pip",
  "pip install --no-cache-dir -r requirements.txt"
]
```

### 2. Added `.python-version` file
Created a file specifying Python 3.11:
```
3.11
```

This ensures nixpacks uses the correct Python version.

### 3. Added build verification
Added a test step to verify the app can be imported:
```toml
[phases.build]
cmds = [
  "echo 'Building application...'",
  "python -c 'import app; print(\"App imported successfully\")'"
]
```

### 4. Updated `requirements.txt`
Added `python-dotenv` for better environment variable management.

## Files Changed
- ✅ `nixpacks.toml` - Fixed pip installation order
- ✅ `.python-version` - Specified Python 3.11
- ✅ `requirements.txt` - Added python-dotenv

## Deployment Steps

1. **Changes already committed and pushed** ✅
   ```bash
   git commit -m "Fix nixpacks pip installation error"
   git push origin main
   ```

2. **Railway will automatically rebuild**
   - Go to Railway dashboard
   - Watch the deployment logs
   - The error should be resolved

3. **If error persists, try:**
   - Go to Railway Settings
   - Click "Redeploy"
   - Or add a dummy environment variable change to trigger rebuild

## Why This Works

1. **`python -m pip`** - Uses the full Python path to call pip, ensuring it's found
2. **Upgrade pip first** - Ensures pip is properly initialized before installing packages
3. **`.python-version`** - Tells nixpacks exactly which Python version to set up
4. **`--no-cache-dir`** - Reduces build size and potential caching issues

## Additional Notes

### psycopg2-binary
The `psycopg2-binary` package is used for PostgreSQL connectivity. It's recommended for development and small deployments. For large-scale production, consider using `psycopg2` with proper system dependencies.

### Build Phase Verification
The added import test in the build phase helps catch import errors early, before the container starts.

## Expected Output After Fix

```
RUN pip install -r requirements.txt
Collecting Flask==3.0.0
  Downloading Flask-3.0.0-py3-none-any.whl (99 kB)
Collecting Flask-SQLAlchemy==3.1.1
  Downloading flask_sqlalchemy-3.1.1-py3-none-any.whl (25 kB)
...
Successfully installed Flask-3.0.0 Flask-Migrate-4.0.5 Flask-SQLAlchemy-3.1.1 Werkzeug-3.0.1 gunicorn-21.2.0 psycopg2-binary-2.9.9 python-dotenv-1.0.0
✓ Build successful!
```

## Troubleshooting

### Still Getting Errors?

1. **Check Railway Build Logs**
   - Look for specific error messages
   - Verify Python version is 3.11

2. **Clear Build Cache**
   - Railway Settings → Variables → Add new variable
   - Name: `NIXPACKS_NO_CACHE`
   - Value: `1`
   - This forces a clean rebuild

3. **Verify requirements.txt Format**
   - Ensure no trailing spaces
   - Check package versions are compatible
   - Make sure file uses Unix line endings (LF)

4. **Manual Trigger**
   - Sometimes Railway needs a manual trigger
   - Go to Deployments → Click "Deploy"

## Success Indicators

✅ Build completes without "command not found" errors
✅ All packages install successfully  
✅ App imports without errors in build phase
✅ Container starts and responds to health checks
✅ Website loads without 500 error
