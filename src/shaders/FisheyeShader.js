import { Uniform } from 'three'
import { BlendFunction, Effect, EffectAttribute } from 'postprocessing'
import { wrapEffect } from './utils.tsx'
import { EffectComposer } from '@react-three/postprocessing'
import { useControls, useCreateStore } from 'leva'
import { useEffect } from 'react'

const GlitchesShader = {
  uniforms: {
    u_force: {
      value: [
        [0, 1, 1, 2],
        [0, 1, 1, 2]
      ]
    }
  },

  vertexShader: `
    `,

  fragmentShader: `
      #ifdef GL_ES
      precision mediump float;
      #endif

      uniform int[2][4] u_force;

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    
        outputColor = inputColor;
    }
    `
}

export class GlitchesEffect extends Effect {
  constructor(
    u_force = [
      [0, 1, 1, 2],
      [0, 1, 1, 2]
    ]
  ) {
    super('GlitchesEffect', GlitchesShader.fragmentShader, {
      blendFunction: BlendFunction.MULTIPLY,
      vertexShader: GlitchesShader.vertexShader,
      uniforms: new Map([['u_force', new Uniform(u_force)]])
    })
  }
}

export const Glitches = wrapEffect(GlitchesEffect)
