// Globals
// =======
  
// Canvas context 2D
var c = a.getContext("2d");

// Init local storage to 1 if it's not already set
localStorage["scpm_level"] = 3;

// Current screen (0: main menu / 1: level selection / 2: playing / 3: editor)
var screen = 1;

// Previous screen (when we quit a level, 0: when playing a shared level / 1: when playing a built-in level / 3: whe testing a level in the level eitor)
var last_screen = 0;

// Mouse down (player is clicking)
var mousedown = false;

// Player is right clicking
var rightclick = false;

// Mario's width (not 32px in order to pass easily between two blocks)
var mario_width = 24;

// Gravity (downwards acceleration):
var gravity = 2;

// Max fall speed (for mario and cubes)
var max_fall_speed = 20;

// Jump speed (upwards vy force):
var jump_speed = 20;

// Walk speed (horizontal vx)
var walk_speed = 6;

// Mouse coords (in tiles)
var tile_x = tile_y = 0;

// Mouse coords (in px)
var x = y = 0;

// Current level
var level = 0;

// All the data of the current level
var level_data = {};

// Other globals (editor)
var pipe_click, current_pipe, balance_click, current_balance, current_editor_tile, mouse_tile_x, mouse_tile_y, pipe_high, pipe_low, end_pipe, end_pole, number, drawn_tile;

// Other globals (gameplay)
var win, win_frame, coins_left, loop, frame, current_mario, solid, yellow_toggle, yellow_toggle_last_frame, pipes_state, balances_state, yellow_toggle_delay, yellow_toggle_on, blue_portal, orange_portal, temp_side;

// Built-in levels:
var levels = [
  
  // 0: nope
  {},
  
  // 1
{hash:
"0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000002000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0F00000606060000000000000060000000000000\
0G00000505050000000000000000000000004000\
3330000000000004000400000000000000004000\
3333000000000044000440000000000000004000\
333330<0000004440004440000700<0<0<004000\
3333333333333333000333333333333333333333\
3333333333333333000333333333333333333333"},
  
  // 2
{pipes:[[17,16,4,15,16]],balances:[[31,8,35,17]],hash:
"0000000000000000000000000000000000000000\
0000000000000000000000000000000<000<0000\
0000000000000000000000000000000900090000\
000000<000000000000000000000000000000000\
0000000000000000000033333333000000000000\
0000099990000000000000300000000000000000\
0000000090000000060000300000000000000000\
00000:::90000000000000300000000000000002\
0000000090000000060000300000000000000000\
0000099990000000000000300000000000000000\
0000000090000000006000300000000000000000\
00000:::90000000000000300000000000000000\
0000000090000000006000300000000000000000\
0000099990000000000000300000000000000003\
00000000900000000000<0300000000000000003\
0F00000090000000000000300000000000000003\
0G0;000090000000000000300000000000000003\
3333333333333333333333300000000000000003\
3333333333333333333333300000000000000003\
0000000000000000000000000000000000000000"},


// 3
{hash:
"0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000400\
0344444444444444444440000000000000000400\
0300000000000000000000000000000000000400\
0300000000000000000000000000000000000400\
0300000000000000000000000008000000000400\
030000<007777000000000000008000000000400\
0344444444444444444440000008000000000400\
0400000000000000000000000008000;00000400\
0300000000000000000000000008003333993300\
0300000000000000000000000008003000000300\
0300040000444444444440000008003020000300\
0300044000400000000000000008003000000300\
03F0044400400000000000000000003000000300\
03G0000000400000000000000000003000000300\
0344444444400000000000000000003333333300\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000"}

];
