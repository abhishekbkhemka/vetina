
var jsonPath = "/assets/js/products.php/";
var productdata = ''
var companion = ''
// For Companion

function getAllData(){
  $.ajax({
    type:"GET",
    url:jsonPath,
    success:function(data){
      productdata = data;
      companion = productdata.companion
      listCategories(companion)
      let prodArr = []
      for(let i in companion){
        let allValues = companion[i]
        for(let j=0;j<allValues.length;j++){
          prodArr.push(allValues[j])
        }
      }
      getProducts(prodArr)
    },
    error: function (data){
      alert("Something went wrong. Please try again.")
  },
  })
}
getAllData()


function getCompanionData(){
  $("#productId").empty();
  $("#product-subcategory-list").empty();
 let compnionData = productdata.companion;
 console.log("THE COMPANION TYPE IS HERE-->>>",typeof compnionData)
 listCategories(compnionData);
 let prodArr = []
 for(let i in compnionData){
  let allValues = compnionData[i]
  for(let j=0;j<allValues.length;j++){
    prodArr.push(allValues[j])
  }
}
getProducts(prodArr)
}

function getProducts(prod){
  if(prod.length == 0){
    $("#companionID").show()
  }else{
    $("#companionID").hide()
  }
  for (var i of prod){
    console.log("THE ID ISNHERE-->>>>",i.imageUrl)
      $("#productId").append('<div class="col-md-4 product-blocks" ><div class="img-product-blocks" onclick="getSingleProductCompanion(this)"> '+i.imageUrl+' <span style="display:none">'+i.type+'</span> <span style="display:none">'+i.category+'</span><input type="hidden" value="'+i.id+'"></div><h6>' + i.name + '</h6><div class="listLayoutViewBtn" onclick="getSingleProductCompanion(this)"><span style="display:none">'+i.type+'</span> <span style="display:none">'+i.category+'</span><input type="hidden" value="'+i.id+'">View More</div></div>')
  }
}


function listCategories(category){
  const result = {};
  Object.keys(category).forEach(function (key) {
    result[key.replace(/_/g, ' ')] = category[key];
  });
  for (var i in result) {
    var res = i.replace(/ /g, '_');
      $('#product-subcategory-list').append('<li class="checkbox-wrapper" ><input type="checkbox" name="companion" class="'+res+'" onclick="companionCheck()" id="' + i + '" value="' + i + '"><label for="' + i + '">' + i +'('+category[res].length+')'+'</label></li>');
  }
}


var productArray = []
function companionCheck(){
 $("#productId").empty();
 $('input[type="checkbox"]').off('change' );
 $('input[type="checkbox"]').on('change', function() {
   let type = this.value;
   let result = type.replace(/ /g, '_');
   let is_checked = $('.'+result).prop('checked');
   if(is_checked){
     for(let i in companion){
     var allValues = companion[i];
     if(result == i){
       for(let j=0;j<allValues.length;j++){
         productArray.push(allValues[j]);
       }
     }
   }
   getProducts(productArray);
   }else{
     for(let p in companion){
       if(p === result){
         for(let y of companion[p]){
           let index = productArray.findIndex(x => x === y);
          var arrr =  productArray.splice(index,1)
         }
       }
     }
     getProducts(productArray);
   }
 });
}


function searchCompanion(data){
  $("#productId").empty();
  let inputValue = data.value
  let serachValue = inputValue.toUpperCase()
  let prodArr = []
  for(let i in companion){
    let allValues = companion[i]
    for(let j=0;j<allValues.length;j++){
      let name = allValues[j].name;
      if(name.toUpperCase().indexOf(serachValue) > -1){
        prodArr.push(allValues[j]);
      }
    }
  }
  
  getProducts(prodArr)
  
}


function getSingleProductCompanion(data){
var listInfo = '';
 listInfo= data.getElementsByTagName("input")[0].value;
 spanInfo= data.getElementsByTagName("span")[0].innerHTML;
 categoryInfo= data.getElementsByTagName("span")[1].innerHTML;
  var openModal = document.getElementById("open-modal");
  var addModalCont = document.getElementById("product-modal-content");
  for(let comp in companion){
    if(comp == categoryInfo){
        for(let y of companion[comp]){
          if(y.id == listInfo){
            openModal.classList.add("open");
            addModalCont.innerHTML = y.body;
          }
        }
     }
   }
}


