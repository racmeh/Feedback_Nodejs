/* Your code */
window.onload = (event) => { //Function calling on window load
    onWindowLoadFunction();
}

function onWindowLoadFunction() {
    var tmp = {};
    var temp = '';
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() { //When response is received

        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);
            var formstr = "";

            if (resp.length==0) //Checking if response is null. If null, removing html elements
            {
            	var btnrem=document.getElementById('frmbtn');
            	var asterisk=document.getElementById('asterisk');
            	btnrem.remove();
            	asterisk.remove();
            }

            for (var i = 0; i < resp.length; i++) {

                if (resp[i].has_options == false) {

                    if (resp[i].type != "rating" && resp[i].type != "textarea") { //Input excluding textarea, rating, radio button & heckbox
						if (resp[i].mandatory == true) //Checking for mandatory
                            formstr = '<span style="color:#9e9e9e;">'+(i+1)+') </span><label for="' + resp[i].id + '">' + resp[i].title + '*</label><br><br><input type="' + resp[i].type + '" id="' + resp[i].id + '" name="' + resp[i].title + '" required><br><br><br>';
                        else
                            formstr = '<span style="color:#9e9e9e;">'+(i+1)+') <label for="' + resp[i].id + '">' + resp[i].title + '</label><br><br><input type="' + resp[i].type + '" id="' + resp[i].id + '" name="' + resp[i].title + '"><br><br><br>';
                    } 

                    else if (resp[i].type == "textarea") { //Textarea
                        if (resp[i].mandatory == true)
                            formstr = '<span style="color:#9e9e9e;">'+(i+1)+') <label for="' + resp[i].id + '">' + resp[i].title + '*</label><br><br><textarea style="resize:none;" rows = "5" cols = "30" maxlength="2500" id="' + resp[i].id + '" name="' + resp[i].title + ' placeholder="Your comments here.." required"><br><br><br>';
                        else
                            formstr = '<span style="color:#9e9e9e;">'+(i+1)+') <label for="' + resp[i].id + '">' + resp[i].title + '</label><br><br><textarea style="resize:none;" rows = "5" cols = "30" maxlength="2500" id="' + resp[i].id + '" name="' + resp[i].title + '" placeholder="Your comments here.."></textarea><br><br><br>';
                    } 

                    else if (resp[i].type == "rating") { //Rating

                        if (resp[i].mandatory == true) {
                        	formstr = '<span style="color:#9e9e9e;">'+(i+1)+') </span><label for="' + resp[i].id + '">' + resp[i].title + '*</label><br><br>';
                            formstr += '<div class="ratingbar"><input type="radio" id="rating1" name="rating" value="1" checked required><label for="rating1">1</label>' +
                                '<input type="radio" id="rating2" name="rating" value="2" required><label for="rating2">2</label>' +
                                '<input type="radio" id="rating3" name="rating" value="3" required><label for="rating3">3</label>' +
                                '<input type="radio" id="rating4" name="rating" value="3" required><label for="rating4">4</label>' +
                                '<input type="radio" id="rating5" name="rating" value="5" required><label for="rating5">5</label>' +
                                '<input type="radio" id="rating6" name="rating" value="6" required><label for="rating6">6</label>' +
                                '<input type="radio" id="rating7" name="rating" value="7" required><label for="rating7">7</label>' +
                                '<input type="radio" id="rating8" name="rating" value="8" required><label for="rating8">8</label>' +
                                '<input type="radio" id="rating9" name="rating" value="9" required><label for="rating9">9</label>' +
                                '<input type="radio" id="rating10" name="rating" value="10" required><label for="rating10">10</label><br><br>';
                        }
                        else {
							formstr = '<span style="color:#9e9e9e;">'+(i+1)+') </span><label for="' + resp[i].id + '">' + resp[i].title + '</label><br><br>';
                            formstr += '<div class="ratingbar"><input type="radio" id="rating1" name="rating" value="1"><label for="rating1">1</label>' +
                                '<input type="radio" id="rating2" name="rating" value="2"><label for="rating2">2</label>' +
                                '<input type="radio" id="rating3" name="rating" value="3"><label for="rating3">3</label>' +
                                '<input type="radio" id="rating4" name="rating" value="3"><label for="rating4">4</label>' +
                                '<input type="radio" id="rating5" name="rating" value="5"><label for="rating5">5</label>' +
                                '<input type="radio" id="rating6" name="rating" value="6"><label for="rating6">6</label>' +
                                '<input type="radio" id="rating7" name="rating" value="7"><label for="rating7">7</label>' +
                                '<input type="radio" id="rating8" name="rating" value="8"><label for="rating8">8</label>' +
                                '<input type="radio" id="rating9" name="rating" value="9"><label for="rating9">9</label>' +
                                '<input type="radio" id="rating10" name="rating" value="10"><label for="rating10">10</label><br><br>';
                        }
                    }

                    var formdiv = document.getElementById("usrfrm");
                    formdiv.innerHTML += formstr; //Appending html to doc

                }

                else { //Radio button & checkbox case
                	var formdiv = document.getElementById("usrfrm");
                    formdiv.innerHTML += '<div id="listing'+resp[i].id+'"></div>';
                    tmp[resp[i].id] = resp[i]; //DIctionary mapping to maintain order as async request inside request

                    var xhttp1 = new XMLHttpRequest();
                    xhttp1.onreadystatechange = function() {

                        if (this.readyState == 4 && this.status == 200) {

                            var respurl = this.responseURL;
                            var val1 = respurl.indexOf('?question=');
                            var val2 = respurl.substr(val1 + 10);
                            var idval = parseInt(val2);
                            temp = tmp[idval];
                            var resp1 = JSON.parse(this.responseText);

                            if (temp.mandatory == true) {
                            	formstr = '<span style="color:#9e9e9e;">'+(temp.id)+') <label for="' + temp.id + '">' + temp.title + '*</label><br><br>';
                                if (temp.type == 'checkbox') {
                                    for (var j = 0; j < resp1.length; j++) {
                                        formstr += '<div><input type="' + temp.type + '" id="' + resp1[j].label + '" class="chkbx' + temp.id + '" name="' + temp.title + '" value="' + resp1[j].value + '" onclick="checkbox_check(' + temp.id + ');" oninvalid="setCustomValidity(\'Select atleast one of these options\');" required><label style="margin-right:10px;" for="' + resp1[j].label + '">' + resp1[j].label + '</label></div>';
                                    }
                                } 
                                else {
                                    for (var j = 0; j < resp1.length; j++) {
                                        formstr += '<div><input type="' + temp.type + '" id="' + resp1[j].label + '" name="' + temp.title + '" value="' + resp1[j].value + '" required><label style="margin-right:10px;" for="' + resp1[j].label + '">' + resp1[j].label + '</label></div>';
                                    }
                                }
                            }

                            else {
                            	formstr = '<div><span style="color:#9e9e9e;">'+(temp.id)+') <label for="' + temp.id + '">' + temp.title + '</label><br><br>';
                                for (var j = 0; j < resp1.length; j++) {
                                    formstr += '<div><input type="' + temp.type + '" id="' + resp1[j].label + '" name="' + temp.title + '" value="' + resp1[j].value + '"><label style="margin-right:10px;" for="' + resp1[j].label + '">' + resp1[j].label + '</label></div>';
                                }
                            }

                            formstr = formstr + '<br><br>';
                            var formdiv1 = document.getElementById("listing"+temp.id);
                            formdiv1.innerHTML += formstr; //Appending html to doc
                        }
                    };

                    var querystr = 'options?question=' + resp[i].id; //Hitting for options
                    xhttp1.open("GET", querystr, true);
                    xhttp1.send();
                }
            }
        }
    };

    xhttp.open("GET", "questions", true); //Hitting for questions
    xhttp.send();
}

function formsub() { //On form submit, this function will execute
    var frm = document.getElementById('usrfrm');
    var btn = document.getElementById('frmbtn');
    frm.remove();
    btn.remove();
    document.body.innerHTML = '<div class="subdiv"><div class="subinnerdiv"><p style="font-size: 30px;">Thank you!</p><span style="margin-left: 16px;">Survey Submitted.</span></div></div>';
}

function checkbox_check(id) { //To check if atleast one checkbox is checked
    var flag = 0;
    var chkbx = document.getElementsByClassName('chkbx' + id);
    for (var i = 0; i < chkbx.length; i++) {
        if (chkbx[i].checked) {
            flag = 1;
            break;
        }
    }

    if (flag == 0) {
        for (var i = 0; i < chkbx.length; i++) {
            chkbx[i].setCustomValidity('Select atleast one of these options');
            chkbx[i].required = true;
        }
    } else {
        for (var i = 0; i < chkbx.length; i++) {
            chkbx[i].setCustomValidity('');
            chkbx[i].required = false;
        }
    }
}
