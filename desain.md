# desain.md — "Forms in Nature" Motion Style (untuk Remotion)

Hasil bedah video: *Forms in Nature — National Science Programme* (title sequence animasi, Chromosphere).
Dipakai sebagai spesifikasi gaya yang bisa dipakai ulang di proyek Remotion.

**Legenda keyakinan:** `[UKUR]` = dihitung dari piksel/audio video. `[LIHAT]` = dinilai dari frame secara visual. `[PERKIRAAN]` = tebakan terarah, uji dulu sebelum dipakai mentah-mentah.

---

## 0. Fakta dasar video `[UKUR]`

| Item | Nilai |
|---|---|
| Durasi | 126,46 detik (≈ 3.161 frame) |
| Resolusi file | 1920×1080, H.264 |
| Frame rate | **25 fps** |
| Area konten aktif | **1920×802** (letterbox hitam atas/bawah masing-masing 138 px, ≈ 2,39:1) |
| Audio | AAC stereo 44,1 kHz, musik terus-menerus (tidak ada narasi) |
| Struktur | 8 dtk kartu judul teal → kartu judul koral → ±27 shot ilustrasi → kredit penutup |

> Catatan: ini satu title sequence, bukan kumpulan film pendek. Shot-shotnya adalah vignet alam/sains dengan gaya ilustrasi flat-geometris.

---

## 1. Setup Remotion

```ts
// src/design/tokens.ts
export const FPS = 25;
export const W = 1920;
export const H = 1080;
export const ACTIVE_H = 802;          // tinggi area konten (letterbox)
export const LETTERBOX_Y = (H - ACTIVE_H) / 2; // 139 ≈ 138 px terukur
export const BAR = 50;                // 1 bar = 2 dtk = 50 frame (120 BPM, 4/4)
export const SHOT = 100;              // 1 shot standar = 4 dtk = 2 bar = 100 frame
export const SPLIT_GAP = 25;          // jeda antar-setengah layar pada split cut = 1 dtk = 2 beat
```

```tsx
// Root.tsx
<Composition id="FormsInNature" component={Main} width={1920} height={1080} fps={25} durationInFrames={3161} />
```

Letterbox: bungkus semua konten dalam kontainer `top: 138, height: 802` dengan `overflow: hidden`, latar `#000`.
Jika ingin 16:9 penuh tanpa bar, ganti `ACTIVE_H = 1080` dan `LETTERBOX_Y = 0`; semua posisi di bawah tetap berlaku relatif terhadap area aktif.

---

## 2. Warna & kode hex

### 2.1 Palet merek (kartu judul + kredit) `[UKUR]` dari sampel piksel

| Token | Hex | Dipakai untuk |
|---|---|---|
| `coral` | `#FD473D` | Latar kartu judul (tepi) |
| `coralGlow` | `#FF5C42` | Pusat glow latar koral |
| `navy` | `#2C3B50` | Teks "in", "nature", "UNDERSTANDING OUR UNIVERSE" |
| `navyDeep` | `#304F64` | Irisan (overlap) lingkaran Venn |
| `slateBlue` | `#475061` | Navy sekunder |
| `offWhite` | `#F3FDF4` | Disc putih, teks "forms" (`#EEFBEB`–`#F1F8E6`) |
| `ringTeal` | `#629EB2` | Lingkaran teal di Venn |
| `tealBgEdge` | `#5A8CAA` | Latar kartu pembuka (tepi) |
| `tealBgMid` | `#629EB1` | Transisi radial |
| `tealGlow` | `#75C7C3` | Pusat glow kartu pembuka |
| `ringLine` | `#BFEAE2` | Garis cincin tipis pembuka |
| `tealText` | `#7ABCC0` | "SCIENCE PROGRAMME" (di atas teal) |
| `tealTextDark` | `#2B5A66` | "NATIONAL" |
| `eclipseBg` | `#2F414B` | Shot gerhana (latar slate gelap) |
| `creditWhite` | `#F2FDFF` | Nama depan di kredit |
| `creditDim` | `#4C5865` | Nama belakang di kredit (di atas biru gelap) |

