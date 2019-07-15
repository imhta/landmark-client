// init client carousel
var $clientCarousel = $(".client-carousel").flickity({
  imagesLoaded: true,
  percentPosition: false,
  autoPlay: true,
  pauseAutoPlayOnHover: false,
  hash: true,
  groupCells: true
});

var cat = getUrlVars().cat;
$(`#${cat}`).addClass("active");
var query = `query {
          firstSlides{
            title
            img{
              id
              handle
            }
          }
          categories(where: {catLocType: ${cat.toUpperCase()}}){
            id
            catType
            title
            img {
              id
              handle
            }
            catLocType
          }
  
          clients{
            id
            name
            logo{
                id
                handle
            }
        }

    
    }
    `;
fetch(
  "https://api-apeast.graphcms.com/v1/cjs3ei2im0dqf01g7re7ifxb7/master/graphql",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query
    })
  }
)
  .then(r => r.json())
  .then(res => {
    console.log(res);
    $('#led-section').hide();
    createCatElements(res.data.categories);
    createClients(res.data.clients);
    if (cat === 'led') {
      createSlides(res.data.firstSlides);
      $('#led-section').show();
      $('#v-pills-tab').hide();
    } else if (cat === 'print'){
      $('#v-pills-tab').hide();
    }
  }).catch((e) => alert("check your internet connection"));


function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function createSlides(slides) {
  for (i = 0; i < slides.length; i++) {
    $("#carousel-inner").append(`
    <div class="carousel-item ${i === 0 ? 'active' : ''}" 
         style="
                background-image: url(https://media.graphcms.com/${slides[i].img.handle});
                background-size: cover;
                width: 100%;
                height:500px ">
    <div>

    `);

    $("#carousel-indicators").append(`
    <li data-target="#carousel" data-slide-to="${i}" class="${i === 0 ? 'active' : ''}"></li>
    `)
  }
}

function createClients(clients) {
  var client = "";
  for (i = 0; i < clients.length; i++) {
    client += `
        <div class="carousel-cell" id="carousel-cell${i}" style="height: 80px; width: 200px; background-image: url(https://media.graphcms.com/${
      clients[i].logo.handle
    }); background-size: contain; background-position: center; background-repeat: no-repeat" >
      </div>
        `;
  }
  $clientCarousel.flickity("append", $(client));
  $clientCarousel.flickity("reloadCells");
}

function createCatElements(cats) {
  var catsEle = "";
  var catTypes = [...new Set(cats.map(ele => ele.catType))];
  for (var i = 0; i < cats.length; i++) {
    catsEle += `
        <div class="grid-item ${cats[i].catType} ${cats[i].catLocType}"  >
          <div class="card">
          <div class="card-img-top" style="background-image: url('https://media.graphcms.com/${
            cats[i].img.handle
          }');
          " alt="${cats[i].title}"></div>
          <div class="card-footer h5 text-center">
          ${cats[i].title}
        </div>
      </div>
      </div>
        `;
  }
  $(".tab-pane#all").append($(catsEle));

  catTypes.forEach(ele => {
    $("#v-pills-tab").append(`
    <a class="nav-link" id="${ele}-tab" data-toggle="pill" href="#${ele}" role="tab" aria-controls="#${ele}" aria-selected="true">${ele.replace(
      /_/g,
      " "
    )}</a>
    `);

    $("#v-pills-tabContent").append(`
    <div class="tab-pane fade show" id="${ele}" role="tabpanel" aria-labelledby="${ele}-tab"></div>
    `);
    paintCat(cats,ele);
  });


}

function paintCat(cats, cat) {
  catTypeCats = cats.filter((i) => i.catType === cat);
  console.log(cats)
  catTypeCats.forEach(c => {
    $(`.tab-pane#${c.catType}`).append(`
    <div class="grid-item ${c.catType} ${c.catLocType}"  >
    <div class="card">
    <div class="card-img-top" style="background-image: url('https://media.graphcms.com/${
      c.img.handle
    }');
    " alt="${c.title}"></div>
    <div class="card-footer h5 text-center">
    ${c.title}
  </div>
</div>
</div>
    `);
  });
}

