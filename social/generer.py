#!/usr/bin/env python3
"""Générateur des publications quotidiennes Oracle Arcana (Instagram, Pinterest, TikTok via Metricool).

Utilisation :
  python3 social/generer.py              -> choisit le prochain sujet, crée le visuel, affiche la fiche JSON
  python3 social/generer.py --valider ID POST_ID DATE   -> inscrit le sujet dans le journal (après programmation Metricool)

Le calendrier est infini et déterministe : un cycle de 7 jours
  miroir, nombre, produit payant, heure inversée, miroir, contenu gratuit, produit payant
Chaque sujet a un identifiant unique ; un sujet déjà présent dans journal.json n'est jamais republié.
"""
import html, json, os, sys, shutil, subprocess

ICI = os.path.dirname(os.path.abspath(__file__))
SITE = "https://oracle-arcana.fr"
JOURNAL = os.path.join(ICI, "journal.json")

NOMBRES = [
    ("000", "Renouveau", "Nouveau départ, page blanche.", "Une page blanche s'offre à toi."),
    ("111", "Manifestation", "Tes pensées se matérialisent.", "Pense fort à ce que tu désires."),
    ("222", "Harmonie", "Équilibre et confiance.", "Fais confiance : tout se met en place."),
    ("333", "Guidance", "Tes guides sont présents.", "Tu n'avances pas seul(e)."),
    ("444", "Protection", "Un soutien bienveillant t'entoure.", "Tu es protégé(e), avance sereinement."),
    ("555", "Changement", "Transformation et liberté.", "Un grand changement se prépare."),
    ("666", "Recentrage", "Reviens à ton équilibre intérieur.", "Prends soin de toi d'abord."),
    ("777", "Chance", "Alignement spirituel.", "Tu es sur le bon chemin."),
    ("888", "Abondance", "Prospérité et réussite.", "L'abondance frappe à ta porte."),
    ("999", "Accomplissement", "Un cycle s'achève.", "Laisse partir ce qui est terminé."),
]

# (slug page, label, titre 1, titre 2 en italique, [accroche v0, accroche v1], tableau Pinterest, symbole, payant)
PRODUITS = [
    ("previsions-amour", "Amour & Astrologie", "Vos Prévisions", "Amour 12 mois",
     ["Vénus, Mars et Jupiter révèlent<br>votre année amoureuse, mois par mois.", "Que vous réserve l'amour<br>dans les 12 prochains mois ?"],
     "Amour & Astrologie", "♡", True),
    ("human-design", "Human Design", "Votre", "Human Design",
     ["Type, stratégie, autorité intérieure :<br>le mode d'emploi de votre énergie.", "Générateur, Projecteur ou Manifesteur ?<br>Découvrez votre type."],
     "Astrologie & Human Design", "✦", True),
    ("theme-astral", "Astrologie", "Votre Thème", "Astral complet",
     ["Soleil, élément, planète maîtresse<br>et ascendant réellement calculé.", "Votre ciel de naissance<br>raconte qui vous êtes."],
     "Astrologie", "☾", True),
    ("ciel-du-mois", "Astrologie", "Votre Ciel", "du Mois",
     ["Amour, travail, énergie :<br>votre guidance des 30 prochains jours.", "Que vous réservent les astres<br>ce mois-ci ?"],
     "Astrologie", "☾", True),
    ("synastrie", "Compatibilité", "Votre Compatibilité", "Amoureuse",
     ["Signes, éléments et numérologie<br>croisés pour votre couple.", "Êtes-vous vraiment faits<br>l'un pour l'autre ?"],
     "Amour & Astrologie", "♡", True),
    ("annee-personnelle", "Numérologie", "Votre Année", "Personnelle",
     ["Le sens de vos 12 prochains mois<br>selon votre date de naissance.", "Quelle année numérologique<br>êtes-vous en train de vivre ?"],
     "numerologie", "✦", True),
]
GRATUITS = [
    ("oracle", "Tirage gratuit", "Tirage", "3 lames",
     ["Passé, présent, avenir :<br>une réponse claire en 3 cartes.", "Une question en tête ?<br>Les cartes vous répondent."],
     "Cartes & Tirages", "✦", False),
    ("astrologie", "Astrologie", "Ton Signe", "Astrologique",
     ["Ton portrait complet :<br>personnalité, amour, forces.", "Ce que ton signe dit vraiment<br>de toi. Gratuitement."],
     "Astrologie", "☾", False),
    ("interpretation-reves", "Interprétation", "Le sens de", "tes Rêves",
     ["46 symboles décodés,<br>gratuitement.", "Serpent, eau, dents qui tombent...<br>Que veut dire ton rêve ?"],
     "Interprétation des Rêves", "☾", False),
    ("angeologie", "Angéologie", "Quel est ton", "ange gardien ?",
     ["Selon ta date de naissance,<br>reçois son message.", "Il veille sur toi depuis ta naissance.<br>Découvre son nom."],
     "Anges Gardiens", "✦", False),
    ("tirages-oracles", "Fiche gratuite", "4 tirages", "d'oracle expliqués",
     ["Belline, Gé, Triade, Miroirs :<br>la fiche imprimable offerte.", "Apprends à tirer les cartes<br>comme une pro."],
     "Cartes & Tirages", "✦", False),
]

