// Layout LOCKED + Entrance (stagger) + Hover bounce + Bubble on island-4
window.addEventListener('load', () => {
  const stage = document.getElementById('stage');

  // ตำแหน่งคงที่ (จากเลย์เอาต์ที่ล็อกไว้)
  const LAYOUT = [
    { id: "title", type: "text", text: "Explorer Guide", x: 506, y: 66,  fs: 64 },

    { id: "i8",  type: "img", src: "assets/icon/island-8.png",  x: 634, y:  80, w: 210 },
    { id: "i9",  type: "img", src: "assets/icon/island-9.png",  x: 762, y: 353, w: 200 },
    { id: "i7",  type: "img", src: "assets/icon/island-7.png",  x: 768, y: 181, w: 210 },
    { id: "i1",  type: "img", src: "assets/icon/island-1.png",  x: 490, y: 162, w: 190 },

    // เพิ่ม bubble ให้ island-4
    { id: "i4",  type: "img", src: "assets/icon/island-4.png",  x: 341, y: 228, w: 210, bubble: "hoot hoot" },

    { id: "i3",  type: "img", src: "assets/icon/island-3.png",  x: 622, y: 249, w: 200 },
    { id: "i11", type: "img", src: "assets/icon/island-11.png", x: 485, y: 336, w: 220 },
    { id: "i10", type: "img", src: "assets/icon/island-10.png", x: 907, y: 270, w: 210 },
    { id: "i13", type: "img", src: "assets/icon/island-13.png", x: 254, y: 401, w: 230 },
  ];

  // วาด + ใส่คลาส entering เพื่อเตรียมแอนิเมชัน
  const created = [];
  LAYOUT.forEach(it => {
    const el = document.createElement('div');
    el.id = it.id;
    el.className = 'item is-entering ' + (it.type === 'text' ? 'text' : 'icon');
    el.style.left = it.x + 'px';
    el.style.top  = it.y + 'px';

    if (it.type === 'text') {
      el.textContent = it.text || 'Explorer Guide';
      el.style.fontSize = (it.fs || 56) + 'px';
    } else {
      el.style.width = it.w + 'px';
      el.innerHTML = `<img src="${it.src}" alt="">`;

      // ถ้ามี bubble ให้แปะไว้ในไอเท็มนั้น (เฉพาะ i4)
      if (it.bubble) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = it.bubble;
        el.appendChild(bubble);
      }

      el.querySelector('img')?.addEventListener('error', () =>
        console.error('Image not found:', it.src)
      );
    }

    stage.appendChild(el);
    created.push(el);
  });

  // Staggered entrance (Web Animations API)
  const DURATION = 900;    // ความยาวต่อชิ้น
  const STEP     = 110;    // หน่วงแต่ละชิ้น
  created.forEach((el, i) => {
    const anim = el.animate(
      [
        { opacity: 0, transform: 'translateY(32px) scale(.97)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ],
      {
        duration: DURATION,
        delay: i * STEP,
        easing: 'cubic-bezier(.2,.9,.2,1)',
        fill: 'forwards'
      }
    );
    anim.addEventListener('finish', () => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0) scale(1)';
      el.classList.remove('is-entering');
      try { anim.commitStyles(); anim.cancel(); } catch {}
    });
  });
});

