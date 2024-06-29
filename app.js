const grafic = document.getElementById("grafic")
const range = document.getElementById("range")
const numPuntos = document.getElementById("num-puntos")
const calculate = document.getElementById("calculate")
const pi = document.getElementById("pi")
const total = document.getElementById("total-dots")
const blueDots = document.getElementById("blue-dots")



range.addEventListener("input", () => {
  numPuntos.innerText = range.value
})


const randomNumber = () => Number((Math.random() * 2 - 1).toFixed(3))
const randomDot = () => ({x: randomNumber(), y: randomNumber()})


//Chart
const width = 560
const height = 560
const marginRight = 30
const marginLeft = 30
const marginTop = 30
const marginBotton = 30


const x = d3.scaleLinear().domain([-1,1]).range([marginLeft, width - marginRight])
const y = d3.scaleLinear().domain([-1,1]).range([height - marginBotton, marginTop])

const svg = d3.create("svg").attr("width", width).attr("height", height)

// Add the x-axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBotton})`)
    .call(d3.axisBottom(x))

// Add the y-axis.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y))


svg.append("path")
  .attr("transform", "translate(280,280)")
  .attr("d", d3.arc()({
    innerRadius: 249,
    outerRadius: 250,
    startAngle: 0,
    endAngle: Math.PI * 2
  }));

grafic.append(svg.node());


//Añado puntos 

calculate.addEventListener("click", () => {
  let totalDots = range.value
  let insideDots = 0
  svg.selectAll(".dot").remove()

  for (let i = 0; i < totalDots; i++) {
    let dot = randomDot()

    if ((dot.x**2) + (dot.y**2) <= 1) {

      insideDots++
      svg.append("path")
      .attr("d", d3.symbol(d3.symbolCircle).size(15))
      .attr("transform", `translate(${(dot.x * 250 ) + 280},${(dot.y * 250) + 280})`)
      .attr("fill", "blue")
      .attr("class", "dot")

    } else {
      svg.append("path")
      .attr("d", d3.symbol(d3.symbolCircle).size(15))
      .attr("transform", `translate(${(dot.x * 250 ) + 280},${(dot.y * 250) + 280})`)
      .attr("fill", "red")
      .attr("class", "dot")
    }

  }

  total.innerHTML = totalDots
  blueDots.innerHTML = insideDots
  pi.innerText = 4 * (insideDots / totalDots)

})