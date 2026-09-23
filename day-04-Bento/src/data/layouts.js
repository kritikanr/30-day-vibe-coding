// 5 Curated 6-Card Bento Grid Layouts (4-Column x 3-Row Grid = 12 Cells)

export const BENTO_LAYOUTS = [
  {
    id: 'spotlight-nepal',
    name: 'Layout 01 • Alpine Spotlight',
    tag: 'Feature Focus',
    cards: {
      nepal: { colStart: 1, colSpan: 2, rowStart: 1, rowSpan: 2, size: 'hero' },
      clock: { colStart: 3, colSpan: 1, rowStart: 1, rowSpan: 1, size: 'compact' },
      calorie: { colStart: 4, colSpan: 1, rowStart: 1, rowSpan: 1, size: 'compact' },
      equalizer: { colStart: 3, colSpan: 2, rowStart: 2, rowSpan: 1, size: 'wide' },
      orangeCard: { colStart: 1, colSpan: 2, rowStart: 3, rowSpan: 1, size: 'wide' },
      fashion: { colStart: 3, colSpan: 2, rowStart: 3, rowSpan: 1, size: 'wide' },
    },
  },
  {
    id: 'financial-vault',
    name: 'Layout 02 • Financial Vault',
    tag: 'Asymmetric Balance',
    cards: {
      fashion: { colStart: 1, colSpan: 1, rowStart: 1, rowSpan: 2, size: 'tall' },
      clock: { colStart: 2, colSpan: 1, rowStart: 1, rowSpan: 1, size: 'compact' },
      orangeCard: { colStart: 3, colSpan: 2, rowStart: 1, rowSpan: 2, size: 'hero' },
      calorie: { colStart: 2, colSpan: 1, rowStart: 2, rowSpan: 1, size: 'compact' },
      equalizer: { colStart: 1, colSpan: 2, rowStart: 3, rowSpan: 1, size: 'wide' },
      nepal: { colStart: 3, colSpan: 2, rowStart: 3, rowSpan: 1, size: 'wide' },
    },
  },
  {
    id: 'cyber-audio',
    name: 'Layout 03 • Acoustic Center',
    tag: 'Studio Equalizer',
    cards: {
      nepal: { colStart: 1, colSpan: 2, rowStart: 1, rowSpan: 1, size: 'wide' },
      orangeCard: { colStart: 3, colSpan: 2, rowStart: 1, rowSpan: 1, size: 'wide' },
      fashion: { colStart: 1, colSpan: 1, rowStart: 2, rowSpan: 2, size: 'tall' },
      equalizer: { colStart: 2, colSpan: 2, rowStart: 2, rowSpan: 2, size: 'hero' },
      clock: { colStart: 4, colSpan: 1, rowStart: 2, rowSpan: 1, size: 'compact' },
      calorie: { colStart: 4, colSpan: 1, rowStart: 3, rowSpan: 1, size: 'compact' },
    },
  },
  {
    id: 'twin-pillars',
    name: 'Layout 04 • Twin Pillars',
    tag: 'Architectural Symmetry',
    cards: {
      fashion: { colStart: 1, colSpan: 1, rowStart: 1, rowSpan: 2, size: 'tall' },
      nepal: { colStart: 2, colSpan: 2, rowStart: 1, rowSpan: 1, size: 'wide' },
      orangeCard: { colStart: 4, colSpan: 1, rowStart: 1, rowSpan: 2, size: 'tall' },
      clock: { colStart: 2, colSpan: 1, rowStart: 2, rowSpan: 1, size: 'compact' },
      calorie: { colStart: 3, colSpan: 1, rowStart: 2, rowSpan: 1, size: 'compact' },
      equalizer: { colStart: 1, colSpan: 4, rowStart: 3, rowSpan: 1, size: 'wide' },
    },
  },
  {
    id: 'editorial-spread',
    name: 'Layout 05 • Editorial Spread',
    tag: 'Magazine Showcase',
    cards: {
      orangeCard: { colStart: 1, colSpan: 3, rowStart: 1, rowSpan: 1, size: 'wide' },
      clock: { colStart: 4, colSpan: 1, rowStart: 1, rowSpan: 1, size: 'compact' },
      nepal: { colStart: 1, colSpan: 2, rowStart: 2, rowSpan: 1, size: 'wide' },
      fashion: { colStart: 3, colSpan: 2, rowStart: 2, rowSpan: 2, size: 'hero' },
      calorie: { colStart: 1, colSpan: 1, rowStart: 3, rowSpan: 1, size: 'compact' },
      equalizer: { colStart: 2, colSpan: 1, rowStart: 3, rowSpan: 1, size: 'compact' },
    },
  },
];
