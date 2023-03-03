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
            SELECT id, naslov, avtor, podrocje, podpodrocje, pozicija, jezik, zbirka, drzava, leto, opombe
            FROM knjige
            LEFT JOIN avtor ON knjige.id_avtor = avtor.id_avtor
            LEFT JOIN podrocje ON knjige.id_podrocje = podrocje.id_podrocje
            LEFT JOIN podpodrocje ON knjige.id_podpodrocje = podpodrocje.id_podpodrocje AND knjige.id_podrocje = podpodrocje.id_podrocje
            LEFT JOIN pozicija ON knjige.id_pozicija = pozicija.id_pozicija
            LEFT JOIN jezik ON knjige.id_jezik = jezik.id_jezik
            LEFT JOIN zbirka ON knjige.id_zbirka = zbirka.id_zbirka
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
        SELECT id, naslov, avtor, podrocje, podpodrocje, pozicija, jezik, zbirka, drzava, leto, opombe
        FROM knjige
        LEFT JOIN avtor ON knjige.id_avtor = avtor.id_avtor
        LEFT JOIN podrocje ON knjige.id_podrocje = podrocje.id_podrocje
        LEFT JOIN podpodrocje ON knjige.id_podpodrocje = podpodrocje.id_podpodrocje AND knjige.id_podrocje = podpodrocje.id_podrocje
        LEFT JOIN pozicija ON knjige.id_pozicija = pozicija.id_pozicija
        LEFT JOIN jezik ON knjige.id_jezik = jezik.id_jezik
        LEFT JOIN zbirka ON knjige.id_zbirka = zbirka.id_zbirka
        WHERE naslov
        LIKE ?;`;
            const [rows] = await db.execute(sql, [`%${req.params.keyword}%`]);
            if (rows.length == 0) throw new Error('Nothing was found');
            res.send(rows);
        }
        catch (err) {
            next(err);
        }
    });

/* POSODOBI PODATKE KNJIGI Z IDJEM  SQL atack?*/
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
            id = ?
            ${req.body.naslov ? ", naslov = ?" : ""}
            ${req.body.id_avtor ? ", id_avtor = ?" : ""}
            ${req.body.id_podrocje ? ", id_podrocje = ?" : ""}
            ${req.body.id_podpodrocje ? ", id_podpodrocje = ?" : ""}
            ${req.body.id_pozicija ? ", id_pozicija = ?" : ""}
            ${req.body.id_jezik ? ", id_jezik = ?" : ""}
            ${req.body.id_zbirka ? ", id_zbirka = ?" : ""}
            ${req.body.drzava ? ", drzava = ?" : ""}
            ${req.body.leto ? ", leto = ?" : ""}
            ${req.body.opombe ? ", opombe = ?" : ""}
            WHERE id = ?
        `;
        let ar = [];
        if(req.params.id) ar.push(req.params.id);
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
        if(req.params.id) ar.push(req.params.id);


        const [rows] = await db.execute(sql, ar);
        if (rows.affectedRows == 0) throw new Error('There was a problem updating');
        res.send("book updated");
    }
    catch (err) {
        next(err);
    }
});


router.get('/avtorji/:keyword?', async (req, res, next) => {
    try {
        const sql = `
        SELECT *
        FROM avtor
        WHERE avtor
        LIKE ?`;
        const arr = req.params.keyword ? [`%${req.params.keyword}%`] : ['%%'];
        const [rows] = await db.execute(sql, arr);
        res.send(rows);
    } catch (err) {
        next(err);
    }
});

router.get('/pozicije/:keyword?', async (req, res, next) => {
    try {
        const sql = `
        SELECT * 
        FROM pozicija
        WHERE pozicija
        LIKE ?`;
        const arr = req.params.keyword ? [`%${req.params.keyword}%`] : ['%%'];
        const [rows] = await db.execute(sql, arr);
        res.send(rows);
    } catch (err) {
        next(err);
    }
});


