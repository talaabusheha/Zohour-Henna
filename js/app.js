/**
 * =========================================================================
 *  برمجة بطاقة الدعوة التفاعلية (Interactive Henna Invitation App Engine)
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.invitationData || {};
  
  // 1. تعبئة بيانات الواجهة
  initInvitationContent(data);

  // 2. تشغيل التفاعل للعروسة عند حركة الماوس
  initBrideParallax();

  // 3. تشغيل تأثير تساقط بتلات الورد الناعمة
  initPetalsCanvas();
});

/**
 * حركة تفاعلية ناعمة للعروسة عند حريك الماوس أو اللمس
 */
function initBrideParallax() {
  const container = document.querySelector('.bride-frame-container');
  const brideImg = document.querySelector('.bride-enlarged-img');
  
  if (!container || !brideImg) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / rect.height) * -6;
    const tiltY = (x / rect.width) * 6;

    brideImg.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(0px)`;
  });

  container.addEventListener('mouseleave', () => {
    brideImg.style.transform = '';
  });
}

/**
 * تعبئة عناصر الصفحة بالنصوص والبيانات من js/data.js
 */
function initInvitationContent(data) {
  setElementText('main-title', data.mainHeaderTitle || 'فِي بَيْتِنَا حِنَّة');
  setElementText('calligraphy-quote', data.calligraphyQuote || 'فِي بَيْتِنَا فَرْحَةٌ ... وَفِي كُفُوفِنَا حِنَّة');
  setElementText('event-time', data.eventTime || '3:00 مساءً');
  setElementText('venue-name', data.venueName || 'بيت والد العروس - الطابق الأول');
  setElementText('venue-details', data.venueDetails || '(أول النصر مفترق دياب للبناشر - مكتبة القرطبة)');
  setElementText('venue-city', data.venueCity || 'غزة');
  setElementText('event-date-greg', data.eventDateGregorian || '2026 / 9 / 28');
  setElementText('event-date-hijri', data.eventDateHijri || '22 ربيع الآخر 1448 هـ');
  setElementText('single-person-note-text', data.singlePersonNote || 'بطاقة لشخص واحد فقط');
}

function setElementText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

/**
 * خلفية متساقطة لبتلات الورد التراثية الناعمة
 */
function initPetalsCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalColors = ['#D98896', '#C59A45', '#B84A5B', '#E8C568', '#F2D7D9'];

  for (let i = 0; i < 24; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 7 + 4,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      speedY: Math.random() * 1.0 + 0.4,
      speedX: Math.random() * 0.6 - 0.3,
      rotation: Math.random() * 360,
      spinSpeed: Math.random() * 1.8 - 0.9
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    petals.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.55;

      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();

      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.spinSpeed;

      if (p.y > height + 20) {
        p.y = -10;
        p.x = Math.random() * width;
      }
    });

    requestAnimationFrame(render);
  }

  render();
}

function showToast(msg) {
  let toast = document.getElementById('toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.style.cssText = `
      position: fixed;
      bottom: 25px;
      left: 50%;
      transform: translateX(-50%);
      background: #8E1B24;
      color: #fff;
      padding: 10px 22px;
      border-radius: 30px;
      font-size: 0.9rem;
      font-weight: bold;
      z-index: 2000;
      box-shadow: 0 6px 18px rgba(0,0,0,0.2);
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(toast);
  }

  toast.innerText = msg;
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.opacity = '0';
  }, 3500);
}
