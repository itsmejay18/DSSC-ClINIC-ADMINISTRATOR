// Global Data Storage
let users = [];
let requests = [];
let inventory = [];
let staff = [];
let notifications = [];
let activities = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    updateDashboard();
    setupEventListeners();
    showSection('dashboard');
});

// Initialize mock data
function initializeData() {
    // Initialize Users
    users = [
        { id: 'STU001', name: 'Juan Dela Cruz', type: 'students', email: 'juan.delacruz@student.dssc.edu.ph', status: 'active', contact: '+63 912 345 6789', medicalReqs: 'None', borrowingHistory: [], activityHistory: [] },
        { id: 'STU002', name: 'Maria Santos', type: 'students', email: 'maria.santos@student.dssc.edu.ph', status: 'active', contact: '+63 912 345 6790', medicalReqs: 'Asthma medication', borrowingHistory: [], activityHistory: [] },
        { id: 'STF001', name: 'Dr. Ana Reyes', type: 'staff', email: 'ana.reyes@dssc.edu.ph', status: 'active', contact: '+63 912 345 6791', responsibilities: 'Medical consultation', activityLogs: [] },
        { id: 'STF002', name: 'Nurse Betty Cruz', type: 'staff', email: 'betty.cruz@dssc.edu.ph', status: 'active', contact: '+63 912 345 6792', responsibilities: 'Patient care', activityLogs: [] },
        { id: 'FAC001', name: 'Prof. Carlos Garcia', type: 'faculty', email: 'carlos.garcia@dssc.edu.ph', status: 'active', contact: '+63 912 345 6793', medicalRecords: [], clinicVisitHistory: [] },
        { id: 'FAC002', name: 'Prof. Diana Lopez', type: 'faculty', email: 'diana.lopez@dssc.edu.ph', status: 'active', contact: '+63 912 345 6794', medicalRecords: [], clinicVisitHistory: [] }
    ];

    // Initialize Requests
    requests = [
        { id: 'REQ001', userId: 'STU001', userName: 'Juan Dela Cruz', service: 'Medical Checkup', date: '2025-01-15', status: 'pending', notes: 'Annual checkup' },
        { id: 'REQ002', userId: 'STU002', userName: 'Maria Santos', service: 'Dental Cleaning', date: '2025-01-16', status: 'approved', notes: 'Regular cleaning' },
        { id: 'REQ003', userId: 'FAC001', userName: 'Prof. Carlos Garcia', service: 'Blood Pressure Check', date: '2025-01-17', status: 'completed', notes: 'Routine monitoring' },
        { id: 'REQ004', userId: 'STF001', userName: 'Dr. Ana Reyes', service: 'Vaccination', date: '2025-01-18', status: 'pending', notes: 'Flu shot' },
        { id: 'REQ005', userId: 'STU001', userName: 'Juan Dela Cruz', service: 'First Aid', date: '2025-01-14', status: 'cancelled', notes: 'Minor cut treatment' }
    ];

    // Initialize Inventory
    inventory = [
        { id: 'INV001', name: 'Paracetamol 500mg', category: 'medicines', quantity: 150, expiry: '2025-12-31', status: 'normal' },
        { id: 'INV002', name: 'Ibuprofen 400mg', category: 'medicines', quantity: 75, expiry: '2025-08-15', status: 'normal' },
        { id: 'INV003', name: 'Bandages', category: 'supplies', quantity: 25, expiry: '2026-06-30', status: 'low' },
        { id: 'INV004', name: 'Cotton Balls', category: 'supplies', quantity: 200, expiry: '2026-03-15', status: 'normal' },
        { id: 'INV005', name: 'Alcohol 70%', category: 'supplies', quantity: 50, expiry: '2025-09-20', status: 'normal' },
        { id: 'INV006', name: 'Digital Thermometer', category: 'equipment', quantity: 5, expiry: null, status: 'normal' },
        { id: 'INV007', name: 'Blood Pressure Monitor', category: 'equipment', quantity: 3, expiry: null, status: 'normal' },
        { id: 'INV008', name: 'Aspirin 100mg', category: 'medicines', quantity: 10, expiry: '2025-02-28', status: 'expiring' },
        { id: 'INV009', name: 'Antiseptic Solution', category: 'supplies', quantity: 8, expiry: '2025-01-20', status: 'expired' }
    ];

    // Initialize Staff
    staff = [
        { id: 'STF001', name: 'Dr. Ana Reyes', role: 'doctor', department: 'General Medicine', status: 'active', lastActivity: '2025-01-14 14:30', email: 'ana.reyes@dssc.edu.ph' },
        { id: 'STF002', name: 'Nurse Betty Cruz', role: 'nurse', department: 'Patient Care', status: 'active', lastActivity: '2025-01-14 16:45', email: 'betty.cruz@dssc.edu.ph' },
        { id: 'STF003', name: 'John Medical Assistant', role: 'assistant', department: 'Support', status: 'active', lastActivity: '2025-01-14 12:15', email: 'john.assistant@dssc.edu.ph' },
        { id: 'STF004', name: 'Admin Sarah', role: 'admin', department: 'Administration', status: 'inactive', lastActivity: '2025-01-10 09:00', email: 'sarah.admin@dssc.edu.ph' }
    ];

    // Initialize Notifications
    notifications = [
        { id: 1, type: 'user', title: 'New User Registration', message: 'Maria Santos registered as a student', time: '2 hours ago', read: false },
        { id: 2, type: 'inventory', title: 'Low Stock Alert', message: 'Bandages quantity is running low (25 remaining)', time: '4 hours ago', read: false },
        { id: 3, type: 'request', title: 'New Appointment Request', message: 'Juan Dela Cruz requested a medical checkup', time: '6 hours ago', read: true },
        { id: 4, type: 'inventory', title: 'Item Expired', message: 'Antiseptic Solution has expired', time: '1 day ago', read: false },
        { id: 5, type: 'user', title: 'Staff Activity', message: 'Dr. Ana Reyes updated patient records', time: '2 days ago', read: true }
    ];

    // Initialize Activities
    activities = [
        { id: 1, user: 'Dr. Ana Reyes', action: 'Updated inventory', item: 'Paracetamol 500mg', timestamp: '2025-01-14 14:30:00' },
        { id: 2, user: 'Nurse Betty Cruz', action: 'Dispensed item', item: 'Bandages', timestamp: '2025-01-14 16:45:00' },
        { id: 3, user: 'Juan Dela Cruz', action: 'Made request', item: 'Medical Checkup', timestamp: '2025-01-14 10:15:00' },
        { id: 4, user: 'Admin Sarah', action: 'Added user', item: 'Maria Santos', timestamp: '2025-01-13 09:30:00' },
        { id: 5, user: 'Dr. Ana Reyes', action: 'Approved request', item: 'Dental Cleaning', timestamp: '2025-01-13 15:20:00' }
    ];
}

