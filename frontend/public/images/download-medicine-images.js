const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  fungicide: [
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg'
  ],
  growth: [
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg'
  ],
  nutrient: [
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg'
  ],
  organic: [
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg'
  ],
  insecticide: [
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg'
  ],
  bio: [
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg'
  ],
  soil: [
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg'
  ]
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const writeStream = fs.createWriteStream(filepath);
        response.pipe(writeStream);
        writeStream.on('finish', () => {
          writeStream.close();
          resolve();
        });
      } else {
        reject(`Failed to download ${url}`);
      }
    }).on('error', reject);
  });
};

const downloadAllImages = async () => {
  const baseDir = path.join(__dirname, 'medicines');
  
  // Create medicines directory if it doesn't exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }

  for (const [category, urls] of Object.entries(images)) {
    for (let i = 0; i < urls.length; i++) {
      const filename = `${category}-${i + 1}.jpg`;
      const filepath = path.join(baseDir, filename);
      try {
        await downloadImage(urls[i], filepath);
        console.log(`Downloaded ${filename}`);
      } catch (error) {
        console.error(`Error downloading ${filename}:`, error);
      }
    }
  }
};

downloadAllImages().catch(console.error); 