/* ============================================================
   ORACLE ARCANA — Menu déroulant "Nos études" partagé, à source unique.
   Inclus sur les pages produit autonomes (synastrie.html, theme-astral.html,
   ciel-du-mois.html, astrologie.html) via <script src="nav-etudes.js">,
   avec nav-etudes.css lié dans le <head>.

   Source unique : la liste PRODUITS ci-dessous. Un changement de prix ou
   d'ordre se fait UNIQUEMENT ici — toutes les pages qui chargent ce
   fichier sont automatiquement à jour, sans resynchronisation manuelle.
   Prix et ordre identiques à la vitrine payante de l'accueil (index.html).

   Menu 100% desktop pour l'instant (survol CSS pur, comme sur l'accueil,
   aucun JS requis pour l'ouverture/fermeture) : le menu mobile de ces
   pages produit sera traité dans un chantier séparé.

   Liens : les produits qui vivent dans le SPA d'index.html (Interprétation
   des rêves, Bilan numérologique, Le Tirage des Lunes) sont référencés via
   index.html#ancre (le routage par hash déjà en place sur index.html gère
   l'affichage de la bonne page au chargement) — depuis une page externe,
   on ne peut pas appeler go() directement, qui n'existe que dans le JS
   d'index.html.
   ============================================================ */

(function () {
  var PRODUITS = [
    { nom: "Interprétation des rêves", prix: "7,99 €", href: "index.html#reves" },
    { nom: "Bilan numérologique", prix: "9,99 €", href: "index.html#numerologie" },
    { nom: "Votre Année Personnelle", prix: "9,99 €", href: "annee-personnelle.html" },
    { nom: "Votre Ciel du Mois", prix: "12,99 €", href: "ciel-du-mois.html" },
    { nom: "Compatibilité amoureuse", prix: "13,99 €", href: "synastrie.html" },
    { nom: "Thème astral complet", prix: "14,99 €", href: "theme-astral.html" },
    { nom: "Le Tirage des Lunes", prix: "dès 14,99 €", href: "index.html#roue" },
    { nom: "Votre Human Design", prix: "19,99 €", href: "human-design.html" }
  ];

  function construireMenuHTML() {
    var liens = PRODUITS.map(function (p) {
      return '<a href="' + p.href + '">' + p.nom + '<span class="nav-price">' + p.prix + '</span></a>';
    }).join('');
    return (
      '<div class="nav-group">' +
        '<span class="nav-trigger">Nos études <span class="caret">▾</span></span>' +
        '<div class="nav-drop">' + liens + '</div>' +
      '</div>'
    );
  }

  function injecter() {
    var menu = document.querySelector('nav.top .menu');
    if (!menu) return;

    var liens = menu.querySelectorAll('a');
    var tirages = null;
    for (var i = 0; i < liens.length; i++) {
      if (liens[i].textContent.trim() === 'Tirages gratuits') {
        tirages = liens[i];
        break;
      }
    }

    var wrapper = document.createElement('div');
    wrapper.innerHTML = construireMenuHTML();
    var groupe = wrapper.firstElementChild;

    var sepApres = document.createElement('span');
    sepApres.className = 'sep';
    sepApres.textContent = '·';

    if (tirages && tirages.parentNode === menu) {
      // Insère "Nos études" juste après "Tirages gratuits" (et son séparateur
      // existant, laissé en place), suivi d'un nouveau séparateur avant le
      // lien suivant (Astrologie).
      var sepExistant = tirages.nextElementSibling;
      var reference = (sepExistant && sepExistant.classList.contains('sep'))
        ? sepExistant.nextElementSibling
        : tirages.nextElementSibling;
      menu.insertBefore(groupe, reference);
      menu.insertBefore(sepApres, reference);
    } else {
      // Repli : si "Tirages gratuits" n'est pas trouvé, on ajoute simplement en tête.
      var sepAvant = document.createElement('span');
      sepAvant.className = 'sep';
      sepAvant.textContent = '·';
      menu.insertBefore(sepAvant, menu.firstChild);
      menu.insertBefore(groupe, menu.firstChild);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injecter);
  } else {
    injecter();
  }
})();