// Setup event listeners
function setupEventListeners() {
    // Form submissions
    document.getElementById('addUserForm').addEventListener('submit', handleAddUser);
    document.getElementById('addItemForm').addEventListener('submit', handleAddItem);
    document.getElementById('addStaffForm').addEventListener('submit', handleAddStaff);

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Close notifications when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('notificationDropdown');
        const bell = document.querySelector('.notification-bell');
        const profileDropdown = document.getElementById('profileDropdown');
        const profile = document.querySelector('.user-profile');
        const sidebar = document.querySelector('.sidebar');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (!bell.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove('show');
        }
        
        if (!profile.contains(event.target) && !profileDropdown.contains(event.target)) {
            profileDropdown.classList.remove('show');
        }
        
        // Close mobile sidebar when clicking outside
        if (!sidebar.contains(event.target) && !mobileToggle.contains(event.target)) {
            sidebar.classList.remove('show');
        }
    });
}

// Navigation functions
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to corresponding nav link
    document.querySelector(`[onclick="showSection('${sectionId}')"]`).classList.add('active');
    
    // Load section-specific data
    switch(sectionId) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'users':
            loadUsers();
            break;
        case 'requests':
            loadRequests();
            break;
        case 'inventory':
            loadInventory();
            break;
        case 'reports':
            loadReports();
            break;
        case 'staff':
            loadStaff();
            break;
    }
}

// Dashboard functions
function updateDashboard() {
    // Update summary cards
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalItems').textContent = inventory.length;
    document.getElementById('totalRequests').textContent = requests.length;
    document.getElementById('totalNotifications').textContent = notifications.filter(n => !n.read).length;
    
    // Update notification count in navbar
    document.getElementById('notificationCount').textContent = notifications.filter(n => !n.read).length;
    
    // Load notifications
    loadNotifications();
    
    // Create charts
    createCharts();
}

function createCharts() {
    // Users by type chart
    const usersCtx = document.getElementById('usersChart').getContext('2d');
    const userTypes = users.reduce((acc, user) => {
        acc[user.type] = (acc[user.type] || 0) + 1;
        return acc;
    }, {});
    
    drawBarChart(usersCtx, userTypes, 'Users by Type');
    
    // Inventory categories chart
    const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');
    const inventoryCategories = inventory.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});
    
    drawPieChart(inventoryCtx, inventoryCategories, 'Inventory Categories');
    
    // Request status chart
    const requestsCtx = document.getElementById('requestsChart').getContext('2d');
    const requestStatus = requests.reduce((acc, request) => {
        acc[request.status] = (acc[request.status] || 0) + 1;
        return acc;
    }, {});
    
    drawPieChart(requestsCtx, requestStatus, 'Request Status');
    
    // Activity timeline chart
    const activityCtx = document.getElementById('activityChart').getContext('2d');
    drawActivityChart(activityCtx);
}

