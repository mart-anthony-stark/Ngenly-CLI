function showSpinner() {
  const overlay = document.getElementById("overlay");
  const spinner = document.getElementById("spinner");
  overlay.style.display = "block";
  spinner.style.display = "block";
}

function hideSpinner() {
  const overlay = document.getElementById("overlay");
  const spinner = document.getElementById("spinner");
  overlay.style.display = "none";
  spinner.style.display = "none";
}

const generateProject = async (library) => {
  try {
    showSpinner();
    const res = await fetch("/generate-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        library,
        projname: "test",
      }),
    });
    const data = await res.json();
    hideSpinner();
    if (res.ok) {
      Toastify({
        text: `Successfully generated ${library} project: `,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } else {
      Toastify({
        text: data.message || "Internal Server Error",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,9,1) 35%, rgba(255,0,0,1) 100%)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  } catch (error) {
    hideSpinner();
    console.log(error);
  }
};
