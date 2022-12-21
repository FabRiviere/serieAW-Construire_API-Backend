const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(4).max(30).required()
});
exports.user = (req, res, next) => {
    const { error, value } = userSchema.validate(req.body);
    if(error) {
        res.status(422).json({ error: 'email ou mot de passe invalide !' });
    } else {
        next();
    }
};

//! Validation des données lors de l'ajout ou modification d'une bière
 
const beerSchema = Joi.object({
    userId: Joi.string().trim().length(24).required(),
    name: Joi.string().trim().min(2).required(),
    manufacturer: Joi.string().trim().min(2).required(),
    description: Joi.string().trim().min(5).required(),
    mainIngredient: Joi.string().trim().min(3).required(),
    degree: Joi.number().integer().min(1).max(10).required()
});
exports.beer = (req, res, next) => {
    let beer;
    if(req.file) {
        beer = JSON.parse(req.body.beer);
    } else {
        beer = req.body;
    }
   
    const { error, value } = beerSchema.validate(beer);
    if(error) {
        res.status(422).json({ error: 'Données invalides !' });
    } else {
        next();
    }
};

//! Validation de l'id des bières
const idSchema = Joi.string().trim().length(24).required();
exports.id = (req, res, next) => {
    const {error, value} = idSchema.validate(req.params.id);
    if(error) {
        res.status(422).json({ error: 'Id de la bière invalide !' });
    } else {
        next()
    }
};

//  Validation des likes/dislikes

const likeSchema = Joi.object({
    userId: Joi.string().trim().length(24).required(),
    like: Joi.valid(-1, 0, 1).required()
});
exports.like = (req, res, next) => {
    const { error, value } = likeSchema.validate(req.body);
    if(error) {
        res.status(422).json({ error: "Données renseignées invalides ! " });
    } else {
        next();
    }
};


