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
      parents: 'Mrs. Shylaja Sajeev & Late Mr. Sajeev Kumar',
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
      id: 2,
      src: '/images/couple-2.jpg',
      alt: 'Jithin & Sreelakshmi – A Beautiful Chapter Together',
      objectPosition: 'center 40%',
    },
    {
      id: 4,
      src: '/images/couple-4.jpg',
      alt: 'Jithin & Sreelakshmi – Mountain Embrace',
      objectPosition: 'center 25%',
    },
  ],

  closing: {
    message: 'Your presence and blessings will make our celebration complete.',
    sharedBy: {
      label: 'Cordially Invited',
      names: 'All Our Dear Friends & Family',
      subtext: 'are warmly invited to join and celebrate this special day with us',
    },
  },
};
