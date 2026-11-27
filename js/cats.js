// Adoptable cats. Edit this list to update the Adopt page and the homepage preview.
// Fields:
//   name, age ("kitten" | "young" | "adult" | "senior", used by the Adopt page filters),
//   ageLabel, sex, coat (optional), photo (path like "assets/cats/kaya.jpg", or "" for the placeholder),
//   traits (short tags), story, pair (optional note shown in a box, e.g. for related cats),
//   status ("available" | "pending"), featured (true shows on homepage; the first three are used)
// NOTE: Kaya and Beba are real. The cats after them are samples to replace or remove.
var KAYA_BEBA = "Kaya and Beba are mother and daughter, each with her own special personality. They can each find their own forever home, or perhaps someone might fall in love with both!";
window.GA_CATS = [
  {
    name: "Kaya",
    age: "adult",
    ageLabel: "2–3 years old",
    sex: "Female",
    coat: "Tuxedo",
    photo: "",
    traits: ["Affectionate", "Cuddly", "Clever"],
    story: "Kaya is a loving mama with a heart as sweet as they come. She's affectionate, cuddly, and clever, and loves sharing cozy moments with her favorite people. Now that she's raised her little one, it's her turn to be spoiled with love and find a family she can call her own!",
    pair: KAYA_BEBA,
    status: "available",
    featured: true
  },
  {
    name: "Beba",
    age: "young",
    ageLabel: "1.5–2 years old",
    sex: "Female",
    coat: "Tortoiseshell",
    photo: "",
    traits: ["Playful", "Confident", "Full of character"],
    story: "Beba is Kaya's daughter and a playful little character with a personality all her own! She's confident, a bit bossy, and definitely knows what she wants. But beneath that independent spirit is a lovely girl with a sweet side that makes her extra special. If you appreciate a cat with character, charm, and plenty of personality, Beba might be your girl!",
    pair: KAYA_BEBA,
    status: "available",
    featured: true
  },
  {
    name: "Luna",
    age: "young",
    ageLabel: "1 year",
    sex: "Female",
    photo: "",
    traits: ["Playful", "Good with cats"],
    story: "Luna chases sunbeams by day and moonbeams by night. She'd love a home with a window perch.",
    status: "available",
    featured: true
  },
  {
    name: "Orión",
    age: "adult",
    ageLabel: "4 years",
    sex: "Male",
    photo: "",
    traits: ["Lap cat", "Calm"],
    story: "A gentle giant who believes every lap was made for him. Purrs on contact.",
    status: "available",
    featured: true
  },
  {
    name: "Estrella & Cometa",
    age: "kitten",
    ageLabel: "3 months",
    sex: "Bonded pair",
    photo: "",
    traits: ["Bonded pair", "Curious"],
    story: "Sisters who do everything together — naps, zoomies, and investigating cardboard boxes.",
    status: "available",
    featured: true
  },
  {
    name: "Nebulosa",
    age: "senior",
    ageLabel: "11 years",
    sex: "Female",
    photo: "",
    traits: ["Senior", "Quiet home"],
    story: "A dignified lady looking for a peaceful retirement full of soft blankets and treats.",
    status: "available",
    featured: false
  },
  {
    name: "Sol",
    age: "adult",
    ageLabel: "6 years",
    sex: "Male",
    photo: "",
    traits: ["Special needs", "Affectionate"],
    story: "Sol is FIV+ and living his best life. He's chatty, loving, and needs an indoor-only home.",
    status: "pending",
    featured: false
  },
  {
    name: "Pixel",
    age: "kitten",
    ageLabel: "5 months",
    sex: "Male",
    photo: "",
    traits: ["Energetic", "Good with kids"],
    story: "Small cat, big personality. Pixel will keep you entertained for hours.",
    status: "available",
    featured: false
  }
];
