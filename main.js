
function openModal(name,desc,price){
  document.getElementById("modalTitle").textContent=name;
  document.getElementById("modalSub").textContent=desc;
  document.getElementById("sumSvc").textContent=name;
  document.getElementById("sumPrice").textContent=price+" €";
  document.getElementById("sumTotal").textContent=price+" €";
  document.getElementById("btnAmt").textContent=price+" €";
  document.getElementById("payForm").style.display="block";
  document.getElementById("paySuccess").classList.remove("show");
  ["payName","payEmail","payCard","payExp","payCvv"].forEach(function(id){
    var el=document.getElementById(id);if(el)el.value="";
  });
  document.getElementById("modalOverlay").classList.add("open");
}
function closeModal(){document.getElementById("modalOverlay").classList.remove("open");}
function selPay(m){
  ["cb","pp","ap"].forEach(function(p){document.getElementById("pm-"+p).classList.toggle("active",p===m);});
  var cf=document.getElementById("cbFields");if(cf)cf.style.display=m==="cb"?"block":"none";
}
function fmtCard(el){var v=el.value.replace(/\D/g,"").substring(0,16);el.value=v.replace(/(\d{4})(?=\d)/g,"$1 ");}
function fmtExp(el){var v=el.value.replace(/\D/g,"").substring(0,4);if(v.length>2)v=v.substring(0,2)+"/"+v.substring(2);el.value=v;}
function doPay(){
  var n=document.getElementById("payName").value.trim();
  var e=document.getElementById("payEmail").value.trim();
  if(!n||!e){alert("Veuillez remplir votre nom et votre e-mail.");return;}
  if(!e.includes("@")){alert("E-mail invalide.");return;}
  var btn=document.querySelector(".btn-pay");
  btn.textContent="⏳ Traitement…";btn.disabled=true;
  setTimeout(function(){
    document.getElementById("payForm").style.display="none";
    document.getElementById("paySuccess").classList.add("show");
    document.getElementById("sucName").textContent=n.split(" ")[0];
    document.getElementById("sucEmail").textContent=e;
    btn.textContent="Confirmer";btn.disabled=false;
  },2000);
}
var btt=document.getElementById('backToTop');
if(btt)window.addEventListener('scroll',function(){btt.style.display=window.scrollY>300?'flex':'none';});

// ============================================================
// DONNEES ORACLE ARCANA — 52 LAMES EXCLUSIVES
// ============================================================
var userName="",userNom="",userDdn="";

var BELLINE=[
  {num:"B",name:"La Carte Bleue",planete:"",famille:"Speciale",symbole:"\u2605",
   signif:"Neutralise les influences negatives. Periode d'accalmie, tranquillite, eclaircissement, bien-etre. Apres la pluie vient le beau temps.",
   passe:"une periode d'apaisement vous a permis de reprendre votre souffle et de voir les choses avec plus de clarte",
   present:"les influences negatives sont neutralisees, une periode de tranquillite et de bien-etre s'installe",
   futur:"apres les difficultes, une belle periode d'accalmie et de serenite vous attend"},
  {num:1,name:"La Destinee",planete:"",famille:"Speciale",symbole:"\u2620",
   signif:"Tournant decisif, cle qui ouvre les portes. Annonce un evenement capital. Nouvelles opportunites, amelioration en amour et finances. Le consultant a les cles pour faire face.",
   passe:"un tournant decisif s'est produit, une porte importante s'est ouverte ou fermee pour vous",
   present:"vous disposez des cles pour ouvrir de nouvelles portes, c'est le moment d'agir",
   futur:"un evenement capital va survenir dans votre vie, ouvrant de nouvelles perspectives"},
  {num:2,name:"L'Etoile de l'Homme",planete:"",famille:"Speciale",symbole:"\u2642",
   signif:"Personnage masculin important : mari, frere, ami, collegue. Symbole de l'action, la mise en oeuvre, la maitrise.",
   passe:"un homme important a joue un role determinant et positif dans les evenements passes",
   present:"un homme joue un role central dans votre situation actuelle, son influence est decisive",
   futur:"un homme influent et bienveillant entrera ou reprendra une place importante dans votre existence"},
  {num:3,name:"L'Etoile de la Femme",planete:"",famille:"Speciale",symbole:"\u2640",
   signif:"Personnage feminin important : epouse, soeur, amie, collegue. Symbolise la feminite, la creativite, la fecondite, l'intuition.",
   passe:"une femme importante a exerce une grande influence positive sur votre parcours de vie",
   present:"une femme joue un role determinant dans votre situation actuelle",
   futur:"une femme influente jouera un role cle et benefique dans votre avenir proche"},
  {num:4,name:"La Nativite",planete:"Soleil",famille:"Soleil",symbole:"\u2609",
   signif:"Nouveau depart, debut, commencement, initiative. Nouvelle etape, nouvel elan. Reussite pour les etudes.",
   passe:"un nouveau depart important a ouvert une belle periode dans votre vie passee",
   present:"quelque chose de nouveau prend vie autour de vous, une nouvelle etape commence",
   futur:"un nouveau depart prometteur s'annonce, de nouveaux possibles s'ouvrent devant vous"},
  {num:5,name:"La Reussite",planete:"Soleil",famille:"Soleil",symbole:"\u2609",
   signif:"Aboutissement, succes, victoire, recompense. Fin des problemes et des blocages. Efforts recompenses.",
   passe:"vos efforts passes ont abouti a une belle reussite dont vous portez encore les fruits",
   present:"vos efforts aboutissent enfin, la reussite et l'accomplissement sont au rendez-vous",
   futur:"une belle reussite et un aboutissement heureux de vos projets vous attendent avec certitude"},
  {num:6,name:"L'Elevation",planete:"Soleil",famille:"Soleil",symbole:"\u2609",
   signif:"Avancement, progression, promotion, amelioration. Le consultant est sur le bon chemin.",
   passe:"une elevation ou une amelioration importante a marque positivement votre parcours passe",
   present:"vous etes sur le bon chemin, votre situation s'ameliore dans la bonne direction",
   futur:"une progression significative s'annonce dans votre futur proche"},
  {num:7,name:"Les Honneurs",planete:"Soleil",famille:"Soleil",symbole:"\u2609",
   signif:"Distinction, reconnaissance, notoriete, promotion. Travail recompense.",
   passe:"une reconnaissance ou une distinction meritee vous a ete accordee dans votre vie passee",
   present:"votre travail et vos merites sont reconnus, des honneurs vous sont dus",
   futur:"une distinction importante ou une reconnaissance officielle vous sont annoncees"},
  {num:8,name:"L'Amitie",planete:"Lune",famille:"Lune",symbole:"\u263d",
   signif:"Tendresse, sympathie, amitie, affection. Aide et soutien des proches.",
   passe:"une amitie sincere et des liens affectifs forts ont soutenu votre vie passee",
   present:"vous etes entoure d'amitie sincere et de bienveillance",
   futur:"des rencontres enrichissantes et une amitie precieuse sont annoncees"},
  {num:9,name:"La Sante",planete:"Lune",famille:"Lune",symbole:"\u263d",
   signif:"Repos, detente, distance physique benefique. Prendre soin de soi, se ressourcer.",
   passe:"une periode de repos et de ressourcement vous a permis de retrouver votre equilibre",
   present:"votre sante et votre bien-etre demandent une attention particuliere",
   futur:"une periode de repos bienfaisante et de retour a la vitalite vous attend"},
  {num:10,name:"Les Presents",planete:"Lune",famille:"Lune",symbole:"\u263d",
   signif:"Cadeaux, recompenses, surprises agreables, dons. Ce que nous donnons nous revient.",
   passe:"des cadeaux, des recompenses ou des surprises heureuses ont illumine votre vie passee",
   present:"des presents et des surprises agreables arrivent dans votre vie",
   futur:"des cadeaux inattendus et de belles recompenses vous seront offerts prochainement"},
  {num:11,name:"La Trahison",planete:"Lune",famille:"Lune",symbole:"\u263d",
   signif:"Tromperie, infidelite, jalousie, trahison. Incite a la vigilance et a la mefiance.",
   passe:"une trahison ou une tromperie douloureuse vous a blesse profondement dans le passe",
   present:"soyez tres vigilant, des personnes malveillantes ou une tromperie rodent autour de vous",
   futur:"une trahison ou une duperie potentielle est a anticiper, restez prudent"},
  {num:12,name:"Le Depart",planete:"Lune",famille:"Lune",symbole:"\u263d",
   signif:"Voyage, deplacement, envie de liberte. Deplacements proches ou lointains.",
   passe:"un depart, un voyage ou un changement important a ouvert de nouveaux horizons",
   present:"des deplacements, un voyage ou un nouveau depart sont en cours ou imminents",
   futur:"un depart significatif va apporter du mouvement et du renouveau dans votre vie"},
  {num:13,name:"L'Inconstance",planete:"Lune",famille:"Lune",symbole:"\u263d",
   signif:"Doutes, hesitations, instabilite. Ne pas prendre de decisions irreflechies.",
   passe:"une periode d'hesitation et d'instabilite vous a prive de reperes clairs",
   present:"le doute et l'inconstance freinent votre avancee, prenez du recul avant de decider",
   futur:"une periode d'instabilite et d'hesitation est possible, evitez les decisions irreflechies"},
  {num:14,name:"La Decouverte",planete:"Lune",famille:"Lune",symbole:"\u263d",
   signif:"Eclairage, revelation, decouverte d'un secret. Favorable aux nouvelles rencontres.",
   passe:"une decouverte ou une revelation importante a change votre vision des choses",
   present:"des secrets se devoilent, une decouverte importante va eclairer votre situation",
   futur:"une revelation decisive ou une decouverte majeure va eclairer votre chemin"},
  {num:15,name:"L'Eau",planete:"Lune",famille:"Lune",symbole:"\u263d",
   signif:"Sensibilite, intuition, voyages par eau. Purification. Periode de chance.",
   passe:"une periode de sensibilite intense ou de voyages a marque votre passe",
   present:"vos emotions et votre intuition sont intenses, ecoutez votre coeur",
   futur:"un voyage, une arrivee ou une periode portee par l'intuition vous attend"},
  {num:16,name:"Les Penates",planete:"Lune",famille:"Lune",symbole:"\u263d",
   signif:"Foyer, famille, stabilite, bien-etre domestique. Patrimoine immobilier.",
   passe:"le foyer et la vie familiale ont joue un role fondateur et stable dans votre vie passee",
   present:"le foyer, la famille et la stabilite domestique sont au premier plan",
   futur:"la securite du foyer et la paix domestique vous sont annoncees"},
  {num:17,name:"La Maladie",planete:"Lune",famille:"Lune",symbole:"\u263d",
   signif:"Maladie physique ou morale, angoisse, stress, malaise. Force a l'arret.",
   passe:"une maladie ou un malaise vous a force a l'arret dans votre vie passee",
   present:"la sante demande une vigilance particuliere, prenez soin de vous",
   futur:"une periode de fragilite sante est possible, soyez vigilant"},
  {num:18,name:"Le Changement",planete:"Mercure",famille:"Mercure",symbole:"\u263f",
   signif:"Transformation, fin d'un cycle et debut d'un autre. Changements rapides.",
   passe:"un changement profond a transforme et enrichi votre vie passee",
   present:"un changement significant est en cours, adaptez-vous car la roue tourne",
   futur:"un grand changement positif et une transformation profonde s'annoncent"},
  {num:19,name:"L'Argent",planete:"Mercure",famille:"Mercure",symbole:"\u263f",
   signif:"Richesse, abondance, reussite financiere. Investissement lucratif.",
   passe:"une periode de prosperite financiere a bien marque votre vie passee",
   present:"l'abondance financiere et les gains sont au rendez-vous",
   futur:"la prosperite financiere s'annonce dans votre avenir proche"},
  {num:20,name:"L'Intelligence",planete:"Mercure",famille:"Mercure",symbole:"\u263f",
   signif:"Connaissance, intelligence, facilite d'adaptation. On trouve les solutions.",
   passe:"votre intelligence vous a aide a resoudre des problemes passes avec succes",
   present:"vos capacites intellectuelles sont au plus haut, utilisez votre intelligence",
   futur:"votre intelligence sera votre meilleur atout pour reussir ce qui vient"},
  {num:21,name:"Le Vol et la Perte",planete:"Mercure",famille:"Mercure",symbole:"\u263f",
   signif:"Perte, vol, abus de confiance, escroquerie. Prudence avant de signer.",
   passe:"une perte, un vol ou un abus de confiance vous a cause du tort",
   present:"une perte ou un abus de confiance menace, soyez tres prudent",
   futur:"attention aux pertes potentielles et aux personnes qui pourraient vous tromper"},
  {num:22,name:"Les Entreprises",planete:"Mercure",famille:"Mercure",symbole:"\u263f",
   signif:"Travail, construction, projets, activites. Dispose des moyens pour avancer.",
   passe:"des projets ambitieux et un travail constant ont construit vos fondations actuelles",
   present:"vous avez les moyens pour avancer dans vos projets, construisez etape par etape",
   futur:"des projets importants et des activites enrichissantes vont occuper positivement votre avenir"},
  {num:23,name:"Le Trafic",planete:"Mercure",famille:"Mercure",symbole:"\u263f",
   signif:"Commerce, transactions, negociations. Favorable aux projets. Beaucoup de deplacements.",
   passe:"de nombreux echanges et activites ont rythme et anime votre vie passee",
   present:"de nombreux echanges, transactions et negociations sont en cours",
   futur:"une periode d'intense activite et d'opportunites commerciales s'annonce"},
  {num:24,name:"Les Nouvelles",planete:"Mercure",famille:"Mercure",symbole:"\u263f",
   signif:"Message important, bonnes ou mauvaises nouvelles. Ces nouvelles arrivent en 3 jours.",
   passe:"une nouvelle importante a change le cours de votre vie dans le passe",
   present:"une nouvelle importante vous parvient ou va vous parvenir tres prochainement",
   futur:"un message decisif ou une nouvelle importante va changer votre situation"},
  {num:25,name:"Les Plaisirs",planete:"Venus",famille:"Venus",symbole:"\u2640",
   signif:"Joie de vivre, plaisirs, fetes, sorties. Favorable aux activites artistiques.",
   passe:"une belle periode de plaisirs et de joie sincere a illumine votre vie passee",
   present:"les plaisirs, la joie de vivre et les moments agreables sont au rendez-vous",
   futur:"une periode douce et pleine de plaisirs et de joie vous attend"},
  {num:26,name:"La Paix",planete:"Venus",famille:"Venus",symbole:"\u2640",
   signif:"Calme, apaisement, reconciliation. Paix avec soi-meme.",
   passe:"une reconciliation ou une periode de paix a suivi des tensions passees",
   present:"la paix et l'harmonie s'installent dans votre situation actuelle",
   futur:"une reconciliation et une periode de paix durable vous sont annoncees"},
  {num:27,name:"L'Union",planete:"Venus",famille:"Venus",symbole:"\u2640",
   signif:"Amour, union, mariage, fiancailles, association. Favorable aux engagements.",
   passe:"une union importante ou une association forte a profondement marque votre vie passee",
   present:"une union, un engagement ou une association heureuse est en cours",
   futur:"un mariage, un engagement ou une belle association durable vous est annonce"},
  {num:28,name:"La Famille",planete:"Venus",famille:"Venus",symbole:"\u2640",
   signif:"Liens familiaux, protection, fecondite. Famille comme moteur.",
   passe:"la famille et les liens familiaux forts ont ete une source de force dans votre passe",
   present:"la famille est votre source d'energie et de force en ce moment",
   futur:"de beaux moments en famille et des liens renforces vous attendent"},
  {num:29,name:"L'Amour",planete:"Venus",famille:"Venus",symbole:"\u2640",
   signif:"Amour, complicite, passion, bien-etre. Favorable aux relations tendres.",
   passe:"un amour sincere et une complicite profonde ont illumine votre vie passee",
   present:"l'amour et la complicite sont au coeur de votre vie",
   futur:"un amour beau et sincere s'epanouira dans votre avenir"},
  {num:30,name:"La Table",planete:"Venus",famille:"Venus",symbole:"\u2640",
   signif:"Fetes, repas, convivialite. Repas d'affaires ou negociations.",
   passe:"des moments de convivialite et de partage ont marque joyeusement votre vie passee",
   present:"la convivialite et les moments de partage sont au coeur de votre vie",
   futur:"des celebrations joyeuses et des moments de belle convivialite vous attendent"},
  {num:31,name:"Les Passions",planete:"Venus",famille:"Venus",symbole:"\u2640",
   signif:"Passion, coup de foudre, aventure, instinct. Vie intense.",
   passe:"une passion intense ou un engagement total a marque profondement votre vie passee",
   present:"une energie passionnee et intense anime votre vie en ce moment",
   futur:"une passion intense ou un coup de foudre puissant est a venir"},
  {num:32,name:"La Mechancete",planete:"Mars",famille:"Mars",symbole:"\u2642",
   signif:"Jalousie, mechancete, intentions malveillantes. Danger a contourner.",
   passe:"des jalousies ou actes malveillants d'autrui ont complique votre vie passee",
   present:"des intentions malveillantes ou de la jalousie rodent, restez vigilant",
   futur:"des jalousies ou actes malveillants sont a anticiper, protegez-vous"},
  {num:33,name:"Le Proces",planete:"Mars",famille:"Mars",symbole:"\u2642",
   signif:"Conflit, litige, desaccord, opposition. Patience pour trouver un accord.",
   passe:"un conflit, un litige ou un desaccord important a marque votre vie passee",
   present:"un conflit ou une opposition est au coeur de votre situation, cherchez un compromis",
   futur:"un conflit ou un litige possible est a anticiper, les concessions seront necessaires"},
  {num:34,name:"Le Despotisme",planete:"Mars",famille:"Mars",symbole:"\u2642",
   signif:"Manque de liberte, dependance, soumission. Le consultant a baisse les bras.",
   passe:"une periode de contrainte ou de dependance vous a pese dans votre vie passee",
   present:"un sentiment d'emprisonnement ou de dependance freine votre liberte en ce moment",
   futur:"des contraintes ou une dependance difficile sont a surmonter avec patience"},
  {num:35,name:"Les Ennemis",planete:"Mars",famille:"Mars",symbole:"\u2642",
   signif:"Adversaires declares, calomnies, agression physique ou morale.",
   passe:"des ennemis ou adversaires malveillants ont nui a votre parcours dans le passe",
   present:"des adversaires ou ennemis declares agissent contre vous, restez vigilant",
   futur:"des ennemis ou opposants potentiels sont a identifier, protegez-vous"},
  {num:36,name:"Les Pourparlers",planete:"Mars",famille:"Mars",symbole:"\u2642",
   signif:"Discussions, negociations, entretiens. Necessite de s'exprimer.",
   passe:"des discussions importantes ou des negociations cles ont marque votre vie passee",
   present:"des discussions, negociations ou entretiens importants sont en cours",
   futur:"des discussions decisives vont ouvrir de nouvelles possibilites"},
  {num:37,name:"Le Feu",planete:"Mars",famille:"Mars",symbole:"\u2642",
   signif:"Conflits, tensions, energie deployee. Image du phenix : purification et renouveau.",
   passe:"des conflits, tensions ou une energie tres intense ont marque votre vie passee",
   present:"des conflits ou tensions intenses caracterisent votre situation, gardez votre sang-froid",
   futur:"une energie intense et combative sera necessaire mais peut purifier votre situation"},
  {num:38,name:"L'Accident",planete:"Mars",famille:"Mars",symbole:"\u2642",
   signif:"Coup du sort, choc, accident. Exige la plus grande prudence.",
   passe:"un choc, un accident ou un bouleversement inattendu a profondement ebranle votre vie passee",
   present:"soyez extremement prudent dans tout ce que vous faites, un imprevue est possible",
   futur:"attention a des evenements imprevisibles, la prudence est de rigueur"},
  {num:39,name:"Les Appuis",planete:"Jupiter",famille:"Jupiter",symbole:"\u2643",
   signif:"Aides, soutiens, protection de tiers. Personne puissante venant en aide.",
   passe:"un soutien puissant ou une aide precieuse d'un tiers vous a aide dans le passe",
   present:"des soutiens et des appuis bienveillants facilitent votre progression",
   futur:"un appui puissant ou une aide providentielle vous sera d'un grand secours"},
  {num:40,name:"La Beaute",planete:"Jupiter",famille:"Jupiter",symbole:"\u2643",
   signif:"Epanouissement, beaute, satisfaction, vitalite, fidelite.",
   passe:"une periode d'epanouissement et de beaute interieure a illumine votre vie passee",
   present:"vous vous epanouissez et rayonnez, la satisfaction caracterise votre situation",
   futur:"un epanouissement total et la realisation de vos desirs s'annoncent"},
  {num:41,name:"L'Heritage",planete:"Jupiter",famille:"Jupiter",symbole:"\u2643",
   signif:"Heritage materiel ou spirituel. Enrichissement, don, augmentation des ressources.",
   passe:"un heritage, des acquis precieux ou une transmission a marque votre vie passee",
   present:"vos experiences passees sont vos meilleurs atouts, un heritage ou don est possible",
   futur:"un heritage materiel ou symbolique ou une augmentation des ressources vous est annonce"},
  {num:42,name:"La Sagesse",planete:"Jupiter",famille:"Jupiter",symbole:"\u2643",
   signif:"Reflexion, analyse, perception juste, intuition. Observer et elaborer une strategie.",
   passe:"votre sagesse et votre capacite d'analyse vous ont aide a traverser des epreuves",
   present:"votre sagesse interieure et votre sens de l'analyse sont vos meilleurs guides",
   futur:"votre sagesse et votre discernement seront des atouts majeurs pour ce qui vient"},
  {num:43,name:"La Renommee",planete:"Jupiter",famille:"Jupiter",symbole:"\u2643",
   signif:"Reussite, gloire, succes, bonne reputation. Officialisation, legalisation.",
   passe:"une periode de renommee ou de reussite reconnue a marque votre passe",
   present:"votre reputation est en progression, officialisation possible",
   futur:"une belle renommee, un succes reconnu et une officialisation heureuse vous attendent"},
  {num:44,name:"Le Hasard",planete:"Jupiter",famille:"Jupiter",symbole:"\u2643",
   signif:"Coup de chance, changement rapide et imprevue. Rentrees financieres inattendues.",
   passe:"un coup de chance inattendu ou un heureux hasard vous a favorablement souri",
   present:"la chance est de votre cote, un evenement imprevue peut changer rapidement votre situation",
   futur:"un coup de chance extraordinaire va surgir dans votre vie"},
  {num:45,name:"Le Bonheur",planete:"Jupiter",famille:"Jupiter",symbole:"\u2643",
   signif:"Joie, bonheur, opportunites, epanouissement, bonne ambiance. La reussite servie sur un plateau.",
   passe:"une periode de pur bonheur et d'epanouissement remarquable a marque votre vie passee",
   present:"le bonheur et la joie sont presents dans votre vie, profitez pleinement",
   futur:"une heureuse nouvelle et une periode de bonheur profond vous attendent"},
  {num:46,name:"L'Infortune",planete:"Saturne",famille:"Saturne",symbole:"\u2644",
   signif:"Malchance, epreuves, faiblesse. La malchance poursuit. Besoin de communiquer.",
   passe:"une periode de malchance et d'epreuves vous a teste profondement dans le passe",
   present:"des difficultes et une periode d'epreuves marquent votre situation actuelle",
   futur:"une periode d'epreuves est possible mais elle passera avec patience et courage"},
  {num:47,name:"La Sterilite",planete:"Saturne",famille:"Saturne",symbole:"\u2644",
   signif:"Stagnation, attente, efforts inutiles, impasse. Invite a la meditation.",
   passe:"une periode de stagnation et d'impasse vous a force a attendre et questionner",
   present:"vos efforts semblent ne pas porter leurs fruits, une periode d'attente s'impose",
   futur:"une periode de stagnation est possible, utilisez ce temps pour vous ressourcer"},
  {num:48,name:"La Fatalite",planete:"Saturne",famille:"Saturne",symbole:"\u2644",
   signif:"Fin d'un cycle, transformation. Rupture, separation.",
   passe:"une fin de cycle ou une rupture importante a transforme votre vie passee",
   present:"une fin de cycle s'impose, quelque chose doit prendre fin pour que du nouveau emerge",
   futur:"une fin de cycle ou une separation est a venir, elle ouvrira la voie vers un nouveau depart"},
  {num:49,name:"La Grace",planete:"Saturne",famille:"Saturne",symbole:"\u2644",
   signif:"Protection divine, priere exaucee, periode sereine. Seule carte positive de Saturne.",
   passe:"une protection divine ou une periode de grace vous a sorti d'une impasse",
   present:"vous etes protege et guide, vos prieres sont entendues, une periode sereine s'installe",
   futur:"la grace divine et une protection bienveillante vous accompagneront"},
  {num:50,name:"La Ruine",planete:"Saturne",famille:"Saturne",symbole:"\u2644",
   signif:"Ruine, echec total, effondrement. Faire table rase pour repartir sur de nouvelles bases.",
   passe:"un effondrement ou une ruine vous a oblige a tout reconstruire sur de nouvelles bases",
   present:"un risque d'effondrement ou de perte importante plane, soyez tres prudent",
   futur:"un effondrement possible est a anticiper pour mieux preparer une reconstruction solide"},
  {num:51,name:"Le Retard",planete:"Saturne",famille:"Saturne",symbole:"\u2644",
   signif:"Blocage, retard, stagnation. Ne pas forcer le destin.",
   passe:"des retards et des blocages frustrants ont ralenti votre progression dans le passe",
   present:"un blocage ou un retard s'impose a vous, ne forcez pas, attendez que cela se debloque",
   futur:"des retards ou blocages sont a anticiper, armez-vous de patience"},
  {num:52,name:"Le Cloitre",planete:"Saturne",famille:"Saturne",symbole:"\u2644",
   signif:"Solitude, isolement, enfermement, repli sur soi.",
   passe:"une periode de solitude et d'isolement vous a invite a vous retrouver interieurement",
   present:"un besoin de repli sur soi est present, utilisez ce temps pour vous ressourcer",
   futur:"une periode d'isolement ou de repli est a venir, profitez-en pour vous recentrer"}
];

