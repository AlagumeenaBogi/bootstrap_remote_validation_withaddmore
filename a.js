/*Browse*/
$(document).on('change', '.btn-file :file', function() {
  var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label]);
});

$(document).ready( function() {
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
        
    });
});
/*Date*/
$(function() {
$( ".datepicker" ).datepicker({
				dateFormat: 'dd-mm-yy',
				changeMonth: true,
				changeYear: true, 
				minDate: new Date(2014,03),
				maxDate: new Date(2015,02,31)			
			});
	});
/*start*/
function addmore_contact_info(divid,type,hid_id,inc_clas_name)
{

		    var val =   $("#"+hid_id).val(); 
			  $.get("addmore_fields.php",{divid:divid,val:val,type:type},
		 		function(resp)
				{ 
					 $("#"+divid).append(resp);
					 $('.'+inc_clas_name).each(function( index )
								{ 
								$(this).html(index + 1); 
								});
					 var hil =$("#"+hid_id).val();				
					 var fin = parseInt(hil) + 1;	
					 $("#"+hid_id).val(fin);

			  });
}



function remove_contact_info(divid,inc,inc_class)
{
			var remove_value = 'remove';
			$("#"+divid).remove();
			$('.'+inc_class).each(function( index ){ $(this).html(index + 1); });
			$('.remove_contact_mbl').each(function( index ){ 
				$(this).attr("onclick","remove_contact_info('"+(remove_value+(index + 1))+"','"+(index + 1)+"','')");
			});
			
			$('.remove_append_info').each(function( index ){ 
				$(this).attr("id","remove"+(index + 1));
			});
			
}

/*Village Added Start*/
$(function() {
var availableTags = [
"Chellampatti, Madurai, Tamilnadu",
"Chellampatti, Coimbatore, Tamilnadu",
"Chinthamani, Kollam, Kerala",
"Devankuruchi, Tanjore, Tamilnadu",
"Ilandaikulam, Kollam, Kerala",
"Karaikeni, Coimbatore, Tamilnadu",
"Karseri, Chennai, Tamilnadu",
"Keeladi, Karnool, Andhrapradesh",
"Keelavalavu, Madurai, Tamilnadu",
"Kumutrampatti, Tanjore, Tamilnadu",
"Maittanpatti, Jodhpur, Rajasthan",
"Mallappuram, Coimbatore, Tamilnadu",
"Mangulam, Karnool, Andhrapradesh",
"Melakkal Kanavai, Belgaum, Karnataka",
"Mullipallam, Jodhpur, Rajasthan",
"Muthupatti, Chennai, Tamilnadu",
"Naganakulam, Coimbatore, Tamilnadu",
"Nilaiyur, Tanjore, Tamilnadu",
"Pallichandai Silaiman, Malappuram, Kerala",
"Periya Ilanthai Kulam, Belgaum, Karnataka",
"Perungamanallur, Jodhpur, Rajasthan",
"Rasinampatti, Belgaum, Karnataka",
"Saluppapatti, Coimbatore, Tamilnadu",
"Samanatham, Karnool, Andhrapradesh",
"Saptur, Chennai, Tamilnadu",
"Sathuragiri Hills, Madurai, Tamilnadu",
"Sembukudipatti, Malappuram, Kerala",
"Semmanipatti, Jodhpur, Rajasthan",
"Sengapadai, Tanjore, Tamilnadu",
"Sperumalpatti, Madurai, Tamilnadu",
"Thaniyamangalam, Belgaum, Karnataka",
"Thiruvedagam, Jodhpur, Rajasthan",
"V. Ammapatti, Madurai, Tamilnadu",
"Vadakampatti, Karnool, Andhrapradesh",
"Vannivelampatti, Madurai, Tamilnadu"
];
$( "#villages" ).autocomplete({
source: availableTags
});
});


