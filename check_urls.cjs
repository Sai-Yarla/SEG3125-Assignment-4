const https = require('https');

const urls = [
  'https://en.wikipedia.org/wiki/Special:FilePath/Nasal_helmet_from_Olm%C3%BCtz.jpg?width=600',
  'https://en.wikipedia.org/wiki/Special:FilePath/Aureus_Augustus_Lyon_RIC_166a.jpg?width=600',
  'https://en.wikipedia.org/wiki/Special:FilePath/Sword_(12th_century).jpg?width=600',
  'https://en.wikipedia.org/wiki/Special:FilePath/Attic_Black-Figure_Amphora_-_Herakles_and_the_Nemean_Lion_-_Walters_4815.jpg?width=600',
  'https://en.wikipedia.org/wiki/Special:FilePath/Corinthian_helmet_Denda_Staatliche_Antikensammlungen_4330.jpg?width=600',
  'https://en.wikipedia.org/wiki/Special:FilePath/Book_of_Hours,_France,_15th_Century.jpg?width=600',
  'https://en.wikipedia.org/wiki/Special:FilePath/Denarius_Julius_Caesar.jpg?width=600',
  'https://en.wikipedia.org/wiki/Special:FilePath/Bayeux_Tapestry_scene55_Halley_comet.jpg?width=600',
  'https://en.wikipedia.org/wiki/Special:FilePath/Papyrus_of_Ani.jpg?width=600',
  'https://en.wikipedia.org/wiki/Special:FilePath/Gladius_Mainz_RGZM.jpg?width=600',
  'https://en.wikipedia.org/wiki/Special:FilePath/Canopic_jars_of_Neskhons.jpg?width=600',
  'https://en.wikipedia.org/wiki/Special:FilePath/Astrolabe-Persian-18C.jpg?width=600',
  'https://en.wikipedia.org/wiki/Special:FilePath/The_Decline_and_Fall_of_the_Roman_Empire_-_Title_Page.jpg?width=600'
];

async function checkUrls() {
  for (let u of urls) {
    await new Promise(resolve => {
      https.get(u, (res) => {
        console.log(res.statusCode, u.split('FilePath/')[1].split('?')[0]);
        resolve();
      }).on('error', (e) => {
        console.log('Error', u);
        resolve();
      });
    });
  }
}
checkUrls();
