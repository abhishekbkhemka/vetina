var jsonPath = "/assets/js/products.php/";
var productdata = "";
var companion = "";
var productArray = [];
var getChecked = [];
var checkedVal = "";
var is_checked_com = "";
// For Companion

function companionFunc() {
  console.log("INSIDE COMPANION-->>>>");
  productArray = [];
  getChecked = [];
}

function getAllData() {
  $.ajax({
    type: "GET",
    url: jsonPath,
    success: function(data) {
      productdata = data;
      companion = productdata.companion;
      listCategories(companion);
      let prodArr = [];
      for (let com in companion) {
        let allValues = companion[com];
        for (let prod = 0; prod < allValues.length; prod++) {
          prodArr.push(allValues[prod]);
        }
      }
      getProducts(prodArr);
    },
    error: function(data) {
      alert("Something went wrong. Please try again.");
    }
  });
}
getAllData();

function getCompanionData() {
  $("#productId").empty();
  $("#product-subcategory-list").empty();
  let compnionData = productdata.companion;
  listCategories(compnionData);
  let prodArr = [];
  for (let com in compnionData) {
    let allValues = compnionData[com];
    for (let prod = 0; prod < allValues.length; prod++) {
      prodArr.push(allValues[prod]);
    }
  }
  getProducts(prodArr);
}

function getProducts(prod) {
  if (prod.length == 0) {
    $("#companionID").show();
  } else {
    $("#companionID").hide();
  }
  for (var pd of prod) {
    $("#productId").append(
      '<div class="col-md-4 product-blocks" ><div class="img-product-blocks" onclick="getSingleProductCompanion(this)"> ' +
        pd.imageUrl +
        ' <span style="display:none">' +
        pd.type +
        '</span> <span style="display:none">' +
        pd.category +
        '</span><input type="hidden" value="' +
        pd.id +
        '"></div><h6>' +
        pd.name +
        '</h6><div class="listLayoutViewBtn" onclick="getSingleProductCompanion(this)"><span style="display:none">' +
        pd.type +
        '</span> <span style="display:none">' +
        pd.category +
        '</span><input type="hidden" value="' +
        pd.id +
        '">View More</div></div>'
    );
  }
}

function listCategories(category) {
  const result = {};
  Object.keys(category).forEach(function(key) {
    result[key.replace(/_/g, " ")] = category[key];
  });
  for (var op in result) {
    var res = op.replace(/ /g, "_");
    $("#product-subcategory-list").append(
      '<li class="checkbox-wrapper" ><input type="checkbox" name="companion" class="' +
        res +
        '" onclick="companionCheck()" id="' +
        op +
        '" value="' +
        op +
        '"><label for="' +
        op +
        '">' +
        op +
        "(" +
        category[res].length +
        ")" +
        "</label></li>"
    );
  }
}

function companionCheck() {
  $("#productId").empty();
  $('input[type="checkbox"]').off("change");
  $('input[type="checkbox"]').on("change", function() {
    let type = this.value;
    checkedVal = type.replace(/ /g, "_");
    getChecked.push(checkedVal);
    is_checked_com = $("." + checkedVal).prop("checked");
    if (is_checked_com) {
      for (let i in companion) {
        var allValues = companion[i];
        if (checkedVal == i) {
          for (let j = 0; j < allValues.length; j++) {
            productArray.push(allValues[j]);
          }
        }
      }
      getProducts(productArray);
    } else {
      for (let com in companion) {
        if (com === checkedVal) {
          for (let y of companion[com]) {
            let index = productArray.findIndex(x => x === y);
            productArray.splice(index, 1);
          }
        }
      }
      if (productArray.length == 0) {
        getCompanionData();
      } else {
        getProducts(productArray);
      }
    }
  });
}

function searchCompanion(data) {
  $("#productId").empty();
  let inputValue = data.value;
  let serachValue = inputValue.toUpperCase();
  let prodArr = [];
  for (let i in companion) {
    let allValues = companion[i];
    for (let j = 0; j < allValues.length; j++) {
      let name = allValues[j].name;
      if (name.toUpperCase().indexOf(serachValue) > -1) {
        prodArr.push(allValues[j]);
      }
    }
  }
  if (inputValue.length == 0 && checkedVal) {
    getCheckSearch();
  } else {
    getProducts(prodArr);
  }
}

function getCheckSearch() {
  productArray = [];
  for (let com in companion) {
    for (let check of getChecked) {
      var allValues = companion[check];
      if (check == com) {
        for (let prod = 0; prod < allValues.length; prod++) {
          productArray.push(allValues[prod]);
        }
      }
    }
  }
  getProducts(productArray);
}

