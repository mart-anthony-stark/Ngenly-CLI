export const routeTemplate = (name) => {
  return `
const ${name}Model = require('../models/${
    name.charAt(0).toUpperCase() + name.slice(1)
  }.route.js')

`;
};
