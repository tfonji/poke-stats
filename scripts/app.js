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
		var input = $("#userInput").val().split(",");
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
		var pokeMoves = [];
		var baseExp = [];
		var gameIndices = [];
		var lineLabels = [];
		var chartColors = [];
		for(index = 0; index < global.pokeData.length; index++){
			pokeMoves[index] = global.pokeData[index].moves.length;
			baseExp[index] = global.pokeData[index].base_experience;
			gameIndices[index] = global.pokeData[index].game_indices.length;
			lineLabels[index] = global.pokeData[index].name;
			chartColors[index] = '#'+Math.floor(Math.random()*16777215).toString(16);
			
		}
		
		var lineData = {
			    labels: lineLabels,
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
			            data: pokeMoves,
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
			            data: baseExp,
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
			            data: gameIndices,
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
		var lineLabels = [];
		var bmi = [];
		for(index = 0; index < global.pokeData.length; index++){
			bmi[index] = Math.floor((global.pokeData[index].weight * 0.45)/(global.pokeData[index].height * 12 * 12 * global.pokeData[index].height * 0.025 * 0.025));
			lineLabels[index] = global.pokeData[index].name;
		}
		
		var doughnutData = {
			    labels: lineLabels,
			    datasets: [
			        {
			        	data: bmi,
			            backgroundColor: chartColors,
			            hoverBackgroundColor: chartColors
			        }]
			};
		var ctxDoughnut = document.getElementById("doughnutChart");
		var myPieChart = new Chart(ctxDoughnut,{
		    type: 'doughnut',
		    data: doughnutData,
		});
		
		
		
		//Heights - polar chart
		var ctxPolar = document.getElementById("polarChart");
		var heightData = [];
		var heightLabels = [];
		for(index = 0; index < global.pokeData.length; index++){
			heightLabels[index] = global.pokeData[index].name;
			heightData[index] = global.pokeData[index].height;
		}
		var polarData = {
			    datasets: [{
			        data: heightData,
			        backgroundColor: chartColors,
			        label: 'PokeHeights' // for legend
			    }],
			    labels: heightLabels
			};
		
		new Chart(ctxPolar, {
		    data: polarData,
		    type: 'polarArea'
		});
		
		
		
		//weights
		var ctx = document.getElementById("barChart");
		var weightLabel = [];
		var weightData = [];
		for(index = 0; index < global.pokeData.length; index++){
			weightLabel[index] = global.pokeData[index].name;
			weightData[index] = global.pokeData[index].weight;
		}
		var myChart = new Chart(ctx, {
			
			type: 'bar',
		    data: {
		        labels: weightLabel,
		        datasets: [{
		            label: 'PokeWeights',
		            data: weightData,
		            backgroundColor: chartColors,
		            borderColor: chartColors,
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
		$("#top-label").removeClass("hidden");
		$("#bottom-label").removeClass("hidden");
		});
});

