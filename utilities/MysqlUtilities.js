const mysql = require('mysql');
const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api_livre'
};

class MysqlUtilities {
    /*
        //----------------- Recuperer nombre de livres -----------------//
        getNbLivre(callback) {
            const connection = mysql.createConnection(config);
            connection.connect();
            connection.query(`SELECT count(id_livre) nb_livres FROM livre`, (error, results) => {
                callback(results, error);
            })
            connection.end()
        };

        //----------------- Recuperer nombre d'auteurs -----------------//
        getNbAuteur(callback) {
            const connection = mysql.createConnection(config);
            connection.connect();
            connection.query(`SELECT count(id_auteur) nb_auteurs FROM auteur`, (error, results) => {
                callback(results, error);
            })
            connection.end()
        };
    */
    //--------------------------------------//
    //--------------- AUTEUR ---------------//
    //--------------------------------------//
    getAuteur(callback) {
        const connection = mysql.createConnection(config);
        connection.connect();
        connection.query(`SELECT nom,vivant  FROM auteur`, (error, results) => {
            callback(results, error);
        })
        connection.end()
    };

    postAuteur(callback, auteur) {
        const connection = mysql.createConnection(config);
        connection.connect();
        connection.query(`INSERT INTO auteur (nom,vivant) Values (?,?)`, [auteur.nom, auteur.vivant], (error, result) => {
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

        connection.query(`SELECT nom,vivant FROM auteur WHERE id_auteur=(?)`, [id], (error, result) => {
            callback(result, error)
        })
        connection.end()
    };

    modifyAuteurById(callback, auteur) {
        const connection = mysql.createConnection(config);
        connection.connect();

        connection.query(`UPDATE auteur SET nom=(?), vivant=(?) WHERE id_auteur=(?)`, [auteur.nom, auteur.vivant, auteur.id_auteur], (error, result) => {
            callback(result, error)
        })
        connection.end()
    };

    deleteAuteurById(callback, id) {
        const connection = mysql.createConnection(config);
        connection.connect();

        connection.query(`DELETE FROM auteur WHERE id_auteur=(?)`, [id], (error, result) => {
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
        connection.query(`SELECT nom,type  FROM livre`, (error, results) => {
            callback(results, error);


        })
        connection.end()
    };

    postLivre(callback, livre) {
        const connection = mysql.createConnection(config);
        connection.connect();
        connection.query(`INSERT INTO livre (nom,type) Values (?,?)`, [livre.nom, livre.type], (error, result) => {
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

        connection.query(`SELECT nom,type FROM livre WHERE id_livre=(?)`, [id], (error, result) => {
            callback(result, error)
        })
        connection.end()
    };

    modifyLivreById(callback, livre) {
        const connection = mysql.createConnection(config);
        connection.connect();

        connection.query(`UPDATE livre SET nom=(?), type=(?) WHERE id_livre=(?)`, [livre.nom, livre.type, livre.id_livre], (error, result) => {
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