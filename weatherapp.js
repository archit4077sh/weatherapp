document.getElementById("heading").innerHTML = "Weather App";
document.getElementById("heading").style.color = "black";
var localStorageElement=JSON.parse(localStorage.getItem('city'));
displayStorage();
function displayStorage()
{
    //console.log("bhjjhvj");
    if(!(localStorageElement==null))
        {
            $("#lslist").empty();
           // console.log("hello");
            $("#prevSearch").html("Previous 5 Searches");
            localStorageElement.forEach(function(city)
            {
            $("#lslist").append("<li>"+city+"</li>");     
            });
        }
}
function keyPress(e)
{
    //console.log(e);
    if(e.keyCode==13)
        findWeather();
}

window.addEventListener("keydown",keyPress);

var api = "458bd07a29311f31bfba45676246ae1d";
function emptyResults()
{
    $("")
    $("#results").empty();
}
function findWeather()
{
    var cityname = document.getElementById("city").value;
    cityname=cityname.toUpperCase();
    //console.log(cityname);
    $.get("https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+api,function(){})
        .done(function(data){//console.log(data);
                            emptyResults();
                             printResults(data);
                             if(localStorageElement==null)
                                 {
                                     localStorageElement=[];
                                 }
                             if(!localStorageElement.includes(cityname))
                                 {
                                     if(localStorageElement.length>=5)
                                         localStorageElement.pop();
                                     localStorageElement.unshift(cityname);
                                     localStorage.setItem('city',JSON.stringify(localStorageElement));
                                    // console.log(localStorageElement);
                                     
                                 }
                            else
                                {
                                const index = localStorageElement.indexOf(cityname);
                                     if (index !== -1) {
                                localStorageElement.splice(index, 1);
                                        }
                                    localStorageElement.unshift(cityname);
                                     localStorage.setItem('city',JSON.stringify(localStorageElement));
                                }
        displayStorage();
                            })
        .fail(function(){console.log("Invalid City");
                        emptyResults();
                         alert("Invalid City");});
}

function printResults(data)
{
    var x=(data.main.temp-273).toFixed(2);
    var cityname="<tr><td>City Name</td><td>"+data.name+"</td></tr>";
    var temp="<tr><td>Temperature</td><td>"+x+"<sup>o</sup>C</td></tr>"
    var pressure="<tr><td>Pressure</td><td>"+data.main.pressure+" hPa</td></tr>";
    var humid="<tr><td>Humidity</td><td>"+data.main.humidity+"%</td></tr>"
    var wind="<tr><td>Wind Speed</td><td>"+data.wind.speed+" m/sec</td></tr>"
    $("#results").append(cityname);
    $("#results").append(temp);
     $("#results").append(pressure);
    $("#results").append(humid);
     $("#results").append(wind);
}

function findMyWeather()
{
    if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(function(position){
                var lat=position.coords.latitude;
                var lon=position.coords.longitude;
                $.get("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+api,function(data){//console.log(data);
                                                                                                                         emptyResults();
                                                                                                                          printResults(data);});
              
            }
            );
        
           
        }
}
