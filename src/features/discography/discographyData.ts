export type Track = {
  id: string;
  title: string;
  /** Optional path to track audio under /assets/Albums/ */
  audioUrl?: string;
  lyrics?: string;
};

export type Album = {
  id: string;
  title: string;
  year: string;
  coverUrl: string;
  tracks: Track[];
};

function track(
  id: string,
  title: string,
  audioPath: string,
  lyrics?: string
): Track {
  return {
    id,
    title,
    audioUrl: `/assets/Albums/${audioPath}`,
    ...(lyrics != null && lyrics.length > 0 ? { lyrics } : {}),
  };
}

// Lyrics from web where available (Lyrics.com, etc.); others can be added later.
const mehfilEBaharLyrics = `Ek Darwaza
Ek Sach
Chhupa Chhupa Sa
Mere Andar
Ek Rahasya
Ek Jalan
Mere Seene mein
Chubh Raha Khanjar
Chuppi Se Nikle Ye Raatein
Fakir Inme Hai Kyun Naachte
Uchayi tere ye ishq ki
Kimat hai mere Sachhayi ki
Ek Jeevan Ke
Raaston Par
In Aankhon Me
Kyun Hai Bharam
Kismat ka
yeh sach...
Chhupa Rahega
yeh Kab Tak
Chuppi Se Nikle Ye Raatein
Fakir Inme Hai Kyun Naachte
Ab to Main Yun Aazaad Hun
Rokega Kaise Ab Ye Soch Tu
Main Tere Khwaab Ka Shaitan
Rehna Hai Mujhko Tere bina
Main Tere Laashon ka Rehnumaan
Madhosh Mehfil-E-Bahar`;

const chhotiSiLyrics = `Thodi Si Baatein
Dil Mein Hai Yahi
Itni Hai Doori Phir Bhi
Tu Hai Yahin
Sach Hai Na Kuch Bhi
Fir Bhi Tu Hai Sahi
Chhoti Si Baatein
Dil Mein Hai Yahi
Tere Hi Yaadon Mein
Bas Khoya Rahun Main
Sapno Ke Saagar Mein
Dhoondu Main Tujhe
Neendo Ke Saaye Mein
Kab Hoga Tu Mere
Honge Khwaab
Ab Mere Kab Poore...
Haathon Ko Tham Le Tu Mere
Le Chal Mujhe Kahin Door
Kahin Door
Kahin Door
Kahin Door
Baadalon Ki Duniya Ho
Baarish Si Moti Ho
Sard Si Aahon Mein
Saason Ki Saazish Ho
Baahon Mein Bhar ke
Tujhe Toot Jaaun Main
Teri Hi Bahon Mein
Simat Jaun Main
Thodi Si Baatein
Dil Mein Hai Yahi...
Itni Hai Doori Phir Bhi
Tu Hai Yahin
Sach Hai Na Kuch Bhi
Fir Bhi Tu Hai Sahi
Chhoti Si Baatein
Dil Mein Hai Yahi`;

const khudaLyrics = `Raaste Ab Nahi
Manzil Kahin Door
Saath me tum nahi


Kyun main Majboor
Saansein ab Tham rahi
Raahein kahin door
Waqt ab mera nahi
Kyun tum ho mujhse door

Kyun rootha hai mera Khuda
Kya hui mujhse ab Khata

Aftab ab nahi
Hayat kayi door
Quainaat ab kahin
Aur tabeer majboor
Aashna Hai Kahan
Marasim Meelo Door
Inayatein Meri Sunn
E Qasid E Badastoor

Kyun rootha hai mera Khuda
Kya hui mujhse ab Khata

Ab nahi manzil koi yahan
Kya zameer uska na bacha
Dard me bhi mujhko bhul gaya
Rooth ke kahin hai gumm gaya`;