```ts
export const brand = {
  coral: '#FD473D', coralGlow: '#FF5C42',
  navy: '#2C3B50', navyDeep: '#304F64', slateBlue: '#475061',
  offWhite: '#F3FDF4', ringTeal: '#629EB2',
  tealBgEdge: '#5A8CAA', tealGlow: '#75C7C3', ringLine: '#BFEAE2',
  eclipseBg: '#2F414B', creditWhite: '#F2FDFF', creditDim: '#4C5865',
} as const;
```

### 2.2 Palet per shot `[UKUR]` (k-means 5 warna dari frame tengah shot; urut dari yang terluas)

| Shot (mulai) | Warna dominan | Suasana |
|---|---|---|
| Kartu teal (0 dtk) | `#5A8CAA` `#75C7C3` | Sejuk, ilmiah |
| Kartu koral (8 dtk) | `#F94E41` `#475061` `#F5EFE4` `#78ABB4` | Kontras panas–dingin |
| Gerhana (12) | `#2F414B` `#37515F` `#9ED6E6` | Gelap, aksen cyan |
| Sel/embrio (16) | `#BEB7B8` `#D1C9C9` `#E8E3ED` | Netral abu muda |
| Bangau (20) | `#CAF1E0` `#88A2A0` `#23484E` | Mint pucat + teal tua |
| Saturnus (24) | `#263750` `#364B62` `#94B6C7` | Biru malam |
| Ubur-ubur (28) | `#93B0CC` `#C8DFEA` `#295088` | Biru es |
| Astronot (32) | `#727A84` `#BCCAD2` `#EFF3F5` | Abu bulan |
| Kupu-kupu (36) | `#EFF0DE` `#757244` `#DA9074` | Krem + hijau zaitun + jingga |
| Kapsul (40) | `#7192A3` `#213C56` `#C4EDF3` | Biru baja |
| Kubah Antartika (44) | `#C7D9DB` `#D9ECE5` `#417C8D` | Putih es hampir monokrom |
| Serangga (48) | `#D4D490` `#5B7784` `#F3F6D2` | Kuning pucat |
| Bunglon (50) | `#D1ECDA` `#9F7A7F` `#72545C` | Mint + mauve |
| Semut pemotong daun (52) | `#50B0A2` `#C9E043` `#AFCB7B` | Hijau-teal cerah |
| Anatomi mata (56) | `#283A51` `#EBE6D9` `#B96C52` | Navy blueprint |
| Gunung berapi (60) | `#2B3A4F` `#C47139` `#E9BC61` | Navy + api |
| Simpanse (64) | `#EDF1C4` `#2D3D49` `#8B8763` | Krem + arang |
| Dandelion/lebah (68) | `#E8E04B` `#D3BF43` `#5DA463` | Kuning jenuh |
| Bawah laut (72) | `#204F71` `#21EFF2` `#2FB2C1` | Teal neon |
| Anjing laut (76) | `#EBF6EF` `#4E6471` `#798F91` | Putih salju |
| Detektor CERN (80) | `#B8C0BD` `#DFEAE3` `#4E6273` | Abu-hijau industri |
| Burung finch (84) | `#EFF8F1` `#676C74` `#464C5B` | Putih berkabut |
| Hiu (88) | `#187BBA` `#128AD5` `#70EAFD` | Biru laut jenuh |
| Siput (92) | `#7F7160` `#F8EECD` `#D6C5A0` | Cokelat hangat |
| Observatorium senja → malam (96–104) | `#C99EA4` → `#675968` → `#323851` | Pink senja ke ungu ke indigo (color-grade berubah dalam satu shot) |
| Roket (104) | `#D9E3D4` `#90624E` `#DAA34D` | Putih + oranye tangki |
| Probe Voyager (108) | `#223A55` `#48617F` `#DDEDF5` | Biru kosmik, penutup |

### 2.3 Aturan pewarnaan `[LIHAT]`

- Setiap shot **punya satu "hue keluarga"** (1 warna latar dominan ± 2 aksen); tidak ada dua shot berurutan dengan hue sama.
- Kontras: latar muda ↔ latar gelap bergantian (L≈0.7 → 0.25 → 0.7 …) supaya cut terasa tegas.
- Aksen kecil jenuh (merah finch, jingga kupu-kupu, cyan gerhana) selalu satu titik fokus per frame.
- Ada **glow bloom** putih-hangat di titik fokus (mata bangau, matahari observatorium, lens flare gerhana).

