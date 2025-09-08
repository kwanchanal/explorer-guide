// ====== Drag-only canvas (no save/zoom) ======
window.addEventListener('load', () => {
  const stage = document.getElementById('stage');

  // ใช้เฉพาะ: 8,9,7,1,4,3,11,10,13 + ข้อความ Explorer Guide
  const ITEMS = [
    { id:'title', type:'text', text:'Explorer Guide', x: 340, y: 30, fs: 64 },

    { id:'i8',  type:'img', src:'assets/icon/Island-8.png',  x: 440, y: 120, w: 210 },
    { id:'i9',  type:'img', src:'assets/icon/Island-9.png',  x: 580, y: 290, w: 200 },
    { id:'i7',  type:'img', src:'assets/icon/Island-7.png',  x: 730, y: 150, w: 210 },
    { id:'i1',  type:'img', src:'assets/icon/Island-1.png',  x: 270, y: 140, w: 190 },
    { id:'i4',  type:'img', src:'assets/icon/Island-4.png',  x: 500, y: 170, w: 210 },
    { id:'i3',  type:'img', src:'assets/icon/Island-3.png',  x: 360, y: 100, w: 200 },
    { id:'i11', type:'img', src:'assets/icon/Island-11.png', x: 340, y: 370, w: 220 },
    { id:'i10', type:'img', src:'assets/icon/Island-10.png', x: 820, y: 270, w: 210 },
    { id:'i13', type:'img', src:'assets/icon/Island-13.png', x: 170, y: 410, w: 230 },
  ];

  // วาดชิ้นงาน (ให้ข้อความอยู่หลังสุดด้วย z-index)
  ITEMS.forEach(addItem);

  function addItem(it) {
    const el = document.createElement('div');
    el.id = it.id;
    el.className = 'item ' + (it.type === 'text' ? 'text' : 'icon');
    el.style.left = (it.x || 40) + 'px';
    el.style.top  = (it.y || 40) + 'px';

    if (it.type === 'text') {
      el.textContent = it.text || 'Explorer Guide';
      el.style.fontSize = (it.fs || 56) + 'px';
    } else {
      el.style.width = (it.w || 200) + 'px';
      el.innerHTML = `<img src="${it.src}" alt="">`;
      const img = el.querySelector('img');
      img.draggable = false;
      img.addEventListener('dragstart', e => e.preventDefault());
    }

    stage.appendChild(el);
    makeDraggable(el);
  }

  // ลากเลื่อน (รองรับเมาส์/ทัชผ่าน Pointer Events)
  function makeDraggable(el) {
    let offsetX = 0, offsetY = 0;

    el.addEventListener('pointerdown', (e) => {
      const rect = el.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      el.setPointerCapture(e.pointerId);
    });

    el.addEventListener('pointermove', (e) => {
      if (!el.hasPointerCapture(e.pointerId)) return;
      el.style.left = (e.clientX - offsetX) + 'px';
      el.style.top  = (e.clientY - offsetY) + 'px';
    });

    el.addEventListener('pointerup', (e) => {
      el.releasePointerCapture?.(e.pointerId);
    });
  }
});