const waqtWaqtKiBaatLyrics = `Waqt Waqt Ki Baat hai
Har Shaks Barbaad Hai
Indra Ki Aandhiyon Me
Jhulsa Sansaar Hai
Waqt Waqt Ki Baat hai
Har Waqt Kharaab Hai
Adhrmiyon Se Chalta
Ye Saara Samaaj Hai
Dar Dar Bhatka Kyun
Pal Pal Sambhla Kyun
Khwaabon Ko Kyun Piroya Hai
Pag Pag Dhokha Kyun
Mann Mann Thera Kyun
Aankhon Ko Kyun Bhigoya Hai
Waqt Waqt Ki Baat hai
Har Janm Ek Paap Hai
Dohri Zindagi Me Uljha
Yeh Jahaan Hai
Waqt Waqt Ki Baat hai
har März Ek Shrap Hai
Dron Banke Baitha
Har Ek Insaan Hai
Dar Dar Bhatka Kyun
Pal Pal Sambhla Kyun
Khwaabon Ko Kyun Piroya Hai
Pag Pag Dhokha Kyun
Mann Mann Thera Kyun
Aankhon Ko Kyun Bhigoya Hai
Hai ye kala Safar
Kalyug ka Ye Keher
Hai ye kala Safar
Kalyug ka Ye Keher
Karmo Ka
Yeh Falsafa
Bhogega
Jo Boye Yahaan
Hai ye kala Safar
Kalyug ka Ye Keher
Hai ye kala Safar
Kalyug ka Ye Keher`;

const taaraLyrics = `Har Taara Aise Chamke Kaale Aasman Mein
Jaise Zaroori Ho Wo Saare Jahaan Mein
Badal Ki Nagri Uske Neeche Iss Samaa Ka
Hissa Ban Baitha Khud Wo Jhoote Aashiyan Ka

Har Taara Aise Chamke Kaale Aasman Mein
Jaise Zaroori Ho Wo Saare Jahaan Mein
Badal Ki Nagri Uske Neeche Iss Samaa Ka
Hissa Ban Baitha Khud Wo Jhoote Aashiyan Ka

Fariston Ki Basti Ka Tha Wo Ek Sitara
Zeher Ki Kashti Mein Talashein Kyun Nazara
Aise Safar Ka Mulzim Ban Gaya Wo bechara
Aaye Jab Antim Din Toote Ga Wo Bhi Taara

Hai Kis Bharam Mein Pal Raha
Hai Kyun Zid Pe Yun Adaa
Jab Khuda hi Hai Jal Raha
Wo To Hai Taara Toot Raha

Samundar Ki Basti Ka Ban Gaya Wo Ek Hissa
Aasman Ke Ghire Baadalon Se Suno Yeh Kissa
Ankahi Baaton Ki Ankahi Daastan
Ansune Waqt Ki Ansuni wo Sabha

Jab Taara Dheere Dheere Neeche Ja Raha Tha
Aankhon Ke Uske Aage Karmo Ka Falsafa Tha
Reh Gayi Wo Saari Bematlab ki Baatein
Ahem Bhav Se Bhari Hai Jo Uski Mulakatein

Hai Kis Bharam Mein Pal Raha
Hai Kyun Zid Pe Yun Adaa

Hai Kis Bharam Mein Pal Raha
Hai Kyun Zid Pe Yun Adaa
Jab Khuda hi Hai Jal Raha
Wo To Hai Taara Toot Raha`;

const alvidaLyrics = `Kaise Kahun
Yeh Zindagi Meri Yahan
Andhera Sa Hai
Jaise Banke Koi Sazaa
Hazaro Taraf
Hai Dard Kyun Bhara Yahaan
Theher Ne Par
Leta Kyun Hai Ye Jaan

Yeh Aag Kyun Dil Me Bhara
Zindagi Keh Rahi Alvida

Yeh Mann Tera
Kyun Nahi Bhara
Unn Gair Galiyon Me
Dhunde Kya Bhalaa
Kis Kasmakash Me
Tu Hai Yun Fasaa
Ab Rakh Bankar
Kyun Hai Tu Jal Raha

Yeh Aag Kyun Dil Me Bhara
Zindagi Keh Rahi Alvida
Zindagi Keh Rahi Alvida
Zindagi Keh Rahi Alvida

Sitare Yahin
Ye Toot Kar Batate Hai
Ke Rehmo Karam
März Ek Chhalawe Hai
Jalta Ye Zind
Jalta Raha Mera Khuda
Teri Zameen
Tera Jahaan
Sab Ne Kaha

Yeh Aag Hai Dil Me Bhara
Zindagi Keh Rahi Alvida
Kaisi Hai Ye Ab Behaya
Mere Khuda Tu Hi Bataa...`;

