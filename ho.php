<?
include("header.php");
require_once($branch_office_demo_functions_url."/accounts/default_chart_of_accounts/create_default_chart_of_accounts.php");
$row_client_details = mysql_fetch_array(mysql_query("SELECT org_name FROM clients WHERE client_id='$client_id'", $link_microfinance_global));
$client_name = $row_client_details['org_name'];



/********* Client information start *************/
    
    $client_for = 1;
    $client_info_id = 1;
    $created_time = time();
    
    $query_add_cli	= "select organization_address_line1, organization_address_line2, organization_postal_code from shopping_cart where client_id = '$client_id'";
    $address_cli = mysql_fetch_array(mysql_query($query_add_cli, $link_microfinance_global));
    
    $address_line1 = $address_cli[organization_address_line1];
    $address_line2 = $address_cli[organization_address_line2];
    $postal_code = $address_cli[organization_postal_code];
    
    $query_com     = "select communication_id from communication_information where communication_for = '$client_for' and communication_reference_id = '$client_info_id' and status = '1'";
    $communication = mysql_fetch_array(mysql_query($query_com, $link_client_database));
    $communication_id = $communication['communication_id'];
    
    if(empty($communication_id)) {
	    $communication_info  = "INSERT INTO communication_information(communication_for,communication_reference_id,user_id,status,created_time)";
	    $communication_info .= "VALUES ('$client_for','$client_info_id','$user_id',1,$created_time)";
	    if(!mysql_query($communication_info, $link_client_database)) {
		echo "Error =>".mysql_error();
	    }
	$communication_id = mysql_insert_id($link_client_database);
    }
    
    $query_add     = "select address_id from address where communication_id = '$communication_id' and status = '1'";
    $address_id = mysql_fetch_object(mysql_query($query_add, $link_client_database))->address_id;
    if(empty($address_id)) {
	$address = "INSERT INTO address(communication_id,user_id,address_line_one,address_line_two,postal_code,created_time,status)";
	$address .= "VALUES ('$communication_id','$user_id','$address_line1','$address_line2','$postal_code','$created_time','1')";
	if(!mysql_query($address, $link_client_database)) {
	    echo "Error =>".mysql_error();
	}
	$condition = "Added";
    } else {
	$address = "Update address set communication_id = '$communication_id', user_id = '$user_id', address_line_one = '$address_line1', address_line_two = '$address_line2', postal_code = '$postal_code', modified_time  = '$created_time' where address_id = '$address_id'";
	if(!mysql_query($address, $link_client_database)) {
	    echo "Error =>".mysql_error();
	}
	$condition = "Updated";
    }
    
    
    $con_qur_cli     = "select org_mobile, org_email, org_person from clients where client_id = '$client_id'";
    $cont_cli = mysql_fetch_array(mysql_query($con_qur_cli, $link_microfinance_global));
    
    $mobile_number = $cont_cli[org_mobile];
    $email_address = $cont_cli[org_email];
    $contact_person = $cont_cli[org_person];
    
    if(!empty($mobile_number))
    {
	$query_mob     = "select mobile_no_id from mobile where communication_id = '$communication_id' and status = '1'";
	$sel_mob = mysql_fetch_array(mysql_query($query_mob, $link_client_database));
	$mobile_no_id = $sel_mob[0];
	if(!empty($mobile_no_id)) {
	    mysql_query("delete from mobile where communication_id = '$communication_id'",$link_client_database);
	    $condition = "Updated";
	}
	$phone = "INSERT INTO mobile(communication_id,user_id,mobile_number,created_time,status)";
	$phone .= "VALUES ('$communication_id','$user_id','$mobile_number','$created_time','1')";
	if(!mysql_query($phone, $link_client_database)) {
	    echo "Error =>".mysql_error();
	}
    }
    
    if(!empty($email_address))
    {
	$query_ema     = "select email_id from email where communication_id = '$communication_id' and status = '1'";
	$sel_ema = mysql_fetch_array(mysql_query($query_ema, $link_client_database));
	$email_id = $sel_ema[0];
	if(!empty($email_id)) {
	    mysql_query("delete from email where communication_id = '$communication_id'",$link_client_database);
	    $condition = "Updated";
	}
	$phone = "INSERT INTO email(communication_id,user_id,email_address,created_time,status)";
	$phone .= "VALUES ('$communication_id','$user_id','$email_address','$created_time','1')";
	if(!mysql_query($phone, $link_client_database)) {
	    echo "Error =>".mysql_error();
	}
    }
    
    if(!empty($contact_person))
    {
		$query_con     = "select contact_person_id from contact_person_information where contact_person_reference_id = '$client_id' and contact_person_for = '$client_for' and status = '1'";
		$sel_con = mysql_fetch_array(mysql_query($query_con, $link_client_database));
		$contact_person_id = $sel_con[0];
		if(!empty($contact_person_id)) {
			mysql_query("delete from contact_person_information where contact_person_reference_id = '$client_id' and contact_person_for = '$client_for'",$link_client_database);
			$condition = "Updated";
		}
		$contact = "INSERT INTO contact_person_information (contact_person_for,contact_person_reference_id,user_id,contact_person_name,created_time,status)";
		$contact .= "VALUES ('$client_for','$client_id','$user_id','$contact_person','$created_time','1')";
		if(!mysql_query($contact, $link_client_database)) {
			echo "Error =>".mysql_error();
		}
	}

