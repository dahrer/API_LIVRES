const mysql = require('mysql');
const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api_livre'
};

class MysqlUtilities {
    //--------------------------------------//
    //--------------- AUTEUR ---------------//
    //--------------------------------------//
    getAuteur(callback) {
        const connection = mysql.createConnection(config);
        connection.connect();
        connection.query(`SELECT nom,vivant  FROM Auteur`, (error, results) => {
            callback(results, error);
        })
        connection.end()
    };

    postAuteur(callback, auteur) {
        const connection = mysql.createConnection(config);
        connection.connect();
        connection.query(`INSERT INTO Auteur (nom,vivant) Values (?,?)`, [auteur.nom, auteur.vivant], (error, result) => {
            callback(result, error)
        })
        connection.end()
    };
    //-----------------------------------------//
    //--------------- AUTEUR/ID ---------------//
    //-----------------------------------------//
    getAuteurById(callback, id) {
        const connection = mysql.createConnection(config);
        connection.connect();

        connection.query(`SELECT nom,vivant FROM Auteur WHERE id_auteur=(?)`, [id], (error, result) => {
            callback(result, error)
        })
        connection.end()
    };

    modifyAuteurById(callback, auteur) {
        const connection = mysql.createConnection(config);
        connection.connect();

        connection.query(`UPDATE Auteur SET nom=(?), vivant=(?) WHERE id_auteur=(?)`, [auteur.nom, auteur.vivant, auteur.id_auteur], (error, result) => {
            callback(result, error)
        })
        connection.end()
    };

    deleteAuteurById(callback, id) {
        const connection = mysql.createConnection(config);
        connection.connect();

        connection.query(`DELETE FROM Auteur WHERE id_auteur=(?)`, [id], (error, result) => {
            callback(result, error)
        })
        connection.end()
    };
    //-----------------------------------------------//
    //--------------- AUTEUR/ID/LIVRE ---------------//
    //-----------------------------------------------//
    getLivreByAuteurId(callback, contenir) {
        const connection = mysql.createConnection(config);
        connection.connect();

        connection.query(`SELECT DISTINCT livre.nom,livre.type,auteur.nom AS auteur FROM livre,auteur,contenir WHERE contenir.id_auteur=auteur.id_auteur AND livre.id_livre=contenir.id_livre AND auteur.id_auteur=(?)  `, [contenir.id_auteur], (error, result) => {
            callback(result, error)
        })
        connection.end()
    };

    //--------------------------------------------------//
    //--------------- AUTEUR/ID/LIVRE/ID ---------------//
    //--------------------------------------------------//
    addLivreToAuteur(callback, contenir) {
        const connection = mysql.createConnection(config);
        connection.connect();

        connection.query(`INSERT INTO contenir (id_auteur,id_livre) values (?,?)`, [contenir.id_auteur, contenir.id_livre], (error, result) => {
            callback(result, error)
        })
        connection.end()
    };

    deleteLivreFromAuteur(callback, contenir) {
        const connection = mysql.createConnection(config);
        connection.connect();

        connection.query(`DELETE FROM contenir WHERE id_livre=(?) AND id_auteur(?)`, [contenir.id_livre, contenir.id_auteur], (error, result) => {
            callback(result, error)
        })
        connection.end()
    };
    //-------------------------------------//
    //--------------- LIVRE ---------------//
    //-------------------------------------//
    getLivre(callback) {
        const connection = mysql.createConnection(config);
        connection.connect();
        connection.query(`SELECT nom,type  FROM Livre`, (error, results) => {
            callback(results, error);


        })
        connection.end()
    };

    postLivre(callback, livre) {
        const connection = mysql.createConnection(config);
        connection.connect();
        connection.query(`INSERT INTO Livre (nom,type) Values (?,?)`, [livre.nom, livre.type], (error, result) => {
            callback(result, error)
        })
        connection.end()
    };

    //----------------------------------------//
    //--------------- LIVRE/ID ---------------//
    //----------------------------------------//

    getLivreById(callback, id) {
        const connection = mysql.createConnection(config);
        connection.connect();

        connection.query(`SELECT nom,type FROM Livre WHERE id_livre=(?)`, [id], (error, result) => {
            callback(result, error)
        })
        connection.end()
    };

    modifyLivreById(callback, livre) {
        const connection = mysql.createConnection(config);
        connection.connect();

        connection.query(`UPDATE Livre SET nom=(?), type=(?) WHERE id_livre=(?)`, [livre.nom, livre.type, livre.id_livre], (error, result) => {
            callback(result, error)
        })
        connection.end()
    };

    deleteLivreById(callback, id) {
        const connection = mysql.createConnection(config);
        connection.connect();

        connection.query(`DELETE FROM Livre WHERE id_livre=(?)`, [id], (error, result) => {
            callback(result, error)
        })
        connection.end()
    };

};

module.exports = new MysqlUtilities();