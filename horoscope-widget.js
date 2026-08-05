/* ============================================================
   ORACLE ARCANA — Formulaire d'inscription à l'horoscope quotidien,
   bloc réutilisable à source unique.

   Auparavant codé en dur uniquement dans index.html (section
   #page-horoscope : champ email, date de naissance jour/mois/année,
   bouton, appel au Worker Cloudflare, texte rassurant sur les
   données). Ce fichier centralise le HTML, la logique d'envoi et le
   remplissage des menus déroulants de date, pour permettre d'insérer
   ce même formulaire ailleurs sur le site sans dupliquer le code.
   Le style associé est dans horoscope-widget.css.

   Utilisation, sur n'importe quelle page :
     <div id="mon-conteneur"></div>
     <script src="horoscope-widget.js"></script>
     <script>insererFormulaireHoroscope('mon-conteneur');</script>

   insererFormulaireHoroscope() peut être appelée plusieurs fois sur
   une même page (avec des conteneurs différents) grâce à l'option
   idPrefix, qui évite toute collision d'id si le formulaire devait un
   jour apparaître deux fois sur la même page.
   ============================================================ */

var HOROSCOPE_WORKER_URL = "https://arcana-horoscope-inscription.dni-business44.workers.dev";

function insererFormulaireHoroscope(conteneurId, opts){
  opts = opts || {};
  var idPrefix = opts.idPrefix || 'hw';
  var host = document.getElementById(conteneurId);
  if(!host) return;

  var idEmail = idPrefix+'_email', idNaiss = idPrefix+'_naiss', idBtn = idPrefix+'_btn', idMsg = idPrefix+'_msg';

  host.innerHTML =
    '<div class="hw-panel">' +
      '<div class="hw-field"><label>Email</label><input type="email" id="'+idEmail+'" class="hw-input" placeholder="vous@exemple.fr"></div>' +
      '<div class="hw-field"><label>Date de naissance</label><div class="hw-dgroup" id="'+idNaiss+'">' +
        '<select class="hw-dsel" data-part="j" aria-label="Jour"><option value="">Jour</option></select>' +
        '<select class="hw-dsel" data-part="m" aria-label="Mois"><option value="">Mois</option></select>' +
        '<select class="hw-dsel" data-part="y" aria-label="Année"><option value="">Année</option></select>' +
      '</div></div>' +
      '<div style="text-align:center"><button class="hw-btn" id="'+idBtn+'">Recevoir mon horoscope gratuit</button></div>' +
      '<div id="'+idMsg+'" class="hw-msg" style="display:none"></div>' +
    '</div>' +
    '<p class="hw-note">Vos données ne servent qu\'à vous envoyer votre horoscope quotidien. Désinscription possible à tout moment depuis chaque email reçu.</p>';

  remplirDatesHoroscope(document.getElementById(idNaiss));

  document.getElementById(idBtn).addEventListener('click', function(){
    inscrireHoroscopeWidget(idEmail, idNaiss, idBtn, idMsg);
  });
}

function remplirDatesHoroscope(groupe){
  if(!groupe) return;
  var MOIS=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  var nowY=new Date().getFullYear();
  var sj=groupe.querySelector('[data-part="j"]'), sm=groupe.querySelector('[data-part="m"]'), sy=groupe.querySelector('[data-part="y"]');
  var o;
  for(var d=1;d<=31;d++){o=document.createElement('option');o.value=d;o.textContent=(d<10?'0'+d:''+d);sj.appendChild(o);}
  for(var i=0;i<12;i++){o=document.createElement('option');o.value=i+1;o.textContent=MOIS[i];sm.appendChild(o);}
  for(var y=nowY;y>=1915;y--){o=document.createElement('option');o.value=y;o.textContent=y;sy.appendChild(o);}
}

function getDateValueHoroscope(id){
  var g=document.getElementById(id); if(!g) return "";
  var j=g.querySelector('[data-part="j"]').value;
  var m=g.querySelector('[data-part="m"]').value;
  var y=g.querySelector('[data-part="y"]').value;
  if(!j||!m||!y) return "";
  function p2(n){n=''+n;return n.length<2?'0'+n:n;}
  return y+"-"+p2(m)+"-"+p2(j);
}

function inscrireHoroscopeWidget(idEmail, idNaiss, idBtn, idMsg){
  var msg=document.getElementById(idMsg);
  var btn=document.getElementById(idBtn);
  var email=(document.getElementById(idEmail).value||"").trim();
  if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    msg.style.display='block';msg.style.color='#a8587a';
    msg.textContent="Merci d'indiquer un email valide.";
    return;
  }
  var naissance=getDateValueHoroscope(idNaiss);
  if(!naissance){
    msg.style.display='block';msg.style.color='#a8587a';
    msg.textContent="Merci d'indiquer votre date de naissance.";
    return;
  }
  msg.style.display='block';msg.style.color='#6b5f4d';
  msg.textContent="Inscription en cours…";
  if(btn) btn.disabled=true;
  fetch(HOROSCOPE_WORKER_URL,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({email:email,naissance:naissance})
  }).then(function(r){
    return r.text().then(function(t){
      var j=null; try{ j=JSON.parse(t); }catch(e){}
      return {ok:r.ok, j:j};
    });
  }).then(function(res){
    if(res.ok && res.j && res.j.ok){
      msg.style.color='#9a7838';
      msg.textContent="Merci ! Votre inscription est confirmée — vous recevrez votre horoscope "+(res.j.signe?('('+res.j.signe+') '):'')+"chaque matin. Pensez à vérifier vos spams et à ajouter horoscope@oracle-arcana.fr à vos contacts pour ne rien manquer.";
    } else {
      msg.style.color='#a8587a';
      msg.textContent=(res.j&&res.j.error)?res.j.error:"Une erreur empêche votre inscription pour le moment. Réessayez dans quelques instants.";
    }
  }).catch(function(){
    msg.style.color='#a8587a';
    msg.textContent="Une erreur de connexion empêche votre inscription. Réessayez dans quelques instants.";
  }).then(function(){
    if(btn) btn.disabled=false;
  });
}
