import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Place from './model/Place.js';
import Badge from './model/Badge.js';

dotenv.config();

const places = [
  // 1. COUNTRIES (PARENT CONTAINERS)
  {
    name: "India",
    category: "country",
    country: "India",
    city: "",
    continent: "Asia",
    description: "A vast South Asian country with diverse terrain – from Himalayan peaks to Indian Ocean coastline – and history reaching back 5,000 years.",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
    latitude: 20.5937,
    longitude: 78.9629
  },
  {
    name: "Japan",
    category: "country",
    country: "Japan",
    city: "",
    continent: "Asia",
    description: "An island country in East Asia, known for its dense cities, imperial palaces, mountainous national parks and thousands of shrines and temples.",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    latitude: 36.2048,
    longitude: 138.2529
  },
  {
    name: "France",
    category: "country",
    country: "France",
    city: "",
    continent: "Europe",
    description: "Encompasses medieval cities, alpine villages and Mediterranean beaches. Paris, its capital, is famed for its fashion houses and classical museums.",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    latitude: 46.2276,
    longitude: 2.2137
  },
  {
    name: "United States",
    category: "country",
    country: "United States",
    city: "",
    continent: "North America",
    description: "A country of 50 states covering a vast swath of North America, with Alaska in the northwest and Hawaii extending the nation’s presence into the Pacific Ocean.",
    imageUrl: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80",
    latitude: 37.0902,
    longitude: -95.7129
  },
  {
    name: "Switzerland",
    category: "country",
    country: "Switzerland",
    city: "",
    continent: "Europe",
    description: "A mountainous Central European country, home to numerous lakes, villages and the high peaks of the Alps.",
    imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    latitude: 46.8182,
    longitude: 8.2275
  },

  // 2. STATES (PARENT CONTAINERS)
  {
    name: "Maharashtra",
    category: "state",
    country: "India",
    city: "",
    continent: "Asia",
    description: "A state in the western peninsular region of India occupying a substantial portion of the Deccan Plateau. Famed for its historical Maratha forts and caves.",
    imageUrl: "https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&w=800&q=80",
    latitude: 19.7515,
    longitude: 75.7139
  },
  {
    name: "Rajasthan",
    category: "state",
    country: "India",
    city: "",
    continent: "Asia",
    description: "A state in northwestern India. It covers 342,239 square kilometres or 10.4 percent of India's total geographical area. Famed for deserts, palaces, and forts.",
    imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    latitude: 27.0238,
    longitude: 74.2179
  },
  {
    name: "Kerala",
    category: "state",
    country: "India",
    city: "",
    continent: "Asia",
    description: "A state on India's tropical Malabar Coast, has nearly 600km of Arabian Sea shoreline. It's known for its palm-lined beaches and backwaters.",
    imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    latitude: 10.8505,
    longitude: 76.2711
  },
  {
    name: "Karnataka",
    category: "state",
    country: "India",
    city: "",
    continent: "Asia",
    description: "A state in southwest India, with Arabian Sea coastlines. Famed for ancient Hampi ruins and royal heritage palaces.",
    imageUrl: "https://images.unsplash.com/photo-1600100397990-a4783a1523a8?auto=format&fit=crop&w=800&q=80",
    latitude: 15.3173,
    longitude: 75.7139
  },
  {
    name: "Uttar Pradesh",
    category: "state",
    country: "India",
    city: "",
    continent: "Asia",
    description: "A state in northern India. With over 200 million inhabitants, it is the most populous state in India, rich in Mughal architecture.",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    latitude: 26.8467,
    longitude: 80.9462
  },

  // 3. CITIES (PARENT CONTAINERS)
  {
    name: "Mumbai",
    category: "city",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A densely populated city on India’s west coast. A financial center, India's largest city, and home of Bollywood film industry.",
    imageUrl: "https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&w=800&q=80",
    latitude: 19.0760,
    longitude: 72.8777
  },
  {
    name: "Pune",
    category: "city",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    continent: "Asia",
    description: "A major educational and technology center in Maharashtra, historic capital of the Peshwas of the Maratha Empire.",
    imageUrl: "https://images.unsplash.com/photo-1601962387195-236b2f7678f2?auto=format&fit=crop&w=800&q=80",
    latitude: 18.5204,
    longitude: 73.8567
  },
  {
    name: "Jaipur",
    category: "city",
    country: "India",
    state: "Rajasthan",
    city: "Jaipur",
    continent: "Asia",
    description: "The capital of India’s Rajasthan state. It evokes the royal family that once ruled the region and that, in 1727, founded what is now called the Old City.",
    imageUrl: "https://images.unsplash.com/photo-1477587458883-471a5ed94245?auto=format&fit=crop&w=800&q=80",
    latitude: 26.9124,
    longitude: 75.7873
  },
  {
    name: "Agra",
    category: "city",
    country: "India",
    state: "Uttar Pradesh",
    city: "Agra",
    continent: "Asia",
    description: "A city on the banks of the Yamuna river in the Indian state of Uttar Pradesh. Famed globally for the majestic Taj Mahal complex.",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    latitude: 27.1767,
    longitude: 78.0081
  },
  {
    name: "New Delhi",
    category: "city",
    country: "India",
    state: "Delhi",
    city: "New Delhi",
    continent: "Asia",
    description: "The capital of India, a historic metropolis presenting a mix of imperial monuments and vibrant bazaar cultures.",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    latitude: 28.6139,
    longitude: 77.2090
  },

  // 4. BASE ATTRACTIONS / DESTINATIONS (CHECKLIST ITEMS)
  // --- MUMBAI ---
  {
    name: "Gateway of India",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "An arch-monument built in the early twentieth century in the city of Mumbai to commemorate the landing of King George V.",
    imageUrl: "https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&w=800&q=80",
    latitude: 18.9220,
    longitude: 72.8347
  },
  {
    name: "Siddhivinayak Temple",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A historic Hindu temple dedicated to Lord Shri Ganesh, located in Prabhadevi, Mumbai. One of the richest temples in India.",
    imageUrl: "https://images.unsplash.com/photo-1601962387195-236b2f7678f2?auto=format&fit=crop&w=800&q=80",
    latitude: 19.0169,
    longitude: 72.8303
  },
  {
    name: "Marine Drive",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A 3-kilometre-long Promenade along the Netaji Subhash Chandra Bose Road in South Mumbai. Often called the Queen's Necklace.",
    imageUrl: "https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?auto=format&fit=crop&w=800&q=80",
    latitude: 18.9431,
    longitude: 72.8230
  },
  {
    name: "Bandra-Worli Sea Link",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A cable-stayed bridge that links Bandra in the Western Suburbs of Mumbai with Worli in South Mumbai.",
    imageUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80",
    latitude: 19.0330,
    longitude: 72.8184
  },
  {
    name: "Haji Ali Dargah",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A mosque and dargah or monument of Pir Haji Ali Shah Bukhari located on an islet off the coast of Worli in South Mumbai.",
    imageUrl: "https://images.unsplash.com/photo-1599933333938-f9754f9a01b2?auto=format&fit=crop&w=800&q=80",
    latitude: 18.9827,
    longitude: 72.8089
  },

  // --- PUNE ---
  {
    name: "Shaniwar Wada",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    continent: "Asia",
    description: "A 18th-century fortification in the city of Pune. Built in 1732, it was the seat of the Peshwas of the Maratha Empire until 1818.",
    imageUrl: "https://images.unsplash.com/photo-1601962387195-236b2f7678f2?auto=format&fit=crop&w=800&q=80",
    latitude: 18.5196,
    longitude: 73.8553
  },
  {
    name: "Sinhagad Fort",
    category: "fort",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    continent: "Asia",
    description: "An ancient hill fortress located at the Sahyadri Mountains, outstandingly famous for the Battle of Sinhagad fought by Tanaji Malusare.",
    imageUrl: "https://images.unsplash.com/photo-1600100397990-a4783a1523a8?auto=format&fit=crop&w=800&q=80",
    latitude: 18.3662,
    longitude: 73.7558
  },
  {
    name: "Aga Khan Palace",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    continent: "Asia",
    description: "Built in 1892 by Sultan Muhammed Shah Aga Khan III. It is a majestic building closely associated with the Indian independence movement.",
    imageUrl: "https://images.unsplash.com/photo-1601962387195-236b2f7678f2?auto=format&fit=crop&w=800&q=80",
    latitude: 18.5524,
    longitude: 73.9015
  },
  {
    name: "Dagdusheth Halwai Temple",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    continent: "Asia",
    description: "A renowned Ganpati temple in Pune, celebrated for its gorgeous golden idol and grand celebrations during Ganesh Utsav.",
    imageUrl: "https://images.unsplash.com/photo-1601962387195-236b2f7678f2?auto=format&fit=crop&w=800&q=80",
    latitude: 18.5164,
    longitude: 73.8561
  },

  // --- JAIPUR ---
  {
    name: "Hawa Mahal",
    category: "wonder",
    country: "India",
    state: "Rajasthan",
    city: "Jaipur",
    continent: "Asia",
    description: "A palace in the city of Jaipur, India. Built from red and pink sandstone, designed as a honeycomb dome for royal ladies to view the street life.",
    imageUrl: "https://images.unsplash.com/photo-1477587458883-471a5ed94245?auto=format&fit=crop&w=800&q=80",
    latitude: 26.9239,
    longitude: 75.8267
  },
  {
    name: "Amer Fort",
    category: "fort",
    country: "India",
    state: "Rajasthan",
    city: "Jaipur",
    continent: "Asia",
    description: "A magnificent fort located in Amer, Rajasthan. Famed for its artistic style elements, large ramparts, and series of gates overlooking Maota Lake.",
    imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    latitude: 26.9855,
    longitude: 75.8513
  },
  {
    name: "Jal Mahal",
    category: "landmark",
    country: "India",
    state: "Rajasthan",
    city: "Jaipur",
    continent: "Asia",
    description: "A palace in the middle of the Man Sagar Lake in Jaipur city, presenting an epic floating architectural visual.",
    imageUrl: "https://images.unsplash.com/photo-1477587458883-471a5ed94245?auto=format&fit=crop&w=800&q=80",
    latitude: 26.9656,
    longitude: 75.8456
  },
  {
    name: "Jantar Mantar",
    category: "landmark",
    country: "India",
    state: "Rajasthan",
    city: "Jaipur",
    continent: "Asia",
    description: "A collection of nineteen architectural astronomical instruments built by the Rajput king Sawai Jai Singh II, featuring the world's largest stone sundial.",
    imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    latitude: 26.9248,
    longitude: 75.8245
  },

  // --- AGRA ---
  {
    name: "Taj Mahal",
    category: "wonder",
    country: "India",
    state: "Uttar Pradesh",
    city: "Agra",
    continent: "Asia",
    description: "An immense mausoleum of white marble, built in Agra by order of the Mughal emperor Shah Jahan in memory of his favorite wife Mumtaz Mahal.",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    latitude: 27.1751,
    longitude: 78.0421
  },
  {
    name: "Agra Fort",
    category: "fort",
    country: "India",
    state: "Uttar Pradesh",
    city: "Agra",
    continent: "Asia",
    description: "A historical fort in the city of Agra. It was the main residence of the emperors of the Mughal Dynasty until the capital shifted to Delhi.",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    latitude: 27.1795,
    longitude: 78.0211
  },
  {
    name: "Mehtab Bagh",
    category: "landmark",
    country: "India",
    state: "Uttar Pradesh",
    city: "Agra",
    continent: "Asia",
    description: "A charbagh garden complex located north of the Taj Mahal complex, offering a breathtaking, unobstructed view of the Taj from across the river.",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    latitude: 27.1895,
    longitude: 78.0421
  },

  // --- NEW DELHI ---
  {
    name: "India Gate",
    category: "landmark",
    country: "India",
    state: "Delhi",
    city: "New Delhi",
    continent: "Asia",
    description: "A war memorial located astride the Rajpath, on the eastern edge of the 'ceremonial axis' of New Delhi.",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    latitude: 28.6129,
    longitude: 77.2295
  },
  {
    name: "Red Fort",
    category: "fort",
    country: "India",
    state: "Delhi",
    city: "New Delhi",
    continent: "Asia",
    description: "A historic fort complex in Old Delhi, built by Emperor Shah Jahan. Famed for its red sandstone architectural excellence.",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    latitude: 28.6562,
    longitude: 77.2410
  },
  {
    name: "Lotus Temple",
    category: "landmark",
    country: "India",
    state: "Delhi",
    city: "New Delhi",
    continent: "Asia",
    description: "A Baháʼí House of Worship in New Delhi, notable for its flowerlike shape, it has become a prominent attraction in the city.",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    latitude: 28.5535,
    longitude: 77.2588
  },
  {
    name: "Akshardham Temple",
    category: "landmark",
    country: "India",
    state: "Delhi",
    city: "New Delhi",
    continent: "Asia",
    description: "A colossal spiritual-cultural campus displaying millennia of traditional Indian and Hindu culture, spirituality, and architecture.",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    latitude: 28.6127,
    longitude: 77.2773
  },

  // --- PARIS ---
  {
    name: "Eiffel Tower",
    category: "landmark",
    country: "France",
    state: "Île-de-France",
    city: "Paris",
    continent: "Europe",
    description: "A wrought-iron lattice tower on the Champ de Mars in Paris, France. Named after the engineer Gustave Eiffel.",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    latitude: 48.8584,
    longitude: 2.2945
  },
  {
    name: "Louvre Museum",
    category: "landmark",
    country: "France",
    state: "Île-de-France",
    city: "Paris",
    continent: "Europe",
    description: "The world's largest art museum and a historic monument in Paris, home to the Mona Lisa and Venus de Milo.",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    latitude: 48.8606,
    longitude: 2.3376
  },

  // --- NEW YORK CITY ---
  {
    name: "Statue of Liberty",
    category: "landmark",
    country: "United States",
    state: "New York",
    city: "New York City",
    continent: "North America",
    description: "A colossal neoclassical sculpture on Liberty Island in New York Harbor. A global symbol of freedom.",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    latitude: 40.6892,
    longitude: -74.0445
  },
  {
    name: "Empire State Building",
    category: "landmark",
    country: "United States",
    state: "New York",
    city: "New York City",
    continent: "North America",
    description: "A 102-story Art Deco skyscraper in Midtown Manhattan in New York City, designed by Shreve, Lamb & Harmon.",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    latitude: 40.7484,
    longitude: -74.0060
  },

  // --- JAPAN ---
  {
    name: "Mount Fuji",
    category: "wonder",
    country: "Japan",
    state: "Honshu",
    city: "Tokyo",
    continent: "Asia",
    description: "Japan’s Mt. Fuji is an active volcano about 100 kilometers southwest of Tokyo. Commonly called 'Fuji-san,' it's the country’s tallest peak.",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    latitude: 35.3606,
    longitude: 138.7274
  },
  {
    name: "Fushimi Inari Shrine",
    category: "landmark",
    country: "Japan",
    state: "Kyoto",
    city: "Kyoto",
    continent: "Asia",
    description: "An important Shinto shrine in southern Kyoto. Famous for its thousands of vermilion torii gates, which straddle a network of trails behind its main buildings.",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    latitude: 34.9671,
    longitude: 135.7727
  }
];

