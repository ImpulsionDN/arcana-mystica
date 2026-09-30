# Publication quotidienne Oracle Arcana

Procédure suivie chaque jour par la tâche programmée. Un post par jour, publié à 10h00 (heure de Paris)
sur Instagram (oracle_arcana), Pinterest et TikTok (Oracle Arcana · Voyance), via Metricool.

## Constantes

- Marque Metricool : blogId `5213872`, fuseau `Europe/Paris`
- Dépôt : `ImpulsionDN/arcana-mystica` (branche `main`, publié sur https://oracle-arcana.fr via GitHub Pages)
- Tableau Pinterest « Heures Miroirs » : id `1122803819540123535` (les autres tableaux se passent par leur nom exact :
  « Nombres Angéliques », « Astrologie », « Amour & Astrologie », « Astrologie & Human Design »,
  « Interprétation des Rêves », « Cartes & Tirages », « Anges Gardiens », « numerologie »)

## Étapes

1. **Anti-doublon.** Lire `social/journal.json`. Si une entrée porte déjà la date du jour, s'arrêter : rien à faire.
   Vérifier aussi avec `getScheduledPosts` (du jour à J+1) qu'aucun post n'est déjà programmé à 10h00 aujourd'hui.
2. **Visuel.** `python3 social/generer.py` (Playwright et Chromium sont déjà installés ; les polices sont dans
   `social/polices`). Le script choisit le prochain sujet et affiche une fiche JSON. Ouvrir l'image produite
   (`image_locale`) pour vérifier qu'elle est lisible et sans défaut.
3. **Mise en ligne.** `git add social/visuels` puis commit (auteur ImpulsionDN) et `git push origin main`.
   Attendre 3 minutes le déploiement GitHub Pages.
4. **Légende.** Écrire une légende en français, à partir du champ `sujet` de la fiche :
   - accroche forte en première ligne, 3 à 5 lignes au total, ton chaleureux et mystique, jamais alarmiste ;
   - aucune promesse de résultat (santé, argent, amour garanti) ; rester dans la guidance et le symbolique ;
   - un appel à l'action vers oracle-arcana.fr (« lien dans la bio » pour Instagram) ;
   - une question aux abonnés pour susciter les commentaires ;
   - pour un produit payant (`payant: true`), mettre en avant ce que la personne reçoit, sans insister sur le prix ;
   - terminer par les `hashtags` de la fiche ;
   - varier les formulations d'un jour à l'autre (relire les 5 dernières légendes via `getScheduledPosts` si utile).
5. **Programmation.** `createScheduledPost` pour aujourd'hui 10:00 Europe/Paris (si l'heure est passée : dans
   15 minutes), `autoPublish: true`, `draft: false`, providers instagram, pinterest et tiktok, media = `image_url`,
   `mediaAltText` descriptif, et :
   - `instagramData`: `{"type":"POST","isAiGenerated":true}`
   - `pinterestData`: `{"boardId": <tableau>, "pinTitle": <titre SEO de 100 caractères max>, "pinLink": <lien>, "pinNewFormat": false}`
   - `tiktokData`: `{"title": <accroche courte>, "privacyOption":"PUBLIC_TO_EVERYONE", "autoAddMusic":true, "photoCoverIndex":0, "isAigc":true, "disableComment":false, "disableDuet":false, "disableStitch":false, "commercialContentThirdParty":false, "commercialContentOwnBrand": <true si payant>}`
   Si Metricool refuse l'image (pas encore en ligne), attendre 2 minutes et réessayer une seule fois.
6. **Journal.** `python3 social/generer.py --valider <id> <id du post Metricool> <AAAA-MM-JJ>`, puis commit et push.
7. **Compte rendu.** Un message court : sujet du jour, heure de publication, et tout problème rencontré.

## En cas de problème

Ne jamais publier un visuel défectueux ni une légende douteuse. Si une étape échoue deux fois, s'arrêter
et le signaler dans le compte rendu (sans rien programmer). Ne jamais modifier ni supprimer un post déjà programmé
par quelqu'un d'autre.
