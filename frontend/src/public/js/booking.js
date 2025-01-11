async function fetchTimes() {
  try {
    const hall = document.getElementById("hallSelect");
    hall.addEventListener("change", fetchTimes);

    const today = new Date();
    const todayTime = today.getHours();
    const todayDate = today.toISOString().split("T")[0];

    const hallID = document.getElementById("hallSelect").value;
    const date = document.getElementById("dateSelect").value;

    const res = await fetch(`/fetchTimes/${hallID}/${date}`);
    onchange = "fetchTimes()";
    const slots = await res.json();

    const timeSelect = document.getElementById("timeSelect");
    timeSelect.innerHTML = slots
      .map(
        (slot) =>
          `<option value="${slot.time + ":00"}" ${
            !slot.available ? "disabled" : ""
          }>${slot.time + ":00"}${!slot.available ? " (Booked)" : ""}</option>`
      )
      .join("");

    if (date === todayDate) {
      for (let i = 8; i < todayTime + 1; i++) {
        const option = timeSelect.querySelector(`option[value="${i + ":00"}"]`);
        option.disabled = true;
        option.innerHTML = `${i}:00 (Passed)`;
      }
    }

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

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(e.target);
    const data = {
      hall_id: formData.get("hall_id"),
      date: formData.get("date"),
      timeStart: formData.get("timeStart"),
      timeEnd: formData.get("timeEnd"),
    };

    const res = await fetch("/booking/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const resData = await res.json();
    alert(resData.message);

    if (resData.success) {
      window.location.href = resData.redirectURL;
    }
  } catch (err) {
    console.error(err);
  }
});