CYCLE = ["miroir", "nombre", "payant", "inverse", "miroir", "gratuit", "payant"]


def charger_heures():
    with open(os.path.join(ICI, "donnees-heures.json"), encoding="utf-8") as f:
        h = json.load(f)
    return [x for x in h if x["type"] == "miroir"], [x for x in h if x["type"] == "inverse"]


def sujet(pool, compteur, liste):
    i = compteur.get(pool, 0)
    compteur[pool] = i + 1
    return liste[i % len(liste)], i // len(liste)


def sequence():
    """Génère le calendrier infini de sujets."""
    miroirs, inverses = charger_heures()
    compteur = {}
    jour = 0
    while True:
        pool = CYCLE[jour % len(CYCLE)]
        jour += 1
        if pool in ("miroir", "inverse"):
            h, tour = sujet(pool, compteur, miroirs if pool == "miroir" else inverses)
            page = ("heure-miroir-" if pool == "miroir" else "heure-inversee-") + h["heure"] + ".html"
            yield {
                "id": f"{pool}-{h['heure']}-v{tour}", "gabarit": "nombre",
                "label": "Heures Miroirs" if pool == "miroir" else "Heures Inversées",
                "question": f"Tu vois {h['heure']} partout ?", "grand": h["heure"], "taille": 250,
                "cle": f"Ange {h['ange']}",
                "accroche": (h["message"] + ".<br>Découvre son message.") if tour % 2 == 0 else h["flash"],
                "sujet": f"Heure {'miroir' if pool == 'miroir' else 'inversée'} {h['heure']}, ange {h['ange']} : {h['message']}. {h['flash']}",
                "lien": f"{SITE}/{page}", "tableau": "Heures Miroirs",
                "hashtags": f"#heuremiroir #{h['heure']} #angegardien #{h['ange'].lower().replace(' ', '')} #spiritualite #guidance #oraclearcana",
            }
        elif pool == "nombre":
            (n, cle, a0, a1), tour = sujet(pool, compteur, NOMBRES)
            yield {
                "id": f"nombre-{n}-v{tour}", "gabarit": "nombre", "label": "Nombres Angéliques",
                "question": f"Tu vois {n} partout ?", "grand": n, "taille": 330, "cle": cle,
                "accroche": (a0 if tour % 2 == 0 else a1) + "<br>Vois sa signification.",
                "sujet": f"Nombre angélique {n} : {cle.lower()}. {a0} {a1}",
                "lien": f"{SITE}/nombre-angelique-{n}.html", "tableau": "Nombres Angéliques",
                "hashtags": f"#nombresangeliques #{n} #angegardien #numerologie #spiritualite #signes #oraclearcana",
            }
        else:
            (slug, label, t1, t2, acc, tableau, sym, payant), tour = sujet(pool, compteur, PRODUITS if pool == "payant" else GRATUITS)
            yield {
                "id": f"{pool}-{slug}-v{tour}", "gabarit": "produit", "label": label, "symbole": sym,
                "titre1": t1, "titre2": t2, "accroche": acc[tour % 2],
                "bouton": "Découvrir" if payant else "Gratuit, c'est ici",
                "sujet": f"{t1} {t2} ({'produit payant' if payant else 'outil gratuit'}) : {acc[0].replace('<br>', ' ')}",
                "payant": payant,
                "lien": f"{SITE}/{slug}.html", "tableau": tableau,
                "hashtags": "#astrologie #numerologie #voyance #spiritualite #horoscope #oraclearcana",
            }


