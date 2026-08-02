// ============================================================
// KONFIGURASI DASAR DEVELOPER
// ============================================================

const DEV_CONFIG = {
    // Password default untuk akses developer
    devPassword: 'admin',
    
    // Username Telegram Developer
    devTelegram: 'rexnothuman',
    
    // Informasi Toko
    storeName: 'REXX MARKET HOSTING',
    storeTagline: 'Hosting • Panel Provider',
    storeInitial: 'RX',
    
    // Foto Profil
    profilePhoto: 'https://ibb.co.com/93d3vZp5',
    profileColors: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'],
    
    // Pembayaran
    qrisUrl: 'https://ibb.co.com/pvm08MHG',
    danaNumber: '085196607326',
    danaName: 'MAH**D',
    
    // Marquee Items
    marqueeItems: [
        '🚀 Deploy Cepat & Stabil',
        '💳 Bayar Pakai QRIS/DANA',
        '⚡ Performa Tinggi 99.9% Uptime',
        '🛡️ Free DDOS Protection',
        '💬 Support 24/7',
        '🌟 Panel WhatsApp & Telegram',
        '🔥 Harga Terjangkau',
        '📱 Support Multi Device'
    ]
};

// ============================================================
// FUNGSI UNTUK LOAD/SAVE CONFIG
// ============================================================

function loadDevConfig() {
    try {
        const saved = localStorage.getItem('rexx_config');
        if (saved) {
            const parsed = JSON.parse(saved);
            return { ...DEV_CONFIG, ...parsed };
        }
    } catch (e) {
        console.error('Error loading config:', e);
    }
    return { ...DEV_CONFIG };
}

function saveDevConfig(config) {
    try {
        localStorage.setItem('rexx_config', JSON.stringify(config));
        return true;
    } catch (e) {
        console.error('Error saving config:', e);
        return false;
    }
}

// Export untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DEV_CONFIG, loadDevConfig, saveDevConfig };
}