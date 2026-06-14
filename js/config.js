/* ═══════════════════════════════════════════════════════════════════════
   SMALL TOWN SPORTS ACADEMY — site data (single source of truth)
   ───────────────────────────────────────────────────────────────────────
   Loaded first on every page via <script src="/js/config.js">. All content
   that pages render lives here as window.STSA. Mirrors live data pulled from
   the academy's UpperHand offerings (customer 1830). Booking/payment stays on
   UpperHand — every "Register" CTA deep-links to the real offering.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  var BOOK = 'https://app.upperhand.io/customers/1830-small-town-sports-academy';

  window.STSA = {
    /* ── Identity ──────────────────────────────────────────────────── */
    name: 'Small Town Sports Academy',
    short: 'STSA',
    tagline: 'Where small-town grit builds big-league players.',
    blurb: 'A year-round baseball & softball training academy in Stephenville, ' +
           'Texas — indoor cages, open turf, skills clinics, camps, and team ' +
           'memberships for every age and level.',
    city: 'Stephenville, TX',
    sport: 'Baseball & Softball',
    founded: 2023,

    /* ── Booking (UpperHand) ───────────────────────────────────────── */
    bookUrl: BOOK + '/offerings',
    book: BOOK,

    /* ── Live data (UpperHand public API — CORS-open, no key) ───────── */
    upperhand: {
      api: 'https://api.upperhand.io/api',
      customerId: '1830',
      tz: 'America/Chicago'   // session times are stored UTC; render in Central
    },

    /* ── Contact ───────────────────────────────────────────────────── */
    contact: {
      owner: 'Amanda Philips',
      ownerRole: 'Owner & Director',
      email: 'aphilips3409@gmail.com',
      facebook: 'https://www.facebook.com/profile.php?id=100089400000000', // placeholder; academy page
      address: '1907 E Washington St, Stephenville, TX 76401',
      hoursNote: 'By appointment & posted session times — see the schedule for each program.'
    },

    /* ── Headline stats (animate-counted on the home hero) ─────────── */
    stats: [
      { n: 3,   label: 'Training Facilities' },
      { n: 50,  suffix: '+', label: 'Coaches & Instructors' },
      { n: 12,  label: 'Age Groups Served' },
      { n: 2023, raw: true, label: 'Serving Since' }
    ],

    /* ── Programs (live UpperHand offerings) ───────────────────────── */
    programs: [
      {
        id: 196661,
        name: 'Grand Slam Baseball Camp',
        cat: 'Camp',
        sport: 'Baseball',
        season: 'Summer',
        price: 75,
        priceNote: 'Full camp',
        altPrice: 40,
        altNote: 'Single day',
        ages: '6–13',
        location: 'Small Town Sports Academy',
        days: 3,
        tagline: 'Three days of high-rep, all-skills baseball.',
        desc: 'Our flagship multi-day camp. Hitting, fielding, throwing, baserunning, ' +
              'and game IQ taught in small groups by our coaching staff. Built for ' +
              'players 6–13 who want a fun, fast-paced summer of real development.',
        bullets: ['3-day camp', 'Ages 6–13', 'Hitting · fielding · pitching · baserunning', 'Single-day option available'],
        url: BOOK + '/events/196661-grand-slam-baseball-camp',
        featured: true
      },
      {
        id: 196663,
        name: 'Monday Night Skills Clinic',
        cat: 'Clinic',
        sport: 'Baseball',
        season: 'Summer',
        price: 20,
        priceNote: 'Per session',
        ages: 'All ages',
        location: 'Small Town Sports Academy',
        days: 10,
        tagline: 'A weekly rep-builder you can drop into any Monday.',
        desc: 'A recurring Monday-night clinic that sharpens one skill block at a time. ' +
              'Pay per session and come when you can — perfect for steady, low-pressure ' +
              'reps between team practices and games.',
        bullets: ['Weekly · Monday nights', 'Pay per session', 'Drop-in friendly', 'Small-group instruction'],
        url: BOOK + '/events/196663-monday-night-skills-clinic',
        featured: true
      },
      {
        id: 196662,
        name: 'Tryout Prep Camp',
        cat: 'Camp',
        sport: 'Baseball',
        season: 'Summer',
        price: 30,
        priceNote: 'Per player',
        ages: 'All ages',
        location: 'Goat Fields',
        days: 1,
        tagline: 'Walk into tryouts confident and prepared.',
        desc: 'A focused one-day session that runs players through exactly what select ' +
              'and school tryouts evaluate — 60-yard times, infield/outfield reads, ' +
              'arm strength, and live at-bats — with coaching on how to stand out.',
        bullets: ['One-day intensive', 'Tryout-style stations', 'Held at Goat Fields', 'Coaching on what evaluators want'],
        url: BOOK + '/events/196662-tryout-prep-camp',
        featured: true
      }
    ],

    /* ── Memberships (curated public-facing tiers from UpperHand) ──── */
    membershipNote: 'Team memberships are organized by age group and offered as ' +
      'monthly or full-season plans. Pricing below reflects current options — ' +
      'enroll or see every age-group plan on our booking page.',
    membershipGroups: [
      {
        group: 'Facility & Individual',
        blurb: 'For families and players who want cage and turf access without a full team commitment.',
        plans: [
          { name: 'Public Family Membership', price: 65, per: 'month', desc: 'Facility access for non-Sox families — cages, turf, and open training time.', highlight: true },
          { name: 'Preseason Membership', price: 70, per: 'month', desc: 'Month-to-month access to ramp up before your season starts.' },
          { name: 'High School Special', price: 20, per: '3 months', desc: 'A discounted three-month plan for high-school players.' }
        ]
      },
      {
        group: 'Team Memberships',
        blurb: 'Coaching fee, facility fee, and team play bundled by age group — billed monthly.',
        plans: [
          { name: 'All-Inclusive Baseball', price: 225, per: 'month', desc: 'Coaching, facility, and 10 tournament fees for Sox baseball players.', highlight: true },
          { name: 'Coach Pitch Team', price: 125, per: 'month', desc: 'Monthly plan for coach-pitch teams; includes facility and tournament play.' },
          { name: 'Sox Softball', price: 190, per: 'month', desc: 'Monthly membership for Sox softball players.' },
          { name: 'High School Sox', price: 30, per: 'month', desc: 'Monthly plan for 16U & 18U high-school Sox players.' }
        ]
      },
      {
        group: 'Season & Showcase Packages',
        blurb: 'Pay once for the whole season — the best value for committed players.',
        plans: [
          { name: 'All-Inclusive Baseball — Season', price: 1350, per: '6-month season', desc: 'Full-season Sox membership: coaching, facility, and 10 tournament fees.', highlight: true },
          { name: 'Coach Pitch — Full Season', price: 750, per: 'season', desc: 'Full spring season for coach-pitch teams, including 10 tournament fees and unlimited facility access.' },
          { name: 'HS Summer Showcase', price: 1085, per: 'summer', desc: 'Summer high-school showcase program; payment plans available.' }
        ]
      }
    ],

    /* ── Locations / facilities ────────────────────────────────────── */
    locations: [
      {
        name: 'Small Town Sports Academy',
        role: 'Main Indoor Facility',
        addr: '1907 E Washington St, Stephenville, TX 76401',
        desc: 'Our home base — indoor cages, training turf, and the front office. ' +
              'Host of the Monday Night Skills Clinic and Grand Slam Camp.',
        amenities: ['Indoor batting cages', 'Training turf', 'Pro shop', 'Climate controlled'],
        primary: true
      },
      {
        name: 'Goat Fields',
        role: 'Outdoor Fields',
        addr: '1907 E Washington St, Stephenville, TX 76401',
        desc: 'Our outdoor playing and tryout grounds, steps from the academy. ' +
              'Home of the Tryout Prep Camp and live game work.',
        amenities: ['Game-ready fields', 'Tryout stations', 'Open practice space']
      },
      {
        name: 'West Stephenville Sox Facility',
        role: 'West-Side Training',
        addr: '6412 S US Hwy 67, Stephenville, TX 76401',
        desc: 'Our west-side training facility supporting Sox team practices and ' +
              'additional cage time.',
        amenities: ['Additional cages', 'Team practice space', 'West-side convenience']
      }
    ],

    /* ── Pro shop categories ───────────────────────────────────────── */
    shop: ['Clothing', 'Equipment', 'Season Startup'],

    /* ── Coaching staff ────────────────────────────────────────────── */
    leadership: [
      { name: 'Amanda Philips', role: 'Owner & Director', bio: 'Founder of Small Town Sports Academy, building a home for Stephenville-area ballplayers to train year-round.' }
    ],
    instructors: ['Amanda McIntosh', 'Cris Enriquez', 'Jadon Johnson', 'Kaden Bernal', 'Riley Shellenberger'],
    coachNote: 'Backed by a 50+ member coaching staff across our Sox baseball and softball teams.',

    /* ── Why-us value props ────────────────────────────────────────── */
    values: [
      { icon: 'target', title: 'Real Development', text: 'Small-group, high-rep instruction from coaches who track each player\'s growth — not crowded drop-in sessions.' },
      { icon: 'calendar', title: 'Train Year-Round', text: 'Indoor cages and turf mean Texas weather never stops your reps. Clinics, camps, and memberships run all four seasons.' },
      { icon: 'users', title: 'A Path For Every Player', text: 'From first-time coach-pitch to high-school showcase, there\'s a program and a team that fits where you are.' },
      { icon: 'home', title: 'Small-Town Roots', text: 'A family-run academy that knows its players by name and treats every kid like one of our own.' }
    ]
  };
})();
