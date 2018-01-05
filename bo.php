<?
include ("header.php");
require_once($branch_office_demo_functions_url."/masters/branch/add/add_branches.php");
require_once($branch_office_demo_functions_url."/accounts/default_chart_of_accounts/create_default_chart_of_accounts.php");
require_once($branch_office_demo_functions_url."/accounts/default_chart_of_accounts/create_affiliation_chart_of_accounts.php");
require_once($branch_office_demo_functions_url."/accounts/default_chart_of_accounts/create_affiliation_ledgers.php");
require_once($branch_office_demo_functions_url."/masters/account_level_name.php");
require_once($branch_office_demo_functions_url."/masters/affiliated_organization_name.php");	

											

if (isset($_POST['branch_office_submit']))
{
    $mfi_id = $_POST['mfi_id'];
    for ($i = 0; $i < count($_POST['branch_name']); $i++) {
        $branch_name = $_POST['branch_name'][$i];
        $contact_person_name = $_POST['contact_person_name'][$i];
        $mobile_number = $_POST['mobile_number'][$i];
        $branch_email = $_POST['email'][$i];
        $branch_for = "2";  
      
					$condition = "Added";
					$return_branch_id=add_branches($client_id,$user_id,$branch_for,$branch_name,$contact_person_name,$mobile_number,$branch_email,$link_client_database,$link_microfinance_global,$client_database,$microfinance_global_database,$link_ekgaon_global,$ekgaon_global_database); 
    }

    setcookie("alert", "Branch office information successfully saved", time() + 10);
    echo '<script>location.href="federation_information.php"</script>';
}
?>
<script src="<?=$branch_office_demo_application_url;?>/themes/validator/form_validation.js"></script>
<script src="<?=$branch_office_demo_application_url;?>/themes/js/add_more/addmore_field.js"></script>
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
        <?php $branch_office_information = "alert-info"; ?>
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
                <form class="form-horizontal" method="post" name="branch_information_form" id="branch_information_form" action="branch_office_information.php">
		    <h2 class="view-info-underline">Branch office information</h2>
                    <?
                    $branch_status = mysql_fetch_object(mysql_query("SELECT branches FROM enquiry_setps WHERE client_id='$client_id'", $link_microfinance_global))->branches;
                    if ($branch_status == 0) {
                        ?>
                        <div class="alert alert-danger alert-dismissible" role="alert">While Registering microfinance.in, You mentioned in enquiry form that you organization does not have Branch Level Operations. But If you have Branch Level Operations, use this form to add your brances.</div>
			<?
		    }
		    ?>
                    <div class="alert alert-warning alert-dismissible" role="alert">Please add your branch network information to the platform. Branch is second level of hierarchy in your network on the platform. You are required to provide branch name, contact person of the branch (for eg. Branch Manager) and his/her mobile number and email id. Please note next level of setup information would be automatically send to the branch functionaries to help them to add next level of system users. You need to add all your branch details here. Only branch added here would be available for settings accross the platform.<br/><br/>
                        <i class="fa fa-lightbulb-o"></i>
                        Adding branch help<br/><br/>If your Institution name is "ABC Financial Services Ltd" then your branch name could be "ABC Financial Services Ltd - Mumbai"</div>
                    <input type="hidden" name="mfi_id" value="<?= $mfi_id ?>" >
                    <div class="addmore_branch">
                        <h5 class="add_branch"></h5>
                        <div class="form-group">
                            <div class="col-sm-3 text_right">
                                <label class="control-label">Branch name <span class="star">*</span></label>
                            </div>
                            <div class="col-sm-9">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-building"></i></span>
                                    <input type="text" id="branch_name" name="branch_name[]" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="form-group" >
                            <div class="col-sm-3 text_right">
                                <label  class="control-label" >Contact person name <span class="star">*</span></label>
                            </div>
                            <div class="col-sm-9">
                                <div class="input-group">
                                    <span class="input-group-addon glyphicon glyphicon-user"></span>
                                    <input type="text" id="contact_person_name" name="contact_person_name[]" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="form-group" >
                            <div class="col-sm-3 text_right">
                                <label class="control-label" >Mobile number <span class="star">*</span></label>
                            </div>
                            <div class="col-sm-9">
                                <div class="input-group">
                                    <span class="input-group-addon glyphicon glyphicon-phone"></span>
                                    <input type="text" id="mobile_number" name="mobile_number[]" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="form-group" >
                            <div class="col-sm-3 text_right">
                                <label  class="control-label" >Email ID <span class="star">*</span></label>
                            </div>
                            <div class="col-sm-9">
                                <div class="input-group">
                                    <span class="input-group-addon">@</span>
                                    <input type="text" id="email" name="email[]" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="row pull-right">
                            <a   target="_blank"    class="btn btn-default btn-xs addmore_link" onclick="addmore('addmore_branch','add_branch','addmore_link','Branch')" >
                                <i class="fa fa-plus"></i> Add More
                            </a>
                        </div>
                        <div class="clear"></div>
                    </div>





                    <div class="form-group"> </div><br>
                    <div class="form-group">
                        <div class="col-md-offset-2 col-md-10">
                            <button type="submit" class="btn btn-default pull-right" name="branch_office_submit">
                                <span class="glyphicon glyphicon-ok"></span>Submit
                            </button>
                            <button type="button" onclick="location.href='federation_information.php'" class="btn btn-primary pull-right" style="margin-right:5%" name="head_office_submit" >
                                    <span class="glyphicon glyphicon-share-alt"></span>Skip
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
