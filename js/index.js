$('.client-carousel').flickity({
  imagesLoaded: true,
  percentPosition: false,
  groupCells: true,
  autoPlay: true,
});


var $clientCarousel =   $('.client-carousel').flickity();

var query = `query {
      configs(where: {
      type: "banner"
      }){
          id
          brandImg{
            handle
          }
        }

        clients{
          id
          name
          logo{
              id
              handle
          }
      }
      firstSlides{
        title
        img{
          id
          handle
        }
      }
      secondSlides{
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
    console.log(res);

    createSlides(res.data.firstSlides);
    createTopBanner(res.data.configs);
    createSecondSlide(res.data.secondSlides);
    createSideBanner(res.data.configs);
    createClients(res.data.clients);
  
  });

  // 
function createTopBanner(config) {
  for (i = 0; i < 3; i++) {
    $("#top-banner").append(`
    <div class="col-md" 
         style="
                background-image: url(https://media.graphcms.com/${config[i].brandImg.handle});
                background-size: cover;
                width: 100%;
                height:300px ">
    <div>

    `);

  }

}


function createClients(clients) {
  for (i = 0; i < clients.length; i++) {
    var $cellEle = $(`
    <div class="carousel-cell">
    <img  src="https://media.graphcms.com/${clients[i].logo.handle}" style="height: 80px;" alt="" />
  </div>
    `)
    $clientCarousel.flickity('append', $cellEle);

  }
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


function createSecondSlide(slides) {
  for (i = 0; i < slides.length; i++) {
    $("#second-slide-wrapper").append(`

    <div>
    <img data-u="image" src="https://media.graphcms.com/${slides[i].img.handle}" />
    <img data-u="thumb" src="https://media.graphcms.com/${slides[i].img.handle}" style="height: 90px; width:190px"/>
  </div>

    `);

  }
}

function createSideBanner(config) {
  $("#home-side-banner")
  .attr('style',
    `max-width:100%;
    max-height:100%;
    min-width: 250px;
    min-height: 300px;
    background-image: url(https://media.graphcms.com/${config[3].brandImg.handle});
    background-size: cover; `);

    $("#final-home-banner").attr('style',
    `max-width:100%;
    max-height:100%;
    min-width: 340px;
    min-height: 400px;
    margin: 10px;
    background-image: url(https://media.graphcms.com/${config[4].brandImg.handle});
    background-size: cover; `);
}