function drawBarChart(ctx, data, title) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const labels = Object.keys(data);
    const values = Object.values(data);
    const maxValue = Math.max(...values);
    
    const barWidth = width / labels.length * 0.6;
    const barSpacing = width / labels.length * 0.4;
    
    // Draw bars
    labels.forEach((label, index) => {
        const barHeight = (values[index] / maxValue) * (height - 60);
        const x = index * (barWidth + barSpacing) + barSpacing / 2;
        const y = height - barHeight - 30;
        
        ctx.fillStyle = getChartColor(index);
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw value on top of bar
        ctx.fillStyle = '#00485B';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(values[index], x + barWidth / 2, y - 5);
        
        // Draw label
        ctx.fillText(label, x + barWidth / 2, height - 10);
    });
}

function drawPieChart(ctx, data, title) {
    const canvas = ctx.canvas;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const labels = Object.keys(data);
    const values = Object.values(data);
    const total = values.reduce((sum, value) => sum + value, 0);
    
    let currentAngle = 0;
    
    labels.forEach((label, index) => {
        const sliceAngle = (values[index] / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        
        ctx.fillStyle = getChartColor(index);
        ctx.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 15);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 15);
        
        ctx.fillStyle = '#00485B';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${label} (${values[index]})`, labelX, labelY);
        
        currentAngle += sliceAngle;
    });
}

function drawActivityChart(ctx) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Mock activity data for the last 7 days
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const activityData = [12, 19, 8, 15, 22, 7, 14];
    const maxActivity = Math.max(...activityData);
    
    ctx.strokeStyle = '#0074A6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    days.forEach((day, index) => {
        const x = (index / (days.length - 1)) * (width - 40) + 20;
        const y = height - 30 - ((activityData[index] / maxActivity) * (height - 60));
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Draw points
        ctx.fillStyle = '#F15A29';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw labels
        ctx.fillStyle = '#00485B';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(day, x, height - 10);
        ctx.fillText(activityData[index], x, y - 10);
    });
    
    ctx.stroke();
}

function getChartColor(index) {
    const colors = ['#0074A6', '#4DB5D7', '#F15A29', '#28a745', '#ffc107', '#dc3545', '#6f42c1'];
    return colors[index % colors.length];
}

// Notification functions
function loadNotifications() {
    const notificationList = document.getElementById('notificationList');
    notificationList.innerHTML = '';
    
    if (notifications.length === 0) {
        notificationList.innerHTML = '<div class="notification-item"><p>No notifications</p></div>';
        return;
    }
    
    notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification-item ${!notification.read ? 'unread' : ''}`;
        notificationElement.onclick = () => markNotificationAsRead(notification.id);
        
        notificationElement.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon ${notification.type}">
                    <i class="fas fa-${getNotificationIcon(notification.type)}"></i>
                </div>
                <div class="notification-text">
                    <h4>${notification.title}</h4>
                    <p>${notification.message}</p>
                    <div class="notification-time">${notification.time}</div>
                </div>
            </div>
        `;
        
        notificationList.appendChild(notificationElement);
    });
}

function getNotificationIcon(type) {
    switch(type) {
        case 'user': return 'user';
        case 'inventory': return 'boxes';
        case 'request': return 'calendar-check';
        default: return 'bell';
    }
}

function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('show');
    
    // Close profile dropdown if open
    document.getElementById('profileDropdown').classList.remove('show');
}

function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.toggle('show');
    
    // Close notification dropdown if open
    document.getElementById('notificationDropdown').classList.remove('show');
}

function markNotificationAsRead(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        loadNotifications();
        updateDashboard();
    }
}

function clearAllNotifications() {
    notifications.forEach(n => n.read = true);
    loadNotifications();
    updateDashboard();
    document.getElementById('notificationDropdown').classList.remove('show');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logout functionality would redirect to login page in a full implementation');
        document.getElementById('profileDropdown').classList.remove('show');
    }
}

// Mobile menu functions
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
    
    // Close dropdowns when opening mobile menu
    document.getElementById('notificationDropdown').classList.remove('show');
    document.getElementById('profileDropdown').classList.remove('show');
}

// User management functions
function loadUsers() {
    const tableBody = document.getElementById('usersTableBody');
    tableBody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td><span class="status-badge status-${user.type}">${user.type}</span></td>
            <td>${user.email}</td>
            <td><span class="status-badge status-${user.status}">${user.status}</span></td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="editUser('${user.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deactivateUser('${user.id}')">
                    <i class="fas fa-ban"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function showUserType(type) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const tableBody = document.getElementById('usersTableBody');
    tableBody.innerHTML = '';
    
    const filteredUsers = type === 'all' ? users : users.filter(user => user.type === type);
    
    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td><span class="status-badge status-${user.type}">${user.type}</span></td>
            <td>${user.email}</td>
            <td><span class="status-badge status-${user.status}">${user.status}</span></td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="editUser('${user.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deactivateUser('${user.id}')">
                    <i class="fas fa-ban"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function searchUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const tableBody = document.getElementById('usersTableBody');
    tableBody.innerHTML = '';
    
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.id.toLowerCase().includes(searchTerm) ||
        user.type.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    
    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td><span class="status-badge status-${user.type}">${user.type}</span></td>
            <td>${user.email}</td>
            <td><span class="status-badge status-${user.status}">${user.status}</span></td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="editUser('${user.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deactivateUser('${user.id}')">
                    <i class="fas fa-ban"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function showAddUserModal() {
    document.getElementById('addUserModal').style.display = 'flex';
}

function handleAddUser(event) {
    event.preventDefault();
    
    const name = document.getElementById('newUserName').value;
    const email = document.getElementById('newUserEmail').value;
    const type = document.getElementById('newUserType').value;
    const contact = document.getElementById('newUserContact').value;
    
    const newUser = {
        id: generateId(type.toUpperCase().substring(0, 3)),
        name,
        email,
        type,
        contact,
        status: 'active'
    };
    
    users.push(newUser);
    
    // Add notification
    addNotification('user', 'New User Added', `${name} has been added as ${type}`);
    
    // Add activity
    addActivity('Admin', 'Added user', name);
    
    closeModal('addUserModal');
    loadUsers();
    updateDashboard();
    
    // Reset form
    document.getElementById('addUserForm').reset();
}

function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        alert(`Edit user: ${user.name}\n(This would open an edit modal in a full implementation)`);
    }
}

function deactivateUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user && confirm(`Are you sure you want to deactivate ${user.name}?`)) {
        user.status = user.status === 'active' ? 'inactive' : 'active';
        addActivity('Admin', 'Updated user status', user.name);
        loadUsers();
        updateDashboard();
    }
}

// Request management functions
function loadRequests() {
    const tableBody = document.getElementById('requestsTableBody');
    tableBody.innerHTML = '';
    
    requests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.id}</td>
            <td>${request.userName}</td>
            <td>${request.service}</td>
            <td>${request.date}</td>
            <td><span class="status-badge status-${request.status}">${request.status}</span></td>
            <td>
                <button class="btn btn-sm btn-success" onclick="approveRequest('${request.id}')">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm btn-warning" onclick="completeRequest('${request.id}')">
                    <i class="fas fa-check-double"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="cancelRequest('${request.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function searchRequests() {
    const searchTerm = document.getElementById('requestSearch').value.toLowerCase();
    const tableBody = document.getElementById('requestsTableBody');
    tableBody.innerHTML = '';
    
    const filteredRequests = requests.filter(request => 
        request.userName.toLowerCase().includes(searchTerm) ||
        request.service.toLowerCase().includes(searchTerm) ||
        request.id.toLowerCase().includes(searchTerm)
    );
    
    filteredRequests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.id}</td>
            <td>${request.userName}</td>
            <td>${request.service}</td>
            <td>${request.date}</td>
            <td><span class="status-badge status-${request.status}">${request.status}</span></td>
            <td>
                <button class="btn btn-sm btn-success" onclick="approveRequest('${request.id}')">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm btn-warning" onclick="completeRequest('${request.id}')">
                    <i class="fas fa-check-double"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="cancelRequest('${request.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function filterRequests() {
    const filter = document.getElementById('requestFilter').value;
    const tableBody = document.getElementById('requestsTableBody');
    tableBody.innerHTML = '';
    
    const filteredRequests = filter === 'all' ? requests : requests.filter(request => request.status === filter);
    
    filteredRequests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.id}</td>
            <td>${request.userName}</td>
            <td>${request.service}</td>
            <td>${request.date}</td>
            <td><span class="status-badge status-${request.status}">${request.status}</span></td>
            <td>
                <button class="btn btn-sm btn-success" onclick="approveRequest('${request.id}')">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm btn-warning" onclick="completeRequest('${request.id}')">
                    <i class="fas fa-check-double"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="cancelRequest('${request.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function approveRequest(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (request && request.status === 'pending') {
        request.status = 'approved';
        addActivity('Admin', 'Approved request', request.service);
        loadRequests();
        updateDashboard();
    }
}

function completeRequest(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (request && request.status === 'approved') {
        request.status = 'completed';
        addActivity('Admin', 'Completed request', request.service);
        loadRequests();
        updateDashboard();
    }
}

function cancelRequest(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (request && confirm(`Are you sure you want to cancel this request?`)) {
        request.status = 'cancelled';
        addActivity('Admin', 'Cancelled request', request.service);
        loadRequests();
        updateDashboard();
    }
}

// Inventory management functions
function loadInventory() {
    const tableBody = document.getElementById('inventoryTableBody');
    tableBody.innerHTML = '';
    
    inventory.forEach(item => {
        const row = document.createElement('tr');
        const statusClass = getInventoryStatus(item);
        
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td><span class="status-badge status-${item.category}">${item.category}</span></td>
            <td>${item.quantity}</td>
            <td>${item.expiry || 'N/A'}</td>
            <td><span class="status-badge status-${statusClass}">${statusClass}</span></td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="editItem('${item.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="removeItem('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function getInventoryStatus(item) {
    if (item.expiry) {
        const expiryDate = new Date(item.expiry);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiry < 0) return 'expired';
        if (daysUntilExpiry <= 30) return 'expiring';
    }
    
    if (item.quantity <= 20) return 'low';
    return 'normal';
}

function searchInventory() {
    const searchTerm = document.getElementById('inventorySearch').value.toLowerCase();
    const tableBody = document.getElementById('inventoryTableBody');
    tableBody.innerHTML = '';
    
    const filteredItems = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.id.toLowerCase().includes(searchTerm)
    );
    
    filteredItems.forEach(item => {
        const row = document.createElement('tr');
        const statusClass = getInventoryStatus(item);
        
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td><span class="status-badge status-${item.category}">${item.category}</span></td>
            <td>${item.quantity}</td>
            <td>${item.expiry || 'N/A'}</td>
            <td><span class="status-badge status-${statusClass}">${statusClass}</span></td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="editItem('${item.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="removeItem('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function showAddItemModal() {
    document.getElementById('addItemModal').style.display = 'flex';
}

function handleAddItem(event) {
    event.preventDefault();
    
    const name = document.getElementById('newItemName').value;
    const category = document.getElementById('newItemCategory').value;
    const quantity = parseInt(document.getElementById('newItemQuantity').value);
    const expiry = document.getElementById('newItemExpiry').value;
    
    const newItem = {
        id: generateId('INV'),
        name,
        category,
        quantity,
        expiry: expiry || null,
        status: quantity <= 20 ? 'low' : 'normal'
    };
    
    inventory.push(newItem);
    
    // Add notification
    addNotification('inventory', 'New Item Added', `${name} has been added to inventory`);
    
    // Add activity
    addActivity('Admin', 'Added item', name);
    
    closeModal('addItemModal');
    loadInventory();
    updateDashboard();
    
    // Reset form
    document.getElementById('addItemForm').reset();
}

function editItem(itemId) {
    const item = inventory.find(i => i.id === itemId);
    if (item) {
        alert(`Edit item: ${item.name}\n(This would open an edit modal in a full implementation)`);
    }
}

function removeItem(itemId) {
    const item = inventory.find(i => i.id === itemId);
    if (item && confirm(`Are you sure you want to remove ${item.name}?`)) {
        const index = inventory.findIndex(i => i.id === itemId);
        inventory.splice(index, 1);
        addActivity('Admin', 'Removed item', item.name);
        loadInventory();
        updateDashboard();
    }
}

// Staff management functions
function loadStaff() {
    const tableBody = document.getElementById('staffTableBody');
    tableBody.innerHTML = '';
    
    staff.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.id}</td>
            <td>${member.name}</td>
            <td><span class="status-badge status-${member.role}">${member.role}</span></td>
            <td>${member.department}</td>
            <td><span class="status-badge status-${member.status}">${member.status}</span></td>
            <td>${member.lastActivity}</td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="editStaff('${member.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-warning" onclick="viewStaffActivity('${member.id}')">
                    <i class="fas fa-history"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deactivateStaff('${member.id}')">
                    <i class="fas fa-ban"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function searchStaff() {
    const searchTerm = document.getElementById('staffSearch').value.toLowerCase();
    const tableBody = document.getElementById('staffTableBody');
    tableBody.innerHTML = '';
    
    const filteredStaff = staff.filter(member => 
        member.name.toLowerCase().includes(searchTerm) ||
        member.role.toLowerCase().includes(searchTerm) ||
        member.department.toLowerCase().includes(searchTerm) ||
        member.id.toLowerCase().includes(searchTerm)
    );
    
    filteredStaff.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.id}</td>
            <td>${member.name}</td>
            <td><span class="status-badge status-${member.role}">${member.role}</span></td>
            <td>${member.department}</td>
            <td><span class="status-badge status-${member.status}">${member.status}</span></td>
            <td>${member.lastActivity}</td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="editStaff('${member.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-warning" onclick="viewStaffActivity('${member.id}')">
                    <i class="fas fa-history"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deactivateStaff('${member.id}')">
                    <i class="fas fa-ban"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function showAddStaffModal() {
    document.getElementById('addStaffModal').style.display = 'flex';
}

function handleAddStaff(event) {
    event.preventDefault();
    
    const name = document.getElementById('newStaffName').value;
    const role = document.getElementById('newStaffRole').value;
    const department = document.getElementById('newStaffDepartment').value;
    const email = document.getElementById('newStaffEmail').value;
    
    const newStaff = {
        id: generateId('STF'),
        name,
        role,
        department,
        email,
        status: 'active',
        lastActivity: new Date().toLocaleString()
    };
    
    staff.push(newStaff);
    
    // Add notification
    addNotification('user', 'New Staff Added', `${name} has been added as ${role}`);
    
    // Add activity
    addActivity('Admin', 'Added staff', name);
    
    closeModal('addStaffModal');
    loadStaff();
    updateDashboard();
    
    // Reset form
    document.getElementById('addStaffForm').reset();
}

function editStaff(staffId) {
    const member = staff.find(s => s.id === staffId);
    if (member) {
        alert(`Edit staff: ${member.name}\n(This would open an edit modal in a full implementation)`);
    }
}

function viewStaffActivity(staffId) {
    const member = staff.find(s => s.id === staffId);
    if (member) {
        alert(`View activity logs for: ${member.name}\n(This would show detailed activity logs in a full implementation)`);
    }
}

function deactivateStaff(staffId) {
    const member = staff.find(s => s.id === staffId);
    if (member && confirm(`Are you sure you want to deactivate ${member.name}?`)) {
        member.status = member.status === 'active' ? 'inactive' : 'active';
        addActivity('Admin', 'Updated staff status', member.name);
        loadStaff();
        updateDashboard();
    }
}

// Reports functions
function loadReports() {
    // Update report statistics
    const expiringItems = inventory.filter(item => {
        if (!item.expiry) return false;
        const expiryDate = new Date(item.expiry);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
    }).length;
    
    const lowStockItems = inventory.filter(item => item.quantity <= 20).length;
    
    const upcomingAppointments = requests.filter(request => {
        const requestDate = new Date(request.date);
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        return requestDate >= today && requestDate <= nextWeek && request.status === 'approved';
    }).length;
    
    document.getElementById('expiringItems').textContent = expiringItems;
    document.getElementById('lowStockItems').textContent = lowStockItems;
    document.getElementById('upcomingAppointments').textContent = upcomingAppointments;
    document.getElementById('totalActivities').textContent = activities.length;
}

function generateExpiryReport() {
    const expiringItems = inventory.filter(item => {
        if (!item.expiry) return false;
        const expiryDate = new Date(item.expiry);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 30;
    });
    
    showReportModal('Expiry Report', generateExpiryReportContent(expiringItems));
}

function generateLowStockReport() {
    const lowStockItems = inventory.filter(item => item.quantity <= 20);
    showReportModal('Low Stock Report', generateLowStockReportContent(lowStockItems));
}

function generateAppointmentReport() {
    const upcomingAppointments = requests.filter(request => {
        const requestDate = new Date(request.date);
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        return requestDate >= today && requestDate <= nextWeek && request.status === 'approved';
    });
    
    showReportModal('Upcoming Appointments', generateAppointmentReportContent(upcomingAppointments));
}

function generateActivityReport() {
    showReportModal('Activity Audit Report', generateActivityReportContent(activities));
}

function generateExpiryReportContent(items) {
    if (items.length === 0) {
        return '<p>No items expiring in the next 30 days.</p>';
    }
    
    let content = '<table class="data-table"><thead><tr><th>Item</th><th>Category</th><th>Expiry Date</th><th>Days Left</th></tr></thead><tbody>';
    
    items.forEach(item => {
        const expiryDate = new Date(item.expiry);
        const today = new Date();
        const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        content += `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.expiry}</td>
                <td>${daysLeft < 0 ? 'EXPIRED' : daysLeft + ' days'}</td>
            </tr>
        `;
    });
    
    content += '</tbody></table>';
    return content;
}

function generateLowStockReportContent(items) {
    if (items.length === 0) {
        return '<p>All items are adequately stocked.</p>';
    }
    
    let content = '<table class="data-table"><thead><tr><th>Item</th><th>Category</th><th>Current Stock</th><th>Status</th></tr></thead><tbody>';
    
    items.forEach(item => {
        content += `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.quantity}</td>
                <td><span class="status-badge status-low">Low Stock</span></td>
            </tr>
        `;
    });
    
    content += '</tbody></table>';
    return content;
}

function generateAppointmentReportContent(appointments) {
    if (appointments.length === 0) {
        return '<p>No upcoming appointments this week.</p>';
    }
    
    let content = '<table class="data-table"><thead><tr><th>Patient</th><th>Service</th><th>Date</th><th>Status</th></tr></thead><tbody>';
    
    appointments.forEach(appointment => {
        content += `
            <tr>
                <td>${appointment.userName}</td>
                <td>${appointment.service}</td>
                <td>${appointment.date}</td>
                <td><span class="status-badge status-${appointment.status}">${appointment.status}</span></td>
            </tr>
        `;
    });
    
    content += '</tbody></table>';
    return content;
}

function generateActivityReportContent(activities) {
    let content = '<table class="data-table"><thead><tr><th>User</th><th>Action</th><th>Item/Target</th><th>Timestamp</th></tr></thead><tbody>';
    
    activities.slice(-20).reverse().forEach(activity => {
        content += `
            <tr>
                <td>${activity.user}</td>
                <td>${activity.action}</td>
                <td>${activity.item}</td>
                <td>${activity.timestamp}</td>
            </tr>
        `;
    });
    
    content += '</tbody></table>';
    return content;
}

function showReportModal(title, content) {
    document.getElementById('reportModalTitle').textContent = title;
    document.getElementById('reportModalBody').innerHTML = content;
    document.getElementById('reportModal').style.display = 'flex';
}

function closeReportModal() {
    document.getElementById('reportModal').style.display = 'none';
}

// Settings functions
function backupData() {
    const data = {
        users,
        requests,
        inventory,
        staff,
        notifications,
        activities,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `clinic_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    addNotification('user', 'Data Backup', 'System data has been backed up successfully');
    addActivity('Admin', 'Backed up data', 'System backup');
}

