

const characters = {
  harry: {
    health: 100,
    images: {
      healthy: 'https://cdn.vox-cdn.com/thumbor/QK6pVSgUPodR2kEFpvl0BL15GrI=/0x0:1920x1080/1200x800/filters:focal(799x210:1105x516)/cdn.vox-cdn.com/uploads/chorus_image/image/70311477/harrypotter.0.jpg',
      hurt: 'https://media.vanityfair.com/photos/54ca8fa97e4b004120bb20b4/16:9/w_1280,c_limit/image.jpg',
      dead: 'https://i.chzbgr.com/full/8974606336/h3D5083CB/crazy-fan-theory-on-whether-harry-potter-actually-died-or-not',
    },
  },
  tom: {
    health: 100,
    images: {
      healthy: 'https://www.looper.com/img/gallery/dumbledores-history-with-voldemort-explained/intro-1641410297.jpg',
      hurt: 'https://imageio.forbes.com/specials-images/imageserve/77202458/The-Real-Look-of-Lord-Voldemort-from--Harry-Potter-and-the-Goblet-of-Fire-/960x0.jpg?fit=bounds&format=jpg&width=960',
      dead: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2019/11/Voldemorts-Death.jpg?q=50&fit=crop&w=450&h=225&dpr=1.5',
    }
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
  let img = ""
  for (let key in characters) {
    let character = characters[key]
    if (character.health > 50) {
      img = character.images.healthy
    } else if (character.health > 0) {
      img = character.images.hurt
    } else {
      img = character.images.dead
    }
    template = `
    
    <h3 class="p-3">${key}</h3>
      <img class="img img-fluid rounded clickable" onclick="attack('${key == "tom" ? "tom" : ""}')" src="${img}"
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
  stopDmg()
}

function updateChart(name) {
  let bossElem = document.getElementById(name)
  let bar = bossElem.querySelector('.progress-bar')
  bar.style.width = characters[name].health + '%'

}

// this function is invoked when you click on voldermort, which makes health decrease and if it is 0 then it equals 0, but harry potter has to have health above 100
function attack(boss) {
  console.log(characters[boss].health);
  let char = characters[boss]
  if (char.health > 0) {
    char.health -= Math.floor(Math.random() * 10)
    console.log(char.health);
    if (char.health <= 0) {
      char.health = 0
    }

  }
  drawChar()
}

// this fucntion is set on a interval below everything, but it decreases harrys health on a set interval
function damage() {

  console.log(characters.harry.health);
  if (characters.harry.health >= 0) {
    characters.harry.health -= Math.floor(Math.random() * 10)

  }
  if (characters.harry.health <= 0) {
    characters.harry.health = 0

  }
  drawChar()
}



// stops the interval of harry health decreasing when valmor is dead
function stopDmg() {
  if (characters.tom.health == 0) {
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

