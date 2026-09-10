/* Wedding Data Configuration
   ────────────────────────────
   All wedding content is centralized here for easy editing.
*/

export const weddingData = {
  couple: {
    groom: 'Jithin',
    bride: 'Sreelakshmi',
  },

  date: {
    full: '25 October 2026',
    day: 'Sunday',
    display: '25 • 10 • 2026',
    iso: '2026-10-25T10:30:00+05:30',
  },

  families: {
    groom: {
      parents: 'Mrs. Shylaya Sajeev & Mr. Sajeev Kumar (Late)',
      address: 'Mundekottupadikkal (H), Sopanam 35, Palakkodu, Angadippuram, Malappuram.',
    },
    bride: {
      parents: 'Mrs. Gayathri Mohanan & Mr. Mohanan VK',
      address: 'Vadakkekara (H), Pang Chendi, Malappuram.',
    },
  },

  events: {
    ceremony: {
      title: 'The Wedding Ceremony',
      date: 'Sunday, 25 October 2026',
      time: '10:30 AM – 11:30 AM',
      timeLabel: 'Muhurtham',
      venue: 'Event City Convention Center',
      address: 'Pang South, Malappuram',
      mapsLink: 'https://maps.app.goo.gl/6WapbmGq6PqJY35t8',
    },
    reception: {
      title: 'The Reception',
      date: 'Sunday, 25 October 2026',
      time: 'From 5 PM Onwards',
      venue: 'Zahara Convention Centre',
      address: 'Valamboor Rd, Palakkodu',
      mapsLink: 'https://maps.app.goo.gl/k9GBqDgpq7SM8PCz6',
    },
  },

  photos: [
    {
      id: 1,
      src: '/images/couple-1.jpg',
      alt: 'Jithin & Sreelakshmi – Two Hearts One Journey',
      objectPosition: 'center 30%',
    },
    {
      id: 2,
      src: '/images/couple-2.jpg',
      alt: 'Jithin & Sreelakshmi – A Beautiful Chapter Together',
      objectPosition: 'center 40%',
    },
    {
      id: 3,
      src: '/images/couple-3.jpg',
      alt: 'Jithin & Sreelakshmi – Under Golden Arches',
      objectPosition: 'center 35%',
    },
    {
      id: 4,
      src: '/images/couple-4.jpg',
      alt: 'Jithin & Sreelakshmi – Mountain Embrace',
      objectPosition: 'center 25%',
    },
    {
      id: 5,
      src: '/images/couple-5.jpg',
      alt: 'Jithin & Sreelakshmi – Better Together',
      objectPosition: 'center 30%',
    },
    {
      id: 6,
      src: '/images/couple-6.jpg',
      alt: 'Jithin & Sreelakshmi – Some Stories Never End',
      objectPosition: 'center 35%',
    },
  ],

  closing: {
    message: 'Your presence and blessings will make our celebration complete.',
    sharedBy: {
      label: 'Sharing Happiness',
      names: 'Anjima Athul & Athul Mathur',
    },
  },
};
