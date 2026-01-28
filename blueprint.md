# Power Spike Volleyball

## Overview

This project is a web-based recreation of the classic volleyball game "Power Spike." It aims to capture the fast-paced, exciting gameplay of the original while using modern web technologies for a smooth and responsive experience. The game will be built with HTML, CSS, and JavaScript, without any external frameworks.

## Design and Features

### Visuals

*   **Theme:** A modern-retro aesthetic, combining the pixel art feel of the original with clean, polished graphics.
*   **Layout:** A side-on view of the volleyball court, with the player's team on the left and the opponent on the right.
*   **Background:** A dynamic stadium background with a cheering crowd to create an immersive atmosphere.
*   **Scoreboard:** A prominent, digital-style scoreboard at the top of the screen will display:
    *   Team names (KOR vs. GER)
    *   Current scores
    *   A game timer
*   **Colors:** A vibrant color palette has been used to make the game visually engaging.
*   **Typography:** A mix of a retro gaming font (Orbitron) for the scoreboard and a clean, readable font for other UI elements.
*   **Interactivity:** Smooth animations for player movements, ball physics, and scoring.

### Gameplay Mechanics

*   **Objective:** Score points by making the ball land on the opponent's side of the court.
*   **Controls:** Simple keyboard controls for player movement (left/right), jumping (up arrow), and serving (spacebar).
*   **Ball Physics:** The ball has realistic physics, including gravity, bouncing, and being hit by players.
*   **Game Flow:**
    1.  The game starts with a serve.
    2.  Players on each team will try to return the ball.
    3.  A point is awarded when the ball hits the ground.
    4.  The game ends when a team reaches a certain score or the timer runs out.
*   **Opponent AI:** An enhanced AI controls the opponent, allowing it to move, jump, and spike the ball.

### Technical Implementation

*   **Structure:**
    *   `index.html`: Main entry point containing the game's structure.
    *   `style.css`: Styles for all visual elements, using modern CSS features like variables and flexbox for layout.
    *   `main.js`: Core game logic, including the game loop, physics, and player controls.
*   **Web Components:** The scoreboard is implemented as a `<score-board>` custom element for encapsulation and reusability.
*   **ES Modules:** JavaScript code is organized into modules for better maintainability.

## Current Plan

1.  **[Done]** Create the `blueprint.md` file to establish the project vision.
2.  **[Done]** Set up the basic HTML structure in `index.html`.
3.  **[Done]** Design the initial CSS in `style.css` for the court, background, and scoreboard.
4.  **[Done]** Implement the `<score-board>` Web Component in `main.js`.
5.  **[Done]** Create a basic game loop in `main.js` to animate the ball.
6.  **[Done]** Add players to the court.
7.  **[Done]** Implement keyboard controls for player movement.
8.  **[Done]** Implement ball and player collision.
9.  **[Done]** Implement serving and scoring logic.
10. **[Done]** Implement player jumping and spiking.
11. **[Done]** Enhance opponent AI.
12. **[Next]** Deploy the game to Firebase Hosting.
