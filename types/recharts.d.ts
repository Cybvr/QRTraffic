// recharts.d.ts
declare module 'recharts/lib/chart/PieChart' {
  export const PieChart: any;  // This was already present
}

// Add the new declaration for Pie
declare module 'recharts/lib/polar/Pie' {
  export const Pie: any;
}

// Add the new declaration for Cell
declare module 'recharts/lib/component/Cell' {
  export const Cell: any;
}