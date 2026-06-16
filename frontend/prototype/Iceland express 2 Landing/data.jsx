// data.jsx — shared data, icons, helpers for the Iceland Express prototype
const { createElement: h } = React;

/* ============================================================
   Icons — Material Design icon set (filled, currentColor, 24×24)
   Path data sourced from Google's Material Icons (Apache 2.0).
   Every icon resolves through this map so the whole prototype
   draws from one design-system source of truth.
   ============================================================ */
function mkIcon(d) {
  const paths = Array.isArray(d) ? d : [d];
  return function Icon(props) {
    const size = (props && props.size) || 20;
    return h("svg", {
      width: size, height: size, viewBox: "0 0 24 24",
      fill: "currentColor", stroke: "none",
      style: props && props.style, "aria-hidden": true,
    }, paths.map((p, i) => h("path", { key: i, d: p })));
  };
}

const Icons = {
  // place
  Pin: mkIcon("M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"),
  // event
  Calendar: mkIcon("M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"),
  // schedule
  Clock: mkIcon("M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"),
  // search
  Search: mkIcon("M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"),
  // expand_more
  Chevron: mkIcon("M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"),
  // chevron_right
  ChevronR: mkIcon("M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"),
  // chevron_left
  ChevronL: mkIcon("M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"),
  // check
  Check: mkIcon("M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"),
  // star
  Star: mkIcon("M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"),
  // favorite (filled)
  Heart: mkIcon("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"),
  // favorite_border (outline)
  HeartOutline: mkIcon("M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"),
  // people
  Users: mkIcon("M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"),
  // luggage
  Bag: mkIcon("M17 6h-2V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2 0 .55.45 1 1 1s1-.45 1-1h6c0 .55.45 1 1 1s1-.45 1-1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-2h4v2h-4V4zm0 14H9V9h1v9zm3 0h-2V9h2v9zm2 0h-1V9h1v9z"),
  // settings
  Gear: mkIcon("M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"),
  // directions_car
  Drive: mkIcon("M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"),
  // local_gas_station
  Fuel: mkIcon("M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5z"),
  // bolt
  Bolt: mkIcon("M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"),
  // arrow_forward
  ArrowR: mkIcon("M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"),
  // arrow_back
  ArrowL: mkIcon("M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"),
  // info
  Info: mkIcon("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"),
  // edit
  Edit: mkIcon("M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"),
  // verified_user
  Shield: mkIcon("M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"),
  // wifi
  Wifi: mkIcon("M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"),
  // my_location
  Gps: mkIcon("M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"),
  // add
  Plus: mkIcon("M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"),
  // remove
  Minus: mkIcon("M19 13H5v-2h14v2z"),
  // close
  X: mkIcon("M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"),
  // auto_awesome
  Sparkle: mkIcon("M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"),
  // file_download
  Download: mkIcon("M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"),
  // lock
  Lock: mkIcon("M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"),
  // ac_unit
  Snow: mkIcon("M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z"),
  // call
  Phone: mkIcon("M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"),
  // event_seat
  Seat: mkIcon("M4 18v3h3v-3h10v3h3v-6H4v3zM19 10h3v3h-3v-3zM2 10h3v3H2v-3zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"),
  // flight
  Plane: mkIcon("M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"),
  // credit_card
  Card: mkIcon("M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"),
  // description
  Doc: mkIcon("M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"),
};

/* ============================================================
   Data
   ============================================================ */
const LOCATIONS = [
  { id: "kef", name: "Keflavík Airport (KEF)", sub: "Arrivals hall · 24/7 desk" },
  { id: "rvk", name: "Reykjavík City Center", sub: "Laugavegur 12" },
  { id: "dt", name: "Downtown Reykjavík", sub: "Harbour pickup point" },
  { id: "aey", name: "Akureyri Airport (AEY)", sub: "North Iceland" },
  { id: "hotel", name: "Hotel Delivery", sub: "Greater Reykjavík area" },
];

const TIMES = (() => {
  const out = [];
  for (let hH = 0; hH < 24; hH++) for (const m of [0, 30]) out.push(`${String(hH).padStart(2, "0")}:${m === 0 ? "00" : "30"}`);
  return out;
})();

