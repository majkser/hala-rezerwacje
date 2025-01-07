async function fetchTimes() {
  try {
    const hallID = document.getElementById("hallSelect").value;
    const date = document.getElementById("dateSelect").value;

    const res = await fetch(`/fetchTimes/${hallID}/${date}`);
    const slots = await res.json();

    const timeSelect = document.getElementById("timeSelect");
    timeSelect.innerHTML = slots
      .map(
        (slot) =>
          `<option value="${slot.time}" ${!slot.available ? "disabled" : ""}>${
            slot.time + ":00"
          }${!slot.available ? " (Booked)" : ""}</option>`
      )
      .join("");
  } catch (err) {
    console.error(err);
  }
}

async function fetchEndTimes() {
  try {
    const hallID = document.getElementById("hallSelect").value;
    const date = document.getElementById("dateSelect").value;

    const res = await fetch(`/fetchTimes/${hallID}/${date}`);
    const slots = await res.json();

    const startTime = document.getElementById("timeSelect").value.split(":")[0];
    const timeSelect = document.getElementById("endTimeSelect");

    const disabledSlots = slots.filter(
      (slot) => slot.time <= startTime || !slot.available
    );

    timeSelect.innerHTML = "";
    for (let i = 0; i < slots.length; i++) {
      if (slots[i].time <= startTime || !slots[i].available) {
        continue;
      }
      timeSelect.innerHTML += `<option value="${slots[i].time}">${slots[i].time}:00</option>`;
    }
  } catch (err) {
    console.error(err);
  }
}
