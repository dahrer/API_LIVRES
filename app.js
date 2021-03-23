const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { check, validationResult } = require('express-validator');
app.use(bodyParser.json());

//------------Recuperation utilities---------------//
const mysqlUtilities = require('./utilities/MysqlUtilities');
const logUtilities = require('./utilities/LogUtilities');

//------------Recuperation beans---------------//
const Auteur = require('./beans/Auteur');
const Livre = require('./beans/Livre');
const Contenir = require('./beans/Contenir');

//--------------------------------------//
//--------------- AUTEUR ---------------//
//--------------------------------------//

//----------------- Afficher les auteurs ---------------------//
app.get('/auteur', (req, res) => {
    console.log("Liste auteur /")
    mysqlUtilities.getAuteur((results, error) => {
        if (!error) {

            res.send(results);
            let content = `Display all auteurs`;
            logUtilities.userEntryLog(content);


        } else {
            logUtilities.mysqlErrorLog(error);
            res.status(500).send(error);
        }
    })
});
//------------------ Ajouter un auteur --------------------//
app.post('/auteur', [check('nom').matches(/^[A-Za-z0-9 '-]+$/), check('vivant').isBoolean(), check('nom').isLength({ min: 1 }), check('vivant').isLength({ min: 1 })], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logUtilities.validatorErrorLog(errors);
        return res.status(422).json({ errors: errors.array() })

    }
    let auteur = new Auteur(req.body.nom, req.body.vivant)
    mysqlUtilities.postAuteur((results, error) => {
        if (!error) {
            res.send(results);
            let content = `Add Auteur ${auteur.nom} vivant: ${auteur.vivant}`;
            logUtilities.userEntryLog(content);
        } else {
            logUtilities.mysqlErrorLog(error);
            res.status(500).send(error);
        }
    }, auteur)
});
//-----------------------------------------//
//--------------- AUTEUR/ID ---------------//
//-----------------------------------------//

//----------------- Afficher auteur par ID ---------------------//
app.get('/auteur/:Id', [check('Id').isNumeric(), check('Id').isLength({ min: 1 })], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logUtilities.validatorErrorLog(errors);
        return res.status(422).json({ errors: errors.array() })
    }
    let id = req.params.Id;
    mysqlUtilities.getAuteurById((results, error) => {

        if (!error) {

            res.send(results);
            let content = `Display Auteur with ID ${id}`;
            logUtilities.userEntryLog(content);



        } else {
            logUtilities.mysqlErrorLog(error);
            res.status(500).send(error);
        }

    }, id)
});

//----------------- Mettre a jour auteur par ID ---------------------//
app.put('/auteur/:Id', [check('Id').isNumeric(), check('nom').matches(/^[A-Za-z0-9 '-]+$/), check('vivant').isBoolean(), check('Id').isLength({ min: 1 }), check('nom').isLength({ min: 1 }), check('vivant').isLength({ min: 1 })], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logUtilities.validatorErrorLog(errors);
        return res.status(422).json({ errors: errors.array() })
    }
    let auteur = new Auteur(req.body.nom, req.body.vivant)
    auteur.id_auteur = req.params.Id
    mysqlUtilities.modifyAuteurById((results, error) => {
        if (!error) {


            res.send(results);
            let content = `Modify auteur with ID:${auteur.id_auteur} as ${auteur.nom} and vivant: ${auteur.vivant}`;
            logUtilities.userEntryLog(content);


        } else {
            logUtilities.mysqlErrorLog(error);
            res.status(500).send(error);
        }
    }, auteur)
});

//----------------- Supprimer auteur par ID ---------------------//
app.delete('/auteur/:Id', [check('Id').isNumeric(), check('Id').isLength({ min: 1 })], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logUtilities.validatorErrorLog(errors);
        return res.status(422).json({ errors: errors.array() })
    }
    let id = req.params.Id;
    mysqlUtilities.deleteAuteurById((results, error) => {
        if (!error) {

            res.send(results);
            let content = `Delete auteur with ID ${id}`;
            logUtilities.userEntryLog(content);


        } else {
            logUtilities.mysqlErrorLog(error);
            res.status(500).send(error);
        }
    }, id)
});

//-----------------------------------------------//
//--------------- AUTEUR/ID/LIVRE ---------------//
//-----------------------------------------------//

//----------------- Recuperer livres de l'auteur ---------------------//
app.get('/auteur/:Id/livre', [check('Id').isNumeric(), check('Id').isLength({ min: 1 })], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logUtilities.validatorErrorLog(errors);
        return res.status(422).json({ errors: errors.array() })
    }
    let contenir = new Contenir
    contenir.id_auteur = req.params.Id


    mysqlUtilities.getLivreByAuteurId((results, error) => {
        if (!error) {

            res.send(results);
            let content = `Display all livre from auteur by ID: ${contenir.id_auteur}`;
            logUtilities.userEntryLog(content);




        } else {
            logUtilities.mysqlErrorLog(error);
            res.status(500).send(error);
        }
    }, contenir)
});

//--------------------------------------------------//
//--------------- AUTEUR/ID/LIVRE/ID ---------------//
//--------------------------------------------------//

