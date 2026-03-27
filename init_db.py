#!/usr/bin/env python3
"""
Database initialization script for Railway deployment.
Run this once after deploying to create all tables and admin account.
"""

from app import app, db, User, Group, GroupMember
from werkzeug.security import generate_password_hash

def init_db():
    with app.app_context():
        # Create all tables
        print("Creating database tables...")
        db.create_all()
        print("✓ Tables created successfully!")
        
        # Create admin account if not exists
        admin = User.query.filter_by(login='owwner').first()
        if not admin:
            print("Creating admin account...")
            admin = User(
                login='owwner',
                nickname='Admin',
                password_hash=generate_password_hash('musodzhonov'),
                is_admin=True,
                seed_phrases=None
            )
            db.session.add(admin)
            db.session.commit()
            print('✓ Admin account created!')
        else:
            print('✓ Admin account already exists')
        
        # Create Anongram News channel if not exists
        news_channel = Group.query.filter_by(name='Anongram News', is_channel=True).first()
        if not news_channel:
            print('Creating Anongram News channel...')
            news_channel = Group(
                name='Anongram News',
                description='Official Anongram News Channel',
                creator_id=admin.id,
                is_channel=True
            )
            db.session.add(news_channel)
            db.session.commit()
            
            # Add admin as member
            member = GroupMember(user_id=admin.id, group_id=news_channel.id)
            db.session.add(member)
            db.session.commit()
            print('✓ Anongram News channel created!')
        else:
            print('✓ Anongram News channel already exists')
        
        print('\n✅ Database initialization complete!')

if __name__ == '__main__':
    init_db()
