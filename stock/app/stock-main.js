'use strict';
$(document).ready(function()
{
	 var source=$("#entry-template").html();
		var template=Handlebars.compile(source);
		var update=function()
		{
			var from = $('#fromDropDown').val();
		var to = $('#toDropDown').val();
		var value=$('#valueInput').val();
		 $.ajax({
		    async: true,
		    crossDomain: true,
		    url:'https://currencyconverter.p.mashape.com/?from='+from+'&from_amount='+value+'&to='+to,
		    type: 'GET',
		    data: {},
		    dataType: 'json',
		    success: function (data) {
		      console.log(data.to_amount);
		      $('#valueOutput').val(data.to_amount);
		    },
		    error: function (err) {
		      console.log(err);
		      //alert(err);
		    },
		    beforeSend: function (xhr) {
		      xhr.setRequestHeader('X-Mashape-Key', 'Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8');
		    }
		});
		};
	 $.ajax(
	{
	    async: true,
	    crossDomain: true,
	    url: 'https://currencyconverter.p.mashape.com/availablecurrencies/',
	    type: 'GET',
	    data: {},
	    dataType: 'json',
	    success: function (data) {
	    	console.log(data);
	    	var sampleData = {
	    		getData: data
	    	};
	    	var html= template(sampleData);
		     $("#fromDropDown").append(html);
		     $("#toDropDown").append(html);
	    },
	    error: function (err) {
	      console.log(err);
	      //alert(err);
	    },
	    beforeSend: function (xhr) {
	      xhr.setRequestHeader('X-Mashape-Key', 'Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8');
	    }
    });
	
		

	$('#fromDropDown,#toDropDown').on('change',update);
	$('#valueInput').on('keyup',update);
});