function getSingleProductCompanion(data) {
  var listInfo = "";
  listInfo = data.getElementsByTagName("input")[0].value;
  spanInfo = data.getElementsByTagName("span")[0].innerHTML;
  categoryInfo = data.getElementsByTagName("span")[1].innerHTML;
  var openModal = document.getElementById("open-modal");
  var addModalCont = document.getElementById("product-modal-content");
  for (let comp in companion) {
    if (comp == categoryInfo) {
      for (let y of companion[comp]) {
        if (y.id == listInfo) {
          openModal.classList.add("open");
          addModalCont.innerHTML = y.body;
        }
      }
    }
  }
}

// For ruminant

var ruminantArray = [];
var rumChecked = "";

function ruminantFunc() {
  ruminantArray = [];
}

function ruminant() {
  $("#ruminantId").empty();
  $("#ruminant-subcategory-list").empty();
  let ruminionData = productdata.ruminant;
  listCategoriesRuminian(ruminionData);
  let prodArr = [];
  for (let rumi in ruminionData) {
    let allruminionData = ruminionData[rumi];
    for (let prod = 0; prod < allruminionData.length; prod++) {
      prodArr.push(allruminionData[prod]);
    }
  }
  getProductsRuminian(prodArr);
}

function getProductsRuminian(prod) {
  if (prod.length == 0) {
    $("#ruminantID").show();
  } else {
    $("#ruminantID").hide();
  }
  for (var op of prod) {
    $("#ruminantId").append(
      '<div class="col-md-4 product-blocks" ><div class="img-product-blocks" onclick="getSingleProductRuminant(this)">' +
        op.imageUrl +
        '<span style="display:none">' +
        op.type +
        '</span> <span style="display:none">' +
        op.category +
        '</span><input type="hidden" value="' +
        op.id +
        '"></div> <h6>' +
        op.name +
        '</h6><div class="listLayoutViewBtn" onclick="getSingleProductRuminant(this)"><span style="display:none">' +
        op.type +
        '</span> <span style="display:none">' +
        op.category +
        '</span><input type="hidden" value="' +
        op.id +
        '">View More</div></div>'
    );
  }
}

function listCategoriesRuminian(category) {
  const result = {};
  Object.keys(category).forEach(function(key) {
    result[key.replace(/_/g, " ")] = category[key];
  });
  for (var i in result) {
    let res = i.replace(/ /g, "_");
    $("#ruminant-subcategory-list").append(
      '<li class="checkbox-wrapper" ><input type="checkbox" name="catagory" class="' +
        res +
        '" onclick="ruminantCheck()" id="' +
        i +
        '" value="' +
        i +
        '"><label for="' +
        i +
        '">' +
        i +
        "(" +
        category[res].length +
        ")" +
        "</label></li>"
    );
  }
}

function ruminantCheck() {
  $("#ruminantId").empty();
  $('input[type="checkbox"]').off("change");
  $('input[type="checkbox"]').on("change", function() {
    let type = this.value;
    rumChecked = type.replace(/ /g, "_");
    let is_checked = $("." + rumChecked).prop("checked");
    let ruminantData = productdata.ruminant;
    if (is_checked) {
      for (let rumi in ruminantData) {
        var allValues = ruminantData[rumi];
        if (rumChecked == rumi) {
          for (let prod = 0; prod < allValues.length; prod++) {
            ruminantArray.push(allValues[prod]);
          }
        }
      }
      getProductsRuminian(ruminantArray);
    } else {
      for (let rumi in ruminantData) {
        if (rumi === rumChecked) {
          for (let prod of ruminantData[rumi]) {
            let index = ruminantArray.findIndex(prodVal => prodVal === prod);
            ruminantArray.splice(index, 1);
          }
        }
      }
      if (ruminantArray.length == 0 && rumChecked) {
        ruminant();
      } else {
        getProductsRuminian(ruminantArray);
      }
    }
  });
}

function searchRuminion(data) {
  $("#ruminantId").empty();
  let inputValue = data.value;
  let serachValue = inputValue.toUpperCase();
  let prodArr = [];
  let ruminantData = productdata.ruminant;
  for (let i in ruminantData) {
    let allValues = ruminantData[i];
    for (let j = 0; j < allValues.length; j++) {
      let name = allValues[j].name;
      if (name.toUpperCase().indexOf(serachValue) > -1) {
        prodArr.push(allValues[j]);
      }
    }
  }
  getProductsRuminian(prodArr);
}

