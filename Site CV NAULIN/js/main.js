/**
 * CV Ingénieur - Script principal
 * Gestion : navigation active, animations au scroll, rendu des expériences et compétences
 */

(function () {
  'use strict';

  /* ---------- Données des expériences (modifier ici pour ajouter/supprimer) ---------- */
  const EXPERIENCES = [
    {
      poste: 'Coordinateur Approvisionnement',
      entreprise: 'HERMES',
      dates: '2023 – Aujourd\'hui',
      description: '- Conception et déploiement du système de pilotage des approvisionnements : définition des processus, structuration des flux d’information et implémentation d’outils de suivi pour 20 fournisseurs, 4 typologies de produit et ~600 références.\n- Développement et automatisation d’outils d’analyse pour fiabiliser les prises de décisions multi-acteurs.\n- Structuration et priorisation des contraintes inter-services (Production, Achats, Développement, Industrialisation, ... ) pour sécuriser le pilotage des approvisionnements.'

    },
    {
      poste: 'Supply Planner',
      entreprise: 'HEINEKEN',
      dates: '2022 – 2023',
      description: '- Planification de production (+100 références, 5 sites et 7 lignes de production) \n- Animation du process S&OP global à toute la supply chain.\n- Développement et optimisation d’outils décisionnels transverses à l’ERP SAP, BlueYonder et Excel (Gain de temps : 11h/sem)'
    },
    {
      poste: 'Responsable Conception Bras robotisé',
      entreprise: 'IRON FORK',
      dates: '2020',
      description: '- Coordination de 5 étudiants-ingénieurs pour la conception d’un bras robotisé : CAO, cinématique, dimensionnement moteurs, cahier des charges.\n youtube.com/ironfork9945'
    },
    {
      poste: 'Modèle de prévisions de stock',
      entreprise: 'ACOLYT',
      dates: '2020',
      description: '- Développement d\'un modèle automatisé de prévisionde stock sous Excel\n- Conduite de projets d’amélioration continue (KAIZEN)'
    }
  ];

  /* ---------- Données des compétences par section (modifier ici pour ajouter/supprimer) ---------- */
  const COMPETENCES = [
    {
      titre: 'Industrie & Digital',
      items: ['Industrie 4.0', 'IoT & capteurs', 'Data & tableaux de bord', 'Automatisation', 'GMAO']
    },
    {
      titre: 'Management & Projet',
      items: ['Gestion de projet', 'Amélioration continue', 'Lean / Six Sigma', 'Animation d\'équipe', 'Reporting']
    },
    {
      titre: 'Techniques',
      items: ['Analyse de processus', 'Modélisation', 'Excel avancé', 'SQL', 'Python']
    }
  ];

  /**
   * Détermine la page courante à partir du nom du fichier HTML
   */
  function getCurrentPage() {
    const path = window.location.pathname;
    const file = path.split('/').pop() || 'index.html';
    return file.replace('.html', '') || 'index';
  }

  /**
   * Met en surbrillance le lien du menu correspondant à la page actuelle
   */
  function setActiveNav() {
    const current = getCurrentPage();
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      const href = link.getAttribute('href');
      const page = (href === 'index.html' || href === '/' || href === '') ? 'index' : href.replace('.html', '');
      link.classList.toggle('active', page === current);
    });
  }

  /**
   * Anime les éléments au scroll (révélation progressive)
   * Utilise IntersectionObserver pour de bonnes perfs
   */
  function initScrollReveal() {
    const selector = '.reveal,.revealtitle, .experience-card, .skills-section, .interest-block';
    const elements = document.querySelectorAll(selector);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }


  // Toggle menu mobile
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
  
    if (!toggle || !navLinks) {
      return; // pas de navbar sur la page → on sort proprement
    }
  
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('show');
    });
  }
  


  /**
   * Construit et injecte les cartes d'expériences dans le conteneur #experiences-list
   */
  function renderExperiences() {
    const container = document.getElementById('experiences-list');
    if (!container) return;

    container.innerHTML = EXPERIENCES.map(function (exp, index) {
      const description = exp.description
      ? exp.description
          .split('\n')      // découpe les lignes
          .map(escapeHtml)  // échappe chaque ligne séparément
          .join('<br>')     // rejoint avec <br> réel
      : '';
      
      return (
        '<article class="experience-card" style="transition-delay: ' + (index * 0.1) + 's">' +
          '<h3>' + escapeHtml(exp.poste) + '</h3>' +
          '<div class="experience-meta">' +
            '<span>' + '<strong>'+ escapeHtml(exp.entreprise) + '</strong>'+ '</span>' +
            '<span class="span2" style="font-style: italic;">' + escapeHtml(exp.dates) + '</span>' +
          '</div>' +
          (description ? '<p>' + description + '</p>' : '') + // <-- retirer escapeHtml ici !
        '</article>'
      );
    }).join('');
  }

  /**
   * Construit et injecte les sections de compétences dans le conteneur #competences-list
   */
  function renderCompetences() {
    const container = document.getElementById('competences-list');
    if (!container) return;

    container.innerHTML = COMPETENCES.map(function (section, index) {
      const itemsHtml = section.items.map(function (item) {
        return '<li>' + escapeHtml(item) + '</li>';
      }).join('');
      return (
        '<section class="skills-section" style="transition-delay: ' + (index * 0.1) + 's">' +
          '<h2>' + escapeHtml(section.titre) + '</h2>' +
          '<ul class="skills-list">' + itemsHtml + '</ul>' +
        '</section>'
      );
    }).join('');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /*
 function flipPhoto() {
  document.querySelector('.hero-photo').addEventListener('click', function() {
    const photo = this;
  
    // Supprime la classe si déjà présente pour pouvoir recliquer
    photo.classList.remove('flipped');
  
    // Force le reflow pour relancer l'animation
    void photo.offsetWidth;
  
    // Ajoute la classe pour lancer la rotation
    photo.classList.add('flipped');
  });
  }*/

/*
function flipPhoto() {
  const borderWrapper = document.querySelector('.photo-border');
  if (!borderWrapper) return;

  borderWrapper.addEventListener('click', function() {
    const element = this;

    // Retire la classe si elle existe pour relancer l'animation
    element.classList.remove('flipped');

    // Force le reflow pour que l'animation redémarre
    void element.offsetWidth;

    // Ajoute la classe qui déclenche la rotation
    element.classList.add('flipped');
    
  });
}
  */

function flipPhoto() {
  const hero = document.querySelector('.photo-border');
  if (!hero) return; // ← FIX CRITIQUE

  let totalRotation = 0;

  function spinHeroPhoto() {
    const spin = Math.random() < 0.5 ? 1620 : 1800;
    totalRotation += spin;
    hero.style.transform = `rotateY(${totalRotation}deg)`;
  }

  hero.addEventListener('click', spinHeroPhoto);
}



  /**
   * Toggle mail : clic affiche l'email, reclic affiche l'icône
   */
  function initMailToggle() {
    document.querySelectorAll('.footer-mail-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var email = btn.getAttribute('data-email');
        if (btn.classList.contains('showing-email')) {
          btn.innerHTML = '<i class="fa-solid fa-envelope"></i>';
          btn.classList.remove('showing-email');
          btn.setAttribute('aria-label', 'Afficher mon email');
        } else {
          btn.textContent = email;
          btn.classList.add('showing-email');
          btn.setAttribute('aria-label', 'Masquer l\'email');
        }
      });
    });
  }

  /**
   * Point d'entrée : exécuté au chargement du DOM
   */
  function init() {
    setActiveNav();
   // renderExperiences();
   // renderCompetences();
    initScrollReveal();
    initMailToggle();
    flipPhoto()
    initMobileNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
