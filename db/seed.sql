USE db_giftology;

-- user insert
INSERT INTO user(firstName, lastName, password, email, photo_url)
VALUES ("Tony", "Habash","1234","anthonyhabash86@gmail.com","https://media-exp2.licdn.com/mpr/mpr/shrink_100_100/AAIAAQDGAAAAAQAAAAAAAAs-AAAAJDVhYmVlYWQyLWI4NzAtNDczYi1hMGExLWFiMjFlYzhiMjY0ZQ.jpg");


-- relation insert
INSERT INTO relation(userID,firstName,lastName,relationship,birthDate,address, photo_url)
SELECT id, "Mike", "Habash", "older brother", "1984-05-21", "123 Sunny Drive", "https://media.licdn.com/media/p/1/005/0a1/1a3/1c0dc8c.jpg" FROM user WHERE email = "anthonyhabash86@gmail.com";

-- gift insert
INSERT INTO gift (userID, relationID, name, description, image_url, web_url, price)
SELECT user.id, 
	   relation.id, 
       "ProMag Archangel Precision Stock Remington 700 Bed Block",
       "Next generation, fully adjustable stock for Remington 700, short-action rifles in all calibers based on the .308 cartridge. Drop-in fit. Molded entirely, in black, of our proprietary, lightweight, carbon-fiber filled polymer. Impervious to weather, and will withstand all standard gun solvents and oils. The Archangel 700 Precision Stock is tough as nails, and will deliver outstanding accuracy shot after shot, year after year.",
       "https://i5.walmartimages.com/asr/b411e073-b521-4afe-9c97-cbf82a5e09b9_1.9d733756f2707936d5cfd57da9af48b0.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
       "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FProMag-Archangel-Precision-Stock-Remington-700-Bed-Block%2F35121569%3Faffp1%3D3cpLDZx6VAXPYSXuAXnLWZxY_9cLWp-7Rqchl-T4nxY%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
       290.99
       FROM user INNER JOIN relation ON user.id = relation.userID
       WHERE user.firstName = "Tony"
       AND relation.firstName = "Mike";
