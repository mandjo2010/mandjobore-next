---
title: "Photogrammétrie par drone et traitement d'images"
date: "2024-01-27"
excerpt: "Créer des modèles 3D et des orthophotos haute résolution à partir d'images de drone"
category: "Satellite"
tags: ["Drone", "Photogrammetry", "3D Modeling", "UAV"]
coverImage: "/images/test-cover.svg"
---

## Photogrammétrie par drone

La photogrammétrie par drone démocratise la création de modèles 3D précis et d'orthophotos haute résolution pour de nombreuses applications.

## Workflow photogrammétrique

- **Planification** : Mission de vol automatisée
- **Acquisition** : Prises de vues avec recouvrement
- **Traitement** : Reconstruction 3D
- **Produits** : Orthophotos, MNT, nuages de points

## Outils et logiciels

```bash
# Traitement avec OpenDroneMap
docker run -it --rm \
  -v /data:/datasets/data \
  opendronemap/odm \
  --project-path /datasets/data/project

# Génération d'orthophoto
odm_orthophoto --input-dir images/ \
               --output-dir output/ \
               --resolution 2.0
```

## Applications terrain

1. **Agriculture** : Monitoring des cultures
2. **Construction** : Suivi de chantier
3. **Archéologie** : Documentation de sites
4. **Environnement** : Cartographie écologique

Les drones redéfinissent la cartographie ! 🚁