const adhuraSaLyrics = `Na Meri Manzilein
Na Meri Khwaishein
Kar De Ab Riha
Yahi Chahatein
Na Ye Aasman
Aur Na Ye Jahan
Ab Kayamat Ko La
Aur Dikha Raasta
Adhura Sa Hun
Tere Bina
Mujhko Khudi Mein
Kar De Fanaa
Jo Tu Na Mila
To Main Tabah
Hai Bas Yahi Meri Iltija
Na Teri Bandishein
Na Teri Sarhadein
Hai Kurbat Kahan
Aur Teri Rehmatein
Na Teri Khwaishein
Na Teri Sehmatein
Hai Sohbat Kahan
Aur Meri Partakein
Adhura Sa Hun
Tere Bina
Mujhko Khudi Mein
Kar De Fanaa
Jo Tu Na Mila
To Main Tabah
Hai Bas Yahi Meri Iltija


adhura sa`;

const khwaabLyrics = `Kho Jaane Do 
Taaron Ke Tale 
Beh Jaane Do 
Hawaa Ye Kahe 

Kho Jaane Do 
Taaron Ke Tale 
Beh Jaane Do 
Hawaa Ye Kahe  

Raat Din 
Khwaab Mein 
Har Dagar han
Han Har Shaam Me 
Chal Para
Aise Safar Ke Raastey 

Ek Chhoti Si 
Khwaaish Meri 
Lekar Ab Inko 
Chalun Yahan 
 
Manzil  Meri  
Uss Paar hai 
Raahon Ko 
Taake Ye Mann Mera 

Khwaabon Ko 
Chhu Lene Do
Jee Lene Do 
In Aankhon Mein 
Khwaabon Ko 
Bun Lene Do 
 
Kho Jaane Do 
Taaron Ke Tale 
Beh Jaane Do 
Hawaa Ye Kahe  

Kho Jaane Do 
Taaron Ke Tale 
Beh Jaane Do 
Hawaa Ye Kahe  

Raat Din 
Khwaab Mein 
Har Dagar 
Han Har Shaam Me 
Chal Para
Aise Safar Ke Raastey

Chal Para
Aise Safar Ke Raastey`;

const rihaLyrics = `Ye Dil
Khudgarz Hai
Be Dard Hai
Bewaqt Hai

Ye Rooh
Kamzarf Hai
Be Ilm Hai
Bechain Hai

Sun Raha Hai Kya Wo Khuda
Meri Arziyon Ki Yeh Daastan
Khud Se Hun Ab Yun Main Juda
Aisi Zindagi Se To Karde Riha

Ye Manzar
Badmast Hai
Bekhauf Hai
Bebaak Hai

Ye Hasrat
Bezirab hai
Bekhair Hai
Begharz Hai

Sun Raha Hai Kya Wo Khuda
Meri Arziyon Ki Yeh Daastan
Khud Se Hun Ab Yun Main Juda
Aisi Zindagi Se To Karde Riha

Hai Yahi Ek Razaa
Aisi Berukhi Se To Kar De Riha`;

const anantramLyrics = `[The Lost Symbols - Anantram]
Lyrics available on Lyrics.com (Anantram - The Lost Symbols).`;

const surkhLyrics = `Ye Rooh Teri Aahaton Me Zinda Hai
Ye Pal Raahon Me Tujhme Kahin Basta Hai
Har Lamha Iss Samay Ka Tujhko hi chhata hai
Har Dagar Har Fazal Ye Dard hi Badhta Hai

Iss Kainaat Me
Hai Khwaaishein Bhare
In Lamho Ki Boond Me
Teri Hi Surkh Hai

Na Basar Na Khabar Iss Dil Ko Teri Hai
Bekhudi Beshumaar E Shams ki Talab me Jabr Hai
Zindagi in Kaaton Ke Talaffuz Me Qaid Hai
Bebasi Wabasta Iss Nazakat Me Rashk Hai

Iss Kainaat Me
Hai Khwaaishein Bhare
In Lamho Ki Boond Me
Teri Hi Surkh Hai
Teri Hi Surkh Hai

Iss Kainaat Me
Hai Khwaaishein Bhare
In Lamho Ki Boond Me
Teri Hi Surkh Hai

Iss Kainaat Me
Hai Khwaaishein Bhare
In Lamho Ki Boond Me
Teri Hi Surkh Hai
Teri Hi Surkh Hai`;

