/** Display translations for legacy stored values. Database values remain unchanged. */
const labels: Record<string, string> = {
  'Période indéterminée': 'Onbepaalde duur', 'Durée déterminée': 'Bepaalde duur',
  'Non meublé': 'Ongemeubileerd', 'Semi-meublé': 'Gedeeltelijk gemeubileerd', 'Meublé': 'Gemeubileerd',
  'Bon état': 'Goede staat', 'Très bon état': 'Zeer goede staat', 'Excellent': 'Uitstekend',
  'À rafraîchir': 'Op te frissen', 'À rénover': 'Te renoveren', 'Neuf': 'Nieuw',
  'Construction existante': 'Bestaande bouw', 'Nouvelle construction': 'Nieuwbouw',
  'The Hague': 'Den Haag', 'Maison': 'Woning', 'Chambre': 'Kamer',
  'Internet / Wi-Fi': 'Internet / wifi', 'Ascenseur': 'Lift', 'Balcon': 'Balkon', 'Terrasse': 'Terras',
  'Parking': 'Parkeerplaats', 'Jardin': 'Tuin', 'Cave': 'Berging', 'Local vélo': 'Fietsenberging',
  'Chauffage': 'Verwarming', 'Cuisine équipée': 'Ingerichte keuken', 'Lave-linge': 'Wasmachine',
  'Bâtiment existant': 'Bestaande bouw',
  CDI: 'Vast contract', CDD: 'Tijdelijk contract', 'Indépendant': 'Zelfstandig',
  'Intérim': 'Tijdelijk contract', 'Étudiant': 'Student', Autre: 'Anders',
  'Débarras': 'Berging', 'maison': 'woning', 'chambre': 'kamer',
  'Lave-vaisselle': 'Vaatwasser', 'Climatisation': 'Airconditioning', 'Interphone': 'Intercom',
};
export function dutchDisplay(value: string): string { return Object.prototype.hasOwnProperty.call(labels, value) ? labels[value] : value; }