var COMBOS=[
  {cards:[5,43],text:"Reussite et Renommee : un accomplissement remarquable et une victoire eclatante."},
  {cards:[27,32],text:"Union et Desir : un engagement amoureux ou une union tres attendue va se concretiser."},
  {cards:[19,44],text:"Argent et Hasard : une prosperite financiere et une aubaine exceptionnelle se profilent."},
  {cards:[26,27],text:"Paix et Union : une reconciliation suivie d'une belle union durable et heureuse."},
  {cards:[11,34],text:"Trahison et Despotisme : votre entourage cache des personnes malveillantes, soyez tres vigilant."},
  {cards:[5,44],text:"Reussite et Hasard : tout concourt en votre faveur, le succes est inevitable et proche."},
  {cards:[39,42],text:"Appuis et Sagesse : vous etes protege et guide par des forces bienveillantes."},
  {cards:[29,45],text:"Amour et Bonheur : vos espoirs les plus chers se realiseront, continuez a croire."},
  {cards:[18,32],text:"Changement et Desir : un changement profond vous amenera exactement ce que vous desirez."},
  {cards:[50,48],text:"Ruine et Fatalite : attention, une periode tres difficile necessite une grande prudence."},
  {cards:[6,7],text:"Elevation et Honneurs : une promotion remarquable accompagnee d'une reconnaissance officielle."}
];

var drawnCards=[],drawn=false;

function getPlaneteIcon(planete){
  var icons={"\u0053oleil":"\u2609","Lune":"\u263d","Mercure":"\u263f","Venus":"\u2640","Mars":"\u2642","Jupiter":"\u2643","Saturne":"\u2644"};
  return icons[planete]||"\u2756";
}

function validerIdentite(){
  var prenom=document.getElementById("inputPrenom").value.trim();
  var nom=document.getElementById("inputNom").value.trim();
  var ddn=document.getElementById("inputDdn").value;
  if(!prenom){document.getElementById("inputPrenom").style.borderColor="var(--gold-border)";return;}
  userName=prenom;userNom=nom;userDdn=ddn;
  document.getElementById("step1").style.display="none";
  document.getElementById("step2").style.display="block";
  var ageStr="";
  if(ddn){
    var d=new Date(ddn),now=new Date();
    var a=now.getFullYear()-d.getFullYear();
    if(now.getMonth()<d.getMonth()||(now.getMonth()===d.getMonth()&&now.getDate()<d.getDate()))a--;
    ageStr=" ("+a+" ans)";
  }
  document.getElementById("welcomeMsg").textContent="Bienvenue "+prenom+ageStr+", l'Oracle Arcana vous accueille en ce moment solennel\u2026";
}

function drawCards(){
  if(drawn)return;
  drawn=true;
  var btn=document.getElementById("drawBtn");
  btn.disabled=true;btn.textContent="\u2756  Les lames se disposent\u2026  \u2756";
  var pool=BELLINE.slice();drawnCards=[];
  for(var i=0;i<3;i++){var idx=Math.floor(Math.random()*pool.length);drawnCards.push(pool.splice(idx,1)[0]);}
  var pos=["passe","present","futur"];
  for(var j=0;j<3;j++){(function(k){setTimeout(function(){revealCard(k,drawnCards[k],pos[k]);},k*800);})(j);}
  setTimeout(function(){startAI();},2600);
}

function revealCard(idx,card,pos){
  var el=document.getElementById("card"+(idx+1));
  el.classList.remove("face-down");el.classList.add("revealed");
  el.style.padding="0";el.style.overflow="hidden";
  var imgData=CARD_IMAGES[String(card.num)];
  if(imgData){
    el.innerHTML="<img src=\""+imgData+"\" alt=\""+card.name+"\" style=\"width:100%;height:100%;object-fit:cover;display:block\">";
  }else{
    var icon=getPlaneteIcon(card.planete);
    el.innerHTML="<div style='padding:.5rem;text-align:center'><div style='font-size:.6rem;font-family:Cinzel,serif;color:var(--txt3)'>N\u00b0 "+card.num+"</div><div style='font-size:1.5rem'>"+icon+"</div><div style='font-family:Cormorant Garamond,serif;font-size:.9rem;color:var(--purple)'>"+card.name+"</div></div>";
  }
  document.getElementById("meaning"+(idx+1)).textContent=card.name+(card.planete?" \u2014 Famille "+card.planete:"");
}

function getAge(){
  if(!userDdn)return null;
  var d=new Date(userDdn),now=new Date();
  var a=now.getFullYear()-d.getFullYear();
  if(now.getMonth()<d.getMonth()||(now.getMonth()===d.getMonth()&&now.getDate()<d.getDate()))a--;
  return a;
}

