use wasm_bindgen::prelude::*;
use web_sys::console;
use wasm_bindgen::JsCast;

// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// Define the size of our "screen"
const SCREEN_WIDTH: usize = 320;
const SCREEN_HEIGHT: usize = 200;
const OUTPUT_BUFFER_SIZE: usize = SCREEN_WIDTH * SCREEN_HEIGHT * 4;
static mut OUTPUT_BUFFER: [u8; OUTPUT_BUFFER_SIZE] = [0; OUTPUT_BUFFER_SIZE];
static mut center_x: usize = 100;
static mut center_y: usize = 100;

// This is like the `main` function, except for JavaScript.
#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    
    console_error_panic_hook::set_once();
    Ok(())
}

#[wasm_bindgen]
pub fn get_some_image() {

  for y in 0..(SCREEN_HEIGHT) {
    for x in 0..(SCREEN_WIDTH) {

      let mut r = 0;
      let mut g = 0;
      let mut b = 0;
    
      unsafe {

        if x==center_x {
          r = 255;
          g = 0;
          b = 0;
        }
        
        if y==center_y {
          r = 0;
          g = 0;
          b = 255;
        }
      }

      let r2 = r as u8;
      let g2 = g as u8;
      let b2 = b as u8;

      let pixel_index: usize = (y * SCREEN_WIDTH) + x; 
      let data_index: usize = 4 * pixel_index;    

      unsafe {
          OUTPUT_BUFFER[data_index + 0] = r2; // Red
          OUTPUT_BUFFER[data_index + 1] = g2; // Green
          OUTPUT_BUFFER[data_index + 2] = b2; // Blue
          OUTPUT_BUFFER[data_index + 3] = 255; // Alpha (Always Opaque)
      }
    }
  }  
}

// Function to return a pointer to our buffer
// in wasm memory
#[wasm_bindgen]
pub fn get_output_buffer_pointer() -> *const u8 {
  let pointer: *const u8;
  unsafe {
    pointer = OUTPUT_BUFFER.as_ptr();
  }

  return pointer;
}

#[wasm_bindgen]
pub fn set_center(u:i32, v: i32)  {
  
  unsafe {

  let mut center_x_2 = center_x as i32;
  let mut center_y_2 = center_y as i32;

  center_x_2+=u;
  center_y_2+=v;

  let center_x_3 = center_x_2 as usize;
  let center_y_3 = center_y_2 as usize;

  
    center_x = center_x_3;
    center_y = center_y_3;
  }

}
