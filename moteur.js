/* ===================== MOTEUR SYNASTRIE AUTOMATIQUE ===================== */

const SIGNES = [
  {nom:"Bélier", debut:[3,21], fin:[4,19], element:"Feu",
    soleil:"Vous êtes animé(e) d'une énergie pionnière : vous aimez initier, oser, foncer là où d'autres hésitent. Votre franchise et votre courage inspirent votre entourage, même si votre impatience naturelle vous pousse parfois à vouloir tout, tout de suite. Votre force est là : dans cet élan qui ne demande qu'à être canalisé vers de grands projets.",
    amour:"En amour, vous aimez conquérir plus qu'être conquis(e). La déclaration franche et l'élan spontané vous ressemblent bien plus que la stratégie de séduction. Une fois engagé(e), votre loyauté est totale, à condition que la flamme reste vivante."},
  {nom:"Taureau", debut:[4,20], fin:[5,20], element:"Terre",
    soleil:"Vous incarnez la stabilité, la sensualité et la persévérance. Ce que vous construisez, vous le construisez pour durer. Votre attachement au confort, à la beauté et aux plaisirs simples de la vie n'est pas un caprice : c'est votre façon d'honorer l'existence. Votre patience est une force rare dans un monde pressé.",
    amour:"En amour, vous cherchez la sécurité et la sensualité avant tout. Vous n'aimez pas à la légère, mais quand c'est le cas, c'est pour construire quelque chose qui dure. La fidélité et la présence sont votre langage d'amour."},
  {nom:"Gémeaux", debut:[5,21], fin:[6,20], element:"Air",
    soleil:"Curieux(se) et vif(ve) d'esprit, vous butinez les idées, les rencontres et les expériences avec un appétit inépuisable. Votre don pour les mots et votre adaptabilité sont vos plus grands atouts. Votre esprit a besoin de mouvement autant que de matière à penser : offrez-lui de la diversité, il vous le rendra en créativité.",
    amour:"En amour, c'est d'abord la tête qui doit être séduite : sans complicité intellectuelle et sans rire partagé, rien ne se passe vraiment. Vous avez besoin de variété et de conversation pour que la flamme reste vive."},
  {nom:"Cancer", debut:[6,21], fin:[7,22], element:"Eau",
    soleil:"Votre sensibilité est une boussole : vous ressentez les atmosphères, protégez ceux que vous aimez, et créez du foyer partout où vous passez. Votre mémoire affective est immense, et votre intuition, précieuse. Ce que le monde perçoit parfois comme de la vulnérabilité est en réalité une profondeur de cœur rare.",
    amour:"En amour, vous donnez tout, sans compter, dès que la confiance est là. Le foyer et la famille sont au cœur de votre vision du couple. Votre sensibilité a besoin d'être rassurée régulièrement pour s'épanouir."},
  {nom:"Lion", debut:[7,23], fin:[8,22], element:"Feu",
    soleil:"Vous êtes fait(e) pour rayonner. Votre générosité, votre créativité et votre besoin d'être reconnu(e) ne sont pas de la vanité : c'est le feu qui vous pousse à donner le meilleur de vous-même et à illuminer ceux qui vous entourent. Votre cœur est grand, et votre loyauté, indéfectible.",
    amour:"En amour, vous aimez avec générosité et panache, souvent de façon spectaculaire. Vous avez besoin d'admiration et de gestes visibles. En retour, votre loyauté est sans faille."},
  {nom:"Vierge", debut:[8,23], fin:[9,22], element:"Terre",
    soleil:"Votre sens du détail et votre volonté d'être utile sont précieux : vous voyez ce que d'autres ne voient pas, et vous savez transformer le chaos en ordre. Votre exigence envers vous-même est grande — apprenez à la doser avec autant de bienveillance que vous en offrez aux autres.",
    amour:"En amour, vous montrez votre attachement par les actes plus que par les mots : un service rendu vaut mille déclarations. Vous avez besoin de sentir que la relation progresse concrètement pour vous sentir en sécurité."},
  {nom:"Balance", debut:[9,23], fin:[10,22], element:"Air",
    soleil:"Votre quête d'harmonie et de justice guide vos choix. Vous avez un sens esthétique raffiné et un talent naturel pour la diplomatie. Votre besoin de relation et d'équilibre n'est pas une faiblesse : c'est ce qui vous rend capable de créer du lien là où d'autres créent de la division.",
    amour:"En amour, vous êtes fait(e) pour la relation à deux — le couple est presque une nécessité pour vous. Charme et diplomatie sont vos outils naturels de séduction, et l'harmonie prime sur tout."},
  {nom:"Scorpion", debut:[10,23], fin:[11,21], element:"Eau",
    soleil:"Votre intensité est votre signature : vous ressentez tout en profondeur, et vous avez un instinct rare pour percevoir ce qui se cache sous la surface. Votre pouvoir de transformation — de vous-même comme des situations — est immense. Ce que l'on prend parfois pour du mystère est en réalité une force de régénération peu commune.",
    amour:"En amour, vous ne faites rien à moitié : la fusion, l'intensité et la loyauté absolue sont votre marque. La confiance se mérite, mais une fois acquise, votre engagement est total."},
  {nom:"Sagittaire", debut:[11,22], fin:[12,21], element:"Feu",
    soleil:"Votre soif de sens et d'horizons larges vous pousse à explorer, apprendre, voyager — que ce soit à travers le monde ou à travers les idées. Votre optimisme et votre franchise sont contagieux. Vous avez besoin de liberté comme d'autres ont besoin d'air : offrez-vous-en, votre joie de vivre en dépend.",
    amour:"En amour, vous avez besoin de liberté et d'aventure partagée — un couple qui s'enferme dans la routine vous étouffe. Votre franchise cache une générosité de cœur sincère et un vrai désir de grandir à deux."},
  {nom:"Capricorne", debut:[12,22], fin:[1,19], element:"Terre",
    soleil:"Votre discipline et votre ambition tranquille vous permettent de construire, pierre après pierre, ce que d'autres abandonnent en route. Votre sens des responsabilités est grand, et votre patience finit toujours par porter ses fruits. Derrière votre sérieux se cache souvent un humour discret que seuls les proches connaissent.",
    amour:"En amour, vous avancez lentement mais sûrement : la confiance se construit avec le temps, jamais dans la précipitation. Une fois l'engagement pris, il est sérieux et durable."},
  {nom:"Verseau", debut:[1,20], fin:[2,18], element:"Air",
    soleil:"Votre originalité et votre indépendance d'esprit vous rendent précieux(se) : vous voyez le monde sous un angle différent, et cette différence est votre plus grande richesse. Votre engagement pour des causes plus grandes que vous-même révèle un idéalisme sincère. Vous êtes fait(e) pour innover, pas pour suivre.",
    amour:"En amour, vous avez besoin d'un(e) partenaire qui soit aussi un(e) ami(e) proche, avec qui partager des idées autant que des sentiments. L'indépendance reste précieuse même en couple."},
  {nom:"Poissons", debut:[2,19], fin:[3,20], element:"Eau",
    soleil:"Votre sensibilité et votre imagination sont sans limites : vous ressentez le monde à travers un voile poétique qui vous permet de créer, de compatir et de rêver plus grand que la réalité ne le permet parfois. Votre intuition est un don rare — apprenez à lui faire confiance autant qu'à votre raison.",
    amour:"En amour, vous vous fondez complètement dans la relation, parfois jusqu'à en perdre vos propres contours. Votre romantisme et votre empathie sont sans limites — gardez un peu d'ancrage pour ne pas vous oublier."}
];

