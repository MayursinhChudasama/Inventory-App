// import { file } from "./brandsAndModels.json";

//1. inward challan entry
async function inward_entried() {
  const res = await fetch("./inwardEntried.json");
  const data = await res.json();
  // console.log(data);

  return data;
}
// console.log("file", file);

const inward_entries = await inward_entried();
console.log("inward_entries", inward_entries);

//  { asus: [{ model: "", qty: 0 }] };
const flatArr = inward_entries.map((entry) => entry.products).flat();
const brandsArr = flatArr.map((entry) => entry.brand);
const brandsArrSet = [...new Set(brandsArr)];
console.log("brandsArrSet", brandsArrSet);

const modelsPerBrand = brandsArrSet
  .map((entry, index) => {
    const brandsArray = flatArr
      .filter((entryObj) => entry == entryObj.brand)
      .map((obj) => ({ model: obj.model, qty: obj.qty }));
    return { [entry]: brandsArray };
  })
  .reduce((acc, curr) => {
    return { ...acc, ...curr };
  }, {});
console.log("modelsPerBrand", modelsPerBrand);

const uniqueModelsPerBrand = brandsArrSet.map((entry) => {
  const modelsArray = new Set(
    flatArr
      .filter((entryObj) => entry == entryObj.brand)
      .map((obj) => obj.model)
  );
  return { [entry]: modelsArray };
});

console.log("uniqueModelsPerBrand", uniqueModelsPerBrand);

//2. outward challan entry

const outward_entries = {
  to: "buyer_one",
  product_type: "black cover",
  products: [
    { brand: "google", model: "pixel 6", qty: 100 },
    { brand: "iphone", model: "12 pro", qty: 50 },
  ],
  total_qty: "total qty of products",
  createdAt: "timestamp",
  by_user: "user1",
};

//3. USERS

const users = {
  id: "id",
  user: "Manav",
  username: "manav_mangrolia",
  password: "manav@123",
  role: "admin",
};

// 4. sources
const sources = {
  seller: ["seller one", "seller two"],
  buyer: ["buyer one", "buyer two"],
};

