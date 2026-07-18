/**
 * Menukaart Nakhon Thai (echte gerechten + prijzen van nakhonthai-brugge.be).
 * Elke categorie heeft een NL-titel, een Thaise ondertitel (Thais schrift) en
 * items met nummer, Thaise naam (schrift), geromaniseerde gerechtnaam en prijs.
 */
export interface MenuItem {
  code: string;
  th: string;
  name: string;
  price: string;
}

export interface MenuCategory {
  title: string;
  th: string;
  items: MenuItem[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    title: "Soep",
    th: "ซุป",
    items: [
      { code: "T1A.", th: "ต้มยำไก่", name: "Tom Yam Kai", price: "€13.50" },
      { code: "T1B.", th: "ต้มยำกุ้ง", name: "Tom Yam Khung", price: "€16.50" },
      { code: "T1C.", th: "ต้มยำทะเล", name: "Tom Yam Talay", price: "€16.50" },
      { code: "T2A.", th: "ต้มข่าไก่", name: "Tom Kha Kai", price: "€13.50" },
      { code: "T2B.", th: "ต้มข่ากุ้ง", name: "Tom Kha Khung", price: "€16.50" },
      { code: "T2C.", th: "ต้มข่าทะเล", name: "Tom Kha Talay", price: "€16.50" },
    ],
  },
  {
    title: "Koude voorgerechten",
    th: "ของว่างเย็น",
    items: [
      { code: "T11.", th: "ลาบไก่", name: "Laab Kai", price: "€17.00" },
      { code: "T6.", th: "ยำวุ้นเส้นทะเล", name: "Yam Woonsen Talay", price: "€25.00" },
      { code: "T7.", th: "ยำเนื้อ", name: "Yam Nua", price: "€25.00" },
      { code: "T8.", th: "ส้มตำมะละกอ", name: "Som Tam Malakor", price: "€15.00" },
    ],
  },
  {
    title: "Warme voorgerechten",
    th: "ของว่างร้อน",
    items: [
      { code: "16A.", th: "ขนมจีบรวม", name: "Khanom Jeep (Dim Sum) Mix", price: "€16.00" },
      { code: "17.", th: "เป็ด", name: "Phed", price: "€15.00" },
      { code: "18.", th: "ถุงทอง", name: "Tung Tong", price: "€16.00" },
      { code: "19.", th: "เทมปุระกุ้ง", name: "Tempura Khung", price: "€17.00" },
      { code: "T12A.", th: "", name: "Heart of Nakhon Thai", price: "€15.00" },
      { code: "T13.", th: "สะเต๊ะไก่", name: "Gegrilde Sate Kai", price: "€10.50" },
      { code: "T14.", th: "ทอดมันปลา", name: "Tod Man Pla", price: "€9.50" },
    ],
  },
  {
    title: "Hoofdgerechten",
    th: "อาหารจานหลัก",
    items: [
      { code: "23A.", th: "แกงแดงไก่", name: "Kaeng Deng Kai", price: "€19.50" },
      { code: "23B.", th: "แกงแดงเนื้อ", name: "Kaeng Deng Nua", price: "€22.00" },
      { code: "23C.", th: "แกงแดงเป็ด", name: "Kaeng Deng Phed", price: "€25.00" },
      { code: "24A.", th: "แกงเขียวหวานไก่", name: "Kaeng Kiew Wan Kai", price: "€19.50" },
      { code: "24B.", th: "แกงเขียวหวานกุ้ง", name: "Kaeng Kiew Wan Khung", price: "€25.00" },
      { code: "26A.", th: "พะแนงไก่", name: "Phaneang Kai", price: "€19.50" },
      { code: "26B.", th: "พะแนงเนื้อ", name: "Phaneang Nua", price: "€22.00" },
      { code: "26C.", th: "พะแนงกุ้ง", name: "Phaneang Khung", price: "€25.00" },
      { code: "27A.", th: "แกงมัสมั่นไก่", name: "Kaeng Massaman Kai", price: "€19.50" },
      { code: "27B.", th: "แกงมัสมั่นเนื้อ", name: "Kaeng Massaman Nua", price: "€22.00" },
    ],
  },
  {
    title: "Vegetarisch",
    th: "อาหารมังสวิรัติ",
    items: [
      { code: "35.", th: "ผัดผักเต้าหู้", name: "Phad Phak Tofu", price: "€17.00" },
      { code: "36.", th: "ผัดผักบุ้ง", name: "Pad Phak Bung", price: "€17.00" },
      { code: "37A.", th: "แกงแดงผัก", name: "Kaeng Deng Phak", price: "€17.00" },
      { code: "38.", th: "แกงเขียวหวานผัก", name: "Kaeng Kiew Wan Phak", price: "€17.00" },
      { code: "40.", th: "ผัดไทยผัก", name: "Phad Thai Phak", price: "€17.00" },
    ],
  },
  {
    title: "Wok­gerechten",
    th: "ผัด",
    items: [
      { code: "29A.", th: "ผัดไทยไก่", name: "Phad Thai Kai", price: "€19.50" },
      { code: "29B.", th: "ผัดไทยเนื้อ", name: "Phad Thai Nua", price: "€22.00" },
      { code: "29D.", th: "ผัดไทยกุ้ง", name: "Phad Thai Khung", price: "€25.00" },
      { code: "34A.", th: "ผัดเผ็ดไก่", name: "Pad Pet Kai", price: "€19.50" },
      { code: "34B.", th: "ผัดเผ็ดเนื้อ", name: "Pad Pet Nua", price: "€22.00" },
      { code: "34D.", th: "ผัดเผ็ดกุ้ง", name: "Pad Pet Khung", price: "€25.00" },
    ],
  },
  {
    title: "Suggesties",
    th: "เมนูแนะนำ",
    items: [
      { code: "41A.", th: "ปลานึ่งมะนาว", name: "Pla Nung Manaw", price: "€27.00" },
      { code: "42.", th: "ปลาฉู่ฉี่", name: "Pla Chu-Chi", price: "€29.00" },
      { code: "43.", th: "กุ้งผัดขิง", name: "King Khung", price: "€29.00" },
      { code: "44A.", th: "แกงกุ้ง", name: "King Khung Kaeng", price: "€29.00" },
      { code: "46A.", th: "เนื้อน้ำตก", name: "Nua Nam Tok", price: "€25.00" },
      { code: "47A.", th: "กุ้งมังกร", name: "Kung Mang Korn (650g)", price: "€65.00" },
      { code: "49C.", th: "ก๋วยเตี๋ยวเกี๊ยวน้ำ", name: "Kwei Tie Kiew Nam", price: "€17.50" },
      { code: "50.", th: "ไข่เจียว", name: "Kai Jiao", price: "€13.50" },
      { code: "51A.", th: "เป็ดย่างน้ำผึ้ง", name: "Phed Yang Nam Phung", price: "€25.00" },
      { code: "52A.", th: "ไก่ผัดเม็ดมะม่วง", name: "Kai Mamuang", price: "€20.50" },
      { code: "52B.", th: "ไก่ผัด", name: "Kai Phad Oriental", price: "€20.50" },
      { code: "53A.", th: "ผัดกะเพราไก่", name: "Pad Krapao Kai", price: "€19.50" },
      { code: "53B.", th: "ผัดกะเพราหมู", name: "Pad Krapao Moo", price: "€19.00" },
      { code: "53C.", th: "ผัดกะเพราเนื้อ", name: "Pad Krapao Nua", price: "€22.00" },
    ],
  },
];

/** Categorie-labels + thumbnails voor de scrollende band op de home. */
export const MARQUEE_CATEGORIES = [
  { label: "Soepen", image: "/images/cta-soup.png" },
  { label: "Dim Sum", image: "/images/dish-dumplings.jpg" },
  { label: "Loempia", image: "/images/dish-stirfry.jpg" },
  { label: "Noodles", image: "/images/dish-duck.jpg" },
  { label: "Vleesgerechten", image: "/images/dish-duck.jpg" },
  { label: "Visgerechten", image: "/images/hero-squid.png" },
] as const;

/** Klantreviews (Google). */
export const REVIEWS = [
  {
    name: "Bart",
    rating: 5,
    text: "Heerlijk gegeten! Verse, authentieke Thaise gerechten en een gezellige sfeer in het hart van Brugge. Zeker een aanrader.",
  },
  {
    name: "Sofie",
    rating: 5,
    text: "De dim sum is fantastisch en het personeel super vriendelijk. We komen zeker terug. Ook ideaal om af te halen.",
  },
  {
    name: "Thomas",
    rating: 5,
    text: "Beste Thai van Brugge. Ruime keuze, eerlijke prijzen en alles smaakt vers bereid. Reserveren is wel aangeraden.",
  },
] as const;
