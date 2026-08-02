// ============================================================
// DATA PRODUK - 15 PAKET PANEL
// ============================================================

const DEFAULT_PRODUCTS = [
    // ============ PAKET STARTER (1-5) ============
    { 
        id: 'prod-1', 
        name: 'Paket 1', 
        price: 'Rp 500', 
        ram: '1', 
        disk: '10', 
        cpu: '100',
        desc: 'Cocok untuk bot pemula dengan traffic rendah',
        category: 'Starter'
    },
    { 
        id: 'prod-2', 
        name: 'Paket  2', 
        price: 'Rp 1.000', 
        ram: '2', 
        disk: '20', 
        cpu: '100',
        desc: 'Untuk bot dengan aktivitas sedang',
        category: 'Starter'
    },
    { 
        id: 'prod-3', 
        name: 'Paket  3', 
        price: 'Rp 1.500', 
        ram: '3, 
        disk: '30', 
        cpu: '100',
        desc: 'Untuk bot WhatsApp & Telegram basic',
        category: 'Starter'
    },
    { 
        id: 'prod-4', 
        name: 'Paket  4', 
        price: 'Rp 2.000', 
        ram: '4, 
        disk: '40', 
        cpu: '150',
        desc: 'Cocok untuk bot dengan fitur sedang',
        category: 'Starter'
    },
    { 
        id: 'prod-5', 
        name: 'Paket  5', 
        price: 'Rp 2.500', 
        ram: '5', 
        disk: '50', 
        cpu: '150',
        desc: 'Untuk bot dengan multi fitur',
        category: 'Starter'
    },

    // ============ PAKET BUSINESS (6-10) ============
    { 
        id: 'prod-6', 
        name: 'Paket 6', 
        price: 'Rp 3.000', 
        ram: '6', 
        disk: '60', 
        cpu: '200',
        desc: 'Untuk bot bisnis dengan traffic tinggi',
        category: 'Business'
    },
    { 
        id: 'prod-7', 
        name: 'Paket 7', 
        price: 'Rp 3.500', 
        ram: '7', 
        disk: '80', 
        cpu: '200',
        desc: 'Cocok untuk bot e-commerce & support',
        category: 'Business'
    },
    { 
        id: 'prod-8', 
        name: 'Paket  8', 
        price: 'Rp 4.000', 
        ram: '8', 
        disk: '100', 
        cpu: '250',
        desc: 'Untuk bot dengan database besar',
        category: 'Business'
    },
    { 
        id: 'prod-9', 
        name: 'Paket  9', 
        price: 'Rp 4.500', 
        ram: '9', 
        disk: '120', 
        cpu: '250',
        desc: 'Untuk bot enterprise skala menengah',
        category: 'Business'
    },
    { 
        id: 'prod-10', 
        name: 'Paket 10', 
        price: 'Rp 5.000', 
        ram: '10', 
        disk: '140', 
        cpu: '250',
        desc: 'Untuk bot dengan AI & machine learning',
        category: 'Business'
    },

    // ============ PAKET PREMIUM (11-15) ============
    { 
        id: 'prod-11', 
        name: 'Paket UNLIMITED (GARANSI 5 HARI)', 
        price: 'Rp 7.000', 
        ram: 'UNLIMITED', 
        disk: 'UNLIMITED', 
        cpu: 'UNLIMITED',
        desc: 'Untuk bot dengan performa tinggi',
        category: 'Premium'
    },
    { 
        id: 'prod-12', 
        name: 'Paket ADMIN PANEL ( AKSESP PLTA,PLTC )', 
        price: 'Rp 10.000', 
        ram: 'UNLIMITED', 
        disk: 'UNLIMITED', 
        cpu: '1200',
        desc: 'DAPET GB+BOT CPANEL LEGAL+PRIVATE',
        category: 'Premium'
    },
    { 
        id: 'prod-13', 
        name: 'Paket FUUL SC CPANEL ( 8 SC )', 
        price: 'Rp 12.000', 
        ram: '-, 
        disk: '-', 
        cpu: '-',
        desc: 'MAU SC YG LAIN? TINGGAL REQ AJA',
        category: 'Premium'
    },
    { 
        id: 'prod-14', 
        name: 'Paket MURBASE', 
        price: 'Rp 15.000', 
        ram: '-', 
        disk: '-', 
        cpu: '-',
        desc: 'DAPET 3 GB MURBASE ',
        category: 'Premium'
    },
    { 
        id: 'prod-15', 
        name: 'Paket MURBAND/UNBAND', 
        price: 'Rp 15.000', 
        ram: '-', 
        disk: '-', 
        cpu: '-',
        desc: 'DAPET 5GB + FUUL BAHAN',
        category: 'Premium'
    }
];

// ============================================================
// FUNGSI UNTUK LOAD/SAVE PRODUCTS
// ============================================================

function loadProducts() {
    try {
        const saved = localStorage.getItem('rexx_products');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.error('Error loading products:', e);
    }
    // Return default products jika belum ada data
    return JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
}

function saveProducts(products) {
    try {
        localStorage.setItem('rexx_products', JSON.stringify(products));
        return true;
    } catch (e) {
        console.error('Error saving products:', e);
        return false;
    }
}

function getProductById(productId) {
    const products = loadProducts();
    return products.find(p => p.id === productId);
}

function getProductsByCategory(category) {
    const products = loadProducts();
    return products.filter(p => p.category === category);
}

function getCategories() {
    const products = loadProducts();
    const categories = [...new Set(products.map(p => p.category))];
    return categories;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        DEFAULT_PRODUCTS, 
        loadProducts, 
        saveProducts,
        getProductById,
        getProductsByCategory,
        getCategories
    };
}uctById,
        getProductsByCategory,
        getCategories
    };
}