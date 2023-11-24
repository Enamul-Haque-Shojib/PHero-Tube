
function loadVideoFetch(urlId){
    fetch(`https://openapi.programming-hero.com/api/videos/category/${urlId}`)
    .then(res=>res.json())
    .then(data=>loadVideo(data.data));
}


function loadVideo(dataVideos){
  console.log(dataVideos.length)
  let videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML=``;
  let emptyContainer = document.getElementById("empty-container");
  emptyContainer.innerHTML=``;

  if(dataVideos.length==0){
    
    let div = document.createElement("div");
    div.className = "container empty-page border";
    div.innerHTML=`
    <div class="empty-image">
      <img src="./image/Icon.png" alt="">
    </div>
    <div class="empty-title">
      <h3>Oops!! Sorry, There is no content here</h3>
    </div>
    `;
    emptyContainer.appendChild(div);
  }else{
    
    let iconCount = 0;
    for(let dataVideo of dataVideos){
        let div = document.createElement("div");
        div.className = "col";
        div.innerHTML=`
        <div class="h-100">
                <div id="video-image-container-${iconCount}" class="card-video-image-time">
                  <div class="card-video-image">
                    <img src="${dataVideo.thumbnail}" class="card-img-top" alt="...">
                  </div>
                </div>
                <div class="card-body d-flex flex-row mt-3">
                  <div class="card-image">
                    <img src="${dataVideo.authors[0].profile_picture}" alt="">
                  </div>
                  <div class="w-75 ms-3">
                  <h6 class="card-title">${dataVideo.title}</h6>
                    <div id="card-icon-${iconCount}" class="card-icon d-flex flex-row">
                    <p class="card-text mb-0">${dataVideo.authors[0].profile_name}</p>
                  </div>
                  <p class="card-text">${dataVideo.others.views} views</p>
                  </div>
                </div>
              </div>
        `;
        videoContainer.appendChild(div);

        if(dataVideo.authors[0].verified==true){
            let cardIcon = document.getElementById(`card-icon-${iconCount}`);
            let span = document.createElement("span");
            span.className = "badge-check-icon ms-2";
            span.innerHTML=`
            <i class="fa-solid fa-certificate text-primary fs-4"></i>
            <i class="fa-solid fa-check text-white fs-6 check-icon"></i>
            `;
            cardIcon.appendChild(span);
        }

        if(dataVideo.others.posted_date!=""){
          const seconds = dataVideo.others.posted_date;
          const result = new Date(seconds * 1000).toISOString().slice(11, 19).split(":");
          
          let videoImageTime = document.getElementById(`video-image-container-${iconCount}`);
          let small = document.createElement("small");
          small.className = "card-video-time";
          small.innerHTML = `
          <small>${result[0]+" hrs "+result[1]+" min ago"}</small>
          `;
          videoImageTime.appendChild(small);
        }


        
        iconCount++;
        
    }
  }
    
    
   
}



loadVideoFetch("1000");