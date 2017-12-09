(function () {

  function create(el) {
    return document.createElement(el);
  }

  function qs(selector, context = document) {
    return context.querySelector(selector);
  }

  function insertBefore(newNode, refNode) {
    refNode.parentNode.insertBefore(newNode, refNode);
  }

  function insertAfter(newNode, refNode) {
    refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
  }

  function getSite() {
    return document.location.host.split('.')[0];
  }

  function hasSite(site) {
    return [
      'www', 'ask', 'metatalk', 'fanfare',
      'projects', 'music'
    ].includes(site);
  }

  function getTheme() {
    const { cookie } = document;
    const theme = Number(cookie.match(/THEME=(\d+);/)[1]);
    switch (theme) {
      case 1: return 'classic';
      case 2: return 'plain';
      case 3: return 'modern';
      case 4: return 'modern-dark';
    }
  }

  function getContainer(theme) {
    switch (theme) {
      case 'classic': return qs('#navglobal');
    }
  }

  function getCount() {
    return fetch(`${document.location}newcount.mefi`);
  }

  function init() {
    const site = getSite();
    if (hasSite(site)) {
      const theme = getTheme();
      getCount()
        .then(json => json.json())
        .then(data => makeBadge(data, theme, site));
    }
  }

  function makeBadge(data, theme, site) {
    const { posts, comments } = data.new;
    const el = create('span');
    el.classList.add('newcommentsbadge');
    el.classList.add(`${site}color_newcomments`);
    const span = `<span>${posts} / ${comments}</span>`;
    el.innerHTML = span;
    insertBefore(el, getContainer(theme));
  }

  init();


}());
