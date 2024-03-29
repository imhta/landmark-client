
  var $clientCarousel =  $('.client-carousel').flickity({
    imagesLoaded: true,
    percentPosition: false,
    autoPlay: true,
    pauseAutoPlayOnHover: false,
    hash: true,
    groupCells: true
  });
  
  

  
  var query = `query {

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

        facilitieses{
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
      createClients(res.data.clients);
      createFacilities(res.data.facilitieses);
    
    }).catch((e) => alert("check your internet connection"));
  

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
  
  function createFacilities(facilities) {
    for (i = 0; i < facilities.length; i++) {
      $(".facilities").append(`
      <div class="col-md-4 p-1">
      <div class="card">
          <img class="card-img-top" src="https://media.graphcms.com/${facilities[i].img.handle}" alt="Customer service">
          <div class="card-footer">
          <h6 class="text-center" >${facilities[i].title.toUpperCase()}</h6>
            </div>
            </div>
      </div>
      `);

    }
  }
