const Users = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) => {
        try {
            const { president_id, namefirst, namelast, email, password, country, atom } = req.body;

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "Ten E-mail jest już w użyciu." })
            if (password.lenght < 8 )
            return res.status(400).json({ msg: "Hasło jest zbyt krótkie." })

            if (password.search(/[a-z]/i) < 0)
            return res.status(400).json({ msg: "Wymaga conajmniej 6 liter ." })

            if (password.search(/[a-z]/) < 0)
            return res.status(400).json({ msg: "Hasło wymaga małej litery." })

            if (password.search(/[A-Z]/) < 0)
            return res.status(400).json({ msg: "Hasło wymaga dużej litery." })

            if (password.search(/[0-9]/) < 0 )
            return res.status(400).json({ msg: "Hasło wymaga cyfry" })
            
            if (password.search(/[!@#$%^&*]/) < 0 )
            return res.status(400).json({ msg: "Hasło wymaga specjalnego znaku" })
                
            // Enkrypcja hasła
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                president_id, namefirst, namelast, email, password: passwordHash, country , atom
            })

            // Zapis w bazie Mongo
            await newUser.save()

            // Authentykacja Tokenem
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            })

            res.json({ accesstoken })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "Konto nie istnieje." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Nieprawidłowe hasło." })


            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            })

            res.json({ accesstoken })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: "Wylogowane" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "Proszę Zalogować się albo Zarejestrować" })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Proszę Zalogować się albo Zarejestrować" })

                const accesstoken = createAccessToken({ id: user.id })

                res.json({ accesstoken })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if (!user) return res.status(400).json({ msg: "Konto nie istnieje." })

            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUserdata: async(req,res)=>{
        try{
            const token = req.cookies.accesstoken;
            if(!token) return res.status(400).json({ msg: "Brak tokenu zaloguj" })
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                res.json({ user })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    }
}


const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}
module.exports = userCtrl
