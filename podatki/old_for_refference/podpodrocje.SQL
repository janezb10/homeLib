CREATE TABLE IF NOT EXISTS podpodrocje(
	id_podpodrocje INTEGER NOT NULL AUTO_INCREMENT
	,id_podrocje INTEGER NOT NULL
	,podpodrocje VARCHAR(91) NOT NULL
	,PRIMARY KEY (id_podpodrocje, id_podrocje)
	,FOREIGN KEY (id_podrocje) REFERENCES podrocje(id_podrocje) ON DELETE CASCADE
);
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,1 ,"detektivka");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,2 ,"vojni");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,3 ,"humor, komedija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,4 ,"ljubezenski");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,5 ,"biografija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,6 ,"potopis, dnevnik");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,7 ,"kratko(pravljica, novela)");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,8 ,"družbeni roman");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,9 ,"grozljivka");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,10 ,"zf, utopija, distopija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,11 ,"zgodovinski");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,12 ,"eksotični");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,13 ,"eksistencializem");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,14 ,"erotika");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(1 ,15 ,"drugo");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,1 ,"detektivka");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,2 ,"vojni");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,3 ,"humor, komedija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,4 ,"ljubezenski");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,5 ,"biografija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,6 ,"potopis, dnevnik");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,7 ,"kratko(pravljica, novela)");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,8 ,"družbeni roman");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,9 ,"grozljivka");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,10 ,"zf, utopija, distopija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,11 ,"zgodovinski");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,12 ,"eksotični");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,13 ,"eksistencializem");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,14 ,"erotika");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(2 ,15 ,"drugo");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(3 ,1 ,"drugo");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(4 ,1 ,"slovenska");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(4 ,2 ,"tuja");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(5 ,1 ,"slovenska");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(5 ,2 ,"tuja");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(6 ,1 ,"sociologija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(6 ,2 ,"psihologija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(6 ,3 ,"ekonomija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(6 ,4 ,"filozofija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(6 ,5 ,"umetnost");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(6 ,6 ,"zgodovina");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(6 ,7 ,"antropologija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(6 ,8 ,"turizem, geografija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(6 ,9 ,"vera in mistika");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(6 ,10 ,"politologija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(7 ,1 ,"slovar");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(7 ,2 ,"slovnica");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(7 ,3 ,"pravopis");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(7 ,4 ,"književnost");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(7 ,5 ,"literarna teorija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(8 ,1 ,"matematika");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(8 ,2 ,"fizika");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(8 ,3 ,"biologija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(8 ,4 ,"kemija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(8 ,5 ,"tehnika");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(8 ,6 ,"računalništvo");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(8 ,7 ,"logika");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(9 ,1 ,"ročna dela");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(9 ,2 ,"vrt");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(9 ,3 ,"recepti");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(9 ,4 ,"oprema stanovanja");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(9 ,5 ,"zdravje");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(10 ,1 ,"enciklopedija");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(10 ,2 ,"atlas");
INSERT INTO podpodrocje(id_podrocje, id_podpodrocje, podpodrocje)
VALUES(10 ,3 ,"šport in igre");