router.get('/jeziki/:keyword?', async (req, res, next) => {
    try {
        const sql = `
        SELECT *
        FROM jezik
        WHERE jezik
        LIKE ?`;
        const arr = req.params.keyword ? [`%${req.params.keyword}%`] : ['%%'];
        const [rows] = await db.execute(sql, arr);
        res.send(rows);
    } catch (err) {
        next(err);
    }
});

router.get('/zbirke/:keyword?', async (req, res, next) => {
    try {
        const sql = `
        SELECT *
        FROM zbirka
        WHERE zbirka
        LIKE ?`;
        const arr = req.params.keyword ? [`%${req.params.keyword}%`] : ['%%'];
        const [rows] = await db.execute(sql, arr);
        res.send(rows);
    } catch (err) {
        next(err);
    }
});

router.get('/podrocja/:keyword?', async (req, res, next) => {
    try {
        const sql = `
        SELECT *
        FROM podrocje
        WHERE podrocje
        LIKE ?`;
        const arr = req.params.keyword ?  [`%${req.params.keyword}%`] : ['%%'];
        const [rows] = await db.execute(sql, arr);
        res.send(rows);
    } catch (err) {
        next(err);
    }
});

router.get('/podpodrocja/:idPodrocje/:keyword?', async (req, res, next) => {
    try {
        const sql = `
        SELECT *
        FROM podpodrocje
        WHERE id_podrocje = ?
        AND
        podpodrocje
        LIKE ?`;
        const arr = req.params.keyword ? [req.params.idPodrocje, `%${req.params.keyword}%`] : [req.params.idPodrocje, '%%'];
        const [rows] = await db.execute(sql, arr);
        res.send(rows);
    } catch (err) {
        next(err);
    }
});




//dodaj nove
router.post('/noviAvtor', async (req, res, next) => {
    try {
        const sql = `
        INSERT INTO avtor (avtor)
        VALUES (?)`;
        const [rows] = await db.execute(sql, [req.body.avtor]);
        if(rows.affectedRows == 0) throw new Error('Something went wrong');
        res.send("new author added");
    } catch(err) {
        next(err);
    }
});

router.post('/noviJezik', async (req, res, next) => {
    try {
        const sql = `
        INSERT INTO jezik (jezik)
        VALUES (?)`;
        const [rows] = await db.execute(sql, [req.body.jezik]);
        if(rows.affectedRows == 0) throw new Error('Something went wrong');
        res.send("new language added");
    } catch(err) {
        next(err);
    }
});

router.post('/novaPozicija', async (req, res, next) => {
    try {
        const sql = `
        INSERT INTO pozicija (pozicija)
        VALUES (?)`;
        const [rows] = await db.execute(sql, [req.body.pozicija]);
        if(rows.affectedRows == 0) throw new Error('Something went wrong');
        res.send("new position added");
    } catch(err) {
        next(err);
    }
});

router.post('/novaZbirka', async (req, res, next) => {
    try {
        const sql = `
        INSERT INTO zbirka (zbirka)
        VALUES (?)`;
        const [rows] = await db.execute(sql, [req.body.zbirka]);
        if(rows.affectedRows == 0) throw new Error('Something went wrong');
        res.send("nova zbirka dodana");
    } catch(err) {
        next(err);
    }
});

router.post('/novoPodrocje', async (req, res, next) => {
    try {
        const sql = `
        INSERT INTO podrocje (podrocje)
        VALUES (?)`;
        const [rows] = await db.execute(sql, [req.body.podrocje]);
        if(rows.affectedRows == 0) throw new Error('Something went wrong');
        res.send("novo podrocje dodano");
    } catch(err) {
        next(err)
    }
});

router.post('/novoPodpodrocje', async (req, res, next) => {
    try {
        const sql = `
        INSERT INTO podpodrocje (id_podrocje, podpodrocje)
        VALUES(?, ?)`;
        const arr = [req.body.id_podrocje, req.body.podpodrocje];
        console.log(arr);
        const [rows] = await db.execute(sql, [req.body.id_podrocje, req.body.podpodrocje]);
        if(rows.affectedRows == 0) throw new Error('Something went wrong');
        res.send("novo podpodrocje dodano");
    } catch(err) {
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