const CARS = [
  { id: "duster", name: "Dacia Duster 4x4", similar: "or similar (automatic)", year: "2023", cat: "SUV", catLabel: "SUV · 4x4",
    perDay: 67, transmission: "Auto", seats: 5, bags: 4, drive: "4WD", fuel: "Diesel", doors: 5, minAge: 21,
    rating: 4.8, reviews: 126, provider: "Blue Car Rental", tag: "Recommended", img: (window.__resources && window.__resources.carSuv || "assets/car-suv.png"),
    feats: ["A/C", "Bluetooth", "Heated Seats", "GPS Ready"] },
  { id: "rav4", name: "Toyota RAV4 4x4", similar: "or similar (automatic)", year: "2023", cat: "SUV", catLabel: "SUV · Hybrid",
    perDay: 89, transmission: "Auto", seats: 5, bags: 3, drive: "4WD", fuel: "Hybrid", doors: 5, minAge: 23,
    rating: 4.9, reviews: 210, provider: "GO Iceland", tag: "Best Value", img: (window.__resources && window.__resources.carRav4 || "assets/car-rav4.png"),
    feats: ["A/C", "Bluetooth", "Heated Seats", "Apple CarPlay"] },
  { id: "sportage", name: "Kia Sportage 4x4", similar: "or similar (automatic)", year: "2024", cat: "SUV", catLabel: "SUV · 4x4",
    perDay: 78, transmission: "Auto", seats: 5, bags: 4, drive: "4WD", fuel: "Diesel", doors: 5, minAge: 23,
    rating: 4.8, reviews: 167, provider: "Lotus Car", tag: "Most Popular", img: "assets/car-rav4.png",
    feats: ["A/C", "Bluetooth", "Heated Seats", "GPS Ready"] },
  { id: "jimny", name: "Suzuki Jimny 4x4", similar: "or similar (manual)", year: "2023", cat: "4x4", catLabel: "4x4 · Compact",
    perDay: 58, transmission: "Manual", seats: 4, bags: 2, drive: "4WD", fuel: "Petrol", doors: 3, minAge: 21,
    rating: 4.7, reviews: 98, provider: "Lava Auto", tag: "Top Rated", img: "assets/car-suv.png",
    feats: ["A/C", "Bluetooth", "Hill Assist", "Roof Rack"] },
  { id: "tesla", name: "Tesla Model 3 LR", similar: "or similar (automatic)", year: "2023", cat: "Electric", catLabel: "Electric · AWD",
    perDay: 119, transmission: "Auto", seats: 5, bags: 3, drive: "AWD", fuel: "Electric", doors: 4, minAge: 25,
    rating: 4.9, reviews: 143, provider: "GO Iceland", tag: "Electric", img: (window.__resources && window.__resources.carTesla || "assets/car-tesla.png"),
    feats: ["Autopilot", "Heated Seats", "Premium Audio", "Fast Charge"] },
  { id: "id4", name: "Volkswagen ID.4", similar: "or similar (automatic)", year: "2024", cat: "Electric", catLabel: "Electric · AWD",
    perDay: 98, transmission: "Auto", seats: 5, bags: 4, drive: "AWD", fuel: "Electric", doors: 5, minAge: 23,
    rating: 4.7, reviews: 76, provider: "Europcar", tag: "Best Value", img: "assets/car-tesla.png",
    feats: ["A/C", "Heated Seats", "Adaptive Cruise", "Fast Charge"] },
  { id: "i10", name: "Hyundai i10", similar: "or similar (manual)", year: "2022", cat: "Compact", catLabel: "Compact · City",
    perDay: 34, transmission: "Manual", seats: 4, bags: 2, drive: "FWD", fuel: "Petrol", doors: 5, minAge: 20,
    rating: 4.5, reviews: 88, provider: "Hertz", tag: null, img: "assets/car-rav4.png",
    feats: ["A/C", "Bluetooth", "USB", "Eco"] },
  { id: "yaris", name: "Toyota Yaris", similar: "or similar (automatic)", year: "2023", cat: "Compact", catLabel: "Compact · Hybrid",
    perDay: 39, transmission: "Auto", seats: 5, bags: 2, drive: "FWD", fuel: "Hybrid", doors: 5, minAge: 20,
    rating: 4.6, reviews: 102, provider: "Hertz", tag: null, img: "assets/car-suv.png",
    feats: ["A/C", "Bluetooth", "Apple CarPlay", "Eco"] },
  { id: "defender", name: "Land Rover Defender", similar: "or similar (automatic)", year: "2023", cat: "Luxury", catLabel: "Luxury · 4x4",
    perDay: 189, transmission: "Auto", seats: 5, bags: 4, drive: "4WD", fuel: "Diesel", doors: 5, minAge: 25,
    rating: 5.0, reviews: 54, provider: "Blue Car Rental", tag: "Premium", img: "assets/car-rav4.png",
    feats: ["A/C", "Heated Seats", "360 Camera", "Terrain Response"] },
];

