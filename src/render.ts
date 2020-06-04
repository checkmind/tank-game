interface entry {
  width: number;
  height: number;
  x: number;
  y: number;
  name?:string;
  id: number;
  life: number;
}
export default class render {
  constructor() {
    document.body.innerHTML += `<div id='map'></div>`

    window.onload = function() {
      console.log('oon')
      document.getElementById('btn').onclick = function() {
        localStorage.code = document.getElementById('tank1')['value']
        localStorage.code2 = document.getElementById('tank2')['value']
      }
    }
  }
  public render(entry: entry) {
    const id = `id-${entry.id}`
    if(document.getElementById(id)) {
      document.getElementById(id).style.left = `${entry.x}px`
      document.getElementById(id).style.top = `${entry.y}px`
    } else {
      document.getElementById('map').innerHTML += `<div id="${id}" style='width: ${entry.width}px;height: ${entry.height}px;left:${entry.x}px;top:${entry.y}px;'></div>`
    }
    if(entry.life <= 0) {
      console.log('销毁', id)
      document.getElementById(id).style.display = 'none'
    }
  }
}