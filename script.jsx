
function Generate(obj) {
	
	////
	//// SET YOUR VARIABLES HERE
	////
	
	var COMP_WIDTH = 1280			// width of main composition
	var COMP_HEIGHT = 720			// height of main composition
	var COMP_PIXEL_ASPECT = 1 		// pixel aspect ratio
	var COMP_FPS = 25				// frames per second
	var COMP_LENGTH = 0				// length of main composition on seconds (calculated later) <-- max is 10800 (equals 3 hours)
	var SCALE_VIDS_HEIGHT = false 	// set to true if footage videos' height should be scaled to composition's height
	
	////
	////
	////

	
	// setup new project
	app.activate()
	app.beginUndoGroup('script')
	app.newProject()
	var project = app.project
	
	var footageFolder = project.items.addFolder("footage")
	var footageArray = new Array()				// array for storing the video files
	var footageIndexBreakpoints = new Array() 	// array for storing the "breakpoints" of footageArray's indexes. if a composition exceeds 10800 seconds, make a new one
	var compsArray = new Array()


	// Select folder - dialog
	var inputFolder = Folder.selectDialog("Select your video footage folder")
	var fileList = inputFolder.getFiles()
	
	// import video files and calculate COMP_LENGTH
	for (var i=0; i<fileList.length; i++) {
		var footageFile = fileList[i]
		if (footageFile instanceof File && !footageFile.hidden) {
			var vImport = new ImportOptions()
			vImport.file = footageFile
			vImport.type = ImportAsType.FOOTAGE

			try {
				var videoClip = project.importFile(vImport)
				videoClip.parentFolder = footageFolder

				var breakpoint = footageArray.length -1

				if ((COMP_LENGTH + videoClip.duration) > 10800) {

					footageIndexBreakpoints.push(breakpoint)

					var name = "comp-" + footageIndexBreakpoints.length
					var comp = project.items.addComp(name, COMP_WIDTH, COMP_HEIGHT, COMP_PIXEL_ASPECT, COMP_LENGTH, COMP_FPS)
					compsArray.push(comp)
					COMP_LENGTH = videoClip.duration
				} else {
					COMP_LENGTH += videoClip.duration

					if (i == (fileList.length -1)) {
						var name = "comp-" + (footageIndexBreakpoints.length +1)
						var comp = project.items.addComp(name, COMP_WIDTH, COMP_HEIGHT, COMP_PIXEL_ASPECT, COMP_LENGTH, COMP_FPS)
						compsArray.push(comp)
						footageIndexBreakpoints.push(breakpoint +1)
					}
				}

				footageArray.push(videoClip)
			} catch(error) {
				alert(error)
			}
		}
	}

	
	// iterate over composition array and place footage videos
	var it = 0
	for (var i=0; i<compsArray.length; i++) {
		var usedTime = 0
		var comp = compsArray[i]
		var breakpoint = footageIndexBreakpoints[i]
		
		while (it <= breakpoint) {
			var videoClip = footageArray[it]
			var vLayer = comp.layers.add(videoClip)
			vLayer.startTime = usedTime
			usedTime += videoClip.duration

			if (SCALE_VIDS_HEIGHT) {
				var scale = vLayer.scale
				var scaleVal = (COMP_HEIGHT / vLayer.height) * 100
				scale.setValue([scaleVal, scaleVal])
			}
			
			it++
		}
	}
	
}

Generate(this)