function startAI(){
  var area=document.getElementById("readingArea");
  area.classList.add("active");
  area.scrollIntoView({behavior:"smooth",block:"nearest"});
  var c=drawnCards;
  document.getElementById("readingTitle").textContent=c[0].name+" \u00b7 "+c[1].name+" \u00b7 "+c[2].name;
  document.getElementById("cardTrio").textContent="Pass\u00e9 \u2014 Pr\u00e9sent \u2014 Futur";
  var combos=COMBOS.filter(function(co){return co.cards.every(function(n){return c.map(function(x){return x.num;}).indexOf(n)!==-1;});});
  document.getElementById("aiLoading").style.display="block";
  document.getElementById("readingText").style.display="none";
  var c0=c[0],c1=c[1],c2=c[2];
  var age=getAge();
  var nom=userName;
  var contexteProf=age!==null&&age>=60?"votre situation financiere et votre serenite":"votre vie professionnelle et financiere";
  setTimeout(function(){
    document.getElementById("aiLoading").style.display="none";
    var txt=document.getElementById("readingText");txt.style.display="block";
    var p0="En ce qui concerne votre pass\u00e9, "+nom+", la lame N\u00b0\u00a0"+c0.num+" \u2014 <strong>"+c0.name+"</strong>"+(c0.planete?" (famille "+c0.planete+")":"")+
      " \u00e9claire votre situation avec une remarquable pr\u00e9cision. L'Oracle Arcana r\u00e9v\u00e8le que "+c0.passe+". "+
      "La symbolique profonde de cette lame nous enseigne\u00a0: "+c0.signif+" "+
      "Cette p\u00e9riode fondatrice a laiss\u00e9 des traces durables sur votre parcours de vie.";
    var ageCtx="";
    if(age!==null){if(age>=70)ageCtx="\u00c0 votre stade de vie, fort(e) d'une sagesse acquise, ";else if(age>=60)ageCtx="\u00c0 cette belle \u00e9tape de votre vie, ";else if(age<=25)ageCtx="\u00c0 votre \u00e2ge, o\u00f9 tout est encore possible, ";else if(age<=35)ageCtx="Dans cette p\u00e9riode de construction, ";}
    var p1=ageCtx+"dans votre pr\u00e9sent, la lame N\u00b0\u00a0"+c1.num+" \u2014 <strong>"+c1.name+"</strong>"+(c1.planete?" (famille "+c1.planete+")":"")+
      " s'impose \u00e0 vous avec une \u00e9nergie particuli\u00e8rement forte. "+
      "Elle r\u00e9v\u00e8le clairement que "+c1.present+". "+
      "L'Oracle pr\u00e9cise\u00a0: "+c1.signif+" "+
      "S\u00e9raphine vous invite \u00e0 tenir pleinement compte de cette \u00e9nergie dans vos d\u00e9cisions imm\u00e9diates.";
    var p2="Pour votre avenir, la lame N\u00b0\u00a0"+c2.num+" \u2014 <strong>"+c2.name+"</strong>"+(c2.planete?" (famille "+c2.planete+")":"")+
      " dessine la trajectoire qui se profile. L'Oracle r\u00e9v\u00e8le que "+c2.futur+". "+
      "Le message profond de cette lame\u00a0: "+c2.signif+" "+
      (age!==null&&age>=60?"S\u00e9raphine vous rappelle, "+nom+", que cette \u00e9tape de vie est une p\u00e9riode de r\u00e9colte et de s\u00e9r\u00e9nit\u00e9 m\u00e9rit\u00e9e.":
      "Rappelez-vous, "+nom+", que l'Oracle Arcana ne fixe pas un destin immuable, il \u00e9claire vos tendances profondes.");
    var r="<p>"+p0+"</p><p>"+p1+"</p><p>"+p2+"</p>";
    if(combos.length){
      r+="<div style='margin-top:1.2rem;padding:1rem;background:var(--gold-pale);border:1px solid var(--gold-border)'>";
      r+="<div style='font-family:Cinzel,serif;font-size:.52rem;letter-spacing:.2em;color:var(--gold);margin-bottom:.5rem'>\u2756 COMBINAISON SIGNIFICATIVE D\u00c9TECT\u00c9E</div>";
      combos.forEach(function(co){
        var n1=BELLINE.filter(function(b){return b.num===co.cards[0];})[0];
        var n2=BELLINE.filter(function(b){return b.num===co.cards[1];})[0];
        if(n1&&n2)r+="<p style='font-style:italic;color:var(--txt2)'>\u2756 <strong>"+n1.name+" + "+n2.name+"</strong>\u00a0: "+co.text+"</p>";
      });
      r+="</div>";
    }
    txt.innerHTML=r;
  },2000);
}

