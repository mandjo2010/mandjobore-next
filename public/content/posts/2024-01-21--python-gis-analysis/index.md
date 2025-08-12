---
title: "Analyse SIG avec Python et GeoPandas"
date: "2024-01-21"
excerpt: "Tutorial complet pour manipuler et analyser des données géospatiales avec Python"
category: "Spatial Data"
tags: ["Python", "GeoPandas", "QGIS", "PostGIS"]
coverImage: "/images/test-cover.svg"
---

## Introduction au SIG avec Python

Python s'impose comme l'outil de référence pour l'analyse géospatiale. GeoPandas combine la puissance de Pandas avec les capacités géographiques.

## Bibliothèques essentielles

- **GeoPandas** : DataFrames géographiques
- **Shapely** : Géométries et opérations spatiales
- **Fiona** : Lecture/écriture de fichiers vectoriels
- **Rasterio** : Traitement d'images raster

## Code exemple Python

```python
import geopandas as gpd
import matplotlib.pyplot as plt

# Charger un fichier shapefile
gdf = gpd.read_file('data/communes.shp')

# Calculer la superficie
gdf['area_km2'] = gdf.geometry.area / 1e6

# Visualisation
gdf.plot(column='area_km2', cmap='viridis', legend=True)
plt.title('Superficie des communes')
plt.show()
```

## Applications pratiques

1. **Urbanisme** : Planification territoriale
2. **Environnement** : Analyse d'impact
3. **Transport** : Optimisation de routes
4. **Agriculture** : Gestion parcellaire

Python révolutionne l'analyse géospatiale ! 🐍
