/* ============================================
   MR Usinagens — JavaScript Principal
   ============================================ */

(function () {
  'use strict';

  /* ---------- Configuração do WhatsApp ---------- */
  var WHATSAPP_NUMBER = '5549987654321';

  function buildWhatsAppLink(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  /* ---------- Inicializar links do WhatsApp ---------- */
  function initWhatsAppLinks() {
    var links = document.querySelectorAll('[data-wa-msg]');
    links.forEach(function (el) {
      var msg = el.getAttribute('data-wa-msg') || '';
      el.setAttribute('href', buildWhatsAppLink(msg));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });
  }

  /* ---------- Menu Móvel ---------- */
  function initMobileMenu() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    function closeMenu() {
      toggle.classList.remove('is-open');
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu de navegação');
      document.body.style.overflow = '';
    }

    function openMenu() {
      toggle.classList.add('is-open');
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu de navegação');
      if (window.innerWidth < 1024) {
        document.body.style.overflow = 'hidden';
      }
    }

    toggle.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Fechar ao clicar em link */
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    /* Fechar ao redimensionar para desktop */
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    });

    /* Fechar ao pressionar Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ---------- Header: estado ao rolar ---------- */
  function initHeaderScroll() {
    var header = document.getElementById('header');
    if (!header) return;

    var lastY = 0;

    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      if (y > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      lastY = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Animações de entrada (scroll reveal) ---------- */
  function initScrollReveal() {
    var elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Botão flutuante do WhatsApp ---------- */
  function initFloatingButton() {
    var btn = document.querySelector('.wa-float');
    if (!btn) return;

    function onScroll() {
      if (window.scrollY > 400) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Ano no rodapé ---------- */
  function initFooterYear() {
    var el = document.getElementById('footerYear');
    if (el) {
      el.textContent = new Date().getFullYear();
    }
  }

  /* ---------- Formulário de contato ---------- */
  function initForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var note = document.getElementById('formNote');

    function showError(fieldId, message) {
      var errorEl = document.getElementById('error-' + fieldId);
      var inputEl = document.getElementById(fieldId);
      if (errorEl) errorEl.textContent = message;
      if (inputEl) inputEl.classList.add('is-invalid');
    }

    function clearError(fieldId) {
      var errorEl = document.getElementById('error-' + fieldId);
      var inputEl = document.getElementById(fieldId);
      if (errorEl) errorEl.textContent = '';
      if (inputEl) inputEl.classList.remove('is-invalid');
    }

    function clearAllErrors() {
      var errors = form.querySelectorAll('.form__error');
      errors.forEach(function (el) { el.textContent = ''; });
      var inputs = form.querySelectorAll('.is-invalid');
      inputs.forEach(function (el) { el.classList.remove('is-invalid'); });
      if (note) {
        note.textContent = '';
        note.classList.remove('is-error', 'is-success');
      }
    }

    /* Limpar erro ao digitar */
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        clearError(field.id);
      });
      field.addEventListener('change', function () {
        clearError(field.id);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearAllErrors();

      var nome = document.getElementById('nome');
      var telefone = document.getElementById('telefone');
      var segmento = document.getElementById('segmento');
      var descricao = document.getElementById('descricao');
      var empresa = document.getElementById('empresa');

      var valid = true;

      if (!nome.value.trim()) {
        showError('nome', 'Informe seu nome.');
        valid = false;
      }

      if (!telefone.value.trim()) {
        showError('telefone', 'Informe um telefone ou WhatsApp para contato.');
        valid = false;
      }

      if (!segmento.value) {
        showError('segmento', 'Selecione um segmento de atuação.');
        valid = false;
      }

      if (!descricao.value.trim()) {
        showError('descricao', 'Descreva sua necessidade para que possamos orientá-lo.');
        valid = false;
      }

      if (!valid) {
        if (note) {
          note.textContent = 'Preencha os campos obrigatórios para continuar.';
          note.classList.add('is-error');
        }
        var firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      /* Construir mensagem do WhatsApp */
      var msg = 'Olá! Conheci a MR Usinagens pelo site e gostaria de consultar um estampo para minha aplicação.\n\n';
      msg += 'Nome: ' + nome.value.trim() + '\n';
      if (empresa.value.trim()) {
        msg += 'Empresa: ' + empresa.value.trim() + '\n';
      }
      msg += 'Telefone: ' + telefone.value.trim() + '\n';
      msg += 'Segmento: ' + segmento.value + '\n';
      msg += 'Necessidade: ' + descricao.value.trim();

      var url = buildWhatsAppLink(msg);
      window.open(url, '_blank', 'noopener,noreferrer');

      if (note) {
        note.textContent = 'Abrindo o WhatsApp com suas informações preenchidas.';
        note.classList.add('is-success');
      }

      form.reset();
    });
  }

  /* ---------- Inicialização ---------- */
  function init() {
    initWhatsAppLinks();
    initMobileMenu();
    initHeaderScroll();
    initScrollReveal();
    initFloatingButton();
    initFooterYear();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
