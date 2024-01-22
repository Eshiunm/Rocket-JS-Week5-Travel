let data;
const ticketCards = document.querySelector(`.ticketCard-area`);
const addTicketBtn = document.querySelector(".addTicket-btn");
const selectElement = document.querySelector(".regionSearch");
const addTicketForm = document.querySelector(".addTicket-form");

/*監聽事件*/
/*新增套票按鈕*/
addTicketBtn.addEventListener("click", function (e) {
  const name = document.querySelector("#ticketName").value;
  const ticketImgUrl = document.querySelector("#ticketImgUrl").value;
  const ticketRegion = document.querySelector("#ticketRegion").value;
  const ticketPrice = document.querySelector("#ticketPrice").value;
  const ticketNum = document.querySelector("#ticketNum").value;
  const ticketRate = document.querySelector("#ticketRate").value;
  const ticketDescription = document.querySelector("#ticketDescription").value;

  if (name == "") {
    alert("請填寫套票名稱");
    document.querySelector(
      "#ticketName-message"
    ).innerHTML = `<i class="fas fa-exclamation-circle"></i><span>必填!</span>`;
    return;
  } else {
    document.querySelector("#ticketName-message").textContent = ``;
  }

  if (ticketImgUrl == "") {
    alert("請填寫圖片網址");
    document.querySelector(
      "#ticketImgUrl-message"
    ).innerHTML = `<i class="fas fa-exclamation-circle"></i><span>必填!</span>`;
    return;
  } else {
    document.querySelector("#ticketImgUrl-message").textContent = ``;
  }

  if (ticketRegion == "") {
    alert("請填寫景點地區");
    document.querySelector(
      "#ticketRegion-message"
    ).innerHTML = `<i class="fas fa-exclamation-circle"></i><span>必填!</span>`;
    return;
  } else {
    document.querySelector("#ticketRegion-message").textContent = ``;
  }

  if (ticketPrice == "") {
    alert("請填寫套票金額");
    document.querySelector(
      "#ticketPrice-message"
    ).innerHTML = `<i class="fas fa-exclamation-circle"></i><span>必填!</span>`;
    return;
  } else {
    document.querySelector("#ticketPrice-message").textContent = ``;
  }

  if (ticketNum == "") {
    alert("請填寫套票組數");
    document.querySelector(
      "#ticketNum-message"
    ).innerHTML = `<i class="fas fa-exclamation-circle"></i><span>必填!</span>`;
    return;
  } else {
    document.querySelector("#ticketNum-message").textContent = ``;
  }

  if (ticketRate == "") {
    alert("請填寫套票星級");
    document.querySelector(
      "#ticketRate-message"
    ).innerHTML = `<i class="fas fa-exclamation-circle"></i><span>必填!</span>`;
    return;
  } else if (ticketRate < 1 || ticketRate > 10) {
    alert("星級區間是 1-10 分");
    return;
  } else {
    document.querySelector("#ticketRate-message").textContent = ``;
  }

  data.push({
    id: data.length,
    name: name,
    imgUrl: ticketImgUrl,
    area: ticketRegion,
    description: ticketDescription,
    group: Number(ticketNum),
    price: Number(ticketPrice),
    rate: Number(ticketRate),
  });
  RenderData(data);
  RenderC3(data);

  const searchResult = document.querySelector("#searchResult-text");
  searchResult.textContent = `本次搜尋共 ${data.length} 筆資料`;
  const selectElement = document.querySelector(".regionSearch");
  selectElement.value = `全部地區`;

  addTicketForm.reset(); //清除表單現有資料
});
/*地區搜尋按鈕*/
selectElement.addEventListener("change", function () {
  const selectedOption = selectElement.value;
  let str = ``;
  let searchNum = 0;
  let graphData = [];
  switch (selectedOption) {
    case "全部地區":
      data.forEach(function (item) {
        graphData.push(item);
        str += `
        <li class="ticketCard">
            <div class="ticketCard-img">
              <a href="#">
                <img src="${item.imgUrl}" alt="套票示意圖">
              </a>
              <div class="ticketCard-region">${item.area}</div>
              <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
              <div>
                <h3>
                  <a href="#" class="ticketCard-name">${item.name}</a>
                </h3>
                <p class="ticketCard-description">
                  ${item.description}
                </p>
              </div>
              <div class="ticketCard-info">
                <p class="ticketCard-num">
                  <span><i class="fas fa-exclamation-circle"></i></span>
                  剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                </p>
                <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">${item.price}</span>
                </p>
              </div>
            </div>
          </li>
        `;
        searchNum++;
      });
      break;
    default:
      data.forEach(function (item) {
        if (selectedOption == item.area) {
          graphData.push(item);
          str += `
          <li class="ticketCard">
            <div class="ticketCard-img">
              <a href="#">
                <img src="${item.imgUrl}" alt="套票示意圖">
              </a>
              <div class="ticketCard-region">${item.area}</div>
              <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
              <div>
                <h3>
                  <a href="#" class="ticketCard-name">${item.name}</a>
                </h3>
                <p class="ticketCard-description">
                  ${item.description}
                </p>
              </div>
              <div class="ticketCard-info">
                <p class="ticketCard-num">
                  <span><i class="fas fa-exclamation-circle"></i></span>
                  剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                </p>
                <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">${item.price}</span>
                </p>
              </div>
            </div>
          </li>
          `;
          searchNum++;
        }
      });
      break;
  }
  ticketCards.innerHTML = str;
  const searchResult = document.querySelector("#searchResult-text");
  searchResult.textContent = `本次搜尋共 ${searchNum} 筆資料`;
  RenderC3(graphData);
});

/*渲染圖表*/
function RenderC3(data) {
  console.log(data);
  let obj = {};
  data.forEach(function (item) {
    if (obj[item.area] == undefined) {
      obj[item.area] = 1;
    } else {
      obj[item.area]++;
    }
  });
  let areaArr = Object.keys(obj);
  let newData = [];
  areaArr.forEach(function (item) {
    let arr = [];
    arr.push(item);
    arr.push(obj[item]);
    newData.push(arr);
  });
  console.log(newData);
  const chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: newData,
      type: "donut",
    },
    donut: {
      title: "套票地區占比",
      width: 15,
      label: {
        show: false,
      },
    },
    size: {
      height: 200,
      width: 200,
    },
  });
}
/*渲染卡片裡面的資料*/
function RenderData(data) {
  let str = ``;
  let searchNum = 0;
  data.forEach(function (item) {
    str += `
    <li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src="${item.imgUrl}" alt="套票示意圖">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">${item.price}</span>
            </p>
          </div>
        </div>
      </li>
    `;
    searchNum++;
  });
  ticketCards.innerHTML = str;
  const searchResult = document.querySelector("#searchResult-text");
  searchResult.textContent = `本次搜尋共 ${searchNum} 筆資料`;
}

/*初始化*/
function init() {
  axios
    .get(
      `https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json`
    )
    .then(function (res) {
      data = res.data;
      RenderData(res.data);
      RenderC3(res.data);
    });
}
init();
