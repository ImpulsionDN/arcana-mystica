// =====================================================================
// Worker Cloudflare — arcana-tirages-oracles
// Aimant gratuit : « 4 tirages d'oracle expliqués » — tirages-oracles.html
//
// NOTE DE TRANSPARENCE : comme pour worker-previsions-amour.js, il n'existe
// dans ce dépôt aucun Worker/formulaire Brevo réutilisable à copier — le
// PDF de l'ebook "Demandez à l'Univers" n'est relié à aucune automation
// existante. Ce fichier est une brique NEUVE, construite sur le même
// squelette de sécurité que les Workers produit (vérification des
// secrets, validation stricte, CORS), mais sans paiement à vérifier :
// son seul rôle est d'ajouter le contact à la liste Brevo dédiée.
// L'envoi du PDF n'est PAS fait par ce Worker : il est délégué à une
// automation Brevo (dans ton dashboard), déclenchée par "entrée dans
// cette liste", qui envoie email_bienvenue_arcana.html (version A) avec
// le lien du PDF. Ce Worker ne fait qu'inscrire le contact.
//
// ---------------------------------------------------------------------
// VARIABLES D'ENVIRONNEMENT / SECRETS À CONFIGURER SUR CLOUDFLARE
// (Worker → Settings → Variables and Secrets) — noms uniquement :
//   BREVO_API_KEY   (clé API Brevo, avec droit "Contacts")
//   BREVO_LIST_ID   (identifiant numérique de la liste dédiée à cette
//                    fiche, créée dans Brevo → Contacts → Listes)
// ---------------------------------------------------------------------
//
// Contrat attendu côté tirages-oracles.html : POST { email }
// Réponse : { ok:true } ou { ok:false, erreur }
// =====================================================================

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== 'POST') {
      return json({ ok: false, erreur: 'Méthode non supportée.' }, 405, cors);
    }

    // --- Garde-fou : présence des secrets obligatoires ---
    const manquants = ['BREVO_API_KEY', 'BREVO_LIST_ID'].filter(function (k) { return !env[k]; });
    if (manquants.length) {
      console.error('Variables d\'environnement manquantes :', manquants.join(', '));
      return json({ ok: false, erreur: 'Configuration serveur incomplète. Merci de réessayer plus tard.' }, 500, cors);
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return json({ ok: false, erreur: 'Requête invalide.' }, 400, cors);
    }

    const email = (body && body.email || '').toString().trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
      return json({ ok: false, erreur: 'Merci d\'indiquer un email valide.' }, 400, cors);
    }

    const listId = parseInt(env.BREVO_LIST_ID, 10);
    if (!listId) {
      console.error('BREVO_LIST_ID invalide :', env.BREVO_LIST_ID);
      return json({ ok: false, erreur: 'Configuration serveur incomplète. Merci de réessayer plus tard.' }, 500, cors);
    }

    // --- Création/mise à jour du contact Brevo, ajouté à la liste dédiée ---
    // Brevo renvoie 201 (contact créé) ou 204 (contact existant, mis à
    // jour grâce à updateEnabled:true) — les deux sont un succès ici.
    try {
      const r = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'api-key': env.BREVO_API_KEY
        },
        body: JSON.stringify({ email: email, listIds: [listId], updateEnabled: true })
      });

      if (r.status !== 201 && r.status !== 204) {
        const detail = await r.text().catch(function () { return ''; });
        console.error('Brevo API HTTP ' + r.status + ' : ' + detail);
        return json({ ok: false, erreur: 'Une erreur empêche votre inscription pour le moment. Réessayez dans quelques instants.' }, 502, cors);
      }
    } catch (e) {
      console.error('Échec appel Brevo :', e && e.message);
      return json({ ok: false, erreur: 'Une erreur de connexion empêche votre inscription. Réessayez dans quelques instants.' }, 502, cors);
    }

    return json({ ok: true }, 200, cors);
  }
};

function json(obj, status, extraHeaders) {
  return new Response(JSON.stringify(obj), {
    status: status,
    headers: Object.assign({ 'Content-Type': 'application/json' }, extraHeaders || {})
  });
}
