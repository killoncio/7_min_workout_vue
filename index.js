var app = new Vue({
	el: "#app",
	data:{
		exercises: [
			"Jumping jacks",
			"Wall sit",
			"Push-up",
			"Abdominal crunch",
			"Step-up chair",
			"Squat",
			"Triceps on chair",
			"Plank",
			"High knees",
			"Lunge",
			"Push up and rotate",
			"Side plank"
		],
		timer: 00,
		isPause: false,
		scrollAmount: 0,
		sound: new Audio("sirena.mp3"),
		exercisesDone: 0,
		interval: null
	},
	methods:{
		exerciseImage: function(exercise) {
			return "img/" + exercise.toLowerCase().replace(/ /g,"_") + ".jpg";
		},
		count: function() {
			if ( this.isPause && this.timer === 09 ) {
				this.isPause = false;
				this.timer = 00
				this.sound.play();
			} else if ( this.timer === 30 ) {
				this.isPause = true
				this.timer = 00
				this.sound.play();
				this.exercisesDone++;
			} else {
				this.timer++;
			}

			if (this.exercisesDone === 11) {
				this.end();
			}

			if ( !this.isPause ) {
				this.scroll();
			}
		},
		end: function() {
			this.$el.children.happy_end.style.display = "block";
			this.$el.children.starter.style.display = "none";
			this.$el.children.exercises.style.display = "none";

			clearInterval(this.interval);
		},
		scroll: function() {
			window.scrollBy({
				top: this.scrollAmount,
				left: 0,
				behaviour: 'smooth'
			});
		},
		setScrollAmount: function() {
			var height = this.$el.children.exercises.children[0].offsetHeight + 10;
			console.log(height)
			this.scrollAmount = height/29
		},
		start: function() {
			this.$el.children.starter.style.display = "none";
			this.setScrollAmount();			
			this.interval = setInterval(this.count, 1000);
		}
	}
})