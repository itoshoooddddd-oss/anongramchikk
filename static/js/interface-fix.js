// Clean interface fix for all navigation issues

// Toggle side menu safely
function toggleSideMenu() {
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('sideMenuOverlay');
    
    if (menu && overlay) {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (menu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Add back button that works on ALL devices
function addBackButton() {
    const header = document.getElementById('chatHeader');
    if (!header) return;
    
    // Remove existing back button if any
    const existing = header.querySelector('.back-btn');
    if (existing) existing.remove();
    
    // Create new back button
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
    backBtn.onclick = function() {
        backToChatList();
    };
    
    // Insert at beginning of header
    header.insertBefore(backBtn, header.firstChild);
}

// Back to chat list - works everywhere
function backToChatList() {
    const chatListContainer = document.getElementById('chatListContainer');
    const messageInputContainer = document.getElementById('messageInputContainer');
    const messagesContainer = document.getElementById('messagesContainer');
    const header = document.getElementById('chatHeader');
    
    if (chatListContainer) chatListContainer.style.display = 'block';
    if (messageInputContainer) messageInputContainer.style.display = 'none';
    
    // Remove back button
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) backBtn.remove();
    
    // Reset header
    if (header) {
        header.innerHTML = '<div class="chat-title">Chats</div>';
    }
    
    // Show welcome message
    if (messagesContainer) {
        messagesContainer.innerHTML = `
            <div class="welcome-message">
                <h2>Welcome to Anongram! 🔐</h2>
                <p>Select a contact, group, or channel to start messaging.</p>
            </div>
        `;
    }
}

// Open group chat with back button
function openGroupChat(groupId, groupName) {
    const chatListContainer = document.getElementById('chatListContainer');
    if (chatListContainer) {
        chatListContainer.style.display = 'none';
    }
    
    // Call original function
    if (typeof window.originalOpenChat === 'function') {
        window.originalOpenChat(groupName);
    }
    
    // Set header
    const header = document.getElementById('chatHeader');
    if (header) {
        header.innerHTML = `<div class="chat-title">${groupName}</div>`;
    }
    
    // Add back button after short delay
    setTimeout(() => addBackButton(), 150);
}

// Open channel chat with back button
function openChannelChat(channelId, channelName) {
    const chatListContainer = document.getElementById('chatListContainer');
    if (chatListContainer) {
        chatListContainer.style.display = 'none';
    }
    
    // Call original function
    if (typeof window.originalOpenChat === 'function') {
        window.originalOpenChat(channelName);
    }
    
    // Set header
    const header = document.getElementById('chatHeader');
    if (header) {
        header.innerHTML = `<div class="chat-title">${channelName}</div>`;
    }
    
    // Add back button after short delay
    setTimeout(() => addBackButton(), 150);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Interface fixes loaded');
    
    // Store original openChat if exists
    if (typeof window.openChat === 'function') {
        window.originalOpenChat = window.openChat;
    }
    
    // Override openChat to add back button
    window.openChat = function(name) {
        if (window.originalOpenChat) {
            window.originalOpenChat(name);
        }
        setTimeout(() => addBackButton(), 150);
    };
});
