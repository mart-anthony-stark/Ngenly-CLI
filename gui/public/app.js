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
const projnameInput = document.querySelector("#projname");

const generateProject = async (library, force = false) => {
  try {
    if (projnameInput.value === null || projnameInput.value === "")
      throw new Error("Project name cannot be empty");

    showSpinner();
    const res = await fetch("/generate-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        library,
        projname: projnameInput.value || "./",
        force,
      }),
    });
    const data = await res.json();
    hideSpinner();
    if (res.ok) {
      Toastify({
        text: `Successfully generated ${library} project: `,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      projnameInput.value = "";
    } else {
      if (data.message.includes("Use --force to override")) {
        Swal.fire({
          title: "Error!",
          text: "The current directory is not empty. Do you want to override to create project files?",
          showDenyButton: true,
          confirmButtonText: "Yes, Proceed",
          confirmButtonColor: "#007bff",
          denyButtonText: `No, I'll move my files`,
        }).then((result) => {
          if (result.isConfirmed) {
            Toastify({
              text: `Retrying to generate files...`,
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              },
              onClick: function () {}, // Callback after click
            }).showToast();
            generateProject(library, true);
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      }
      Toastify({
        text: data.message || "Internal Server Error",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
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
    Toastify({
      text: error.message || "Internal Server Error",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,9,1) 35%, rgba(255,0,0,1) 100%)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }
};
