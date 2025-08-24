import express from 'express';
import {UserModel} from "../schemas/userSchema.js";
import passport from "passport";

const router = express.Router();

router.post('/register', async function (req, res, next) {
    const username = req.body.username
    const password = req.body.password
    if (!username || !password) {
        return res.status(400).json({error: "Username and password are required"})
    }
    try {
        await UserModel.register(new UserModel({username, role: 'user'}), password, );
        res.status(201).json({message: "User registered in successfully"})
    } catch (error) {
        console.error("Error saving user:", error)
        res.status(500).json({error: error.message})
    }
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(401).json({message: 'Invalid username or password'})
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err)
            }
            req.session.isAuth = true
            return res.json({
                isAuthenticated: true,
                user: {
                    id: req.user.id,
                    username: req.user.username,
                    role: req.user.role
                },
                message: 'User logged in successfully'
            });
        });
    })(req, res, next);
});

router.post('/logout', function (req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({message: "Failed to log out"})
            }
            res.clearCookie('connect.sid')
            return res.status(200).json({message: 'Logged out successfully'})
        })
    });
})

router.get('/checkAuth', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({
            isAuthenticated: true,
            user: {
                id: req.user.id,
                username: req.user.username,
                role: req.user.role
            }
        });
    } else {
        return res.json({isAuthenticated: false});
    }
});

export default router