function getSingleProductRuminant(data) {
  var listInfo = "";
  listInfo = data.getElementsByTagName("input")[0].value;
  spanInfo = data.getElementsByTagName("span")[0].innerHTML;
  categoryInfo = data.getElementsByTagName("span")[1].innerHTML;
  let ruminantData = productdata.ruminant;
  var frameModal = document.getElementById("open-modal");
  var frameModalCont = document.getElementById("product-modal-content");
  for (let rumi in ruminantData) {
    if (rumi == categoryInfo) {
      for (let y of ruminantData[rumi]) {
        if (y.id == listInfo) {
          frameModal.classList.add("open");
          frameModalCont.innerHTML = y.body;
        }
      }
    }
  }
}

// For poultry and Aqua

function poultry(value) {
  $("#poultryId").empty();
  $("#poultry-subcategory-list").empty();
  let poultryData = productdata.poultry;
  listCategoriesPoultry(poultryData);
  let prodArr = [];
  for (let i in poultryData) {
    let allpoultryData = poultryData[i];
    for (let j = 0; j < allpoultryData.length; j++) {
      prodArr.push(allpoultryData[j]);
    }
  }
  getProductsPoultry(prodArr);
}

function getProductsPoultry(prod) {
  if (prod.length == 0) {
    $("#poultryID").show();
  } else {
    $("#poultryID").hide();
  }
  for (var i of prod) {
    $("#poultryId").append(
      '<div class="col-md-4 product-blocks" ><div class="img-product-blocks" onclick="getSingleProductPoultry(this)">' +
        i.imageUrl +
        '<span style="display:none">' +
        i.type +
        '</span> <span style="display:none">' +
        i.category +
        '</span><input type="hidden" value="' +
        i.id +
        '"></div> <h6>' +
        i.name +
        '</h6><div class="listLayoutViewBtn" onclick="getSingleProductPoultry(this)"><span style="display:none">' +
        i.type +
        '</span> <span style="display:none">' +
        i.category +
        '</span><input type="hidden" value="' +
        i.id +
        '">View More</div></div>'
    );
  }
}

function listCategoriesPoultry(category) {
  const result = {};
  Object.keys(category).forEach(function(key) {
    result[key.replace(/_/g, " ")] = category[key];
  });
  for (var i in result) {
    let res = i.replace(/ /g, "_");
    $("#poultry-subcategory-list").append(
      '<li class="checkbox-wrapper" ><input type="checkbox" name="catagory" class="' +
        res +
        '" onclick="poultryCheck()" id="' +
        i +
        '" value="' +
        i +
        '"><label for="' +
        i +
        '">' +
        i +
        "(" +
        category[res].length +
        ")" +
        "</label></li>"
    );
  }
}

var poultryArray = [];

function poultryCheck() {
  $("#poultryId").empty();
  $('input[type="checkbox"]').off("change");
  $('input[type="checkbox"]').on("change", function() {
    let type = this.value;
    let result = type.replace(/ /g, "_");
    let is_checked = $("." + result).prop("checked");
    let poultryData = productdata.poultry;
    if (is_checked) {
      for (let i in poultryData) {
        var allValues = poultryData[i];
        if (result == i) {
          for (let j = 0; j < allValues.length; j++) {
            poultryArray.push(allValues[j]);
          }
        }
      }
      getProductsPoultry(poultryArray);
    } else {
      for (let p in poultryData) {
        if (p === result) {
          for (let y of poultryData[p]) {
            let index = poultryArray.findIndex(x => x === y);
            var arrr = poultryArray.splice(index, 1);
          }
        }
      }

      if (poultryArray.length == 0) {
        poultryCheck();
      } else {
        getProductsPoultry(poultryArray);
      }
    }
  });
}

function searchPoultry(data) {
  $("#poultryId").empty();
  let inputValue = data.value;
  let serachValue = inputValue.toUpperCase();
  let prodArr = [];
  let poultryData = productdata.poultry;
  for (let i in poultryData) {
    let allValues = poultryData[i];
    for (let j = 0; j < allValues.length; j++) {
      let name = allValues[j].name;
      if (name.toUpperCase().indexOf(serachValue) > -1) {
        prodArr.push(allValues[j]);
      }
    }
  }
  getProductsPoultry(prodArr);
}

