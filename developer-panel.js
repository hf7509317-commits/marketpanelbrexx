// ============================================================
// DEVELOPER PANEL - LOGIC UTAMA
// ============================================================

// Import data dari file lain (dalam environment browser)
// Note: Untuk browser, gunakan <script> tags dengan urutan yang benar

// ============================================================
// STATE
// ============================================================

let currentDevConfig = {};
let currentProducts = [];
let currentUsers = [];
let currentSettings = {};
let currentUser = null;

// ============================================================
// INITIALIZATION
// ============================================================

function initDeveloperPanel() {
    // Load semua data
    currentSettings = loadSettings();
    currentProducts = loadProducts();
    currentUsers = loadUsers();
    currentDevConfig = loadDevConfig();
    
    console.log('🔧 Developer Panel initialized');
    console.log(`📦 ${currentProducts.length} products loaded`);
    console.log(`👥 ${currentUsers.length} users loaded`);
    console.log(`⚙️ Settings loaded`);
}

// ============================================================
// PRODUCT MANAGEMENT
// ============================================================

function getAllProducts() {
    return loadProducts();
}

function addProduct(productData) {
    const products = loadProducts();
    
    const newProduct = {
        id: 'prod-' + Date.now(),
        name: productData.name || 'New Product',
        price: productData.price || 'Rp 0',
        ram: productData.ram || '0',
        disk: productData.disk || '0',
        cpu: productData.cpu || '0',
        desc: productData.desc || '',
        category: productData.category || 'Umum'
    };
    
    products.push(newProduct);
    saveProducts(products);
    currentProducts = products;
    
    return { success: true, message: 'Produk berhasil ditambahkan!', product: newProduct };
}

function deleteProduct(productId) {
    let products = loadProducts();
    const productExists = products.some(p => p.id === productId);
    
    if (!productExists) {
        return { success: false, message: 'Produk tidak ditemukan!' };
    }
    
    products = products.filter(p => p.id !== productId);
    saveProducts(products);
    currentProducts = products;
    
    return { success: true, message: 'Produk berhasil dihapus!' };
}

function updateProduct(productId, updates) {
    const products = loadProducts();
    const index = products.findIndex(p => p.id === productId);
    
    if (index === -1) {
        return { success: false, message: 'Produk tidak ditemukan!' };
    }
    
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
    currentProducts = products;
    
    return { success: true, message: 'Produk berhasil diupdate!', product: products[index] };
}

function getProductStats() {
    const products = loadProducts();
    const categories = {};
    
    products.forEach(p => {
        const cat = p.category || 'Umum';
        categories[cat] = (categories[cat] || 0) + 1;
    });
    
    return {
        total: products.length,
        categories: categories,
        active: products.filter(p => p.isActive !== false).length
    };
}

// ============================================================
// USER MANAGEMENT
// ============================================================

function getAllUsers() {
    return loadUsers();
}

function registerUser(userData) {
    return addUser(userData);
}

function toggleUser(username) {
    return toggleUserStatus(username);
}

function removeUser(username) {
    return deleteUser(username);
}

function getUserStats() {
    return getUsersStats();
}

// ============================================================
// SETTINGS MANAGEMENT
// ============================================================

function getAllSettings() {
    return loadSettings();
}

function updateSettings(newSettings) {
    const settings = loadSettings();
    const updated = { ...settings, ...newSettings };
    saveSettings(updated);
    currentSettings = updated;
    return { success: true, message: 'Pengaturan berhasil disimpan!' };
}

function changeDevPassword(oldPassword, newPassword) {
    const settings = loadSettings();
    
    if (oldPassword !== settings.devPassword) {
        return { success: false, message: 'Password lama salah!' };
    }
    
    if (newPassword.length < 4) {
        return { success: false, message: 'Password baru minimal 4 karakter!' };
    }
    
    settings.devPassword = newPassword;
    saveSettings(settings);
    currentSettings = settings;
    
    return { success: true, message: 'Password berhasil diubah!' };
}

// ============================================================
// AUTHENTICATION
// ============================================================

function loginDev(username, password) {
    // Untuk developer, cek dari settings
    const settings = loadSettings();
    
    if (password === settings.devPassword) {
        currentUser = {
            username: 'developer',
            role: 'admin',
            isLoggedIn: true
        };
        return { success: true, message: 'Login berhasil!' };
    }
    
    // Cek juga dari user database
    const user = findUserByUsername(username);
    if (user && user.password === password && user.isAdmin) {
        currentUser = {
            username: user.username,
            fullname: user.fullname,
            role: 'admin',
            isLoggedIn: true
        };
        return { success: true, message: 'Login berhasil!' };
    }
    
    return { success: false, message: 'Username atau password salah!' };
}

function logoutDev() {
    currentUser = null;
    return { success: true, message: 'Logout berhasil!' };
}

function isDevLoggedIn() {
    return currentUser !== null && currentUser.isLoggedIn === true;
}

// ============================================================
// TOAST NOTIFICATIONS (dari file utama)
// ============================================================

function showToast(message, type = 'info') {
    // Fungsi ini akan di-override dari index.html
    if (typeof window.showToast === 'function') {
        window.showToast(message, type);
    } else {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}

// ============================================================
// EXPOSE TO WINDOW
// ============================================================

// Expose fungsi ke window agar bisa dipanggil dari HTML
window.DeveloperPanel = {
    init: initDeveloperPanel,
    
    // Products
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductStats,
    
    // Users
    getAllUsers,
    registerUser,
    toggleUser,
    removeUser,
    getUserStats,
    
    // Settings
    getAllSettings,
    updateSettings,
    changeDevPassword,
    
    // Auth
    loginDev,
    logoutDev,
    isDevLoggedIn,
    
    // Data
    getCurrentProducts: () => currentProducts,
    getCurrentUsers: () => currentUsers,
    getCurrentSettings: () => currentSettings,
    getCurrentUser: () => currentUser
};

console.log('✅ Developer Panel loaded successfully!');