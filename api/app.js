import express from "express";
import authRouter from "./routes/auth.js";
import apiRouter from "./routes/api.js";
import {config} from "dotenv";
import {connect} from "mongoose";
import session from "express-session";
import passport from "passport";
import {UserModel} from "./schemas/userSchema.js";
import cors from 'cors'
import connectMongoDBSession from 'connect-mongodb-session'

config()
const app = express()
const MongodbUrl = 'mongodb://0.0.0.0:27017/travelmoldovadb'

const MongoDBStore = connectMongoDBSession(session)
const store = new MongoDBStore({
    uri: MongodbUrl,
    collection: "mySession"
})

app.use(session({
    secret: 'runea mika',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 *24,
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
    }
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

connect(MongodbUrl)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));


app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));

// app.set('view engine', 'pug');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json());
app.use('/', apiRouter)
app.use('/auth', authRouter)

app.listen(3000, () => {
    console.log("Server started on port 3000")
})
export default app