function getSingleProductPoultry(data) {
  var listInfo = "";
  listInfo = data.getElementsByTagName("input")[0].value;
  spanInfo = data.getElementsByTagName("span")[0].innerHTML;
  categoryInfo = data.getElementsByTagName("span")[1].innerHTML;
  let poultryData = productdata.poultry;

  var frameModal = document.getElementById("open-modal");
  var frameModalCont = document.getElementById("product-modal-content");
  for (let pol in poultryData) {
    if (pol == categoryInfo) {
      for (let y of poultryData[pol]) {
        if (y.id == listInfo) {
          frameModal.classList.add("open");
          frameModalCont.innerHTML = y.body;
        }
      }
    }
  }
}

// For Swine

function swine() {
  $("#swineId").empty();
  $("#swine-subcategory-list").empty();
  let swineData = productdata.swine;
  listCategoriesSwine(swineData);
  let prodArr = [];
  for (let i in swineData) {
    let allswineData = swineData[i];
    for (let j = 0; j < allswineData.length; j++) {
      prodArr.push(allswineData[j]);
    }
  }
  getProductsSwine(prodArr);
}

function getProductsSwine(prod) {
  if (prod.length == 0) {
    $("#swineID").show();
  } else {
    $("#swineID").hide();
  }
  for (var i of prod) {
    $("#swineId").append(
      '<div class="col-md-4 product-blocks" ><div class="img-product-blocks" onclick="getSingleProductSwine(this)">' +
        i.imageUrl +
        '<span style="display:none">' +
        i.type +
        '</span> <span style="display:none">' +
        i.category +
        '</span><input type="hidden" value="' +
        i.id +
        '"></div> <h6>' +
        i.name +
        '</h6><div class="listLayoutViewBtn" onclick="getSingleProductSwine(this)"><span style="display:none">' +
        i.type +
        '</span> <span style="display:none">' +
        i.category +
        '</span><input type="hidden" value="' +
        i.id +
        '">View More</div></div>'
    );
  }
}

function listCategoriesSwine(category) {
  const result = {};
  Object.keys(category).forEach(function(key) {
    result[key.replace(/_/g, " ")] = category[key];
  });
  for (var i in result) {
    let res = i.replace(/ /g, "_");
    $("#swine-subcategory-list").append(
      '<li class="checkbox-wrapper" ><input type="checkbox" name="catagory" class="' +
        res +
        '" onclick="swineCheck()" id="' +
        i +
        '" value="' +
        i +
        '"><label for="' +
        i +
        '">' +
        i +
        "(" +
        category[res].length +
        ")" +
        "</label></li>"
    );
  }
}

var swineArray = [];

function swineCheck() {
  $("#swineId").empty();
  $('input[type="checkbox"]').off("change");
  $('input[type="checkbox"]').on("change", function() {
    let type = this.value;
    let result = type.replace(/ /g, "_");
    let is_checked = $("." + result).prop("checked");
    let swineData = productdata.swine;
    if (is_checked) {
      for (let i in swineData) {
        var allValues = swineData[i];
        if (result == i) {
          for (let j = 0; j < allValues.length; j++) {
            swineArray.push(allValues[j]);
          }
        }
      }
      getProductsSwine(swineArray);
    } else {
      for (let p in swineData) {
        if (p === result) {
          for (let y of swineData[p]) {
            let index = swineArray.findIndex(x => x === y);
            var arrr = swineArray.splice(index, 1);
          }
        }
      }

      if (swineArray.length == 0) {
        swine();
      } else {
        getProductsSwine(swineArray);
      }
    }
  });
}

function searchSwine(data) {
  $("#swineId").empty();
  let inputValue = data.value;
  let serachValue = inputValue.toUpperCase();
  let prodArr = [];
  let swineData = productdata.swine;
  for (let i in swineData) {
    let allValues = swineData[i];
    for (let j = 0; j < allValues.length; j++) {
      let name = allValues[j].name;
      if (name.toUpperCase().indexOf(serachValue) > -1) {
        prodArr.push(allValues[j]);
      }
    }
  }
  getProductsSwine(prodArr);
}

function getSingleProductSwine(data) {
  var listInfo = "";
  listInfo = data.getElementsByTagName("input")[0].value;
  spanInfo = data.getElementsByTagName("span")[0].innerHTML;
  categoryInfo = data.getElementsByTagName("span")[1].innerHTML;
  let swineData = productdata.swine;
  var frameModal = document.getElementById("open-modal");
  var frameModalCont = document.getElementById("product-modal-content");
  for (let pol in swineData) {
    if (pol == categoryInfo) {
      for (let y of swineData[pol]) {
        if (y.id == listInfo) {
          frameModal.classList.add("open");
          frameModalCont.innerHTML = y.body;
        }
      }
    }
  }
}
