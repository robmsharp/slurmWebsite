use wasm_bindgen::prelude::*;
use web_sys::console;
use wasm_bindgen::JsCast;
use web_sys::{Event, FileReader, File};
use js_sys::Uint8Array;
use std::path::Path;
extern crate slurm_emulator;
use slurm_emulator::slurm16_soc::*;

// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// Define the size of our "screen"
pub const NUM_OF_COLOR : usize = 3;
pub const VISIBLE_SCREEN_WIDTH: usize = 640;
pub const VISIBLE_SCREEN_HEIGHT: usize = 480;
const OUTPUT_BUFFER_SIZE: usize = VISIBLE_SCREEN_WIDTH * VISIBLE_SCREEN_HEIGHT * 4;
static mut OUTPUT_BUFFER: [u8; OUTPUT_BUFFER_SIZE] = [0; OUTPUT_BUFFER_SIZE];

static mut fired: bool = false;

// This is like the `main` function, except for JavaScript.
#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    
    console_error_panic_hook::set_once();
    Ok(())
}

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}



#[wasm_bindgen]
pub fn start_emulator(inputbin: &[u8], inputflash: &[u8]) {

  let binLen=inputbin.len();
  let flashLen=inputflash.len();

  let mut soc = Slurm16SoC::new();

  let mut flash_data : Vec<u16> = Vec::new();

  let mut i = 0;

  //minus 1 because looking 2 ahead
  while i<flashLen-1 {
    let short : u16 = u16::from_le_bytes([inputflash[i+0], inputflash[i+1]]);
    flash_data.push(short);
    i+=2;
  }
  
  soc.set_flash(&flash_data);

  alert("Started emulator");
  /*alert(&inputbin.len().to_string());
  alert(&inputrom.len().to_string());
  alert(&rom_data.len().to_string());*/
  
  i=0;
    
  let mut bin_data : Vec<u16> = Vec::new();
  while i<binLen-1 {
    let short : u16 = u16::from_le_bytes([inputbin[i+0], inputbin[i+1]]);
    bin_data.push(short);
    i+=2;
  }

  soc.set_memory(&bin_data, 0, std::cmp::min(bin_data.len(), 256));  

  alert("Finished loading"); 

  let scale = 1.0;

  let width = ((VISIBLE_SCREEN_WIDTH as f32) * scale) as u32;
  let height = ((VISIBLE_SCREEN_HEIGHT as f32) * scale) as u32;

  let mut fb = [[[0; NUM_OF_COLOR]; VISIBLE_SCREEN_WIDTH]; VISIBLE_SCREEN_HEIGHT];
  
  let mut count = 0;
  let mut count2 = 0;

  while (count2 < 300) {
    unsafe {
      fired=false;
      }  
    count2+=1;
    count=0;  
  while (count < 25125000 / 60) {
  
    count+=1;
    let mut audio : [i16; 2] = [0 ; 2];

    let (vs_int, emit_audio) = soc.step(& mut fb, &mut audio);
    unsafe {
    if vs_int && !fired {
      fired=true;
    for j in 0..VISIBLE_SCREEN_HEIGHT {
      for i in 0..VISIBLE_SCREEN_WIDTH {
          let x = i as u32;
          let y = j as u32;
          let color = fb[j][i];

          let pixel_index: usize = (j * VISIBLE_SCREEN_WIDTH) + i; 
          let data_index: usize = 4 * pixel_index;   

          unsafe {
            OUTPUT_BUFFER[data_index + 0] = color[0]; // Red
            OUTPUT_BUFFER[data_index + 1] = color[1]; // Green
            OUTPUT_BUFFER[data_index + 2] = color[2]; // Blue
            OUTPUT_BUFFER[data_index + 3] = 255; // Alpha (Always Opaque)
        }
  }}
  
  let window = web_sys::window().unwrap();
  let document = window.document().unwrap();
  let canvas = document.get_element_by_id("canvas").unwrap().dyn_into::<web_sys::HtmlCanvasElement>().unwrap();
  let context = canvas.get_context("2d").unwrap().unwrap().dyn_into::<web_sys::CanvasRenderingContext2d>().unwrap();
  context.move_to(300.0, 0.0); // top of triangle
  context.begin_path();
  context.line_to(0.0, 600.0); // bottom left of triangle
  context.line_to(600.0, 600.0); // bottom right of triangle
  context.line_to(300.0, 0.0); // back to top of triangle
  context.close_path();
  context.stroke();
  context.fill();
  

}}}}

  
  alert("Finished emulating"); 

  

}

#[wasm_bindgen]
pub fn get_some_image() {
  unsafe {
  fired=false;
  }  
}  
  /*
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
}*/

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
  
  /*unsafe {

  let mut center_x_2 = center_x as i32;
  let mut center_y_2 = center_y as i32;

  center_x_2+=u;
  center_y_2+=v;

  let center_x_3 = center_x_2 as usize;
  let center_y_3 = center_y_2 as usize;

  
    center_x = center_x_3;
    center_y = center_y_3;
  }*/

}
