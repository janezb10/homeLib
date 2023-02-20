const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = require('../config/SQLConfig');



/* NOVA KNJIGA */
router.post('/newBook', async (req, res, next) => {
    try {
        const sql = `
            INSERT INTO knjige 
            (naslov
                ${req.body.id_avtor ? ", id_avtor" : ""}
                ${req.body.id_podrocje ? ", id_podrocje" : ""}
                ${req.body.id_podpodrocje ? ", id_podpodrocje" : ""}
                ${req.body.id_pozicija ? ", id_pozicija" : ""}
                ${req.body.id_jezik ? ", id_jezik" : ""}
                ${req.body.id_zbirka ? ", id_zbirka" : ""}
                ${req.body.drzava ? ", drzava" : ""}
                ${req.body.leto ? ", leto" : ""}
                ${req.body.opombe ? ", opombe" : ""}
            )
            VALUES (?
                ${req.body.id_avtor ? ", ?" : ""}
                ${req.body.id_podrocje ? ", ?" : ""}
                ${req.body.id_podpodrocje ? ", ?" : ""}
                ${req.body.id_pozicija ? ", ?" : ""}
                ${req.body.id_jezik ? ", ?" : ""}
                ${req.body.id_zbirka ? ", ?" : ""}
                ${req.body.drzava ? ", ?" : ""}
                ${req.body.leto ? ", ?" : ""}
                ${req.body.opombe ? ", ?" : ""}
            );`;

        let ar = [];
        if(req.body.naslov) ar.push(req.body.naslov);
        if(req.body.id_avtor) ar.push(req.body.id_avtor);
        if(req.body.id_podrocje) ar.push(req.body.id_podrocje);
        if(req.body.id_podpodrocje) ar.push(req.body.id_podpodrocje);
        if(req.body.id_pozicija) ar.push(req.body.id_pozicija);
        if(req.body.id_jezik) ar.push(req.body.id_jezik);
        if(req.body.id_zbirka) ar.push(req.body.id_zbirka);
        if(req.body.drzava) ar.push(req.body.drzava);
        if(req.body.leto) ar.push(req.body.leto);
        if(req.body.opombe) ar.push(req.body.opombe);

        const [rows] = await db.execute(sql, ar);
        if(rows.affectedRows == 1) res.status(200).send("New book added");
        else throw new Error("Something went wrong");
    }
    catch (err) {
        next(err);
    }
});
/* PRIDOBI KNJIGO Z DOLOČENIM IDJEM */
router.get('/bookId/:id', async (req, res, next) => {
    try {
        const sql = `
        SELECT id, naslov, id_avtor, id_podrocje, id_podpodrocje, id_pozicija, id_jezik, id_zbirka, drzava, leto, opombe
        FROM knjige
        WHERE id = ?;`;
        const [rows] = await db.execute(sql, [req.params.id]);
        if (rows.length == 0) throw new Error('There is no book with that ID');
        res.send(rows);
    }
    catch (err) {
        next(err);
    }
});

/* IŠČI KNJIGI IN DOBI SEZNAM KNJIG KI USTREZAJO KRITERIJU */
// /* trenutno samo po avtorju, bo treba dodelat*/ 
router.get('/search/:keyword', async (req, res, next) => {
    try {
        const sql = `
            SELECT id, naslov, id_avtor, id_podrocje, id_podpodrocje, id_pozicija, id_jezik, id_zbirka, drzava, leto, opombe
            FROM knjige
            WHERE naslov 
            LIKE ?`;
            const [rows] = await db.execute(sql, [`%${req.params.keyword}%`]);
            if (rows.length == 0) throw new Error('Nothing was found');
            res.send(rows);
        }
        catch (err) {
            next(err);
        }
    });

    



/* POSODOBI PODATKE KNJIGI Z IDJEM */
router.put('/updateBook/:id', async (req, res, next) => {
    try {
        const sqlp = `
            SELECT id 
            FROM knjige 
            WHERE id = ?;`;
        const [rowsp] = await db.execute(sqlp, [req.params.id]);
        if (rowsp.length == 0) throw new Error('book with that id does not exist');

        const sql = `
            UPDATE knjige
            SET 
            id = ${req.params.id}
            ${req.body.naslov ? ", naslov = "+"'"+ req.body.naslov+"'" : ""}
            ${req.body.id_avtor ? ", id_avtor = "+ req.body.id_avtor : ""}
            ${req.body.id_podrocje ? ", id_podrocje = "+ req.body.id_podrocje : ""}
            ${req.body.id_podpodrocje ? ", id_podpodrocje = "+ req.body.id_podpodrocje : ""}
            ${req.body.id_pozicija ? ", id_pozicija = "+ req.body.id_pozicija : ""}
            ${req.body.id_jezik ? ", id_jezik = "+ req.body.id_jezik : ""}
            ${req.body.id_zbirka ? ", id_zbirka = "+ req.body.id_zbirka : ""}
            ${req.body.drzava ? ", drzava = "+"'"+ req.body.drzava+"'" : ""}
            ${req.body.leto ? ", leto = "+ req.body.leto : ""}
            ${req.body.opombe ? ", opombe = "+"'"+ req.body.opombe+"'" : ""}
            WHERE id = ${req.params.id}
        `;

        console.log(sql);
        const [rows] = await db.execute(sql);
        if (rows.affectedRows == 0) throw new Error('There was a problem updating');
        res.send("book updated");
    }
    catch (err) {
        next(err);
    }
});

/* ZBRIŠI KNJIGO ČE JO POJE PES */
router.delete('/deleteBook/:id', async (req, res, next) => {
    try {
        const sql = `
        DELETE FROM knjige WHERE id = ?;`;
        const [rows] = await db.execute(sql, [req.params.id]);
        if (rows.affectedRows == 0) throw new Error('Book with that ID does not exist');
        res.send("book deleted");
    }
    catch (err) {
        next(err);
    }
})


module.exports = router;