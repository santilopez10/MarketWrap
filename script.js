$(document).ready(function () {

    var loadPrices = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=%255EGSPC%252C%255EDJI%252C%255EIXIC%252CCL%253DF%252CGC%253DF%252C%255ETNX",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "12e3b21ca6msh5c6f161b93d51f3p15d8dfjsna6d802e89945"
        }
    }
    
    $.ajax(loadPrices).done(function (response) {
        var date = new Date(response.quoteResponse.result[0].regularMarketTime*1000);
        var min =(date.getMinutes() < 10) ? "0" + date.getMinutes():date.getMinutes();
        var time = (date.getHours() > 12) ? (date.getHours()-12) +":"+ min +" PM EST":date.getHours() +":"+ date.getMinutes() +" AM EST";
        var times = document.getElementsByClassName("time");
        for(var i = 0; i < times.length; i++) {
            times[i].innerHTML= time;
        }
        document.getElementById("SNP").innerHTML = formatNumber(response.quoteResponse.result[0].regularMarketPrice);
        document.getElementById("DJI").innerHTML = formatNumber(response.quoteResponse.result[1].regularMarketPrice);
        document.getElementById("NASDAQ").innerHTML = formatNumber(response.quoteResponse.result[2].regularMarketPrice);
        document.getElementById("WTI").innerHTML = formatNumber(response.quoteResponse.result[3].regularMarketPrice);
        document.getElementById("GOLD").innerHTML = formatNumber(response.quoteResponse.result[4].regularMarketPrice);
        document.getElementById("10YR").innerHTML = formatNumber(response.quoteResponse.result[5].regularMarketPrice);        
        var dChanges = document.getElementsByClassName("dollarChange");
        for(var i = 0; i < dChanges.length; i++) {
            dChanges[i].innerHTML= formatNumber(response.quoteResponse.result[i].regularMarketChange.toFixed(2));
            if(response.quoteResponse.result[i].regularMarketChange >= 0) {
                dChanges[i].style.color = "#3e9e3e";
            }
        }
        var pChanges = document.getElementsByClassName("percentChange");
        for(var i = 0; i < pChanges.length-1; i++) {
            pChanges[i].innerHTML= response.quoteResponse.result[i].regularMarketChangePercent.toFixed(2)+"%";
        }
        
        console.log(response);
    });

});

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}