//----------------- Associer auteur a un livre ---------------------//
app.post('/auteur/:Id/livre/:Ip', [check('Id').isNumeric(), check('Ip').isNumeric(), check('Id').isLength({ min: 1 }), check('Ip').isLength({ min: 1 })], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logUtilities.validatorErrorLog(errors);
        return res.status(422).json({ errors: errors.array() })
    }
    let contenir = new Contenir
    contenir.id_auteur = req.params.Id
    contenir.id_livre = req.params.Ip
    mysqlUtilities.addLivreToAuteur((results, error) => {
        if (!error) {
            res.send(results);
            let content = `Add livre ${contenir.id_livre} to auteur ${contenir.id_auteur} `;
            logUtilities.userEntryLog(content);

        } else {
            logUtilities.mysqlErrorLog(error);
            res.status(500).send(error);
        }
    }, contenir)
});

//----------------- Supprimer association auteur/livre ---------------------//
app.delete('/auteur/:Id/livre/:Ip', [check('Id').isNumeric(), check('Ip').isNumeric(), check('Id').isLength({ min: 1 }), check('Ip').isLength({ min: 1 })], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logUtilities.validatorErrorLog(errors);
        return res.status(422).json({ errors: errors.array() })
    }
    let contenir = new Contenir
    contenir.id_auteur = req.params.Id
    contenir.id_livre = req.params.Ip
    mysqlUtilities.deleteLivreFromAuteur((results, error) => {
        if (!error) {

            res.send(results);
            let content = `Delete livre ${contenir.id_livre} from auteur ${contenir.id_auteur}`;
            logUtilities.userEntryLog(content);


        } else {
            logUtilities.mysqlErrorLog(error);
            res.status(500).send(error);
        }
    }, contenir)
});

//-------------------------------------//
//--------------- LIVRE ---------------//
//-------------------------------------//

//----------------- Afficher les livres ---------------------//
app.get('/livre', (req, res) => {
    console.log("Liste livre /")
    mysqlUtilities.getLivre((results, error) => {
        if (!error) {

            res.send(results);
            let content = `Display all livres`;
            logUtilities.userEntryLog(content);


        } else {
            logUtilities.mysqlErrorLog(error);
            res.status(500).send(error);
        }
    })
});

//----------------- Ajouter un livre ---------------------//
app.post('/livre', [check('nom').matches(/^[A-Za-z0-9 '-]+$/), check('type').matches(/^[A-Za-z '-]+$/), check('nom').isLength({ min: 1 }), check('type').isLength({ min: 1 })], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logUtilities.validatorErrorLog(errors);
        return res.status(422).json({ errors: errors.array() })
    }
    let livre = new Livre(req.body.nom, req.body.type)
    mysqlUtilities.postLivre((results, error) => {
        if (!error) {
            res.send(results);
            let content = `Add livre ${livre.nom} with type: ${livre.type}`;
            logUtilities.userEntryLog(content);

        } else {
            logUtilities.mysqlErrorLog(error);
            res.status(500).send(error);
        }
    }, livre)
});

//----------------------------------------//
//--------------- LIVRE/ID ---------------//
//----------------------------------------//

//----------------- Afficher livre par ID ---------------------//
app.get('/spe/:Id', [check('Id').isNumeric(), check('Id').isLength({ min: 1 })], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logUtilities.validatorErrorLog(errors);
        return res.status(422).json({ errors: errors.array() })
    }
    let id = req.params.Id;

    mysqlUtilities.getSpeById((results, error) => {

        if (!error) {

            res.send(results);
            let content = `Display spécialité ${id}`;
            logUtilities.userEntryLog(content);




        } else {
            logUtilities.mysqlErrorLog(error);
            res.status(500).send(error);
        }

    }, id)
});

//----------------- Modifier livre par ID ---------------------//

app.put('/livre/:Id', [check('Id').isNumeric(), check('nom').matches(/^[A-Za-z0-9 '-]+$/), check('type').matches(/^[A-Za-z '-]+$/), check('Id').isLength({ min: 1 }), check('nom').isLength({ min: 1 }), check('type').isLength({ min: 1 })], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logUtilities.validatorErrorLog(errors);
        return res.status(422).json({ errors: errors.array() })
    }

    let livre = new Livre(req.body.nom, req.body.type)
    livre.id_livre = req.params.Id
    mysqlUtilities.modifyLivreById((results, error) => {
        if (!error) {


            res.send(results);
            let content = `Modify livre ${livre.id_livre} as ${livre.nom} and type: ${livre.type}`;
            logUtilities.userEntryLog(content);


        } else {
            logUtilities.mysqlErrorLog(error);
            res.status(500).send(error);
        }
    }, livre)
});

//----------------- Supprimer livre par ID ---------------------//
app.delete('/livre/:Id', [check('Id').isNumeric(), check('Id').isLength({ min: 1 })], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        logUtilities.validatorErrorLog(errors);
        return res.status(422).json({ errors: errors.array() })
    }
    let id = req.params.Id;
    mysqlUtilities.deleteLivreById((results, error) => {
        if (!error) {

            res.send(results);
            let content = `Delete livre ${id}`;
            logUtilities.userEntryLog(content);


        } else {
            logUtilities.mysqlErrorLog(error);
            res.status(500).send(error);
        }
    }, id)
});



app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})