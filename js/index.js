var $clientCarousel = $(".client-carousel").flickity({
  imagesLoaded: true,
  percentPosition: false,
  autoPlay: true,
  pauseAutoPlayOnHover: false,
  hash: true,
  groupCells: true
});

var slider_options = {
  $AutoPlay: 1,
  $ArrowNavigatorOptions: {
    $Class: $JssorArrowNavigator$,
    $ChanceToShow: 2
  },
  $ThumbnailNavigatorOptions: {
    $Class: $JssorThumbnailNavigator$,
    $ChanceToShow: 2
  }
};

var jssor_slider_instance = new $JssorSlider$("jssor_1", slider_options);

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

    createSlides(res.data.firstSlides);
    createTopBanner(res.data.configs);
    createSecondSlide(res.data.secondSlides);
    createSideBanner(res.data.configs);
    createClients(res.data.clients);
  }).catch((e) => alert("check your internet connection"));

//
function createTopBanner(config) {
  for (i = 0; i < 3; i++) {
    $("#top-banner").append(`
    <div class="col-md" 
         style="
                background-image: url(https://media.graphcms.com/${
                  config[i].brandImg.handle
                });
                background-size: cover;
                width: 100%;
                height:300px ">
    <div>

    `);
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

function createSlides(slides) {
  for (i = 0; i < slides.length; i++) {
    $("#carousel-inner").append(`
    <div class="carousel-item ${i === 0 ? "active" : ""}" 
         style="
                background-image: url(https://media.graphcms.com/${
                  slides[i].img.handle
                });
                background-size: cover;
                width: 100%;
                height:500px ">
    <div>

    `);

    $("#carousel-indicators").append(`
    <li data-target="#carousel" data-slide-to="${i}" class="${
      i === 0 ? "active" : ""
    }"></li>
    `);
  }
}

function createSecondSlide(slides) {
  var slidesHtml = "";
  for (i = 0; i < slides.length; i++) {
    slidesHtml += `
    <div>
    <img data-u="image" src="https://media.graphcms.com/${
      slides[i].img.handle
    }" />
    <img data-u="thumb" src="https://media.graphcms.com/resize=w:190,h:90,fit:crop/${
      slides[i].img.handle
    }"/>
  </div>
    `;
  }
  jssor_slider_instance.$AppendSlides(slidesHtml, i);
}

function createSideBanner(config) {
  $("#home-side-banner").attr(
    "style",
    `width:100%;
    height:100%;
    min-width: 250px;
    min-height: 300px;
    background-image: url(https://media.graphcms.com/${
      config[3].brandImg.handle
    });
    background-size: cover; `
  );

  $("#final-home-banner").attr(
    "style",
    `max-width:100%;
    max-height:100%;
    min-width: 340px;
    min-height: 400px;
    margin: 10px;
    background-image: url(https://media.graphcms.com/${
      config[4].brandImg.handle
    });
    background-size: cover; `
  );
}
