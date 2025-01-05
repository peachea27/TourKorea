function getIntroduction(contentId) {
  let url0 = `http://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=${mykey}&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`;

  $.ajax({
    url: url0,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      drawIntroduction(data);
    },
    error: function () {},
    complete: function () {},
  });
  console.log(url0);
}

function drawIntroduction(data) {
  let firstImage = data.response.body.items.item[0].firstimage;
  console.log(firstImage);
  let title = data.response.body.items.item[0].title;
  let overview = data.response.body.items.item[0].overview;
  $("#heartShare").html(
    `<i id="love${contentId}" class="${contentId} fa-regular fa-heart fa-2x" onclick="saveAndDelCookie(${contentId});"></i>`
  );
  $("#firstImage").append(`<img src="${firstImage}" alt="">`);
  $("#title").append(title);
  $("#introduction").append(overview);
  readCookie();
}

function LetsgetParameterformQueryString(parameterName) {
  let returnValue = null;
  let url = location.href;
  if (url.indexOf("?") !== -1) {
    let queryString = url.split("?")[1];
    let queryStringArr = queryString.split("&");

    for (let item of queryStringArr) {
      if (item.split("=")[0] == parameterName) {
        returnValue = item.split("=")[1];
        break;
      }
    }
  }
  return returnValue;
}

function getMap() {
  let url1 = `http://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=${mykey}&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`;

  let url2 = `http://apis.data.go.kr/B551011/KorService1/detailIntro1?ServiceKey=${mykey}&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&_type=json`;

  $.ajax({
    url: url1,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      drawMap(data);
    },
    error: function () {},
    complete: function () {},
  });

  $.ajax({
    url: url2,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      drawTimeTable(data);
    },
    error: function () {},
    complete: function () {},
  });
  console.log(url1);
}

function drawTimeTable(info) {
  let information = info.response.body.items.item[0];
  let distance = information.distance;
  let takeTime = information.taketime;

  let outline = `

          <table id="distanceTable">
            <tr>
              <td>총 거리</td>
              <td>${distance}</td>
            </tr>
            <tr>
              <td>소요시간</td>
              <td>${takeTime}</td>
            </tr>
          </table>
        `;
  $("#map2").html(outline);
}

function getCourse() {
  let url3 = `http://apis.data.go.kr/B551011/KorService1/detailInfo1?ServiceKey=${mykey}&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&_type=json`;

  $.ajax({
    url: url3,
    type: "GET",
    dataType: "json",
    success: function (data) {
      drawCourse(data);
    },
    error: function () {},
    complete: function () {},
  });

  console.log(url3);
}

function drawCourse(info) {
  let item = info.response.body.items.item;
  console.log(item);
  let CourseOutline = "";
  let SubContArray = [];
  console;

  for (let i = 0; i < item.length; i++) {
    let subContentId = info.response.body.items.item[i].subcontentid;
    SubContArray.push(subContentId);
    let subName = info.response.body.items.item[i].subname;
    let SubExplain = info.response.body.items.item[i].subdetailoverview;
    CourseOutline += `
        <div id=subImg${i}></div>
        <h2 class="subName_title">${subName}</h2>
        <p>${SubExplain}</p>`;
  }
  $("#cParaSection").html(CourseOutline);
  console.log("SubContARR:" + SubContArray);

  getSubConPic(SubContArray);
}

function getSubConPic(subContArray) {
  let cImgArr = [];
  $.each(subContArray, function (i, e) {
    let url4 = `https://apis.data.go.kr/B551011/KorService1/detailImage1?MobileOS=Y&MobileApp=AppTest&_type=json&imageYN=Y&subImageYN=Y&contentId=${e}&serviceKey=${mykey}`;
    console.log(url4);
    $.ajax({
      url: url4,
      type: "GET",
      dataType: "json",
      async: false,
      success: function (data) {
        let vImage = data.response.body.items;
        if (vImage == "") {
          cImgArr.push("");
        } else {
          let courseImg = vImage.item[0].originimgurl;
          cImgArr.push(courseImg);
        }
      },
      error: function () {},
      complete: function () {
        $(".loading").hide();
      },
    });
  });
  // console.log(cImgArr);
  showCourseImg(cImgArr);
}

function showCourseImg(cImgArr) {
  console.log(cImgArr);
  let output = ``;
  $.each(cImgArr, function (i, e) {
    output = `<img src="${e}" alt="">`;
    console.log(i, e);
    $(`#subImg${i}`).html(output);
  });
}

function drawMap(data) {
  let mapX = data.response.body.items.item[0].mapx;
  let mapY = data.response.body.items.item[0].mapy;
  console.log(mapX, mapY);
  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(mapY, mapX), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

  var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  // 마커가 표시될 위치입니다
  var markerPosition = new kakao.maps.LatLng(mapY, mapX);

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
  map.relayout();
}

function navtab() {
  document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab_button");
    const tabContents = document.querySelectorAll(".tab_column");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab");

        button.classList.add("active");
        tabContents.forEach((content) => {
          content.classList.remove("active");
          button.classList.remove("active");
        });

        document.getElementById(tabId).classList.add("active");
      });
    });
  });

  let matches = document.getElementsByClassName("tab_button");
}
// -------------------------------------------------------
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
  countingJjim();
  hearts.removeClass("fa-solid");
}
function countingJjim() {
  let jjimCount = document.getElementsByClassName("jjimListCount");
  $(".jjimCount").text(jjimCount.length);

  for (let i = 0; i < jjimCount.length; i++) {
    $(jjimCount[i]).text(i + 1);
  }
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

function readCookie() {
  let myCookie = document.cookie;
  console.log(myCookie.length);
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
