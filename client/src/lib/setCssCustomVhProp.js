window.addEventListener('resize', setCustomProps)
setCustomProps()

function setCustomProps() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