---

## 3. Font / tipografi `[LIHAT]` (diidentifikasi dengan mata, bukan metadata)

Tidak ada info font di file; ini hasil pengamatan bentuk huruf (grotesk neo-Swiss: `t` berujung miring, `a` dua lantai, `r` pendek).

| Peran | Tebakan terdekat | Pengganti gratis (Google Fonts) |
|---|---|---|
| Judul `forms in nature` | **Helvetica Neue Bold** (atau Neue Haas Grotesk Display Bold) | **Inter Tight 700** / **Archivo 700** / `Arimo 700` |
| Label caps kecil | Helvetica Neue Bold, caps, tracking lebar | Inter 700 |
| Nama kredit | Helvetica Neue Bold | Inter Tight 700 |

```ts
import {loadFont} from '@remotion/google-fonts/InterTight';
export const {fontFamily} = loadFont('normal', {weights: ['700']});
```

### Spesifikasi ukuran (pada kanvas 1920 px) `[UKUR]` dari bounding box teks

| Elemen | Ukuran | Detail |
|---|---|---|
| `forms` / `in` / `nature` | **≈ 160 px**, bold, huruf kecil semua | Ascender "f" ≈ 117 px; lebar "forms" ≈ 446 px; tracking ≈ 0 s/d −0,01em; baseline antar baris ≈ 113–131 px (**line-height ≈ 0.75–0.8em, sangat rapat**) |
| Pewarnaan judul | "forms" `offWhite`, "in" & "nature" `navy` | Dua warna dalam satu lockup, rata kiri |
| `NATIONAL SCIENCE PROGRAMME` | ≈ 22 px, bold, CAPS, tracking +0,04em | Dua warna: kata pertama gelap, sisanya terang |
| `UNDERSTANDING OUR UNIVERSE` | ≈ 28 px, bold, CAPS, tracking +0,06em | Warna `navy`, lebar sejajar kata "nature" |
| Footer kecil | ≈ 11–13 px, bold, CAPS | Muncul belakangan, nyaris tak terbaca (fungsi tekstur) |
| Nama kredit | **≈ 34 px**, pitch baris **43 px** (≈1.26) | Nama depan putih `#F2FDFF`, nama belakang redup `#4C5865`. Huruf kecil semua |
| Label kredit `AN AUDIOVISUAL COLLABORATION BY` | ≈ 12 px, bold, CAPS, tracking +0,08em | Di atas daftar nama |

Aturan gaya: **huruf kecil untuk judul & nama, CAPS kecil untuk label**; selalu **dua warna dalam satu baris**; teks diberi glow lembut tipis (blur 6–10 px, opasitas ~0,3) saat berada di atas latar terang.

```tsx
export const TwoTone: React.FC<{a: string; b: string; ca: string; cb: string; size: number}> = ({a,b,ca,cb,size}) => (
  <div style={{fontFamily, fontWeight: 700, fontSize: size, lineHeight: 0.8, letterSpacing: '-0.01em'}}>
    <span style={{color: ca}}>{a}</span> <span style={{color: cb}}>{b}</span>
  </div>
);
```

---

## 4. Tekstur & finishing `[LIHAT]`

1. **Halftone / dither halus** menutupi seluruh frame (terlihat jelas di area warna flat kartu judul), pola titik ± 3 px.
2. **Radial glow**: latar tidak flat; pusat lebih terang dari tepi (lihat `tealGlow` → `tealBgEdge`, `coralGlow` → `coral`).
3. **Grain** halus + blur depth-of-field pada elemen latar depan/belakang.
4. **Lens flare / starburst** kecil di titik cahaya (gerhana, bangau, matahari observatorium).
5. Elemen **diagram tipis** (garis cincin 1–2 px, crosshair, grid, titik partikel) di atas ilustrasi: kesan blueprint sains.

```tsx
export const Finish: React.FC<{glow?: string; edge?: string}> = ({glow = '#75C7C3', edge = '#5A8CAA'}) => (
  <AbsoluteFill>
    <AbsoluteFill style={{background: `radial-gradient(ellipse 45% 70% at 50% 50%, ${glow} 0%, ${edge} 100%)`}} />
    {/* PERKIRAAN: halftone via titik gradien */}
    <AbsoluteFill style={{
      backgroundImage: 'radial-gradient(rgba(0,0,0,0.18) 0.6px, transparent 0.9px)',
      backgroundSize: '3px 3px', mixBlendMode: 'multiply', opacity: 0.35,
    }} />
  </AbsoluteFill>
);
```

