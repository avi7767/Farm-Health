const https = require('https');
const fs = require('fs');
const path = require('path');

// Define the pesticide images to download
const images = [
  {
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000',
    filename: 'pesticide-1.jpg',
    description: 'Organic pesticide spray'
  },
  {
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000',
    filename: 'pesticide-2.jpg',
    description: 'Chemical pesticide bottles'
  },
  {
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000',
    filename: 'pesticide-3.jpg',
    description: 'Fungicide spray'
  },
  {
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000',
    filename: 'pesticide-4.jpg',
    description: 'Herbicide application'
  },
  {
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000',
    filename: 'pesticide-5.jpg',
    description: 'Insecticide granules'
  },
  {
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000',
    filename: 'pesticide-6.jpg',
    description: 'Biological pest control'
  },
  {
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000',
    filename: 'pesticide-7.jpg',
    description: 'Plant growth regulator'
  },
  {
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000',
    filename: 'pesticide-8.jpg',
    description: 'Soil treatment'
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
  console.log('Starting pesticide image downloads...');
  
  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`Failed to download ${image.filename}`);
    }
  }
  
  console.log('All pesticide image downloads completed!');
}

// Run the download function
downloadAllImages(); 