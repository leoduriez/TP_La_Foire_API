// Importation du module express
const express = require('express');

// Création d'un router express
const router = express.Router();

// Importation des modèles
const Article = require('../models/article.model');
const Avis = require('../models/avis.model');

// POST - Ajouter un article
router.post('/add', async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Récupérer tous les articles
router.get('/all', async (req, res) => {
    try {
        const articles = await Article.find()
            .populate('user', 'prenom email')
            .populate('avis');
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Récupérer un article par son ID
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
            .populate('user', 'prenom email avatar')
            .populate({
                path: 'avis',
                populate: {
                    path: 'user',
                    select: 'prenom avatar'
                }
            });
        
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Modifier un article
router.put('/update/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }

        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('user', 'prenom email');

        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Supprimer un article
router.delete('/delete/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }

        // Supprimer aussi tous les avis liés à cet article
        await Avis.deleteMany({ article: req.params.id });

        await Article.findByIdAndDelete(req.params.id);
        
        res.status(200).json({ message: 'Article supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Récupérer les avis d'un article
router.get('/:id/avis', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }

        const avis = await Avis.find({ article: req.params.id })
            .populate('user', 'prenom avatar email');
        
        res.status(200).json(avis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Trier les articles par prix (croissant par défaut)
router.get('/sort/price', async (req, res) => {
    try {
        const order = req.query.order === 'desc' ? -1 : 1;
        
        const articles = await Article.find()
            .sort({ price: order })
            .populate('user', 'prenom email');
        
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
