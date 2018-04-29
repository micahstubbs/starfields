var starCount = Math.random() * (1000 - 900) + 900,
  starField = document.getElementById('starField')
for (var i = 0; i <= starCount; i++) {
  var starSpaceLeft = Math.random() * (97 - 3) + 3 + '%',
    starSpaceTop = Math.random() * (97 - 3) + 3 + '%',
    starDistance = '.' + Math.floor(Math.random() * (100 - 50) + 50)
  star = document.createElement('div')
  star.setAttribute('class', 'star')
  star.setAttribute('id', 'star-' + (i + 1))
  star.setAttribute(
    'style',
    'top: ' +
      starSpaceTop +
      '; left: ' +
      starSpaceLeft +
      '; opacity: ' +
      starDistance
  )
  starField.appendChild(star)
}
//Animation
var starClass = '.star',
  spawnDelay = Math.floor(Math.random(100 - 50) + 50)
setInterval(function() {
  // travelTime = Math.floor(Math.random(10000 - 500) + 500)
  travelTime = Math.floor(Math.random() * 1000000)
  var travelToX = 0,
    travelToY = 0,
    travelerId = '#star-' + Math.floor(Math.random() * (starCount - 1) + 1),
    traveler = $(travelerId + starClass),
    travelerX = traveler.position().left,
    travelerY = traveler.position().top,
    travelOriginX = $(window).width() / 2,
    travelOriginY = $(window).height() / 2
  if (traveler.position().left > travelOriginX) {
    if (traveler.position().top > $(window).height() / 2) {
      travelToX = travelerX - travelOriginX + travelerX
      travelToY = travelerY - travelOriginY + travelerY
    } else {
      travelToX = travelerX - travelOriginX + travelerX
      travelToY = travelerY - (travelOriginY - travelerY)
    }
  } else {
    if (traveler.position().top > $(window).height() / 2) {
      travelToX = travelerX - (travelOriginX - travelerX)
      travelToY = travelerY - travelOriginY + travelerY
    } else {
      travelToX = travelerX - (travelOriginX - travelerX)
      travelToY = travelerY - (travelOriginY - travelerY)
    }
  }
  traveler.velocity(
    {
      left: travelToX,
      top: travelToY,
      width: '5px',
      height: '5px',
      opacity: 0
    },
    {
      duration: travelTime,
      complete: function() {
        traveler.velocity(
          {
            opacity: 0,
            width: '2px',
            height: '2px'
          },
          {
            duration: 1000,
            complete: function() {
              starSpaceLeft = Math.random() * (97 - 3) + 3 + '%'
              starSpaceTop = Math.random() * (97 - 3) + 3 + '%'
              starDistance = '.' + Math.floor(Math.random() * (100 - 50) + 50)
              traveler.css('left', starSpaceLeft)
              traveler.css('top', starSpaceTop)
              traveler.velocity(
                {
                  opacity: starDistance
                },
                {
                  duration: travelTime
                }
              )
            }
          }
        )
      }
    }
  )
}, spawnDelay)
