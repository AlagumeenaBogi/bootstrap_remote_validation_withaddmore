/*MFI Validation Basic Information*/
$(document).ready(function(){
    
    $('#change_password').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            old_password: {
                validators: {
                    notEmpty: {
                        message: 'The Old Password is required and cannot be empty'
                    },
		    remote: {
			url: 'ajax.php'
		    }
                }
            },
	    new_password: {
                validators: {
                    notEmpty: {
                        message: 'The New Password is required and cannot be empty'
                    },
		    callback: {
			callback: function(value, validator, $field) {
			    if (value === '') {
				return true;
			    }
			    // Check the password strength
			    if (value.length < 5) {
				return {
				    valid: false,
				    message: 'The password must be more than 8 characters long'
				};
			    }
			    // The password doesn't contain any uppercase character
			    if (value === value.toLowerCase()) {
				return {
				    valid: false,
				    message: 'The password must contain at least one upper case character'
				}
			    }
			    // The password doesn't contain any uppercase character
			    if (value === value.toUpperCase()) {
				return {
				    valid: false,
				    message: 'The password must contain at least one lower case character'
				}
			    }
			    // The password doesn't contain any digit
			    if (value.search(/[0-9]/) < 0) {
				return {
				    valid: false,
				    message: 'The password must contain at least one digit'
				}
			    }
			    return true;
			}
		    },
		    different: {
                        field: 'old_password',
                        message: 'The old password and new password cannot be the same as each other'
                    }
                }
            },
	    confirm_password: {
                validators: {
                    notEmpty: {
                        message: 'The Confirm Password is required and cannot be empty'
                    },
		    identical: {
			field: 'new_password',
			message: 'The password and its confirm are not the same'
		    }
                }
            }
        }
    });
    
    //client contact information validation
    $('#contact_information').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            phone_number: {
                validators: {
		    digits: {
			message: 'This is not phone number'
		    },
                    stringLength: {
			min: 6,
			max: 11,
                        message: 'The phone number invalid'
                    }
                }
            },
            emergency_contact_number: {
                validators: {
                    /*notEmpty: {
                        message: 'The mobile number is required and cannot be empty'
                    },*/
		    digits: {
			message: 'This is not Emergency Contact Number'
		    },
		    stringLength: {
                        max: 15,
			min: 10,
                        message: 'The Emergency Contact Number invalid'
                    }
                }
            },
            contact_address_one: {
                validators: {
                    notEmpty: {
                        message: 'The Contact Address one is required and cannot be empty'
                    }
                }
            }
        }
    });
    
    
    
});

