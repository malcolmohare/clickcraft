const num_rows = 4;
const num_cols = 4;
const item_square_edge_size = 80;
const items = [new Item("wood", 5)];

function draw(ctx) {
  ctx.fillStyle = "#AAAAAA";
  ctx.fillRect(0, 0, 500, 500);
  for(i = 0; i < items.length; i++) {
    draw_item(items[i], i, ctx);
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
  x = 25;
  y = 25;
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.rect(x, y, item_square_edge_size, item_square_edge_size);
  ctx.font = "12px Arial";
  ctx.fillText(item.name, x, y + 12)
  ctx.stroke();
  console.log("draw item")
}

function tick_items() {
  items.forEach(item => item.tick)
}

function handle_click() {
  //
}
