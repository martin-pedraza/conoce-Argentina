const fs = require('fs');
const path = require('path');
const slides = require('./../data/slides.json');
const presentation = slides[0];

const indexController = {
    home: (req, res) => {
        res.render('index', {presentation: presentation, slides: slides});
    },
    listRemoved: (req, res) => {
        let removedSlides = slides.filter(s => s.removed == 1);
        res.render('index', {presentation: presentation, slides : removedSlides});
    },
    listEditRemove: (req, res) => {
        let activeSlides = slides.filter(s => s.removed == 0);
        res.render('index', {presentation: presentation, slides : activeSlides});
    },
    activate: (req, res) => {
        let slideId = req.params.id;
        slides[slideId].removed = 0;
        let cambio = slides;
        fs.writeFileSync(path.join(__dirname, '/../data/slides.json'), JSON.stringify(cambio, null, ' '), 'utf-8');
        res.redirect('/');
    },
    create: (req, res) => {
        res.render('create');
    },
    build: (req, res) => {
        res.redirect('/');
    },
    edit: (req, res) => {
        res.render('edit');
    },
    change: (req, res) => {
        res.redirect('/');
    },
    remove: (req, res) => {
        let slideId = req.params.id;
        slides[slideId].removed = 1;
        let cambio = slides;
        fs.writeFileSync(path.join(__dirname, '/../data/slides.json'), JSON.stringify(cambio, null, ' '), 'utf-8');
        res.redirect('/');
    }
}

module.exports = indexController;