/*Browse*/
$(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});

$(document).ready(function() {
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;

        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }
    });
});

//Date
$(function() {
    $(".datepicker").datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0"
    });
});
$(document).delegate('.datepicker', 'click', function(){
    $(this).datepicker();
});

$(document).delegate('.datepicker', 'change', function(){
    $field = $(this);
    if($(this).attr("data-bv-field"))
        $(this).closest('form').bootstrapValidator('revalidateField', $(this).attr("name"));
});

//Year Picker
$(function() {
    $(".yearpicker").datepicker({
        dateFormat: 'yy',
        changeYear: true
    });
});






