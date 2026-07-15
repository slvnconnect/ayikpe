const express = require('express');
const path = require('path');
const fs = require('fs')

const PORT = process.env.PORT || 3000;
const app = express();

// Chargement des données
const apparts = require('./public/view/data.js');
const template = require('./public/view/template.js')

// Fonction pour créer un slug depuis une chaîne
function cleanText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replaceAll(' ', '-');
}

// Servir les fichiers statiques (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// -------------------------------
// Routes des pages HTML
// -------------------------------

app.get('/', (req, res) => {
  res.type('html')
  res.send( fs.readFileSync(path.join(__dirname, 'public', 'view', 'index.html') , 'utf-8')
  .replace('@header' , template[0].header)
  .replace('@newsletter' , template[0].newsletter)
  .replace('@footer' , template[0].footer)
  
  );
});

app.get('/appartements', (req, res) => {
  res.type('html')
  res.send( fs.readFileSync(path.join(__dirname, 'public', 'view', 'appartements.html') , 'utf-8')
  .replace('@header' , template[0].header)
  .replace('@newsletter' , template[0].newsletter)
  .replace('@footer' , template[0].footer)
  );
});

app.get('/about', (req, res) => {
  res.type('html')
  res.send( fs.readFileSync(path.join(__dirname, 'public', 'view', 'about.html') , 'utf-8')
  .replace('@header' , template[0].header)
  .replace('@newsletter' , template[0].newsletter)
  .replace('@footer' , template[0].footer)
  );
});

app.get('/contact', (req, res) => {
  res.type('html')
  res.send( fs.readFileSync(path.join(__dirname, 'public', 'view', 'contact.html') , 'utf-8')
  .replace('@header' , template[0].header)
  .replace('@newsletter' , template[0].newsletter)
  .replace('@footer' , template[0].footer)
  );
});

// Page détail d'un appartement (template)
app.get('/appart/:slug', (req, res) => {
  res.type('html')
  res.send( fs.readFileSync(path.join(__dirname, 'public', 'view', 'appart.html') , 'utf-8')
  .replace('@header' , template[0].header)
  .replace('@newsletter' , template[0].newsletter)
  .replace('@footer' , template[0].footer)
  );
});

// -------------------------------
// API endpoints (HTMX)
// -------------------------------

// 9 premiers appartements (pour la page d'accueil)
app.get('/data', (req, res) => {
  const appartementsHTML = apparts.slice(0, 9).map(n => `
    <div class="reveal bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div class="overflow-hidden">
        <img src="https://dtgpmtmnyergiimlpoml.supabase.co/storage/v1/object/public/apparts/galerie/${n.src}" alt="${n.localisation}" class="w-full h-56 object-cover hover:scale-105 transition-transform duration-500" loading="lazy">
      </div>
      <div class="p-5">
        <p class="text-sm text-blue-600 font-semibold">${n.localisation}</p>
        <p class="text-gray-700 mt-1 line-clamp-2">${n.info}</p>
        <a href="/appart/${cleanText(n.info)}" class="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full transition transform hover:scale-105">
          Voir plus
        </a>
      </div>
    </div>
  `).join('\n');
  res.send(appartementsHTML);
});

// Tous les appartements (pour la page /appartements)
app.get('/api/appartements', (req, res) => {
  const allHTML = apparts.map(n => `
    <div class="reveal bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div class="overflow-hidden">
        <img src="https://dtgpmtmnyergiimlpoml.supabase.co/storage/v1/object/public/apparts/galerie/${n.src}" alt="${n.localisation}" class="w-full h-56 object-cover hover:scale-105 transition-transform duration-500" loading="lazy">
      </div>
      <div class="p-5">
        <p class="text-sm text-blue-600 font-semibold">${n.localisation}</p>
        <p class="text-gray-700 mt-1 line-clamp-2">${n.info}</p>
        <a href="/appart/${cleanText(n.info)}" class="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full transition transform hover:scale-105">
          Voir plus
        </a>
      </div>
    </div>
  `).join('\n');
  res.send(allHTML);
});

app.get('/api/appart/:slug', (req, res) => {
  const slug = req.params.slug;
  const appart = apparts.find(n => cleanText(n.info) === slug);

  if (!appart) {
    return res.status(404).send('<div class="text-center py-20 text-red-500">Appartement introuvable</div>');
  }

  // Slides de la galerie (une seule image visible à la fois via opacité)
  const slidesHTML = appart.tof.map((img, index) => `
    <div class="slide${index === 0 ? ' opacity-100' : ' opacity-0'}">
      <img src="https://dtgpmtmnyergiimlpoml.supabase.co/storage/v1/object/public/apparts/galerie/${img.tof}" alt="Photo ${index + 1}" loading="lazy" />
    </div>
  `).join('');

  // Miniatures
  const thumbsHTML = appart.tof.map((img, index) => `
    <img src="https://dtgpmtmnyergiimlpoml.supabase.co/storage/v1/object/public/apparts/galerie/${img.tof}" alt="Miniature ${index + 1}" class="thumb w-16 h-16 object-cover rounded-lg${index === 0 ? ' active' : ''}" loading="lazy" />
  `).join('');

  const html = `
    <div class="max-w-6xl mx-auto px-4 py-8 reveal">
      <!-- En-tête -->
      <div class="mb-8 text-center md:text-left">
        <p class="text-blue-600 font-semibold">${appart.localisation}</p>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mt-1">${appart.info}</h1>
      </div>

      <!-- Galerie -->
      <div class="gallery-main relative w-full h-[50vh] md:h-[70vh] bg-gray-200 rounded-xl overflow-hidden shadow-lg">
        ${slidesHTML}
        <button class="gallery-arrow prev"><i class="fas fa-chevron-left"></i></button>
        <button class="gallery-arrow next"><i class="fas fa-chevron-right"></i></button>
      </div>

      <div class="flex justify-center gap-2 mt-4 flex-wrap">
        ${thumbsHTML}
      </div>

      <!-- Description -->
      <div class="bg-white rounded-2xl shadow p-6 md:p-8 mt-10">
        <h2 class="text-2xl font-bold mb-4">Description</h2>
        <div class="prose max-w-none text-gray-700 leading-relaxed">${appart.détails}</div>
      </div>

      <!-- CTA -->
      <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/contact" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full text-center transition transform hover:scale-105 shadow-md">
          📞 Nous contacter
        </a>
        <a href="/appartements" class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-8 py-3 rounded-full text-center transition transform hover:scale-105">
          ← Retour aux annonces
        </a>
      </div>
    </div>
  `;

  res.send(html);
});

// Lancement
app.listen(PORT, () => {
  console.log(`Serveur AYIKPE IMMOBILIER en ligne sur http://localhost:${PORT}`);
});