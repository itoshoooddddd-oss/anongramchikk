# 🔐 Admin Account & Anongram News Channel

## Changes Implemented

### 1. Admin Account Created ✅

**Login Credentials:**
- **Login**: `owwner`
- **Password**: `musodzhonov`
- **Nickname**: `Admin`
- **Badge**: 👑 Admin (golden badge visible in UI)

**Features:**
- Uses password instead of seed phrases
- Can post to "Anongram News" channel
- Special admin badge in the interface
- Full access to all features

### 2. Anongram News Channel Created ✅

**Channel Details:**
- **Name**: "Anongram News"
- **Type**: Channel (broadcast)
- **Access**: All users can view
- **Posting Rights**: Only admin (`owwner`) can post

**Purpose:**
- Official announcements
- News and updates
- Admin-only broadcasting

### 3. Login System Fixed ✅

**Improvements:**
- Fixed login variable naming conflict
- Added dual authentication:
  - Regular users: 13 seed phrases
  - Admin: Password (`musodzhonov`)
- Better error messages
- Session now tracks admin status

### 4. Database Updated ✅

**New Fields in User Model:**
- `seed_phrases`: Now nullable (NULL for admin)
- `password_hash`: Stores hashed password (for admin)
- `is_admin`: Boolean flag to identify admin

## How to Use

### Login as Admin

1. Go to login page
2. Enter login: `owwner`
3. Enter password: `musodzhonov`
4. Click "Login"

You'll see the 👑 Admin badge next to your nickname!

### Regular User Login

Regular users still use their 13 seed phrases as before.

### Posting to Anongram News

**As Admin:**
1. Select "Anongram News" channel from sidebar
2. Type your message
3. Click "Send"

**As Regular User:**
- You can VIEW the channel
- You CANNOT post messages (restricted to admin only)
- If you try to post, you'll get an error

## Technical Details

### Admin Creation (app.py)

```python
# Creates admin on first run
admin = User(
    login='owwner',
    nickname='Admin',
    password_hash=generate_password_hash('musodzhonov'),
    is_admin=True,
    seed_phrases=None
)
```

### News Channel Creation

```python
# Creates default channel
news_channel = Group(
    name='Anongram News',
    creator_id=admin.id,
    is_channel=True
)
```

### Message Restrictions

```python
# Only admin can post to Anongram News
if group and group.is_channel and group.name == 'Anongram News':
    if not user.is_admin:
        return jsonify({'error': 'Only admin can post to Anongram News'}), 403
```

## Security Notes

⚠️ **Important:**
- Admin password is stored as a hash (secure)
- Seed phrases are still stored in plain text (for development)
- For production, consider encrypting seed phrases

## Reset Everything

To reset and recreate the database:

```powershell
del instance\anongram.db
python app.py
```

This will recreate:
- Admin user (owwner / musodzhonov)
- Anongram News channel
- All database tables

## Files Modified

1. ✅ `app.py` - Backend logic
2. ✅ `templates/messenger.html` - Admin badge display
3. ✅ `templates/login.html` - Updated placeholder text
4. ✅ `static/css/style.css` - Admin badge styling

## Testing

1. **Test Admin Login:**
   - Login: owwner
   - Password: musodzhonov
   - Should see admin badge

2. **Test Regular User:**
   - Register new account
   - Get 13 seed phrases
   - Login with seed phrases
   - No admin badge

3. **Test News Channel:**
   - As admin: Post messages ✓
   - As regular user: Try to post ✗ (should fail)

---

**Implementation Complete! 🎉**
