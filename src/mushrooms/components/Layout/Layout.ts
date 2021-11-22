import './Layout.scss'

const setInnerText = (selector: string, value: string) => {
  const element: HTMLElement | null = document.querySelector(selector)
  if (!element) return
  element.innerText = value
}

function getNewHash(): string {
  let hash = '0x'
  for (var i = 0; i < 64; i++) {
    const chain = Math.floor(Math.random() * 16).toString(16)
    hash += chain
  }
  return hash
}

const copyHashToBuffer = (hash: string) => () => {
  if (!window || !window.location || !navigator) return
  navigator.clipboard.writeText(`${window.location.href}/?hash=${hash}`)
}

const shareButtonHandler = (hash: string) => () => {
  const url = `${window.location.origin}${window.location.pathname}?hash=${hash}`
  if (navigator.share) {
    navigator.share({
      title: `MSHRM ${window.mshrm}`,
      url,
    })
  } else {
    if (!window || !window.location || !navigator) return
    navigator.clipboard.writeText(url)
  }
}

const getNewMshrm = () => {
  window.location.href = window.location.pathname
}

export function initLayout() {
  if (!document) return
  const urlParams = new URLSearchParams(window.location.search)
  const hashFromURL = urlParams.get('hash')

  const hash = hashFromURL || getNewHash()
  window.tokenData = {
    hash,
  }

  //Listen
  document.getElementById('shareButton')?.addEventListener('click', shareButtonHandler(hash))
  document.getElementById('getNewBtn')?.addEventListener('click', getNewMshrm)

  // Elements
  setInnerText('#hash', hash)
  if (!navigator.share) {
    setInnerText('#shareAction', 'Copy')
  }
}

export function updateLayout(meta?: { name: string; city: string; occupation: string }) {
  window.mshrm = meta
  setInnerText('#name', meta?.name || '')
  setInnerText('#shareName', `${meta?.name}'s`)
  setInnerText('#city', meta?.city || '')
  setInnerText('#occupation', meta?.occupation || '')
}
