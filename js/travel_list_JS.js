// --------------------------------------------------------------------------
let itemNum = 1;
let pageNum = 1;
let numOfRows = 9;
let totalCount = 0;
let totalPage = 0;
let input = "";
let recommendation = "";
let region = "";
const mykey =
  "xCkDhvE6qELPuupxJjgDFbEisUTbHe0eH%2BsMnKo9aujCwD%2BNibXMFVgZPKNUEdHbmlO1%2FOw1HFW7ib%2B6Sn6DVg%3D%3D";

// "xCkDhvE6qELPuupxJjgDFbEisUTbHe0eH%2BsMnKo9aujCwD%2BNibXMFVgZPKNUEdHbmlO1%2FOw1HFW7ib%2B6Sn6DVg%3D%3D";
//  "pHz4MKlgied7k%2FUekHSfWjh1TCPf%2BauM42Izuq7pIghkzLVlTeqtcNSFf%2BwKhpJX2DtMpUMuLpAvwrTDxNBU9A%3D%3D"
//  "T7Vu8QoHDcl4O9nxSquDnn4wyr8LhHDewwspiyO33cMju5pOrqjz5u60NROz92oniJSEixSApvY%2FdyYJt%2BrKyw%3D%3D"
//  "xCkDhvE6qELPuupxJjgDFbEisUTbHe0eH%2BsMnKo9aujCwD%2BNibXMFVgZPKNUEdHbmlO1%2FOw1HFW7ib%2B6Sn6DVg%3D%3D";
//  "UdS4t1NyBqFTtn6V%2FFVk12YWELEbnE7KclNHJkmBawJeQw1qWuGgR3NB325b%2F4iOy0WuDDwrG6Y91h5O1xOwsQ%3D%3D";
// --------------------------------------------------------------------------

function cart() {
  let iconCart = document.querySelector(".icon-cart");
  let body = document.querySelector("body");
  let closeCart = document.querySelector(".close");

  iconCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });
  closeCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });
}

function pagination(totalPage) {
  let vary = 1;
  console.log("pagination");
  let pageBar = $("#pageBar");
  pageBar.html("");

  const howmanyButtons = 9;
  const howmanycontents = 9;

  let startPage =
    Math.floor((pageNum - 1) / howmanycontents) * howmanycontents + 1;
  let endPage = startPage + howmanyButtons - 1;

  if (endPage > totalPage) {
    endPage = totalPage;
  }
  const headUl = document.createElement("ul");
  headUl.className = "pagination modal";
  const firstPage = document.createElement("li");
  firstPage.className = "first_page";
  firstPage.textContent = "처음 페이지";

  firstPage.addEventListener("click", () => {
    pageNum = 0;
    $("#gallery9x9").html("");
    console.log("clickfirstpage");
    getData(0, vary);
  });
  pageBar.append(firstPage);
  if (pageNum > 1) {
    const prevButton = document.createElement("li");
    prevButton.className = "arrow left";
    prevButton.textContent = "이전";
    prevButton.addEventListener("click", () => {
      pageNum--;
      pageNum--;
      $("#gallery9x9").html("");
      getData(pageNum, vary);
    });
    pageBar.append(prevButton);
  }

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement("li");
    button.className = "num";
    button.textContent = i;

    if (i == pageNum) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      pageNum = i - 1;
      $("#gallery9x9").html("");
      getData(pageNum, vary);
    });
    pageBar.append(button);
  }

  if (pageNum < totalPage) {
    const nextButton = document.createElement("li");
    nextButton.className = "arrow right";
    nextButton.textContent = "다음";
    nextButton.addEventListener("click", () => {
      console.log("?");
      // pageNum++;
      $("#gallery9x9").html("");
      getData(pageNum, vary);
    });
    pageBar.append(nextButton);

    const lastPage = document.createElement("li");
    lastPage.className = "last_page";
    lastPage.textContent = "끝 페이지";
    lastPage.addEventListener("click", () => {
      pageNum = totalPage - 1;
      $("#gallery9x9").html("");
      getData(pageNum, vary);
    });
    pageBar.append(lastPage);
  }
}

