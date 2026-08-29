
export const ACTION_CONFIG = {

  tree: {
    id: 'tree',
    title: 'Plant a Seedling / Tree',
    icon: '🌱',
    unit: 'Seedling',
    pointsPerUnit: 50,
    co2Kg: 0.06,      
    waterLiters: 15,   
    wasteKg: 0,
    energyKwh: 0.2,
    description: 'Reducing ambient temperatures and absorbing carbon in Basra'
  },

  recycle: {
    id: 'recycle',
    title: 'Recycle or Donate an Item',
    icon: '♻️',
    unit: 'kg',
    pointsPerUnit: 30,
    co2Kg: 2.1,       
    waterLiters: 35,   
    wasteKg: 1.0,     
    energyKwh: 1.5,
    description: 'Reducing waste quantities and saving manufacturing energy'

  },

  noPlastic: {
    id: 'noPlastic',
    title: 'Plastic-Free Single-Use Day',
    icon: '🥤',
    unit: 'Day',
    pointsPerUnit: 25,
    co2Kg: 0.35,     
    waterLiters: 20,
    wasteKg: 0.15,
    energyKwh: 0.5,
    description: 'Protecting the Shatt al-Arab and waterways from plastic pollution'
  },

  reportLeak: {
    id: 'reportLeak',
    title: 'Report a Water or Gas Leak',
    icon: '🚨',
    unit: 'Confirmed Report',
    pointsPerUnit: 100,
    co2Kg: 5.0,       
    waterLiters: 400,  
    wasteKg: 2.0,
    energyKwh: 3.0,
    description: 'Protecting residential areas and water resources in the province'
  },

  saveEnergy: {
    id: 'saveEnergy',
    title: 'Reduce Electricity Consumption',
    icon: '⚡',
    unit: 'kWh',
    pointsPerUnit: 15,
    co2Kg: 0.7,       
    waterLiters: 5,
    wasteKg: 0,
    energyKwh: 1.0,
    description: 'Reducing power plant emissions and easing the load'
  }

};

export const SCIENTIFIC_SOURCES = [

  {
    title: 'US Environmental Protection Agency (EPA)',
    detail: 'Carbon dioxide absorption factors for trees and solid waste recycling.'
  },

  {
    title: 'UN Environment Programme (UNEP)',
    detail: 'Studies on water footprint and the impact of plastic on aquatic and coastal environments.'
  },

  {
    title: 'IPCC Climate Change Guidelines',
    detail: 'Standards for calculating carbon equivalents for electricity and daily activities.'
  }

];



export const calculateUserRank = (points) => {

  if (points < 100) return { title: 'Green Beginner', badge: '🌱', nextAt: 100 };

  if (points < 300) return { title: 'Shatt al-Arab Friend', badge: '🌊', nextAt: 300 };

  if (points < 600) return { title: 'Basra Palm Guardian', badge: '🌴', nextAt: 600 };

  if (points < 1000) return { title: 'Green Basra Ambassador', badge: '🏅', nextAt: 1000 };

  return { title: "Al-Fayha's Environmental Champion", badge: '👑', nextAt: 5000 };

};

