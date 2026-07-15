module.exports = [
  {
    'header' : `  <!-- Header / Navigation -->
  <header class="fixed top-0 left-0 w-full z-50 glass shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <a href="/" class="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
          AYIKPE IMMOBILIER
        </a>
        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center space-x-8">
          <a href="/" class="font-medium hover:text-blue-600 transition">Accueil</a>
          <a href="/appartements" class="font-medium hover:text-blue-600 transition">Appartements</a>
          <a href="/about" class="font-medium hover:text-blue-600 transition">À propos</a>
          <a href="/contact" class="font-medium hover:text-blue-600 transition">Contact</a>
        </nav>
        <!-- Hamburger mobile -->
        <div class="md:hidden hamburger cursor-pointer" id="hamburger">
          <span class="w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span class="w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span class="w-6 h-0.5 bg-gray-800"></span>
        </div>
      </div>
    </div>
    <!-- Mobile menu -->
    <div id="mobileMenu" class="md:hidden bg-white/95 backdrop-blur-md overflow-hidden max-h-0 transition-all duration-300 ease-in-out">
      <div class="px-4 py-2 space-y-2">
        <a href="/" class="block py-2 font-medium hover:text-blue-600">Accueil</a>
        <a href="/appartements" class="block py-2 font-medium hover:text-blue-600">Appartements</a>
        <a href="/about" class="block py-2 font-medium hover:text-blue-600">À propos</a>
        <a href="/contact" class="block py-2 font-medium hover:text-blue-600">Contact</a>
      </div>
    </div>
  </header> ` , 
  
  'newsletter' : `    <!-- Newsletter / CTA -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="max-w-2xl mx-auto text-center px-4 reveal">
        <h2 class="text-3xl font-bold mb-4">Restez informé</h2>
        <p class="text-blue-100 mb-8">Recevez nos nouvelles offres et conseils directement par e‑mail.</p>
        <form class="flex flex-col sm:flex-row gap-4 justify-center" onsubmit="event.preventDefault(); alert('Merci !')">
          <input type="email" placeholder="Votre adresse email" required class="px-6 py-3 rounded-full text-gray-800 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-white">
          <button type="submit" class="px-8 py-3 bg-white text-blue-700 font-semibold rounded-full hover:bg-gray-100 transition transform hover:scale-105">
            S'inscrire
          </button>
        </form>
      </div>
    </section>` , 
  
  'footer' : `<footer class="bg-gray-900 text-gray-300 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 class="text-xl font-bold text-white mb-4">AYIKPE IMMOBILIER</h3>
        <p>Votre partenaire pour la location d’appartements meublés de qualité à Cotonou.</p>
      </div>
      <div>
        <h4 class="font-semibold text-white mb-3">Navigation</h4>
        <ul class="space-y-2">
          <li><a href="/" class="hover:text-white transition">Accueil</a></li>
          <li><a href="/appartements" class="hover:text-white transition">Appartements</a></li>
          <li><a href="/about" class="hover:text-white transition">À propos</a></li>
          <li><a href="/contact" class="hover:text-white transition">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-white mb-3">Contact</h4>
        <p><i class="fas fa-phone-alt mr-2"></i>+229 01 96 45 13 13</p>
        <p><i class="fas fa-envelope mr-2"></i> xxxx@gmail.com</p>
        <p><i class="fas fa-map-marker-alt mr-2"></i> P.O BOX Cotonou 2470</p>
      </div>
    </div>
    <div class="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
      © 2026 AYIKPE IMMOBILIER. Tous droits réservés.
    </div>
  </footer>`
  }
]