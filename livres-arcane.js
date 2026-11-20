/* Encart « Les livres d'Élise Arcane » (Amazon Kindle).
   Usage : <div id="livres-arcane"></div><script src="livres-arcane.js"></script>
   Pour ajouter un livre : compléter LIVRES_ARCANE ci-dessous, toutes les pages suivent. */
var LIVRES_ARCANE = [
  { asin: 'B0GPP5JPXS', img: '71WTw0PqfnL', titre: 'Parlez à l’univers et obtenez tout ce que vous désirez', prix: '3,99 €' },
  { asin: 'B0GPWDSH34', img: '71oiF8pTxHL', titre: 'Le code secret de l’abondance', prix: '3,99 €' },
  { asin: 'B0GPCYCLTL', img: '71FDJ56O20L', titre: '60 techniques pour transformer vos pensées et intentions', prix: '4,99 €' }
];
(function () {
  var css = '.la-bloc{max-width:900px;margin:3rem auto 2.5rem;padding:2rem 1.2rem 1.6rem;border-top:1px solid var(--line,rgba(168,101,42,.28));text-align:center}' +
    '.la-eyebrow{font-family:Jost,Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:4px;text-transform:uppercase;color:var(--gold,#A8652A);margin-bottom:.5rem}' +
    '.la-titre{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-weight:500;font-size:1.45rem;color:var(--gold-deep,#874E1C);margin-bottom:1.4rem}' +
    '.la-grille{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}' +
    '.la-livre{display:flex;flex-direction:column;align-items:center;gap:.6rem;padding:16px 12px 18px;background:var(--card,#FBF3E6);border:1px solid var(--line,rgba(168,101,42,.28));border-radius:14px;text-decoration:none;transition:transform .25s,box-shadow .25s}' +
    '.la-livre:hover{transform:translateY(-3px);box-shadow:0 10px 26px rgba(58,40,25,.14)}' +
    '.la-livre img{width:110px;height:auto;border-radius:4px;box-shadow:0 6px 16px rgba(58,40,25,.25)}' +
    '.la-livre .la-t{font-family:"Cormorant Garamond",Georgia,serif;font-size:1.02rem;line-height:1.3;color:var(--ink,#3A2819)}' +
    '.la-livre .la-p{font-family:Jost,Helvetica,Arial,sans-serif;font-size:12.5px;letter-spacing:1px;color:var(--gold-deep,#874E1C)}' +
    '.la-plus{display:inline-block;margin-top:1.2rem;font-family:Jost,Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:1px;color:var(--gold-deep,#874E1C);text-decoration:none;border-bottom:1px solid var(--line,rgba(168,101,42,.28))}' +
    '@media(max-width:760px){.la-grille{grid-template-columns:1fr}.la-livre{flex-direction:row;text-align:left}.la-livre img{width:70px}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var el = document.getElementById('livres-arcane'); if (!el) return;
  var html = '<div class="la-bloc"><div class="la-eyebrow">Pour aller plus loin</div>' +
    '<div class="la-titre">Les livres d’Élise Arcane</div><div class="la-grille">';
  LIVRES_ARCANE.forEach(function (l) {
    html += '<a class="la-livre" href="https://www.amazon.fr/dp/' + l.asin + '" target="_blank" rel="noopener">' +
      '<img src="https://m.media-amazon.com/images/I/' + l.img + '._SL300_.jpg" alt="Couverture : ' + l.titre.replace(/"/g, '') + '" loading="lazy">' +
      '<span><span class="la-t">' + l.titre + '</span><br><span class="la-p">Kindle · ' + l.prix + ' · sur Amazon</span></span></a>';
  });
  html += '</div>' + (location.pathname.indexOf('livres') < 0 ? '<a class="la-plus" href="livres.html">Tous les livres →</a>' : '') + '</div>';
  el.innerHTML = html;
})();