const kaashLyrics = `Mit Na Sakegi Ye Dooriyaan
Hai Jo Tere Mere Darmiyan
Bin Tere Kaise Jiyen Yahan
Ye Bharam Mann Ka Mera Raha

Ek Din Kaash Tum Aao Laut Ke
Kaise Kahoon Tum Ko Hai Paana Zindagi Me

Ek Din Kaash Tum Aao Laut Ke
Kaise Kahoon Tum Ko Hai Paana Zindagi Me

Raatein Akeli Hai Yahan
Baahein Tarasti Hai Yahan
Baatein Adhuri Hai Yahan
Saansein Bhi Kehde Alvida

Ek Din Kaash Tum Aao Laut Ke
Kaise Kahoon Tum Ko Hai Paana Zindagi Me

Ek Din Kaash Tum Aao Laut Ke
Kaise Kahoon Tum Ko Hai Paana Zindagi Me

Teri Dildaari Ka Ye Aasra
Lekar Mann Hai Thama
Warna Jeena Bhi Kya
Yaadon Ka Jo Ye Sila Hai
Jeene Ki Bas Tu Wajha Hai
Bewajah Marna Bhi Kya

Ek Din Kaash Tum Aao Laut Ke
Kaise Kahoon Tum Ko Hai Paana Zindagi Me

Ek Din Kaash Tum Aao Laut Ke
Kaise Kahoon Tum Ko Hai Paana Zindagi Me.... Zindagi Me

Ek Din Kaash Tum Aao Laut Ke`;

const naaLyrics = `Kho Gaya Ye Aasman
Jal Utha Ye Sama
Kehkashon Ki Ye Aandhiyan
Birha Ke Baadalon Se Ghira

In Kaaton Pe Mujhko Chalna Hai
In Raahon Me Mujhko Jalna Hai
Aise Tarse Har Ek Insaan
Rooh Kya Tera Hai Patthar Ka

Na Na Na ..Na Na ..Na Na..Na..Na
Na Na Na ..Na Na ..Na Na..Na..Na
Na Na Na ..Na Na ..Na Na..Na..Na
Na Na Na ..Na Na ..Na Na..Na..Na

Kya Rakha Is Jeevan Me
Khudgarzi Ke Chehron Me
Tehzeeb Dekhe Ya Dekhe Haisiyat
Ilzaam Ke Ibaarat Me

In Kaaton Pe Mujhko Chalna Hai
In Raahon Me Mujhko Jalna Hai
Aise Tarse Har Ek Insaan
Rooh Kya Tera Hai Patthar Ka

Na Na Na ..Na Na ..Na Na..Na..Na
Na Na Na ..Na Na ..Na Na..Na..Na
Na Na Na ..Na Na ..Na Na..Na..Na
Na Na Na ..Na Na ..Na Na..Na..Na`;

const nindiyaReLyrics = `Nindiya Re Ab To Aaja
Aake Tu Mujhko Sulaja
Raah Pe Thak Gaya Hu
Aake Tu Rehem Dikhaja
Aake tu Rehem Dikhaja
Aake tu Rehem Dikhaja

Main Bhi Palchhin
Tanha Ye Mann
Birha ye har lamha
Kaisi Doori Kyun Majboori
Kya ye rahegi ab dooriyan

Nindiya Re Ab To Aaja
Aake Tu Mujhko Sulaja
Raah Pe Thak Gaya Hu
Aake Tu Rehem Dikhaja
Aake tu Rehem Dikhaja
Aake tu Rehem Dikhaja

Gustakhiyan Gustakhiyan
Karne Laga Ye Mann Mera
Khamoshiyan Ye Khamoshiyan
Parchayi Bankar Simta Raha

Jo Bhi Hai Shikwe Mita Do
Inn Dhadkano Ko Thama Do Na.. Yahan

Nindiya Re Ab To Aaja
Aake Tu Mujhko Sulaja
Raah Pe Thak Gaya Hu
Aake Tu Rehem
Aake Tu Rehem Dikhaja

Nindiya Re Ab To Aaja
Aake Tu Rehem Dikhaja
Raah Pe Thak Gaya Hu
Aake Tu mujhko Sulaja
Aake Tu Mujhko Sulaja
Aake Tu Rehem Dikhaja

Kya Hai Yahan
Jeene Me Rakha
Iss Marz ki
Dawa Hai Kahan`;

