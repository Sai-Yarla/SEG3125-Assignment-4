import fs from 'fs';
import path from 'path';

const products = [
  { id: 'helm-01', file: 'Nasal_helmet_from_Olmütz.jpg' },
  { id: 'coin-01', file: 'Aureus_Augustus_Lyon_RIC_166a.jpg' },
  { id: 'sword-01', file: 'Sword_(12th_century).jpg' },
  { id: 'pottery-01', file: 'Attic_Black-Figure_Amphora_-_Herakles_and_the_Nemean_Lion_-_Walters_4815.jpg' },
  { id: 'helm-02', file: 'Corinthian_helmet_Denda_Staatliche_Antikensammlungen_4330.jpg' },
  { id: 'manuscript-01', file: 'Book_of_Hours,_France,_15th_Century.jpg' },
  { id: 'coin-02', file: 'Denarius_Julius_Caesar.jpg' },
  { id: 'shield-01', file: 'Kiteshield.jpg' },
  { id: 'scroll-01', file: 'Papyrus_of_Ani.jpg' },
  { id: 'dagger-01', file: 'Gladius_Mainz_RGZM.jpg' },
  { id: 'book-01', file: 'SPQR_A_History_of_Ancient_Rome_cover.jpg' },
  { id: 'book-02', file: 'The_Decline_and_Fall_of_the_Roman_Empire_-_Title_Page.jpg' },
  { id: 'jar-01', file: 'Canopic_jars_of_Neskhons.jpg' },
  { id: 'astrolabe-01', file: 'Astrolabe-Persian-18C.jpg' },
  { id: 'book-03', file: 'Medieval_University.jpg' }
];

const imgDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

async function getImageUrl(filename) {
  // First try commons
  let res = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`);
  let data = await res.json();
  let pages = data.query.pages;
  let pageId = Object.keys(pages)[0];
  
  if (pageId !== '-1' && pages[pageId].imageinfo) {
    return pages[pageId].imageinfo[0].url;
  }

  // Fallback to en.wikipedia
  res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`);
  data = await res.json();
  pages = data.query.pages;
  pageId = Object.keys(pages)[0];
  
  if (pageId !== '-1' && pages[pageId].imageinfo) {
    return pages[pageId].imageinfo[0].url;
  }
  return null;
}

async function download(url, dest) {
  const response = await fetch(url, { headers: { 'User-Agent': 'HistoricalReplicaApp/1.0 (contact@example.com)' } });
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(dest, buffer);
  console.log('Downloaded', dest);
}

async function run() {
  for (const p of products) {
    const dest = path.join(imgDir, `${p.id}.jpg`);
    try {
      console.log(`Resolving URL for ${p.file}...`);
      const url = await getImageUrl(p.file);
      if (url) {
        console.log(`Downloading ${url}...`);
        await download(url, dest);
      } else {
        console.error(`Could not resolve URL for ${p.file}`);
      }
    } catch(e) {
      console.error(`Failed to download ${p.id}:`, e.message);
    }
  }
}

run();