// For ruminant

function ruminant(value){
  $("#ruminantId").empty();
  $("#ruminant-subcategory-list").empty();
  let ruminionData = productdata.ruminant;
  console.log("INSIDE ruminant",ruminionData)
  listCategoriesRuminian(ruminionData);
  let prodArr = []
  for(let i in ruminionData){
    let allruminionData = ruminionData[i]
    for(let j=0;j<allruminionData.length;j++){
      prodArr.push(allruminionData[j])
    }
  }
  getProductsRuminian(prodArr)

}



function getProductsRuminian(prod){
  if(prod.length == 0){
    $("#ruminantID").show()
  }else{
    $("#ruminantID").hide()
  }
  for (var i of prod){
      $("#ruminantId").append('<div class="col-md-4 product-blocks" ><div class="img-product-blocks" onclick="getSingleProductRuminant(this)">'+i.imageUrl+'<span style="display:none">'+i.type+'</span> <span style="display:none">'+i.category+'</span><input type="hidden" value="'+i.id+'"></div> <h6>' + i.name + '</h6><div class="listLayoutViewBtn" onclick="getSingleProductRuminant(this)"><span style="display:none">'+i.type+'</span> <span style="display:none">'+i.category+'</span><input type="hidden" value="'+i.id+'">View More</div></div>')
  }
}



function listCategoriesRuminian(category){
  const result = {};
  Object.keys(category).forEach(function (key) {
    result[key.replace(/_/g, ' ')] = category[key];
  });
  for (var i in result) {
     let res = i.replace(/ /g, '_');
      $('#ruminant-subcategory-list').append('<li class="checkbox-wrapper" ><input type="checkbox" name="catagory" class="'+res+'" onclick="ruminantCheck()" id="' + i + '" value="' + i + '"><label for="' + i + '">' + i +'('+category[res].length+')'+'</label></li>');
  }
}


var ruminantArray = []
function ruminantCheck(){
 $("#ruminantId").empty();
 $('input[type="checkbox"]').off('change' );
 $('input[type="checkbox"]').on('change', function() {
   let type = this.value;
   let result = type.replace(/ /g, '_');
   let is_checked = $('.'+result).prop('checked');
   let ruminantData = productdata.ruminant
   console.log("THIS VALUE IS HEER--->>>",$('.'+result).length,is_checked)
   if(is_checked){
     for(let i in ruminantData){
     var allValues = ruminantData[i];
     if(result == i){
       for(let j=0;j<allValues.length;j++){
         ruminantArray.push(allValues[j]);
       }
     }
   }
   getProductsRuminian(ruminantArray);
   }else{
     for(let p in ruminantData){
       if(p === result){
         for(let y of ruminantData[p]){
           let index = ruminantArray.findIndex(x => x === y);
          var arrr =  ruminantArray.splice(index,1)
         }
       }
     }
     getProductsRuminian(ruminantArray);
   }
 });
}



function searchRuminion(data){
  $("#ruminantId").empty();
  let inputValue = data.value
  let serachValue = inputValue.toUpperCase()
  let prodArr = []
  let ruminantData = productdata.ruminant
  for(let i in ruminantData){
    let allValues = ruminantData[i]
    for(let j=0;j<allValues.length;j++){
      let name = allValues[j].name;
      if(title.toUpperCase().indexOf(serachValue) > -1 || name.toUpperCase().indexOf(serachValue) > -1){
        prodArr.push(allValues[j]);
      }
    }
  }
  getProductsRuminian(prodArr)
}


