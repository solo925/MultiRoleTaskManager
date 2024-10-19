import app from './app';

// dotenv.config();


// // Use cookie-parser middleware and provide a secret
// app.use(cookieParser(process.env.COOKIE_SECRET || 'your_secret_key_here'));
// console.log(process.env.COOKIE_SECRET)

// // Other middlewares like bodyParser, etc.
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Your routes and other configurations...



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