/*Geography of Operations*/
/*function search_value(search_id,box_id,checkbox_id)
{
// var activeSystemClass = $('.list-group-item.active');
//alert(search_id+"--->"+box_id+"--->"+checkbox_id);
    $('#'+search_id).keyup( function() {
       var that = this;
        var box_value = $('.'+box_id);
        var checkbox_value = $('.'+checkbox_id);
        $('.search-sf').remove();
        checkbox_value.each( function(i, val) {
            var rowText = $(val).text().toLowerCase();
            var inputText = $(that).val().toLowerCase();
            if(inputText != '')
            {
                $('.search-query-sf').remove();
            }
            else
            {
               // $('.search-query-sf').remove();
            }
            if( rowText.indexOf( inputText ) == -1 )
            {
                checkbox_value.eq(i).hide();
            }
            else
            {
                checkbox_value.eq(i).show();
            }
        });
        if(checkbox_value.children(':visible').length == 0)
        {
            box_value.append('<tr class="search-sf"><td class="text-muted" colspan="6">No entries found.</td></tr>');
        }
    });
}*/


function search_value(search_id,box_id,checkbox_id)
{
    var that = $('#'+search_id);
    var box_value = $('.'+box_id);
    var checkbox_value = $('.'+checkbox_id);
    $('.search-sf').remove();
    checkbox_value.each( function(i, val) {
	var rowText = $(val).text().toLowerCase();
	var inputText = $(that).val().toLowerCase();
	if(inputText != '')
	    $('.search-query-sf').remove();
	    
	if( rowText.indexOf( inputText ) == -1 )
	    checkbox_value.eq(i).hide();
	else
	    checkbox_value.eq(i).show();
    });
    if(checkbox_value.children(':visible').length == 0) {
	box_value.closest('div').find('.geo-opera-checkbox').append('<div class="search-sf"><br><br><center>Record not found!</center></div>');
    }
}



function addonenew()
{
    var addmore = $('<tr class="addmore removetr">'+
		'<td><a href="javascript:void(0)" class="remove">'+
			'<img src="images/Remove.png" alt="Remove" title="Remove" height="25px">'+
		'</a></td>'+
		'<td class="sno"></td>'+
		'<td colspan="3"><textarea class="table_textarea" name="description[]"></textarea></td>'+
		'<td class="right"><input type="text" autocomplete="off" class="inpamt" name="amount[]" onkeypress="numbercheck(event)" onkeyup="calculate1(this)"></td>'+
		'</tr>');
	addmore.hide();
    $(".addmore:last").after(addmore);
    $('.removetr').each(function( index ){ $(this).attr("id","addmore"+(index + 1)); });    
    $('.remove').each(function( index ){ $(this).attr("onclick","removeonenew("+(index + 1)+")"); });
    $('.sno').each(function( index ){ $(this).html(index + 1); });
    $('[name="description[]"]').each(function( index ){  $(this).attr("id","description"+(index + 1)); });
    $('[name="amount[]"]').each(function( index ){  $(this).attr("id","amount"+(index + 1)); });
    addmore.fadeIn("slow");
}

function removeonenew(no)
{
	$("#addmore"+no).fadeOut("slow", function() {
		$(this).remove();
		$('.removetr').each(function( index ){ $(this).attr("id","addmore"+(index + 1)); });    
		$('.remove').each(function( index ){ $(this).attr("onclick","removeonenew("+(index + 1)+")"); });
		$('.sno').each(function( index ){ $(this).html(index + 1); });
		$('[name="description[]"]').each(function( index ){  $(this).attr("id","description"+(index + 1)); });
		$('[name="amount[]"]').each(function( index ){  $(this).attr("id","amount"+(index + 1)); });
		calculate1();
	});
}