function restoreData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    if (confirm('Are you sure you want to restore data? This will overwrite current data.')) {
                        users = data.users || [];
                        requests = data.requests || [];
                        inventory = data.inventory || [];
                        staff = data.staff || [];
                        notifications = data.notifications || [];
                        activities = data.activities || [];
                        
                        updateDashboard();
                        addNotification('user', 'Data Restore', 'System data has been restored successfully');
                        addActivity('Admin', 'Restored data', 'System restore');
                        
                        alert('Data restored successfully!');
                    }
                } catch (error) {
                    alert('Error reading backup file. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    };
    
    input.click();
}

function manageRoles() {
    alert('Role management interface would be implemented here.\n\nFeatures would include:\n- Create/edit user roles\n- Assign permissions\n- Manage access levels');
}

function saveSettings() {
    const emailNotifications = document.getElementById('emailNotifications').checked;
    const autoBackup = document.getElementById('autoBackup').checked;
    
    // In a real application, these would be saved to a backend
    localStorage.setItem('clinicSettings', JSON.stringify({
        emailNotifications,
        autoBackup
    }));
    
    addNotification('user', 'Settings Updated', 'System settings have been saved');
    addActivity('Admin', 'Updated settings', 'System preferences');
    
    alert('Settings saved successfully!');
}

// Profile functions
function updateProfile() {
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;
    const contact = document.getElementById('profileContact').value;
    const password = document.getElementById('profilePassword').value;
    
    // In a real application, this would update the backend
    addNotification('user', 'Profile Updated', 'Your profile information has been updated');
    addActivity('Admin', 'Updated profile', 'Personal information');
    
    alert('Profile updated successfully!');
}

// Scanner functions
let isScanning = false;
let currentScannedMedicine = null;

function loadScanner() {
    // Reset scanner state
    stopScanning();
    clearScan();
}

function startScanning() {
    if (isScanning) return;
    
    isScanning = true;
    const scannerFrame = document.querySelector('.scanner-frame');
    scannerFrame.classList.add('scanning');
    
    // Simulate scanning process
    setTimeout(() => {
        if (isScanning) {
            // Simulate finding a barcode after 3 seconds
            const mockBarcodes = [
                '1234567890123',
                '9876543210987',
                '5555666677778',
                '1111222233334'
            ];
            
            const randomBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
            document.getElementById('manualBarcode').value = randomBarcode;
            searchByBarcode();
            stopScanning();
        }
    }, 3000);
    
    addActivity('Admin', 'Started barcode scanning', 'Scanner device');
}

function stopScanning() {
    isScanning = false;
    const scannerFrame = document.querySelector('.scanner-frame');
    scannerFrame.classList.remove('scanning');
}

function searchByBarcode() {
    const barcode = document.getElementById('manualBarcode').value.trim();
    
    if (!barcode) {
        alert('Please enter a barcode or start scanning');
        return;
    }
    
    // Find medicine by barcode (simulate barcode lookup)
    const medicine = findMedicineByBarcode(barcode);
    
    if (medicine) {
        displayScannedMedicine(medicine);
        addActivity('Admin', 'Scanned barcode', `${medicine.name} (${barcode})`);
    } else {
        showScanStatus('Medicine not found for barcode: ' + barcode, 'error');
    }
}

function findMedicineByBarcode(barcode) {
    // Mock barcode to medicine mapping
    const barcodeMap = {
        '1234567890123': 'INV001', // Paracetamol
        '9876543210987': 'INV002', // Ibuprofen
        '5555666677778': 'INV008', // Aspirin
        '1111222233334': 'INV005'  // Alcohol
    };
    
    const itemId = barcodeMap[barcode];
    if (itemId) {
        return inventory.find(item => item.id === itemId);
    }
    
    return null;
}

function displayScannedMedicine(medicine) {
    currentScannedMedicine = { ...medicine }; // Create a copy for editing
    
    const medicineInfo = document.getElementById('medicineInfo');
    const scanResults = document.getElementById('scanResults');
    
    const statusClass = getInventoryStatus(medicine);
    const statusText = statusClass.charAt(0).toUpperCase() + statusClass.slice(1);
    
    medicineInfo.innerHTML = `
        <div class="medicine-detail">
            <label>Item ID:</label>
            <span>${medicine.id}</span>
        </div>
        <div class="medicine-detail">
            <label>Name:</label>
            <input type="text" id="editName" value="${medicine.name}">
        </div>
        <div class="medicine-detail">
            <label>Category:</label>
            <select id="editCategory">
                <option value="medicines" ${medicine.category === 'medicines' ? 'selected' : ''}>Medicines</option>
                <option value="supplies" ${medicine.category === 'supplies' ? 'selected' : ''}>Supplies</option>
                <option value="equipment" ${medicine.category === 'equipment' ? 'selected' : ''}>Equipment</option>
            </select>
        </div>
        <div class="medicine-detail">
            <label>Quantity:</label>
            <input type="number" id="editQuantity" value="${medicine.quantity}" min="0">
        </div>
        <div class="medicine-detail">
            <label>Expiry Date:</label>
            <input type="date" id="editExpiry" value="${medicine.expiry || ''}">
        </div>
        <div class="medicine-detail">
            <label>Status:</label>
            <span class="status-badge status-${statusClass}">${statusText}</span>
        </div>
    `;
    
    scanResults.style.display = 'block';
    showScanStatus('Medicine found and loaded successfully!', 'success');
}

function approveMedicine() {
    if (!currentScannedMedicine) {
        alert('No medicine data to approve');
        return;
    }
    
    showScanStatus('Medicine approved for use', 'success');
    addActivity('Admin', 'Approved medicine', currentScannedMedicine.name);
    addNotification('inventory', 'Medicine Approved', `${currentScannedMedicine.name} has been approved for dispensing`);
}

function editMedicine() {
    if (!currentScannedMedicine) {
        alert('No medicine data to edit');
        return;
    }
    
    // Enable editing mode
    const inputs = document.querySelectorAll('#medicineInfo input, #medicineInfo select');
    inputs.forEach(input => {
        input.style.backgroundColor = '#fff3cd';
        input.style.border = '2px solid #ffc107';
    });
    
    showScanStatus('Edit mode enabled. Modify the fields and click Save.', 'warning');
}

function saveMedicine() {
    if (!currentScannedMedicine) {
        alert('No medicine data to save');
        return;
    }
    
    // Get updated values
    const updatedMedicine = {
        ...currentScannedMedicine,
        name: document.getElementById('editName').value,
        category: document.getElementById('editCategory').value,
        quantity: parseInt(document.getElementById('editQuantity').value),
        expiry: document.getElementById('editExpiry').value || null
    };
    
    // Update in inventory
    const index = inventory.findIndex(item => item.id === currentScannedMedicine.id);
    if (index !== -1) {
        inventory[index] = updatedMedicine;
        currentScannedMedicine = updatedMedicine;
        
        // Refresh display
        displayScannedMedicine(updatedMedicine);
        
        showScanStatus('Medicine data saved successfully!', 'success');
        addActivity('Admin', 'Updated medicine via scanner', updatedMedicine.name);
        addNotification('inventory', 'Medicine Updated', `${updatedMedicine.name} has been updated via barcode scanner`);
        
        // Update dashboard if needed
        updateDashboard();
    }
}

function clearScan() {
    currentScannedMedicine = null;
    document.getElementById('scanResults').style.display = 'none';
    document.getElementById('manualBarcode').value = '';
    
    // Clear any status messages
    const existingStatus = document.querySelector('.scan-status');
    if (existingStatus) {
        existingStatus.remove();
    }
}

function showScanStatus(message, type) {
    // Remove existing status
    const existingStatus = document.querySelector('.scan-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    // Create new status
    const status = document.createElement('div');
    status.className = `scan-status ${type}`;
    status.textContent = message;
    
    // Insert before medicine info
    const medicineInfo = document.getElementById('medicineInfo');
    medicineInfo.parentNode.insertBefore(status, medicineInfo);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (status.parentNode) {
            status.remove();
        }
    }, 5000);
}

// Utility functions
function generateId(prefix) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${prefix}${timestamp}${random}`;
}

function addNotification(type, title, message) {
    const notification = {
        id: Date.now(),
        type,
        title,
        message,
        time: 'Just now',
        read: false
    };
    
    notifications.unshift(notification);
    
    // Keep only last 50 notifications
    if (notifications.length > 50) {
        notifications = notifications.slice(0, 50);
    }
    
    loadNotifications();
    updateDashboard();
}

function addActivity(user, action, item) {
    const activity = {
        id: Date.now(),
        user,
        action,
        item,
        timestamp: new Date().toLocaleString()
    };
    
    activities.unshift(activity);
    
    // Keep only last 100 activities
    if (activities.length > 100) {
        activities = activities.slice(0, 100);
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Simulate real-time notifications
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const notificationTypes = [
            { type: 'user', title: 'User Activity', message: 'A user updated their profile' },
            { type: 'inventory', title: 'Inventory Alert', message: 'An item was dispensed' },
            { type: 'request', title: 'New Request', message: 'A new appointment was requested' }
        ];
        
        const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        addNotification(randomNotification.type, randomNotification.title, randomNotification.message);
    }
}, 30000); // Check every 30 seconds