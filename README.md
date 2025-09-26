# Jeu Tetris - Projet TypeScript

Implémentation du jeu **Tetris**.
Ce projet a été développé dans le cadre du cours d'**Algorithmie Avancée** (2ᵉ année BAC+2)* proposé par [Akram BOUKHERS] et met en pratique plusieurs notions essentielles :  
- manipulation de **matrices 2D**  
- utilisation de **structures de données**  
- gestion d’événements et de la **boucle de jeu**  
- réflexion sur la **complexité algorithmique**


## Objectifs pédagogiques :
- Appliquer les concepts d’algorithmie à un cas concret.  
- Implémenter un jeu classique (Tetris) depuis zéro.  
- Travailler la logique des collisions, rotations et suppression de lignes.  
- Produire un code clair, structuré et versionné sur GitHub.  

---


## Structure du projet

- **styles.css**  
  Styles simples pour centrer le canvas, afficher les infos (score, niveau) et rendre la page agréable.

- **src/main.ts**  
  Point d’entrée TypeScript qui : initialise les composants (grid, renderer, générateur de pièces), attache les écouteurs clavier (touches de déplacement, rotation, pause), démarre / réinitialise la partie.

- **src/game.ts**  
  Contient la **boucle de jeu** (requestAnimationFrame ou setInterval), la logique de gravité (vitesse de chute), la gestion des états (`running`, `paused`, `gameover`) et le traitement des collisions/pose de pièces.

- **src/grid.ts**  
  Représente la **grille** en tant que matrice 2D (rows × cols). Fonctions typiques :
  - initialiser la grille,
  - vérifier si une position est valide (`isValidPosition`),
  - verrouiller une pièce dans la grille (`lockPiece`),
  - détecter et supprimer les lignes complètes (`clearLines`) et renvoyer le nombre de lignes effacées.

- **src/tetromino.ts**  
  Définition des tetriminos (I, O, T, S, Z, J, L), leurs rotations, et une fonction pour générer la prochaine pièce (random bag ou tirage simple). Contient aussi les matrices représentant chaque rotation.

- **src/render.ts**  
  S’occupe du rendu graphique sur le canvas : dessiner la grille, la pièce courante, la pièce suivante (next), et afficher le score / niveau / état pause/gameover.

---

## Détails techniques

- **Grille** : implémentée comme une matrice 2D (20 lignes × 10 colonnes).  
- **Pièces (tetriminos)** : représentées par des matrices et stockées dans `tetromino.ts`.  
- **Rotations** : gérées par transformation de matrice (rotation horaire/anti-horaire).  
- **Collisions** : vérifiées en projetant la pièce sur la grille avant validation du mouvement.  
- **Suppression de lignes** : une ligne remplie est supprimée et toutes les lignes supérieures descendent.  
- **Boucle de jeu** : basée sur `requestAnimationFrame` (ou timer), ajuste la vitesse en fonction du niveau.  
- **Rendu** : effectué sur un `<canvas>` via `render.ts`. Chaque bloc est dessiné avec une couleur spécifique.

---

## Règles de base

- Les pièces tombent automatiquement depuis le haut de la grille.  
- Si une pièce ne peut plus descendre, elle est fixée dans la grille.  
- Lorsqu’une ligne est complètement remplie, elle disparaît et les lignes supérieures descendent.  
- Le joueur marque des points en fonction du nombre de lignes supprimées.  
- La partie se termine quand une nouvelle pièce ne peut plus apparaître (pile qui atteint le haut).  

---

## Comment jouer

Touches :
- ← / → : déplacer la pièce à gauche/droite  
- ↑ : rotation de la pièce  
- ↓ : soft drop (descente accélérée)  
- Space : hard drop (poser directement)  
- P : pause / reprendre

---

## Installation & lancement

1. Cloner le dépôt
```bash
git clone https://github.com/lopikook/maria-allaf-Tetris-project.git
cd maria-allaf-Tetris-project
npm install
npm run game
```

---

## Licence
Ce projet est sous licence **MIT**.  
Vous êtes libres d’utiliser, modifier et distribuer ce projet tant que vous incluez la licence d’origine.  
*(Changer en Apache-2.0 ou autre si besoin.)*
