const num_rows = 4;
const num_cols = 4;
const item_square_edge_size = 80;
const items = [
  new Item("log", 5),
  new Item("wood", 2, [{name: "log", quantity: 1}]),
  new Item("stick", 1, [{name: "wood", quantity: 1}], 4)
];
var item_coordinates = [];
const inventory = {};

function draw(ctx) {
  ctx.fillStyle = "#AAAAAA";
  ctx.fillRect(0, 0, 500, 500);
  item_coordinates = [];
  for(i = 0; i < items.length; i++) {
    item_location = draw_item(items[i], i, ctx);
    item_coordinates.push({ item: items[i], location: item_location });
  }
}

function main_loop() {
  c = document.getElementById("myCanvas");
  ctx = c.getContext("2d");
  tick_items();
  draw(ctx);
  setTimeout(main_loop, 1000);
}

function draw_item(item, item_index, ctx) {
  x_padding = y_padding = 0;
  if (item_index % num_cols > 0) x_padding = 10;
  if (Math.floor(item_index/num_cols) > 0) y_padding = 10;
  x = 25 + (item_square_edge_size + x_padding) * item_index;
  y = 25 + (item_square_edge_size + y_padding) * Math.floor(item_index/num_cols);
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.rect(x, y, item_square_edge_size, item_square_edge_size);
  ctx.font = "12px Arial";
  ctx.fillStyle = item.can_harvest(inventory) ? "green" : "red";
  ctx.fillText(item.name + ":" + (inventory[item.name] ?? 0), x, y + 12)
  ctx.stroke();
  console.log("draw item")
  return {x0: x, x1: x + item_square_edge_size, y0: y, y1: y + item_square_edge_size};
}

function tick_items() {
  items.forEach(item => item.tick(inventory))
}

function mark_click_position(e) {
  this.current_mouse_position = [e.clientX, e.clientY];
}

function handle_click(e) {
  console.log("click!" + this.current_mouse_position);

  x = this.current_mouse_position[0];
  y = this.current_mouse_position[1];
  // detect collision
  item_coordinates.forEach(val => {
    if (val.location.x0 <= x && val.location.x1 >= x && val.location.y0 <= y && val.location.y1 >= y)
      val.item.click(inventory);
  }); 
}