---

## 5. Ritme `[UKUR]`

- **Tempo musik ≈ 120 BPM** (autokorelasi onset memuncak di 0,511 dtk ≈ 117,5 BPM; kelipatannya cocok dengan grid cut). 1 beat = 0,5 dtk = 12,5 frame.
- **Grid cut 4 dtk = 100 frame = 2 bar.** Hampir semua hard cut jatuh tepat di kelipatan itu: 15,96 · 19,96 · 24,00 · 31,96 · 40,00 · 48,00 · 51,96 · 55,96 · 63,92 · 71,88 · 75,88 · 79,92 · 83,96 · 87,96 · 92,00 · 95,92 · 104,00 · 108,00 dtk (selisih ≤ 4 frame karena encode).
- Intro: **8 dtk = 4 bar** (kartu teal), lalu kartu koral 4 dtk (2 bar), lalu mulai grid shot.
- Pengecualian durasi: observatorium **8 dtk (4 bar)** untuk time-lapse senja→malam; probe + kredit **±18 dtk** penutup.
- Semua shot **ditahan** (hold) sepanjang 4 dtk dengan gerak sangat pelan; **tidak ada** cut cepat/montase. Ritme = tenang, tegas di batas bar, dan perubahan besar hanya terjadi di cut.

### Linimasa (frame @25 fps)

| Frame | Waktu | Shot | Transisi masuk |
|---|---|---|---|
| 0 | 0,00 | Kartu teal + logo NSP | Mulai dari hitam, ring tumbuh |
| 200 | 8,00 | Kartu koral "forms in nature" | Hard cut + garis sapuan (lihat §6) |
| ≈ 293–300 | 11,75–12,0 | Gerhana | **Iris wipe** dari tengah |
| 399 | 15,96 | Sel/embrio | Hard cut |
| 499 | 19,96 | Bangau | Hard cut |
| 600 | 24,00 | Saturnus | Hard cut |
| 673 → 701 | 26,92 → 28,04 | Ubur-ubur | **Split cut**, kiri dulu |
| 799 | 31,96 | Astronot | Hard cut |
| 873 → 898 | 34,92 → 35,92 | Kupu-kupu | **Split cut**, kanan dulu |
| 1000 | 40,00 | Kapsul | Hard cut |
| 1074 → 1099 | 42,96 → 43,96 | Kubah Antartika | **Split cut** (kedua sisi, selisih 25 f) |
| 1200 | 48,00 | Serangga | Hard cut |
| 1246 → 1271 | 49,84 → 50,84 | Bunglon | **Split cut**, kiri dulu |
| 1299 | 51,96 | Semut pemotong daun | Hard cut |
| 1399 | 55,96 | Anatomi mata | Hard cut |
| 1473 → 1498 | 58,92 → 59,92 | Gunung berapi | **Split cut**, kiri dulu |
| 1598 | 63,92 | Simpanse | Hard cut |
| 1671 → 1696 | 66,84 → 67,84 | Dandelion & lebah | **Split cut**, kanan dulu |
| 1797 | 71,88 | Bawah laut | Hard cut |
| 1897 | 75,88 | Anjing laut | Hard cut |
| 1998 | 79,92 | Detektor CERN | Hard cut |
| 2099 | 83,96 | Burung finch | Hard cut |
| 2199 | 87,96 | Hiu | Hard cut |
| 2300 | 92,00 | Siput | Hard cut |
| 2398 | 95,92 | Observatorium (senja→malam, 8 dtk) | Hard cut |
| 2600 | 104,00 | Roket | Hard cut |
| 2700 | 108,00 | Probe Voyager | Hard cut |
| ≈ 2800 | 112,00 | Lockup judul kiri | Muncul di atas probe |
| ≈ 2850 | 114,00 | Kredit 4 nama + cincin orbit | Ganti lockup |
| ≈ 2900 | 116,00 | Disc putih logo NSP + "Produced by Chromosphere" | Ganti kredit |
| 2975 → 3125 | 119 → 125 | Fade ke hitam | Disc jadi transparan lalu fade out |

