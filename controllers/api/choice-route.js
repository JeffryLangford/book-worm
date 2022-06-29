const router = require('express').Router();
const { Choice, User } = require('../../models');
const withAuth =require('../../utils/auth');


//all choices by users
router.get('/', (req, res) => {
    Choice.findAll({
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbChoiceData => res.json(dbChoiceData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get single choice by id
router.get('/:id', (req, res) => {
    Choice.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbChoiceData => {
            if (!dbChoiceData) {
                res.status(404).json({ message: 'No recommendations found with this title' });
            }
            res.json(dbChoiceData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//create a user choice
router.post('/', (req, res) => {
    // expects {title, author, genre, copyright, post_id, user_id}
    Choice.create({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        copyright: req.body.copyright,
        post_id: req.body.post_id,
        user_id: req.body.user_id
    })
        .then(dbChoiceData => res.json(dbChoiceData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

//delete choice by id
router.delete('/:id', (req, res) =>{
    Choice.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbChoiceData => {
            if (!dbChoiceData) {
                res.status(404).json({ message: "No recommendation found with this id!" });
                return;
            }
            res.json(dbChoiceData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;