const TAG_STYLE = {
  "Recommended": "badge-primary",
  "Best Value": "badge-success",
  "Most Popular": "badge-soft",
  "Top Rated": "badge-soft",
  "Electric": "badge-soft",
  "Premium": "badge-amber",
};

const EXTRAS = [
  { id: "gps", name: "GPS Navigator", desc: "Turn-by-turn Iceland roads", price: 8, icon: "Gps", max: 1 },
  { id: "driver", name: "Additional Driver", desc: "Add a licensed co-driver", price: 7, icon: "Users", max: 4 },
  { id: "infant", name: "Infant Seat (0–1yr)", desc: "Babies up to 9 kg / 20 lbs", price: 6, icon: "Seat", max: 3 },
  { id: "child", name: "Child Seat (1–4yr)", desc: "Children 9–18 kg", price: 6, icon: "Seat", max: 3 },
  { id: "camp", name: "Camping Kit", desc: "Tent, stove & utensils", price: 15, icon: "Sparkle", max: 4 },
  { id: "wifi", name: "WiFi Hotspot", desc: "Unlimited 4G across Iceland", price: 10, icon: "Wifi", max: 2 },
  { id: "tires", name: "Winter Tires", desc: "Studded grip for ice & snow", price: 9, icon: "Snow", max: 1 },
  { id: "roadside", name: "Roadside Plus", desc: "24/7 priority assistance", price: 5, icon: "Shield", max: 1 },
];

const INCLUDED = [
  "CDW — Collision Damage Waiver",
  "Third Party Liability (TPL)",
  "Unlimited Mileage",
  "Free Cancellation (48h)",
  "Theft Protection",
];

const TRANSMISSIONS = ["Any", "Manual", "Auto"];
const FUEL_TYPES = [{ k: "Petrol", n: 4 }, { k: "Diesel", n: 8 }, { k: "Hybrid", n: 4 }, { k: "Electric", n: 2 }];
const FEATURES = ["A/C", "Bluetooth", "Heated Seats", "GPS Ready"];
const PROVIDERS = [{ k: "Blue Car Rental", n: 6 }, { k: "Lava Auto", n: 5 }, { k: "GO Iceland", n: 4 }, { k: "Lotus Car", n: 5 }, { k: "Hertz", n: 2 }, { k: "Europcar", n: 2 }];
const CATEGORIES = ["All", "SUV", "Compact", "4x4", "Electric", "Luxury"];

/* ============================================================
   Helpers
   ============================================================ */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function fmtDate(d) {
  if (!d) return "";
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
function fmtDateLong(d) {
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
  return `${wd}, ${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
function daysBetween(a, b) {
  const ms = b - a;
  return Math.max(1, Math.round(ms / 86400000));
}
function eur(n) { return "€" + n.toLocaleString("en-US", { maximumFractionDigits: 0 }); }
function eur2(n) { return "€" + n.toFixed(2); }
function isk(n) { return Math.round(n * 149).toLocaleString("en-US") + " ISK"; }
function sameDay(a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

function computeTotals(car, days, qty) {
  const base = car.perDay * days;
  let extrasTotal = 0;
  const lines = [];
  EXTRAS.forEach((e) => {
    const q = qty[e.id] || 0;
    if (q > 0) {
      const sum = e.price * q * days;
      extrasTotal += sum;
      lines.push({ id: e.id, name: e.name, qty: q, perDay: e.price, sum });
    }
  });
  const total = base + extrasTotal;
  return { base, extrasTotal, total, lines };
}

Object.assign(window, {
  Icons, LOCATIONS, TIMES, CARS, TAG_STYLE, EXTRAS, INCLUDED,
  TRANSMISSIONS, FUEL_TYPES, FEATURES, PROVIDERS, CATEGORIES,
  MONTHS, MONTHS_SHORT, DOW,
  fmtDate, fmtDateLong, daysBetween, eur, eur2, isk, sameDay, computeTotals,
});
