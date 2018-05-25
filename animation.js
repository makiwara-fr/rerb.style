var makiwara_rer_style_animation = {

	/* ==========================
	
			Data model
	
	 ============================*/
	
	player : null,
	urls : [],
	ctx: null,
	playing: false,
	
	/* ==========================
	
			initialization
	
	 ============================*/
	
	
	init : function () {
		this.player = document.getElementById("player");
		this.ctx = document.getElementById("line").getContext("2d");
	},
	
	play: function (current_path) {
		this.playing = !this.playing;
		
		/* change the color of the starting position */
		current_path.fillStyle = makiwara_rer_style.color_selected_stations;
		this.ctx.fill(current_path);
		/* play sound until next station */
		while (this.playing) {
			var milliseconds = 3000;
			var start = new Date().getTime();
			  for (var i = 0; i < 1e7; i++) {
				if ((new Date().getTime() - start) > milliseconds){
				  break;
				}
			  }
			  console.log("End of loop");
			  
		}
		
		/* change back color of the former stations */
		
		/* move to next station */
		console.log("Next stations");
		// this.playing = false;
		console.log(this.playing);
	}
	

}

makiwara_rer_style_animation.init();
console.log("Init done for player");