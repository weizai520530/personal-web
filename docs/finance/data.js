const PORTFOLIO_DATA = {
  meta: {
    lastUpdated: "2026-04-30",
    currency: "USD",
    portfolioName: "Bowei's Portfolio"
  },
  summary: {
    totalInvested: 25945,
    currentValue:  21041.43,
    dayChange:     217,
    dayChangePct:  0.75
  },
  holdings: [
    {
      symbol: "SOXS",
      name: "SOXX 3X Bear",
      type: "ETF",
      sector: "Technology",
      shares: 950,
      avgCost: 19.86,
      currentPrice: 13.43,
      dayChangePct: 0.98
    },
    {
      symbol: "RKLX",
      name: "RKLB 2X Bull",
      type: "ETF",
      sector: "Technology",
      shares: 200,
      avgCost: 34.04,
      currentPrice: 40.00,
      dayChangePct: 0.78
    }
  ],
  performance: [
    { date: "May '25", value: 10579 },
    { date: "Jun '25", value:  9637 },
    { date: "Jul '25", value: 13267 },
    { date: "Aug '25", value: 15851 },
    { date: "Sep '25", value: 18543 },
    { date: "Oct '25", value: 17648 },
    { date: "Nov '25", value: 15746 },
    { date: "Dec '25", value: 15677 },
    { date: "Jan '26", value: 16955 },
    { date: "Feb '26", value: 16299 },
    { date: "Mar '26", value: 18286 },
    { date: "Apr '26", value: 29279 }
  ]
};