const rengteKeedeLyrics = `Aye Jhoote Farebon Ke
Begharz Feron Ke
Saaye Me Simte Hue
Tarashein Fard Me

Aye Rengte Keede

Kya Shaitaan Tujhme Basa
Aatank kyu hai Machaa
Zinda hai kyu hum Yahan
Achai ki ye Saza

Aye Binpainde Ke Lote
Kismat ke kyun Foote
Fark Hai Ke Piste Hai Hum
Hamesha Marte hain hum

Aye Rengte Keede....

Kya Badlega Ye Raasta
Nafraton ki Ye Raazdaan
Lootega Izzat Yahan
Khamoshi ki ye Raza

Bekashi Is Bebasi Me Rukh Hai
Tishnagi Ek Behaya Si Gharq Hai
Zindagi Berang Si Hai

Kya Ehsaan tune kiya
Barbaad hi main hua
Sapne dikhake mujhe
Beghar hai tune Kiya`;

const khidkiyanLyrics = `Har Subah Har Sham Mein
Dekhu Tujhe Khwaab Mein
Tera Ye Thikana Hai Kahan

Chhoti Si Hai Zindagi
Ye Bhi Tune Hai Di
Phir Bhi Kyun
Faasley Yahan

Hai Mousam Jo Bheega
Mujhe Bhi Bhiga Do Yahan
Khule Aasman Ki Hai
Kyun Band Ye Khidkiyan

Hai Mousam Jo Bheega
Mujhe Bhi Bhiga Do Yahan
Khule Aasman Ki Hai
Kyun Band Ye Khidkiyan

Har Dagar Har Raah Pe
Tarse Teri Chhah Mein
Tera Aashiyana Hai Kahan

Bhikre Zamane Mein
Toot Te Makano Mein
Behke Panhao Mein Yahan

Hai Mousam Jo Bheega
Mujhe Bhi Bhiga Do Yahan
Khule Aasman Ki Hai
Kyun Band Ye Khidkiyan

Hai Mousam Jo Bheega
Mujhe Bhi Bhiga Do Yahan
Khule Aasman Ki Hai
Kyun Band Ye Khidkiyan

Kaisi Khumaari Hai
Ya Bekarari Hai
Teri Aas Mein
Aise Pyaasi Hai

Hai Mousam Jo Bheega
Mujhe Bhi Bhiga Do Yahan
Khule Aasman Ki Hai
Kyun Band Ye Khidkiyan

Kyun Rahbar Hai
Mujhse Mera Yun Khafa
Kaise Manau Main Usko
Yahi Hai Meri Chhah

Hai Mousam Jo Bheega
Mujhe Bhi Bhiga Do Yahan

khidkiyan`;

