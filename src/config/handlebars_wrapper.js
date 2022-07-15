const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const partialsDir = [];

const handlebars_wrapper = (app) => {

    const partials = [
        { name: 'modules', path: path.join(__dirname, '../../app/partials/modules') },
        { name: 'components', path: path.join(__dirname, '../../app/partials/components') }
    ];    
    
    partials.forEach((partial) => {
    
        fs.readdir(partial.path, (err, filesAndFolders) => {
    
            filesAndFolders.forEach((file) => {
                if (!file.includes('.')) {
                    partialsDir.push(`${partial.path}/${file}`)
                }
            });
        });
    });

    app.engine('handlebars', engine({ 
        defaultLayout: path.join(__dirname, '../../app/views/layouts/main'), 
        layoutsDir: path.join(__dirname, '../../app/views'), 
        partialsDir:  partialsDir
    }));
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '../../app/views'));
}

module.exports = handlebars_wrapper;