const badges = [
  // EXPLORER BADGES
  {
    name: "First Steps Explorer",
    description: "Unlock by visiting your very first place on Earth!",
    icon: "🧭",
    level: "bronze",
    type: "explorer",
    criteria: "Visit 1 place"
  },
  {
    name: "World Citizen",
    description: "Awarded to seasoned travellers who have logged at least 5 visits.",
    icon: "🗺️",
    level: "silver",
    type: "explorer",
    criteria: "Visit 5 places"
  },
  {
    name: "Globe Trotter Master",
    description: "Awarded for exceptional exploration! You've logged 15 or more unique visits.",
    icon: "👑",
    level: "gold",
    type: "explorer",
    criteria: "Visit 15 places"
  },
  {
    name: "Legendary Wayfinder",
    description: "You have conquered the ranks and logged over 25 destinations worldwide!",
    icon: "🪐",
    level: "legendary",
    type: "explorer",
    criteria: "Visit 25 places"
  },

  // MILESTONE BADGES
  {
    name: "Conqueror of Wonders",
    description: "Visited at least one of the magnificent Wonders of the ancient and modern World.",
    icon: "✨",
    level: "platinum",
    type: "milestone",
    criteria: "Visit a Wonder of the World"
  },
  {
    name: "Wonders Collector",
    description: "Logged a visit to 3 or more World Wonders! Truly extraordinary.",
    icon: "🏛️",
    level: "gold",
    type: "milestone",
    criteria: "Visit 3 Wonders of the World"
  },
  {
    name: "Seven Wonders Sage",
    description: "Successfully checked off 5 or more legendary Wonders of the World!",
    icon: "🌠",
    level: "legendary",
    type: "milestone",
    criteria: "Visit 5 Wonders of the World"
  },
  {
    name: "Fortress Seeker",
    description: "Logged a visit to a historical fort, experiencing ancient defense architectures.",
    icon: "🏰",
    level: "silver",
    type: "milestone",
    criteria: "Visit 1 Fort"
  },
  {
    name: "Fortress Overlord",
    description: "Logged visits to 3 or more historic forts globally.",
    icon: "🛡️",
    level: "platinum",
    type: "milestone",
    criteria: "Visit 3 Forts"
  },
  {
    name: "City Hopper",
    description: "Explored 3 or more iconic global metropolises.",
    icon: "🏙️",
    level: "silver",
    type: "milestone",
    criteria: "Visit 3 Cities"
  },
  {
    name: "Metropolis Tycoon",
    description: "Explored 7 or more major global cities across the world.",
    icon: "🌃",
    level: "gold",
    type: "milestone",
    criteria: "Visit 7 Cities"
  },
  {
    name: "State Voyager",
    description: "Visited and explored 2 or more distinct state regions.",
    icon: "🏕️",
    level: "bronze",
    type: "milestone",
    criteria: "Visit 2 States"
  },

  // HIDDEN GEMS BADGES
  {
    name: "Hidden Gem Explorer",
    description: "Awarded for contributing a verified hidden gem that gets approved by the community.",
    icon: "💎",
    level: "gold",
    type: "hidden_gem",
    criteria: "Submit 1 approved Hidden Gem"
  },
  {
    name: "Gem Master Finder",
    description: "Successfully submitted and got 3 hidden gems verified and approved by admins.",
    icon: "💎✨",
    level: "platinum",
    type: "hidden_gem",
    criteria: "Submit 3 approved Hidden Gems"
  },
  {
    name: "Ultimate Pathologist",
    description: "Unlock this ultimate legendary status by getting 5 or more hidden gems approved.",
    icon: "🌟",
    level: "legendary",
    type: "hidden_gem",
    criteria: "Submit 5 approved Hidden Gems"
  }
];

const seedDB = async () => {
  try {
    console.log('Connecting to database for seeding...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected successfully!');

    // Clear existing
    console.log('Clearing old places...');
    await Place.deleteMany({});
    console.log('Clearing old badges...');
    await Badge.deleteMany({});

    // Seed
    console.log(`Inserting ${places.length} starter places...`);
    await Place.insertMany(places);
    console.log('Places seeded successfully!');

    console.log(`Inserting ${badges.length} starter badges...`);
    await Badge.insertMany(badges);
    console.log('Badges seeded successfully!');

    console.log('Database seeding process completed successfully! 🎉');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedDB();