---

## 6. Transisi

### 6.1 Hard cut di grid bar `[UKUR]`
Default (±21 dari ±28 transisi). Tanpa fade, tanpa crossfade. Cut selalu di awal bar.

### 6.2 Split cut (stagger setengah layar) `[UKUR]` — **tanda tangan gaya ini**
Setengah layar (kiri atau kanan, batas **vertikal keras tepat di x = 960**) berganti ke shot baru lebih dulu; **setengah lainnya menyusul 25 frame (1 dtk, 2 beat) kemudian**. Setengah kedua selalu mendarat di grid bar (28 / 36 / 44 / 60 / 68 dtk). Tidak ada animasi pada tepi, hanya hard switch.
Ukuran selisih: 28 f (ubur-ubur), 25 f (lainnya).

```tsx
export const SplitCut: React.FC<{
  from: React.ReactNode; to: React.ReactNode;
  at: number;                       // frame lokal saat setengah pertama berganti
  first: 'left' | 'right'; gap?: number;
}> = ({from, to, at, first, gap = 25}) => {
  const f = useCurrentFrame();
  const leftTo  = f >= (first === 'left'  ? at : at + gap);
  const rightTo = f >= (first === 'right' ? at : at + gap);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{clipPath: 'inset(0 50% 0 0)'}}>{leftTo ? to : from}</AbsoluteFill>
      <AbsoluteFill style={{clipPath: 'inset(0 0 0 50%)'}}>{rightTo ? to : from}</AbsoluteFill>
    </AbsoluteFill>
  );
};
// contoh ubur-ubur: <SplitCut from={<Saturn/>} to={<Jelly/>} at={673-600} first="left" gap={28} />
```

### 6.3 Iris wipe dari tengah `[LIHAT/UKUR]`
Dipakai sekali (kartu koral → gerhana, ≈ 11,75–12,0 dtk): disc warna slate gelap `#2F414B` tumbuh **dari tengah frame**, tepi keras. Pada 11,85 dtk radius ≈ 740 px; selesai dalam ≈ 7 frame → durasi ≈ 6–8 frame, easing ease-out.

```tsx
const r = interpolate(f, [0, 7], [0, 1200], {easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateRight: 'clamp'});
<AbsoluteFill style={{clipPath: `circle(${r}px at 50% 50%)`}}>{next}</AbsoluteFill>
```

### 6.4 Pembuka kartu teal → koral `[LIHAT]`
- 7,0–7,85 dtk: **garis horizontal tipis** menyapu dari kanan ke tengah (kepala panah `←`), dua "jarum" jam di dalam cincin runtuh menjadi satu garis datar.
- 8,00 dtk: hard cut ke kartu koral (lonjakan perbedaan frame terbesar kedua setelah cut besar).
- 8,10–8,60: salinan lingkaran (echo) bergeser dan menumpuk, lalu mengendap membentuk diagram Venn.

---

## 7. Gerak kamera `[LIHAT]` + `[UKUR kasar]`

**Temuan utama: tidak ada kamera virtual yang bergerak agresif.** Mayoritas shot adalah *locked-off* dengan:

1. **Parallax berlapis pelan**: elemen depan (blur) bergerak lebih cepat dari tengah dan belakang. Contoh jelas: semut pemotong daun, daun latar depan buram menyeberang cepat sementara semut hampir diam.
2. **Gerak subjek mandiri** (kepak, kedip, tentakel, finch mematuk) sementara kamera diam.
3. **Push-in / drift sangat tipis**: skala sekitar +1% sampai +5% sepanjang 100 frame pada sebagian shot (bangau, kupu-kupu, kapsul, probe).
4. **Time-lapse warna** pada kamera diam (observatorium: langit senja → malam).

Pengukuran optical-flow otomatis (kasar, area flat sulit dilacak, anggap indikatif):

| Shot | Gerak terukur |
|---|---|
| Semut (52–56) | Pan lateral terbesar, ≈ −1.000 px kumulatif pada lapisan depan, zoom ≈ +1,6% |
| Serangga → bunglon (48–50) | Gerak cepat sesaat, ≈ 5 px/frame (p90); gerak subjek/lapisan, bukan kamera |
| Kapsul (40–43) | Zoom ≈ +4,6% (noisy) |
| Hampir semua lainnya | Pan global < 10 px, zoom < 5%; angka zoom di atas ±5% dianggap noise |

