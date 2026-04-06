export type ArtistTrack = {
  id: string;
  title: string;
  /** Hindi film / project name */
  film: string;
  /** Short intro above the pasted YT description */
  synopsis: string;
  /** Full text from official music video description on YouTube (audio + credits). */
  youtubeDescription: string;
  /** Official music video URL */
  youtubeUrl: string;
  /** Key rows for quick scan (subset aligned with YT) */
  credits: { label: string; value: string }[];
};

export type FeaturedArtistEntry = {
  id: string;
  name: string;
  /** Portrait image URL (e.g. Wikimedia Commons, JioSaavn artist CDN) */
  imageUrl?: string;
  /** Short SEO-friendly bio (shown in track-list modal, below name) */
  bio?: string;
  /** When set, artist box opens track-list modal */
  tracks?: ArtistTrack[];
};

export const FEATURED_ARTISTS: FeaturedArtistEntry[] = [
  {
    id: "kumar-sanu",
    name: "Kumar Sanu",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ec/Kumar_Sanu_at_colors_indian_telly_awards.jpg",
    bio: `Kumar Sanu (Kedarnath Bhattacharya) is one of India’s most recorded Bollywood playback singers, synonymous with the romantic sound of Hindi cinema in the 1990s. A Padma Shri honouree and multiple Filmfare Award winner, he has sung thousands of film songs across Hindi and regional languages. Fans still search for Kumar Sanu hits, duets, and 90s classics; his voice remains a benchmark for melody-driven film music. He continues to record and perform, including collaborations with new composers and independent releases.

Beyond nostalgia, his discography maps the mainstream Hindi soundtrack era when duets and melody-led arrangements dominated charts — work that composers and singers still study for phrasing and emotional delivery. He has lent his voice to Bengali and other regional industries as well, keeping a busy schedule of concerts and new sessions. For listeners tracing playback history or producers booking a veteran with unmistakable tone, Kumar Sanu remains a living reference point for Indian film vocals.`,
    tracks: [
      {
        id: "silsila",
        title: "Silsila",
        film: "Social Mandiya",
        youtubeUrl: "https://www.youtube.com/watch?v=bfiZe1VUnSc",
        synopsis:
          'Official music video on T-Series Popchartbusters — audio credits below are from the YouTube description.',
        youtubeDescription: `T-Series Present upcoming Hindi film "Social Mandiya" video song "Silsila" starring Vikalp Mehta, Trishna Singh, Ruchita Sharma in the lead role exclusively on T-Series Popchartbusters.

Song: Silsila
Movie: Social Mandiya
Artists: Vikalp Mehta, Sandeep Sharma, Nishant Kumar, Trishna Singh, Ruchita Sharma, Jaishree
Singer: Kumar Sanu
Music: The Lost Symbols
Lyricist: Vivek Sharma, Aman Raj, Arun Singh Naruka
Music Producer: Gunjan Soral
Recorded at Sana Music World, Mumbai
Master Mixing: Underroot Studios & Rabab Studios (Deep Bawa)
Director: Vivek Sharma
D.O.P: Ashish Rai
Creative Director: Deepak Taggar
Editor & DI: Pawan Kumar (Ediframz, Chandigarh)
VFX: Harpreet Kang
Assistant D.O.P.: Subh Thakur
Producer: Vivek Sharma
Co-Producer: Priyank Jain
Executive Producer: Shannon K
Production: J-One (Navjeet Joshi)
Production Controller: Shashank Singh, Brijesh Sharma, Rajendra Sharma
Project By: Vivaan Filmz Production
Music Label: T-Series`,
        credits: [
          { label: "Singer", value: "Kumar Sanu" },
          { label: "Music", value: "The Lost Symbols" },
          { label: "Lyricist", value: "Vivek Sharma, Aman Raj, Arun Singh Naruka" },
          { label: "Music producer", value: "Gunjan Soral" },
          { label: "Recorded at", value: "Sana Music World, Mumbai" },
          { label: "Master mixing", value: "Underroot Studios & Rabab Studios (Deep Bawa)" },
          { label: "Director", value: "Vivek Sharma" },
          { label: "Music label", value: "T-Series" },
          { label: "Project by", value: "Vivaan Filmz Production" },
        ],
      },
      {
        id: "mujhe-jeena-aagaya",
        title: "Mujhe Jeena Aagaya",
        film: "Chal Zindagi",
        youtubeUrl: "https://www.youtube.com/watch?v=YBVZHUjY9LE",
        synopsis:
          "Official music video — full crew and audio credits from the YouTube description.",
        youtubeDescription: `#kumarsanu #shannonk #chalzindagi

Mujhe Jeena aa Gaya
Composed by: The Lost Symbols
Lyricist: Vivek Sharma
Singers: Kumar Sanu & Shannon K
Mixed & Mastered by: C.V. Raju

Movie: Chal Zindagi
Starcast: Sanjay Mishra, Shannon K, Vivek Dahiya, Vivaan Sharma, Mita Vashisht, Rakesh Pandey, Vikram Pratap, Sandeep Gaur

Directed by: Vivek Sharma
Produced by: Vivaan Filmz Production
Co-produced by: Priyank Jain, Prakash Ranka, Vaibhav Punch, Ritika Sharma

Music & BG: The Lost Symbols
Line Producer: Navjeet Joshi (J-one)
DOP: Ashish Rai
First DOP Assistant: Shubh Thakur
Chief AD: Deepak Taggar
Post Producer: Santoshh G Gupta
Re-recording Mixer: C.V. Raju
Editor: Shiva Bayappa, Arjun S Phadtare
DI Colorist & VFX: Ritesh S Kumar
Casting Director: Farukh Shaikh, Ashok Vyas
Production Controllers: Shashank Singh, Brijesh Sharma, Naman Singh, Sandeep Chauhan, Rajendra Sharma, Abhishek Gureja
Digital Marketing Promotion: The Live Zone (Yasir Khan) & Aman Raj
PR & Marketing: Waseem Akhter (Expansion Team: Ritesh Srivastav, Komal Pandey)`,
        credits: [
          { label: "Singers", value: "Kumar Sanu & Shannon K" },
          { label: "Composed by", value: "The Lost Symbols" },
          { label: "Lyricist", value: "Vivek Sharma" },
          { label: "Mixed & mastered by", value: "C.V. Raju" },
          { label: "Music & background score", value: "The Lost Symbols" },
          { label: "Re-recording mixer", value: "C.V. Raju" },
          { label: "Directed by", value: "Vivek Sharma" },
          { label: "Produced by", value: "Vivaan Filmz Production" },
          {
            label: "Co-produced by",
            value: "Priyank Jain, Prakash Ranka, Vaibhav Punch, Ritika Sharma",
          },
        ],
      },
    ],
  },
  {
    id: "javed-ali",
    name: "Javed Ali",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e2/Javed_Ali_graces_musical_concert_%E2%80%98Rehmatein-3%E2%80%99.jpg",
    bio: `Javed Ali is an Indian playback singer known for a warm, classically grounded voice and a wide filmography across Hindi and regional cinema. Rising from music reality television to A-list soundtracks, he has sung romantic ballads, Sufi-tinged tracks, and title songs for major productions. People looking for Javed Ali songs, live concerts, or playback credits will find his work spanning composers and genres. He remains an in-demand vocalist for films, albums, and stage shows.

His ability to move between soft romantic lines and devotional or Sufi-inspired material has made him a frequent choice for composers who need range without losing intimacy. Over the years he has built a concert repertoire that mirrors his film work, so audiences often hear the same emotional signature on stage as on record. Whether you discover him through a film title track or a long-form live set, the through-line is a controlled, expressive voice rooted in classical training.`,
    tracks: [
      {
        id: "chal-zindagi-title-track",
        title: "Chal Zindagi (Title Track)",
        film: "Chal Zindagi",
        youtubeUrl: "https://www.youtube.com/watch?v=y_ZBTHfK0DE",
        synopsis:
          "Official music video — full crew and audio credits from the YouTube description.",
        youtubeDescription: `#ChalZindagi #viveksharma #sanjaymishra

Singers : Javed Ali, Shannon K
Composer: The Lost Symbols

ChalZindagi releasing in theatres on 26th May 2023.

Starring: Shannon K, Vivek Dahiya, Sanjay Mishra, Mita Vashisht, Vivaan Sharma, Vikram Pratap, Rakesh Pandey, Sandeep Gaur.
Lyrics: Vivek Sharma
Written & Directed by: Vivek Sharma
Music on: Vivaan Records
Line Producer: Navjeet Joshi (J-one)
DOP: Ashish Rai
1st DOP Assistant: Subh Thakur
Chief AD: Deepak Taggar
Post Producer: Santoshh G Gupta
Re-recording Mixer: C.V. Raju
Editor: Shiva Bayappa, Arjun S Phadtare
DI Colorist & VFX: Ritesh S Kumar
Casting Director: Farukh Shaikh, Ashok Vyas
Production Controllers: Shashank Singh, Brijesh Sharma, Naman Singh, Sandeep Chauhan, Rajendra Sharma, Abhishek Gureja
Digital Marketing Promotion: The Live Zone (Yasir Khan) & Aman Raj
PR & Marketing: Waseem Akhter (Expansion Team: Ritesh Srivastav, Komal Pandey)`,
        credits: [
          { label: "Singers", value: "Javed Ali & Shannon K" },
          { label: "Composer", value: "The Lost Symbols" },
          { label: "Lyrics", value: "Vivek Sharma" },
          { label: "Written & directed by", value: "Vivek Sharma" },
          { label: "Music on", value: "Vivaan Records" },
          { label: "Re-recording mixer", value: "C.V. Raju" },
          { label: "Line producer", value: "Navjeet Joshi (J-one)" },
          { label: "DOP", value: "Ashish Rai" },
          { label: "Post producer", value: "Santoshh G Gupta" },
          { label: "Editors", value: "Shiva Bayappa, Arjun S Phadtare" },
        ],
      },
    ],
  },
  {
    id: "suraj-jagan",
    name: "Suraj Jagan",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Suraj_Jagan_at_KIIT_Law_School_04.JPG/500px-Suraj_Jagan_at_KIIT_Law_School_04.JPG",
    bio: `Suraj Jagan is an Indian playback singer and performer known for rock-edged vocals in Bollywood and independent music. Audiences worldwide recognise his voice from landmark Hindi film songs; he has also fronted bands and worked across languages. Those searching for Suraj Jagan songs, filmography, or live act listings will find a career built on powerful tone and stage energy. He continues to record for films, ads, and collaborative projects.

That same grit carries into advertising and non-film work, where directors often want a vocal that cuts through dense mixes without sounding thin. His live performances lean into the band ethos — high energy, direct delivery — even when the material is soundtrack-derived. If you are drawn to Hindi cinema songs with a rock or alternative edge, his catalogue is one of the first places listeners and playlist curators land.`,
    tracks: [
      {
        id: "roko-inhe",
        title: "Roko Inhe",
        film: "Social Mandiya",
        youtubeUrl: "https://www.youtube.com/watch?v=WhpCKo_fsWc",
        synopsis:
          'Official music video on T-Series Popchartbusters — audio credits below are from the YouTube description.',
        youtubeDescription: `T-Series Present upcoming Hindi film "Social Mandiya" video song "Roko Inhe" starring Vikalp Mehta, Trishna Singh, Ruchita Sharma in the lead role exclusively on T-Series Popchartbusters.

Song: Roko Inhe
Movie: Social Mandiya
Artists: Vikalp Mehta, Sandeep Sharma, Nishant Kumar, Vivaan Sharma, Trishna Singh, Ruchita Sharma, Jaishree, Jairoop Jeevan
Singer: Suraj Jagan
Lyricist: Vivek Sharma and Vivaan Sharma
Music: The Lost Symbols
Music Producer: Gunjan Soral
Recorded At: Studio 52, Goa
Master Mixing: Underroot Studios & Rabab Studios(Deep Bawa)
Director: Vivek Sharma
D.O.P: Ashish Rai
Creative Director: Deepak Taggar
Editor & DI: Pawan Kumar (Ediframz,Chandigarh)
VFX: Harpreet Kang
Assistant D.O.P.: Subh Thakur
Producer: Vivek Sharma
Co-Producer: Priyank Jain
Executive Producer: Shannon K
Production: J-One (Navjeet Joshi)
Production Controller: Shashank Singh, Brijesh Sharma, Rajendra Sharma
Project By: Vivaan Filmz Production
Music Label : T-Series

_______________________________

Enjoy & stay connected with us!!

FOR LATEST UPDATES:
----------------------------------------
SUBSCRIBE US Here: http://bit.ly/SJIj4g

"If you like the Video, Don't forget to Share and leave your comments"

Visit Our Channel For More Videos: http://www.youtube.com/Popchartbusters
Like us on Facebook: https://www.facebook.com/popchartbusters`,
        credits: [
          { label: "Singer", value: "Suraj Jagan" },
          { label: "Music", value: "The Lost Symbols" },
          { label: "Lyricist", value: "Vivek Sharma and Vivaan Sharma" },
          { label: "Music producer", value: "Gunjan Soral" },
          { label: "Recorded at", value: "Studio 52, Goa" },
          { label: "Master mixing", value: "Underroot Studios & Rabab Studios (Deep Bawa)" },
          { label: "Director", value: "Vivek Sharma" },
          { label: "Music label", value: "T-Series" },
          { label: "Project by", value: "Vivaan Filmz Production" },
        ],
      },
    ],
  },
  {
    id: "neeraj-shridhar",
    name: "Neeraj Shridhar",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Neeraj_Shridhar_%28Feb_5%2C_2019%29.jpg",
    bio: `Neeraj Shridhar is an Indian singer, songwriter, and composer who led the pop-rock act Bombay Vikings before becoming a go-to Bollywood playback voice. His Hindi film discography includes chart-topping dance tracks, title songs, and collaborations with leading composers. Fans searching for Neeraj Shridhar hits, Bombay Vikings, or playback credits will find work across rom-coms, thrillers, and party soundtracks. He remains active as a vocalist and writer for film and independent music.

The Bombay Vikings chapter established his bilingual pop sensibility — hooks that work on radio and on dance floors — and that sensibility carried straight into film sessions when Bollywood leaned into club-ready and youth-oriented sounds. As a writer and performer, he often bridges English phrasing with Hindi film contexts, which keeps his work recognisable across both indie playlists and mainstream soundtracks. New listeners still discover him through older singles first, then follow the thread into his playback catalogue.`,
    tracks: [
      {
        id: "party-hard",
        title: "Party Hard",
        film: "Chal Zindagi",
        youtubeUrl: "https://www.youtube.com/watch?v=hfdJmQOWsKU",
        synopsis:
          "Official music video — full crew and audio credits from the YouTube description.",
        youtubeDescription: `#PartyHard #chalzindagi #Neeraj Shridhar
Let's PARTY HARD with ChalZindagi.

Composed by: The Lost Symbols
Lyricist: Vivek Sharma
Singers: Neeraj Shridhar & Shannon K
Mixed & Mastered by: C.V. Raju
Movie: Chal Zindagi
Produced by: Vivaan Filmz Production
Co-produced by: Priyank Jain, Prakash Ranka, Vaibhav punch, Ritika Sharma

Music & BG: The Lost Symbols
Line Producer: Navjeet Joshi (J-one)
DOP: Ashish Rai
First DOP Assistant: Shubh Thakur
Chief AD: Deepak Taggar
Choreographer: Mehul Kapdiya
Post Producer: Santoshh G Gupta
Re-recording Mixer: C.V. Raju
Editor: Shiva Bayappa, Arjun S Phadtare
DI Colorist & VFX: Ritesh S Kumar
Casting Director: Farukh Shaikh, Ashok Vyas
Production Controllers: Shashank Singh, Brijesh Sharma, Naman Singh, Sandeep Chauhan, Rajendra Sharma, Abhishek Gureja
Digital Marketing Promotion: The Live Zone (Yasir Khan) & Aman Raj
PR & Marketing: Waseem Akhter (Expansion Team: Ritesh Srivastav, Komal Pandey)`,
        credits: [
          { label: "Singers", value: "Neeraj Shridhar & Shannon K" },
          { label: "Composed by", value: "The Lost Symbols" },
          { label: "Lyricist", value: "Vivek Sharma" },
          { label: "Mixed & mastered by", value: "C.V. Raju" },
          { label: "Music & background score", value: "The Lost Symbols" },
          { label: "Choreographer", value: "Mehul Kapdiya" },
          { label: "Re-recording mixer", value: "C.V. Raju" },
          { label: "Produced by", value: "Vivaan Filmz Production" },
          {
            label: "Co-produced by",
            value: "Priyank Jain, Prakash Ranka, Vaibhav punch, Ritika Sharma",
          },
          { label: "Line producer", value: "Navjeet Joshi (J-one)" },
          { label: "DOP", value: "Ashish Rai" },
          { label: "Post producer", value: "Santoshh G Gupta" },
          { label: "Editors", value: "Shiva Bayappa, Arjun S Phadtare" },
        ],
      },
    ],
  },
  {
    id: "shannon-k",
    name: "Shannon K",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Sk_picture.jpg/500px-Sk_picture.jpg",
    bio: `Shannon K is an Indian-American singer and performer who works in Hindi film playback, independent English pop, and cross-genre covers. Known to audiences as Kumar Sanu’s daughter and for her own singles and soundtrack work, she bridges Bollywood and global pop styling. People searching for Shannon K songs, Chal Zindagi, or new releases will find vocals, production credits, and official music videos across platforms. She continues to release music and collaborate with composers and producers.

She has also stepped in front of the camera for film roles, so her public profile spans both soundtrack presence and on-screen storytelling — useful context for fans who find her through cinema first and then dig into her English-language releases. Cross-genre covers and original singles sit alongside Hindi collaborations in her timeline, which makes her streaming presence unusually wide for a playback-oriented artist. Expect a mix of film tie-ins, independent drops, and live-adjacent promo tied to whichever project is current.`,
    tracks: [
      {
        id: "chal-zindagi-title-shannon",
        title: "Chal Zindagi (Title Track)",
        film: "Chal Zindagi",
        youtubeUrl: "https://www.youtube.com/watch?v=y_ZBTHfK0DE",
        synopsis:
          "Official music video — full crew and audio credits from the YouTube description.",
        youtubeDescription: `#ChalZindagi #viveksharma #sanjaymishra

Singers : Javed Ali, Shannon K
Composer: The Lost Symbols

ChalZindagi releasing in theatres on 26th May 2023.

Starring: Shannon K, Vivek Dahiya, Sanjay Mishra, Mita Vashisht, Vivaan Sharma, Vikram Pratap, Rakesh Pandey, Sandeep Gaur.
Lyrics: Vivek Sharma
Written & Directed by: Vivek Sharma
Music on: Vivaan Records
Line Producer: Navjeet Joshi (J-one)
DOP: Ashish Rai
1st DOP Assistant: Subh Thakur
Chief AD: Deepak Taggar
Post Producer: Santoshh G Gupta
Re-recording Mixer: C.V. Raju
Editor: Shiva Bayappa, Arjun S Phadtare
DI Colorist & VFX: Ritesh S Kumar
Casting Director: Farukh Shaikh, Ashok Vyas
Production Controllers: Shashank Singh, Brijesh Sharma, Naman Singh, Sandeep Chauhan, Rajendra Sharma, Abhishek Gureja
Digital Marketing Promotion: The Live Zone (Yasir Khan) & Aman Raj
PR & Marketing: Waseem Akhter (Expansion Team: Ritesh Srivastav, Komal Pandey)`,
        credits: [
          { label: "Artist", value: "Shannon K (with Javed Ali)" },
          { label: "Score / music", value: "The Lost Symbols" },
          { label: "Singers", value: "Javed Ali & Shannon K" },
          { label: "Lyrics", value: "Vivek Sharma" },
          { label: "Written & directed by", value: "Vivek Sharma" },
          { label: "Music on", value: "Vivaan Records" },
          { label: "Re-recording mixer", value: "C.V. Raju" },
        ],
      },
      {
        id: "kanya-manya",
        title: "Kanya Manya",
        film: "Chal Zindagi",
        youtubeUrl: "https://www.youtube.com/watch?v=b05Nn1HwJP4",
        synopsis:
          "YouTube Music / label audio — credits from the track metadata on YouTube.",
        youtubeDescription: `Provided to YouTube by TuneCore

Kanya Manya · Shannon K, Ravindra Upadhyay & Vivaan Sharma

Kanya Manya

℗ 2023 Vivaan Filmz Production

Released on: 2023-05-11

Auto-generated by YouTube.`,
        credits: [
          { label: "Artists", value: "Shannon K, Ravindra Upadhyay & Vivaan Sharma" },
          { label: "Score / music", value: "The Lost Symbols" },
          { label: "Label", value: "Vivaan Filmz Production (via TuneCore)" },
          { label: "Release", value: "2023-05-11" },
          { label: "Film", value: "Chal Zindagi" },
        ],
      },
      {
        id: "party-hard-shannon",
        title: "Party Hard",
        film: "Chal Zindagi",
        youtubeUrl: "https://www.youtube.com/watch?v=hfdJmQOWsKU",
        synopsis:
          "Official music video — full crew and audio credits from the YouTube description.",
        youtubeDescription: `#PartyHard #chalzindagi #Neeraj Shridhar
Let's PARTY HARD with ChalZindagi.

Composed by: The Lost Symbols
Lyricist: Vivek Sharma
Singers: Neeraj Shridhar & Shannon K
Mixed & Mastered by: C.V. Raju
Movie: Chal Zindagi
Produced by: Vivaan Filmz Production
Co-produced by: Priyank Jain, Prakash Ranka, Vaibhav punch, Ritika Sharma

Music & BG: The Lost Symbols
Line Producer: Navjeet Joshi (J-one)
DOP: Ashish Rai
First DOP Assistant: Shubh Thakur
Chief AD: Deepak Taggar
Choreographer: Mehul Kapdiya
Post Producer: Santoshh G Gupta
Re-recording Mixer: C.V. Raju
Editor: Shiva Bayappa, Arjun S Phadtare
DI Colorist & VFX: Ritesh S Kumar
Casting Director: Farukh Shaikh, Ashok Vyas
Production Controllers: Shashank Singh, Brijesh Sharma, Naman Singh, Sandeep Chauhan, Rajendra Sharma, Abhishek Gureja
Digital Marketing Promotion: The Live Zone (Yasir Khan) & Aman Raj
PR & Marketing: Waseem Akhter (Expansion Team: Ritesh Srivastav, Komal Pandey)`,
        credits: [
          { label: "Artist", value: "Shannon K (with Neeraj Shridhar)" },
          { label: "Score / music", value: "The Lost Symbols" },
          { label: "Singers", value: "Neeraj Shridhar & Shannon K" },
          { label: "Lyricist", value: "Vivek Sharma" },
          { label: "Mixed & mastered by", value: "C.V. Raju" },
          { label: "Produced by", value: "Vivaan Filmz Production" },
        ],
      },
      {
        id: "mujhe-jeena-aagaya-shannon",
        title: "Mujhe Jeena Aagaya",
        film: "Chal Zindagi",
        youtubeUrl: "https://www.youtube.com/watch?v=YBVZHUjY9LE",
        synopsis:
          "Official music video — full crew and audio credits from the YouTube description.",
        youtubeDescription: `#kumarsanu #shannonk #chalzindagi

Mujhe Jeena aa Gaya
Composed by: The Lost Symbols
Lyricist: Vivek Sharma
Singers: Kumar Sanu & Shannon K
Mixed & Mastered by: C.V. Raju

Movie: Chal Zindagi
Starcast: Sanjay Mishra, Shannon K, Vivek Dahiya, Vivaan Sharma, Mita Vashisht, Rakesh Pandey, Vikram Pratap, Sandeep Gaur

Directed by: Vivek Sharma
Produced by: Vivaan Filmz Production
Co-produced by: Priyank Jain, Prakash Ranka, Vaibhav Punch, Ritika Sharma

Music & BG: The Lost Symbols
Line Producer: Navjeet Joshi (J-one)
DOP: Ashish Rai
First DOP Assistant: Shubh Thakur
Chief AD: Deepak Taggar
Post Producer: Santoshh G Gupta
Re-recording Mixer: C.V. Raju
Editor: Shiva Bayappa, Arjun S Phadtare
DI Colorist & VFX: Ritesh S Kumar
Casting Director: Farukh Shaikh, Ashok Vyas
Production Controllers: Shashank Singh, Brijesh Sharma, Naman Singh, Sandeep Chauhan, Rajendra Sharma, Abhishek Gureja
Digital Marketing Promotion: The Live Zone (Yasir Khan) & Aman Raj
PR & Marketing: Waseem Akhter (Expansion Team: Ritesh Srivastav, Komal Pandey)`,
        credits: [
          { label: "Artist", value: "Shannon K (with Kumar Sanu)" },
          { label: "Score / music", value: "The Lost Symbols" },
          { label: "Singers", value: "Kumar Sanu & Shannon K" },
          { label: "Lyricist", value: "Vivek Sharma" },
          { label: "Mixed & mastered by", value: "C.V. Raju" },
          { label: "Directed by", value: "Vivek Sharma" },
          { label: "Produced by", value: "Vivaan Filmz Production" },
        ],
      },
      {
        id: "hey-you-pink-floyd-cover",
        title: "Hey You (Cover) — Pink Floyd",
        film: "Cover",
        youtubeUrl: "https://www.youtube.com/watch?v=aJkz6KT1U9U",
        synopsis:
          "Official upload on Shannon K’s channel — full credits from the YouTube description.",
        youtubeDescription: `It's my humble rendition of legendary Pink Floyd. Hope you like it. Thank you

Artist: Shannon K
Score / music recreated: The Lost Symbols

Original credits:
Composition: Pink Floyd
Hey You lyrics © BMG Rights Management

#PinkFloyd #HeyYou #ShannonK #shannonksongs`,
        credits: [
          { label: "Artist", value: "Shannon K" },
          { label: "Score / arrangement", value: "The Lost Symbols (music recreated)" },
          { label: "Original composition", value: "Pink Floyd" },
          { label: "Lyrics", value: "Hey You © BMG Rights Management" },
        ],
      },
      {
        id: "make-you-feel-my-love-cover",
        title: "Make You Feel My Love (Cover) — Bob Dylan",
        film: "Cover",
        youtubeUrl: "https://www.youtube.com/watch?v=3ltNBFFPmC8",
        synopsis:
          "Official upload on Shannon K’s channel — credits from the YouTube description.",
        youtubeDescription: `Performed by: Shannon K
Music produced by: The Lost Symbols

Original credits:
Composition: Bob Dylan

#bobdylan #adele #shannonk #shannonksongs #makeyoufeelmylove #bobdylancover`,
        credits: [
          { label: "Artist", value: "Shannon K" },
          { label: "Score / music production", value: "The Lost Symbols" },
          { label: "Composition (original)", value: "Bob Dylan" },
        ],
      },
      {
        id: "pehla-pehla-pyar",
        title: "Pehla Pehla Pyar",
        film: "Pehla Pehla Pyar (single)",
        youtubeUrl: "https://www.youtube.com/watch?v=-O0QxhZcGzY",
        synopsis:
          "Official video — Shannon K as artist; The Lost Symbols on score; Shannon’s session work is vocal production, mixing and mastering only.",
        youtubeDescription: `Pehla Pehla Pyar | Shannon K | Prem & Hardeep | Official Video

Artist: Shannon K
Score: The Lost Symbols

Shannon K — vocal production, mixing and mastering only on this release (not lead performer on the video). Prem & Hardeep featured on the official video.

YouTube listing may include promotional / keyword text; full label credits may appear on the distributor or label page.`,
        credits: [
          { label: "Artist", value: "Shannon K" },
          { label: "Score", value: "The Lost Symbols" },
          { label: "Shannon K (session)", value: "Vocal production, mixing & mastering" },
          { label: "Featured on video", value: "Prem & Hardeep" },
        ],
      },
    ],
  },
  {
    id: "ravindra-upadhyay",
    name: "Ravindra Upadhyay",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5eb6ea3c14e71aca7dc460b5c5f",
    bio: `Ravindra Upadhyay is an Indian playback singer with credits across Bollywood, regional cinema, and independent releases. Listeners know his voice from Hindi film songs and high-streaming collaborations; his career includes television talent milestones and work with major labels. Those searching for Ravindra Upadhyay songs, Talaash, or live shows will find a versatile vocalist with folk and film influences. He continues to record and perform for films and singles.

His vocal colour often sits in a mid-weight, expressive register that suits both anthemic film moments and softer narrative songs — a flexibility that keeps him in rotation for composers who need one singer to cover more than one mood. Television exposure early on helped introduce him to a national audience before streaming made regional and indie collaborations easier to find. Today his name turns up on soundtrack credits, label singles, and joint tracks where a grounded, folk-tinged delivery is the brief.`,
    tracks: [
      {
        id: "aye-zindagi",
        title: "Aye Zindagi",
        film: "Social Mandiya",
        youtubeUrl: "https://www.youtube.com/watch?v=HTJUhKYlBuI",
        synopsis:
          'Official music video on T-Series Popchartbusters — audio credits below are from the YouTube description.',
        youtubeDescription: `T-Series Present upcoming Hindi film "Social Mandiya" video song "Aye Zindagi" starring Vikalp Mehta, Trishna Singh, Ruchita Sharma in the lead role exclusively on T-Series Popchartbusters.

Song: Aye Zindagi
Movie: Social Mandiya
Artists: Vikalp Mehta, Sandeep Sharma, Nishant Kumar, Vivaan Sharma, Trishna Singh, Ruchita Sharma, Jaishree, Jairoop Jeevan
Singer: Ravindra Upadhyay
Lyricist: Vivek Sharma, Aman and Arun
Music: The Lost Symbols
Music Producer: Gunjan Soral
Recorded and Mixed at Underroot Studios and Media Works, Jaipur
Master Mixing: Underroot Studios & Rabab Studios (Deep Bawa)
Director: Vivek Sharma
D.O.P: Ashish Rai
Creative Director: Deepak Taggar
Editor & DI: Pawan Kumar (Ediframz, Chandigarh)
VFX: Harpreet Kang
Assistant D.O.P.: Subh Thakur
Producer: Vivek Sharma
Co-Producer: Priyank Jain
Executive Producer: Shannon K
Production: J-One (Navjeet Joshi)
Production Controller: Shashank Singh, Brijesh Sharma, Rajendra Sharma
Project By: Vivaan Filmz Production
Music Label: T-Series

_____________________________________

Enjoy & stay connected with us!!

FOR LATEST UPDATES:
----------------------------------------
SUBSCRIBE US Here: http://bit.ly/SJIj4g

"If you like the Video, Don't forget to Share and leave your comments"

Visit Our Channel For More Videos: http://www.youtube.com/Popchartbusters
Like us on Facebook: https://www.facebook.com/popchartbusters`,
        credits: [
          { label: "Singer", value: "Ravindra Upadhyay" },
          { label: "Music", value: "The Lost Symbols" },
          { label: "Lyricist", value: "Vivek Sharma, Aman and Arun" },
          { label: "Music producer", value: "Gunjan Soral" },
          { label: "Recorded & mixed at", value: "Underroot Studios and Media Works, Jaipur" },
          { label: "Master mixing", value: "Underroot Studios & Rabab Studios (Deep Bawa)" },
          { label: "Director", value: "Vivek Sharma" },
          { label: "Music label", value: "T-Series" },
          { label: "Project by", value: "Vivaan Filmz Production" },
        ],
      },
      {
        id: "kanya-manya-ravindra",
        title: "Kanya Manya",
        film: "Chal Zindagi",
        youtubeUrl: "https://www.youtube.com/watch?v=b05Nn1HwJP4",
        synopsis:
          "YouTube Music / label audio — credits from the track metadata on YouTube.",
        youtubeDescription: `Provided to YouTube by TuneCore

Kanya Manya · Shannon K, Ravindra Upadhyay & Vivaan Sharma

Kanya Manya

℗ 2023 Vivaan Filmz Production

Released on: 2023-05-11

Auto-generated by YouTube.`,
        credits: [
          { label: "Artists", value: "Shannon K, Ravindra Upadhyay & Vivaan Sharma" },
          { label: "Score / music", value: "The Lost Symbols" },
          { label: "Label", value: "Vivaan Filmz Production (via TuneCore)" },
          { label: "Release", value: "2023-05-11" },
          { label: "Film", value: "Chal Zindagi" },
        ],
      },
    ],
  },
];

export function getArtistById(id: string): FeaturedArtistEntry | undefined {
  return FEATURED_ARTISTS.find((a) => a.id === id);
}

export function getTrack(
  artistId: string,
  trackId: string,
): { artist: FeaturedArtistEntry; track: ArtistTrack } | undefined {
  const artist = getArtistById(artistId);
  if (!artist?.tracks) return undefined;
  const track = artist.tracks.find((t) => t.id === trackId);
  if (!track) return undefined;
  return { artist, track };
}