function addmore(addmore_classname,addmore_increment_classname,addmore_click_classname,group_title)
{
	var addmore = $( "."+addmore_classname+":first" ).clone(); // Get first class object
	$( "."+addmore_classname+":last" ).after(addmore.find("input").end()); // Get the last class object and Put the first class html value
	$( '.'+addmore_increment_classname).each(function( index ){ $(this).html(group_title +' '+ (index+1) ); }); // Increment value to put the class name related tag html value
	$( '.'+addmore_classname+' input').each(function( index ) { // all the class each input tag looping
		inp = $(this).attr('id').replace(/[^a-z]+/ig,"");
		$(this).attr('id', inp + (index + 1));
	});
	$( "."+addmore_classname+":last input" ).each(function( index ){
		if(!$(this).attr("value")) $(this).val("");
		if(!$(this).attr("checked")) $(this).attr("checked", false);
	});
	
	var inds = 0;
	$( '.'+addmore_classname).each(function( index )
	{
		index = index + 1;
		inds++;
		$(this).attr('id', addmore_classname+index); // add ID attribute and put the value for the class object
		var id = "#"+addmore_classname + index;
		//alert("ID--->"+id);
		$( id+' input, '+id+' select, '+id+' textarea' ).each(function( ind ) 
		{
			//
			$inele = $(this);
			
			inp = $inele.attr('id').replace(/[0-9]/g,"");
			$(this).attr('id', inp + (index)); // input new id append

			if($inele.attr('onchange'))
			{
			//
				sel =$inele.attr('onchange').replace(/[0-9]/g,"");
				var pos = sel.indexOf("'");
				var sell = sel.substring(pos).replace(/["')]/g,"").split(",");
				var ad = new Array();
				$.each(sell,function( sid ) {  ad.push("'"+sell[sid]+index+"'"); });
				var newfun = sel.substring(0,pos)+ad+")";
				//alert(newfun);
				$inele.attr('onchange',newfun); // select new onchange append
			}

			if ($(this).attr('type') == 'checkbox')
			{
				sel =$inele.attr('name').replace(/[0-9]/g,"");
				che = sel.replace(/\[.*\]/g,'');
				sam = $(this).attr('name', che + (index) + '[]');
				
			}
		});
		//Datepicker start.....
		$(function() {
			$(".datepicker").datepicker({
				dateFormat: 'dd-mm-yy',
				changeMonth: true,
				changeYear: true,
				yearRange: "-100:+0"
			});
			/* $(".datepicker").change(function(){
				 $field = $(this);
			 });*/
		});
		//Datepicker End....
	});
	//
	$( '.'+addmore_click_classname ).each(function( index ){
		if((parseInt(index)+1) !== inds)
			$(this).attr("onclick","remove_new('"+addmore_classname+"','"+addmore_increment_classname+"','"+addmore_click_classname+"','"+group_title+"','"+(index + 2)+"')").html('<i class="fa fa-times"></i> Remove');
		else
		      $(this).attr("onclick","addmore('"+addmore_classname+"','"+addmore_increment_classname+"','"+addmore_click_classname+"','"+group_title+"','"+(index + 1)+"')").html('<i class="fa fa-plus"></i> Add more');
	});
	//
	var form_id = $('.'+addmore_classname).closest('form').attr('id');
	loadform(form_id);

//step1


}


function remove_new(addmore_classname,addmore_increment_classname,addmore_click_classname,group_title,number)
{

	$("#"+addmore_classname+number).fadeOut("slow", function() 
	{
		$(this).remove();
		//$().remove();
		
		//jQuery('#'+rId).remove();
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
					$inele.attr('onchange',newfun); // select new onchange append
				}
				
			});
		});
		$( '.'+addmore_click_classname ).each(function( index ){
			if((parseInt(index)+1) !== inds)
				$(this).attr("onclick","remove_new('"+addmore_classname+"','"+addmore_increment_classname+"','"+addmore_click_classname+"','"+group_title+"','"+(index + 2)+"')").html('<i class="fa fa-times"></i> Remove');
			else
			      $(this).attr("onclick","addmore('"+addmore_classname+"','"+addmore_increment_classname+"','"+addmore_click_classname+"','"+group_title+"','"+(index + 1)+"')").html('<i class="fa fa-plus"></i> Add more');
		});
	});
}

function loadform(id)
{
	//alert("ID---->"+id);
	$('#'+id+' input, #'+id+' select, #'+id+' textarea').each(
	    function(index){
			$inp = $(this);
			//alert("value--->"+$inp);
			$('#'+id).bootstrapValidator('addField', $inp);
	    }
	)
}

function displayid(id_name)
{
	$("#"+id_name).css("display","block");
}


















