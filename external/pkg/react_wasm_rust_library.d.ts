/* tslint:disable */
/* eslint-disable */
/**
*/
export function main_js(): void;
/**
* @returns {number}
*/
export function get_output_buffer_pointer(): number;
/**
* @param {number} u
* @param {number} v
*/
export function set_center(u: number, v: number): void;
/**
*/
export enum KeyEvent {
  A,
  B,
  UP,
  DOWN,
  LEFT,
  RIGHT,
}
/**
*/
export class WasmEmulator {
  free(): void;
/**
*/
  constructor();
/**
* @param {boolean} press
* @param {number} key
*/
  update_key(press: boolean, key: number): void;
/**
*/
  step_fast(): void;
/**
*/
  step_forward(): void;
/**
* @param {Uint8Array} inputbin
* @param {Uint8Array} inputflash
*/
  start_emulator(inputbin: Uint8Array, inputflash: Uint8Array): void;
}
