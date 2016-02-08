'use strict';

// Please start the curly braces on the previous line. It is important. 
// It is not a styling issue it can have unexpected and unwanted interpretation issues
// Please ask me why during the training
$(document).ready(function()
{
	// Please look at DOM caching (in a variable). Manny mentioned it earlier today
	 var source=$("#entry-template").html();
		var template=Handlebars.compile(source);
		var update=function()
		{
			var from = $('#fromDropDown').val();
		var to = $('#toDropDown').val();
		var value=$('#valueInput').val();

		/* Please perform value validation (to confirm if you have all the data required to 
		   perform the ajax request)*/
		 $.ajax({
		    async: true, // Unwanted as async is true by default
		    crossDomain: true,
		    url:'https://currencyconverter.p.mashape.com/?from='+from+'&from_amount='+value+'&to='+to,
		    type: 'GET',
		    data: {}, // No need of setting data property explicitly if no value is being sent
		    dataType: 'json',
		    success: function (data) {
		      console.log(data.to_amount); // You would have to remove all console.log commands when yu are finshed testing
		      $('#valueOutput').val(data.to_amount);
		    },
		    error: function (err) {
		      console.log(err);
		      //alert(err);
		    },
		    // You can cache this before send function as it is being used in both ajax requests
		    beforeSend: function (xhr) {
		      xhr.setRequestHeader('X-Mashape-Key', 'Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8');
		    }
		});
		};

	 $.ajax(
	{
	    async: true, // Unwanted as async is true by default
	    crossDomain: true,
	    url: 'https://currencyconverter.p.mashape.com/availablecurrencies/',
	    type: 'GET',
	    data: {}, // No need of setting data property explicitly if no value is being sent
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
		    // You can cache this before send function as it is being used in both ajax requests
	    beforeSend: function (xhr) {
	      xhr.setRequestHeader('X-Mashape-Key', 'Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8');
	    }
    });

	$('#fromDropDown,#toDropDown').on('change',update);
	$('#valueInput').on('keyup',_.debounce(update,500));

});
