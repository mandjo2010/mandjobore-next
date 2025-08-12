---
title: "PostGIS : Base de données spatiales avec PostgreSQL"
date: "2024-01-24"
excerpt: "Guide pour stocker, interroger et analyser des données géospatiales avec PostGIS"
category: "Spatial Data"
tags: ["PostGIS", "PostgreSQL", "SQL", "Database"]
coverImage: "/images/test-cover.svg"
---

## Introduction à PostGIS

PostGIS étend PostgreSQL avec des capacités géospatiales complètes, permettant de stocker et manipuler des données géographiques complexes.

## Fonctionnalités spatiales

- **Géométries** : Points, lignes, polygones
- **Indexation** : Index spatiaux R-tree
- **Opérations** : Intersections, buffers, unions
- **Projections** : Support EPSG complet

## Requêtes spatiales

```sql
-- Trouver toutes les villes dans un rayon de 50km
SELECT nom_ville, population
FROM villes v
WHERE ST_DWithin(
    v.geom, 
    ST_GeomFromText('POINT(2.3522 48.8566)', 4326),
    50000
);

-- Calculer la superficie des départements
SELECT nom_dept, 
       ST_Area(ST_Transform(geom, 2154))/1000000 as superficie_km2
FROM departements;
```

## Avantages de PostGIS

1. **Performance** : Requêtes spatiales optimisées
2. **Standards** : Conforme OGC
3. **Intégration** : Compatible avec tous les SIG
4. **Scalabilité** : Gestion de gros volumes

PostGIS, la référence des bases spatiales ! 🗺️
