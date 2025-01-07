async function fetchTimes() {
  try {
    const hall = document.getElementById("hallSelect");
    hall.addEventListener("change", fetchTimes);

    const hallID = document.getElementById("hallSelect").value;
    const date = document.getElementById("dateSelect").value;

    const res = await fetch(`/fetchTimes/${hallID}/${date}`);
    onchange = "fetchTimes()";
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

    timeSelect.innerHTML =
      `<option value="" disabled selected>Select a time</option>` +
      timeSelect.innerHTML;
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

    const disabledSlots = slots.filter((slot) => !slot.available);

    timeSelect.innerHTML = "";
    for (let i = 8; i < 22; i++) {
      if (disabledSlots.some((ds) => ds.time === i && ds.time > startTime))
        break;
      if (i <= startTime) continue;
      timeSelect.innerHTML += `<option value="${i + ":00"}">${i}:00</option>`;
    }
  } catch (err) {
    console.error(err);
  }
}
