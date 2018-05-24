var makiwara_rer_style = {
	
	
	
	
	
	/* general settings */
	canvas_size : {x: 1200, y: 400},
	line_thickness : 15,
	general_size : 300,
	
	
	/* Drawing the line */
	line_nodes: {},
	stations_nw : ["Aéroport Charles de Gaulle 2 TGV", "Aéroport Charles de Gaulle 1", "Parc des expositions", "Villepinte", "Sevran Beaudottes"],
	stations_north_to_south_main_branch : ["Aulnay sous bois", "Le blanc Mesnil", "Drancy", "Le Bourget", "La Courneuve Aubervilliers", "La Plaine Stade de France", "Gare du Nord", "Chatelet-Les halles", "St Michel Notre Dame", "Luxembourg", "Port Royal", "Denfert-Rochereau", "Cité Universitaire"],
	stations_dots: [],

	
	/* define size of canvas and set general parameters dynamically */
	set_canvas: function(){
		var canvas = document.getElementById("line");
		
		if  (window.innerWidth - 40 > this.canvas_size.x){
			this.canvas_size.x = window.innerWidth - 40;
			console.log("Window is " + window.innerWidth + " wide. Setting canvas to : " + this.canvas_size.x);
			
		}
		//define the canvas actual size
		canvas.width = this.canvas_size.x;
		canvas.height = this.canvas_size.y;
		//define main proportion
		this.general_size = (this.canvas_size.x - 100 )/ 2.3;
		
		
		/* define the position of main nodes of the line */
		this.line_nodes ={
			n_north : {x: 50 + (this.general_size * 0.4),y: 250},
			n_south : {x: 50 + (this.general_size * 1.4) ,y: 250},
			n_sw: {x:50 + (this.general_size * 1.5), y: 350},
			n_se: {x: 50 + (this.general_size * 1.5), y: 150},
			n_ne: {x: 50 + (this.general_size * 0.3) , y: 150},
			n_nw: {x: 50 + (this.general_size * 0.3), y: 350},
			n_fnw: {x: 50, y: 350},
			n_fne: {x: 50 + (this.general_size * 0.1), y: 150},
			n_fsw: {x: 50 + (this.general_size * 2.3), y: 350},
			n_fse: {x: (this.canvas_size - 50), y: 150}
		}
	},
		



	
	
	draw_line: function(){
		var canvas = document.getElementById("line");
		var ctx = canvas.getContext("2d");
		if (ctx){
			
			
			var line = new Path2D()
			
			line.lineWidth = this.line_thickness;
			
			line.moveTo(this.line_nodes.n_fnw.x, this.line_nodes.n_fnw.y);
			line.lineTo(this.line_nodes.n_nw.x, this.line_nodes.n_nw.y);	
			line.lineTo(this.line_nodes.n_north.x, this.line_nodes.n_north.y);
			line.lineTo(this.line_nodes.n_south.x, this.line_nodes.n_south.y);
			line.lineTo(this.line_nodes.n_sw.x, this.line_nodes.n_sw.y);
			line.lineTo(this.line_nodes.n_fsw.x, this.line_nodes.n_fsw.y);
			line.moveTo(this.line_nodes.n_south.x, this.line_nodes.n_south.y);
			line.lineTo(this.line_nodes.n_se.x , this.line_nodes.n_se.y);
			line.lineTo(this.line_nodes.n_fse.x, this.line_nodes.n_fse.y);
			line.moveTo(this.line_nodes.n_north.x, this.line_nodes.n_north.y);
			line.lineTo(this.line_nodes.n_ne.x, this.line_nodes.n_ne.y);
			line.lineTo(this.line_nodes.n_fne.x, this.line_nodes.n_fne.y);
			
			ctx.lineWidth = 2 * this.line_thickness;
			ctx.strokeStyle = 'blue';
			ctx.lineCap = "round";
			ctx.lineJoin = "miter";
			ctx.stroke(line);
			
			
		}
	},
	
	
	add_stations_on_branch: function(stations_lists, point_orig, point_destination, top_or_down){
		var canvas = document.getElementById("line");
		var ctx = canvas.getContext("2d");
		
		var x,y, i;

		for (i=0; i < stations_lists.length; i++){
			
			//draw a circle per station
			var circle = new Path2D();
			ctx.fillStyle = 'white';
			ctx.rotate(0);
			x = (point_destination.x - point_orig.x ) / (stations_lists.length-1) * i + point_orig.x;
			y = (point_destination.y - point_orig.y ) / (stations_lists.length-1) * i + point_orig.y;
			
			circle.moveTo(x, y);
			circle.arc(x, y , this.line_thickness, 0, 2*Math.PI, true);
			ctx.fill(circle);
			//add to general list of dots
			this.stations_dots.push({id: stations_lists[i], shape: circle});
			
			//add the name of stations
			ctx.save();
			var text = new Path2D();
			
			ctx.fillStyle = "black";
			ctx.rotate(-Math.PI / 4);
			ctx.textAlign = 'right';
			if (top_or_down){
				ctx.translate(x,y + 2*this.line_thickness);
				// ctx.fillText(stations_lists[i], x , y + 2*this.line_thickness);
				ctx.fillText(stations_lists[i], 0 , 0);
				
			}
			else{
				ctx.fillText(stations_lists[i], x , y - 2*this.line_thickness);
			}
			ctx.restore();
		}
		//add a listener to detect clicks
		canvas.addEventListener('click', function (e)
        {
            var x = e.offsetX;
            var y = e.offsetY;
			var i;
			for (i=0; i< makiwara_rer_style.stations_dots.length; i++){
				if (ctx.isPointInPath(makiwara_rer_style.stations_dots[i].shape, x, y)) {
					console.log('Clicked! on '+ makiwara_rer_style.stations_dots[i].id );
					break;
				}
			}
        }, false);
	},
	
	add_stations: function(){
		this.add_stations_on_branch(this.stations_nw, this.line_nodes.n_fnw, this.line_nodes.n_nw, true);
		this.add_stations_on_branch(this.stations_north_to_south_main_branch, this.line_nodes.n_north, this.line_nodes.n_south, true);
	}
}

/*set canvas general format*/
makiwara_rer_style.set_canvas();
/* Draw the shape of the line */
makiwara_rer_style.draw_line();
/* add stations on the line */
makiwara_rer_style.add_stations();

