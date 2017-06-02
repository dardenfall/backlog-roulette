# backlog-roulette

BacklogRoulette is a random game launcher for Steam.  Using the data on your public steam page at steamcommunity.com, it picks
a random game from your backlog that you've never played (see options to allow it to pick any game).

## usage
After clicking the purple and black extension button in chrome, the broswer will redirect your current page to your steam 
profile url specified in the options (this must be set for the extension to work).  You will then see a prompt asking whether
you'd like to launch the randomly picked game. 

If the game is not currently installed on your machine, this will result in an install prompt for the game.  You'll then need
to start it via the steam download complete poppup.  If the game is already installed, it should just start.

## install
Download the br.crx file.  Open chrome extensions page: settings -> more tools -> extensions. Drag the br.crx file onto the 
page. Click to allow the install.

## known issues:
If you have games in your backlog that do not work on the current platform, the install will fail
