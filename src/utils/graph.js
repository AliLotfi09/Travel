import { BORDERS } from "../data/borders";

/**
 * Check if two countries share a border
 * @param {string} country1 - First country code
 * @param {string} country2 - Second country code
 * @param {Object} borders - Border adjacency map (optional, defaults to BORDERS)
 * @returns {boolean}
 */
export const isNeighbor = (country1, country2, borders = BORDERS) => {
  const neighbors = borders[country1] || [];
  return neighbors.includes(country2);
};

/**
 * Get all neighbors of a country
 * @param {string} country - Country code
 * @param {Object} borders - Border adjacency map (optional, defaults to BORDERS)
 * @returns {Array} - Array of neighbor country codes
 */
export const getNeighbors = (country, borders = BORDERS) => {
  return borders[country] || [];
};

/**
 * Get all countries in the graph
 * @param {Object} borders - Border adjacency map (optional, defaults to BORDERS)
 * @returns {Array} - Array of all country codes
 */
export const getAllCountries = (borders = BORDERS) => {
  return Object.keys(borders);
};

/**
 * Check if a country exists in the graph
 * @param {string} country - Country code
 * @param {Object} borders - Border adjacency map (optional, defaults to BORDERS)
 * @returns {boolean}
 */
export const countryExists = (country, borders = BORDERS) => {
  return country in borders;
};

/**
 * Get the degree (number of neighbors) of a country
 * @param {string} country - Country code
 * @param {Object} borders - Border adjacency map (optional, defaults to BORDERS)
 * @returns {number}
 */
export const getCountryDegree = (country, borders = BORDERS) => {
  return (borders[country] || []).length;
};

export default {
  isNeighbor,
  getNeighbors,
  getAllCountries,
  countryExists,
  getCountryDegree,
};