function infiniteScroll() {
  let vary = 0;
  const listEnd = document.querySelector("#listEnd");
  const options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.9,
  };

  const callback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (pageNum < totalPage) {
          console.log("?");
          pageNum++;
          if (input !== "" || recommendation !== "" || region !== "") {
            getDataOnSearch();
          } else {
            getData(pageNum, vary);
          }
        }
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(listEnd);
}

function search() {
  $("#gallery9x9").html(" ");
  pageNum = 1;
  getDataOnSearch();
}

function getDataOnSearch() {
  input = document.getElementById("inputBox").value;
  recommendation = document.getElementById("recommendation").value;
  region = document.getElementById("region").value;
  console.log(recommendation, region);
  if (input != "" && input != null) {
    let encodedKeyword = document.getElementById("inputBox").value;

    let baseUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${mykey}`;

    let url =
      baseUrl +
      "&pageNo=" +
      pageNum +
      "&numOfRows=" +
      numOfRows +
      `&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId=25&keyword=${encodedKeyword}&_type=json`;

    console.log(url);

    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
        parsingJSON(data);
      },
      error: function () {},
      complete: function () {},
    });
  } else {
    let baseUrl = `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${mykey}`;

    let url =
      baseUrl +
      "&pageNo=" +
      pageNum +
      "&numOfRows=" +
      numOfRows +
      `&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId=25&_type=json&areaCode=${region}&cat1=C01&cat2=${recommendation}&_type=json`;
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
        parsingJSON(data);
      },
      error: function () {},
      complete: function () {},
    });
  }
}

function getData(pageNum, vary) {
  console.log("get data 현재 페이지" + pageNum);
  let buttons = vary;

  let baseUrl = `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${mykey}`;
  let url =
    baseUrl +
    "&pageNo=" +
    pageNum +
    "&numOfRows=" +
    numOfRows +
    "&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId=25&_type=json";
  console.log(url);
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    success: function (data) {
      parsingJSON(data, buttons);
    },
    error: function () {},
    complete: function () {},
  });
}

function saveCookie(contentId) {
  let theCookie = "";
  let now = new Date();
  now.setDate(now.getDate() + 7);
  theCookie = `${contentId}th=cookie;expires=` + now.toUTCString();
  console.log(theCookie);
  document.cookie = theCookie;
  let hearts = $(`#love${contentId}`);
  hearts.addClass("fa-solid");
  itemsInCart(contentId);
}

function deleteCookie(contentId) {
  let theCookie = `${contentId}th`;
  let now = new Date();
  let deleteCookie = theCookie + "=;expires=" + now.toUTCString();
  document.cookie = deleteCookie;
  console.log(`cookieDeleted!`);
  let hearts = $(`#love${contentId}`);
  let eachItem = $(`.cart${contentId}`);
  $(".listCart").find(eachItem).remove();
  hearts.removeClass("fa-solid");
  countingJjim();
}

function countingJjim() {
  let jjimCount = document.getElementsByClassName("jjimListCount");
  $(".jjimCount").text(jjimCount.length);

  for (let i = 0; i < jjimCount.length; i++) {
    $(jjimCount[i]).text(i + 1);
  }
}

function saveAndDelCookie(contentId) {
  let myCookie = document.cookie;
  let cookArr = myCookie.split(";");
  for (let i = 0; i < cookArr.length; i++) {
    let cookName = cookArr[i].split("=")[0];
    let cookieName = cookName.substring(0, cookName.length - 2);
    if (cookieName == contentId) {
      return deleteCookie(contentId);
    }
  }
  saveCookie(contentId);
}
function readCookie() {
  let myCookie = document.cookie;
  let cookArr = myCookie.split(";");
  if (myCookie !== "") {
    for (let i = 0; i < cookArr.length; i++) {
      let cookieName = cookArr[i].split("=")[0].trim();
      let contentId = cookieName.substring(0, cookieName.length - 2);
      let hearts = $(`#love${contentId}`);
      hearts.addClass("fa-solid");
    }
  }
}
function cookieForCart() {
  let myCookie = document.cookie;
  let cookArr = myCookie.split(";");
  let contentId = "";
  if (myCookie !== "") {
    for (let i = 0; i < cookArr.length; i++) {
      let cookieName = cookArr[i].split("=")[0].trim();
      contentId = cookieName.substring(0, cookieName.length - 2);
      let hearts = $(`#love${contentId}`);
      hearts.addClass("fa-solid");
      itemsInCart(contentId);
    }
  }
}

function parsingJSON(data, buttons) {
  let theButton = buttons;
  console.log(theButton);
  totalCount = data.response.body.totalCount;

  if (totalCount % numOfRows == 0) {
    totalPage = totalCount / numOfRows;
  } else {
    totalPage = Math.ceil(totalCount / numOfRows);
  }
  let item = data.response.body.items.item;

  let output = `
   
                 <div class="w-dyn-list">
                   <div role="list" class="w-dyn-items w-row">`;

  $.each(item, function (i, e) {
    contentId = item[i].contentid;
    output += `<div role="listitem" class="p_outer_frame p_container w-dyn-item w-col w-col-4">
                     <div class="triangle"></div>
                     <div class="p_frame">
                       <button class="iHeart"><i id="love${contentId}" class="${contentId} fa-regular fa-heart fa-2x" onclick="saveAndDelCookie(${contentId});"></i></button>
                       <a href="travel_detail.html?contentid=${contentId}"
                         >`;

    if (item[i].firstimage == "") {
      output += `<img class="taek" src="images/taek.png"/><img class="taek2" src="images/taek2.png"/>`;
    } else {
      output += `<img alt="" class="imgframe" src="${item[i].firstimage}" />`;
    }

    output += `</a>
                   <a href="travel_detail.html?contentid=${item[i].contentid}"
                         >
                         <div class="title"> ${item[i].title}</a></div> </div>
   
                     </div>`;
  });
  output += `
                       </div>
                       </div>`;

  $("#data_result").text(data.response.body.totalCount);

  if (buttons === 1) {
    $("#gallery9x9").html("");
  } else {
    $("#gallery9x9").append(output);
  }

  // let hearts = document.getElementsByClassName("fa-heart");

  // $.each(hearts, function (i, e) {
  //   hearts[i].addEventListener("click", function (e) {
  //     let jjim = false;
  //     let target = e.target;
  //     target.classList.toggle("fa-solid");
  //   });
  // });
  readCookie();
  pagination(totalPage);
}

function itemsInCart(contentId) {
  let url0 = `http://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=${mykey}&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`;
  console.log(url0);
  $.ajax({
    url: url0,
    type: "GET",
    dataType: "json",
    success: function (data) {
      addItems(data, contentId);
    },
    error: function () {
      console.log("itemsInCartErr");
    },
    complete: function () {},
  });
}

function addItems(data, contentId) {
  console.log(data.response.body.items.item);
  let secondImage = data.response.body.items.item[0].firstimage2;
  let title = data.response.body.items.item[0].title;
  let listGroup = `<a href="travel_detail.html?contentid=${contentId}" class="aLink">
          <div class="jjim cart${contentId}">
            <div class="jjimListCount"></div>`;

  if (secondImage == "") {
    listGroup += `<img src="images/taek.png" class="img_in_cart"/>`;
  } else {
    listGroup += `<img src="${secondImage}" class="img_in_cart"/>`;
  }

  listGroup += `<div class="cartTitle">${title}</div>
          </div></a>`;
  $(".listCart").append(listGroup);

  countingJjim();
}
