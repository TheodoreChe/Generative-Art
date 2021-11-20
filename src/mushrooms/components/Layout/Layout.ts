import './Layout.scss'

function genTokenData(): string {
  let hash = '0x'
  for (var i = 0; i < 64; i++) {
    const chain = Math.floor(Math.random() * 16).toString(16)
    hash += chain
  }
  return hash
}

export function initLayout() {
  if (!document) return
  const hash = genTokenData()
  const hashInput: HTMLInputElement | null = document.querySelector('input#hash')
  if (!hashInput) return
  hashInput.value = hash
  console.log('hash', hash)
}
