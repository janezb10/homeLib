CREATE DATABASE IF NOT EXISTS knjiznica;
USE knjiznica;

CREATE TABLE IF NOT EXISTS jezik(
	id_jezik		INTEGER  			NOT NULL PRIMARY KEY AUTO_INCREMENT
	,jezik			VARCHAR(91) 		NOT NULL
);

CREATE TABLE IF NOT EXISTS podrocje(
	id_podrocje		INTEGER 			NOT NULL PRIMARY KEY AUTO_INCREMENT
	,podrocje		VARCHAR(91) 		NOT NULL
);

CREATE TABLE IF NOT EXISTS podpodrocje(
	id_podpodrocje	INTEGER				NOT NULL AUTO_INCREMENT
	,id_podrocje	INTEGER				NOT NULL
	,podpodrocje	VARCHAR(91)			NOT NULL
	,PRIMARY KEY (id_podpodrocje, id_podrocje)
	,FOREIGN KEY (id_podrocje) REFERENCES podrocje(id_podrocje) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pozicija(
	id_pozicija  	INTEGER				NOT NULL PRIMARY KEY AUTO_INCREMENT
	,pozicija		VARCHAR(91)			NOT NULL
);

CREATE TABLE IF NOT EXISTS avtor(
	id_avtor  		INTEGER				NOT NULL PRIMARY KEY AUTO_INCREMENT
	,avtor			VARCHAR(91)			NOT NULL
);

CREATE TABLE IF NOT EXISTS zbirka(
	id_zbirka		INTEGER				NOT NULL PRIMARY KEY AUTO_INCREMENT
	,zbirka			VARCHAR(91)			NOT NULL
);

CREATE TABLE IF NOT EXISTS knjige(
	id				INTEGER  			NOT NULL PRIMARY KEY AUTO_INCREMENT
	,naslov			VARCHAR(91) 		NOT NULL
	,id_avtor		INTEGER 			NOT NULL DEFAULT 1
	,id_podrocje	INTEGER 			NOT NULL DEFAULT 1
	,id_podpodrocje INTEGER 			NOT NULL DEFAULT 1
	,id_pozicija	INTEGER 			NOT NULL DEFAULT 1
	,id_jezik		INTEGER 			
	,id_zbirka		INTEGER
	,drzava			VARCHAR(91)
	,leto			INTEGER
	,opombe			VARCHAR(91)
	,FOREIGN KEY (id_avtor)				REFERENCES avtor(id_avtor)
	,FOREIGN KEY (id_podrocje) 			REFERENCES podrocje(id_podrocje)
	,FOREIGN KEY (id_podpodrocje) 		REFERENCES podpodrocje(id_podpodrocje)
	,FOREIGN KEY (id_pozicija) 			REFERENCES pozicija(id_pozicija)
	,FOREIGN KEY (id_jezik) 			REFERENCES jezik(id_jezik)
	,FOREIGN KEY (id_zbirka)			REFERENCES zbirka(id_zbirka)
);







