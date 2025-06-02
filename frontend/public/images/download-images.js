const https = require('https');
const fs = require('fs');
const path = require('path');

// Define the images to download
const images = [
  {
    url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1000',
    filename: 'hero-image.jpg',
    description: 'Hero image showing healthy plants'
  },
  {
    url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=1000',
    filename: 'disease-detection.jpg',
    description: 'Image showing plant disease inspection with magnifying glass'
  },
  {
    url: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1000',
    filename: 'expert-advice.jpg',
    description: 'Image for expert advice feature'
  },
  {
    url: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1000',
    filename: 'farmer-contribution.jpg',
    description: 'Image for farmer contribution feature'
  },
  {
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000',
    filename: 'buy-medicine.jpg',
    description: 'Image for buy medicine feature'
  },
  {
    url: 'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?q=80&w=1000',
    filename: 'multi-language.jpg',
    description: 'Image for multi-language feature'
  }
];

// Function to download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if there was an error
      console.error(`Error downloading ${filename}: ${err.message}`);
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  console.log('Starting image downloads...');
  
  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`Failed to download ${image.filename}`);
    }
  }
  
  console.log('All downloads completed!');
}

// Run the download function
downloadAllImages(); 