/*! Shosh Nail — assets/js/links.js
 *  The link-in-bio page (links.html): one card, the five doors that matter on
 *  Instagram. Reads the same settings the rest of the site reads, so a changed
 *  number or handle changes here too. Attaches nothing to window.SN.
 */
(function () {
  'use strict';
  var SN = (window.SN = window.SN || {});

  var DICT = {
    iq: {
      links: {
        lead: 'أظافر مركّبة نسوّيها بالطلب على مقاسك. اختاري من وين تبدين:',
        quizS: 'أسئلة سريعة بالصور، وبعدها يطلع لك طقمك',
        shopS: 'كل طقم بسعره المكتوب — ماكو سعر بالخاص',
        sizeS: 'صورة إيدك ويّا مسطرة تكفي',
        waS: 'نرد عليك بأقل من ساعة',
        ig: 'دزّي لنا رسالة على إنستغرام',
        founding: 'عرض الافتتاح: أول {n} زبونة ينضاف لطلبها طقم مجاني بقيمة {g}، مهما كان سعر الطلب.',
        foot: 'الدفع عند الاستلام · التوصيل لكل المحافظات · نصوّر لك الطقم قبل ما ندزّه'
      }
    },
    ar: {
      links: {
        loading: 'لحظة…',
        lead: 'أظافر مركّبة تُصنع بالطلب على مقاسك. اختاري من أين تبدئين:',
        quiz: 'اختبار الستايل',
        quizS: 'أسئلة سريعة بالصور، ويظهر لك طقمك',
        shop: 'الأطقم والأسعار',
        shopS: 'كل طقم بسعره المكتوب — لا سعر بالخاص',
        size: 'كيف أعرف مقاسي؟',
        sizeS: 'صورة يدك مع مسطرة تكفي',
        wa: 'اطلبي على واتساب',
        waS: 'نرد خلال أقل من ساعة',
        ig: 'راسلينا على إنستغرام',
        igS: '@{h}',
        waMsg: 'مرحباً شوش 💅 أريد أن أطلب طقماً.',
        founding: 'عرض الافتتاح: أول {n} زبونة يُضاف لطلبها طقم مجاني بقيمة {g}، مهما كان سعر الطلب.',
        foot: 'الدفع عند الاستلام · التوصيل لكل المحافظات · نصوّر لك الطقم قبل إرساله'
      }
    },
    en: {
      links: {
        loading: 'One moment…',
        lead: 'Press-on nails made to order, to your size. Pick where to start:',
        quiz: 'Style quiz',
        quizS: 'A few picture questions, and your set appears',
        shop: 'Sets and prices',
        shopS: 'Every set with its price — no “price in DM”',
        size: 'How do I find my size?',
        sizeS: 'A photo of your hand with a ruler is enough',
        wa: 'Order on WhatsApp',
        waS: 'We reply within the hour',
        ig: 'Message us on Instagram',
        igS: '@{h}',
        waMsg: 'Hi Shosh 💅 I would like to order a set.',
        founding: 'Launch offer: the first {n} customers get a free set worth {g} added to their order, whatever it costs.',
        foot: 'Cash on delivery · delivery to every governorate · a photo of your set before it ships'
      }
    }
  };
  if (SN.I18n && typeof SN.I18n.extend === 'function') SN.I18n.extend(DICT);

  function t(key, vars) { return (SN.I18n && SN.I18n.t) ? SN.I18n.t(key, vars) : String(key || ''); }
  function pick(v) { return (SN.I18n && SN.I18n.pick) ? SN.I18n.pick(v) : ''; }
  function money(n) { return (SN.I18n && SN.I18n.money) ? SN.I18n.money(n) : String(n); }
  function num(n) { return (SN.I18n && SN.I18n.num) ? SN.I18n.num(n) : String(n); }
  function cfg(path, fb) { return (SN.Store && SN.Store.get) ? SN.Store.get(path, fb) : fb; }
  function el(tag, attrs, kids) { return SN.UI.el(tag, attrs, kids); }
  function icon(name, size) { return SN.UI.icon(name, size); }

  function link(href, ico, title, sub, primary, external) {
    var a = el('a', {
      'class': 'lk-btn' + (primary ? ' lk-pri' : ''),
      href: href,
      target: external ? '_blank' : null,
      rel: external ? 'noopener' : null
    }, [
      el('span', { 'class': 'lk-ico', html: icon(ico, 22), 'aria-hidden': 'true' }),
      el('span', { 'class': 'lk-txt' }, [
        el('span', { 'class': 'lk-t', text: title }),
        sub ? el('span', { 'class': 'lk-s', text: sub }) : null
      ])
    ]);
    return a;
  }

  function render() {
    var host = document.getElementById('lk-card');
    var brand = pick(cfg('settings.brand', null)) || 'Shosh Nail';
    var tag = pick(cfg('settings.tagline', null));
    var wa = String(cfg('settings.whatsapp', '') || '').replace(/[^0-9]/g, '');
    var ig = String(cfg('settings.instagram', '') || '').replace(/^@/, '');
    var f = cfg('settings.founding', null);
    var on = f && typeof f === 'object' && f.on !== false && Number(f.total) > 0;
    var kids = [], links = [];
    if (!host) return;

    kids.push(el('div', { 'class': 'lk-brand' }, [
      el('span', { 'class': 'lk-mark', html: SN.UI.brandMark ? SN.UI.brandMark(34) : icon('nail', 34), 'aria-hidden': 'true' }),
      el('h1', { 'class': 'lk-name display', text: brand }),
      tag ? el('p', { 'class': 'lk-tag', text: tag }) : null
    ]));
    kids.push(el('p', { 'class': 'lk-lead', text: t('links.lead') }));

    links.push(link('index.html#quiz', 'sparkle', t('links.quiz'), t('links.quizS'), true, false));
    links.push(link('shop.html', 'grid', t('links.shop'), t('links.shopS'), false, false));
    links.push(link('faq.html#fq-know-size', 'ruler', t('links.size'), t('links.sizeS'), false, false));
    if (wa) links.push(link('https://wa.me/' + wa + '?text=' + encodeURIComponent(t('links.waMsg')), 'whatsapp', t('links.wa'), t('links.waS'), false, true));
    if (ig) links.push(link('https://ig.me/m/' + encodeURIComponent(ig), 'instagram', t('links.ig'), t('links.igS', { h: ig }), false, true));
    kids.push(el('nav', { 'class': 'lk-links', 'aria-label': brand }, links));

    if (on) {
      kids.push(el('p', { 'class': 'lk-off', text: t('links.founding', { n: num(Number(f.total)), g: money(Number(f.gift) || 0) }) }));
    }
    kids.push(el('p', { 'class': 'lk-foot', text: t('links.foot') }));

    host.innerHTML = '';
    for (var i = 0; i < kids.length; i++) if (kids[i]) host.appendChild(kids[i]);
  }

  function boot() {
    if (!SN.UI || !SN.Store) return;
    render();
    document.addEventListener('sn:lang', render, false);
    if (typeof SN.Store.subscribe === 'function') { try { SN.Store.subscribe(render); } catch (e) { /* ignore */ } }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, false);
  else boot();
})();