function getSigne(jour, mois){
  for(const s of SIGNES){
    const [dm, dj] = s.debut, [fm, fj] = s.fin;
    if(dm === fm){ if(mois===dm && jour>=dj && jour<=fj) return s; }
    else if(dm < fm){ if((mois===dm && jour>=dj) || (mois===fm && jour<=fj) || (mois>dm && mois<fm)) return s; }
    else { if((mois===dm && jour>=dj) || (mois===fm && jour<=fj) || mois>dm || mois<fm) return s; }
  }
  return SIGNES[0];
}

const CHEMIN_VIE = {
  1:"Leader né, indépendant, vous tracez votre propre voie plutôt que de suivre celle des autres. L'initiative et l'audace sont vos meilleurs alliés.",
  2:"Diplomate et sensible, vous êtes fait(e) pour la coopération et les relations profondes. Votre force est dans l'écoute et la patience.",
  3:"Créatif(ve) et expressif(ve), vous rayonnez par la communication, la joie et l'art sous toutes ses formes. Le partage est votre moteur.",
  4:"Bâtisseur(euse) rigoureux(se), vous avez besoin de structure et de stabilité pour vous épanouir. Ce que vous construisez dure.",
  5:"Épris(e) de liberté, vous vous adaptez vite au changement et avez besoin de mouvement pour vous sentir vivant(e).",
  6:"Protecteur(rice) et responsable, vous êtes dévoué(e) à l'harmonie de votre foyer et de vos proches. L'amour est votre boussole.",
  7:"Chercheur(euse) de sens, introspectif(ve) et analytique, vous avez besoin de comprendre en profondeur avant d'agir.",
  8:"Ambitieux(se) et doué(e) pour le pouvoir, vous avez un vrai talent pour concrétiser vos projets et atteindre la réussite matérielle.",
  9:"Humaniste et généreux(se), vous êtes tourné(e) vers une mission plus grande que vous-même. Le don de soi vous accomplit.",
  11:"Nombre maître : votre intuition est exceptionnelle. Inspirateur(rice) né(e), vous ressentez plus que vous n'analysez.",
  22:"Nombre maître : vous êtes bâtisseur(euse) visionnaire, capable de transformer un grand rêve en réalité concrète et durable.",
  33:"Nombre maître : guide et enseignant(e) dans l'âme, vous êtes porté(e) par un idéal de service désintéressé envers les autres."
};