function getSingleProductRuminant(data){
var listInfo = '';
 listInfo= data.getElementsByTagName("input")[0].value;
 spanInfo= data.getElementsByTagName("span")[0].innerHTML;
 categoryInfo= data.getElementsByTagName("span")[1].innerHTML;
 let ruminantData = productdata.ruminant;
  var frameModal= document.getElementById("open-modal");
  var frameModalCont= document.getElementById("product-modal-content");
  for(let rumi in ruminantData){
    if(rumi == categoryInfo){
        for(let y of ruminantData[rumi]){
          if(y.id == listInfo){
            frameModal.classList.add("open");
            frameModalCont.innerHTML = y.body;
          }
        }
     }
   }
}


// For poultry and Aqua

function poultry(value){
  $("#poultryId").empty();
  $("#poultry-subcategory-list").empty();
  let poultryData = productdata.poultry;
  listCategoriesPoultry(poultryData);
  let prodArr = []
  for(let i in poultryData){
    let allpoultryData = poultryData[i]
    for(let j=0;j<allpoultryData.length;j++){
      prodArr.push(allpoultryData[j])
    }
  }
  getProductsPoultry(prodArr);
}



function getProductsPoultry(prod){
  if(prod.length == 0){
    $("#poultryID").show()
  }else{
    $("#poultryID").hide()
  }
  for (var i of prod){
    $("#poultryId").append('<div class="col-md-4 product-blocks" ><div class="img-product-blocks" onclick="getSingleProductPoultry(this)">'+i.imageUrl+'<span style="display:none">'+i.type+'</span> <span style="display:none">'+i.category+'</span><input type="hidden" value="'+i.id+'"></div> <h6>' + i.name + '</h6><div class="listLayoutViewBtn" onclick="getSingleProductPoultry(this)"><span style="display:none">'+i.type+'</span> <span style="display:none">'+i.category+'</span><input type="hidden" value="'+i.id+'">View More</div></div>')
  }
}


function listCategoriesPoultry(category){
  const result = {};
  Object.keys(category).forEach(function (key) {
    result[key.replace(/_/g, ' ')] = category[key];
  });
  for (var i in result) {
      let res = i.replace(/ /g, '_');
      $('#poultry-subcategory-list').append('<li class="checkbox-wrapper" ><input type="checkbox" name="catagory" class="'+res+'" onclick="poultryCheck()" id="' + i + '" value="' + i + '"><label for="' + i + '">' + i +'('+category[res].length+')'+'</label></li>');
  }
}


var poultryArray = []
function poultryCheck(){
 $("#poultryId").empty();
 $('input[type="checkbox"]').off('change' );
 $('input[type="checkbox"]').on('change', function() {
   let type = this.value;
   let result = type.replace(/ /g, '_');
   let is_checked = $('.'+result).prop('checked');
   let poultryData = productdata.poultry;
   if(is_checked){
     for(let i in poultryData){
     var allValues = poultryData[i];
     if(result == i){
       for(let j=0;j<allValues.length;j++){
         poultryArray.push(allValues[j]);
       }
     }
   }
   getProductsPoultry(poultryArray);
   }else{
     for(let p in poultryData){
       if(p === result){
         for(let y of poultryData[p]){
           let index = poultryArray.findIndex(x => x === y);
          var arrr =  poultryArray.splice(index,1)
         }
       }
     }
     getProductsPoultry(poultryArray);
   }
 });
}


function searchPoultry(data){
  $("#poultryId").empty();
  let inputValue = data.value
  let serachValue = inputValue.toUpperCase()
  let prodArr = []
  let poultryData = productdata.poultry;
  for(let i in poultryData){
    let allValues = poultryData[i]
    for(let j=0;j<allValues.length;j++){
      let name = allValues[j].name;
      if(name.toUpperCase().indexOf(serachValue) > -1){
        prodArr.push(allValues[j]);
      }
    }
  }
  getProductsPoultry(prodArr)
}


function getSingleProductPoultry(data){
var listInfo = '';
 listInfo= data.getElementsByTagName("input")[0].value;
 spanInfo= data.getElementsByTagName("span")[0].innerHTML;
 categoryInfo= data.getElementsByTagName("span")[1].innerHTML;
 let poultryData = productdata.poultry;
 
  var frameModal= document.getElementById("open-modal");
  var frameModalCont= document.getElementById("product-modal-content");
  for(let pol in poultryData){
    if(pol == categoryInfo){
        for(let y of poultryData[pol]){
          if(y.id == listInfo){
            frameModal.classList.add("open");
            frameModalCont.innerHTML = y.body;
          }
        }
     }
   }
}


