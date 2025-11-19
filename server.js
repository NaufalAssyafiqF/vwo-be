const express = require('express');
const cors = require('cors');
import { promos } from './dataPromo';

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
app.get('/getDataPromo', (req, res) => {
    const category = req.query.category;

    try {
        const getDataByCategory = promos.filter(promo => {return promo.category == category})
        return res.json({
                message: 'data berhasil diambil',
                dataPromo: getDataByCategory
            })
        
    } catch (error) {
        return res.json({
                message: 'data gagal didapat, ada kesalahan',
                errorMessage: error
            })
    }
})


app.listen(PORT, () => {
    console.log(`Server siap untuk testing di http://localhost:${PORT}`);
});