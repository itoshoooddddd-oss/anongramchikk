# 🔐 Login Credentials for Testing

## Admin Account
- **Login**: `owwner`
- **Password**: `musodzhonov`
- **Features**: 
  - Can post to Anongram News channel
  - Has 👑 Admin badge
  - Full access to all features

## Regular User Account
To test regular user login, you need to register first:

1. Go to http://localhost:5000
2. Click "Register"
3. Enter any unique login (e.g., `testuser123`)
4. Enter any unique nickname (e.g., `TestUser`)
5. **SAVE the 13 seed phrases** shown on screen
6. Click "Proceed to Login"
7. Login with your login and seed phrases

## Quick Test Steps

### Test Admin Login:
```
1. Open: http://localhost:5000/login
2. Login: owwner
3. Password: musodzhonov
4. Click "Login"
5. Should redirect to messenger with admin badge 👑
```

### Test Regular User Login:
```
1. Register new account at: http://localhost:5000/register
2. Save the 13 seed phrases
3. Go to login page
4. Enter your login
5. Paste your seed phrases
6. Click "Login"
7. Should redirect to messenger (no admin badge)
```

## Troubleshooting

### Problem: Page refreshes without logging in
**Solution**: 
- Make sure JavaScript is enabled
- Check browser console for errors (F12)
- Try clearing browser cache (Ctrl+Shift+Delete)
- Use different browser (Chrome recommended)

### Problem: "Invalid seed phrases" error
**Solution**:
- Make sure to enter all 13 words
- Words should be separated by spaces
- Order doesn't matter (system checks alphabetically)
- Copy-paste directly from registration

### Problem: "Invalid password" error for admin
**Solution**:
- Password is case-sensitive: `musodzhonov` (all lowercase)
- Login is case-sensitive: `owwner` (all lowercase)

### Problem: "User not found" error
**Solution**:
- Check if you're using correct login
- For admin: `owwner` (not "owner")
- For regular users: use exact login from registration

## Browser Console Debugging

If login still doesn't work:

1. Press **F12** to open Developer Tools
2. Go to **Console** tab
3. Try to login
4. Look for error messages
5. Share the error message for debugging

## Server Logs

Check server logs in PowerShell window:
- You should see login requests
- Look for status codes: 200 (success), 401 (unauthorized), 404 (not found)

## Session Issues

If sessions are not working:

1. Delete the database:
   ```powershell
   del instance\anongram.db
   ```

2. Restart server:
   ```powershell
   python app.py
   ```

3. Try again

---

**Server Status**: Running on http://localhost:5000