CSS = """
@font-face{font-family:'CG';src:url('polices/CormorantGaramond.ttf')}
@font-face{font-family:'CG';font-style:italic;src:url('polices/CormorantGaramond-Italic.ttf')}
@font-face{font-family:'Jost';src:url('polices/Jost.ttf')}
@font-face{font-family:'Nunito';src:url('polices/NunitoSans.ttf')}
:root{--cream:#FAF5E9;--gold:#A8833B;--gold-deep:#8C6E2C;--gold-soft:#C9A24B;--ink:#3C3322;--line:rgba(168,131,59,.28)}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;font-variant-numeric:lining-nums}
.q,.tag,.t1,.t2{font-feature-settings:"lnum" 1}
.pin{width:1080px;height:1350px;position:relative;overflow:hidden;background:radial-gradient(140% 70% at 50% -10%,#FFFDF6 0%,var(--cream) 60%)}
.pin::before{content:"";position:absolute;inset:36px;border:1.5px solid var(--line)}
.pin::after{content:"";position:absolute;inset:48px;border:1px solid var(--line);opacity:.5}
.in{position:relative;z-index:1;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:100px 80px 80px;text-align:center}
.label{font-family:'Jost';font-size:22px;font-weight:500;letter-spacing:9px;color:var(--gold);text-transform:uppercase}
.mid{display:flex;flex-direction:column;align-items:center}
.q{font-family:'CG';font-size:52px;color:var(--ink);margin-bottom:30px}
.num{font-family:'Nunito';font-weight:800;color:var(--gold);line-height:1;text-shadow:0 6px 30px rgba(140,110,44,.18)}
.key{font-family:'Jost';font-size:30px;font-weight:500;letter-spacing:8px;color:var(--gold-deep);text-transform:uppercase;margin-top:28px}
.div{width:110px;height:1.5px;background:var(--gold);opacity:.55;margin:36px auto}
.tag{font-family:'CG';font-style:italic;font-size:40px;line-height:1.45;color:var(--ink);max-width:860px}
.sym{font-size:64px;color:var(--gold-soft);margin-bottom:40px}
.t1{font-family:'CG';font-size:92px;font-weight:500;color:var(--ink);line-height:1.05}
.t2{font-family:'CG';font-style:italic;font-size:104px;color:var(--gold);line-height:1.1}
.btn{margin-top:54px;font-family:'Jost';font-size:26px;font-weight:500;letter-spacing:4px;text-transform:uppercase;color:#FFFDF6;background:var(--gold);padding:22px 54px;border-radius:60px}
.foot{display:flex;flex-direction:column;align-items:center;gap:12px}
.url{font-family:'Jost';font-size:22px;letter-spacing:3px;color:var(--gold-deep)}
.logo{font-family:'CG';font-size:30px;letter-spacing:5px;color:var(--ink)}.logo b{color:var(--gold);font-weight:600}
"""


def page_html(s):
    e = lambda t: html.escape(t).replace("&lt;br&gt;", "<br>")
    if s["gabarit"] == "nombre":
        mid = (f'<div class="q">{e(s["question"])}</div><div class="num" style="font-size:{s["taille"]}px">{e(s["grand"])}</div>'
               f'<div class="key">{e(s["cle"])}</div><div class="div"></div><div class="tag">{e(s["accroche"])}</div>')
    else:
        mid = (f'<div class="sym">{s["symbole"]}</div><div class="t1">{e(s["titre1"])}</div><div class="t2">{e(s["titre2"])}</div>'
               f'<div class="div"></div><div class="tag">{e(s["accroche"])}</div><div class="btn">{e(s["bouton"])} →</div>')
    return (f'<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><style>{CSS}</style></head><body><div class="pin"><div class="in">'
            f'<div class="label">✦ {e(s["label"])} ✦</div><div class="mid">{mid}</div>'
            f'<div class="foot"><div class="url">oracle-arcana.fr</div><div class="logo"><b>ORACLE</b> ARCANA</div></div>'
            f'</div></div></body></html>')


def rendre(s):
    from playwright.sync_api import sync_playwright
    tmp = os.path.join(ICI, "_rendu.html")
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(page_html(s))
    sortie = os.path.join(ICI, "visuels", s["id"] + ".png")
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 1080, "height": 1350})
        pg.goto("file://" + tmp)
        pg.evaluate("document.fonts.ready")
        pg.wait_for_timeout(800)
        pg.screenshot(path=sortie)
        # TikTok refuse le PNG : copie JPEG utilisée comme média pour les trois réseaux
        pg.screenshot(path=sortie[:-4] + ".jpg", type="jpeg", quality=92)
        b.close()
    os.remove(tmp)
    return sortie


def lire_journal():
    if not os.path.exists(JOURNAL):
        return []
    with open(JOURNAL, encoding="utf-8") as f:
        return json.load(f)


def main():
    journal = lire_journal()
    if len(sys.argv) >= 2 and sys.argv[1] == "--valider":
        _, _, ident, post_id, date = sys.argv[:5]
        journal.append({"id": ident, "metricool": post_id, "date": date})
        with open(JOURNAL, "w", encoding="utf-8") as f:
            json.dump(journal, f, ensure_ascii=False, indent=1)
        print("journal mis à jour :", ident)
        return
    faits = {x["id"] for x in journal}
    for s in sequence():
        if s["id"] not in faits:
            break
    s["image_locale"] = rendre(s)
    s["image_url"] = f"{SITE}/social/visuels/{s['id']}.jpg"
    s["accroche"] = s["accroche"].replace("<br>", " ")
    print(json.dumps(s, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
