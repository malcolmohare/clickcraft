class Item {
  constructor(name, harvest_time, requirements, quantity) {
    this.name = name;
    this.harvest_time = harvest_time;
    this.harvesting = false;
    this.quantity = quantity ?? 1;
    this.requirements = requirements ?? [];
    this.harvest_time_left = -1;
  }

  tick(inventory) {
    if (this.harvest_time_left > 0) {
      this.harvest_time_left -= 1
    }
    if (this.harvest_time_left == 0) {
      console.log("harvest finished");
      inventory[this.name] = (inventory[this.name] ?? 0) + this.quantity;
      console.log(inventory[this.name]);
      this.harvest_time_left = -1;
    }
  }

  harvest() {
    this.harvest_time_left = this.harvest_time;
  }

  click(inventory) {
    if(this.harvest_time_left == -1) {
      if (this.can_harvest(inventory)) {
        this.requirements.forEach(x => inventory[x.name] -= x.quantity);
        this.harvest();
      }
    }
    console.log(this.name + " was clicked!");
  }

  can_harvest(inventory) {
    if (this.requirements.some(x => (inventory[x.name] ?? 0) < x.quantity)) return false;
    return true;
  }
}