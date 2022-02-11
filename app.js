

const characters = {
  harry: {
    health: 100,
    images: 'https://cdn.vox-cdn.com/thumbor/QK6pVSgUPodR2kEFpvl0BL15GrI=/0x0:1920x1080/1200x800/filters:focal(799x210:1105x516)/cdn.vox-cdn.com/uploads/chorus_image/image/70311477/harrypotter.0.jpg'
  },
  tom: {
    health: 100,
    images: 'https://www.looper.com/img/gallery/dumbledores-history-with-voldemort-explained/intro-1641410297.jpg'
  }
}

function drawHarry() {
  let template = ''
  let image = ''
  if (harry.health > 50) {
    image = harry.images.healthy
  } else if (harry.health > 0) {
    image = harry.images.hurt
  } else {
    image = harry.images.dead
  }
  template += `
   
    <h3 class="p-3">Harry⚡</h3>
      <img class="img img-fluid rounded clickable" src="${image}" alt="">
      <h5 class="p-3">Health: <span id="health">${harry.health}</span></h5>
      <div class="progress">
        <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: ${harry.health}%"
            aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        </div>
      </div>
    
  `
  document.getElementById('harry').innerHTML = template
}


function drawChar() {
  let template = ""
  for (let key in characters) {
    let character = characters[key]
    console.log(key)
    template = `
    
    <h3 class="p-3">${key}</h3>
      <img class="img img-fluid rounded clickable" onclick="attack(${key == "tom" ? "tom" : ""})" src="${character.images}"
      alt="">
      <h5 class="p-3">Health: <span id="health">${character.health}</span></h5>
      <div class="progress">
        <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: ${character.health}%"
          aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        </div>
      </div>

    `

    document.getElementById(key).innerHTML = template
  }
}

function updateChart(name) {
  let bossElem = document.getElementById(name)
  let bar = bossElem.querySelector('.progress-bar')
  bar.style.width = characters[name].health + '%'

}

// this function is invoked when you click on voldermort, which makes health decrease and if it is 0 then it equals 0, but harry potter has to have health above 100
function attack(boss) {
  console.log(boss.health)
  if (boss.health > 0) {
    boss.health -= Math.floor(Math.random() * 10)
    console.log(boss.health);
    if (boss.health <= 0) {
      boss.health = 0
    }
  }
  drawChar()
}

// this fucntion is set on a interval below everything, but it decreases harrys health on a set interval
function damage() {
  characters.harry.health -= Math.floor(Math.random() * 10)
  console.log(characters.harry.health);
  if (characters.harry.health <= 0) {
    characters.harry.health = 0

  }
  drawChar()
}



// stops the interval of harry health decreasing when valmor is dead
function stopDmg() {
  if (tom.health == 0) {
    clearInterval(dmgInterval)
  }
}

// the reset button when the game is over
function reset() {
  characters.tom.health = 100
  characters.harry.health = 100
  drawChar()
}


drawChar()
let dmgInterval = setInterval(damage, 500)
let stopInterval = setInterval(stopDmg, 500)

