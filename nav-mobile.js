/* ============================================================
   ORACLE ARCANA — Bouton hamburger mobile partagé, à source unique.
   Inclus sur les mêmes pages produit autonomes que nav-etudes.js et
   nav-tirages.js (synastrie.html, theme-astral.html, ciel-du-mois.html,
   astrologie.html), via <script src="nav-mobile.js">.

   Rôle strictement minimal : injecter le bouton ☰ dans .nav-in et
   basculer la classe .open sur .menu au clic. Ne touche ni au contenu
   de .menu (géré par nav-etudes.js / nav-tirages.js), ni à leur logique
   — l'ordre de chargement des 3 scripts n'a donc aucune importance.

   Le panneau mobile réutilise .menu tel quel (déjà rempli par les deux
   autres scripts) : aucune donnée n'est dupliquée. Le dépliage à plat
   des sous-menus "Tirages gratuits"/"Nos études" sur mobile est géré
   entièrement en CSS (voir le bloc @media(max-width:760px) ajouté dans
   nav-etudes.css), à l'identique du mécanisme déjà en production sur
   le menu mobile de l'accueil (index.html).
   ============================================================ */

(function () {
  function injecter() {
    var navIn = document.querySelector('nav.top .nav-in');
    var menu = document.querySelector('nav.top .menu');
    if (!navIn || !menu) return;
    if (navIn.querySelector('.burger')) return;

    var burger = document.createElement('button');
    burger.className = 'burger';
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    burger.textContent = '☰';
    burger.addEventListener('click', function () {
      menu.classList.toggle('open');
    });

    navIn.insertBefore(burger, menu);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injecter);
  } else {
    injecter();
  }
})();
