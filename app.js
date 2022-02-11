const harry = {
  health: 100,
  images: {
    healthy: 'https://cdn.vox-cdn.com/thumbor/QK6pVSgUPodR2kEFpvl0BL15GrI=/0x0:1920x1080/1200x800/filters:focal(799x210:1105x516)/cdn.vox-cdn.com/uploads/chorus_image/image/70311477/harrypotter.0.jpg',
    hurt: 'https://media.vanityfair.com/photos/54ca8fa97e4b004120bb20b4/16:9/w_1280,c_limit/image.jpg',
    dead: 'https://i.chzbgr.com/full/8974606336/h3D5083CB/crazy-fan-theory-on-whether-harry-potter-actually-died-or-not',
  },
  kills: 0
}

const tom = {
  health: 100,
  images: {
    healthy: 'https://www.looper.com/img/gallery/dumbledores-history-with-voldemort-explained/intro-1641410297.jpg',
    hurt: 'https://imageio.forbes.com/specials-images/imageserve/77202458/The-Real-Look-of-Lord-Voldemort-from--Harry-Potter-and-the-Goblet-of-Fire-/960x0.jpg?fit=bounds&format=jpg&width=960',
    dead: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2019/11/Voldemorts-Death.jpg?q=50&fit=crop&w=450&h=225&dpr=1.5',
  },
  kills: 0
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
        <img class="img img-fluid rounded clickable" 
          src="${image}"
          alt="">
        <h5 class="p-3">Health: <span id="health">${harry.health}</span></h5>
        <div class="progress">
          <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: ${harry.health}%"
            aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
    
  `
  document.getElementById('harry').innerHTML = template
}


function drawTom() {
  let template = ''
  let image = ''
  if (tom.health > 50) {
    image = tom.images.healthy
  } else if (tom.health > 0) {
    image = tom.images.hurt
  } else {
    image = tom.images.dead
  }
  template += `
  
    <h3 class="p-3">Voldemort🐍</h3>
    <img class="img img-fluid rounded clickable" onclick="atk()"
      src="${image}"
      alt="">
    <h5 class="p-3">Health: <span id="health">${tom.health}</span></h5>
    <div class="progress">
      <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: ${tom.health}%"
        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
      </div>
    </div>

  `
  document.getElementById('tom').innerHTML = template

}

function atk() {
  if (tom.health == 0) {
    return
  }
  if (harry.health > 0) {
    tom.health -= Math.floor(Math.random() * 10)
    if (tom.health <= 0) {
      tom.health = 0
    }
  }
  console.log(tom.health)
  drawTom()
  killCount()
}

function dmg() {
  if (harry.health == 0) {
    return
  }
  harry.health -= Math.floor(Math.random() * 10)
  if (harry.health <= 0) {
    harry.health = 0
  }
  drawHarry()
  killCount()
}

function stopDmg() {
  if (tom.health == 0) {
    clearInterval(dmgInterval)
  }
}

function killCount() {
  if (tom.health == 0) {
    harry.kills++
    document.getElementById("harry-kills").innerText = harry.kills
  } else if (harry.health == 0) {
    tom.kills++
    document.getElementById("tom-kills").innerText = tom.kills
  }
}


function reset() {
  tom.health = 100
  harry.health = 100
  drawHarry()
  drawTom()

}


drawHarry()
drawTom()
let dmgInterval = setInterval(dmg, 500)
let stopInterval = setInterval(stopDmg, 500)