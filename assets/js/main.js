/* The Training Compass ─ language switching and compass dial.
   No libraries. If this file fails to load, the page still shows both document sets. */
(function () {
  'use strict';

  var STORAGE_KEY = 'tc-lang';
  var SUPPORTED = ['en', 'es'];

  // Where the needle points for each language (degrees from north).
  var BEARINGS = { en: '28deg', es: '-28deg' };

  var TEXT = {
    en: {
      metaTitle: 'The Training Compass · Free training guide and workbook',
      metaDesc: 'A free bilingual guide and self-assessment workbook to understand training methods, set your goals, assess your starting point and choose a sustainable training direction.',
      skip: 'Skip to the downloads',
      brand: 'The Training Compass',
      langGroup: 'Language',
      heroTitle: 'Discover your training path.',
      heroLead: 'A free guide and workbook to understand the main ways to train, choose your goals, see where you are starting from and pick a direction you can keep up.',
      heroFree: 'Free PDFs. No sign-up, no email, no payment.',
      heroCta: 'Get the free PDFs',
      west: 'W',
      dlTitle: 'Choose your language',
      dlIntro: 'Read the guide first, then fill in the workbook. Each file downloads straight to your device.',
      stepsTitle: 'Five steps, in order',
      step1: 'Explore the training methods you can realistically access.',
      step2: 'Pick one main goal and, if useful, one or two secondary goals.',
      step3: 'Understand your current physical starting point, by what you can do rather than your body type.',
      step4: 'Notice the activities you enjoy, your schedule and what you need to recover.',
      step5: 'Set a preliminary direction and note what needs a closer look.',
      stepsNote: 'The result is a starting direction, not a finished program. Repeat the workbook after a few weeks of consistent training to see what changed.',
      coachTitle: 'Want help with your results?',
      coachBody: 'Personalized assessments and coaching are available, online or in person, if you want help turning your workbook into an individual training approach.',
      coachLink: 'Message me on Instagram',
      footerNote: 'An educational resource. It doesn’t diagnose medical conditions, replace a health professional or prescribe individual exercise. If you have pain, an injury or a health condition, talk to a qualified professional before starting a new program.'
    },
    es: {
      metaTitle: 'La Brújula del Entrenamiento · Guía y cuaderno gratuitos',
      metaDesc: 'Una guía y un cuaderno de autoevaluación gratuitos, en español e inglés, para entender los métodos de entrenamiento, definir tus objetivos, evaluar tu punto de partida y elegir una dirección sostenible.',
      skip: 'Ir a las descargas',
      brand: 'La Brújula del Entrenamiento',
      langGroup: 'Idioma',
      heroTitle: 'Descubre tu camino de entrenamiento.',
      heroLead: 'Una guía y un cuaderno gratuitos para entender las principales formas de entrenar, elegir tus objetivos, ver desde dónde empiezas y tomar una dirección que puedas mantener.',
      heroFree: 'PDF gratuitos. Sin registro, sin correo, sin pago.',
      heroCta: 'Obtener los PDF gratuitos',
      west: 'O',
      dlTitle: 'Elige tu idioma',
      dlIntro: 'Lee primero la guía y después completa el cuaderno. Cada archivo se descarga directo a tu dispositivo.',
      stepsTitle: 'Cinco pasos, en orden',
      step1: 'Explora los métodos de entrenamiento a los que realmente tienes acceso.',
      step2: 'Elige un objetivo principal y, si te sirve, uno o dos secundarios.',
      step3: 'Comprende tu punto de partida físico, según lo que puedes hacer y no según tu tipo de cuerpo.',
      step4: 'Reconoce las actividades que disfrutas, tu horario y lo que necesitas para recuperarte.',
      step5: 'Define una dirección inicial y anota qué requiere una evaluación más detallada.',
      stepsNote: 'El resultado es una dirección inicial, no un programa terminado. Repite el cuaderno después de unas semanas de entrenamiento constante para ver qué cambió.',
      coachTitle: '¿Quieres ayuda con tus resultados?',
      coachBody: 'Hay evaluaciones personalizadas y acompañamiento, en línea o en persona, si quieres ayuda para convertir tu cuaderno en un enfoque de entrenamiento individual.',
      coachLink: 'Escríbeme por Instagram',
      footerNote: 'Recurso educativo. No diagnostica condiciones médicas, no sustituye a un profesional de la salud ni prescribe ejercicio individual. Si tienes dolor, una lesión o una condición de salud, consulta a un profesional calificado antes de empezar un programa nuevo.'
    }
  };

  function readStored() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function store(lang) {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }
  }

  function initialLang() {
    // 1. ?lang=es in the link (useful for Instagram Story links)
    var param = new URLSearchParams(window.location.search).get('lang');
    if (param && SUPPORTED.indexOf(param) !== -1) return param;
    // 2. The visitor's last choice
    var saved = readStored();
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    // 3. The device language
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    return nav.toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  }

  function applyLang(lang, opts) {
    var t = TEXT[lang];
    document.documentElement.lang = lang;
    document.title = t.metaTitle;

    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t.metaDesc);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] != null) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (t[key] != null) el.setAttribute('aria-label', t[key]);
    });

    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-set-lang') === lang));
    });

    document.querySelectorAll('[data-doc-lang]').forEach(function (set) {
      set.hidden = set.getAttribute('data-doc-lang') !== lang;
    });

    var needle = document.getElementById('dial-needle');
    if (needle) needle.style.setProperty('--bearing', BEARINGS[lang]);

    if (opts && opts.remember) {
      store(lang);
      try {
        var url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        window.history.replaceState(null, '', url);
      } catch (e) { /* older browsers: skip */ }
    }
  }

  function init() {
    applyLang(initialLang());

    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.getAttribute('data-set-lang'), { remember: true });
      });
    });

    // After the first settle animation, let language changes swing the needle smoothly.
    var needle = document.getElementById('dial-needle');
    if (needle) {
      needle.addEventListener('animationend', function () { needle.style.animation = 'none'; }, { once: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
