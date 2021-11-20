import './Mushroom.scss'

export function createMushroom({ element }: { element: string }) {
  let illo = new Zdog.Illustration({
    element,
    dragRotate: false,
  })

  const getRHEX = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
  const getRMultiplier = () => (Math.random() < 0.5 ? 1 : -1)

  // SHAPES
  const LINE_COLOR = '#07010c'

  const HEAD_LENGTH = 90
  const HEAD_COLOR = getRHEX()

  const BODY_LENGTH = 60
  const BODY_STROKE = 40
  const BODY_DIAMETER = 30
  const BODY_FULL_LENGTH = BODY_LENGTH + BODY_STROKE
  const BODY_HALF_LENGTH = BODY_FULL_LENGTH / 2
  const BODY_COLOR = getRHEX()

  const FACE_Z = 12
  const EYE_Z = FACE_Z + 3
  const SMILE_Z = FACE_Z - 10

  const HAND_STROKE = 10
  const HAND_LENGTH = 16
  const HAND_Z = -10
  const HAND_DISTANSE = BODY_DIAMETER + HAND_STROKE / 2
  const HAND_COLOR = BODY_COLOR

  const LEG_STROKE = 10
  const LEG_START = -BODY_HALF_LENGTH
  const LEG_END = LEG_START - 20
  const LEG_DISTANSE = 10
  const LEG_COLOR = getRHEX()

  const SMILE = getRMultiplier()
  const R_HAND = getRMultiplier()
  const L_HAND = getRMultiplier()

  const BG_BG = getRHEX()

  let bg = new Zdog.Ellipse({
    addTo: illo,
    diameter: 280,
    translate: { z: -100 },
    color: BG_BG,
    fill: true,
  })

  let shadow = new Zdog.Ellipse({
    addTo: illo,
    diameter: 80,
    rotate: { x: Zdog.TAU * 0.3 },
    translate: { y: 112 },
    color: 'hsl(0deg 0% 0% / 10%)',
    fill: true,
  })

  let head = new Zdog.Cone({
    addTo: illo,
    rotate: { x: Zdog.TAU * 0.3 },
    translate: { y: -4 },
    diameter: 140,
    length: HEAD_LENGTH,
    stroke: 40,
    color: HEAD_COLOR,
    fill: true,
  })

  let body = new Zdog.Cylinder({
    addTo: head,
    translate: { z: -BODY_HALF_LENGTH },
    diameter: BODY_DIAMETER,
    length: BODY_LENGTH,
    stroke: BODY_STROKE,
    color: BODY_COLOR,
    backface: LEG_COLOR,

    fill: true,
  })

  let eye = new Zdog.Shape({
    addTo: body,
    translate: { x: -16, y: 24, z: EYE_Z },
    stroke: 10,
    color: LINE_COLOR,
  })
  eye.copy({
    translate: { x: 16, y: 24, z: EYE_Z },
  })

  let smile = new Zdog.Ellipse({
    addTo: body,
    diameter: 10,
    quarters: 2, // semi-circle
    translate: { x: 0, y: 30, z: SMILE_Z },
    // rotate semi-circle to point up
    rotate: { x: Zdog.TAU / 4, z: (Zdog.TAU / 4) * SMILE },
    color: LINE_COLOR,
    stroke: 3,
  })

  const hand = new Zdog.Shape({
    addTo: body,
    path: [
      { x: 0, z: 0 }, // start
      {
        arc: [
          { x: -(HAND_LENGTH / 2), z: 0 }, // corner
          { x: -(HAND_LENGTH / 2), z: HAND_LENGTH * L_HAND }, // end point
        ],
      },
    ],
    translate: { x: -HAND_DISTANSE, z: HAND_Z },
    stroke: HAND_STROKE,
    closed: false,
    color: HAND_COLOR,
  })
  hand.copy({
    path: [
      { x: 0, z: 0 }, // start
      {
        arc: [
          { x: HAND_LENGTH / 2, z: 0 }, // corner
          { x: HAND_LENGTH / 2, z: HAND_LENGTH * R_HAND }, // end point
        ],
      },
    ],
    translate: { x: HAND_DISTANSE, z: HAND_Z },
  })

  let rleg = new Zdog.Shape({
    addTo: body,
    path: [{ z: LEG_START }, { z: LEG_END }],
    translate: { x: -LEG_DISTANSE },
    stroke: LEG_STROKE,
    color: LEG_COLOR,
  })
  let lleg = rleg.copy({
    translate: { x: LEG_DISTANSE },
  })

  let rL = false
  let rR = false
  let rD = 0.3
  let rM = 1

  let hT = false
  let hB = false
  let hD = 0.6
  let hM = 1

  let lT = false
  let lB = false
  let lD = 2.4
  let lM = 1

  let speed = 0.08

  // RENDER
  function animate() {
    // ROATATION
    head.rotate.z += (rM * speed) / 8
    if (!rL && head.rotate.z > rD) {
      rL = true
      rR = false
      rM = -1
    }

    if (!rR && head.rotate.z < -rD) {
      rR = true
      rL = false
      rM = 1
    }

    // STEPS HEAD
    head.translate.y += (hM * speed) / 4

    if (!hT && head.translate.y > hD) {
      hT = true
      hB = false
      hM = -1
    }

    if (!hB && head.translate.y < -hD) {
      hB = true
      hT = false
      hM = 1
    }

    // STEPS LEGS
    rleg.translate.z += lM * speed
    lleg.translate.z = -rleg.translate.z

    if (!lT && rleg.translate.z > lD) {
      lT = true
      lB = false
      lM = -1
    }

    if (!lB && rleg.translate.z < -lD) {
      lB = true
      lT = false
      lM = 1
    }

    illo.updateRenderGraph()
    requestAnimationFrame(animate)
  }

  animate()
}
