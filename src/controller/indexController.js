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

        for (const s of slides) {
            if(s.id == slideId){
                s.removed = 0;
                break;
            }
        } 

        fs.writeFileSync(path.join(__dirname, '/../data/slides.json'), JSON.stringify(slides, null, ' '), 'utf-8');
        res.redirect('/');
    },
    create: (req, res) => {
        res.render('create');
    },
    build: (req, res) => {
        let newSlide = {
            id: slides[slides.length-1].id + 1,
            title : req.body.title,
            description : req.body.description,
            img : req.file.filename,
            removed : 0,
            deleted : 0
        }
        slides.push(newSlide);
        fs.writeFileSync(path.join(__dirname, '/../data/slides.json'), JSON.stringify(slides, null, ' '), 'utf-8');
        res.redirect('/');
    },
    edit: (req, res) => {
        let slideId = req.params.id;
        let slideToEdit = 0;
        for (const s of slides) {
            if(s.id == slideId){
                slideToEdit = s;
                break;
            }
        }
        res.render('edit', { slide : slideToEdit });
    },
    change: (req, res) => {
        let slideId = req.params.id;
        let deleteImg = '';

        for (let s of slides) {
            if(s.id == slideId){
                s.title = req.body.title;
                s.description = req.body.description;
                deleteImg = s.img;
                s.img = req.file.filename;
                break;
            }
        }        

        fs.writeFileSync(path.join(__dirname, '/../data/slides.json'), JSON.stringify(slides, null, ' '), 'utf-8');
        fs.unlinkSync(__dirname + '/../../public/' + deleteImg);
        res.redirect('/');
    },
    remove: (req, res) => {
        let slideId = req.params.id;
        for (const s of slides) {
            if(s.id == slideId){
                s.removed = 1;
                break;
            }
        }
        fs.writeFileSync(path.join(__dirname, '/../data/slides.json'), JSON.stringify(slides, null, ' '), 'utf-8');
        res.redirect('/');
    },
    delete: (req, res) => {
        let slideId = req.params.id;
        let deleteImg = '';
        for (const s of slides) {
            if(s.id == slideId){
                deleteImg = s.img;
                s.deleted = 1;
                break;
            }
        }

        fs.writeFileSync(path.join(__dirname, '/../data/slides.json'), JSON.stringify(slides, null, ' '), 'utf-8');
        fs.unlinkSync(__dirname + '/../../public/' + deleteImg);
        
        res.redirect('/list/removed/#section');
    }
}

module.exports = indexController;