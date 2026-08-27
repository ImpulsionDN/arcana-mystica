/* ============================================================
   ORACLE ARCANA — Menu déroulant "Tirages gratuits" partagé, à source unique.
   Inclus sur les mêmes pages produit autonomes que nav-etudes.js
   (synastrie.html, theme-astral.html, ciel-du-mois.html, astrologie.html),
   via <script src="nav-tirages.js"> — chargé APRÈS nav-etudes.js.

   Réutilise nav-etudes.css : les classes .nav-group/.nav-trigger/.nav-drop
   y sont génériques (pas spécifiques à "Nos études"), donc aucun style
   supplémentaire n'est nécessaire ici.

   Contrairement à "Nos études" (qui n'existait pas et devait être créé),
   "Tirages gratuits" existe déjà comme simple lien vers l'accueil : ce
   script le remplace EN PLACE par un déclencheur de menu déroulant,
   sans toucher à nav-etudes.js ni à l'ordre des éléments du menu.
   L'ordre d'exécution (ce script après nav-etudes.js) garantit que
   "Nos études" est déjà inséré juste après avant que ce remplacement
   n'ait lieu — les deux menus restent donc côte à côte, indépendants.

   Liste reprise à l'identique du menu "Tirages gratuits" de l'accueil
   (index.html, lignes ~369-380). Les entrées qui vivent dans le SPA
   d'index.html sont référencées via index.html#ancre (comme pour
   nav-etudes.js) — depuis une page externe, on ne peut pas appeler
   go() directement, qui n'existe que dans le JS d'index.html.
   ============================================================ */

(function () {
  var TIRAGES = [
    { nom: "Tirage 3 lames", href: "index.html#accueil" },
    { nom: "Tirages d'oracles", href: "tirages-oracles.html" },
    { nom: "Oui / Non", href: "index.html#ouinon" },
    { nom: "Heures Miroirs", href: "heures-miroirs.html" },
    { nom: "Synchronicités", href: "index.html#synchronicites" },
    { nom: "Nombres Angéliques", href: "nombres-angeliques.html" },
    { nom: "Interprétation des rêves", href: "index.html#reves" },
    { nom: "Astrologie", href: "astrologie.html" },
    { nom: "Animal Totem", href: "index.html#totem" },
    { nom: "Horoscope quotidien", href: "index.html#horoscope" },
    { nom: "Numérologie", href: "index.html#numerologie" },
    { nom: "Compatibilité des prénoms", href: "index.html#compatibilite" },
    { nom: "Angéologie", href: "index.html#angeologie" }
  ];

  function construireMenuHTML() {
    var liens = TIRAGES.map(function (t) {
      return '<a href="' + t.href + '">' + t.nom + '</a>';
    }).join('');
    return (
      '<div class="nav-group">' +
        '<span class="nav-trigger">Tirages gratuits <span class="caret">▾</span></span>' +
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
    if (!tirages || tirages.parentNode !== menu) return;

    var wrapper = document.createElement('div');
    wrapper.innerHTML = construireMenuHTML();
    var groupe = wrapper.firstElementChild;

    tirages.parentNode.replaceChild(groupe, tirages);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injecter);
  } else {
    injecter();
  }
})();
