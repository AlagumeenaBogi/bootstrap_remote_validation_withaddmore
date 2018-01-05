<?
include("../session.php");
include("../settings.php");
include("../config/database_connection.php");
include("../config/functions.php");

if($_SESSION[global_user_id] != "")
{
    $actual_url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $url_file_name = basename($_SERVER['REQUEST_URI'], '?' . $_SERVER['QUERY_STRING']);
    $skip_urls = array("start.php", "final", "document_verification_status.php", "document_submit.php");
    if(!in_array($url_file_name, $skip_urls)) {
        $update_last_view_url = "UPDATE global_users SET last_view_url = '$actual_url' WHERE global_user_id = '$_SESSION[global_user_id]'";
        mysql_query($update_last_view_url, $link_microfinance_global) or die($msg_or_url = "Error : ".mysql_error());
    }
}

////////////////// Documents Verification Status hide option start ////////////////////////////////
$current_url = basename($_SERVER['REQUEST_URI'], '?' . $_SERVER['QUERY_STRING']);
$hide_urls = array("document_verification_status.php", "document_submit.php", "document_send_courier.php", "document_submit_success.php" );
if(in_array($current_url, $hide_urls)) {
    ?> <style type="text/css">.hide_menu {display: none;} </style> <?php
}
////////////////// Documents Verification Status hide option end ////////////////////////////////


/*$name = basename($_SERVER['PHP_SELF']);
$_SESSION['current_file_name'] = $name;
$current_time = time();*/

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Ekgaon Microfin</title>
        <link rel="icon" type="image/png" href="<?=$branch_office_demo_application_url;?>/themes/images/ek-microfin-favicon.png">
        <!-- Bootstrap -->
        <link href="<?= $branch_office_demo_application_url?>/themes/css/bootstrap.css" rel="stylesheet">
        <link href="<?= $branch_office_demo_application_url?>/themes/css/font-awesome.min.css" rel="stylesheet">
        <link href="<?= $branch_office_demo_application_url?>/themes/css/bootstrap-theme.css" rel="stylesheet">
        
        <link href="<?= $branch_office_demo_application_url?>/themes/css/includes/sidebar.css" rel="stylesheet">
        <link href="<?= $branch_office_demo_application_url?>/themes/css/includes/header.css" rel="stylesheet">
        
        <script src="<?= $branch_office_demo_application_url?>/themes/js/jquery.js"></script>
        <link rel="stylesheet" href="<?= $branch_office_demo_application_url?>/themes/js/theme/jquery-ui.css">
        <script src="<?= $branch_office_demo_application_url?>/themes/js/ui/jquery-ui.js"></script>
        <script src="<?= $branch_office_demo_application_url?>/themes/js/bootstrap.min.js"></script>
        <script src="<?= $branch_office_demo_application_url?>/themes/validator/validator.js"></script>
        <script src="<?= $branch_office_demo_application_url?>/themes/js/highchart/highcharts.js"></script>
        <script src="<?= $branch_office_demo_application_url?>/themes/js/highchart/exporting.js"></script>
        <script src="<?= $branch_office_demo_application_url?>/themes/js/mfi/mfi.js"></script>
        <!--script src="<?= $branch_office_demo_application_url?>/themes/js/user.js"></script-->
        <script src="<?= $branch_office_demo_application_url?>/themes/js/date_browser/date_browser.js"></script>
        
        <script>
            $(document).ready(function() {
                $("#wrapper").removeClass();
                $("#menu-toggle").click(function(e) {
                    e.preventDefault();
                    $("#wrapper").toggleClass("active");
                });
                
                $(function() {
                    var shrinkHeader = 100;
                    $(window).scroll(function() {
                        var scroll = getCurrentScroll();
                        if (scroll >= shrinkHeader) {
                            /*$('.header').addClass('shrink');*/
                            $('.sidebar-wrapper').addClass('sidebar-wrapper-onscroll');
                        } else {
                            /*$('.header').removeClass('shrink');*/
                            $('.sidebar-wrapper').removeClass('sidebar-wrapper-onscroll');
                        }
                        if ($(this).scrollTop() != 0) {
                            $('#toTop').fadeIn();
                        } else {
                            $('#toTop').fadeOut();
                        }
                    });
                    $('#toTop').click(function() {
                        $('body,html').animate({
                            scrollTop: 0
                        }, 800);
                    });

                    function getCurrentScroll() {
                        return window.pageYOffset || document.documentElement.scrollTop;
                    }
                });
                
                $(function() {
                    $("[rel='tooltip']").tooltip();
                });
                
            });
        </script>
    </head>

    <body>

        <style>
            .lite-link {
                float: right;
                margin: 25px 0 0 0;
                padding: 0;
                list-style: none;
            }
            .lite-link li {
                float: left;
                padding: 15px;
            }
        </style>
        
        <div class="header">
            <div class="row">
                <div class="col-md-2">
                    <a   target="_blank"    class="header-logo" href="<?=$branch_office_demo_application_url?>/index.php"><img src="<?=$branch_office_demo_application_url?>/themes/images/ek-microfin-logo.png"/></a>
                </div>
                <div class="col-md-10">
                    <ul class="lite-link">
                        <li class="hide_menu"><a   target="_blank"    href="<?=$branch_office_demo_application_url;?>/account_setup/document_verification_status.php">Documents Verification Status</a>
                        </li>
                        <li><a   target="_blank"    href="<?=$branch_office_demo_application_url;?>/logout.php">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="wrapper" class="active">
            <div id="page-content-wrapper">
