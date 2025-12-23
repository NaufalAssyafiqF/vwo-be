const express = require('express');
const cors = require('cors');
const { promos } = require('./dataPromo');

const app = express();
const PORT = 3000;

// Middleware untuk mem-parsing body request JSON
app.use(cors());
app.use(express.json());

// path utama
app.get('/', (req, res) => {
    return res.json({
        message: 'server berhasil dibuat',
    })
})

// path login
app.post('/login', (req, res) => {

    try {
        const {username, password} = req.body;

        // validasi login
        if (username=='naufal' && password=='123') {
            return res.json({
                message : 'login berhasil',
                isLogin: true
            })
        }else {
            return res.json({
                message: 'login gagal, username atau password salah',
                isLogin: false
            })
        }

    } catch (error) {
        res.json({
            message: 'server error',
            errorMessage: error,
            isLogin: false
        })
    }

})

// path get data promo
// app.get('/getDataPromo', (req, res) => {
//     const category = req.query.category;


//     try {
//         const getDataByCategory = promos.filter(promo => {return promo.category == category})

//         // validasi category
//         if (getDataByCategory.length == 0) {
//             return res.json({
//                 message: 'kategori tersebut tidak ada',
//                 isGetdata: false
//             })
//         }

//         return res.json({
//                 message: 'data berhasil diambil',
//                 isGetdata: true,
//                 dataPromo: getDataByCategory
//             })
        
//     } catch (error) {
//         return res.json({
//                 message: 'data gagal didapat, ada kesalahan',
//                 isGetdata: false,
//                 errorMessaage: error
//             })
//     }
// })

app.get('/getDataPromo', (req, res) => {
    const category = req.query.category;
    
    try {
        // Validasi jika query category tidak ada
        if (!category) {
            return res.json({
                message: 'Kategori harus diisi',
                isGetdata: false
            });
        }

        // pecah category menjadi array
        const categories = category.split('-').slice(0, 3);

        // quota untuk setiap kategori
        const quotas = [4, 3, 1];

        let finalDataPromo = [];

        // Loop berdasarkan kategori 
        categories.forEach((categoryName, index) => {
            // Ambil data dari "database" promos yang kategorinya cocok
            const filtered = promos.filter(p => p.category === categoryName);
            
            // Ambil data sesuai jatah (quota) berdasarkan urutan index
            const limitedData = filtered.slice(0, quotas[index]);
            
            // Gabungkan ke array utama
            finalDataPromo = [...finalDataPromo, ...limitedData];
        });

        // validasi hasil filter
        if (finalDataPromo.length === 0) {
            return res.json({
                message: 'kategori tersebut tidak ada',
                isGetdata: false
            });
        }

        return res.json({
                message: 'data berhasil diambil',
                isGetdata: true,
                dataPromo: finalDataPromo
            })
        
    } catch (error) {
        return res.json({
                message: 'data gagal didapat, ada kesalahan',
                isGetdata: false,
                errorMessaage: error
            })
    }
})


app.listen(PORT, () => {
    console.log(`Server siap untuk testing di http://localhost:${PORT}`);
});