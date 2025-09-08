/* ========= Free-canvas with draggable items ========= */
const stage     = document.getElementById('stage');
const canvas    = document.getElementById('canvas');
const lockBtn   = document.getElementById('lockBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const resetBtn  = document.getElementById('resetBtn');
const gridBtn   = document.getElementById('gridBtn');

const LS_KEY = 'eg-layout-v1';
let locked = false;
let selected = null;

/* รายการชิ้นเริ่มต้น: 1) ข้อความ Explorer Guide  2) ไอคอนเกาะต่างๆ */
const ITEMS = [
  { id:'title', type:'text', text:'Explorer Guide', x:50, y:12, fontSize:56 },

  { id:'i1',  type:'img', src:'assets/icon/Island-5.png',  w:170, x:18, y:52 },
  { id:'i2',  type:'img', src:'assets/icon/Island-6.png',  w:190, x:33, y:33 },
  { id:'i3',  type:'img', src:'assets/icon/Island-8.png',  w:190, x:51, y:22 },
  { id:'i4',  type:'img', src:'assets/icon/Island-7.png',  w:200, x:66, y:33 },
  { id:'i5',  type:'img', src:'assets/icon/Island-10.png', w:190, x:81, y:47 },
  { id:'i6',  type:'img', src:'assets/icon/Island-11.png', w:210, x:35, y:66 },
  { id:'i7',  type:'img', src:'assets/icon/Island-4.png',  w:200, x:47, y:47 },
  { id:'i8',  type:'img', src:'assets/icon/Island-9.png',  w:200, x:60, y:64 },
  { id:'i9',  type:'img', src:'assets/icon/Island-3.png',  w:190, x:26, y:26 },
  { id:'i10', type:'img', src:'assets/icon/Island-1.png',  w:190, x:10, y:28 },
  { id:'i11', type:'img', src:'assets/icon/Island-2.png',  w:190, x:76, y:24 },
  { id:'i12', type:'img', src:'assets/icon/Island-12.png', w:220, x:12, y:80 },
  { id:'i13', type:'img', src:'assets/icon/Island-13.png', w:220, x:30, y:81 },
];

/* ========== Helpers: % <-> px ========= */
const pct2px = ({x,y,w,fontSize})=>{
  const r = stage.getBoundingClientRect();
  return {
    left: (x/100)*r.width, top: (y/100)*r.height,
    width: w ? (w/100)*r.width : undefined,
    fontSize
  };
};
const px2pct = (el)=>{
  const r = stage.getBoundingClientRect();
  const left = parseFloat(el.style.left||0);
  const top  = parseFloat(el.style.top||0);
  const width= parseFloat(el.style.width||el.dataset.w||160);
  return { x:(left/r.width)*100, y:(top/r.height)*100, w:(width/r.width)*100 };
};

/* ========== Layout load/save/export/import ========= */
function loadLayout(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    if(!raw) return null;
    return JSON.parse(raw);
  }catch{ return null; }
}
function saveLayout(){
  const layout = [];
  stage.que
