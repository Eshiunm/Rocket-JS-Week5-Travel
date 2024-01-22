let data = [
  {
    id: 0,
    name: "肥宅心碎賞櫻3日",
    imgUrl:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    area: "高雄",
    description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 1,
    name: "貓空纜車雙程票",
    imgUrl:
      "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台北",
    description:
      "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 2,
    name: "台中谷關溫泉會1日",
    imgUrl:
      "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台中",
    description:
      "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    group: 20,
    price: 1765,
    rate: 7,
  },
];
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
  switch (selectedOption) {
    case "全部地區":
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
      break;
    default:
      data.forEach(function (item) {
        if (selectedOption == item.area) {
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
});

/*渲染圖表*/
function RenderC3(data) {
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

  const chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: newData,
      type: "donut",
    },
  });
}
/*渲染卡片資料*/
function RenderData(data) {
  let str = ``;
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
  });
  ticketCards.innerHTML = str;
}

/*初始化*/
function init() {
  RenderData(data);
}
init();
