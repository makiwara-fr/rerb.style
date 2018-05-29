if (makiwara === undefined){
	var makiwara = {};
}
if (makiwara.rerbstyle === undefined) {
	makiwara.rerbstyle = {};
}


makiwara.rerbstyle.animation = {

	/* ==========================
	
			Data model
	
	 ============================*/
	
	player : null,
	urls : [],
	ctx: null,
	playing: false,
	current_node: null,
	route: ["Aéroport Charles de Gaulle 2 TGV", "Aéroport Charles de Gaulle 1", "Parc des expositions", "Villepinte", "Sevran Beaudottes"],
	
	/* ==========================
	
			initialization
	
	 ============================*/
	
	
	init : function () {
		this.player = document.getElementById("player");
		this.ctx = document.getElementById("line").getContext("2d");
	},
	
	
	run : function (args) {
		console.log("Looping thread");
		if (args !== undefined){
			this.current_node = args.current_node;
			console.log("Run started with arguments : " + args.current_node.id);
			this.current_node = args.current_node;
		}
		
		/* change the color of the starting position */
		this.current_node.shape.fillStyle = makiwara.rerbstyle.drawing.color_selected_stations;
		this.ctx.fill(this.current_node.shape);
		/* play sound until next station */
		
		
		/* change back color of the former stations */
		
		/* move to next station */
		console.log("Next stations " + this.next_stations());
		// this.playing = false;
		;
		
		
	},
	
	/* managing the animation */
	
	next_stations : function () {
		if (this.current_node !== undefined){
			var i, l;
			l = this.route.length;
			for (i=0; i < l - 1; i++){
				if (this.current_node.id == this.route[i]){
					return this.route[i+1];
					break;
				}
			}
			return "not found";
			
		}
	}


}

makiwara.rerbstyle.animation.init();
console.log("Init done for player");