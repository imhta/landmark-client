
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
      createClients(res.data.clients);
    
    });
  

  
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
  
  
