---
title: "Analyse de données climatiques avec Python"
date: "2024-01-26"
excerpt: "Traitement et visualisation de données météorologiques pour l'étude du changement climatique"
category: "Data viz"
tags: ["Climate", "Meteorology", "Python", "Time Series"]
coverImage: "/images/test-cover.svg"
---

## Données climatiques et Python

L'analyse de données climatiques est cruciale pour comprendre le changement climatique. Python offre des outils puissants pour traiter ces séries temporelles complexes.

## Sources de données

- **ERA5** : Réanalyses météorologiques
- **MODIS** : Données satellitaires de température
- **Stations météo** : Données locales in-situ
- **CMIP6** : Modèles climatiques globaux

## Analyse avec Python

```python
import xarray as xr
import matplotlib.pyplot as plt
import pandas as pd

# Charger des données NetCDF
ds = xr.open_dataset('temperature_monthly.nc')

# Calculer la température moyenne globale
global_temp = ds['temperature'].mean(dim=['latitude', 'longitude'])

# Visualisation des tendances
plt.figure(figsize=(12, 6))
global_temp.plot()
plt.title('Évolution de la température moyenne globale')
plt.ylabel('Température (°C)')
plt.show()
```

## Indicateurs climatiques

1. **Températures** : Moyennes, extrêmes, tendances
2. **Précipitations** : Patterns saisonniers
3. **Indices** : El Niño, oscillations
4. **Extrêmes** : Vagues de chaleur, sécheresses

Les données parlent du climat ! 🌡️
