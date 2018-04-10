/*
Techdegree| Project 10
=====================================================================================
by Humberto Ventura
=================================================================
*/

/*read doc upon reading javacript*/
$(document).ready(()=>{
 // basic variables
	const employeew = document.getElementById('employee');
	const overlayw = document.getElementById('overlay-wrapper');
	// number of employees
	const totaldisplay = 16;
	
	// array to store user info from the JSON file
    let UserInfo = [];
 
 
 /*info*/
 
  /*employee function to store user data*/
  
 function getUser(userDetails) {
      for (let i = 0; i < userDetails.length; i++) {
        let employee = userDetails[i];
        let name = employee.name.first + ' ' + employee.name.last;
        let avatar = employee.picture.large;
        let email = employee.email;
        let city = employee.location.city;
		let cell = employee.cell;
		let address = employee.location.street + ', ' + employee.location.city + ', ' + employee.location.state + ' ' + employee.location.postcode;
		
          // store info
        UserInfo.push({
          "index" : i,
          "img": avatar,
          "name": name,
          "email" : email,
          "city" : city,
		  "cell" : cell,
		  "address" : address
		  
        });
      }
  } // end of the details request

/*this function diplays the employee divs and places on its elements the user details stored in UserInfo*/

function displayEmployee(employee) {
	  let employeehtml = '<div class="employee" data-index="'+ employee.index + '">';
    employeehtml  += '<img class="avatar" data-index="' + employee.index + '" src="' + employee.img + ' " alt=" ' + employee.name + ' ' + employee.username + ' ">';
    employeehtml  += '<div data-index="'+employee.index+'">';
    employeehtml  += '<p class="name" data-index="'+employee.index+'">' + employee.name + '<p>';
    employeehtml += '<p class="email" data-index="'+employee.index+'">' + employee.email + '</p>';
    employeehtml  += '<p class="city" data-index="'+employee.index+'">' + employee.city + '</p>';
    employeehtml  += '</div></div>';

    $("#employee").append(employeehtml);

  }




/*request*/

 $.ajax({
    url: 'https://randomuser.me/api/?results='+totaldisplay+'&inc=name,picture,email,login,location,dob,cell&nat=us',
    dataType: 'json',
    error: function() {
      console.error("Couldn't get users from API");
    },
    success: function(data) {
      getUser(data.results);
      for (let i = 0; i < totaldisplay; i++) {
        displayEmployee(UserInfo[i]);
      }
    }
  });
 

  /*modal*/
  
  /*creating overlay squre to show User Details*/
  
  /*this function shows the Detail User Info upon click, upon background overlay, shows elements by selecting index and exposing from UserInfo array */
   function displayOverlay(employee) {       
    let overlay = $('#overlay-square');

    let overlayhtml = '<div id="overlay"><span id="close" class="close">&times;</span>';
    overlayhtml += '<img class="avatar" data-index="' + employee.index + '" src="' + employee.img + ' " alt=" ' + employee.name + ' ' + employee.userName + ' ">';
    overlayhtml += '<p class="name">' + employee.name + '</p>';
    overlayhtml += '<p class="email">'+ employee.email + '</p>';
	overlayhtml += '<p class="cell">'+ employee.cell + '</p>';
    overlayhtml += '<p class="address">'+ employee.address + '</p>';
    overlayhtml += '</div>';

    overlay.html(overlayhtml);
  } //end setOverlay



//onclick
 $(employeew).on('click', '.employee', e => {
	 // target overlay wrapper 
    overlayw.style.display = "block";
    let selected = e.target; 
    let index = $(selected).data('index'); 
    displayOverlay(UserInfo[index]);
  });

// click on overlay to close
 window.onclick = function(event) {
    if (event.target == overlayw) {
      $('#overlay').text('');
      $("#overlay").css("display", "none");
      $("#overlay-wrapper").css("display", "none");
    }    
  };
 
 // click on #close to close
  $('#overlay-wrapper').on('click', '#close', e=> {
    $('#overlay').text('');
    $("#overlay").css("display", "none");
    $("#overlay-wrapper").css("display", "none");
  }); 
 
 // arrows
 
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  
  /*previous*/
    previous.onclick = function(totaldisplay) {
    let current= document.getElementById('close').nextSibling.getAttribute('data-index'); // get the index of the user, store in data-index atribute
    let previousEmployee = Number(current) - 1;
    let lastEmployee = Number(current) + totaldisplay-1;
	// set last employee if current is zero
    if (current == 0) {
		// get user details array upon navigation
      displayOverlay(UserInfo[lastEmployee]);
    }
    else { 
      displayOverlay(UserInfo[previousEmployee]);
    }
  };
  
  /*next*/
    next.onclick = function(totaldisplay) {
    let current= document.getElementById('close').nextSibling.getAttribute('data-index');
	let nextEmployee = Number(current) + 1;
    let firstEmployee = Number(current) - totaldisplay-1;
	if (current > totaldisplay-1) {
      displayOverlay(UserInfo[firstEmployee]);
    }
    else { 
      displayOverlay(UserInfo[nextEmployee]);
    }
  };
  
  
  /*search, this function uses keyup() from JQuery libraries*/
  
  const Search = document.querySelector("input[id='user-search']");
  /*keyup - activate event handler when a key is released*/
  $(Search).keyup(function(){
    // get input field text 
    var filter = $(this).val();
    // loop trought image avatar alt attribute names, the .avatar class targets the img tag and the names are stored in the attributes, accessed by attr()
    $(".avatar").each(function(){
        var employeename = $(this).attr('alt').search(new RegExp(filter, "i"));
		// if employee name is less or equal to zero matches hide, else show
        if (employeename < 0 || employeename == 0) {  
            $(this).parent().hide();
        } else {
            $(this).parent().show();
        }
    });
  });

  
  
}); //end document. ready