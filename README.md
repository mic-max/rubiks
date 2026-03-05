# Rubix Cube

A webpage where you can set the state of a rubix cube and solve it.

## Usage
1. `npm install`
1. `npm run build`
1. `npm run dev`

## References
- https://jperm.net/3x3/moves
- https://onlinecube.com/
    - 2D unfolded and 2d isometric views.
    - Hover move button shows an image to help show what the button does. Little arrow.
- https://ruwix.com/online-puzzle-simulators/
    - Steal keyboard inputs and organizing the moves into Face, Slice, Whole categories. Lowercase make inverse rotations
    - Use it to trace out the animation frames.
- Every possible cube state can be solved in <= 20 moves.
    - *Including 180 degree turns

## Themes
- [Default](https://flatuicolors.com/palette/ca)

## Tips
- If you are solving a cube that someone sent you a link to and you want to try again, refresh the webpage.
    - There should be a reset button for this instead of making another full request though.

## To do

### Small
- When hovering a polygon that you can scroll or click on change the cursor to the 4 direction pointer.
- When hovering buttons like B and F change the cursor to an arrow that points in the direction of movement? or just add a little diagram of the actual move.

### Bugs

- Disable solve button while in paint mode.
- When refresh during solving... it loads with the solve button disabled.

### Paint Mode
- start each face as white? less painting required that way.
- propose a cube state once a certain amount of colours have been added?

### Coding

- `npm run build` does not require all devDependencies. Namely `serve`

### Preferences

- Save user preferences to localStorage
    - debug, wonky, dual, (not paint even though it looks similar), shuffle count

### Big Features

- Personal highscore tracking (use indexedDB to store?)
- 1v1 mode

### Shuffle

- Guarantee that a cube is shuffled enough? Do I need to try to solve it using the best algorithm and then count the number of steps it took, and make sure that number is greater than some threshold value like 12?


### Solve

- If a local solve is taking too long, cancel it and perform an internet solve.
- Add a solve button. When pressed it will calculate a way to solve it, perform the actions, and they will be listed in the move history.
    - Make an HTTP request for the solving backend? Some devices are not fast enough to run an entire solver in javascript, especially for difficult states.
    - Make a small backend for this project that runs in a performant language
    - Cache the solutions
    - Version the backend
    - Add a toggle for offline mode that will do the solving alroithm locally, only some algorithms should be supported.
        - Just make it a dropdown and show which ones run locally vs online.
        - Detect internet connectivity? navigator.onLine and window.addEventListener("online" / "offline"
    - Offline solver could have a progress bar?
    - https://www.grubiks.com/solvers/rubiks-cube-3x3x3/ is ~300ms to solve and sends a puzzleState = `415211502530503325403451034152143152003230321241524440`

### Offline

- Add a way to download the site and run it for offline use? Save the html page as to downloads? What about a release artifact hosted on the github repository.

### Timer
- User presses spacebar to start, or first move starts the stopwatch
- modes where you have limited time to look at the cube before the game time starts ticking away

### Move History

- move history
    - similarly to the chrome dev console, for multiple consecutive same moves add a (x2) pill
        - move codes wrap around from nothing to U to U2 to U' to nothing
    - add a copy button that copies to clipboard in a useful text or binary format?
    - buttons to advance and go back in the move queue
- input so you can paste moves and have them be executed on the cube.

### Miscellaneous

add a multi select for selecting the input mode.
hovering a face and press w,a,s,d to rotate.

## Testing

- Test that the move buttons all do the correct thing. The scrolling and clicking actions all match the cube but might have the prime and non-prime swapped.
- Add tests

when hovering the top face show what w,a,s,d do since it could be unclear.
to validate a cube, to shuffle a cube
preferences (shuffle cube delay in ms between each move)

- reveal X on hovered face
  - use vertices to construct it so it looks 3d

- query parameters to set debug mode, selected algorithm, etc.
    - share button to also send options and history to someone else?
    - because modifying the url after every action might not be a good thing to do

- button arrows along the perimeter of each cube on every face pointing out
    - include the keycode like R, R', U, U', etc.



- Add auto-detect system light mode/dark mode and remember the user preferences?

- Add i18n, other language support

- Add a button to show how shuffled the current cube is. aka how many steps to optimally solve it. Max is 20 iirc.

- Add a meta description, included in stuff like search results.

- Add 180 degree rotations, this will need some extra work on the animation side to play both back to back, maybe keep same delay so it takes twice as long to run the animation of a 90 degree turn, or speed it up so it is the same amount of time for each move possible.

- Add embed images media stuff, so if shared on discord or twitter it shows a better looking link?
    - To make a custom image I think we'd have to make a smarter server, maybe the copy link sends an HTTP request to load the cube state on the server and save image of that cube. which then gets pushed to some static file server?

- Improve the accessibility score for https://pagespeed.web.dev/analysis/https-rubix-micmax-pw/4ox7b0s1k9?form_factor=desktop

- simple way of manipulating the cube
  - how many moves are there in total:
    - up down right left front back: 6
    - prime for all those: 6
    - number 2 means turn that face twice: 6 (optional)
    - create a complete map of start faces to end faces after each move

- Drag UI
    - Essentiall is just 9 hitboxes and depending on if your cursor begins moving
    - up/down vs. left/right it will select the correct one

- Add keyboard shortcuts for toggles and buttons and a shortcuts help page
  - Press 1 to enable debug, 2 to enable wonky, etc.

- Show HEX colour picker on launch instead of RGB. Might have no native way to do so yet.
- Gradient themes

- Remake the favicon. Different sizes?

26 pieces
- 8 corners
- 12 edges
- 6 center pieces

edge parity
corner parity
swap parity

https://youtu.be/hMPn64NbLdk

make the toggle buttons look nicer for debug and wonky mode.
- it would be cool if wonky mode had an irregular shaped border made up of several line segments that roughly followed a rectangle. when disabled the wonky mode input button is rectangle, enabled it is wonky rectangle, similar to the vertices of the cube.

- localStorage interaction layer
- Cloudflare Pages: Server side analytics
    - Workers?
- Make a nice dev workflow, with `npm run dev` which hotreloads and runs my build.js script.

- Add a shuffle from solved button

- Make the shuffle moves button closer tied with the number input for how many moves to randomly execute.

- Serve from a local basic HTTP server so I can hotload the dist/index.html and enables me to use JavaScript workers.

- Is solves function should emulate the function that sets the starting cube state. Except that with the X, Y, Z rotations and middle moves allowed that actually makes the isSolved function harder. maybe we simulate a few of the X,Y,Z moves until the middle sticker matches the original starting middle squares?

- Do not generate all the possible solutions using a BFS search. Just hardcode the X,Y,Z rotations required instead.

- Add an application manifest "defines how your app appears on phone's home screens and what the app looks like on launch"
- Add mobile support

- Only run deployment when one of the actual deploy related files is modified (if I only modify the readme, do nothing)

## Testing

create a test script that keeps existing functions
- select a random point inside each of the horizontalPolygons and left and right click. they should both change the cube and doing both consecutively should bring the cube back to the original state. it should also increase the move count. it should add a move to the move history.
- select random point inside each of the verticalPolygons and scroll up and scroll down. cube should update.

- click a move button in bottom panel

- Verify the solver by pressing the shuffle button with different amounts of moves, and then the solve button, which should solve it.
    - Do this over and over and verify that the cube does look solved.

## Performance

- Test webpage load times
- Test how long solves take on average, build a chart

## Animations

I can create new SVGs with their own polygons for each frame I want to add. 
Opposite directions can be achieved by walking through the animation in reverse.
- Horizontal (3)
  - Top row twist
  - Middle row twist
  - Bottom row twist
- Vertical (6)
- X, Y, Z rotations (3)

If I add a middle frame, and a quarter frame, the 3/4 frame will be the same as the quarter frame so I get that for free since I can walk the list then reverse once the end is reached.

- So making 2 frames gets me a 5 frame animation including the start and end frames.
- 3 -> 7
- 4 -> 9
- 5 -> 11

Animation should take ~150ms to ~350ms?
Should the frames be evenly spaced out in terms of the amount of degrees the selected row rotates?

How many frames would be ideal for an animation that likely people will want to take 

For each frame of the animation and swap between those to create the frames...

It might be easier to make a 3D model and then perform the rotations and export the polygon points.

This change should also come with an animation toggle and duration slider and timing function, similar to how transitions work in CSS https://www.w3schools.com/css/css3_transitions.asp
