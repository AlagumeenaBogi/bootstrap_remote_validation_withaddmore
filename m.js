function getresult(scriptUrl)
{
    var result = null;
    $.ajax({
	url: scriptUrl,
	type: 'post',
	dataType: 'html',
	async: false,
	success: function(data)
	{
	    result = $.trim(data);
	}
    });
    return result;
}

function get_state_list(country_class)
{
    var country_ids = new Array();
    $("."+country_class+":checked").each(function( key,val ){ country_ids.push($(this).val()); });
    if($.trim(country_ids) != "")
    {
	$('#state_div').html("");
	$('#loading').show();
	var result_url = "../ajax.php?country_ids="+country_ids;
	$('#state_div').html(getresult(result_url));
	$('#loading').hide();
	$('#record_state_found').html("No State Selected");
    }
}


function federation_list(branch_id,federation_id)
{
    if($.trim(branch_id) != "")
	$('#'+federation_id).html(getresult("../ajax.php?branch_id="+branch_id));
    //else
	//$('#'+federation_id).html(getresult("../ajax.php?federation_all=1"));
}

function affliation(affliation_for,affliation_with)
{
    if($.trim(affliation_for) !=""  &&  $.trim(affliation_with) !="") {
	$('#display_affliation').css("display","block");
	res_for = getresult("../ajax.php?affliation_for="+affliation_for).split('##');
	$('#affliation_for_title').html(res_for[0]);
	if($('#affliation_for_display').html(res_for[1]))
	{
	    res_with = getresult("../ajax.php?affliation_with="+affliation_with).split('##');
	    $('#affliation_with_title').html(res_with[0]);
	    $('#affliation_with_display').html(res_with[1]);
	}
    } else {
        $('#display_affliation').css("display","none");
    }
}


function pro_ser_alert(id)
{
    if($("#prov_services"+id+":checked").length == 1)
    {
	//alert(id);
	//$("#prov_services"+id+":checked").prop('checked', false);
	//$("#prov_services"+id+":checked").removeAttr("checked");
    }
}