export const albums: Album[] = [
  {
    id: "the-diary",
    title: "The Diary",
    year: "2021",
    coverUrl: "/assets/The Diary Final (2).jpg",
    tracks: [
      track("diary-1", "Khwaab", "The Diary/Khwaab - The Lost Symbols.mp3", khwaabLyrics),
      track("diary-2", "Taara", "The Diary/ Taara.mp3", taaraLyrics),
      track("diary-3", "Chhoti Si", "The Diary/ Chhoti Si.mp3", chhotiSiLyrics),
      track("diary-4", "Khuda", "The Diary/Khuda - The Lost Symbols.mp3", khudaLyrics),
      track("diary-5", "Mehfil-E-Bahar", "The Diary/ Mehfil-E-Bahar.mp3", mehfilEBaharLyrics),
      track("diary-6", "Waqt Waqt Ki Baat", "The Diary/Waqt Waqt Ki Baat - The Lost Symbols.mp3", waqtWaqtKiBaatLyrics),
      track("diary-7", "Alvida", "The Diary/Alvida - The Lost Symbols.mp3", alvidaLyrics),
      track("diary-8", "Adhura Sa", "The Diary/ Adhura Sa.mp3", adhuraSaLyrics),
    ],
  },
  {
    id: "gharq",
    title: "GHARQ",
    year: "2022",
    coverUrl: "/assets/Gharq Final 3000 (1).jpg",
    tracks: [
      track("gharq-6", "Riha", "GHARQ/Riha - The Lost Symbols.mp3", rihaLyrics),
      track("gharq-1", "Surkh", "GHARQ/ Surkh.mp3", surkhLyrics),
      track("gharq-4", "Nindiya Re", "GHARQ/Nindiya Re - The Lost Symbols.mp3", nindiyaReLyrics),
      track("gharq-5", "Rengte Keede", "GHARQ/ Rengte Keede.mp3", rengteKeedeLyrics),
      track("gharq-2", "Kaash", "GHARQ/ Kaash.mp3", kaashLyrics),
      track("gharq-3", "Naa", "GHARQ/Naa - The Lost Symbols.mp3", naaLyrics),
      track("gharq-7", "Khidkiyan", "GHARQ/ Khidkiyan.mp3", khidkiyanLyrics),
      track("gharq-8", "Godsend", "GHARQ/Godsend - The Lost Symbols.mp3"),
    ],
  },
  {
    id: "farogh",
    title: "Farogh",
    year: "2023",
    coverUrl: "/assets/V2_B (1).jpg",
    tracks: [
      track("farogh-1", "Anantram", "Farogh/ Anantram.mp3", anantramLyrics),
      track("farogh-2", "Antaragini", "Farogh/ Antaragini.mp3"),
      track("farogh-3", "Din Barkha", "Farogh/ Din Barkha.mp3"),
      track("farogh-4", "Katleaam", "Farogh/ Katleaam.mp3"),
      track("farogh-5", "Qafas", "Farogh/ Qafas.mp3"),
      track("farogh-6", "Khwabeeda", "Farogh/Khwabeeda - The Lost Symbols.mp3"),
      track("farogh-7", "Maukaparast", "Farogh/Maukaparast - The Lost Symbols.mp3"),
      track("farogh-8", "Test", "Farogh/Test - The Lost Symbols.mp3"),
    ],
  },
  {
    id: "taysa",
    title: "Taysa",
    year: "2024",
    coverUrl: "/assets/Taysa Artwork final 1500x1500 (1).jpg",
    tracks: [
      track("taysa-1", "Hahahakaar", "TAYSA/Hahahakaar - The Lost Symbols.mp3"),
      track("taysa-2", "Najane Kyun", "TAYSA/ Najane Kyun.mp3"),
      track("taysa-3", "Dev Aur Rakshas", "TAYSA/ Dev Aur Rakshas.mp3"),
      track("taysa-4", "Myna", "TAYSA/Myna - The Lost Symbols.mp3"),
      track("taysa-5", "Toofano Ka Geet", "TAYSA/ Toofano Ka Geet.mp3"),
      track("taysa-6", "Nadi Ka Rasta", "TAYSA/ Nadi Ka Rasta.mp3"),
      track("taysa-7", "Shaitan", "TAYSA/ Shaitan.mp3"),
      track("taysa-8", "Musibaton Ka Pahad", "TAYSA/Musibaton Ka Pahad - The Lost Symbols.mp3"),
    ],
  },
  {
    id: "agnikund",
    title: "Agnikund",
    year: "On Going",
    coverUrl: "/assets/Agnikund Final 3000x3000 copy 2.jpg",
    tracks: [
      track("agnikund-1", "Narayana", "Agnikund/Narayana - The Lost Symbols.mp3"),
      track("agnikund-2", "Hymn Of Hope", "Agnikund/Hymn Of Hope - The Lost Symbols.mp3"),
      track("agnikund-3", "Mahabharat", "Agnikund/Mahabharat - The Lost Symbols.mp3"),
      track("agnikund-4", "Hum Hain Kaurav", "Agnikund/Hum Hain Kaurav - The Lost Symbols.mp3"),
    ],
  },
  {
    id: "meth",
    title: "METH",
    year: "On Going",
    coverUrl: "/assets/Meth FINAL copy.jpg (2).jpeg",
    tracks: [
      track("meth-1", "Chal", "METH/Chal.mp3"),
    ],
  },
  {
    id: "punarnirman",
    title: "Punarnirman Series",
    year: "On Going",
    coverUrl: "/assets/Punarnirman 3000 (1).jpg",
    tracks: [
      track("punarnirman-1", "Tarse Naina", "Punarnirman Series/ Tarse Naina.mp3"),
      track("punarnirman-2", "Rajeev Nayan Ko", "Punarnirman Series/Rajeev Nayan Ko - The Lost Symbols.mp3"),
      track("punarnirman-3", "Dil Ki Baatein", "Punarnirman Series/Dil Ki Baatein - The Lost Symbols.mp3"),
    ],
  },
];