**Resep Remotion:**

```tsx
// Push-in halus: 100 frame, ease-out
const scale = interpolate(f, [0, 100], [1.0, 1.04], {easing: Easing.bezier(0.215, 0.61, 0.355, 1)});
// Parallax 3 lapis. PERKIRAAN rasio kecepatan fg:mid:bg ≈ 1 : 0.4 : 0.1
const panFg = interpolate(f, [0, 100], [0, -200]);   // lapisan depan + blur(4–8px)
const panMid = panFg * 0.4;
const panBg  = panFg * 0.1;
```

Gunakan `filter: blur()` hanya pada lapisan depan/belakang yang bukan fokus (depth-of-field palsu).

---

## 8. Easing

Hasil pelacakan per frame:

| Gerak | Hasil | Kurva yang cocok |
|---|---|---|
| **Ring pembuka tumbuh** (diameter 0 → 475 px) | Selesai ≈ 23 frame (0,9 dtk). Progres normalisasi pada frame 4 / 8 / 12 / 16 / 22 = 0,39 / 0,70 / 0,85 / 0,94 / 0,99 | **easeOutCubic** `cubic-bezier(0.215, 0.61, 0.355, 1)` (prediksi: 0,43 / 0,72 / 0,89 / 0,97) |
| **Disc putih kartu koral** | Kecepatan turun dari ≈ 5 px/f (frame 10) → 2,6 (20) → 1,6 (30) → 1,0 px/f (40); masih bergerak ±1 px/f setelah 1,8 dtk | **easeOutExpo / Quint**, ekor panjang `cubic-bezier(0.16, 1, 0.3, 1)`, durasi ≥ 90–100 frame |
| Iris wipe | Cepat lalu selesai ± 7 frame | easeOutExpo |
| Jarum jam/garis pembuka | `[PERKIRAAN]` ease-in-out halus | `cubic-bezier(0.45, 0, 0.55, 1)` |
| Hold shot (drift) | Hampir linear sangat lambat | `Easing.linear` atau ease-out sangat landai |

**Aturan umum:** hampir semua gerak masuk memakai **ease-out kuat**, ekor panjang, bukan spring/bounce. **Tidak ada overshoot.** Tidak ada ease-in murni.

```ts
import {Easing} from 'remotion';
export const ease = {
  outCubic: Easing.bezier(0.215, 0.61, 0.355, 1),
  outExpo:  Easing.bezier(0.16, 1, 0.3, 1),
  inOut:    Easing.bezier(0.45, 0, 0.55, 1),
};
```

---

## 9. Animasi teks & elemen judul `[LIHAT]`

| Waktu | Aksi | Catatan |
|---|---|---|
| 0,0–0,9 | Ring tumbuh dari titik, jarum jam berputar | `outCubic` |
| 1,0–1,5 | `NATIONAL SCIENCE PROGRAMME` terbuka dari kiri ke kanan (wipe teks), kursor kotak di ujung | Kursor berubah jadi ikon labu pada ≈ 3,5 |
| 4,5–5,0 | Footer kecil muncul | opasitas |
| 8,1–8,6 | Lingkaran Venn dan echo mengendap | `outExpo` |
| 8,3–9,4 | `forms in nature` + label muncul bertahap | footer "typed in" ± 9,4 |
| 112,0 | Lockup `forms in nature` di kiri (muncul keras) | tanpa animasi masuk |
| 114,0 | Cincin orbit dengan 2 titik berputar + 4 nama kredit | titik berputar searah jarum jam |
| 116,0 | Disc putih berisi logo NSP + "Produced by Chromosphere" | |

---

## 10. Audio & SFX `[UKUR]`

**Penting:** audio adalah **satu mix musik padat tanpa SFX terisolasi** yang terdeteksi: tidak ada whoosh atau impact terpisah di cut dan split. Jadi "SFX"-nya adalah *sound design di dalam musik*. Di bawah ini yang benar-benar terukur, lalu rekomendasi untuk Remotion.

### Terukur

