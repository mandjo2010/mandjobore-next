---
title: "Surveillance forestière par télédétection"
date: "2024-01-29"
excerpt: "Détecter la déforestation et surveiller la santé des forêts grâce aux données satellitaires"
category: "Agro"
tags: ["Forest", "Deforestation", "NDVI", "Environmental Monitoring"]
coverImage: "/images/test-cover.svg"
---

## Surveillance des forêts

La télédétection satellitaire est un outil essentiel pour surveiller les forêts mondiales et détecter rapidement la déforestation.

## Indicateurs de surveillance

- **NDVI** : Indice de végétation normalisé
- **NBR** : Ratio de brûlure normalisé
- **EVI** : Indice de végétation amélioré
- **LAI** : Indice de surface foliaire

## Détection de changements

```python
import ee
import matplotlib.pyplot as plt

# Authentification Google Earth Engine
ee.Initialize()

# Zone d'étude (Amazonie)
amazonia = ee.Geometry.Rectangle([-75, -20, -45, 5])

# Images avant/après
before = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA') \
  .filterBounds(amazonia) \
  .filterDate('2020-01-01', '2020-12-31') \
  .median()

after = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA') \
  .filterBounds(amazonia) \
  .filterDate('2023-01-01', '2023-12-31') \
  .median()

# Calcul NDVI
def ndvi(image):
  return image.normalizedDifference(['B5', 'B4'])

ndvi_before = ndvi(before)
ndvi_after = ndvi(after)

# Détection de la déforestation
deforestation = ndvi_before.subtract(ndvi_after).gt(0.3)
```

## Enjeux environnementaux

1. **Déforestation** : Perte de biodiversité
2. **Carbone** : Émissions de CO2
3. **Climat** : Régulation thermique
4. **Ressources** : Exploitation durable

Protégeons nos forêts avec la technologie ! 🌳
