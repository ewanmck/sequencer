 # 8-Track Sequencer

An audio sequncer designed to be used as a standalone app or with a Novation Launchpad Mini MIDI controller

## Setup

1. Start up the comp426-backend using the instructions in the 'README.md' file. Server should be running on port 3000 for the project to run properly.
2. Open the sequencer-frontend directory in a terminal and run 'npm install' 3. To start-up the site, run 'npx browser-sync start -sw' in the same directory

## Website Structure

2Site will load up in the sequencer view. (If the sequencer view seems to be non-functional, navigate to the dashboard and then to login. Setting up a user profile will fix this issue.) The dashboard button in the top-right side of the   2screen will show you tracks from other users, which can be clicked to load up. Sequnces can be saved at any time from the sequence view.

## Creating Sequnces

2Sounds can be loaded up from the library. Choosing a library will show samples from that library. After one of these are selected, a track can be selected as well, then pressing the "Send to Track!" button will assign it to one of the   2eight tracks. From there, select any amount of the 16 steps for the audio sample to play on. Pressing play will start the sequence, and it can be stopped in the same way. Below the sequencer is a panel of volume controls, each of which  2controlling a seperate 
2track. At any point in time, sounds can be hot-swapped while still keeping the same sequence, including during playback.

A demo of the website can be viewed at this link: https://youtu.be/RkmytFwVhJ0
