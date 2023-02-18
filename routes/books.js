const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = require('../config/SQLConfig');

/* PRIDOBI KNJIGO Z DOLOČENIM IDJEM */
router.get('/id/:id', async (req, res, next) => {
    console.log(req.body)
    try {
        const sql = `
        SELECT id, naslov, avtor, jezik, zbirka, država, LETO, področje, podpodročje, pozicija
        FROM knjiznica.knjige
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
/* trenutno samo po avtorju, bo treba dodelat */
router.get('/search/:keyword', async (req, res, next) => {
    try {
        const sql = `
            SELECT id, naslov, avtor, jezik, zbirka, država, LETO, področje, podpodročje, pozicija
            FROM knjiznica.knjige
            WHERE naslov 
            LIKE ?`;
            const [rows] = await db.execute(sql, [`%${req.params.keyword}%`]);
            if (rows.length == 0) throw new Error('Ne najde nič');
            res.send(rows);
        }
        catch (err) {
            next(err);
        }
    });

/* NOVA KNJIGA */
router.post('/new', async (req, res, next) => {
    try {
        const sql = `
            INSERT INTO Leilina_knjiznica 
            (id_podrocje, id_podpodrocje, naslov, avtor, id_pozicija, id_jezik, zbirka, drzava, opombe, leto)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        let arr = [req.body.id_podrocje, req.body.id_podpodrocje, req.body.naslov, req.body.avtor, req.body.id_pozicija, req.body.id_jezik, req.body.zbirka || "NULL", req.body.drzava || "NULL", req.body.opombe || "NULL", req.body.leto || "NULL"];
        console.log(arr);
        const [rows] = await db.execute(sql, arr);
        res.send(rows);
    }
    catch (err) {
        next(err);
    }
});
    
/* PRIDOBI JEZIKE */
router.get('/jeziki', async (req, res, next) => {
    try {
        const sql = `
            SELECT *
            FROM jezik`;
        const [rows] = await db.execute(sql);
        res.send(rows);
    } catch (err) {
        next(err);
    }
});

/* PRIDOBI POZICIJE */
router.get('/pozicije', async (req, res, next) => {
    try {
        const sql = `
            SELECT *
            FROM pozicija`;
        const [rows] = await db.execute(sql);
        res.send(rows);
    } catch (err) {
        next(err);
    }
});

/* PRIDOBI PODROČJA */
router.get('/podrocja', async (req, res, next) => {
    try {
        const sql = `
        SELECT UNIQUE podrocje, id_podrocje
        FROM podrocje`;
        const [rows] = await db.execute(sql);
        res.send(rows);
    } catch (err) {
        next(err);
    }
});

/* PRIDOBI PODROČJA IN PODPODROČJA */
router.get('/podrocjaPodpodrocja', async (req, res, next) => {
    try {
        const sql = `
            SELECT *
            FROM podrocje`;
        const [rows] = await db.execute(sql);
        res.send(rows);
    } catch (err) {
        next(err);
    }
});



/* POSODOBI PODATKE KNJIGI Z IDJEM */
router.put('/book/update/:id', async (req, res, next) => {
    try {
        const sqlp = `
            SELECT * 
            FROM Leilina_knjiznica 
            WHERE id = ?;`;
        const [rowsp] = await db.execute(sqlp, [valuep.id]);
        if (rowsp.length == 0) throw new Error('book with that id does not exist');
        const vb = await schemab.validateAsync(req.body);
        const sqlb = `
            UPDATE Leilina_knjiznica 
            SET 
            id_podrocje = ?, 
            id_podpodrocje = ?, 
            naslov = ?, 
            avtor = ?, 
            id_pozicija = ?, 
            id_jezik = ?, 
            zbirka = ?, 
            drzava = ?, 
            leto = ? 
            WHERE id = ?;`;
        const rowsb = await db.execute(sqlb, [vb.id_podrocje, vb.id_podpodrocje, vb.naslov, vb.avtor, vb.id_pozicija, vb.id_jezik, vb.zbirka || 'NULL', vb.drzava || 'NULL', vb.opombe || 'NULL', vb.leto || 'NULL', valuep.id]);
        res.send(rowsb);
    }
    catch (err) {
        next(err);
    }
});

/* ZBRIŠI KNJIGO ČE JO POJE PES */
router.delete('/book/delete/:id', async (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number()
            .integer()
    });
    try {
        const value = await schema.validateAsync(req.params);
        const sql = `
        DELETE FROM Leilina_knjiznica WHERE id = ?;`;
        const [rows] = await db.execute(sql, [value.id]);
        if (rows.affectedRows == 0) throw new Error('Book with that ID does not exist');
        res.send(rows);
    }
    catch (err) {
        next(err);
    }
})


module.exports = router;