/********* Client information End *************/


if (isset($_POST['head_office_submit'])) {
    $pro_ser = implode(',',$_POST['pro_ser']);
    if(count($_POST['prov_services']) > 0) {
		$providing_services_ids = $pro_ser.','.implode(",", $_POST['prov_services']);
    } else {
		$providing_services_ids = $pro_ser;
    }
    
    $date_registrations = explode('-', $_POST['date_registration']);
    $date_registration = mktime(0, 0, 0, $date_registrations[1], $date_registrations[0], $date_registrations[2]);
    
    if($_FILES["company_logo"]["name"] != "") {
		$file_tmp_name	= $_FILES["company_logo"]['tmp_name'];
		$file_name	= $_FILES["company_logo"]['name'];
		$file_type	= $_FILES["company_logo"]['type'];
		
		$ran = time().rand(0000,9999);
		
		$file_uload = array(
			'image_file'	=> '@'. $file_tmp_name .';filename=' . $file_name .';type='. $file_type .';',
			'width_one'		=> '300',
			'width_two'		=> '100',
			'width_three'	=> '50',
			'ran'			=> $ran,
			'path_one'		=> $client_database_name. '/images/large/',
			'path_two'		=> $client_database_name. '/images/medium/',
			'path_three'	=> $client_database_name. '/images/small/');
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $file_uload);
		curl_setopt($ch, CURLOPT_URL, $branch_office_demo_upload_url . '/image_file_uploads.php'); 
		curl_exec($ch);
		curl_close($ch);
		
		$company_logo = $ran.'.png';
    }
	mysql_query("update clients set account_setup_status = '1' where client_id = '$client_id'", $link_microfinance_global);
	
    $client_id_new = mysql_fetch_object(mysql_query("select client_id from client_information",$link_client_database))->client_id;
    if($client_id_new != "") {
		$query = "update client_information set organization_name = '$client_name', providing_services_ids = '$providing_services_ids', organization_establish_year = '$date_registration', company_logo = '$company_logo', client_id = '1' where client_id = '$client_id_new'";
    } else {
		$query  = "INSERT INTO client_information (organization_name, providing_services_ids, organization_establish_year, company_logo) "; //
		$query .= "values ('$client_name', '$providing_services_ids', '$date_registration', '$company_logo')"; //
    }
    
    if (mysql_query($query, $link_client_database)) {
		create_default_chart_of_accounts($client_for,$client_info_id,$link_client_database,$link_microfinance_global,$client_database,$microfinance_global_database,$link_ekgaon_global,$ekgaon_global_database);
		setcookie("alert", "Head office information successfully saved", time() + 10);
		echo '<script>location.href="geography_information.php"</script>';
    } else {
		echo "Error => ". mysql_error();
		exit;
		setcookie("alert", "Head office information not saved", time() + 10);
		echo '<script>location.href="head_office_information.php"</script>';
    }
    
}
?>
<script src="<?= $branch_office_demo_application_url; ?>/themes/validator/form_validation.js"></script>
<script src="<?= $branch_office_demo_application_url; ?>/themes/js/add_more/addmore_field.js"></script>
<div class="page-content inset">
    <div class="row">
        <div class="col-md-12">
            <h1>MFI Account Setup</h1>
        </div>
        <div class="col-md-12">
            <div class="alert alert-info alert-dismissible" role="alert">
                Please share your organization's institutional information, operations, affliations, communication information with the platform.
            </div>
        </div>
        <?
        include("progress_bar.php");
        ?>
        <?php $head_office_information = "alert-info"; ?>
        <div class="col-sm-3 clear-right-padding">
            <? include ("left_menu_mfi.php"); ?>
        </div>
        <div class="col-sm-9">
            <div class="well">
                <?php
                if ($_COOKIE['alert']) {
                    $alert_value = $_COOKIE['alert'];
                    echo '<div class="alert alert-success alert_status"> ' . $alert_value . '! &nbsp; &nbsp;
			<button aria-hidden="true" data-dismiss="alert" class="close" type="button">
			    <span class="glyphicon glyphicon-remove fright cpoint"></span>
			</button>
		    </div>';
                    unset($_COOKIE['alert']);
                }
                ?>
                <form class="form-horizontal" action="head_office_information.php" method="post" name="head_office_form" id="head_office_form" enctype="multipart/form-data" >
                    <input type="hidden" name="mfi_id" id="mfi_id" value="<?= $mfi_id ?>" >
		    <h2 class="view-info-underline">Head Office Information</h2>
                    <!--div class="alert alert-warning alert-dismissible" role="alert">Please carefully select products &amp; services offered by your organization, only selected products would be available for settings across the platform.</div-->
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Organization name <span class="star">*</span></label>
                        <div class="col-sm-9">
			    <label class="control-label text-primary"><?= $client_name ?></label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Providing services<span class="star">*</span></label>				
                        <div  class="col-md-9">
                            <div class="row">
			    <?
			    $select_providing_services = mysql_query("SELECT * FROM providing_services WHERE status='1'", $link_microfinance_global);
			    $organization_selected_services = mysql_fetch_array(mysql_query("SELECT product_services FROM enquiry_setps WHERE client_id='$client_id'", $link_microfinance_global));
			    echo '<input type="hidden" name="pro_ser[]" value="'.$organization_selected_services[0].'">';
			    $providing_services = explode(',', $organization_selected_services[0]);
			    while ($row_providing_services = mysql_fetch_array($select_providing_services)) { ?>
				<div class="col-md-4 clear-left-padding">
                                    <div class="checkbox-inline">
                                        <label>
                                            <input name="prov_services[]" type="checkbox" <?php if (in_array($row_providing_services['providing_services_id'], $providing_services)) { echo 'disabled checked'; } ?> id="prov_services<?= $row_providing_services['providing_services_id'];?>" value="<?= $row_providing_services['providing_services_id'];?>" onclick="pro_ser_alert('<?=$row_providing_services['providing_services_id'];?>')" ><?= $row_providing_services['providing_services_name'];?>
					</label>
				    </div>
				</div><?php
			    }
			    ?>
                            </div>
                            <div class="row"></div><br>
                            <div role="alert" class="alert alert-warning alert-dismissible">Please carefully select products & services offered by your organization, only selected products would be available for settings across the platform.</div>
                        </div>
                    </div>
					
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Date of registration <span class="star">*</span></label>
                        <div  class="col-md-9">
                            <div class="input-group">
                                <span class="input-group-addon glyphicon glyphicon-calendar"></span>
                                <input class="form-control datepicker" type="text" readonly="readonly" id="date_registration" name="date_registration">
                            </div>
                        </div>
                    </div>
					
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Institution logo <span class="star">*</span></label>
                        <div  class="col-md-9">
                            <div class="input-group">
                                <span class="input-group-addon glyphicon glyphicon-paperclip"></span>
                                <input type="text" placeholder="Institution Logo" class="form-control">
                                <span class="input-group-btn">
                                    <span class="btn browse_btn btn-file btn-success"> Browse… 
                                        <input type="file" id="company_logo" name="company_logo" data-bv-field="photo">
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group"> </div>
                    <div class="form-group">
                        <div class="col-md-offset-2 col-md-10">
                            <button type="submit" class="btn btn-default pull-right" name="head_office_submit" >
                                <span class="glyphicon glyphicon-ok"></span>Submit
                            </button>
                        </div>
                    </div>
                </form>     

        </div>
    </div>
</div>
</div>
</div>
<?
include ("../footer.php");
?>
