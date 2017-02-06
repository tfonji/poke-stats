/**
 * 
 */

window.onload = function(){
	
}
var global = {};
global.weights = [];
global.pokeNames = [];
global.count = 0;
global.pokeData = [];

$(document).ready(function(){
	$("#submitButton").click(function() {
		var input = $("#userInput").val().split(",", 6);
		var ctx = document.getElementById("myChart");
		var weights = [];
		console.log(input);
		
		$.each(input, function(index, value){
			$.ajax({
		    	method: "GET",
		    	url : "https://pokeapi.co/api/v2/pokemon/" + value + "/",
		    	success : function(data){
		    	global.count++;
		    	console.log(global.count);
		    	global.pokeData[index] = data;
		    	global.pokeNames[index] = data.name;
		    	global.weights[index] = data.weight;
		    	if(global.count === input.length){
		    		$("#plotGraph").removeClass("hidden");
		    	}
		    	//$("#pokemonName").html(data.weight);
		    	}
		    })
				
		})
		global.count = 0;
	});
	
	$("#plotGraph").click(function() {
		console.log(global.pokeData);
		
		/*Stats*/
		//stats - line chart
		var ctxLineChart = document.getElementById("lineChart");
		
		var lineData = {
			    labels: [global.pokeData[0].name, global.pokeData[1].name,
		    	         global.pokeData[2].name, global.pokeData[3].name,
		    	         global.pokeData[4].name, global.pokeData[5].name],
			    datasets: [
			        {
			            label: "Moves",
			            fill: false,
			            lineTension: 0.1,
			            backgroundColor: "rgba(75,192,192,0.4)",
			            borderColor: "rgba(75,192,192,1)",
			            borderCapStyle: 'butt',
			            borderDash: [],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "rgba(75,192,192,1)",
			            pointBackgroundColor: "#fff",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "rgba(75,192,192,1)",
			            pointHoverBorderColor: "rgba(220,220,220,1)",
			            pointHoverBorderWidth: 2,
			            pointRadius: 1,
			            pointHitRadius: 10,
			            data: [global.pokeData[0].moves.length, global.pokeData[1].moves.length,
			            	   global.pokeData[2].moves.length, global.pokeData[3].moves.length,
			            	   global.pokeData[4].moves.length, global.pokeData[5].moves.length],
			            spanGaps: false,
			        },
			        {
			            label: "Base Experience",
			            fill: false,
			            lineTension: 0.1,
			            backgroundColor: "rgba(156,39,176 ,0.4)",
			            borderColor: "rgba(156,39,176 ,1)",
			            borderCapStyle: 'butt',
			            borderDash: [],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "rgba(156,39,176 ,1)",
			            pointBackgroundColor: "#fff",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "rgba(156,39,176 ,1)",
			            pointHoverBorderColor: "rgba(156,39,176 ,1)",
			            pointHoverBorderWidth: 2,
			            pointRadius: 1,
			            pointHitRadius: 10,
			            data: [global.pokeData[0].base_experience, global.pokeData[1].base_experience,
			            	   global.pokeData[2].base_experience, global.pokeData[3].base_experience,
			            	   global.pokeData[4].base_experience, global.pokeData[5].base_experience],
			            spanGaps: false,
			        },
			        {
			            label: "Game Indices",
			            fill: false,
			            lineTension: 0.1,
			            backgroundColor: "rgba(194,24,91 ,0.4)",
			            borderColor: "rgba(194,24,91 ,1)",
			            borderCapStyle: 'butt',
			            borderDash: [],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "rgba(194,24,91 ,1)",
			            pointBackgroundColor: "#fff",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "rgba(194,24,91 ,1)",
			            pointHoverBorderColor: "rgba(194,24,91 ,1)",
			            pointHoverBorderWidth: 2,
			            pointRadius: 1,
			            pointHitRadius: 10,
			            data: [global.pokeData[0].game_indices.length, global.pokeData[1].game_indices.length,
			            	   global.pokeData[2].game_indices.length, global.pokeData[3].game_indices.length,
			            	   global.pokeData[4].game_indices.length, global.pokeData[5].game_indices.length],
			            spanGaps: false,
			        }
			    ]
			};
		var myLineChart = new Chart(ctxLineChart, {
		    type: 'line',
		    data: lineData
		});
		
		
		
		/* Health Charts*/
		//Body Mass Index - Doughnut
		var bmiOne = Math.floor((global.pokeData[0].weight * 0.45)/(global.pokeData[0].height * 12 * 12 * global.pokeData[0].height * 0.025 * 0.025));
		var bmiTwo = Math.floor((global.pokeData[1].weight * 0.45)/(global.pokeData[1].height * 12 * 12 * global.pokeData[1].height * 0.025 * 0.025));
		var bmiThree = Math.floor((global.pokeData[2].weight * 0.45)/(global.pokeData[2].height * 12 * 12 * global.pokeData[2].height * 0.025 * 0.025));
		var bmiFour = Math.floor((global.pokeData[3].weight * 0.45)/(global.pokeData[3].height * 12 * 12 * global.pokeData[3].height * 0.025 * 0.025));
		var bmiFive = Math.floor((global.pokeData[4].weight * 0.45)/(global.pokeData[4].height * 12 * 12 * global.pokeData[4].height * 0.025 * 0.025));
		var bmiSix = Math.floor((global.pokeData[5].weight * 0.45)/(global.pokeData[5].height * 12 * 12 * global.pokeData[5].height * 0.025 * 0.025));
		
		var doughnutData = {
			    labels: [global.pokeData[0].name, global.pokeData[1].name,
		    	         global.pokeData[2].name, global.pokeData[3].name,
		    	         global.pokeData[4].name, global.pokeData[5].name],
			    datasets: [
			        {
			        	data: [bmiOne, bmiTwo, bmiThree, bmiFour, bmiFive, bmiSix],
			            backgroundColor: [
			                "#FF6384",
			                "#36A2EB",
			                "#FFCE56",
			                "#2E7D32",
			                "#9C27B0",
			                "#FB8C00"
			            ],
			            hoverBackgroundColor: [
			                "#FF6384",
			                "#36A2EB",
			                "#FFCE56",
			                "#2E7D32",
			                "#9C27B0",
			                "#FB8C00"
			            ]
			        }]
			};
		var ctxDoughnut = document.getElementById("doughnutChart");
		var myPieChart = new Chart(ctxDoughnut,{
		    type: 'doughnut',
		    data: doughnutData,
		});
		
		
		
		//Heights - polar chart
		var ctxPolar = document.getElementById("polarChart");
		
		var polarData = {
			    datasets: [{
			        data: [global.pokeData[0].height, global.pokeData[1].height,
			        	   global.pokeData[2].height, global.pokeData[3].height,
			        	   global.pokeData[4].height, global.pokeData[5].height],
			        backgroundColor: [
			            "#FF6384",
			            "#4BC0C0",
			            "#FFCE56",
			            "#E7E9ED",
			            "#36A2EB",
			            "#00695C"
			        ],
			        label: 'PokeHeights' // for legend
			    }],
			    labels: [global.pokeData[0].name, global.pokeData[1].name,
			    	     global.pokeData[2].name, global.pokeData[3].name,
			    	     global.pokeData[4].name, global.pokeData[5].name]
			};
		
		new Chart(ctxPolar, {
		    data: polarData,
		    type: 'polarArea'
		});
		
		
		
		//weights
		var ctx = document.getElementById("barChart");
		var myChart = new Chart(ctx, {
			
			type: 'bar',
		    data: {
		        labels: [global.pokeNames[0], global.pokeNames[1], global.pokeNames[2],
		        	     global.pokeNames[3], global.pokeNames[4], global.pokeNames[5]],
		        datasets: [{
		            label: 'PokeWeights',
		            data: global.weights,
		            backgroundColor: [
		                'rgba(255, 99, 132, 0.2)',
		                'rgba(54, 162, 235, 0.2)',
		                'rgba(255, 206, 86, 0.2)',
		                'rgba(75, 192, 192, 0.2)',
		                'rgba(153, 102, 255, 0.2)',
		                'rgba(255, 159, 64, 0.2)'
		            ],
		            borderColor: [
		                'rgba(255,99,132,1)',
		                'rgba(54, 162, 235, 1)',
		                'rgba(255, 206, 86, 1)',
		                'rgba(75, 192, 192, 1)',
		                'rgba(153, 102, 255, 1)',
		                'rgba(255, 159, 64, 1)'
		            ],
		            borderWidth: 1
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
		})
		$("#plotGraph").addClass("hidden");
		$("#submitButton").addClass("hidden");
		$("#refresh").removeClass("hidden");
		$("#userInput").addClass("hidden");
		});
});

/*$(document).ready(function(){
	$("#submitButton").click(function() {
		
	  var input = $("#userInput").val();
	  
	  $.ajax({
	    	method: "GET",
	    	url : "https://pokeapi.co/api/v2/pokemon/" + input + "/",
	    	success : function(data){
	 
	    		console.log(data);
	    		$("#pokemonName").html(data.weight);
	    	}
	    })

	})
});*/