// ============================================================
// NUMEROLOGIE
// ============================================================
var LETTRES_NUM={'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'G':7,'H':8,'I':9,'J':1,'K':2,'L':3,'M':4,'N':5,'O':6,'P':7,'Q':8,'R':9,'S':1,'T':2,'U':3,'V':4,'W':5,'X':6,'Y':7,'Z':8};
var VOYELLES={'A':1,'E':5,'I':9,'O':6,'U':3,'Y':7};

function reduireChiffre(n){
  if(n===11||n===22||n===33)return n;
  while(n>9){var s=0;String(n).split('').forEach(function(d){s+=parseInt(d)||0;});n=s;}
  return n;
}
function sommeNom(nom,voySeul,consSeul){
  var total=0,upper=nom.toUpperCase().replace(/[^A-Z]/g,'');
  for(var i=0;i<upper.length;i++){var c=upper[i];if(voySeul&&VOYELLES[c])total+=VOYELLES[c];else if(consSeul&&!VOYELLES[c]&&LETTRES_NUM[c])total+=LETTRES_NUM[c];else if(!voySeul&&!consSeul&&LETTRES_NUM[c])total+=LETTRES_NUM[c];}
  return total;
}
function cheminDeVie(ddn){if(!ddn)return 0;var t=0;ddn.split('-').forEach(function(p){p.split('').forEach(function(d){t+=parseInt(d)||0;});});return reduireChiffre(t);}
function anneePersonnelle(ddn){
  if(!ddn)return 0;
  var p=ddn.split('-'),j=parseInt(p[2])||0,m=parseInt(p[1])||0,a=new Date().getFullYear(),t=0;
  (String(j)+String(m)+String(a)).split('').forEach(function(d){t+=parseInt(d)||0;});
  return reduireChiffre(t);
}
var INTERP_CHEMIN={
  1:{titre:"Le Pionnier",court:"Ind\u00e9pendance, leadership, initiative",long:"Votre chemin de vie est celui du 1, le Pionnier. Vous \u00eates n\u00e9(e) pour diriger, innover et tracer votre propre voie. Votre force int\u00e9rieure est remarquable et votre capacit\u00e9 \u00e0 prendre des initiatives vous distingue. Vous avez une \u00e9nergie cr\u00e9atrice puissante qui, canal\u00e9lis\u00e9e, peut mener \u00e0 de grandes r\u00e9alisations. Apprenez \u00e0 collaborer sans perdre votre individualit\u00e9."},
  2:{titre:"Le Diplomate",court:"Harmonie, intuition, partenariat",long:"Votre chemin de vie est celui du 2, le Diplomate. Vous avez un don exceptionnel pour la paix, la m\u00e9diation et les relations harmonieuses. Votre intuition est votre plus grand atout. Vous brillez dans les partenariats. Votre sensibilit\u00e9 profonde vous permet de percevoir ce que les autres ne voient pas."},
  3:{titre:"L'Artiste",court:"Cr\u00e9ativit\u00e9, expression, joie de vivre",long:"Votre chemin de vie est celui du 3, l'Artiste. Vous \u00eates dot\u00e9(e) d'une cr\u00e9ativit\u00e9 bouillonnante et d'un besoin vital de vous exprimer. La communication, les arts et la joie de vivre sont vos domaines d'\u00e9panouissement naturel. Votre enthousiasme est contagieux."},
  4:{titre:"Le B\u00e2tisseur",court:"Travail, m\u00e9thode, stabilit\u00e9",long:"Votre chemin de vie est celui du 4, le B\u00e2tisseur. Vous \u00eates fait(e) pour construire des fondations solides et durables. Rigoureux(se), m\u00e9thodique et fiable, vous apportez la stabilit\u00e9 partout o\u00f9 vous allez. La patience et la pers\u00e9v\u00e9rance sont vos plus grandes qualit\u00e9s."},
  5:{titre:"L'Aventurier",court:"Libert\u00e9, changement, polyvalence",long:"Votre chemin de vie est celui du 5, l'Aventurier. La libert\u00e9 est votre valeur fondamentale. Vous avez besoin de changement, de nouveaut\u00e9 et de stimulation intellectuelle pour vous \u00e9panouir. Adaptable et polyvalent(e), vous excellez dans tout ce qui exige de la flexibilit\u00e9."},
  6:{titre:"Le Protecteur",court:"Amour, responsabilit\u00e9, famille",long:"Votre chemin de vie est celui du 6, le Protecteur. L'amour, la famille et la responsabilit\u00e9 sont au c\u0153ur de votre existence. Vous \u00eates naturellement tourn\u00e9(e) vers les autres, toujours pr\u00eat(e) \u00e0 aider et \u00e0 soutenir. Apprenez aussi \u00e0 prendre soin de vous-m\u00eame."},
  7:{titre:"Le Sage",court:"Analyse, spiritualit\u00e9, introspection",long:"Votre chemin de vie est celui du 7, le Sage. Vous \u00eates un chercheur de v\u00e9rit\u00e9, toujours en qu\u00eate de compr\u00e9hension profonde. Votre intellect puissant et votre capacit\u00e9 d'analyse sont vos dons naturels. La solitude ne vous fait pas peur \u2014 elle est m\u00eame n\u00e9cessaire."},
  8:{titre:"Le Ma\u00eetre des Ressources",court:"Pouvoir, ambition, r\u00e9ussite mat\u00e9rielle",long:"Votre chemin de vie est celui du 8, le Ma\u00eetre des Ressources. Vous \u00eates n\u00e9(e) pour r\u00e9ussir dans le monde mat\u00e9riel. Votre ambition, votre sens des affaires et votre capacit\u00e9 \u00e0 g\u00e9rer les ressources sont exceptionnels. Apprenez \u00e0 \u00e9quilibrer puissance et bienveillance."},
  9:{titre:"L'Humaniste",court:"Compassion, universalit\u00e9, sagesse",long:"Votre chemin de vie est celui du 9, l'Humaniste. Vous portez en vous une sagesse ancienne et un amour universel remarquable. Votre compassion, votre g\u00e9n\u00e9rosit\u00e9 et votre sens du sacrifice vous poussent vers les grandes causes."},
  11:{titre:"Le Ma\u00eetre Intuitif",court:"Illumination, inspiration, vision",long:"Votre chemin de vie est le 11, Nombre Ma\u00eetre. Vous \u00eates port\u00e9ur(euse) d'une vibration spirituelle \u00e9lev\u00e9e. Votre intuition d\u00e9passe la raison ordinaire. Vous \u00eates ici pour illuminer, inspirer et \u00e9lever la conscience collective."},
  22:{titre:"Le Ma\u00eetre B\u00e2tisseur",court:"Ambition cosmique, r\u00e9alisation universelle",long:"Votre chemin de vie est le 22, Nombre Ma\u00eetre supr\u00eame. Vous avez la capacit\u00e9 de b\u00e2tir des \u0153uvres monumentales qui traversent le temps. Visionnaire et pragmatique \u00e0 la fois, votre potentiel est immense."},
  33:{titre:"Le Ma\u00eetre de l'Amour",court:"D\u00e9vouement, gu\u00e9rison, amour inconditionnel",long:"Votre chemin de vie est le 33, Nombre Ma\u00eetre de la compassion absolue. Vous \u00eates port\u00e9ur(euse) de l'amour inconditionnel et du d\u00e9vouement total au service des autres."}
};
var INTERP_ANNEE={
  1:"Ann\u00e9e 1 \u2014 Nouveau cycle. Nouveaux d\u00e9parts, initiatives et ind\u00e9pendance. C'est le moment de semer des graines.",
  2:"Ann\u00e9e 2 \u2014 G\u00e9station. Patience, associations et diplomatie. \u00c9coutez votre intuition.",
  3:"Ann\u00e9e 3 \u2014 Expression. Cr\u00e9ativit\u00e9, joie et socialisation. Exprimez-vous, cr\u00e9ez, partagez.",
  4:"Ann\u00e9e 4 \u2014 Construction. Travail, organisation et bases solides.",
  5:"Ann\u00e9e 5 \u2014 Changements. Lib\u00e9ration, voyages et transformation.",
  6:"Ann\u00e9e 6 \u2014 Responsabilit\u00e9s. Famille, amour et engagement.",
  7:"Ann\u00e9e 7 \u2014 Introspection. M\u00e9ditation, analyse et spiritualit\u00e9.",
  8:"Ann\u00e9e 8 \u2014 R\u00e9ussites. Pouvoir, ambition et r\u00e9compenses.",
  9:"Ann\u00e9e 9 \u2014 Ach\u00e8vement. Bilan, l\u00e2cher-prise et cl\u00f4ture d'un cycle."
};

function calculerNumerologie(){
  var prenom=document.getElementById("numePrenom").value.trim();
  var nom=document.getElementById("numeNom").value.trim();
  var ddn=document.getElementById("numeDdn").value;
  if(!prenom){document.getElementById("numePrenom").style.borderColor="var(--gold-border)";return;}
  if(!ddn){document.getElementById("numeDdn").style.borderColor="var(--gold-border)";return;}
  var nomComplet=prenom+" "+nom;
  var cdv=cheminDeVie(ddn);
  var expression=reduireChiffre(sommeNom(nomComplet,false,false));
  var intime=reduireChiffre(sommeNom(nomComplet,true,false));
  var realisation=reduireChiffre(sommeNom(nomComplet,false,true));
  var anneeP=anneePersonnelle(ddn);
  document.getElementById("numeForm").style.display="none";
  document.getElementById("numeResult").style.display="block";
  document.getElementById("numeTitre").textContent=prenom+(nom?" "+nom:"")+" \u2014 Analyse Num\u00e9rologique";
  var interp=INTERP_CHEMIN[cdv]||{titre:"",court:"",long:""};
  var chiffresData=[
    {label:"Chemin de Vie",num:cdv,desc:"Le chemin choisi pour cette incarnation",extra:interp.titre},
    {label:"Expression",num:expression,desc:"Comment vous vous exprimez au monde"},
    {label:"Nombre Intime",num:intime,desc:"Vos motivations et d\u00e9sirs les plus profonds"},
    {label:"R\u00e9alisation",num:realisation,desc:"L'id\u00e9al de vie vers lequel vous tendez"}
  ];
  var grid="";
  chiffresData.forEach(function(c){
    var isMaster=(c.num===11||c.num===22||c.num===33);
    grid+="<div class='nume-card'>"+
      "<div class='label'>"+c.label.toUpperCase()+"</div>"+
      "<div class='num'>"+c.num+"</div>"+
      (isMaster?"<div class='master-badge'>\u2756 NOMBRE MA\u00ceTRE</div>":"")+
      "<div class='desc'>"+c.desc+"</div>"+
      (c.extra?"<div style='font-family:Cinzel,serif;font-size:.48rem;color:var(--purple);margin-top:.3rem;letter-spacing:.08em'>"+c.extra+"</div>":"")+
      "</div>";
  });
  document.getElementById("numeChiffres").innerHTML=grid;
  var it=interp.long||"";
  it+=" Votre <strong>Expression "+expression+"</strong> r\u00e9v\u00e8le la mani\u00e8re dont vous interagissez avec le monde. Votre <strong>Nombre Intime "+intime+"</strong> repr\u00e9sente vos d\u00e9sirs les plus profonds. Votre <strong>Nombre de R\u00e9alisation "+realisation+"</strong> d\u00e9crit l'id\u00e9al vers lequel vous tendez consciemment.";
  document.getElementById("numeInterpText").innerHTML=it;
  var ia=INTERP_ANNEE[anneeP]||"";
  document.getElementById("numeAnnee").innerHTML=
    "<div style='font-family:Cinzel,serif;font-size:.5rem;letter-spacing:.22em;color:var(--gold);margin-bottom:.8rem'>\u2756 &nbsp; VOTRE ANN\u00c9E PERSONNELLE "+new Date().getFullYear()+" &nbsp; \u2756</div>"+
    "<div style='font-family:Cormorant Garamond,serif;font-size:3.2rem;font-weight:300;color:var(--purple);margin-bottom:.5rem'>"+anneeP+"</div>"+
    "<div style='font-size:.92rem;color:var(--txt2);font-style:italic;max-width:580px;margin:0 auto;line-height:1.8'>"+ia+"</div>";
  document.getElementById("numeResult").scrollIntoView({behavior:"smooth",block:"nearest"});
}

function calculerCompatibilite(){
  var p1=document.getElementById("compatP1").value.trim();
  var p2=document.getElementById("compatP2").value.trim();
  if(!p1||!p2){alert("Veuillez entrer deux pr\u00e9noms.");return;}
  var n1=reduireChiffre(sommeNom(p1,false,false));
  var n2=reduireChiffre(sommeNom(p2,false,false));
  var diff=Math.abs(n1-n2);
  var compatScore=diff===0?100:diff<=2?85:diff<=4?70:diff<=6?55:40;
  var msg=compatScore>=85?"Excellente compatibilit\u00e9 ! Vos vibrations num\u00e9rologiques sont parfaitement align\u00e9es.":
    compatScore>=70?"Bonne compatibilit\u00e9. Vos natures se compl\u00e8tent harmonieusement.":
    compatScore>=55?"Compatibilit\u00e9 moyenne. Des ajustements mutuels seront n\u00e9cessaires.":
    "Compatibilit\u00e9 d\u00e9licate. Des efforts importants seront n\u00e9cessaires des deux c\u00f4t\u00e9s.";
  document.getElementById("compatResult").style.display="block";
  document.getElementById("compatResultText").innerHTML=
    "<div style='font-family:Cormorant Garamond,serif;font-size:1.5rem;color:var(--purple);margin-bottom:.5rem'>"+p1+" ("+n1+") &amp; "+p2+" ("+n2+")</div>"+
    "<div style='font-size:2.5rem;font-family:Cormorant Garamond,serif;color:var(--gold);font-weight:300;margin:.5rem 0'>"+compatScore+"%</div>"+
    "<div style='font-size:.95rem;color:var(--txt2);font-style:italic'>"+msg+"</div>";
}

// ============================================================
// ANGEOLOGIE — 72 ANGES GARDIENS
// ============================================================
var ANGES=[
  {num:1,nom:"Vehuhiah",periode:"21 mars au 25 mars",message:"Ange de la nouvelle vie et des commencements. Il vous apporte courage, volont\u00e9 et capacit\u00e9 \u00e0 initier de nouveaux projets. Sous sa protection, vous \u00eates capable de tout transformer."},
  {num:2,nom:"Jeliel",periode:"26 mars au 30 mars",message:"Ange de l'amour et de la sagesse. Il b\u00e9nit les unions et favorise la paix dans les relations. Il vous aide \u00e0 trouver l'harmonie dans vos liens affectifs."},
  {num:3,nom:"Sitael",periode:"31 mars au 4 avril",message:"Ange de la construction et de la protection. Il vous aide \u00e0 b\u00e2tir des fondations solides et \u00e0 d\u00e9passer les obstacles avec persev\u00e9rance."},
  {num:4,nom:"Elemiah",periode:"5 avril au 9 avril",message:"Ange du voyage et des d\u00e9couvertes. Il guide les explorateurs de l'\u00e2me et du monde. Sous sa protection, chaque voyage devient une initiation."},
  {num:5,nom:"Mahasiah",periode:"10 avril au 14 avril",message:"Ange de la rectification. Il aide \u00e0 corriger les erreurs du pass\u00e9 et \u00e0 acc\u00e9der \u00e0 la sagesse divine. Il favorise la paix int\u00e9rieure."},
  {num:6,nom:"Lelahel",periode:"15 avril au 20 avril",message:"Ange de la lumi\u00e8re et de la gu\u00e9rison. Il apporte l'\u00e9clat, la c\u00e9l\u00e9brit\u00e9 et la sant\u00e9. Sous sa protection, votre lumi\u00e8re int\u00e9rieure rayonne."},
  {num:7,nom:"Achaiah",periode:"21 avril au 25 avril",message:"Ange de la patience et de la nature. Il r\u00e9v\u00e8le les myst\u00e8res divins et aide \u00e0 d\u00e9couvrir les lois naturelles. Il favorise l'apprentissage profond."},
  {num:8,nom:"Cahethel",periode:"26 avril au 30 avril",message:"Ange des b\u00e9n\u00e9dictions divines. Il apporte l'abondance, la fertilit\u00e9 et les r\u00e9coltes. Tout ce que vous semez sous sa protection porte ses fruits."},
  {num:9,nom:"Haziel",periode:"1 mai au 5 mai",message:"Ange de la mis\u00e9ricorde et du pardon. Il apporte la piti\u00e9 divine et aide \u00e0 r\u00e9aliser les d\u00e9sirs profonds. Sous sa protection, les r\u00e9conciliations sont possibles."},
  {num:10,nom:"Aladiah",periode:"6 mai au 10 mai",message:"Ange de la gr\u00e2ce divine. Il prot\u00e8ge contre les maladies et les \u00e9preuves. Sous son aile, vos fautes sont pardonnees et votre karma all\u00e9g\u00e9."},
  {num:11,nom:"Lauviah",periode:"11 mai au 15 mai",message:"Ange de la victoire et de la renomm\u00e9e. Il apporte la gloire, les honneurs et le succ\u00e8s. Il favorise la clairvoyance et les r\u00eaves pr\u00e9monitoires."},
  {num:12,nom:"Hahaiah",periode:"16 mai au 20 mai",message:"Ange du refuge et de la protection. Il \u00e9loigne l'adversit\u00e9 et interpr\u00e8te les songes. Sous sa protection, vous \u00eates \u00e0 l'abri des forces n\u00e9gatives."},
  {num:13,nom:"Iezalel",periode:"21 mai au 25 mai",message:"Ange de la fid\u00e9lit\u00e9 et de la r\u00e9conciliation. Il favorise les r\u00e9unions amoureuses et les partenariats durables. Il d\u00e9veloppe la m\u00e9moire et la dext\u00e9rit\u00e9."},
  {num:14,nom:"Mebahel",periode:"26 mai au 31 mai",message:"Ange de la v\u00e9rit\u00e9 et de la justice. Il prot\u00e8ge les innocents et r\u00e9tablit les droits bafou\u00e9s. Sous sa protection, la v\u00e9rit\u00e9 triomphe toujours."},
  {num:15,nom:"Hariel",periode:"1 juin au 5 juin",message:"Ange de la purification et des sciences. Il lib\u00e8re des mauvaises habitudes et favorise la s\u00e9r\u00e9nit\u00e9. Il d\u00e9veloppe la clart\u00e9 d'esprit."},
  {num:16,nom:"Hekamiah",periode:"6 juin au 10 juin",message:"Ange de l'univers et de la loyaut\u00e9. Il prot\u00e8ge contre les tratres et favorise la coh\u00e9rence. Sous sa protection, vous inspirez confiance."},
  {num:17,nom:"Lauviah II",periode:"11 juin au 15 juin",message:"Ange de la r\u00e9v\u00e9lation. Il apporte l'intuition c\u00e9leste et les messages divins. Sous sa protection, vos r\u00eaves sont porteurs de signes."},
  {num:18,nom:"Caliel",periode:"16 juin au 21 juin",message:"Ange de la justice rapide. Il acc\u00e9l\u00e8re les proc\u00e9dures judiciaires et r\u00e9tablit la v\u00e9rit\u00e9. Les innocents sont toujours prot\u00e9g\u00e9s."},
  {num:19,nom:"Leuviah",periode:"22 juin au 26 juin",message:"Ange de la m\u00e9moire et de l'intelligence. Il favorise l'acceptation des \u00e9preuves avec joie et d\u00e9veloppe la m\u00e9moire spirituelle."},
  {num:20,nom:"Pahaliah",periode:"27 juin au 1 juillet",message:"Ange de la r\u00e9demption. Il guide vers la lumi\u00e8re divine et favorise la vocation spirituelle. Sous sa protection, la conversion int\u00e9rieure est possible."},
  {num:21,nom:"Nelkhael",periode:"2 juillet au 6 juillet",message:"Ange de la po\u00e9sie et des arts. Il prot\u00e8ge contre les sortil\u00e8ges et favorise l'expression cr\u00e9atrice. Sous sa protection, les arts s'\u00e9panouissent."},
  {num:22,nom:"Yeiayel",periode:"7 juillet au 11 juillet",message:"Ange de la renomm\u00e9e et de la fortune. Il apporte la c\u00e9l\u00e9brit\u00e9, les voyages b\u00e9n\u00e9fiques et les bonnes affaires. Votre r\u00e9putation est prot\u00e9g\u00e9e."},
  {num:23,nom:"Melahel",periode:"12 juillet au 16 juillet",message:"Ange de la gu\u00e9rison et de la nature. Il prot\u00e8ge lors des voyages et favorise la sant\u00e9. Les plantes et la nature sont vos alli\u00e9es."},
  {num:24,nom:"Haheuiah",periode:"17 juillet au 22 juillet",message:"Ange de la protection et de l'exil. Il prot\u00e8ge contre l'adversit\u00e9 et les forces n\u00e9gatives. Sous son aile, vous \u00eates \u00e0 l'abri partout o\u00f9 vous allez."},
  {num:25,nom:"Nith-Haiah",periode:"23 juillet au 27 juillet",message:"Ange de la sagesse et de la magie blanche. Il accorde les dons de sagesse et d'\u00e9l\u00e9vation spirituelle. Les secrets divins vous sont r\u00e9v\u00e9l\u00e9s."},
  {num:26,nom:"Haaiah",periode:"28 juillet au 1 ao\u00fbt",message:"Ange de l'ordre politique et de la discr\u00e9tion. Il prot\u00e8ge dans les situations diplomatiques et favorise la justice. Votre discr\u00e9tion est votre force."},
  {num:27,nom:"Yerathel",periode:"2 ao\u00fbt au 6 ao\u00fbt",message:"Ange de la propagation de la lumi\u00e8re. Il favorise la civilisation, la libert\u00e9 et la justice. Sous sa protection, vous rayonnez de lumi\u00e8re."},
  {num:28,nom:"Seheiah",periode:"7 ao\u00fbt au 12 ao\u00fbt",message:"Ange de la longue vie et de la protection. Il prot\u00e8ge contre les maladies, les accidents et les \u00e9preuves. La vie est prot\u00e9g\u00e9e et prolong\u00e9e."},
  {num:29,nom:"Reiyel",periode:"13 ao\u00fbt au 17 ao\u00fbt",message:"Ange de la lib\u00e9ration et de la mystique. Il lib\u00e8re des ennemis visibles et invisibles et favorise l'\u00e9l\u00e9vation spirituelle. La libert\u00e9 est votre essence."},
  {num:30,nom:"Omael",periode:"18 ao\u00fbt au 22 ao\u00fbt",message:"Ange de la patience et de la f\u00e9condit\u00e9. Il prot\u00e8ge les animaux et favorise la prolif\u00e9ration des esp\u00e8ces. La patience vous conduit au succ\u00e8s."},
  {num:31,nom:"Lecabel",periode:"23 ao\u00fbt au 28 ao\u00fbt",message:"Ange de la v\u00e9g\u00e9tation et de la lumi\u00e8re. Il favorise l'agriculture, les sciences exactes et les talents naturels. Votre connection \u00e0 la terre est forte."},
  {num:32,nom:"Vasariah",periode:"29 ao\u00fbt au 2 septembre",message:"Ange de la justice divine et de la cl\u00e9mence. Il favorise la cl\u00e9mence des juges et la noblesse d'\u00e2me. La justice vous est favorable."},
  {num:33,nom:"Yehuiah",periode:"3 septembre au 7 septembre",message:"Ange de la subordination divine. Il prot\u00e8ge contre les compl\u00f4ts et favorise la soumission \u00e0 l'ordre divin. Les tra\u00eetres sont d\u00e9masqu\u00e9s."},
  {num:34,nom:"Lehahiah",periode:"8 septembre au 12 septembre",message:"Ange de la paix et de l'ob\u00e9issance. Il apporte la chance, la gr\u00e2ce et la paix divine. Sous sa protection, la discipline m\u00e8ne au succ\u00e8s."},
  {num:35,nom:"Khavakiah",periode:"13 septembre au 17 septembre",message:"Ange de la r\u00e9conciliation et du patrimoine familial. Il favorise les h\u00e9ritages et la paix en famille. Les liens du sang sont sacr\u00e9s."},
  {num:36,nom:"Menadel",periode:"18 septembre au 23 septembre",message:"Ange du travail et de la fid\u00e9lit\u00e9. Il prot\u00e8ge contre les d\u00e9nigrements et favorise le travail bien fait. Votre int\u00e9grit\u00e9 est votre force."},
  {num:37,nom:"Aniel",periode:"24 septembre au 28 septembre",message:"Ange de la rupture des cercles vicieux. Il favorise la sagesse, la connaissance et l'astronomie. Sous sa protection, vous brisez les cycles n\u00e9gatifs."},
  {num:38,nom:"Haamiah",periode:"29 septembre au 3 octobre",message:"Ange des rituels sacrés et de la d\u00e9couverte. Il prot\u00e8ge dans les rituels et favorise la d\u00e9couverte des tr\u00e9sors cach\u00e9s. Le sacr\u00e9 est accessible."},
  {num:39,nom:"Rehael",periode:"4 octobre au 8 octobre",message:"Ange de la gu\u00e9rison et de la parent\u00e9. Il favorise la gu\u00e9rison des maladies et le respect filial. Les liens de sang vous prot\u00e8gent."},
  {num:40,nom:"Ieiazel",periode:"9 octobre au 13 octobre",message:"Ange de la consolation et de la cr\u00e9ativit\u00e9. Il prot\u00e8ge les artistes et favorise les arts cr\u00e9atifs. La beaut\u00e9 est votre vocation."},
  {num:41,nom:"Hahahel",periode:"14 octobre au 18 octobre",message:"Ange de la mission divine. Il fortifie la foi et prot\u00e8ge contre les forces n\u00e9gatives. Votre mission spirituelle est soutenue."},
  {num:42,nom:"Mikael",periode:"19 octobre au 23 octobre",message:"Ange de l'ordre social et politique. Il prot\u00e8ge lors des voyages et favorise la loyaut\u00e9. Sous sa protection, les complots sont d\u00e9joués."},
  {num:43,nom:"Veuliah",periode:"24 octobre au 28 octobre",message:"Ange de la prosp\u00e9rit\u00e9 et de la r\u00e9g\u00e9n\u00e9ration. Il \u00e9crase les ennemis int\u00e9rieurs et favorise l'abondance. La prosp\u00e9rit\u00e9 est votre h\u00e9ritage."},
  {num:44,nom:"Yelahiah",periode:"29 octobre au 2 novembre",message:"Ange de la pers\u00e9v\u00e9rance et des guerriers. Il favorise le karma positif et le succ\u00e8s militaire ou professionnel. Votre courage est votre arme."},
  {num:45,nom:"Sealiah",periode:"3 novembre au 7 novembre",message:"Ange de la motivation et de l'\u00e9galit\u00e9. Il confond les orgueilleux et favorise la vitalit\u00e9. Sous sa protection, l'\u00e9galit\u00e9 divine r\u00e8gne."},
  {num:46,nom:"Ariel",periode:"8 novembre au 12 novembre",message:"Ange des r\u00e9v\u00e9lations et de la nature. Il favorise les d\u00e9couvertes et la perception subtile. Les myst\u00e8res de la nature vous sont r\u00e9v\u00e9l\u00e9s."},
  {num:47,nom:"Asaliah",periode:"13 novembre au 17 novembre",message:"Ange de la contemplation et de la v\u00e9rit\u00e9. Il \u00e9l\u00e8ve l'\u00e2me vers le divin et favorise la sant\u00e9. La v\u00e9rit\u00e9 vous lib\u00e8re."},
  {num:48,nom:"Mihael",periode:"18 novembre au 22 novembre",message:"Ange de la paternit\u00e9 et de la paix conjugale. Il prot\u00e8ge les unions et favorise la clairvoyance. Votre famille est prot\u00e9g\u00e9e."},
  {num:49,nom:"Vehuel",periode:"23 novembre au 27 novembre",message:"Ange de la grandeur et de l'\u00e9l\u00e9vation. Il favorise la sagesse, la g\u00e9n\u00e9rosit\u00e9 et la bienveillance. Votre \u00e2me s'\u00e9l\u00e8ve."},
  {num:50,nom:"Daniel",periode:"28 novembre au 2 d\u00e9cembre",message:"Ange de l'\u00e9loquence et de la gr\u00e2ce. Il favorise la prise de d\u00e9cision, la fortune et le pardon. Vos mots ont un pouvoir de gu\u00e9rison."},
  {num:51,nom:"Hahasiah",periode:"3 d\u00e9cembre au 7 d\u00e9cembre",message:"Ange de la m\u00e9decine universelle. Il favorise la d\u00e9couverte de la pierre philosophale et de la m\u00e9decine. La sagesse universelle vous est accessible."},
  {num:52,nom:"Imamiah",periode:"8 d\u00e9cembre au 12 d\u00e9cembre",message:"Ange de l'expiation et du pardon. Il prot\u00e8ge les voyageurs et facilite les r\u00e9conciliations. Le pardon lib\u00e8re votre \u00e2me."},
  {num:53,nom:"Nanael",periode:"13 d\u00e9cembre au 16 d\u00e9cembre",message:"Ange des sciences abstraites et de la sagesse. Il favorise la contemplation et les sciences. La connaissance est votre lumi\u00e8re."},
  {num:54,nom:"Nithael",periode:"17 d\u00e9cembre au 21 d\u00e9cembre",message:"Ange de l'empire \u00e9ternel et de la royaut\u00e9. Il favorise la longue vie, le charme et l'\u00e9l\u00e9gance. Votre pr\u00e9sence impose le respect."},
  {num:55,nom:"Mebahiah",periode:"22 d\u00e9cembre au 26 d\u00e9cembre",message:"Ange de la morale et de la consolation. Il favorise la pi\u00e9t\u00e9, la f\u00e9condit\u00e9 et la r\u00e9alisation des d\u00e9sirs. Votre int\u00e9grit\u00e9 morale vous \u00e9l\u00e8ve."},
  {num:56,nom:"Poyel",periode:"27 d\u00e9cembre au 31 d\u00e9cembre",message:"Ange de la fortune et du soutien. Il apporte les pouvoirs divins et la renomm\u00e9e. Sous sa protection, la fortune vous sourit."},
  {num:57,nom:"Nemamiah",periode:"1 janvier au 5 janvier",message:"Ange de la prosp\u00e9rit\u00e9 et des guerriers. Il favorise la r\u00e9ussite et lib\u00e8re les prisonniers. Votre courage vous m\u00e8ne \u00e0 la victoire."},
  {num:58,nom:"Yeialel",periode:"6 janvier au 10 janvier",message:"Ange de la force mentale et des yeux. Il favorise la force, l'audace et la gu\u00e9rison. Votre vision du monde est unique et pr\u00e9cieuse."},
  {num:59,nom:"Harael",periode:"11 janvier au 15 janvier",message:"Ange des archives et de la conscience. Il prot\u00e8ge les livres et le savoir. La connaissance accumul\u00e9e est votre tr\u00e9sor."},
  {num:60,nom:"Mitzrael",periode:"16 janvier au 20 janvier",message:"Ange de la r\u00e9paration et de la gu\u00e9rison morale. Il prot\u00e8ge contre ceux qui veulent nuire et favorise la gu\u00e9rison. La justice divine agit."},
  {num:61,nom:"Umabel",periode:"21 janvier au 25 janvier",message:"Ange de l'amiti\u00e9 et de la physique. Il favorise l'astronomie, l'astrologie et les amiti\u00e9s durables. Vos amis sont vos alli\u00e9s pr\u00e9cieux."},
  {num:62,nom:"Iah-Hel",periode:"26 janvier au 30 janvier",message:"Ange de la sagesse universelle et de la philosophie. Il favorise la sagesse et le retrait du monde mat\u00e9riel. La paix int\u00e9rieure est votre refuge."},
  {num:63,nom:"Anauel",periode:"31 janvier au 4 f\u00e9vrier",message:"Ange de l'unit\u00e9 et de la prot\u00e9ction des affaires. Il prot\u00e8ge contre les accidents et favorise le commerce. L'unit\u00e9 est votre force."},
  {num:64,nom:"Mehiel",periode:"5 f\u00e9vrier au 9 f\u00e9vrier",message:"Ange de la vivification et de l'\u00e9criture. Il prot\u00e8ge contre la rage et favorise les auteurs. Vos mots ont le pouvoir de transformer."},
  {num:65,nom:"Damabiah",periode:"10 f\u00e9vrier au 14 f\u00e9vrier",message:"Ange de la fontaine de sagesse et de navigation. Il favorise les voyages maritimes et la sagesse. L'eau est votre \u00e9l\u00e9ment de force."},
  {num:66,nom:"Manakel",periode:"15 f\u00e9vrier au 19 f\u00e9vrier",message:"Ange de la connaissance du bien et du mal. Il apaise la col\u00e8re divine et favorise le sommeil r\u00e9parateur. L'\u00e9quilibre int\u00e9rieur est votre fondation."},
  {num:67,nom:"Eiael",periode:"20 f\u00e9vrier au 24 f\u00e9vrier",message:"Ange des changements et des voyages vers le pass\u00e9. Il favorise les sciences occultes et la longue vie. Le temps est votre alli\u00e9."},
  {num:68,nom:"Habuhiah",periode:"25 f\u00e9vrier au 1 mars",message:"Ange de la gu\u00e9rison et de l'agriculture. Il prot\u00e8ge la sant\u00e9 et favorise la f\u00e9condit\u00e9. La terre vous nourrit et vous prot\u00e8ge."},
  {num:69,nom:"Rochel",periode:"2 mars au 6 mars",message:"Ange de la loi et de la retrouvaille. Il prot\u00e8ge les testaments et aide \u00e0 retrouver les objets perdus. Ce qui est perdu sera retrouv\u00e9."},
  {num:70,nom:"Jabamiah",periode:"7 mars au 11 mars",message:"Ange de la transmutation et de la philosophie. Il favorise la renaissance et la transmutation alchimique. Votre transformation int\u00e9rieure est continue."},
  {num:71,nom:"Haiaiel",periode:"12 mars au 16 mars",message:"Ange des armes divines et du courage. Il prot\u00e8ge contre les forces d'opposition et favorise la victoire. Votre courage est votre bouclier divin."},
  {num:72,nom:"Mumiah",periode:"17 mars au 20 mars",message:"Ange des r\u00e9v\u00e9lations finales et de la renaissance. Il favorise les sciences m\u00e9dicales et la longue vie. Sous sa protection, les miracles se produisent."}
];

function calculerAnge(){
  var ddn=document.getElementById("angeDdn").value;
  if(!ddn){document.getElementById("angeDdn").style.borderColor="var(--gold-border)";return;}
  var d=new Date(ddn);
  var mois=d.getMonth()+1,jour=d.getDate();
  var ange=null;
  var dates=[
    [3,21],[3,26],[3,31],[4,5],[4,10],[4,15],[4,21],[4,26],[5,1],[5,6],[5,11],[5,16],[5,21],[5,26],[6,1],[6,6],[6,11],[6,16],[6,22],[6,27],[7,2],[7,7],[7,12],[7,17],[7,23],[7,28],[8,2],[8,7],[8,13],[8,18],[8,23],[8,29],[9,3],[9,8],[9,13],[9,18],[9,24],[9,29],[10,4],[10,9],[10,14],[10,19],[10,24],[10,29],[11,3],[11,8],[11,13],[11,18],[11,23],[11,28],[12,3],[12,8],[12,13],[12,17],[12,22],[12,27],[1,1],[1,6],[1,11],[1,16],[1,21],[1,26],[1,31],[2,5],[2,10],[2,15],[2,20],[2,25],[3,2],[3,7],[3,12],[3,17]
  ];
  var dateNum=mois*100+jour;
  for(var i=0;i<dates.length-1;i++){
    var d1=dates[i][0]*100+dates[i][1];
    var d2=dates[i+1][0]*100+dates[i+1][1];
    var inRange=(d1<=d2)?(dateNum>=d1&&dateNum<d2):(dateNum>=d1||dateNum<d2);
    if(inRange){ange=ANGES[i];break;}
  }
  if(!ange)ange=ANGES[71];
  document.getElementById("angeForm").style.display="none";
  document.getElementById("angeResult").style.display="block";
  document.getElementById("angeEmoji").textContent="👼";
  document.getElementById("angeNumero").textContent="\u2756 ANGE N\u00b0 "+ange.num+" \u2756";
  document.getElementById("angeName").textContent=ange.nom;
  document.getElementById("angeText").innerHTML=ange.message;
  document.getElementById("angePeriode").textContent="P\u00e9riode de r\u00e9gence\u00a0: "+ange.periode;
}

// ============================================================
// HEURES MIROIRS
// ============================================================
var HEURES_MIROIRS={
  "00h00":{heure:"00h00",message:"L'\u2756 heure de minuit, le commencement absolu",ange:"Vehuhiah",
    texte:"<p>L'heure 00h00 est une heure miroir tr\u00e8s puissante qui symbolise l'infini et le recommencement. Vous vous trouvez au seuil entre deux jours, entre deux mondes. C'est un signal fort de l'univers : un nouveau cycle commence.</p><p>Cette heure vous invite \u00e0 faire le point sur ce que vous souhaitez cr\u00e9er dans votre vie. Les pens\u00e9es que vous avez \u00e0 cet instant ont une puissance particuli\u00e8re. Concentrez-vous sur le positif.</p>"},
  "01h01":{heure:"01h01",message:"Force int\u00e9rieure et nouveau d\u00e9part",ange:"Jeliel",
    texte:"<p>01h01 annonce qu'une nouvelle \u00e9nergie entre dans votre vie. Les anges vous encouragent \u00e0 aller de l'avant avec confiance. Vos pens\u00e9es actuelles ont le pouvoir de cr\u00e9er votre r\u00e9alit\u00e9.</p><p>Si vous traversez une p\u00e9riode difficile, sachez que des changements positifs sont imminent. Faites confiance au processus et \u00e0 votre force int\u00e9rieure.</p>"},
  "02h02":{heure:"02h02",message:"Harmonie et relations importantes",ange:"Sitael",
    texte:"<p>L'heure 02h02 vous parle de vos relations et de l'harmonie dans votre vie. Une personne importante pourrait entrer dans votre vie ou une relation existante va \u00e9voluer de mani\u00e8re significative.</p><p>Les anges vous invitent \u00e0 cultiver la paix et la douceur dans vos \u00e9changes. L'harmonie int\u00e9rieure se refl\u00e8te dans vos relations ext\u00e9rieures.</p>"},
  "03h03":{heure:"03h03",message:"Cr\u00e9ativit\u00e9 et expression de soi",ange:"Elemiah",
    texte:"<p>03h03 est l'heure des artistes et des cr\u00e9ateurs. L'univers vous encourage \u00e0 exprimer votre cr\u00e9ativit\u00e9 et \u00e0 partager vos dons avec le monde. Quelque chose de nouveau est en train d'\u00e9clore en vous.</p><p>C'est le moment id\u00e9al pour entreprendre un projet cr\u00e9atif, apprendre un art, ou simplement laisser votre imagination s'exprimer librement.</p>"},
  "04h04":{heure:"04h04",message:"Stabilit\u00e9 et construction",ange:"Mahasiah",
    texte:"<p>L'heure 04h04 vous parle de fondations et de stabilit\u00e9. Si vous avez des projets en cours, continuez \u00e0 travailler avec pers\u00e9v\u00e9rance. Les bases que vous posez aujourd'hui seront solides et durables.</p><p>Les anges vous rappellent que la patience est une vertu. Construisez \u00e9tape par \u00e9tape, sans pr\u00e9cipitation.</p>"},
  "05h05":{heure:"05h05",message:"Changement et libert\u00e9",ange:"Lelahel",
    texte:"<p>05h05 annonce des changements importants dans votre vie. Ces changements sont positifs m\u00eame s'ils peuvent d\u00e9stabiliser temporairement. L'univers vous invite \u00e0 embrasser la nouveaut\u00e9 avec ouverture.</p><p>La libert\u00e9 que vous cherchez est \u00e0 votre port\u00e9e. Osez sortir de votre zone de confort.</p>"},
  "06h06":{heure:"06h06",message:"Amour et famille",ange:"Achaiah",
    texte:"<p>L'heure 06h06 est l'heure de l'amour et de la famille. Elle vous invite \u00e0 vous concentrer sur vos proches et \u00e0 renforcer les liens affectifs. La s\u00e9curit\u00e9 \u00e9motionnelle est au c\u0153ur de votre bien-\u00eatre.</p><p>Si vous traversez des tensions familiales, cette heure est un signe que la r\u00e9conciliation est possible et souhait\u00e9e.</p>"},
  "07h07":{heure:"07h07",message:"Chance et spiritualit\u00e9",ange:"Cahethel",
    texte:"<p>07h07 est consid\u00e9r\u00e9e comme l'une des heures miroirs les plus charg\u00e9es spirituellement. Elle annonce une p\u00e9riode de chance et d'\u00e9veil spirituel. Votre intuition est particuli\u00e8rement aiguisee en ce moment.</p><p>Fiez-vous \u00e0 vos pressentiments et \u00e0 votre voix int\u00e9rieure. Les anges sont pr\u00e8s de vous.</p>"},
  "08h08":{heure:"08h08",message:"Abondance et prosp\u00e9rit\u00e9",ange:"Haziel",
    texte:"<p>08h08 est l'heure de l'abondance et de la prosp\u00e9rit\u00e9 mat\u00e9rielle. Elle annonce des opportunit\u00e9s financi\u00e8res et des d\u00e9veloppements positifs dans votre vie professionnelle. Le cycle de l'abondance est en train de s'ouvrir pour vous.</p><p>Restez focus\u00e9 sur vos objectifs et continuez \u00e0 agir avec d\u00e9termination.</p>"},
  "09h09":{heure:"09h09",message:"Humanisme et fin de cycle",ange:"Aladiah",
    texte:"<p>L'heure 09h09 marque la fin d'un cycle important. Quelque chose touche \u00e0 sa fin pour laisser place \u00e0 quelque chose de nouveau et de meilleur. Acceptez ce passage avec gr\u00e2ce.</p><p>Cette heure vous invite aussi \u00e0 vous tourner vers les autres et \u00e0 exercer votre g\u00e9n\u00e9rosit\u00e9 naturelle.</p>"},
  "10h10":{heure:"10h10",message:"Accomplissement et cr\u00e9ation",ange:"Lauviah",
    texte:"<p>10h10 est l'heure du potentiel infini. Elle annonce que tout ce que vous touchez peut se transformer positivement. C'est le moment id\u00e9al pour lancer de nouveaux projets ou prendre des d\u00e9cisions importantes.</p><p>Vos pens\u00e9es positives se mat\u00e9rialisent rapidement en ce moment. Concentrez votre \u00e9nergie sur ce que vous d\u00e9sirez vraiment.</p>"},
  "11h11":{heure:"11h11",message:"Intuition divine et \u00e9veil spirituel",ange:"Hahaiah",
    texte:"<p>11h11 est l'heure miroir par excellence, la plus connue et la plus puissante. Elle repr\u00e9sente un portail spirituel, une connexion directe avec les forces c\u00e9lestes. Lorsque vous voyez 11h11, l'univers vous dit qu'il vous entend.</p><p>C'est un signe fort que vos anges gardiens sont pr\u00e9sents \u00e0 vos c\u00f4t\u00e9s. Vos pens\u00e9es et vos int\u00e9ntions ont une puissance d\u00e9cupl\u00e9e. Utilisez ce moment pour \u00e9mettre des intentions positives.</p>"},
  "12h12":{heure:"12h12",message:"Harmonie parfaite et \u00e9quilibre",ange:"Iezalel",
    texte:"<p>12h12 symbolise l'harmonie et l'\u00e9quilibre parfaits. Elle vous invite \u00e0 r\u00e9tablir l'\u00e9quilibre dans les domaines de votre vie qui en manquent. Le midi et minuit, les deux extr\u00eames du temps se rejoignent.</p><p>C'est le moment de r\u00e9concilier les aspects oppos\u00e9s de votre personnalit\u00e9 et de trouver une voie harmonieuse.</p>"},
  "13h13":{heure:"13h13",message:"Transformation et renaissance",ange:"Mebahel",
    texte:"<p>13h13 est une heure de transformation profonde. Associ\u00e9e au chiffre 13, symbole du changement et de la renaissance, elle vous annonce qu'une m\u00e9tamorphose est en cours dans votre vie.</p><p>Ne craignez pas ce changement. Ce qui se termine \u00e9tait n\u00e9cessaire pour que quelque chose de plus beau puisse na\u00eetre.</p>"},
  "14h14":{heure:"14h14",message:"Stabilit\u00e9 et ancrages",ange:"Hariel",
    texte:"<p>14h14 vous invite \u00e0 vous ancrer dans le moment pr\u00e9sent. L'\u00e9nergie du 14 apporte la stabilit\u00e9 et vous rappelle l'importance des fondations solides dans votre vie.</p><p>C'est le moment de v\u00e9rifier que vos bases sont bien solides, que ce soit dans votre vie affective, professionnelle ou mat\u00e9rielle.</p>"},
  "15h15":{heure:"15h15",message:"Libert\u00e9 et \u00e9panouissement",ange:"Hekamiah",
    texte:"<p>L'heure 15h15 est celle de l'\u00e9panouissement et de la libert\u00e9 d'\u00eatre soi-m\u00eame. Elle vous encourage \u00e0 vous exprimer authentiquement et \u00e0 vous lib\u00e9rer des contraintes qui limitent votre d\u00e9veloppement.</p><p>Vos anges vous soutiennent dans votre qu\u00eate de libert\u00e9 et d'authenticit\u00e9.</p>"},
  "16h16":{heure:"16h16",message:"Amour et responsabilit\u00e9",ange:"Lauviah II",
    texte:"<p>16h16 est l'heure de l'amour responsable et de l'engagement. Elle vous invite \u00e0 prendre soin de ceux que vous aimez avec plus d'attention. Les liens affectifs m\u00e9ritent d'\u00eatre cultiv\u00e9s avec d\u00e9vouement.</p><p>Si vous \u00eates en couple, c'est un signe de renforcement du lien. Si vous \u00eates c\u00e9libataire, une rencontre significative est possible.</p>"},
  "17h17":{heure:"17h17",message:"D\u00e9passez les obstacles que vous vous imposez",ange:"Caliel",
    texte:"<p>17h17 est reli\u00e9e \u00e0 la lame N\u00b0 17 du tarot : l'\u00c9toile. Elle symbolise la protection, l'espoir et l'optimisme. C'est un message fort : vous \u00eates guid\u00e9(e) et prot\u00e9g\u00e9(e) par des forces bienveillantes.</p><p>Cette heure vous invite \u00e0 d\u00e9passer les limites que vous vous imposez vous-m\u00eame. Faites confiance \u00e0 votre \u00e9toile guid\u00e9e et avancez avec courage.</p>"},
  "18h18":{heure:"18h18",message:"Abondance int\u00e9rieure et ext\u00e9rieure",ange:"Leuviah",
    texte:"<p>18h18 annonce une p\u00e9riode d'abondance sur tous les plans. Que ce soit sur le plan mat\u00e9riel, affectif ou spirituel, les \u00e9nergies sont favorables \u00e0 la prosp\u00e9rit\u00e9 et \u00e0 l'\u00e9panouissement.</p><p>Restez ouvert(e) aux opportunit\u00e9s qui se pr\u00e9sentent et accueillez l'abondance avec gratitude.</p>"},
  "19h19":{heure:"19h19",message:"Fin d'un cycle et nouveau commencement",ange:"Pahaliah",
    texte:"<p>19h19 marque la fin d'un cycle et le commencement d'un autre. Quelque chose s'ach\u00e8ve pour laisser place \u00e0 du nouveau. Cette transition est n\u00e9cessaire et b\u00e9n\u00e9fique.</p><p>Faites confiance au processus. Ce qui se ferme laissera entrer de la lumi\u00e8re.\</p>"},
  "20h20":{heure:"20h20",message:"Jugement et prise de conscience",ange:"Nelkhael",
    texte:"<p>20h20 vous invite \u00e0 prendre du recul et \u00e0 \u00e9valuer votre situation avec lucidit\u00e9. C'est le moment de faire le point, de comprendre ce qui fonctionne et ce qui doit changer.</p><p>Cette heure favorise la prise de d\u00e9cision \u00e9clair\u00e9e et la mise en place de nouveaux projets r\u00e9fl\u00e9chis.</p>"},
  "21h21":{heure:"21h21",message:"Univers favorable et protection",ange:"Yeiayel",
    texte:"<p>21h21 est un signe que l'univers est en votre faveur. Les \u00e9nergies cosmiques s'alignent pour vous soutenir dans vos projets et vos d\u00e9sirs. Vous \u00eates sur le bon chemin.</p><p>Continuez \u00e0 avancer avec confiance. Les obstacles qui se pr\u00e9sentent ne sont que temporaires.</p>"},
  "22h22":{heure:"22h22",message:"Ma\u00eetre b\u00e2tisseur et ambition",ange:"Melahel",
    texte:"<p>22h22 est une heure miroir tr\u00e8s puissante associ\u00e9e au nombre ma\u00eetre 22. Elle vous invite \u00e0 penser grand et \u00e0 construire quelque chose de durable et de significatif pour votre vie et pour les autres.</p><p>Vos ambitions sont l\u00e9gitimes et r\u00e9alisables. Continuez \u00e0 construire votre vision avec d\u00e9termination et sagesse.</p>"},
  "23h23":{heure:"23h23",message:"Transformation spirituelle profonde",ange:"Haheuiah",
    texte:"<p>23h23 est une heure de transformation spirituelle profonde. Elle marque la fin de la journ\u00e9e et vous invite \u00e0 faire le bilan, \u00e0 l\u00e2cher prise sur ce qui ne sert plus votre \u00e9volution.</p><p>Un nouveau vous est en train d'\u00e9merger. Accueillez cette transformation avec gratitude et confiance.</p>"}
};

function initHeuresMiroirs(){
  var grid=document.getElementById("miroirGrid");
  if(!grid)return;
  var heures=Object.keys(HEURES_MIROIRS);
  heures.forEach(function(h){
    var btn=document.createElement("div");
    btn.className="miroir-btn";
    btn.setAttribute("data-heure",h);
    btn.innerHTML="<span class='mh'>"+h+"</span><span class='ml'>"+HEURES_MIROIRS[h].message.split(" ").slice(0,3).join(" ")+"...</span>";
    btn.onclick=function(){afficherMiroir(h);};
    grid.appendChild(btn);
  });
}

function afficherMiroir(h){
  var data=HEURES_MIROIRS[h];
  if(!data)return;
  document.querySelectorAll(".miroir-btn").forEach(function(b){b.classList.remove("active");});
  document.querySelector("[data-heure='"+h+"']").classList.add("active");
  document.getElementById("miroirHeure").textContent=h;
  document.getElementById("miroirMessage").textContent="\u2756 "+data.message+" \u2756";
  document.getElementById("miroirText").innerHTML=data.texte;
  document.getElementById("miroirAnge").innerHTML="\ud83d\udc7c Ange associ\u00e9 : <strong>"+data.ange+"</strong> \u2014 Sous sa protection, ce message vous est transmis.";
  var result=document.getElementById("miroirResult");
  result.classList.add("active");
  result.scrollIntoView({behavior:"smooth",block:"nearest"});
}

// ============================================================
// MODAL PAIEMENT
// ============================================================
function openModal(name,desc,price){
  document.getElementById("modalTitle").textContent=name;
  document.getElementById("modalSub").textContent=desc;
  document.getElementById("sumSvc").textContent=name;
  document.getElementById("sumPrice").textContent=price+" \u20ac";
  document.getElementById("sumTotal").textContent=price+" \u20ac";
  document.getElementById("btnAmt").textContent=price+" \u20ac";
  document.getElementById("paymentForm").style.display="block";
  document.getElementById("paySuccess").classList.remove("active");
  ["payName","payEmail","payCard","payExp","payCvv"].forEach(function(id){var el=document.getElementById(id);if(el)el.value="";});
  document.getElementById("modalOverlay").classList.add("open");
}
function closeModal(){document.getElementById("modalOverlay").classList.remove("open");}
function selPay(m){
  ["cb","pp","ap"].forEach(function(p){document.getElementById("pm-"+p).classList.toggle("active",p===m);});
  var cbf=document.getElementById("cbFields");if(cbf)cbf.style.display=m==="cb"?"block":"none";
}
function fmtCard(el){var v=el.value.replace(/\D/g,"").substring(0,16);el.value=v.replace(/(\d{4})(?=\d)/g,"$1 ");}
function fmtExp(el){var v=el.value.replace(/\D/g,"").substring(0,4);if(v.length>2)v=v.substring(0,2)+"/"+v.substring(2);el.value=v;}
function doPay(){
  var n=document.getElementById("payName").value.trim();
  var e=document.getElementById("payEmail").value.trim();
  if(!n||!e){alert("Veuillez remplir votre nom et votre e-mail.");return;}
  if(!e.includes("@")){alert("E-mail invalide.");return;}
  var btn=document.querySelector(".btn-pay");
  btn.textContent="\u23f3  Traitement en cours\u2026";btn.disabled=true;
  setTimeout(function(){
    document.getElementById("paymentForm").style.display="none";
    document.getElementById("paySuccess").classList.add("active");
    document.getElementById("sucName").textContent=n.split(" ")[0];
    document.getElementById("sucEmail").textContent=e;
    btn.textContent="\ud83d\udd12  CONFIRMER";btn.disabled=false;
  },2000);
}

// Init
document.addEventListener("DOMContentLoaded",function(){initHeuresMiroirs();});

// ============================================================
// CORRESPONDANCES RÉUTILISABLES — Numérologie & Tarot
// ============================================================
var NUMERO_MEANINGS = {
  "0":"Le vide fécond, le potentiel infini avant toute manifestation. Rien n'est encore figé : tout reste possible.",
  "1":"Le commencement, l'initiative, l'énergie du leader qui ouvre la marche en confiance.",
  "2":"La dualité harmonieuse, l'art du partenariat, l'écoute et la diplomatie.",
  "3":"La créativité et l'expression joyeuse — le chiffre de la communication et de la spontanéité.",
  "4":"La structure, la stabilité, les fondations solides que rien ne peut ébranler.",
  "5":"Le mouvement, la liberté, le changement qui libère et fait grandir.",
  "6":"L'amour, la responsabilité affective, l'harmonie du foyer et des proches.",
  "7":"La sagesse intérieure, la spiritualité, l'introspection qui éclaire le chemin.",
  "8":"L'abondance, la puissance matérielle, le juste retour des efforts fournis.",
  "9":"L'achèvement, la générosité universelle, la sagesse qui se transmet aux autres.",
  "11":"Nombre maître de l'intuition et de l'inspiration — un pont direct vers le monde spirituel.",
  "22":"Nombre maître du bâtisseur — la capacité de transformer un grand rêve en réalité concrète et durable."
};
var TAROT_MAJEURS = [
  {n:"Le Mat",t:"L'insouciance et le début d'un nouveau voyage, sans attaches ni peur du saut dans l'inconnu."},
  {n:"Le Bateleur",t:"L'habileté et les ressources déjà en votre possession pour agir dès maintenant."},
  {n:"La Papesse",t:"Le secret, l'intuition silencieuse, la sagesse qui attend d'être révélée."},
  {n:"L'Impératrice",t:"L'abondance créatrice, la fertilité des projets et des idées nouvelles."},
  {n:"L'Empereur",t:"La structure, l'autorité bienveillante, la stabilité que vous construisez pas à pas."},
  {n:"Le Pape",t:"La transmission, le conseil extérieur précieux, la guidance qui éclaire votre voie."},
  {n:"L'Amoureux",t:"Le choix du cœur, l'alignement entre attirance et valeurs profondes."},
  {n:"Le Chariot",t:"La victoire par la maîtrise de soi et une détermination sans faille."},
  {n:"La Justice",t:"L'équilibre, la vérité qui se rétablit, les comptes qui finissent par s'équilibrer."},
  {n:"L'Hermite",t:"Le retrait salutaire, la lumière intérieure qui guide dans la solitude choisie."},
  {n:"La Roue de Fortune",t:"Le cycle qui tourne en votre faveur, un changement de chance inattendu."},
  {n:"La Force",t:"Le courage doux, la maîtrise par la douceur plutôt que par la contrainte."},
  {n:"Le Pendu",t:"Le lâcher-prise, une autre perspective qui se révèle en suspendant l'action."},
  {n:"L'Arcane sans nom",t:"La transformation radicale, une fin nécessaire à une renaissance."},
  {n:"Tempérance",t:"L'équilibre subtil, le mélange harmonieux de deux forces opposées."},
  {n:"Le Diable",t:"Les attachements à examiner, la tentation qui invite à plus de conscience."},
  {n:"La Maison Dieu",t:"La rupture libératrice, l'effondrement qui ouvre sur une vérité plus solide."},
  {n:"L'Étoile",t:"L'espoir retrouvé, la protection céleste après la tempête."},
  {n:"La Lune",t:"L'intuition et les illusions à démêler, le monde de l'inconscient qui s'exprime."},
  {n:"Le Soleil",t:"La joie éclatante, la réussite lumineuse et la vitalité retrouvée."},
  {n:"Le Jugement",t:"L'appel à se relever, un bilan qui ouvre sur un renouveau pleinement assumé."},
  {n:"Le Monde",t:"L'accomplissement, un cycle qui se referme en pleine réussite."}
];
function numeroOf(hh){var r={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:1,11:11,12:3,13:4,14:5,15:6,16:7,17:8,18:9,19:1,20:2,21:3,22:22,23:5};return r[hh];}
function tarotOf(hh){return hh<=21?TAROT_MAJEURS[hh]:null;}

// ============================================================
// HEURES MIROIRS + HEURES INVERSÉES — données complètes
// ============================================================
var HEURES_MIROIRS = {
  // ===== HEURES MIROIRS (chiffres identiques) =====
  "00h00":{type:"miroir",heure:"00h00",message:"Le commencement absolu, l'infini",ange:"Vehuhiah",
    flash:"Un seuil s'ouvre. Ce que vous pensez maintenant se manifeste plus vite qu'ailleurs.",
    texte:"<p>L'heure 00h00 est une heure miroir d'une puissance exceptionnelle, symbolisant l'infini et le recommencement absolu. Vous vous trouvez au seuil entre deux jours, entre deux mondes. C'est un signal fort de l'univers : un nouveau cycle commence pour vous.</p><p>Les pensées que vous avez à cet instant précis ont une puissance particulière. L'univers vous invite à faire table rase et à définir clairement ce que vous désirez créer dans votre vie. Concentrez-vous sur le positif et émettez vos intentions les plus profondes.</p>",
    amour:"En amour, 00h00 marque la fin symbolique d'un chapitre pour laisser place à une histoire plus alignée avec qui vous êtes devenu(e). Si une relation vient de se terminer, ce n'est pas un hasard : le terrain se prépare pour du neuf.",
    hh:0},
  "01h01":{type:"miroir",heure:"01h01",message:"Force intérieure et nouveau départ",ange:"Jeliel",
    flash:"Une énergie neuve s'installe. Avancez, le terrain est plus favorable qu'il n'y paraît.",
    texte:"<p>01h01 annonce qu'une nouvelle énergie entre dans votre vie. Les anges vous encouragent à aller de l'avant avec confiance et détermination. Vos pensées actuelles ont le pouvoir direct de créer votre réalité.</p><p>Si vous traversez une période difficile, sachez que des changements positifs sont imminents. Le chiffre 1 répété est un signe de leadership et d'indépendance — faites confiance à votre force intérieure.</p>",
    amour:"Pour les célibataires, 01h01 annonce une rencontre portée par une énergie d'indépendance assumée — vous attirez en étant pleinement vous-même. En couple, c'est le moment de reprendre l'initiative affective plutôt que d'attendre.",
    hh:1},
  "02h02":{type:"miroir",heure:"02h02",message:"Harmonie et relations importantes",ange:"Sitael",
    flash:"Une relation clé évolue. Restez attentif(ve) aux signaux de rapprochement.",
    texte:"<p>L'heure 02h02 vous parle de vos relations et de l'harmonie dans votre vie. Une personne importante pourrait entrer dans votre vie, ou une relation existante va évoluer de manière significative dans un sens positif.</p><p>Le 2 répété symbolise la dualité, le partenariat et la diplomatie. Les anges vous invitent à cultiver la paix et la douceur dans tous vos échanges.</p>",
    amour:"02h02 est l'une des heures les plus favorables au couple : elle annonce un rapprochement ou l'arrivée d'une personne réellement complémentaire. La diplomatie et la douceur sont vos meilleures alliées en ce moment.",
    hh:2},
  "03h03":{type:"miroir",heure:"03h03",message:"Créativité et expression de soi",ange:"Elemiah",
    flash:"Votre créativité est en effervescence. Ce que vous exprimez maintenant touchera juste.",
    texte:"<p>03h03 est l'heure des artistes et des créateurs. L'univers vous encourage à exprimer votre créativité et à partager vos dons avec le monde. Quelque chose de nouveau et de beau est en train d'éclore en vous.</p><p>Le 3 est le chiffre de la communication et de l'expression. C'est le moment idéal pour entreprendre un projet créatif ou simplement laisser votre imagination s'exprimer librement.</p>",
    amour:"En amour, 03h03 favorise les déclarations sincères et originales. C'est le bon moment pour exprimer vos sentiments avec vos mots à vous, sans crainte du ridicule — l'authenticité séduit davantage que la perfection.",
    hh:3},
  "04h04":{type:"miroir",heure:"04h04",message:"Stabilité et construction solide",ange:"Mahasiah",
    flash:"Les fondations que vous posez aujourd'hui tiendront. Continuez, sans précipiter.",
    texte:"<p>L'heure 04h04 vous parle de fondations et de stabilité. Si vous avez des projets en cours, continuez à travailler avec persévérance. Les bases que vous posez aujourd'hui seront solides et durables.</p><p>Le 4 répété est l'énergie du bâtisseur. Les anges vous rappellent que la patience est une vertu — construisez étape par étape, sans précipitation.</p>",
    amour:"04h04 annonce la consolidation d'une relation : un projet à deux (emménagement, engagement, avenir commun) prend une base solide. Pour les célibataires, elle invite à ne plus rechercher l'étincelle seule, mais la stabilité qui dure.",
    hh:4},
  "05h05":{type:"miroir",heure:"05h05",message:"Changement et liberté",ange:"Lelahel",
    flash:"Le changement qui s'annonce est une libération, pas une perte.",
    texte:"<p>05h05 annonce des changements importants dans votre vie. Ces changements sont positifs même s'ils peuvent déstabiliser temporairement. L'univers vous invite à embrasser la nouveauté avec ouverture et confiance.</p><p>Le 5 est le chiffre de la liberté et de l'aventure. Osez sortir de votre zone de confort — la liberté que vous cherchez est à votre portée.</p>",
    amour:"En amour, 05h05 peut signifier le besoin de plus d'air dans une relation qui devient étouffante, ou au contraire la libération d'un lien qui freinait votre épanouissement. Dans les deux cas, la liberté retrouvée sert votre cœur.",
    hh:5},
  "06h06":{type:"miroir",heure:"06h06",message:"Amour, famille et responsabilité",ange:"Achaiah",
    flash:"Vos proches ont besoin de votre présence. Un geste tendre suffit à tout réchauffer.",
    texte:"<p>L'heure 06h06 est l'heure de l'amour et de la famille. Elle vous invite à vous concentrer sur vos proches et à renforcer les liens affectifs. La sécurité émotionnelle est au cœur de votre bien-être.</p><p>Si vous traversez des tensions familiales, cette heure est un signe que la réconciliation est possible et souhaitée par les forces célestes.</p>",
    amour:"06h06 est directement liée au cœur : elle annonce un approfondissement du lien amoureux, la tendresse retrouvée, et pour les célibataires, une rencontre placée sous le signe de la douceur et de la sécurité affective plutôt que de la passion brûlante.",
    hh:6},
  "07h07":{type:"miroir",heure:"07h07",message:"Chance et éveil spirituel",ange:"Cahethel",
    flash:"Votre intuition ne se trompe pas en ce moment. Écoutez-la sans hésiter.",
    texte:"<p>07h07 est considérée comme l'une des heures miroirs les plus chargées spirituellement. Elle annonce une période de chance et d'éveil spirituel profond. Votre intuition est particulièrement aiguisée en ce moment.</p><p>Le 7 est le chiffre de la sagesse et de la spiritualité. Fiez-vous à vos pressentiments et à votre voix intérieure — les anges sont proches de vous.</p>",
    amour:"En amour, 07h07 évoque une connexion qui dépasse le simple charme physique — un alignement d'âmes, presque spirituel, avec la personne qui compte. Faites confiance à ce que vous ressentez, même si le mental cherche à le rationaliser.",
    hh:7},
  "08h08":{type:"miroir",heure:"08h08",message:"Abondance et prospérité",ange:"Haziel",
    flash:"Le cycle de l'abondance s'ouvre. Restez focalisé(e), les résultats arrivent.",
    texte:"<p>08h08 est l'heure de l'abondance et de la prospérité matérielle. Elle annonce des opportunités financières et des développements positifs dans votre vie professionnelle. Le cycle de l'abondance s'ouvre pour vous.</p><p>Le 8 couché est le symbole de l'infini. Restez focalisé sur vos objectifs et continuez à agir avec détermination — la prospérité est sur votre chemin.</p>",
    amour:"08h08 amplifie ce qui existe déjà : une relation heureuse devient plus riche encore, une relation en difficulté voit ses tensions s'intensifier temporairement avant de se résoudre. Le retour est toujours à la mesure de ce que vous y investissez.",
    hh:8},
  "09h09":{type:"miroir",heure:"09h09",message:"Fin de cycle et générosité",ange:"Aladiah",
    flash:"Une page se tourne. Ce qui se termine libère une place pour du meilleur.",
    texte:"<p>L'heure 09h09 marque la fin d'un cycle important. Quelque chose touche à sa fin pour laisser place à quelque chose de nouveau et de meilleur. Acceptez ce passage avec grâce et gratitude.</p><p>Le 9 est le chiffre de l'humanisme et de la compassion. Cette heure vous invite à vous tourner vers les autres et à exercer votre générosité naturelle.</p>",
    amour:"En amour, 09h09 peut signifier la fin apaisée d'une histoire qui avait fait son temps, pour laisser place à un amour plus juste. Accueillez ce deuil affectif avec gratitude plutôt qu'avec regret — il vous prépare à mieux aimer.",
    hh:9},
  "10h10":{type:"miroir",heure:"10h10",message:"Accomplissement et potentiel infini",ange:"Lauviah",
    flash:"Tout ce que vous entreprenez maintenant a un potentiel démultiplié.",
    texte:"<p>10h10 est l'heure du potentiel infini. Elle annonce que tout ce que vous touchez peut se transformer positivement. C'est le moment idéal pour lancer de nouveaux projets ou prendre des décisions importantes.</p><p>Vos pensées positives se matérialisent rapidement en ce moment. Concentrez votre énergie sur ce que vous désirez vraiment créer dans votre vie.</p>",
    amour:"10h10 est une heure faste pour l'amour naissant : une rencontre faite maintenant porte en elle un potentiel d'avenir réel. En couple, c'est le moment idéal pour lancer un projet commun porteur de sens.",
    hh:10},
  "11h11":{type:"miroir",heure:"11h11",message:"Portail spirituel — intuition divine",ange:"Hahaiah",
    flash:"L'heure la plus puissante de toutes. Faites un vœu sincère, maintenant.",
    texte:"<p>11h11 est l'heure miroir par excellence, la plus connue et la plus puissante. Elle représente un portail spirituel, une connexion directe avec les forces célestes. Lorsque vous voyez 11h11, l'univers vous dit clairement : il vous entend.</p><p>C'est un signe fort que vos anges gardiens sont présents à vos côtés. Vos pensées et vos intentions ont une puissance décuplée. Utilisez ce moment sacré pour émettre vos intentions les plus positives et les plus sincères.</p>",
    amour:"En amour, 11h11 est le signe d'une connexion vibratoire rare — beaucoup y voient l'empreinte d'une âme sœur ou d'un lien karmique. Faites un vœu sincère concernant votre vie sentimentale : cette heure porte une force de manifestation exceptionnelle.",
    hh:11},
  "12h12":{type:"miroir",heure:"12h12",message:"Harmonie parfaite et équilibre",ange:"Iezalel",
    flash:"Midi et minuit se rejoignent. C'est l'heure de réconcilier vos contraires.",
    texte:"<p>12h12 symbolise l'harmonie et l'équilibre parfaits. Elle vous invite à rétablir l'équilibre dans les domaines de votre vie qui en manquent. Midi et minuit, les deux extrêmes du temps se rejoignent.</p><p>C'est le moment de réconcilier les aspects opposés de votre personnalité et de trouver une voie harmonieuse entre vos différentes aspirations.</p>",
    amour:"12h12 annonce la réconciliation entre deux personnalités qui semblaient opposées — un couple qui trouve enfin son équilibre, ou une rencontre entre deux tempéraments complémentaires qui s'accordent mieux qu'ils ne le pensaient.",
    hh:12},
  "13h13":{type:"miroir",heure:"13h13",message:"Transformation et renaissance",ange:"Mebahel",
    flash:"Une métamorphose est en cours. Ne craignez pas ce qui se termine.",
    texte:"<p>13h13 est une heure de transformation profonde. Associée au chiffre 13, symbole du changement et de la renaissance, elle vous annonce qu'une métamorphose est en cours dans votre vie.</p><p>Ne craignez pas ce changement. Ce qui se termine était nécessaire pour que quelque chose de plus beau et de plus aligné avec votre véritable nature puisse naître.</p>",
    amour:"En amour, 13h13 marque un passage : une relation superficielle se transforme en lien plus vrai, ou se termine pour laisser place à quelque chose de plus authentique. La transformation, même inconfortable, sert toujours votre cœur.",
    hh:13},
  "14h14":{type:"miroir",heure:"14h14",message:"Stabilité et ancrage dans le présent",ange:"Hariel",
    flash:"Vérifiez vos bases. La solidité intérieure est votre meilleure protection.",
    texte:"<p>14h14 vous invite à vous ancrer dans le moment présent. L'énergie du 14 apporte la stabilité et vous rappelle l'importance des fondations solides dans tous les domaines de votre vie.</p><p>Vérifiez que vos bases sont bien solides, que ce soit dans votre vie affective, professionnelle ou matérielle. La solidité intérieure est votre meilleure protection.</p>",
    amour:"14h14 est le bon moment pour poser des bases concrètes dans votre couple — un projet commun, un engagement clair. Pour les célibataires, elle invite à s'ancrer dans ses propres valeurs avant de chercher à deux.",
    hh:14},
  "15h15":{type:"miroir",heure:"15h15",message:"Libération et épanouissement authentique",ange:"Hekamiah",
    flash:"Vous n'avez plus à vous conformer. Vivez votre vérité, maintenant.",
    texte:"<p>L'heure 15h15 est celle de l'épanouissement et de la liberté d'être soi-même. Elle vous encourage à vous exprimer authentiquement et à vous libérer des contraintes qui limitent votre développement personnel.</p><p>Vos anges vous soutiennent pleinement dans votre quête de liberté et d'authenticité. Cessez de vous conformer aux attentes des autres et vivez votre vérité.</p>",
    amour:"15h15 annonce une passion intense qui embrase le cœur — laissez-vous porter par vos sentiments sans chercher à les rationaliser. C'est une heure où l'amour vécu pleinement, sans retenue, transforme profondément.",
    hh:15},
  "16h16":{type:"miroir",heure:"16h16",message:"Amour et engagement responsable",ange:"Lauviah II",
    flash:"Un geste d'attention aujourd'hui renforcera durablement un lien qui compte.",
    texte:"<p>16h16 est l'heure de l'amour responsable et de l'engagement sincère. Elle vous invite à prendre soin de ceux que vous aimez avec plus d'attention et de tendresse. Les liens affectifs méritent d'être cultivés quotidiennement.</p><p>Si vous êtes en couple, c'est un signe de renforcement du lien. Si vous êtes célibataire, une rencontre significative et durable est possible dans les prochaines semaines.</p>",
    amour:"En couple, 16h16 confirme un renforcement du lien et l'envie de s'engager plus profondément. Célibataire, elle annonce une rencontre qui, loin d'être éphémère, a une vraie vocation à durer.",
    hh:16},
  "17h17":{type:"miroir",heure:"17h17",message:"Dépassez les obstacles que vous vous imposez",ange:"Caliel",
    flash:"Vous êtes protégé(e) bien plus que vous ne le croyez. Avancez avec courage.",
    texte:"<p>17h17 est reliée à l'archétype de l'Étoile — symbole de protection, d'espoir et d'optimisme. C'est un message fort : vous êtes guidé(e) et protégé(e) par des forces bienveillantes bien plus grandes que vous.</p><p>Cette heure vous invite à dépasser les limites que vous vous imposez vous-même. La plupart de vos obstacles sont intérieurs. Faites confiance à votre étoile et avancez avec courage.</p>",
    amour:"En amour, 17h17 redonne espoir : même si la solitude pèse en ce moment, une belle personne veille déjà sur votre chemin. Osez sortir de votre zone de confort affective — l'obstacle principal est souvent la peur, pas la réalité.",
    hh:17},
  "18h18":{type:"miroir",heure:"18h18",message:"Abondance intérieure et extérieure",ange:"Leuviah",
    flash:"L'abondance frappe à votre porte. Accueillez-la avec gratitude, elle se multiplie ainsi.",
    texte:"<p>18h18 annonce une période d'abondance sur tous les plans. Que ce soit sur le plan matériel, affectif ou spirituel, les énergies sont favorables à la prospérité et à l'épanouissement de toutes vos facultés.</p><p>Restez ouvert(e) aux opportunités qui se présentent et accueillez l'abondance avec gratitude sincère. La gratitude multiplie les bienfaits.</p>",
    amour:"18h18 annonce une belle rencontre ou l'approfondissement heureux d'une relation existante. L'abondance affective est à votre portée — restez ouvert(e) plutôt que de fermer la porte par peur d'être déçu(e).",
    hh:18},
  "19h19":{type:"miroir",heure:"19h19",message:"Fin d'un cycle, commencement d'un autre",ange:"Pahaliah",
    flash:"Ce qui se ferme laissera entrer plus de lumière que vous ne l'imaginez.",
    texte:"<p>19h19 marque la fin d'un cycle et le commencement lumineux d'un autre. Quelque chose s'achève pour laisser place à du nouveau et de plus prometteur. Cette transition est nécessaire et profondément bénéfique.</p><p>Faites confiance au processus de la vie. Ce qui se ferme laissera entrer davantage de lumière et d'opportunités dans votre existence.</p>",
    amour:"En amour, 19h19 favorise particulièrement les nouvelles rencontres et l'épanouissement au sein d'un couple déjà installé. Une page sentimentale se tourne pour ouvrir un chapitre plus lumineux — accueillez-le sans regarder en arrière.",
    hh:19},
  "20h20":{type:"miroir",heure:"20h20",message:"Prise de conscience et jugement éclairé",ange:"Nelkhael",
    flash:"Votre jugement est fiable en ce moment. Prenez le recul qu'il vous faut.",
    texte:"<p>20h20 vous invite à prendre du recul et à évaluer votre situation avec lucidité et bienveillance envers vous-même. C'est le moment de faire le point, de comprendre ce qui fonctionne et ce qui doit évoluer.</p><p>Cette heure favorise la prise de décision éclairée et la mise en place de nouveaux projets mûrement réfléchis. Votre jugement est fiable en ce moment.</p>",
    amour:"20h20 apporte une clarté bienvenue sur vos sentiments réels — le moment est propice pour juger sereinement une relation ambiguë. Une personne pense d'ailleurs intensément à vous à cet instant précis.",
    hh:20},
  "21h21":{type:"miroir",heure:"21h21",message:"L'univers vous est favorable",ange:"Yeiayel",
    flash:"Le premier pas est le vôtre à faire. L'univers a déjà dit oui.",
    texte:"<p>21h21 est un signe clair que l'univers est pleinement en votre faveur. Les énergies cosmiques s'alignent pour vous soutenir dans vos projets et vos désirs les plus profonds. Vous êtes sur le bon chemin.</p><p>Continuez à avancer avec confiance et sérénité. Les obstacles qui se présentent ne sont que temporaires et font partie du voyage vers votre destinée.</p>",
    amour:"21h21 est l'heure du premier pas en amour : déclarez-vous, envoyez ce message, osez cette invitation. L'univers vous assure que cette démarche sera couronnée de succès, ou du moins, qu'elle ne sera jamais regrettée.",
    hh:21},
  "22h22":{type:"miroir",heure:"22h22",message:"Maître bâtisseur — ambition et vision",ange:"Melahel",
    flash:"Pensez grand : ce que vous bâtissez maintenant est fait pour durer.",
    texte:"<p>22h22 est une heure miroir très puissante associée au Nombre Maître 22. Elle vous invite à penser grand et à construire quelque chose de durable et de significatif — pour votre vie et pour ceux qui vous entourent.</p><p>Vos ambitions sont légitimes et pleinement réalisables. Continuez à construire votre vision avec détermination, sagesse et persévérance.</p>",
    amour:"En amour, 22h22 annonce qu'une personne qui vous aime sincèrement va bientôt se manifester — un message, un appel, un geste inattendu. Restez attentif(ve) dans les jours qui suivent : le signal ne tardera pas.",
    hh:22},
  "23h23":{type:"miroir",heure:"23h23",message:"Transformation spirituelle et lâcher-prise",ange:"Haheuiah",
    flash:"Faites le bilan de la journée, puis lâchez prise. Demain porte du neuf.",
    texte:"<p>23h23 est une heure de transformation spirituelle profonde. Elle marque la fin de la journée et vous invite à faire le bilan, à lâcher prise sur ce qui ne sert plus votre évolution et votre bonheur.</p><p>Un nouveau vous est en train d'émerger. Accueillez cette transformation avec gratitude et confiance absolue en la sagesse de votre chemin de vie.</p>",
    amour:"23h23 suggère qu'une personne que vous aimez a besoin de vous en ce moment, sans oser vous l'avouer ouvertement. Un mot tendre de votre part, envoyé sans attendre qu'on vous le demande, pourrait faire toute la différence.",
    hh:23},

  // ===== HEURES INVERSÉES (lecture symétrique) =====
  "10h01":{type:"inverse",heure:"10h01",message:"Retour aux sources et introspection",ange:"Achaiah",
    flash:"Vos origines détiennent une clé pour votre présent. Regardez en arrière un instant.",
    texte:"<p>L'heure inversée 10h01 est un miroir temporel qui vous invite à regarder vers vos origines et vos fondements. Ce que vous avez vécu dans le passé contient les clés de votre avenir. Un retour aux sources s'impose.</p><p>Cette heure symétrique symbolise la réflexion — comme un miroir qui vous renvoie votre image. Qui êtes-vous vraiment, au-delà des rôles que vous jouez ? La réponse est en vous.</p>"},
  "12h21":{type:"inverse",heure:"12h21",message:"Équilibre parfait entre donner et recevoir",ange:"Iezalel",
    flash:"Vérifiez la balance : donnez-vous plus que vous ne recevez, ou l'inverse ?",
    texte:"<p>12h21 est une heure inversée d'une grande harmonie symbolique. Elle vous parle de l'équilibre entre ce que vous donnez et ce que vous recevez. Y a-t-il un déséquilibre dans vos relations ou dans votre énergie vitale ?</p><p>L'univers vous invite à rééquilibrer les flux d'énergie dans votre vie. Apprenez à recevoir avec autant de grâce que vous donnez.</p>"},
  "13h31":{type:"inverse",heure:"13h31",message:"Transformation intérieure accélérée",ange:"Mebahel",
    flash:"La métamorphose s'accélère. Ce qui se transforme en vous ira jusqu'au bout.",
    texte:"<p>L'heure inversée 13h31 amplifie l'énergie transformatrice du 13. Une métamorphose profonde est en cours dans votre vie intérieure. Ce processus peut sembler déstabilisant mais il est absolument nécessaire à votre évolution.</p><p>Le miroir du temps vous invite à accepter les changements avec sérénité. Ce qui se transforme en vous émergera bientôt sous une forme plus lumineuse et plus authentique.</p>"},
  "14h41":{type:"inverse",heure:"14h41",message:"Fondations solides pour un avenir durable",ange:"Hariel",
    flash:"Ne précipitez rien : ce qui se bâtit lentement tient toujours plus longtemps.",
    texte:"<p>14h41 vous parle de ce que vous construisez pour l'avenir. Les fondations que vous posez aujourd'hui détermineront la solidité de votre vie dans les années à venir. Investissez du temps et de l'énergie dans ce qui est vraiment important.</p><p>Cette heure symétrique vous rappelle que les constructions durables demandent du temps et de la patience. Ne précipitez pas ce qui mérite d'être bâti solidement.</p>"},
  "15h51":{type:"inverse",heure:"15h51",message:"Liberté retrouvée après les épreuves",ange:"Hekamiah",
    flash:"L'épreuve touche à sa fin. La légèreté que vous cherchez arrive bientôt.",
    texte:"<p>L'heure inversée 15h51 annonce une libération prochaine après une période d'épreuves ou de contraintes. Vous avez traversé une phase difficile qui touche à sa fin. La liberté que vous cherchez est à portée de main.</p><p>L'univers vous confirme que vos efforts ont été vus et reconnus. Une nouvelle phase de légèreté et d'épanouissement s'ouvre devant vous.</p>"},
  "20h02":{type:"inverse",heure:"20h02",message:"Vision et intuition renforcées",ange:"Nelkhael",
    flash:"Ce qui ressemble à un obstacle cache peut-être une opportunité déguisée.",
    texte:"<p>20h02 est une heure inversée qui renforce votre capacité à voir au-delà des apparences. Votre intuition est particulièrement fiable en ce moment — faites-lui confiance même si votre mental résiste.</p><p>Cette heure vous invite à regarder votre situation sous un angle différent. Ce que vous percevez comme un obstacle cache peut-être une opportunité déguisée.</p>"},
  "21h12":{type:"inverse",heure:"21h12",message:"Harmonie entre raison et intuition",ange:"Yeiayel",
    flash:"Écoutez votre tête et votre cœur en même temps : la vraie réponse satisfait les deux.",
    texte:"<p>L'heure inversée 21h12 vous invite à réconcilier votre raison et votre intuition. Trop souvent, nous faisons primer l'une sur l'autre. La sagesse réside dans l'équilibre entre ces deux facultés complémentaires.</p><p>Dans la décision que vous devez prendre, écoutez à la fois votre tête et votre cœur. La réponse juste est celle qui satisfait les deux.</p>"},
  "23h32":{type:"inverse",heure:"23h32",message:"Message des profondeurs de la nuit",ange:"Haheuiah",
    flash:"Une vérité longtemps tue cherche à remonter à la surface. Accordez-lui le silence.",
    texte:"<p>23h32, heure de la nuit profonde, vous transmet un message des couches les plus profondes de votre inconscient. Quelque chose cherche à remonter à la surface de votre conscience — une vérité, un désir longtemps refoulé.</p><p>Accordez-vous un moment de silence et d'écoute intérieure. Ce message nocturne peut changer votre vision de vous-même et de votre chemin de vie.</p>"},
  "01h10":{type:"inverse",heure:"01h10",message:"Nouveau départ après une longue nuit",ange:"Jeliel",
    flash:"L'aube pointe après la période difficile. Vos efforts vont bientôt payer.",
    texte:"<p>L'heure inversée 01h10 symbolise le nouveau départ après une période sombre ou difficile. Comme l'aube qui commence à pointer dans la nuit, une lumière nouvelle entre dans votre vie.</p><p>Les efforts que vous avez fournis durant cette période difficile vont bientôt porter leurs fruits. La persévérance est récompensée — continuez à avancer.</p>"},
  "02h20":{type:"inverse",heure:"02h20",message:"Relations et réciprocité",ange:"Sitael",
    flash:"Y a-t-il quelqu'un que vous n'avez pas assez remercié dernièrement ?",
    texte:"<p>02h20, heure inversée de la dualité, vous parle de réciprocité dans vos relations. Y a-t-il quelqu'un dans votre entourage envers qui vous n'exprimez pas suffisamment votre affection ou votre reconnaissance ?</p><p>L'univers vous invite à rééquilibrer vos échanges affectifs. L'amour et l'amitié se nourrissent de réciprocité et d'attention mutuelle.</p>"},
  "03h30":{type:"inverse",heure:"03h30",message:"Éveil créatif à l'heure des songes",ange:"Elemiah",
    flash:"Notez ce que vous venez de rêver — une idée précieuse s'y cache peut-être.",
    texte:"<p>03h30, l'heure mystérieuse du milieu de la nuit. Cette heure inversée est associée à l'éveil créatif et aux messages qui viennent de votre subconscient à travers les rêves. Notez ce que vous venez de rêver.</p><p>Les créateurs, artistes et visionnaires ressentent souvent un éveil particulier à cette heure. Si une idée vous est venue, ne la laissez pas s'échapper — notez-la immédiatement.</p>"},
  "04h40":{type:"inverse",heure:"04h40",message:"Travail nocturne de l'âme",ange:"Mahasiah",
    flash:"Votre évolution intérieure avance, même dans le silence et l'invisible.",
    texte:"<p>04h40 est l'heure où l'âme travaille en profondeur, loin du bruit du monde. Cette heure inversée vous invite à honorer le travail invisible que vous accomplissez sur vous-même, même quand vous ne le voyez pas.</p><p>Votre évolution intérieure se poursuit même dans le silence et l'obscurité. Faites confiance au processus — vous progressez bien plus que vous ne le pensez.</p>"},
  "05h50":{type:"inverse",heure:"05h50",message:"L'aube d'une liberté nouvelle",ange:"Lelahel",
    flash:"Le changement que vous repoussiez est peut-être déjà en train de vous libérer.",
    texte:"<p>05h50, heure inversée du changement, vous invite à regarder différemment une situation que vous jugiez instable. Ce qui bouge dans votre vie en ce moment n'est pas une menace, mais une ouverture vers plus de liberté.</p><p>Cette heure symétrique vous rappelle que la liberté véritable naît souvent d'un changement d'abord redouté. Faites confiance au mouvement plutôt que de vous y opposer.</p>"},
};



function initHeuresMiroirs(){
  var m=Object.entries(HEURES_MIROIRS).filter(function(e){return e[1].type==='miroir';});
  var inv=Object.entries(HEURES_MIROIRS).filter(function(e){return e[1].type==='inverse';});
  function mk(h,data,gridId){
    var g=document.getElementById(gridId);if(!g)return;
    var btn=document.createElement('button');btn.className='heure-btn';btn.setAttribute('data-heure',h);
    btn.innerHTML='<span class="hb-t">'+data.heure+'</span><span class="hb-a">'+data.ange+'</span>';
    btn.onclick=function(){afficherMiroir(h);};
    g.appendChild(btn);
  }
  m.forEach(function(e){mk(e[0],e[1],'mGrid');});
  inv.forEach(function(e){mk(e[0],e[1],'iGrid');});
}
function switchTab(t){
  document.getElementById('tabM').classList.toggle('active',t==='miroir');
  document.getElementById('tabI').classList.toggle('active',t==='inverse');
  document.getElementById('gridM').style.display=t==='miroir'?'block':'none';
  document.getElementById('gridI').style.display=t==='inverse'?'block':'none';
  document.getElementById('mDisplay').classList.remove('show');
}
function afficherMiroir(h){
  var data=HEURES_MIROIRS[h];if(!data)return;
  document.querySelectorAll('.heure-btn').forEach(function(b){b.classList.remove('sel');});
  document.querySelector('[data-heure="'+h+'"]').classList.add('sel');
  document.getElementById('mdTime').textContent=data.heure;
  document.getElementById('mdBadge').innerHTML=data.type==='miroir'?'<span class="badge-m">Heure miroir</span>':'<span class="badge-i">Heure inversée</span>';
  document.getElementById('mdMsg').textContent=data.message;
  document.getElementById('mdText').innerHTML=data.texte;
  document.getElementById('mdAnge').innerHTML='Ange associé : <strong>'+data.ange+'</strong>';

  var horoBlock=document.getElementById('mdHoroscope');
  if(horoBlock){
    horoBlock.style.display='block';
    if(typeof insererFormulaireHoroscope==='function' && !horoBlock.dataset.injecte){
      insererFormulaireHoroscope('horoscope-form-miroir');
      horoBlock.dataset.injecte='1';
    }
  }

  var flashEl=document.getElementById('mdFlash');
  if(flashEl){
    if(data.flash){flashEl.textContent=data.flash;flashEl.style.display='block';}
    else{flashEl.style.display='none';}
  }

  var extraEl=document.getElementById('mdExtra');
  if(extraEl){
    if(data.type==='miroir' && data.hh!==undefined){
      var num=numeroOf(data.hh);
      var numTxt=NUMERO_MEANINGS[String(num)]||'';
      var tar=tarotOf(data.hh);
      var html='';
      html+='<div class="md-card"><h4>&#128149; En amour</h4><p>'+(data.amour||'')+'</p></div>';
      html+='<div class="md-card"><h4>&#128302; Numérologie</h4><p class="md-card-num">Nombre '+num+(num===11||num===22?' (maître)':'')+'</p><p>'+numTxt+'</p></div>';
      if(tar){
        html+='<div class="md-card"><h4>&#127183; Écho du Tarot</h4><p class="md-card-num">'+tar.n+'</p><p>'+tar.t+'</p></div>';
      } else {
        html+='<div class="md-card"><h4>&#127183; Écho du Tarot</h4><p>Cette heure dépasse les 22 arcanes majeurs — elle porte sa propre puissance, au-delà du Tarot classique.</p></div>';
      }
      extraEl.innerHTML=html;
      extraEl.style.display='grid';
    } else {
      extraEl.innerHTML='';
      extraEl.style.display='none';
    }
  }

  var d=document.getElementById('mDisplay');d.classList.add('show');
  d.scrollIntoView({behavior:'smooth',block:'nearest'});
}
document.addEventListener('DOMContentLoaded',function(){
  if(document.getElementById('mGrid'))initHeuresMiroirs();
});