function numbercheck(evt)
{
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    if(key == 37 || key == 38 || key == 39 || key == 40 || key == 8 || key == 46) { // Left / Up / Right / Down Arrow, Backspace, Delete keys
	return;
    }
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    if( !regex.test(key)) {
	theEvent.returnValue = false;
	if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function confirm_form(obj)
{
    $con = $(obj).attr("title");
    if( confirm($con) == true ) {
	$con = $(obj).attr("type","submit");
	return true;
    } else {
	$con = $(obj).attr("type","button");
	return false;
    }
}

$(function() {
    $(".alert-remove").delay(5000).fadeOut("slow");
});

function addmore(addmore_classname,addmore_increment_classname,addmore_click_classname,group_title)
{
	var addmore = $( "."+addmore_classname+":first" ).clone(); // Get first class object
	$( "."+addmore_classname+":last" ).after(addmore.find("input").val("").end()); // Get the last class object and Put the first class html value
	$( '.'+addmore_increment_classname).each(function( index ){ $(this).html(group_title +' '+ (index+1) ); }); // Increment value to put the class name related tag html value
	$( '.'+addmore_classname+' input').each(function( index ) { // all the class each input tag looping
		inp = $(this).attr('id').replace(/[0-9]/g,"");
		$(this).attr('id', inp + (index + 1));
	});
	
	var inds = 0;
	$( '.'+addmore_classname).each(function( index )
	{
		index = index + 1;
		inds++;
		$(this).attr('id', addmore_classname + index); // add ID attribute and put the value for the class object
		var id = "#"+addmore_classname + index;
		$( id+' input, '+id+' select, '+id+' textarea, '+id+' label' ).each(function( ind )
		{
			if($(this).attr("id"))
			{
				$inele = $(this);
				inp = $inele.attr('id').replace(/[0-9]/g,"");
				$(this).attr('id', inp + (index)); // input new id append
				
				if($(this).hasClass("datepicker")) {
					$(this).removeClass('datepicker hasDatepicker');
					$(this).addClass('datepicker');
					$(this).datepicker({
						dateFormat: 'dd-mm-yy',
						changeMonth: true,
						changeYear: true,
						yearRange: "-100:+0"
					});
				}
				
				if($inele.attr('onchange'))
				{
					sel = $inele.attr('onchange').replace(/[0-9]/g,"");
					var pos = sel.indexOf("'");
					if(pos !== -1)
					{
						var sell = sel.substring(pos).replace(/["')]/g,"").split(",");
						var ad = new Array();
						$.each(sell,function( sid ) {  ad.push("'"+sell[sid]+index+"'"); });
						var newfun = sel.substring(0,pos)+ad+")";
						$inele.attr('onchange',newfun); // select new onchange append
					}
				}
			}
			
			if ($(this).attr('type') == 'checkbox')
			{
				sel =$inele.attr('name').replace(/[0-9]/g,"");
				che = sel.replace(/\[.*\]/g,'');
				sam = $(this).attr('name', che + (index) + '[]');
			}
			
		});
		
	});
	
	$( '.'+addmore_click_classname ).each(function( index ){
		if((parseInt(index)+1) !== inds)
			$(this).attr("onclick","remove_new('"+addmore_classname+"','"+addmore_increment_classname+"','"+addmore_click_classname+"','"+group_title+"','"+(index + 2)+"')").html('<i class="fa fa-times"></i> Remove');
		else
		      $(this).attr("onclick","addmore('"+addmore_classname+"','"+addmore_increment_classname+"','"+addmore_click_classname+"','"+group_title+"','"+(index + 1)+"')").html('<i class="fa fa-plus"></i> Add more');
	});
	
	var form_id = $('.'+addmore_classname).closest('form').attr('id');
	loadform(form_id);
}


function remove_new(addmore_classname,addmore_increment_classname,addmore_click_classname,group_title,number)
{
	$("#"+addmore_classname+number).remove();
	$( '.'+addmore_increment_classname ).each(function( index ){ $(this).html(group_title +' '+ (index+1) ); }); // Increment value to put the class name related tag html value
	var inds = 0;
	$( '.'+addmore_classname).each(function( index )
	{
		index = index + 1;
		inds++;
		$(this).attr('id', addmore_classname+index); // add ID attribute and put the value for the class object
		var id = "#"+addmore_classname + index;
		
		$( id+' input, '+id+' select, '+id+' textarea' ).each(function( ind ) {
			$inele = $(this);
			inp = $inele.attr('id').replace(/[0-9]/g,"");
			$(this).attr('id', inp + (index)); // input new id append
			
			if($inele.attr('onchange'))
			{
				sel =$inele.attr('onchange').replace(/[0-9]/g,"");
				var pos = sel.indexOf("'");
				var sell = sel.substring(pos).replace(/["')]/g,"").split(",");
				var ad = new Array();
				$.each(sell,function( sid ) {  ad.push("'"+sell[sid]+index+"'"); });
				var newfun = sel.substring(0,pos)+ad+")";
				$inele.attr('onchange', newfun); // select new onchange append
			}
			
		});
	});
	$( '.'+addmore_click_classname ).each(function( index ){
		if((parseInt(index)+1) !== inds)
			$(this).attr("onclick","remove_new('"+addmore_classname+"','"+addmore_increment_classname+"','"+addmore_click_classname+"','"+group_title+"','"+(index + 2)+"')").html('<i class="fa fa-times"></i> Remove');
		else
			$(this).attr("onclick","addmore('"+addmore_classname+"','"+addmore_increment_classname+"','"+addmore_click_classname+"','"+group_title+"','"+(index + 1)+"')").html('<i class="fa fa-plus"></i> Add more');
	});
	remove_amount(); // is not requierd function 
}


function loadform(id)
{
    $('#'+id+' input, #'+id+' select, #'+id+' textarea').each(
		function(index){
			$inp = $(this);
			$('#'+id).bootstrapValidator('addField', $inp);
		}
    )
}

function displayid(id_name)
{
	$("#"+id_name).css("display","block");
}

function upload_file_check(input)
{
    var errors = "";
    if (!window.FileReader) {
	errors = "The file API isn't supported on this browser yet.";
    }
    if (!input) {
	errors = "Um, couldn't find the fileinput element.";
    } else if (!input.files) {
	errors = "This browser doesn't seem to support the `files` property of file inputs.";
    } else if (!input.files[0]) {
	errors = "Please select a file before clicking 'Load'";
    } else {
	var extension = $(input).val().substr($(input).val().lastIndexOf('.') + 1).toLowerCase();
	var allowedExtensions = ['jpg', 'png', 'jpeg'];
	if (allowedExtensions.indexOf(extension) === -1) {
	    errors = "Invalid file Format. Only " + allowedExtensions.join(', ') + " are allowed.";
	} else {
	    var file = input.files[0];
	    if(file.size > 1000000) { // 1000000 => 1 mb
		errors = "File exceeds maximum allowed size of 1MB";
	    }
	}
    }
    return errors;
}









