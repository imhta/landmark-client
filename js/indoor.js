var query = `query {
    configs(where: {
    type: "logo"
    }){
        id
        brandImg{
          handle
        }
      }
  categories{
        id
        catType
        title
        img {
          id
          handle
        }
        catLocType
      }
      slides{
          id
          title
          img{
              id
              handle
          }
      }

    slides{
      title
      img{
        id
        handle
      }
    }

}
`;
fetch('https://api-apeast.graphcms.com/v1/cjs3ei2im0dqf01g7re7ifxb7/master/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query
  })
})
.then(r => r.json())
.then(res => {
  // console.log(res);
  createLogo(res.data.configs);
  createSlides(res.data.slides);
  createPortfolio(res.data.categories);

});



function createLogo(config) {

$('#logo').append(`<a href="#intro"><img src="https://media.graphcms.com/${config[0].brandImg.handle}" alt="landmark logo" title="landmark since 1990" /></a>`)
$('#foot-logo').append(`<a href="#intro"><img src="https://media.graphcms.com/${config[0].brandImg.handle}" alt="landmark logo" title="landmark since 1990" /></a>`)
}

function createPortfolio(cats) {
var cards = document.createDocumentFragment();
uniqueArr = removeDups(cats.map((data) => data.title));
for (i = 0; i < uniqueArr.length; i++) {
    if(cats[i].catLocType === 'INDOOR') {
  var node = document.createElement("li");
  var textnode = document.createTextNode(cats[i].title);
  var att = document.createAttribute("data-filter");
  att.value = `.${cats[i].catType}`;
  node.className = `filter ${cats[i].catType}`;
  node.appendChild(textnode);
  node.setAttributeNode(att);
  document.getElementById("portfolio-flters").appendChild(node);
    }
}
for (i = 0; i < cats.length; i++) {
    if(cats[i].catLocType === 'INDOOR') {
  var cardDiv = document.createElement("div");
  cardDiv.classList.add('col-lg-4', 'col-md-6', 'portfolio-item', cats[i].catType, 'wow', 'fadeInUp');

  cardDiv.innerHTML = `

  <div class="portfolio-wrap">
    <figure>
      <img src="https://media.graphcms.com/${cats[i].img.handle}" class="img-fluid" alt="">
      <a href="https://media.graphcms.com/${cats[i].img.handle}" data-lightbox="portfolio" data-title="${cats[i].title}" class="link-preview"
        title="Preview"><i class="ion ion-eye"></i></a>
      <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
    </figure>

    <div class="portfolio-info">
      <h4><a href="#">${cats[i].title}</a></h4>
      <p>${cats[i].catLocType}</p>
    </div>
  </div>

  `;
  cards.appendChild(cardDiv);
    }
}
document.getElementById("portfolio-js").appendChild(cards);
var newItems = $('.portfolio-container').find('.portfolio-item');
$('.portfolio-container').isotope('insert', newItems);

}

function createClients(clients) {
for (i = 0; i < clients.length; i++) {

  $(".clients-carousel").append(`<img src="https://media.graphcms.com/${clients[i].logo.handle}" height="150px">`);

}
}

function createServices(services) {
for (i = 0; i < services.length; i++) {

  $("#services-js").append(`
  <div class="col-md-4 wow fadeInUp">
  <div class="col ">
      <img src="https://media.graphcms.com/${services[i].img.handle}" alt="${services[i].title}" class="img-fluid">
    <h2 class="title m-2"><a href="#">${services[i].title}</a></h2>
    <p class="m-2">${services[i].description}</p>
  </div>
  </div>
  `);

}

}

function createSlides(slides) {
for (i = 0; i < slides.length; i++) {
  $(".carousel-inner").append(`
  <div class="carousel-item ${i === 0 ? 'active' : ''}">
    <div class="carousel-background"><img src="https://media.graphcms.com/${slides[i].img.handle}" width="100%" height="100%" galt=""></div>
    <div class="carousel-container">
      <div class="carousel-content">
        <h2>${slides[i].title}</h2>
        
          <a href="https://api.whatsapp.com/send?phone=919444976665&text=I%20want%20to%20know%20more%20about%20your%20services" class="btn-get-started scrollto">Chat Now</a>
      </div>
    </div>
    </div>

  `);
}
}

function removeDups(arr) {
let unique = {};
arr.forEach(function (i) {
  if (!unique[i]) {
    unique[i] = true;
  }
});
return Object.keys(unique);
}



// Porfolio isotope and filter
var portfolioIsotope = $('.portfolio-container').isotope({
itemSelector: '.portfolio-item',
layoutMode: 'fitRows'
});

$('#portfolio-flters li').on('click', function () {
$("#portfolio-flters li").removeClass('filter-active');
$(this).addClass('filter-active');
portfolioIsotope.isotope({
  filter: $(this).data('filter')
});

});
$("#portfolio-flters").on("click", ".filter", function () {
$("#portfolio-flters li").removeClass('filter-active');
$(this).addClass('filter-active');
portfolioIsotope.isotope({
  filter: $(this).data('filter')
});
});