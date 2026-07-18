/**
 * Menukaart De Lange Muur (Chinese gerechten + richtprijzen, uit de Figma).
 * Zelfde structuur als de Nakhon-menukaart, maar met Chinese tekens als
 * ondertitel/naam i.p.v. Thais schrift.
 */
import type { MenuCategory } from "./menu";

export const LANGE_MUUR_MENU: MenuCategory[] = [
  {
    title: "Soep",
    th: "汤类",
    items: [
      { code: "1A.", th: "云吞汤", name: "Wan tan soup", price: "€10.50" },
      { code: "2A.", th: "酸辣豆腐汤", name: "Tofu hot & sour soup", price: "€7.50" },
      { code: "3A.", th: "青菜豆腐汤", name: "Tofu vegetables soup", price: "€6.50" },
      { code: "4A.", th: "粟米汤", name: "Sweet corn soup", price: "€7.50" },
    ],
  },
  {
    title: "Dim Sum",
    th: "点心",
    items: [
      { code: "7A.", th: "虾饺", name: "Steamed Har Kau", price: "€9.00" },
      { code: "8A.", th: "烧麦", name: "Steamed Siel Mai", price: "€8.50" },
      { code: "9A.", th: "春卷", name: "Vegetables springs roll", price: "€9.50" },
      { code: "10A.", th: "煎饺子", name: "Fried dumplings", price: "€10.50" },
      { code: "13D.", th: "炸尤鱼圈", name: "Fried squids rings", price: "€10.50" },
    ],
  },
  {
    title: "Gebakken rijst & noodles",
    th: "面条 / 炒饭",
    items: [
      { code: "13A.", th: "牛肉汤面", name: "Noodle soup with beef", price: "€18.00" },
      { code: "14A.", th: "云吞汤面", name: "Noodle soup with Wan Tan", price: "€18.00" },
      { code: "15A.", th: "星洲炒米粉", name: "Noodle soup with seafood", price: "€25.00" },
      { code: "15B.", th: "星洲炒米粉", name: "Singapore vermicelli", price: "€19.00" },
      { code: "16A.", th: "牛肉炒底面", name: "Fried noodle with beef", price: "€18.00" },
      { code: "17A.", th: "海鲜炒底面", name: "Fried noodle with seafood", price: "€25.00" },
      { code: "18A.", th: "大虾炒饭", name: "Fried rice with prawns", price: "€25.00" },
    ],
  },
  {
    title: "Specialiteiten",
    th: "点心",
    items: [
      { code: "14D.", th: "香辣鸡翅", name: "Spicy Chicken Wings", price: "€11.00" },
      { code: "15D.", th: "牛肉串", name: "Beef Skewers", price: "€12.00" },
      { code: "16D.", th: "生鱼片", name: "Sashimi", price: "€15.00" },
      { code: "17D.", th: "炸春卷", name: "Fried Spring Rolls", price: "€9.00" },
      { code: "18D.", th: "炒牛河", name: "Fried Flat Noodles with Beef", price: "€12.50" },
      { code: "19D.", th: "海南鸡饭", name: "Hainanese Chicken Rice", price: "€13.00" },
      { code: "20D.", th: "柚子茶", name: "Pomelo Tea", price: "€4.50" },
      { code: "21D.", th: "芒果布丁", name: "Mango Pudding", price: "€5.50" },
      { code: "22D.", th: "豆腐沙拉", name: "Tofu Salad", price: "€7.00" },
      { code: "23D.", th: "海鲜炒饭", name: "Seafood Fried Rice", price: "€14.00" },
      { code: "24D.", th: "红烧肉", name: "Braised Pork Belly", price: "€13.50" },
      { code: "25D.", th: "椰汁西米露", name: "Coconut Sago", price: "€6.00" },
      { code: "26D.", th: "鸳鸯奶茶", name: "Yuan Yang Milk Tea", price: "€3.50" },
      { code: "27D.", th: "糖醋排骨", name: "Sweet and Sour Ribs", price: "€11.50" },
    ],
  },
];

/** Klantreviews (Google) — Chinese context. */
export const LANGE_MUUR_REVIEWS = [
  {
    name: "Bart",
    rating: 5,
    text: "Heerlijk gegeten! Verse, authentieke Chinese gerechten en een gezellige sfeer in het hart van Brugge. Zeker een aanrader.",
  },
  {
    name: "Sofie",
    rating: 5,
    text: "De dim sum is fantastisch en het personeel super vriendelijk. We komen zeker terug. Ook ideaal om af te halen.",
  },
  {
    name: "Thomas",
    rating: 5,
    text: "Beste Chinees van Brugge. Ruime keuze, eerlijke prijzen en alles smaakt vers bereid. Reserveren is wel aangeraden.",
  },
] as const;
