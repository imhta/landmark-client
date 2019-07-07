
// init client carousel
var $clientCarousel = $(".client-carousel").flickity({
  imagesLoaded: true,
  percentPosition: false,
  autoPlay: true,
  pauseAutoPlayOnHover: false,
  hash: true,
  groupCells: true
});
var $grid = $('.grid').isotope({
  // options
  layoutMode: 'fitRows',
  itemSelector: '.grid-item',
  masonry: {
    columnWidth: 50
  }
});
var cat = getUrlVars().cat;
$(`#${cat}`).addClass('active');
var query = `query {

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
    createCatElements(res.data.categories);
    createClients(res.data.clients);
}).then(() => {
  $("#v-pills-tab .nav-link").on("click", function(){
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
    console.log(filterValue);
});
});

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
  for(var i = 0; i < cats.length; i++){
    catsEle += `
        <div class="grid-item ${cats[i].catType} ${cats[i].catLocType}"  >
          <div class="card">
          <div class="card-img-top" style="background-image: url('https://media.graphcms.com/${cats[i].img.handle}');
          " alt="${cats[i].title}"></div>
          <div class="card-footer h5 text-center">
          ${cats[i].title}
        </div>
      </div>
      </div>
        `;

  }
  $grid.append( $(catsEle) )
  .isotope( 'appended', $(cats) ).isotope('layout');

  
  catTypes.forEach(ele => {
    $('#v-pills-tab').append(`

    <a class="nav-link" id="${ele}" data-toggle="tab" href="#${ele}" role="tab"  data-filter=".${ele}" >${ele.replace(/_/g, ' ')}</a>

    `);
  })
}