// 5. opening stock
const opening_stock = {
  samsung: [
    { id: 1, model: "Galaxy S24 Ultra", qty: 50 },
    { id: 2, model: "Galaxy S24+", qty: 50 },
    { id: 3, model: "Galaxy S24", qty: 50 },
    { id: 4, model: "Galaxy Z Fold5", qty: 50 },
    { id: 5, model: "Galaxy Z Flip5", qty: 50 },
    { id: 6, model: "Galaxy S23 Ultra", qty: 50 },
    { id: 7, model: "Galaxy S23+", qty: 50 },
    { id: 8, model: "Galaxy S23", qty: 50 },
    { id: 9, model: "Galaxy A54 5G", qty: 50 },
    { id: 10, model: "Galaxy M14 5G", qty: 50 },
  ],
  apple: [
    { id: 11, model: "iPhone 15 Pro Max", qty: 50 },
    { id: 12, model: "iPhone 15 Pro", qty: 50 },
    { id: 13, model: "iPhone 15 Plus", qty: 50 },
    { id: 14, model: "iPhone 15", qty: 50 },
    { id: 15, model: "iPhone 14 Pro Max", qty: 50 },
    { id: 16, model: "iPhone 14 Pro", qty: 50 },
    { id: 17, model: "iPhone 14 Plus", qty: 50 },
    { id: 18, model: "iPhone 14", qty: 50 },
    { id: 19, model: "iPhone SE (2022)", qty: 50 },
    { id: 20, model: "iPhone 13", qty: 50 },
  ],
  google: [
    { id: 21, model: "Pixel 8 Pro", qty: 50 },
    { id: 22, model: "Pixel 8", qty: 50 },
    { id: 23, model: "Pixel 7a", qty: 50 },
    { id: 24, model: "Pixel 7 Pro", qty: 50 },
    { id: 25, model: "Pixel 7", qty: 50 },
    { id: 26, model: "Pixel 6 Pro", qty: 50 },
    { id: 27, model: "Pixel 6a", qty: 50 },
    { id: 28, model: "Pixel Fold", qty: 50 },
    { id: 29, model: "Pixel 5a", qty: 50 },
    { id: 30, model: "Pixel 5", qty: 50 },
  ],
  xiaomi: [
    { id: 41, model: "Xiaomi 14 Ultra", qty: 50 },
    { id: 42, model: "Xiaomi 14", qty: 50 },
    { id: 43, model: "Xiaomi 13 Ultra", qty: 50 },
    { id: 44, model: "Xiaomi 13 Pro", qty: 50 },
    { id: 45, model: "Xiaomi 13", qty: 50 },
    { id: 46, model: "Redmi Note 13 Pro+", qty: 50 },
    { id: 47, model: "Redmi Note 13 Pro", qty: 50 },
    { id: 48, model: "Redmi Note 13", qty: 50 },
    { id: 49, model: "Redmi K70 Pro", qty: 50 },
    { id: 50, model: "Redmi K70", qty: 50 },
  ],
  oppo: [
    { id: 51, model: "Oppo Find X7 Ultra", qty: 50 },
    { id: 52, model: "Oppo Find X7", qty: 50 },
    { id: 53, model: "Oppo Reno11 Pro", qty: 50 },
    { id: 54, model: "Oppo Reno11", qty: 50 },
    { id: 55, model: "Oppo Reno10 Pro+", qty: 50 },
    { id: 56, model: "Oppo Reno10 Pro", qty: 50 },
    { id: 57, model: "Oppo Reno10", qty: 50 },
    { id: 58, model: "Oppo A78 5G", qty: 50 },
    { id: 59, model: "Oppo A58", qty: 50 },
    { id: 60, model: "Oppo K11x", qty: 50 },
  ],
  vivo: [
    { id: 61, model: "Vivo X100 Pro", qty: 50 },
    { id: 62, model: "Vivo X100", qty: 50 },
    { id: 63, model: "Vivo X90 Pro+", qty: 50 },
    { id: 64, model: "Vivo X90 Pro", qty: 50 },
    { id: 65, model: "Vivo X90", qty: 50 },
    { id: 66, model: "Vivo V29 Pro", qty: 50 },
    { id: 67, model: "Vivo V29", qty: 50 },
    { id: 68, model: "Vivo Y200e 5G", qty: 50 },
    { id: 69, model: "Vivo Y100", qty: 50 },
    { id: 70, model: "Vivo Y36", qty: 50 },
  ],
  realme: [
    { id: 71, model: "Realme GT 5 Pro", qty: 50 },
    { id: 72, model: "Realme GT 5", qty: 50 },
    { id: 73, model: "Realme GT Neo 5", qty: 50 },
    { id: 74, model: "Realme GT Neo 5 SE", qty: 50 },
    { id: 75, model: "Realme 12 Pro+", qty: 50 },
    { id: 76, model: "Realme 12 Pro", qty: 50 },
    { id: 77, model: "Realme 12x", qty: 50 },
    { id: 78, model: "Realme Narzo 60x", qty: 50 },
    { id: 79, model: "Realme Narzo 60 Pro", qty: 50 },
    { id: 80, model: "Realme C67", qty: 50 },
  ],
  asus: [
    { id: 81, model: "Asus ROG Phone 8 Pro", qty: 50 },
    { id: 82, model: "Asus ROG Phone 8", qty: 50 },
    { id: 83, model: "Asus Zenfone 10", qty: 50 },
    { id: 84, model: "Asus Zenfone 9", qty: 50 },
    { id: 85, model: "Asus Zenfone 8", qty: 50 },
    { id: 86, model: "Asus ROG Phone 7 Ultimate", qty: 50 },
    { id: 87, model: "Asus ROG Phone 7", qty: 50 },
    { id: 88, model: "Asus ROG Phone 6D Ultimate", qty: 50 },
    { id: 89, model: "Asus ROG Phone 6", qty: 50 },
    { id: 90, model: "Asus Zenfone 7 Pro", qty: 50 },
  ],
  motorola: [
    { id: 91, model: "Moto Edge 50 Pro", qty: 50 },
    { id: 92, model: "Moto Edge 50 Fusion", qty: 50 },
    { id: 93, model: "Moto Edge 40 Pro", qty: 50 },
    { id: 94, model: "Moto Edge 40", qty: 50 },
    { id: 95, model: "Moto Edge 30 Ultra", qty: 50 },
    { id: 96, model: "Moto Edge 30 Fusion", qty: 50 },
    { id: 97, model: "Moto G84 5G", qty: 50 },
    { id: 98, model: "Moto G73 5G", qty: 50 },
    { id: 99, model: "Moto G54 5G", qty: 50 },
    { id: 100, model: "Moto Razr 40 Ultra", qty: 50 },
  ],
  oneplus: [
    { id: 31, model: "OnePlus 12", qty: 50 },
    { id: 32, model: "OnePlus 12R", qty: 50 },
    { id: 33, model: "OnePlus 11", qty: 50 },
    { id: 34, model: "OnePlus 10T", qty: 50 },
    { id: 35, model: "OnePlus 10 Pro", qty: 50 },
    { id: 36, model: "OnePlus Nord 3", qty: 50 },
    { id: 37, model: "OnePlus Nord 2T", qty: 50 },
    { id: 38, model: "OnePlus Nord CE 3 Lite", qty: 50 },
    { id: 39, model: "OnePlus Ace 2", qty: 50 },
    { id: 40, model: "OnePlus 9 Pro", qty: 50 },
  ],
};

// const brands = Object.keys(opening_stock);
// console.log(brands);