// For Swine

function swine(value){
  $("#swineId").empty();
  $("#swine-subcategory-list").empty();
  let swineData = productdata.swine;
  listCategoriesSwine(swineData);
  let prodArr = []
  for(let i in swineData){
    let allswineData = swineData[i]
    for(let j=0;j<allswineData.length;j++){
      prodArr.push(allswineData[j])
    }
  }
  getProductsSwine(prodArr);
}


function getProductsSwine(prod){
  if(prod.length == 0){
    $("#swineID").show()
  }else{
    $("#swineID").hide()
  }
  for (var i of prod){
    $("#swineId").append('<div class="col-md-4 product-blocks" ><div class="img-product-blocks" onclick="getSingleProductSwine(this)">'+i.imageUrl+'<span style="display:none">'+i.type+'</span> <span style="display:none">'+i.category+'</span><input type="hidden" value="'+i.id+'"></div> <h6>' + i.name + '</h6><div class="listLayoutViewBtn" onclick="getSingleProductSwine(this)"><span style="display:none">'+i.type+'</span> <span style="display:none">'+i.category+'</span><input type="hidden" value="'+i.id+'">View More</div></div>')
  }
  }


function listCategoriesSwine(category){
  const result = {};
  Object.keys(category).forEach(function (key) {
    result[key.replace(/_/g, ' ')] = category[key];
  });
  for (var i in result) {
  let res = i.replace(/ /g, '_');
  $('#swine-subcategory-list').append('<li class="checkbox-wrapper" ><input type="checkbox" name="catagory" class="'+res+'" onclick="swineCheck()" id="' + i + '" value="' + i + '"><label for="' + i + '">' + i +'('+category[res].length+')'+'</label></li>');
}


}

var swineArray = []
function swineCheck(){
 $("#swineId").empty();
 $('input[type="checkbox"]').off('change' );
 $('input[type="checkbox"]').on('change', function() {
   let type = this.value;
   let result = type.replace(/ /g, '_');
   let is_checked = $('.'+result).prop('checked');
   let swineData = productdata.swine;
   if(is_checked){
     for(let i in swineData){
     var allValues = swineData[i];
     if(result == i){
       for(let j=0;j<allValues.length;j++){
         swineArray.push(allValues[j]);
       }
     }
   }
   getProductsSwine(swineArray);
   }else{
     for(let p in swineData){
       if(p === result){
         for(let y of swineData[p]){
           let index = swineArray.findIndex(x => x === y);
          var arrr =  swineArray.splice(index,1)
         }
       }
     }
     getProductsSwine(swineArray);
   }
 });
}


function searchSwine(data){
  $("#swineId").empty();
  let inputValue = data.value
  let serachValue = inputValue.toUpperCase()
  let prodArr = []
  let swineData = productdata.swine;
  for(let i in swineData){
    let allValues = swineData[i]
    for(let j=0;j<allValues.length;j++){
      let name = allValues[j].name;
      if(name.toUpperCase().indexOf(serachValue) > -1){
        prodArr.push(allValues[j]);
      }
    }
  }
  getProductsSwine(prodArr)
}


function getSingleProductSwine(data){
var listInfo = '';
 listInfo= data.getElementsByTagName("input")[0].value;
 spanInfo= data.getElementsByTagName("span")[0].innerHTML;
 categoryInfo= data.getElementsByTagName("span")[1].innerHTML;
 let swineData = productdata.swine;
  var frameModal= document.getElementById("open-modal");
  var frameModalCont= document.getElementById("product-modal-content");
  for(let pol in swineData){
    if(pol == categoryInfo){
        for(let y of swineData[pol]){
          if(y.id == listInfo){
            frameModal.classList.add("open");
            frameModalCont.innerHTML = y.body;
          }
        }
     }
   }
}

