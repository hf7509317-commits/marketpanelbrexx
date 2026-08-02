// ============================================================
// DATA USER - DATABASE PELANGGAN
// ============================================================

// Sample users untuk demo
const DEMO_USERS = [
    {
        username: 'rexxuser',
        password: 'rexx123',
        fullname: 'Rexx User',
        email: 'rexx@email.com',
        phone: '08123456789',
        address: 'Jl. Contoh No. 123',
        registeredAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
        lastLogin: new Date(Date.now() - 3600000 * 12).toISOString(),
        isActive: true,
        isAdmin: false,
        ordersCount: 3
    },
    {
        username: 'johndoe',
        password: 'john123',
        fullname: 'John Doe',
        email: 'john@email.com',
        phone: '08234567890',
        address: 'Jl. Test No. 45',
        registeredAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
        lastLogin: new Date(Date.now() - 3600000 * 2).toISOString(),
        isActive: true,
        isAdmin: false,
        ordersCount: 1
    },
    {
        username: 'sarahdev',
        password: 'sarah123',
        fullname: 'Sarah Developer',
        email: 'sarah@dev.com',
        phone: '08345678901',
        address: 'Jl. Developer No. 7',
        registeredAt: new Date(Date.now() - 3600000 * 24 * 10).toISOString(),
        lastLogin: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
        isActive: true,
        isAdmin: false,
        ordersCount: 5
    },
    {
        username: 'akuntest',
        password: 'test123',
        fullname: 'Akun Test',
        email: 'test@test.com',
        phone: '08456789012',
        address: 'Jl. Testing No. 99',
        registeredAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
        lastLogin: null,
        isActive: true,
        isAdmin: false,
        ordersCount: 0
    }
];

// ============================================================
// FUNGSI UNTUK LOAD/SAVE USERS
// ============================================================

function loadUsers() {
    try {
        const saved = localStorage.getItem('rexx_users');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.error('Error loading users:', e);
    }
    // Return demo users jika belum ada data
    return JSON.parse(JSON.stringify(DEMO_USERS));
}

function saveUsers(users) {
    try {
        localStorage.setItem('rexx_users', JSON.stringify(users));
        return true;
    } catch (e) {
        console.error('Error saving users:', e);
        return false;
    }
}

function findUserByUsername(username) {
    const users = loadUsers();
    return users.find(u => u.username === username);
}

function addUser(userData) {
    const users = loadUsers();
    
    // Check if username already exists
    if (findUserByUsername(userData.username)) {
        return { success: false, message: 'Username sudah terdaftar!' };
    }
    
    // Add new user
    const newUser = {
        username: userData.username,
        password: userData.password || 'default123',
        fullname: userData.fullname || userData.username,
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        registeredAt: new Date().toISOString(),
        lastLogin: null,
        isActive: true,
        isAdmin: userData.isAdmin || false,
        ordersCount: 0
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true, message: 'User berhasil ditambahkan!', user: newUser };
}

function toggleUserStatus(username) {
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    
    if (!user) {
        return { success: false, message: 'User tidak ditemukan!' };
    }
    
    user.isActive = !user.isActive;
    saveUsers(users);
    
    return { 
        success: true, 
        message: `User ${username} ${user.isActive ? 'diaktifkan' : 'dinonaktifkan'}`,
        user: user
    };
}

function deleteUser(username) {
    let users = loadUsers();
    const userExists = users.some(u => u.username === username);
    
    if (!userExists) {
        return { success: false, message: 'User tidak ditemukan!' };
    }
    
    users = users.filter(u => u.username !== username);
    saveUsers(users);
    
    return { success: true, message: `User ${username} berhasil dihapus!` };
}

function getUsersStats() {
    const users = loadUsers();
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const total = users.length;
    const newUsers = users.filter(u => new Date(u.registeredAt) > weekAgo).length;
    const activeUsers = users.filter(u => u.isActive !== false).length;
    const onlineUsers = users.filter(u => {
        if (!u.lastLogin) return false;
        const lastLogin = new Date(u.lastLogin);
        return (now - lastLogin) < 15 * 60 * 1000; // 15 minutes
    }).length;
    
    return { total, newUsers, activeUsers, onlineUsers };
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DEMO_USERS,
        loadUsers,
        saveUsers,
        findUserByUsername,
        addUser,
        toggleUserStatus,
        deleteUser,
        getUsersStats
    };
}