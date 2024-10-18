import express from 'express';

const logOutController = express.Router();

logOutController.get('/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 0 });
    res.redirect('/login');
})

export default logOutController;