function reduceNum(n){
  while(n>9 && n!==11 && n!==22 && n!==33){
    n = String(n).split('').reduce((a,b)=>a+Number(b),0);
  }
  return n;
}
function cheminDeVie(jour, mois, annee){
  const digits = (''+jour+mois+annee).split('').map(Number);
  const sum = digits.reduce((a,b)=>a+b,0);
  return reduceNum(sum);
}

/* Compatibilité des éléments (10 combinaisons uniques) */
const ELEMENT_COMPAT = {
  "Feu-Feu":{score:86, texte:"Deux natures de Feu ensemble, c'est une énergie double et une passion qui ne s'éteint jamais vraiment. La complicité est immédiate, presque évidente — mais attention à ne pas transformer votre belle énergie commune en rivalité. Laissez de la place à la douceur entre deux élans."},
  "Terre-Terre":{score:84, texte:"Deux natures de Terre ensemble construisent une relation d'une stabilité rare : on sait où l'on va, on avance ensemble, pierre après pierre. Le seul risque est de s'installer dans une routine trop confortable — pensez à vous surprendre de temps en temps."},
  "Air-Air":{score:82, texte:"Deux natures d'Air ensemble créent une complicité intellectuelle rare : on se comprend à demi-mot, les idées circulent, la légèreté est au rendez-vous. Veillez simplement à ne pas rester uniquement dans la tête — l'ancrage émotionnel se cultive à deux."},
  "Eau-Eau":{score:85, texte:"Deux natures d'Eau ensemble vivent une fusion émotionnelle intense, presque télépathique. L'intuition partagée est un vrai cadeau — à condition de garder chacun un peu de terre ferme sous les pieds pour ne pas se noyer dans trop de sensibilité."},
  "Feu-Air":{score:88, texte:"L'alliance classique et la plus dynamique du zodiaque : l'Air nourrit le Feu, qui à son tour illumine l'Air. Vos énergies et vos idées se combinent naturellement bien, dans un mouvement qui s'auto-alimente. Une belle synergie, vivante et stimulante."},
  "Feu-Terre":{score:62, texte:"L'attirance peut être forte, mais vos rythmes diffèrent sensiblement : le Feu avance vite et par impulsion, la Terre a besoin de temps et de preuves concrètes. Avec de la patience de part et d'autre, cette différence peut devenir un bel équilibre plutôt qu'une source de friction."},
  "Feu-Eau":{score:58, texte:"Une rencontre entre passion et émotion, pleine d'alchimie potentielle — mais aussi de vigilance : le Feu peut assécher l'Eau par son intensité, et l'Eau peut éteindre le Feu par excès de prudence. Le dialogue sincère sur vos besoins respectifs est ici la vraie clé."},
  "Terre-Air":{score:60, texte:"La Terre cherche du concret et de la sécurité, l'Air a besoin de liberté et de mouvement : le décalage de rythme est réel. Ce n'est pas incompatible, mais cela demande à chacun de faire un pas vers l'autre, sans perdre sa propre nature."},
  "Terre-Eau":{score:87, texte:"Une alliance nourricière et classique : la Terre contient et rassure l'Eau, l'Eau irrigue et adoucit la Terre. C'est une combinaison naturellement complémentaire, propice à une relation stable et affectueuse dans la durée."},
  "Air-Eau":{score:64, texte:"L'Air rationalise ce que l'Eau ressent en profondeur : vos langages intérieurs ne sont pas les mêmes, et un effort de traduction mutuelle est nécessaire. Une fois ce pont établi, la complémentarité entre réflexion et intuition peut être très riche."}
};
function compatElements(e1, e2){
  const key1 = e1+"-"+e2, key2 = e2+"-"+e1;
  return ELEMENT_COMPAT[key1] || ELEMENT_COMPAT[key2];
}

/* Compatibilité numérologique (écart entre chemins de vie) */
function numeroEquiv(n){ return n===11?2:(n===22?4:(n===33?6:n)); }
const NUMERO_COMPAT_BANDES = [
  {max:0, score:90, texte:"Vous partagez la même vibration de fond : une vision de la vie et des priorités très proches, qui crée une compréhension mutuelle presque instantanée."},
  {max:2, score:78, texte:"Vos chemins de vie sont proches : assez semblables pour se comprendre facilement, assez différents pour continuer à s'apprendre l'un l'autre."},
  {max:4, score:66, texte:"Vos chemins de vie demandent un vrai effort de traduction mutuelle : vos priorités de fond ne sont pas les mêmes, mais cette différence peut devenir une vraie richesse si vous apprenez à l'accueillir."},
  {max:99, score:56, texte:"Vos chemins de vie sont très contrastés : vos moteurs profonds diffèrent nettement. C'est un vrai défi de couple, mais aussi une formidable occasion de grandir au contact d'une façon de vivre très différente de la vôtre."}
];
function compatNumero(n1, n2){
  const diff = Math.abs(numeroEquiv(n1) - numeroEquiv(n2));
  for(const b of NUMERO_COMPAT_BANDES){ if(diff<=b.max) return b; }
  return NUMERO_COMPAT_BANDES[NUMERO_COMPAT_BANDES.length-1];
}
