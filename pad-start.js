const things = [
  { type: 'Car', color: 'Blue', year: 2022 },
  { type: 'Bike', color: 'Yellow', year: 2021 },
  { type: 'Car', color: 'Silver', year: 2012 },
];

things.forEach((t) => {
  console.log(
    `Type: ${t.type}`.padEnd(14),
    `Color: ${t.color.padEnd(10)}`.padStart(20)
  );
});
