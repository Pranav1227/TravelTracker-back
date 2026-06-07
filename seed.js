import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
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
  {
    name: "Goa",
    category: "state",
    country: "India",
    city: "",
    continent: "Asia",
    description: "A state in western India with coastlines stretching along the Arabian Sea. Famous for its beaches, places of worship and world heritage architecture.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    latitude: 15.2993,
    longitude: 74.1240
  },
  {
    name: "Gujarat",
    category: "state",
    country: "India",
    city: "",
    continent: "Asia",
    description: "A state on the western coast of India with a coastline of about 1,600 km. Renowned for its rich heritage, temples, and industrial development.",
    imageUrl: "https://images.unsplash.com/photo-1600100397990-a4783a1523a8?auto=format&fit=crop&w=800&q=80",
    latitude: 22.2587,
    longitude: 71.1924
  },
  {
    name: "Uttarakhand",
    category: "state",
    country: "India",
    city: "",
    continent: "Asia",
    description: "A state in northern India crossed by the Himalayas, known for its Hindu pilgrimage sites, temples, and national parks.",
    imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
    latitude: 30.0668,
    longitude: 79.0193
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
    name: "Aurangabad",
    category: "city",
    country: "India",
    state: "Maharashtra",
    city: "Aurangabad",
    continent: "Asia",
    description: "A historic city in Maharashtra, famous for the UNESCO World Heritage Ajanta and Ellora Caves and Bibi Ka Maqbara.",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    latitude: 19.8762,
    longitude: 75.3433
  },
  {
    name: "Nashik",
    category: "city",
    country: "India",
    state: "Maharashtra",
    city: "Nashik",
    continent: "Asia",
    description: "An ancient holy city in northwest Maharashtra, famed for its association with the Ramayana, temples, and Sula wine vineyards.",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
    latitude: 19.9975,
    longitude: 73.7898
  },
  {
    name: "Nagpur",
    category: "city",
    country: "India",
    state: "Maharashtra",
    city: "Nagpur",
    continent: "Asia",
    description: "The winter capital of Maharashtra, known as the 'Orange City' and the geographic center of India at the Zero Mile marker.",
    imageUrl: "https://images.unsplash.com/photo-1600100397990-a4783a1523a8?auto=format&fit=crop&w=800&q=80",
    latitude: 21.1458,
    longitude: 79.0882
  },
  {
    name: "Kolhapur",
    category: "city",
    country: "India",
    state: "Maharashtra",
    city: "Kolhapur",
    continent: "Asia",
    description: "An ancient city in southern Maharashtra, famous for its historic temples, leather footwear (Kolhapuri chappals), and spice mixtures.",
    imageUrl: "https://images.unsplash.com/photo-1599933333938-f9754f9a01b2?auto=format&fit=crop&w=800&q=80",
    latitude: 16.7050,
    longitude: 74.2433
  },
  {
    name: "Sindhudurg",
    category: "city",
    country: "India",
    state: "Maharashtra",
    city: "Sindhudurg",
    continent: "Asia",
    description: "A beautiful coastal district in Konkan, famous for its sea fortress Sindhudurg, beaches, and delicious Malvani cuisine.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    latitude: 16.1158,
    longitude: 73.6936
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
  {
    name: "Chhatrapati Shivaji Maharaj Terminus (CSMT)",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A historic terminal train station and UNESCO World Heritage Site in Mumbai, renowned for its Victorian Gothic Revival architecture.",
    imageUrl: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800&q=80",
    latitude: 18.9398,
    longitude: 72.8355
  },
  {
    name: "Elephanta Caves",
    category: "wonder",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A UNESCO World Heritage Site featuring a collection of cave temples predominantly dedicated to the Hindu god Shiva, located on Elephanta Island.",
    imageUrl: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
    latitude: 18.9633,
    longitude: 72.9315
  },
  {
    name: "Juhu Beach",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "One of Mumbai's most famous beaches, stretching along the Arabian Sea, renowned for its local street food like Bhel Puri and Pav Bhaji.",
    imageUrl: "https://images.unsplash.com/photo-1626285861696-9f0be5a49c6e?auto=format&fit=crop&w=800&q=80",
    latitude: 19.1002,
    longitude: 72.8268
  },
  {
    name: "Colaba Causeway",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A bustling commercial street in South Mumbai, famous for street shopping, historic cafes, and vibrant old-world charm.",
    imageUrl: "https://images.unsplash.com/photo-1598371172101-71fb3d8544bd?auto=format&fit=crop&w=800&q=80",
    latitude: 18.9186,
    longitude: 72.8290
  },
  {
    name: "Sanjay Gandhi National Park",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A large protected forest area in northern Mumbai, notable for its rich flora and fauna and the ancient Buddhist Kanheri Caves.",
    imageUrl: "https://images.unsplash.com/photo-1616782414775-bd7f0e698379?auto=format&fit=crop&w=800&q=80",
    latitude: 19.2291,
    longitude: 72.9152
  },
  {
    name: "Mount Mary Basilica",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A beautiful historic Roman Catholic Basilica located in Bandra, Mumbai, built on a hillock overlooking the Arabian Sea.",
    imageUrl: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80",
    latitude: 19.0468,
    longitude: 72.8224
  },
  {
    name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (CSMVS)",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "Formerly the Prince of Wales Museum, it is a magnificent Indo-Saracenic structure housing art, archaeology, and natural history.",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    latitude: 18.9269,
    longitude: 72.8327
  },
  {
    name: "Girgaon Chowpatty",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A popular sandy beach in south Mumbai, famous for local street foods and the yearly Ganesh Visarjan celebrations.",
    imageUrl: "https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?auto=format&fit=crop&w=800&q=80",
    latitude: 18.9542,
    longitude: 72.8153
  },
  {
    name: "Global Vipassana Pagoda",
    category: "wonder",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A monumental meditation hall dome near Gorai, built as a tribute to Gautama Buddha. It is one of the world's largest stone domes without supporting pillars.",
    imageUrl: "https://images.unsplash.com/photo-1600100397990-a4783a1523a8?auto=format&fit=crop&w=800&q=80",
    latitude: 19.2285,
    longitude: 72.8058
  },
  {
    name: "Mahalakshmi Temple",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A famous Hindu temple dedicated to Goddess Mahalakshmi, built in 1831 along the seaside at Bhulabhai Desai Road.",
    imageUrl: "https://images.unsplash.com/photo-1599933333938-f9754f9a01b2?auto=format&fit=crop&w=800&q=80",
    latitude: 18.9775,
    longitude: 72.8068
  },
  {
    name: "Hanging Gardens",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "Terraced gardens perched at the top of Malabar Hill, offering lovely sunset views over the Arabian Sea and the Queen's Necklace.",
    imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
    latitude: 18.9566,
    longitude: 72.8054
  },
  {
    name: "Lalbaugcha Raja",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "The most famous and revered public Ganesha idol in Mumbai, attracting millions of devotees during the 10-day Ganeshotsav festival.",
    imageUrl: "https://images.unsplash.com/photo-1601962387195-236b2f7678f2?auto=format&fit=crop&w=800&q=80",
    latitude: 18.9902,
    longitude: 72.8398
  },
  {
    name: "Asiatic Society Town Hall",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "An iconic neo-classical Town Hall structure housing a vast library with historic manuscripts, located in Horniman Circle.",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
    latitude: 18.9322,
    longitude: 72.8370
  },
  {
    name: "Crawford Market",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A historic, bustling market housed in a grand Victorian building, famous for its shopping variety of fresh fruits, pets, and imports.",
    imageUrl: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
    latitude: 18.9472,
    longitude: 72.8339
  },
  {
    name: "Kanheri Caves",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    continent: "Asia",
    description: "A group of ancient rock-cut Buddhist caves dating from the 1st century BCE, nestled deep inside Sanjay Gandhi National Park.",
    imageUrl: "https://images.unsplash.com/photo-1598371172101-71fb3d8544bd?auto=format&fit=crop&w=800&q=80",
    latitude: 19.2062,
    longitude: 72.9062
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
    name: "Raigad Fort",
    category: "fort",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    continent: "Asia",
    description: "The historic capital fort of the Maratha Empire, where Chhatrapati Shivaji Maharaj was crowned and laid his final resting place.",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    latitude: 18.2347,
    longitude: 73.4411
  },
  {
    name: "Rajgad Fort",
    category: "fort",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    continent: "Asia",
    description: "The royal capital of the Maratha Empire for over 26 years, known for its massive architecture and challenging trek paths.",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    latitude: 18.2469,
    longitude: 73.6822
  },
  {
    name: "Pratapgad Fort",
    category: "fort",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    continent: "Asia",
    description: "A majestic hill fort in Satara district, site of the historic Battle of Pratapgad where Shivaji Maharaj defeated Afzal Khan.",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    latitude: 17.9328,
    longitude: 73.5828
  },
  {
    name: "Shivneri Fort",
    category: "fort",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    continent: "Asia",
    description: "The historic birthplace of Chhatrapati Shivaji Maharaj, featuring beautiful water cisterns and a temple dedicated to Goddess Shivai.",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    latitude: 19.1989,
    longitude: 73.8617
  },
  {
    name: "Torna Fort",
    category: "fort",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    continent: "Asia",
    description: "Also known as Prachandagad, it is the first fort captured by Chhatrapati Shivaji Maharaj in 1646, marking the birth of Swarajya.",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    latitude: 18.2764,
    longitude: 73.6214
  },
  {
    name: "Lohagad Fort",
    category: "fort",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    continent: "Asia",
    description: "An iron-strong hill fort near Lonavala, featuring the famous 'Vinchu Kada' (scorpion's tail) cliff point, highly popular for monsoon treks.",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    latitude: 18.7338,
    longitude: 73.4792
  },
  {
    name: "Harishchandragad Fort",
    category: "fort",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    continent: "Asia",
    description: "A legendary hill fort famous for its semi-circular Konkan Kada cliff, Kedareshwar Cave, and ancient stone carvings.",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    latitude: 19.3850,
    longitude: 73.7744
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

  // --- AURANGABAD ---
  {
    name: "Ajanta Caves",
    category: "wonder",
    country: "India",
    state: "Maharashtra",
    city: "Aurangabad",
    continent: "Asia",
    description: "UNESCO World Heritage rock-cut Buddhist cave monuments dating from the 2nd century BCE, containing masterworks of ancient Indian art.",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    latitude: 20.5526,
    longitude: 75.7033
  },
  {
    name: "Ellora Caves",
    category: "wonder",
    country: "India",
    state: "Maharashtra",
    city: "Aurangabad",
    continent: "Asia",
    description: "One of the largest rock-cut monastery-temple cave complexes in the world, featuring the monumental Kailash temple.",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    latitude: 20.0258,
    longitude: 75.1780
  },
  {
    name: "Bibi Ka Maqbara",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Aurangabad",
    continent: "Asia",
    description: "A beautiful 17th-century tomb built by Prince Azam Shah in memory of his mother. Heavily resembles the iconic Taj Mahal.",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    latitude: 19.9014,
    longitude: 75.3203
  },
  {
    name: "Panchakki",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Aurangabad",
    continent: "Asia",
    description: "A historic water mill built in the 17th century, designed to generate clean energy to grind grain for pilgrims.",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
    latitude: 19.8913,
    longitude: 75.3236
  },

  // --- NASHIK ---
  {
    name: "Trimbakeshwar Jyotirlinga Temple",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Nashik",
    continent: "Asia",
    description: "An ancient Shiva temple housing one of the twelve sacred Jyotirlingas, situated at the source of the holy Godavari River.",
    imageUrl: "https://images.unsplash.com/photo-1601962387195-236b2f7678f2?auto=format&fit=crop&w=800&q=80",
    latitude: 19.9328,
    longitude: 73.5303
  },
  {
    name: "Sula Vineyards",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Nashik",
    continent: "Asia",
    description: "India's premier winery and vineyard estate, offering wine tours, tastings, and lovely views of the Gangapur lake.",
    imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
    latitude: 19.9972,
    longitude: 73.7028
  },
  {
    name: "Panchavati",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Nashik",
    continent: "Asia",
    description: "A holy area situated on the banks of Godavari, featuring the Kalaram Temple and Sita Gufaa, highly significant in the Ramayana.",
    imageUrl: "https://images.unsplash.com/photo-1598371172101-71fb3d8544bd?auto=format&fit=crop&w=800&q=80",
    latitude: 20.0078,
    longitude: 73.7997
  },
  {
    name: "Pandavleni Caves",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Nashik",
    continent: "Asia",
    description: "A group of 24 ancient rock-cut Buddhist caves built between the 1st century BCE and the 3rd century CE on a scenic hill.",
    imageUrl: "https://images.unsplash.com/photo-1598371172101-71fb3d8544bd?auto=format&fit=crop&w=800&q=80",
    latitude: 19.9619,
    longitude: 73.7489
  },

  // --- NAGPUR ---
  {
    name: "Deekshabhoomi",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Nagpur",
    continent: "Asia",
    description: "A sacred monument of Navayana Buddhism where Dr. B. R. Ambedkar embraced Buddhism, featuring a massive, grand white dome.",
    imageUrl: "https://images.unsplash.com/photo-1598371172101-71fb3d8544bd?auto=format&fit=crop&w=800&q=80",
    latitude: 21.1274,
    longitude: 79.0683
  },
  {
    name: "Futala Lake",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Nagpur",
    continent: "Asia",
    description: "A historic lake built by the Bhonsle kings, famous for its colorful evening musical fountain show and sunset promenade.",
    imageUrl: "https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?auto=format&fit=crop&w=800&q=80",
    latitude: 21.1511,
    longitude: 79.0433
  },
  {
    name: "Zero Mile Stone",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Nagpur",
    continent: "Asia",
    description: "A historical monument built by the British Raj locating the geographical center of undivided India, containing four sandstone horses.",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
    latitude: 21.1524,
    longitude: 79.0883
  },

  // --- KOLHAPUR ---
  {
    name: "Mahalakshmi Temple (Ambabai)",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Kolhapur",
    continent: "Asia",
    description: "An ancient Hindu temple dedicated to Goddess Mahalakshmi, built in the 7th century by Chalukya rulers. One of the Shakti Peethas.",
    imageUrl: "https://images.unsplash.com/photo-1601962387195-236b2f7678f2?auto=format&fit=crop&w=800&q=80",
    latitude: 16.6944,
    longitude: 74.2231
  },
  {
    name: "Rankala Lake",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Kolhapur",
    continent: "Asia",
    description: "A historic, picturesque lake in Kolhapur, surrounded by lush gardens, food stalls, and boating activities.",
    imageUrl: "https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?auto=format&fit=crop&w=800&q=80",
    latitude: 16.6892,
    longitude: 74.2128
  },
  {
    name: "Shalini Palace",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Kolhapur",
    continent: "Asia",
    description: "A majestic palace built on the banks of Rankala Lake in 1932, showcasing rich Italian marble construction.",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    latitude: 16.6869,
    longitude: 74.2114
  },

  // --- SINDHUDURG ---
  {
    name: "Sindhudurg Fort",
    category: "wonder",
    country: "India",
    state: "Maharashtra",
    city: "Sindhudurg",
    continent: "Asia",
    description: "A massive and historic ocean fortress built by Chhatrapati Shivaji Maharaj in 1664 on a rocky island off Malvan coast.",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    latitude: 16.0486,
    longitude: 73.4619
  },
  {
    name: "Tarkarli Beach",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Sindhudurg",
    continent: "Asia",
    description: "A popular sandy beach renowned for its transparent turquoise waters, white sand, and water sports like scuba diving and snorkeling.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    latitude: 16.0319,
    longitude: 73.4914
  },
  {
    name: "Vijaydurg Fort",
    category: "landmark",
    country: "India",
    state: "Maharashtra",
    city: "Sindhudurg",
    continent: "Asia",
    description: "The oldest fort on the Sindhudurg coast, built during the Shilahara dynasty and later strengthened by Shivaji Maharaj.",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    latitude: 16.5583,
    longitude: 73.3333
  },

  // --- GOA ---
  {
    name: "Calangute Beach",
    category: "landmark",
    country: "India",
    state: "Goa",
    city: "Goa",
    continent: "Asia",
    description: "The largest and most famous beach in North Goa, known as the 'Queen of Beaches' for its lively shacks and water sports.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    latitude: 15.5494,
    longitude: 73.7536
  },
  {
    name: "Basilica of Bom Jesus",
    category: "landmark",
    country: "India",
    state: "Goa",
    city: "Goa",
    continent: "Asia",
    description: "A UNESCO World Heritage Site in Old Goa, containing the sacred, remarkably preserved remains of Saint Francis Xavier.",
    imageUrl: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80",
    latitude: 15.5009,
    longitude: 73.9116
  },
  {
    name: "Dudhsagar Waterfalls",
    category: "wonder",
    country: "India",
    state: "Goa",
    city: "Goa",
    continent: "Asia",
    description: "A spectacular four-tiered waterfall on the Mandovi River, looking like a cascading sea of milk during the monsoon.",
    imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
    latitude: 15.3183,
    longitude: 74.3140
  },

  // --- GUJARAT ---
  {
    name: "Statue of Unity",
    category: "wonder",
    country: "India",
    state: "Gujarat",
    city: "Gujarat",
    continent: "Asia",
    description: "The tallest statue in the world, standing at 182 meters. A tribute to Sardar Vallabhbhai Patel, located on the Narmada River.",
    imageUrl: "https://images.unsplash.com/photo-1600100397990-a4783a1523a8?auto=format&fit=crop&w=800&q=80",
    latitude: 21.8380,
    longitude: 73.7191
  },
  {
    name: "Somnath Temple",
    category: "landmark",
    country: "India",
    state: "Gujarat",
    city: "Gujarat",
    continent: "Asia",
    description: "A highly revered pilgrimage temple housing the first of the twelve holy Jyotirlinga shrines of Lord Shiva, located on the coast.",
    imageUrl: "https://images.unsplash.com/photo-1601962387195-236b2f7678f2?auto=format&fit=crop&w=800&q=80",
    latitude: 20.8880,
    longitude: 70.4011
  },
  {
    name: "Rann of Kutch",
    category: "wonder",
    country: "India",
    state: "Gujarat",
    city: "Gujarat",
    continent: "Asia",
    description: "A massive, breathtaking white salt desert located in the Kutch district, famous for the annual Rann Utsav festival.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    latitude: 23.7915,
    longitude: 69.8594
  },

  // --- UTTARAKHAND ---
  {
    name: "Kedarnath Temple",
    category: "landmark",
    country: "India",
    state: "Uttarakhand",
    city: "Uttarakhand",
    continent: "Asia",
    description: "A sacred Hindu temple dedicated to Lord Shiva, located high in the Garhwal Himalayan range near the Mandakini River.",
    imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
    latitude: 30.7352,
    longitude: 79.0669
  },
  {
    name: "Valley of Flowers",
    category: "wonder",
    country: "India",
    state: "Uttarakhand",
    city: "Uttarakhand",
    continent: "Asia",
    description: "A UNESCO World Heritage National Park known for its meadows of alpine flowers and outstanding natural wilderness beauty.",
    imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
    latitude: 30.7280,
    longitude: 79.6053
  },
  {
    name: "Rishikesh Triveni Ghat",
    category: "landmark",
    country: "India",
    state: "Uttarakhand",
    city: "Uttarakhand",
    continent: "Asia",
    description: "A holy ghat on the banks of the Ganges in Rishikesh, famous for the daily evening Ganga Aarti ceremony.",
    imageUrl: "https://images.unsplash.com/photo-1598371172101-71fb3d8544bd?auto=format&fit=crop&w=800&q=80",
    latitude: 30.1150,
    longitude: 78.3020
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
    category: "landmark",
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
    category: "landmark",
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
    category: "landmark",
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

    // Load external cities
    const cities = JSON.parse(fs.readFileSync('./citiesData.json', 'utf8'));
    const manualNames = new Set(places.map(p => p.name.toLowerCase().trim()));
    const uniqueCities = cities.filter(c => !manualNames.has(c.name.toLowerCase().trim()));

    // Combine manual places + unique cities
    const combinedPlacesAndCities = [...places, ...uniqueCities];
    const combinedNames = new Set(combinedPlacesAndCities.map(p => p.name.toLowerCase().trim()));

    // Load external forts
    const forts = JSON.parse(fs.readFileSync('./fortsData.json', 'utf8'));
    const uniqueForts = forts.filter(f => !combinedNames.has(f.name.toLowerCase().trim()));
    const allPlaces = [...combinedPlacesAndCities, ...uniqueForts];

    // Seed
    console.log(`Inserting ${allPlaces.length} starter places...`);
    await Place.insertMany(allPlaces);
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
