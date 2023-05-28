if (window.location.hostname !== "127.0.0.1") {

  let lastVisit = localStorage.getItem("lastVisit");
  if (lastVisit == null) {
    localStorage.setItem("lastVisit", new Date().getTime());
  }

  const TIMER = 60000 * 5

  if ((new Date().getTime() - Number(lastVisit)) > TIMER) {
    localStorage.setItem("lastVisit", new Date().getTime());

    fetch('https://ipapi.co/json/')
      .then(function (response) {
        response.json().then(jsonData => {

          let vistedCount = localStorage.getItem("vistedCount");
          vistedCount = isNaN(Number(vistedCount)) ? '0' : String(++vistedCount);
          localStorage.setItem("vistedCount", vistedCount);

          fetch('https://discord.com/api/webhooks/1107796509887574158/r4WOD7H-zZNMRo0q2mj0urDqhJesqUSq25Gqy6B2JSPhuQB_GKHWcv_-mbLt3kAhlXpv', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "content": null,
              "embeds": [
                {
                  "title": "اسم المادة",
                  "color": 5814783,
                  "fields": [
                    {
                      "name": "Ip",
                      "value": jsonData.ip,
                      "inline": false
                    },
                    {
                      "name": "Visted Count",
                      "value": vistedCount,
                      "inline": false
                    },
                    {
                      "name": "Country",
                      "value": jsonData.country_name,
                      "inline": false
                    },
                    {
                      "name": "City",
                      "value": jsonData.city,
                      "inline": false
                    },
                    {
                      "name": "Organization",
                      "value": jsonData.org,
                      "inline": false
                    },
                    {
                      "name": "Timezone",
                      "value": jsonData.timezone,
                      "inline": false
                    }
                  ]
                }
              ],
              "username": "العصفورة",
              "avatar_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Tree_Sparrow_Japan_Flip.jpg/1200px-Tree_Sparrow_Japan_Flip.jpg",
              "attachments": []
            })
          })
        });
      })
  }

}


