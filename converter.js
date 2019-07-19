var api_url='http://api.fixer.io/latest';
var api_response;

//Funcion to receive info from the api
function call_to_api(){
  document.getElementById('spinner').style.display = "block";
  var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            api_response=JSON.parse(xmlhttp.responseText);
            paint_selectors();
            document.getElementById('spinner').style.display = "none";
        }
    }
    xmlhttp.open("GET", api_url, true);
    xmlhttp.send();
}

//Function to create option object and append to selected target
function create_append_option(curr,rate,append_target){
  var currency_option = document.createElement("option");
  currency_option.innerHTML = curr;
  currency_option.value = curr;
  if(append_target!==undefined)
    append_target.appendChild(currency_option);
}

//Function to paint the currency selectors
function paint_selectors(){
  var from_selector=document.getElementById('from');
  var to_selector=document.getElementById('to');
  api_response.rates["EUR"]=1;
  Object.keys(api_response.rates).map(function(currency,rate) {
    create_append_option(currency,rate,from_selector);
    create_append_option(currency,rate,to_selector);
  });
}

//Function to calculate the conversion
function calculate_conversion(){
  var from_selector=document.getElementById('from');
  var to_selector=document.getElementById('to');
  var conversion_value=document.getElementById('conversion-value').value;
  var from_selected = from_selector.options[from_selector.selectedIndex].value;
  var to_selected = to_selector.options[to_selector.selectedIndex].value;
  var rate = parseFloat(api_response.rates[to_selected]) / parseFloat(api_response.rates[from_selected]);
  var result = parseFloat(conversion_value) * rate;
  result = Math.round(result * 100) / 100;
  document.getElementById('conversion-result').innerHTML=result+" "+to_selected;
}


//Init
document.addEventListener('DOMContentLoaded', function() {
  call_to_api();
});
