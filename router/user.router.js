// Importation du module express
const express = require('express');

// Création d'un router express
const router = express.Router();

// Importation du modèle User
const User = require('../models/user.model');

// GET - Récupérer tous les utilisateurs
router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Ajouter un utilisateur
router.post('/add', async (req, res) => {
    try {
        // Vérifier si l'email existe déjà
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
