import React from 'react';

const events = [
  {
    title: 'Madhubani Literature Festival',
    date: '12-14 January 2025',
    location: 'Madhubani, Bihar',
    description:
      'A grand celebration of Mithila’s literature, art, and tradition. Join scholars, artists, and cultural enthusiasts from across the country.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1s55SHnrXgJQQm8oCeCrfZm2RRYKWPl4og&s', // Place your image in /public/events/
  },
  {
    title: 'Vedic Science Symposium',
    date: '5 March 2025',
    location: 'Patna, Bihar',
    description:
      'Exploring ancient Indian knowledge systems, Vedas, and their relevance in the modern world. Hosted by scholars and spiritual leaders.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaAgenoHqNMTsbh0tq3oQMfW_Npwl9vMHoCg&s',
  },
  {
    title: 'Traditional Art Workshop',
    date: '10 April 2025',
    location: 'Darbhanga, Bihar',
    description:
      'Hands-on workshop focused on Madhubani painting, pottery, and folk music. Open to all age groups and artists.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRF0asip1Esy9_ASW09nlIVEuXwoupCI-Dhw&s',
  },
];

const Events = () => {
  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-8 lg:px-20">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Our Events</h2>
        <p className="text-md text-gray-600">Centre for Studies of Tradition and System</p>
      </div>

      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">{event.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{event.date} • {event.location}</p>
              <p className="text-gray-600 mt-3 text-sm">{event.description}</p>
              <button className="mt-5 inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
