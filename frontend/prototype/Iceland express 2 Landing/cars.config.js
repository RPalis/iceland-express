// cars.config.js — Reference vertical config for Car Rentals
// Sprint 1A · task 1A-3
//
// This is the authoritative schema. Every key here must exist in every
// other vertical config (flights.config.js, hotels.config.js, etc.).
// Keys marked [REQUIRED] must be present. Keys marked [OPTIONAL] may be
// null/false and the screen must handle the absent state gracefully.
//
// Usage in screens: accept a `vertical` prop, default to window.carsConfig.

const carsConfig = {

  // ── Identity ──────────────────────────────────────────────────────────────
  id: 'cars',                         // machine key — never shown in UI
  label: 'Car Rental',                // used in nav, page titles

  // ── Checkout screen (A6) ─────────────────────────────────────────────────
  checkout: {

    // [REQUIRED] Protection banner at top of checkout
    protectionBanner: 'Your booking is protected · Free cancellation within 48h',

    // [REQUIRED] Summary note shown inside PriceSummaryCard
    // Receives the `search` object, returns a display string
    summaryNote: function(search) {
      return 'Pickup at ' + search.pickupTime + ' · ' + search.pickupLoc.name;
    },
  },

  // ── Traveller / person details (A6 driver form) ───────────────────────────
  traveller: {

    // [REQUIRED] Section heading above the form card
    sectionLabel: 'Driver Details',

    // [REQUIRED] Whether to show the "license issued in" select field
    // false → field is removed entirely from the form
    hasLicense: true,

    // [OPTIONAL] Label for the license country select. null if hasLicense=false
    licenseLabel: 'License issued in',

    // [OPTIONAL] Countries shown in the license select. null → use default list
    licenseCountries: ['GB','US','DE','FR','IS','AU','CA','NL','SE','NO','DK'],

    // [REQUIRED] Helper text below the flight number field
    flightHelper: 'We monitor your flight and adjust pickup automatically.',

    // [REQUIRED] Placeholder for the special requests textarea
    requestsPlaceholder: 'Child seat installed on arrival, camping kit assembly, etc.',
  },

  // ── Legal / terms (A6) ────────────────────────────────────────────────────
  legal: {

    // [REQUIRED] Name of the conditions document linked in the terms checkbox
    conditionsLabel: 'Rental Conditions',

    // [REQUIRED] Text for the optional marketing opt-in checkbox
    marketingCopy: 'Send me Iceland travel tips and exclusive offers',
  },

  // ── Payment options (A6) ──────────────────────────────────────────────────
  payment: {

    // [REQUIRED] Whether to show the "Pay at Pickup" option
    // false → only "Pay in Full" and "Pay Deposit" are shown
    hasPickupOption: true,
  },

  // ── Confirmation screen (A7) ──────────────────────────────────────────────
  confirmation: {

    // [REQUIRED] Prefix prepended to the generated booking reference
    // e.g. "ICE-" produces "ICE-A3F9KX"
    refPrefix: 'ICE-',

    // [REQUIRED] Section title above the pickup/return rows
    tripSectionLabel: 'Trip Details',

    // [REQUIRED] Label for the origin row (pickup / departure / check-in)
    originLabel: 'Pickup',

    // [REQUIRED] Label for the destination row (return / arrival / check-out)
    destinationLabel: 'Return',

    // [REQUIRED] Label for the duration row
    durationLabel: 'Duration',

    // [REQUIRED] Section title above the extras/add-ons list
    addonsLabel: 'Add-ons Booked',

    // [REQUIRED] CTA label on the "book again" button
    bookAgainLabel: 'Book another car',

    // [REQUIRED] Four "What Happens Next" steps. Each step:
    //   title  — short heading
    //   desc   — can be a string OR a function(search) returning a string
    nextSteps: [
      {
        title: 'Confirmation email',
        desc:  'Your voucher and full itinerary will arrive within 5 minutes.',
      },
      {
        title: 'Track your flight',
        desc:  "If you added a flight number, we'll auto-adjust your pickup time.",
      },
      {
        title: 'Pick up your car',
        desc:  function(search) {
          return 'Head to ' + search.pickupLoc.name + ' at ' + search.pickupTime + ' with your driving license.';
        },
      },
      {
        title: 'Hit the Ring Road',
        desc:  'All set! Your rental includes CDW, unlimited mileage and 24/7 support.',
      },
    ],
  },

  // ── Manage booking (MB) — ratified 2026-07-08 (docs/ux-logic.md §6.3) ─────
  manage: {

    // [REQUIRED] Which amendment actions are available for this vertical
    hasModifyDriver: true,      // M3a — name / phone / license country
    hasModifyDates: true,       // M3b
    hasModifyLocation: true,    // M3c
    hasModifyExtras: true,      // M3d
    hasCancel: true,

    // [REQUIRED] Labels for the cancellation fee tiers
    cancelTierLabels: {
      free: 'Free Cancellation',
      partial: '15% cancellation fee',
      late: '25% cancellation fee',
    },

    // [REQUIRED] Instructions shown at the top of the amend view
    amendInstructions: 'Edit your driver details, dates, location, or extras below. Changes are confirmed by Rentalcars within 60 seconds.',
  },

  // ── Item summary card (A7) ────────────────────────────────────────────────
  // Describes how to render the "what was booked" card on the confirmation page.
  item: {

    // [REQUIRED] Returns the primary display name for the booked item
    displayName: function(item) {
      return item.year + ' ' + item.name;
    },

    // [REQUIRED] Key on the item object that holds the category label
    // e.g. car.catLabel → "SUV · 4WD"
    categoryKey: 'catLabel',

    // [REQUIRED] Key on the item object that holds the provider/supplier name
    providerKey: 'provider',

    // [REQUIRED] Key on the item object for the main image URL
    imageKey: 'img',

    // [REQUIRED] Array of spec badges shown below the item name
    // icon  — key in Icons.* (string)
    // key   — property on the item object
    specs: [
      { icon: 'Gear',  key: 'transmission' },
      { icon: 'Users', key: 'seats'        },
      { icon: 'Drive', key: 'drive'        },
    ],
  },
};

window.carsConfig = carsConfig;
