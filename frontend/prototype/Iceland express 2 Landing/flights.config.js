// flights.config.js — Flights vertical config stub
// Sprint 1A · task 1A-6
//
// Phase 2 stub — all keys match the schema defined in cars.config.js.
// Populate with real Icelandair API endpoints when Phase 2 gate opens.
// Gate: Icelandair API contract signed.

const flightsConfig = {

  id: 'flights',
  label: 'Flights',

  checkout: {
    protectionBanner: 'Your fare is protected · Free cancellation within 24h',
    summaryNote: function(search) {
      return 'Departure at ' + search.pickupTime + ' · ' + search.pickupLoc.name;
    },
  },

  traveller: {
    sectionLabel: 'Passenger Details',
    hasLicense: false,
    licenseLabel: null,
    licenseCountries: null,
    flightHelper: 'We will send updates to your email if the flight schedule changes.',
    requestsPlaceholder: 'Meal preference, extra legroom, wheelchair assistance, etc.',
  },

  legal: {
    conditionsLabel: 'Fare Rules',
    marketingCopy: 'Send me Iceland travel tips and exclusive offers',
  },

  payment: {
    hasPickupOption: false,
  },

  // ── Manage booking (MB) — ratified 2026-07-08 (docs/ux-logic.md §6.3) ─────
  manage: {
    hasModifyDriver: false,    // name changes on flights require re-ticketing
    hasModifyDates: true,      // subject to Duffel change support per fare
    hasModifyLocation: false,  // origin/destination are fixed
    hasModifyExtras: true,     // bags / seats
    hasCancel: true,
    cancelTierLabels: {
      free: 'Free Cancellation',
      partial: '15% cancellation fee',
      late: '25% cancellation fee',
    },
    amendInstructions: 'Edit your dates or extras below. Changes are confirmed by the airline within 60 seconds.',
  },

  confirmation: {
    refPrefix: 'FL-',
    tripSectionLabel: 'Flight Details',
    originLabel: 'Departure',
    destinationLabel: 'Arrival',
    durationLabel: 'Duration',
    addonsLabel: 'Extras Booked',
    bookAgainLabel: 'Book another flight',
    nextSteps: [
      {
        title: 'Confirmation email',
        desc: 'Your e-ticket and full itinerary will arrive within 5 minutes.',
      },
      {
        title: 'Check in online',
        desc: 'Online check-in opens 24 hours before departure.',
      },
      {
        title: 'Board your flight',
        desc: function(search) {
          return 'Arrive at ' + search.pickupLoc.name + ' at least 2 hours before ' + search.pickupTime + ' with your boarding pass.';
        },
      },
      {
        title: 'Enjoy your trip',
        desc: 'All set! Your fare includes carry-on baggage and seat selection.',
      },
    ],
  },

  item: {
    displayName: function(item) {
      return item.airline + ' · ' + item.flightNumber;
    },
    categoryKey: 'cabinClass',
    providerKey: 'airline',
    imageKey: 'img',
    specs: [
      { icon: 'Plane',    key: 'stops'    },
      { icon: 'Users',    key: 'seats'    },
      { icon: 'Luggage',  key: 'baggage'  },
    ],
  },
};

window.flightsConfig = flightsConfig;