| Waktu | Kejadian | Detail |
|---|---|---|
| 0–3,5 dtk | Intro senyap (≈ −36 dB) | Ambient tipis |
| 3,5 → 8,0 | **Riser/build** | Naik ≈ +20 dB (−36 → −16 dB); rumble bass (<150 Hz) baru masuk ± 6,0 dtk; band tinggi (>3 kHz) naik ≈ +20 dB |
| **8,00** | **Downbeat hit** bersamaan dengan cut ke kartu koral | Lonjakan ≈ +6 dB total, bass +9 dB, treble +9 dB; ini satu-satunya "impact" besar |
| 16,0 | Aksen kecil | ≈ +2 dB, treble +7 dB |
| 8 → 118 | Bed musik stabil | Loudness ≈ −13 s/d −11 dB RMS, energi di mid (150 Hz–2 kHz), centroid ≈ 400–600 Hz |
| 80–88 | Bass ditarik | Band <200 Hz turun ≈ 15 dB (−34 dB) saat CERN & finch |
| ≈ 118 → 125 | **Fade-out panjang** | −21 dB → −100 dB dalam ≈ 7 dtk, hampir linear di dB |

Tekstur musik berubah mengikuti batas shot (garis vertikal terlihat di spektrogram pada kelipatan 4 dtk), artinya musik di-edit/ditumpuk per shot.

### Rekomendasi untuk Remotion (bukan hasil deteksi)

```tsx
<Audio src={staticFile('bed-120bpm.mp3')} volume={(f) =>
  interpolate(f, [0, 87, 200, 2950, 3125], [0.02, 0.08, 1, 1, 0], {extrapolateRight: 'clamp'})} />
<Sequence from={200}><Audio src={staticFile('hit-downbeat.wav')} volume={0.9} /></Sequence> // frame 200 = 8,00 dtk
<Sequence from={87} durationInFrames={113}><Audio src={staticFile('riser.wav')} volume={0.6} /></Sequence>
```

| Momen | Saran SFX |
|---|---|
| Intro → kartu koral | Riser 4–5 dtk + sub-boom di frame 200 |
| Split cut | Opsional: "tick"/klik pendek tipis di setiap pergantian setengah; gaya aslinya nyaris tanpa suara |
| Iris wipe | Whoosh pendek ± 0,3 dtk |
| Hard cut | Tanpa SFX; biarkan musik berganti tekstur |
| Penutup | Fade-out kurva dB, jangan linear di amplitudo |

Sinkronkan cut ke kelipatan **100 frame**; jika memakai musik lain, pilih 120 BPM supaya 1 shot = 2 bar.

---

## 11. Checklist reuse

1. `FPS=25`, kanvas 1920×1080, area aktif 802 px (opsional letterbox).
2. Setiap scene = **100 frame**, hard cut di grid; sisipkan **split cut** 1–2× per 8–10 shot.
3. Warna: 1 hue keluarga per shot + 1 aksen jenuh; ganti terang/gelap bergantian.
4. Font: grotesk Helvetica-like 700; judul huruf kecil, label CAPS, selalu dua warna.
5. Overlay halftone + radial glow di kartu judul.
6. Easing: `outCubic` untuk munculnya elemen, `outExpo` untuk pengendapan panjang; tanpa spring.
7. Kamera: locked-off + parallax berlapis + push-in 1–5%.
8. Audio: bed 120 BPM, riser 4–5 dtk sebelum judul, hit di frame 200, fade-out ≥ 6 dtk.

---

## 12. Keterbatasan

- Font hanya ditebak dari bentuk huruf. Jika butuh yang persis, tanyakan ke studio atau cocokkan lewat font-matching tool.
- Estimasi gerak kamera dari optical-flow memiliki noise tinggi di area flat; angka zoom/pan adalah petunjuk, bukan nilai pasti.
- Halftone dan glow di §4 adalah aproksimasi CSS; tekstur aslinya kemungkinan dibuat di After Effects.
- Tidak ada SFX terisolasi yang bisa dipisahkan dari mix musik; bagian SFX di §10 yang bertanda "Rekomendasi" bukan fakta dari video.
- Konten ilustrasi/logo (NSP, Chromosphere) adalah hak milik pemiliknya. Dokumen ini hanya mengambil **gaya**, bukan aset.
