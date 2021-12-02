import { cities, names, occupations } from './data'
import './Mushroom.scss'

const sfc32 = (hash: string) => {
  let a = parseInt(hash.substr(0, 8), 16);
  let b = parseInt(hash.substr(8, 8), 16);
  let c = parseInt(hash.substr(16, 8), 16);
  let d = parseInt(hash.substr(24, 8), 16);
  return function () {
    a |= 0; b |= 0; c |= 0; d |= 0;
    let t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
};

export function createMushroom({ element }: { element: string | HTMLCanvasElement | SVGSVGElement }) {
  // TOKEN DATA
  const hash = tokenData?.hash
  if (!hash) return

  const randomDec = sfc32(hash)

  const randomBool = (p: number) => randomDec() < p
  const randomMultiplier = () => randomBool(0.5) ? 1 : -1

  //META
  const meta = {
    name: names[Math.floor(randomDec()*names.length)],
    city: cities[Math.floor(randomDec()*cities.length)],
    occupation: occupations[Math.floor(randomDec()*occupations.length)],
  }

  // COLORS
  const colorsList = new Array(11).fill('').map((x, i) => `#${hash.substr(i * 6, 6)}`)
  const colorsMap = {
    LINE: '#07010c',
    HEAD: colorsList[1],
    BODY: colorsList[2],
    HAND: colorsList[2],
    LEG: colorsList[3],
    BG: colorsList[4],
    SHADOW: 'hsl(0deg 0% 0% / 10%)',
  }

  let illo = new Zdog.Illustration({
    element,
    dragRotate: false,
  })

  // SHAPES
  const HEAD_LENGTH = 90

  const BODY_LENGTH = 60
  const BODY_STROKE = 40
  const BODY_DIAMETER = 30
  const BODY_FULL_LENGTH = BODY_LENGTH + BODY_STROKE
  const BODY_HALF_LENGTH = BODY_FULL_LENGTH / 2

  const FACE_Z = 12
  const EYE_Z = FACE_Z + 3
  const SMILE_Z = FACE_Z - 10

  const HAND_STROKE = 10
  const HAND_LENGTH = 16
  const HAND_Z = -10
  const HAND_DISTANSE = BODY_DIAMETER + HAND_STROKE / 2

  const LEG_STROKE = 10
  const LEG_START = -BODY_HALF_LENGTH
  const LEG_END = LEG_START - 20
  const LEG_DISTANSE = 10

  const SMILE = randomMultiplier()
  const R_HAND = randomMultiplier()
  const L_HAND = randomMultiplier()

  let bg = new Zdog.Ellipse({
    addTo: illo,
    diameter: 280,
    translate: { z: -100 },
    color: colorsMap.BG,
    fill: true,
  })

  let shadow = new Zdog.Ellipse({
    addTo: illo,
    diameter: 80,
    rotate: { x: Zdog.TAU * 0.3 },
    translate: { y: 112 },
    color: colorsMap.SHADOW,
    fill: true,
  })

  let head = new Zdog.Cone({
    addTo: illo,
    rotate: { x: Zdog.TAU * 0.3 },
    translate: { y: -4 },
    diameter: 140,
    length: HEAD_LENGTH,
    stroke: 40,
    color: colorsMap.HEAD,
    fill: true,
  })

  let body = new Zdog.Cylinder({
    addTo: head,
    translate: { z: -BODY_HALF_LENGTH },
    diameter: BODY_DIAMETER,
    length: BODY_LENGTH,
    stroke: BODY_STROKE,
    color: colorsMap.BODY,
    backface: colorsMap.LEG,
    fill: true,
  })

  let eye = new Zdog.Shape({
    addTo: body,
    translate: { x: -16, y: 24, z: EYE_Z },
    stroke: 10,
    color: colorsMap.LINE,
  })

  eye.copy({
    translate: { x: 16, y: 24, z: EYE_Z },
  })

  let smile = new Zdog.Ellipse({
    addTo: body,
    diameter: 10,
    quarters: 2,
    translate: { x: 0, y: 30, z: SMILE_Z },
    rotate: { x: Zdog.TAU / 4, z: (Zdog.TAU / 4) * SMILE },
    color: colorsMap.LINE,
    stroke: 3,
  })

  const leftHand = new Zdog.Shape({
    addTo: body,
    path: [
      { x: 0, z: 0 },
      {
        arc: [
          { x: -(HAND_LENGTH / 2), z: 0 },
          { x: -(HAND_LENGTH / 2), z: HAND_LENGTH * L_HAND },
        ],
      },
    ],
    translate: { x: -HAND_DISTANSE, z: HAND_Z },
    stroke: HAND_STROKE,
    closed: false,
    color: colorsMap.HAND,
  })

  const rightHand = leftHand.copy({
    path: [
      { x: 0, z: 0 },
      {
        arc: [
          { x: HAND_LENGTH / 2, z: 0 },
          { x: HAND_LENGTH / 2, z: HAND_LENGTH * R_HAND },
        ],
      },
    ],
    translate: { x: HAND_DISTANSE, z: HAND_Z },
  })

  let rightLeg = new Zdog.Shape({
    addTo: body,
    path: [{ z: LEG_START }, { z: LEG_END }],
    translate: { x: -LEG_DISTANSE },
    stroke: LEG_STROKE,
    color: colorsMap.LEG,
  })

  let leftLeg = rightLeg.copy({
    translate: { x: LEG_DISTANSE },
  })

  // ANIMATION CONFIG
  type AnimationConfig = {
    MULTIPLIER: -1 | 1,
    DELTA: number,
  }
  
  const headRotation: AnimationConfig = {
    MULTIPLIER: 1,
    DELTA: 0.3,
  }
  
  const headTranslate: AnimationConfig = {
    MULTIPLIER: 1,
    DELTA: 0.6,
  }
  
  const legTranslate: AnimationConfig = {
    MULTIPLIER: 1,
    DELTA: 2.4,
  }

  const SPEED = 0.08
  
  const getAnimationMultiplier = (multiplier: 1 | -1, parameter: number, delta: number): 1 | -1 => {
    if (multiplier === 1 && parameter > delta) {
      return -1
    }

    if (multiplier === -1 && parameter < -delta) {
      return 1
    }
    
    return multiplier
  }

  // RENDER
  function animate() {
    // HEAD ROTATION
    head.rotate.z += (headRotation.MULTIPLIER * SPEED) / 8

    headRotation.MULTIPLIER = getAnimationMultiplier(
        headRotation.MULTIPLIER, head.rotate.z, headRotation.DELTA
    )

    // HEAD TRANSLATE
    head.translate.y += (headTranslate.MULTIPLIER * SPEED) / 4

    headTranslate.MULTIPLIER = getAnimationMultiplier(
        headTranslate.MULTIPLIER, head.translate.y, headTranslate.DELTA
    )

    // LEGS TRANSLATE
    rightLeg.translate.z += legTranslate.MULTIPLIER * SPEED
    leftLeg.translate.z = -rightLeg.translate.z

    legTranslate.MULTIPLIER = getAnimationMultiplier(
        legTranslate.MULTIPLIER, rightLeg.translate.z, legTranslate.DELTA
    )

    illo.updateRenderGraph()
    requestAnimationFrame(animate)
  }

  animate()

  return meta;
}
