# After Effects Assembly Script

Have you ever wanted to stitch together hundreds of videos in After Effects?
This small script let's you choose your footage folder and assembles all files in a composition (or multiple, if your overall footage length exceeds 3 hours).

Put in your variables:

```javascript
var COMP_WIDTH = 1280			// width of main composition
var COMP_HEIGHT = 720			// height of main composition
var COMP_PIXEL_ASPECT = 1 		// pixel aspect ratio
var COMP_FPS = 25				// frames per second
var COMP_LENGTH = 0				// length of main composition on seconds (calculated later) <-- max is 10800 (equals 3 hours)
var SCALE_VIDS_HEIGHT = false 	// set to true if footage videos' height should be scaled to composition's height
```

And do something nice, because life's too short for manual video editing ;)

![AE Screenshot](https://raw.github.com/johnnycrab/AE-Assembly-Script/master/screenshot.png "After Effects Screenshot")