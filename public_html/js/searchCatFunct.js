/*************************************************************************************************
*                     Search for a Category
*************************************************************************************************/

/************************************
    YOUR WEBSITE HERE
************************************/
var webURL = "http://localhost/Corvallis-Sustainability-ReUse/public_html/index.php"; //used for local development by Lauren Miller

var webURL = "";
//globals
var x;
var y;


/*
function: searchCategory()
purpose: search for a category by name
*/
function searchCategoryByName(){
    $('#table').empty();
    $.ajax({type:"GET",
    url: webURL + "/RUapi/category",
    dataType: 'json',
    success: function(data){
        var match = $('#searchName').val();
        var row = '<tr><th>' + 'Name' + '</th><th>' + 'Modify' + '</th><th>' + 'Delete' + '</th></tr>';
        for(var i = 0; i < data.length; i++){
         if(data[i].name == match){
            row += '<tr><td>' + data[i].name + '</td><td>' + '<input type= hidden id= edit value=' + data[i].id + '><input type= submit value=Edit id=edit onclick=editCategory()>' + '</td><td>' + '<input type= hidden id= delete value=' + data[i].id + '><input type= submit value=Delete id=del onclick=delCategory()>' + '</td></tr>';
         }
        }
        $('#table').append(row);
        document.getElementById("edCat").reset();
    },
  });
}


function searchCategoryById(id){
  $('#table').empty();
  $.ajax({type:"GET",
  url: webURL + "/RUapi/category/" + id,
  dataType: 'json',
  success: function(data){
    $('#EditData').empty();
    $('#EditData1').empty();
    $('#EditData2').empty();
      var row = '<tr><th>' + 'Name' + '</th><th>'  + '</th><th>' + '</th><th>'  + '</th></tr>';
      for(var i = 0; i < data.length; i++){
          row += '<tr><td>' + data[i].name + '</td><td></td><td>' + '<input type= hidden id= edit value=' + data[i].id + '><input type= submit value=Edit id=edit onclick=editCategory()>' + '</td><td>' + '<input type= hidden id= delete value=' + data[i].id + '><input type= submit value=Delete id=del onclick=delItem()>' + '</td></tr>';
      }
      $('#table').append(row);
      document.getElementById("edCat").reset();
 },
});
}

/*
function allCategories()
purpose: display all businesses
*/
function allCategories(){
    $('#table').empty();
    // var match = $('#searchName').val();
    $.ajax({type:"GET",
    url: webURL + "/RUapi/category",
    dataType: 'json',
    success: function(data){
      $('#EditData').empty();
      $('#EditData1').empty();
      $('#EditData2').empty();
        var row = '<tr><th>' + 'Name' + '</th><th>'  + '</th><th>' + '</th><th>'  + '</th></tr>';
        for(var i = 0; i < data.length; i++){
             var name = data[i].name.split(' ').join('+');
             console.log(name);
            row += '<tr><td>' + data[i].name +'</td><td></td><td>' + "<button value=" + data[i].id + " type=submit id=edit onclick='searchCategoryById(this.value); return false;'>" + 'Select' + "</button>"  + '</td><td>' + '</td></tr>';
        }
        $('#table').append(row);
    },
  });
}


/*
function: deleteCategory()
purpose: delete category by id
*/
function delCategory(){
    var match = $('#delete').val();
    x = match;
    $.ajax({type:"DELETE",
      url: webURL + "/RUapi/category/" + match,
      dataType: 'json',
      success: function(data){
    }
  });
  $('#table').empty();
  $('#EditData').empty();
  document.getElementById("edCat").reset();
}

/*
function: editCategory()
purpose: edit a category by name
*/
function editCategory(){
    var x = $('#edit').val();
    $.ajax({type:"GET",
    url: webURL + "/RUapi/category/" + x,
    dataType: 'json',
    success: function(data){
      $('#table').empty();
      var tempname = encodeURI(data[0].name);
      var bad = "%20";
      tempname = tempname.replace(/%20/g, "_");

      var formdata= '<form class="form-horizontal" role="form" action="#" id="form1">';
      formdata += '<div class="form-group">';
      formdata += '<label class="control-label col-sm-2" for="text">' + 'Edit Information:' + '</label></br>';
      formdata += '<div class="col-sm-10">';
      formdata += '<input type ="text" class="form-control" Id="searchName" value=' + tempname + ' onChange="changeName(this.value)">';
      formdata += '</div></div><p align="center"><button Id ="submit" type ="submit" class="btn btn-primary" onclick="changeCategory(); return false" align="center">Update Category</button></p>';
      formdata += '</form>';
      $('#EditData').html(formdata);
    }
  });
}

/* helper functions for onchange events while changing info */
function changeName(value) {

      y = value;
}


/*
function: changeCategory()
purpose: sends the new information for updating the category
*/
function changeCategory(){
  console.log(x);
  console.log(y);
  $.ajax({type:"GET",
    url: webURL + "/RUapi/category/" + x,
    dataType: 'json',
    success: function(data){
       var tableData = "name="+y+"&oldName="+x;
        $.ajax({type:"POST",
            url: webURL + "/RUapi/changeCategory",
            data: tableData,
            success: function(){
              $('#form1').empty();
              $('#table').empty();
            },
        });
      $('#EditData').empty();
    }
  });
}

/*
function: checkSession()
purpose: checks for being logged in with active session
*/
function checkSession(){

    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
     if(req.readyState == 4 && req.status == 200){

        if(req.responseText == 1){
          /* everything has passed! Yay! Go into your session */
          //window.alert("You are not logged in! You will be redirected.");
          window.location.href = webURL + "loginPage.php";
        }
      }
    }

    /* send data to create table */
    req.open("POST","checkSession.php", true);
    req.send();
}
