class Item {
  constructor(name, harvest_time) {
    this.name = name;
    this.harvest_time = harvest_time;
    this.harvesting = false;
    this.quantity = 0;
  }

  tick() {
    if (this.harvest_time_left > 0) {
      this.harvest_time_left -= 1
    }
    if (this.harvest_time_left == 0) {
      this.quantity += 1
      this.harvest_time_left = -1;
    }
  }

  harvest() {
    this.harvest_time_left = this.harvest_time;
  }

  click() {
    this.harvest();
    console.log(this.name + " was clicked!");
  }
}