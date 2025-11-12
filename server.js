const express = require('express');

const app = express();
const PORT = 3000;

// Middleware untuk mem-parsing body request JSON
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


app.listen(PORT, () => {
    console.log(`Server siap untuk testing di http://localhost:${PORT}`);
});