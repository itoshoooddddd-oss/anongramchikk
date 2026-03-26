let currentChat = null;
let currentGroupId = null;
let currentRecipientId = null;
let selectedMessageId = null; // For reactions

// Modal functions
function showAddContactModal() {
    document.getElementById('addContactModal').style.display = 'block';
}

function showNewGroupModal() {
    document.getElementById('newGroupModal').style.display = 'block';
}

function showNewChannelModal() {
    document.getElementById('newChannelModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    // Clear result messages
    const resultDiv = document.querySelector(`#${modalId} .modal-result`);
    if (resultDiv) {
        resultDiv.textContent = '';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
    // Hide reaction picker if clicking outside
    if (!event.target.closest('.reaction-picker') && !event.target.closest('.message')) {
        const picker = document.getElementById('reactionPicker');
        if (picker) picker.style.display = 'none';
    }
}

// Group menu functions
function showGroupMenu(event, groupId, groupName) {
    document.getElementById('currentGroupId').value = groupId;
    document.getElementById('groupMenuTitle').textContent = groupName + ' - Settings';
    document.getElementById('groupMenuModal').style.display = 'block';
}

async function editGroupName() {
    const groupId = document.getElementById('currentGroupId').value;
    const newName = prompt('Enter new group name:');
    
    if (!newName || newName.trim() === '') return;
    
    try {
        const response = await fetch(`/api/groups/${groupId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName.trim() })
        });
        
        const data = await response.json();
        const resultDiv = document.getElementById('groupMenuResult');
        
        if (response.ok && data.success) {
            resultDiv.textContent = 'Group renamed successfully!';
            resultDiv.style.color = 'var(--success-color)';
            setTimeout(() => {
                closeModal('groupMenuModal');
                location.reload();
            }, 1000);
        } else {
            resultDiv.textContent = data.error || 'Failed to rename group';
            resultDiv.style.color = 'var(--danger-color)';
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.textContent = 'An error occurred';
        resultDiv.style.color = 'var(--danger-color)';
    }
}

async function deleteGroupConfirm() {
    const confirmed = confirm('Are you sure you want to delete this group? This cannot be undone.');
    if (!confirmed) return;
    
    const groupId = document.getElementById('currentGroupId').value;
    
    try {
        const response = await fetch(`/api/groups/${groupId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        const resultDiv = document.getElementById('groupMenuResult');
        
        if (response.ok && data.success) {
            resultDiv.textContent = 'Group deleted successfully!';
            resultDiv.style.color = 'var(--success-color)';
            setTimeout(() => {
                closeModal('groupMenuModal');
                location.reload();
            }, 1000);
        } else {
            resultDiv.textContent = data.error || 'Failed to delete group';
            resultDiv.style.color = 'var(--danger-color)';
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.textContent = 'An error occurred';
        resultDiv.style.color = 'var(--danger-color)';
    }
}

// Add contact
async function addContact() {
    const nickname = document.getElementById('contactNickname').value.trim();
    const resultDiv = document.getElementById('addContactResult');
    
    if (!nickname) {
        resultDiv.textContent = 'Please enter a nickname';
        resultDiv.style.color = 'var(--danger-color)';
        return;
    }
    
    try {
        const response = await fetch('/api/contacts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nickname })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            resultDiv.textContent = 'Contact added successfully!';
            resultDiv.style.color = 'var(--success-color)';
            setTimeout(() => {
                closeModal('addContactModal');
                location.reload();
            }, 1500);
        } else {
            resultDiv.textContent = data.error || 'Failed to add contact';
            resultDiv.style.color = 'var(--danger-color)';
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.textContent = 'An error occurred';
        resultDiv.style.color = 'var(--danger-color)';
    }
}

// Create group or channel
async function createGroup(isChannel) {
    const nameInput = isChannel ? document.getElementById('channelName') : document.getElementById('groupName');
    const resultDiv = isChannel ? document.getElementById('createChannelResult') : document.getElementById('createGroupResult');
    const name = nameInput.value.trim();
    
    if (!name) {
        resultDiv.textContent = `Please enter a ${isChannel ? 'channel' : 'group'} name`;
        resultDiv.style.color = 'var(--danger-color)';
        return;
    }
    
    try {
        const response = await fetch('/api/groups/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, is_channel: isChannel })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            resultDiv.textContent = `${isChannel ? 'Channel' : 'Group'} created successfully!`;
            resultDiv.style.color = 'var(--success-color)';
            setTimeout(() => {
                closeModal(isChannel ? 'newChannelModal' : 'newGroupModal');
                location.reload();
            }, 1500);
        } else {
            resultDiv.textContent = data.error || 'Failed to create';
            resultDiv.style.color = 'var(--danger-color)';
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.textContent = 'An error occurred';
        resultDiv.style.color = 'var(--danger-color)';
    }
}

// Open chat with contact
async function openChat(nickname) {
    currentChat = nickname;
    currentGroupId = null;
    
    // Find user ID for this nickname
    const userId = await getUserIdByNickname(nickname);
    currentRecipientId = userId;
    
    updateChatHeader(nickname);
    await loadMessages();
    
    // Show input container
    document.getElementById('messageInputContainer').style.display = 'flex';
}

// Open group/channel chat
async function openGroup(groupId, groupName) {
    currentChat = groupName;
    currentGroupId = groupId;
    currentRecipientId = null;
    
    updateChatHeader(groupName);
    await loadMessages();
    
    // Show input container
    document.getElementById('messageInputContainer').style.display = 'flex';
}

// Update chat header
function updateChatHeader(name) {
    const header = document.getElementById('chatHeader');
    header.innerHTML = `<div class="chat-title">${name}</div>`;
}

// Get user ID by nickname
async function getUserIdByNickname(nickname) {
    try {
        const response = await fetch('/api/contacts/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nickname })
        });
        
        const users = await response.json();
        const user = users.find(u => u.nickname === nickname);
        return user ? user.id : null;
    } catch (error) {
        console.error('Error getting user ID:', error);
        return null;
    }
}

// Load messages
async function loadMessages() {
    try {
        const body = {};
        if (currentGroupId) {
            body.group_id = currentGroupId;
        } else if (currentRecipientId) {
            body.recipient_id = currentRecipientId;
        }
        
        const response = await fetch('/api/messages/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        const messages = await response.json();
        displayMessages(messages);
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

// Display messages
function displayMessages(messages) {
    const container = document.getElementById('messagesContainer');
    container.innerHTML = '';
    
    if (messages.length === 0) {
        container.innerHTML = '<div class="welcome-message"><p>No messages yet. Start the conversation!</p></div>';
        return;
    }
    
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        
        // Determine if message is sent or received
        const isSent = msg.sender_nickname === '{{ user.nickname }}';
        messageDiv.classList.add(isSent ? 'sent' : 'received');
        
        // Add contextmenu event for reactions (right-click on PC)
        messageDiv.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showReactionPicker(e, msg.id);
        });
        
        // Add long press for mobile
        let pressTimer;
        messageDiv.addEventListener('touchstart', function(e) {
            pressTimer = setTimeout(() => {
                showReactionPicker(e, msg.id);
            }, 500);
        });
        messageDiv.addEventListener('touchend', function() {
            clearTimeout(pressTimer);
        });
        messageDiv.addEventListener('touchmove', function() {
            clearTimeout(pressTimer);
        });
        
        let html = '';
        if (currentGroupId) {
            html += `<div class="message-sender">${escapeHtml(msg.sender_nickname)}</div>`;
        }
        html += `<div class="message-content">${escapeHtml(msg.content)}</div>`;
        
        // Display reactions
        if (msg.reactions && Object.keys(msg.reactions).length > 0) {
            html += '<div class="message-reactions">';
            for (const [emoji, users] of Object.entries(msg.reactions)) {
                html += `<span class="reaction-badge" title="${users.join(', ')}">${emoji} ${users.length}</span>`;
            }
            html += '</div>';
        }
        
        html += `<div class="message-time">${formatTime(msg.timestamp)}</div>`;
        
        messageDiv.innerHTML = html;
        container.appendChild(messageDiv);
    });
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

// Show reaction picker
function showReactionPicker(event, messageId) {
    selectedMessageId = messageId;
    const picker = document.getElementById('reactionPicker');
    
    // Position picker near the click/touch
    const rect = event.target.getBoundingClientRect();
    picker.style.display = 'flex';
    picker.style.left = Math.min(rect.left + window.scrollX, window.innerWidth - 200) + 'px';
    picker.style.top = Math.min(rect.bottom + window.scrollY, window.innerHeight - 100) + 'px';
}

// Add reaction to message
async function addReaction(emoji) {
    if (!selectedMessageId) return;
    
    try {
        const response = await fetch('/api/messages/react', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message_id: selectedMessageId,
                emoji: emoji
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Hide picker and reload messages
            document.getElementById('reactionPicker').style.display = 'none';
            await loadMessages();
        } else {
            alert(data.error || 'Failed to add reaction');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add reaction');
    }
}

// Send message
async function sendMessage() {
    const input = document.getElementById('messageInput');
    const content = input.value.trim();
    
    if (!content) return;
    
    const body = { content };
    if (currentGroupId) {
        body.group_id = currentGroupId;
    } else if (currentRecipientId) {
        body.recipient_id = currentRecipientId;
    }
    
    try {
        const response = await fetch('/api/messages/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            input.value = '';
            await loadMessages();
        } else {
            alert(data.error || 'Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message');
    }
}

// Handle Enter key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Format timestamp
function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Auto-refresh messages every 3 seconds
setInterval(() => {
    if (currentChat) {
        loadMessages();
    }
}, 3000);
