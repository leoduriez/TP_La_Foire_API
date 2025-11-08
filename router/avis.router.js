// Importation du module express
const express = require('express');

// Création d'un router express
const router = express.Router();

// Importation des modèles
const Avis = require('../models/avis.model');
const Article = require('../models/article.model');

// POST - Ajouter un avis
router.post('/add', async (req, res) => {
    try {
        // Vérifier que l'article existe
        const article = await Article.findById(req.body.article);
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }

        // Créer l'avis
        const avis = await Avis.create(req.body);

        // Ajouter l'avis à l'article avec findByIdAndUpdate
        await Article.findByIdAndUpdate(
            req.body.article,
            { $push: { avis: avis._id } }
        );

        // Retourner l'avis avec les données populées
        const populatedAvis = await Avis.findById(avis._id)
            .populate('user', 'prenom avatar email')
            .populate('article', 'name');

        res.status(201).json(populatedAvis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Supprimer un avis
router.delete('/delete/:id', async (req, res) => {
    try {
        const avis = await Avis.findById(req.params.id);
        
        if (!avis) {
            return res.status(404).json({ message: 'Avis non trouvé' });
        }

        // Retirer l'avis de l'article
        await Article.findByIdAndUpdate(
            avis.article,
            { $pull: { avis: avis._id } }
        );

        // Supprimer l'avis
        await Avis.findByIdAndDelete(req.params.id);
        
        res.status(200).json({ message: 'Avis supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
