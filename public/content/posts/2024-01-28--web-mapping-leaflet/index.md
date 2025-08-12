---
title: "Cartographie web interactive avec Leaflet"
date: "2024-01-28"
excerpt: "Créer des cartes web interactives et responsives avec la bibliothèque JavaScript Leaflet"
category: "Data viz"
tags: ["Leaflet", "Web Mapping", "JavaScript", "Interactive Maps"]
coverImage: "/images/test-cover.svg"
---

## Cartographie web avec Leaflet

Leaflet est la bibliothèque JavaScript de référence pour créer des cartes web interactives, légères et personnalisables.

## Fonctionnalités principales

- **Léger** : Seulement 38KB de JS
- **Mobile-first** : Optimisé pour le tactile
- **Plugins** : Écosystème riche
- **Standards** : Support des formats OGC

## Code d'exemple

```javascript
// Initialisation de la carte
var map = L.map('map').setView([48.8566, 2.3522], 10);

// Ajout du fond de carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Ajout de données GeoJSON
fetch('data/quartiers.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: { color: '#ff7800', weight: 2 },
      onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.nom);
      }
    }).addTo(map);
  });
```

## Cas d'usage

1. **Dashboard** : Tableaux de bord géographiques
2. **Story maps** : Récits cartographiques
3. **Analyse** : Visualisation de données spatiales
4. **Mobile** : Applications géolocalisées

Leaflet rend la cartographie accessible ! 🗺️
