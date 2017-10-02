
var timeOut;
class Item {
    constructor(icon, backgroundColor) {
        this.$element = $(document.createElement("div"));
        this.icon = icon;
        this.$element.addClass("item");
        this.$element.css("background-color", backgroundColor);
        var i = document.createElement("i");
        $(i).addClass("fi-" + icon);
        this.$element.append(i);
        this.prev = null;
        this.next = null;
        this.isMoving = false;
        var element = this;
        this.$element.on("mousemove", function() {
            clearTimeout(timeOut);
            timeOut = setTimeout(function() {
                if (element.next && element.isMoving) {
                    element.next.moveTo(element);
                }
            }, 10);
        });
    }

    moveTo(item) {
        anime({
            targets: this.$element[0],
            left: item.$element.css("left"),
            top: item.$element.css("top"),
            duration: 700,
            elasticity: 500
        });
        if (this.next) {
            this.next.moveTo(item);
        }
    }

    updatePosition() {
        anime({
            targets: this.$element[0],
            left: this.prev.$element.css("left"),
            top: this.prev.$element.css("top"),
            duration: 200
        });

        if (this.next) {
            this.next.updatePosition();
        }
    }
}

class Menu {
    constructor(menu) {
        this.$element = $(menu);
        this.size = 0;
        this.first = null;
        this.last = null;
        this.timeOut = null;
        this.hasMoved = false;
        this.status = "open";
    }

    add(item) {
        var menu = this;
        if (this.first == null) {
            this.first = item;
            this.last = item;
            this.first.$element.on("mouseup", function() {
                if (menu.first.isMoving) {
                    menu.first.isMoving = false;
                } else {
                    menu.click();
                }
            });
            item.$element.draggable(
                {
                    start: function() {
                        menu.close();
                        item.isMoving = true;
                    }
                },
                {
                    drag: function() {
                        if (item.next) {
                            item.next.updatePosition();
                        }
                    }
                },
                {
                    stop: function() {
                        item.isMoving = false;
                        item.next.moveTo(item);
                    }
                }
            );
        } else {
            this.last.next = item;
            item.prev = this.last;
            this.last = item;
        }
        this.$element.after(item.$element);


    }

    open() {
        this.status = "open";
        var current = this.first.next;
        var iterator = 1;
        var head = this.first;
        var sens = head.$element.css("left") < head.$element.css("right") ? 1 : -1;
        while (current != null) {
            anime({
                targets: current.$element[0],
                left: parseInt(head.$element.css("left"), 10) + (sens * (iterator * 50)),
                top: head.$element.css("top"),
                duration: 500
            });
            iterator++;
            current = current.next;
        }
    }

    close() {
        this.status = "closed";
        var current = this.first.next;
        var head = this.first;
        var iterator = 1;
        while (current != null) {
            anime({
                targets: current.$element[0],
                left: head.$element.css("left"),
                // top: head.$element.css("top"),
                duration: 500
            });
            iterator++;
            current = current.next;
        }
    }

    click() {
        if (this.status == "closed") {
            this.open();
        } else {
            this.close();
        }
    }

}

var menu = new Menu("#myMenu");
var item1 = new Item("trees", "#A2DED0");
var item2 = new Item("plus", "#F15F79");
var item3 = new Item("minus", "#5CD1FF");
var item4 = new Item("page-edit", "#FFF15C");
var item5 = new Item("home", "#64F592");

menu.add(item1);
menu.add(item2);
menu.add(item3);
menu.add(item4);
menu.add(item5);
$(document).delay(50).queue(function(next) {
    menu.open();
    next();
    $(document).delay(1000).queue(function(next) {
        menu.close();
        next();
    });
});

/*SETTING PLUS BUTTON ON CLICK */
 var addButton = document.querySelector('.fi-plus');
 addButton.addEventListener('click', function() {
   var id = document.getElementById('idInput').value;
   var pageType = document.getElementById('pageTypeInput').value;

   if(pageType === 'business'){
     document.location.href = "addBusinessPage.php";
   }
   if(pageType === 'category'){
     document.location.href = "addCategoryPage.php";
   }
   if(pageType === 'item'){
     document.location.href = "addItemPage.php";
   }

});


 /*SETTING MINUS BUTTON ON CLICK */
 var minusItem = document.querySelector('.fi-minus');
  minusItem.addEventListener('click', function() {
   var id = document.getElementById('idInput').value;
   var pageType = document.getElementById('pageTypeInput').value;

   //If  on single business page
   if(pageType === 'business'){
    //  var confirmation = confirm("Are you sure you want to delete this business?");
     deleteBusiness(id);
   }//end of if business page

   if(pageType === 'item'){
     deleteItem(id);
   }

   if(pageType === 'category'){
     deleteCategory(id);
   }


 });

/*SETTING PAGE EDIT BUTTON ON CLICK */
 var pageEditButton = document.querySelector('.fi-page-edit');
 pageEditButton.addEventListener('click', function() {
   var id = document.getElementById('idInput').value;
   var pageType = document.getElementById('pageTypeInput').value;

   if(pageType === 'business'){
      editBusiness(id);
   }
   if(pageType === 'category'){
      editCategory(id);
   }
   if(pageType === 'item'){
      editItem(id);
   }

});

 var homeItem = document.querySelector('.fi-home');
 homeItem.addEventListener('click', function() {
   document.location.href = "main.php";
  });

  /*********** BUSINESS OPERATIONS ****************/

  function editBusiness(id){
    $("input").prop('disabled', false);
    $(".whenDisabled").hide();
    $(".whenEnabled").show();
    $("#save").show();
    $(".box-detail.grid-only").addClass("centerTime");
    $("span.below-line").addClass("centerPhone");
  }


  function deleteBusiness(id){

    var confirmation = confirm("Are you sure you want to delete this business?");
     if (confirmation){
       /*Delete*/
       $.ajax({
           type: "DELETE",
           url: "/RUapi/business/"+ id,
           dataType: 'json',
           success: function(msg) {
             console.log(msg)
           },
       });
       document.location.href = "allBusinessesPage.php";
       }
       else{ //Do nothing
         return false;
     }
  }


  /*********** ITEM OPERATIONS ****************/

//*Add item is up there, it just takes you to the add item page.

  function editItem(id){
    $("input").prop('disabled', false);
    $(".whenDisabled").hide();
    $(".whenEnabled").show();
    $("#save").show();
  }


  function deleteItem(id){
    /*Delete*/
    var confirmation = confirm("Are you sure you want to delete this item?");
    if (confirmation){
      /*Delete*/
      $.ajax({
          type: "DELETE",
          url: "/RUapi/item/"+ id,
          dataType: 'json',
          success: function(msg) {
            console.log(msg)
          },
      });
      document.location.href = "allItemsPage.php";
    }
    else{
      return false;
    }
  }



  /*********** CATEGORY OPERATIONS ****************/

  function editCategory(id){
    $("input").prop('disabled', false);
    $(".whenDisabled").hide();
    $(".whenEnabled").show();
    $("#save").show();
  }


  function deleteCategory(id){
    /*Delete*/
    var confirmation = confirm("Are you sure you want to delete this category?");
    if (confirmation){
      /*Delete*/
      $.ajax({
          type: "DELETE",
          url: "/RUapi/category/"+ id,
          dataType: 'json',
          success: function(msg) {
            console.log(msg)
          },
      });
    document.location.href = "allCategoriesPage.php";
  }
  else{
      return false;
    }
  }


  /*****/
