"use strict";

/* =========================================================
   BABY SHOWER - MELODY ELIANNA
   JAVASCRIPT PRINCIPAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     ELEMENTOS PRINCIPALES
  ======================================================= */

  const body = document.body;

  const cover = document.getElementById("cover");
  const openInvitationButton = document.getElementById("openInvitation");

  const backgroundMusic = document.getElementById("backgroundMusic");

  const musicToggle = document.getElementById("musicToggle");

  const musicIcon = document.getElementById("musicIcon");

  /* =======================================================
     CONFIGURACIÓN GENERAL
  ======================================================= */

  /*
   * Fecha del evento:
   * Domingo 8 de noviembre de 2026
   * 2:00 p. m.
   *
   * -06:00 corresponde al horario de
   * Ciudad de México / Estado de México.
   */

  const EVENT_DATE = new Date("2026-11-08T14:00:00-06:00");

  const MAX_GUESTS = 20;

  /* =======================================================
   GOOGLE APPS SCRIPT
  ====================================================== */

  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwdOYjJbHn7z4vACVb0E5jIqi_ugbcjhcxR4FeIBCfyZqApc4rE4x6x2RguzcYGmeMx/exec";

  /* =======================================================
     ESTADO
  ======================================================= */

  let invitationOpened = false;
  let musicIsPlaying = false;
  let isSubmitting = false;

  /* =======================================================
     ABRIR INVITACIÓN
  ======================================================= */

  async function openInvitation() {
    if (invitationOpened) {
      return;
    }

    invitationOpened = true;

    /*
     * Desbloquear scroll de la página.
     */

    body.classList.remove("page-locked");

    /*
     * Mostrar control flotante de música.
     */

    if (musicToggle) {
      musicToggle.hidden = false;
    }

    /*
     * Intentar reproducir la música.
     *
     * Como ocurre después de un clic del usuario,
     * los navegadores normalmente permitirán
     * la reproducción.
     */

    if (backgroundMusic) {
      try {
        backgroundMusic.volume = 0.75;

        await backgroundMusic.play();

        musicIsPlaying = true;

        updateMusicButton();
      } catch (error) {
        console.warn("El navegador no permitió iniciar el audio:", error);

        musicIsPlaying = false;

        updateMusicButton();
      }
    }

    /*
     * Ocultar portada con la transición CSS.
     */

    if (cover) {
      cover.classList.add("is-open");
    }

    /*
     * Asegurar que el contenido empiece
     * desde la parte superior.
     */

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }

  if (openInvitationButton) {
    openInvitationButton.addEventListener("click", openInvitation);
  }

  /* =======================================================
     CONTROL DE MÚSICA
  ======================================================= */

  function updateMusicButton() {
    if (!musicToggle || !musicIcon) {
      return;
    }

    if (musicIsPlaying) {
      musicIcon.textContent = "❚❚";

      musicToggle.setAttribute("aria-label", "Pausar música");

      musicToggle.setAttribute("title", "Pausar música");
    } else {
      musicIcon.textContent = "♪";

      musicToggle.setAttribute("aria-label", "Reproducir música");

      musicToggle.setAttribute("title", "Reproducir música");
    }
  }

  async function toggleMusic() {
    if (!backgroundMusic) {
      return;
    }

    if (backgroundMusic.paused) {
      try {
        await backgroundMusic.play();

        musicIsPlaying = true;
      } catch (error) {
        console.warn("No fue posible reproducir el audio:", error);

        musicIsPlaying = false;
      }
    } else {
      backgroundMusic.pause();

      musicIsPlaying = false;
    }

    updateMusicButton();
  }

  if (musicToggle) {
    musicToggle.addEventListener("click", toggleMusic);
  }

  /*
   * Sincronizar el estado por si el audio
   * se pausa por alguna acción del navegador.
   */

  if (backgroundMusic) {
    backgroundMusic.addEventListener("play", () => {
      musicIsPlaying = true;
      updateMusicButton();
    });

    backgroundMusic.addEventListener("pause", () => {
      musicIsPlaying = false;
      updateMusicButton();
    });
  }

  /* =======================================================
     CUENTA REGRESIVA
  ======================================================= */

  const daysElement = document.getElementById("days");

  const hoursElement = document.getElementById("hours");

  const minutesElement = document.getElementById("minutes");

  const secondsElement = document.getElementById("seconds");

  const countdownElement = document.getElementById("countdown");

  const countdownFinished = document.getElementById("countdownFinished");

  function formatNumber(number) {
    return String(number).padStart(2, "0");
  }

  function updateCountdown() {
    const now = new Date();

    const difference = EVENT_DATE.getTime() - now.getTime();

    /*
     * El evento ya llegó.
     */

    if (difference <= 0) {
      if (countdownElement) {
        countdownElement.hidden = true;
      }

      if (countdownFinished) {
        countdownFinished.hidden = false;
      }

      return false;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor((totalSeconds % 86400) / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;

    if (daysElement) {
      daysElement.textContent = formatNumber(days);
    }

    if (hoursElement) {
      hoursElement.textContent = formatNumber(hours);
    }

    if (minutesElement) {
      minutesElement.textContent = formatNumber(minutes);
    }

    if (secondsElement) {
      secondsElement.textContent = formatNumber(seconds);
    }

    return true;
  }

  updateCountdown();

  const countdownInterval = setInterval(() => {
    const continueCountdown = updateCountdown();

    if (!continueCountdown) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  /* =======================================================
     ANIMACIONES AL HACER SCROLL
  ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    revealElements.forEach((element) => {
      element.classList.add("is-hidden");
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("is-hidden");

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);
          }
        });
      },

      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  /* =======================================================
     FORMULARIO DE CONFIRMACIÓN
  ======================================================= */

  const confirmationForm = document.getElementById("confirmationForm");

  const guestNameInput = document.getElementById("guestName");

  const guestCountInput = document.getElementById("guestCount");

  const decreaseGuestsButton = document.getElementById("decreaseGuests");

  const increaseGuestsButton = document.getElementById("increaseGuests");

  const nameError = document.getElementById("nameError");

  const guestCountError = document.getElementById("guestCountError");

  const formStatus = document.getElementById("formStatus");

  const submitConfirmation = document.getElementById("submitConfirmation");

  const confirmationSuccess = document.getElementById("confirmationSuccess");

  const confirmationMessage = document.getElementById("confirmationMessage");

  /* =======================================================
     CONTADOR DE ASISTENTES
  ======================================================= */

  function getGuestCount() {
    if (!guestCountInput) {
      return 1;
    }

    return Number(guestCountInput.value);
  }

  function setGuestCount(value) {
    if (!guestCountInput) {
      return;
    }

    const validValue = Math.min(MAX_GUESTS, Math.max(1, value));

    guestCountInput.value = validValue;
  }

  if (decreaseGuestsButton) {
    decreaseGuestsButton.addEventListener("click", () => {
      setGuestCount(getGuestCount() - 1);
    });
  }

  if (increaseGuestsButton) {
    increaseGuestsButton.addEventListener("click", () => {
      setGuestCount(getGuestCount() + 1);
    });
  }

  /* =======================================================
     NORMALIZACIÓN DEL NOMBRE
  ======================================================= */

  /*
   * Esto permitirá que:
   *
   * María Hernández
   * maria hernandez
   * MARÍA   HERNÁNDEZ
   *
   * sean considerados el mismo registro.
   */

  function normalizeName(name) {
    return name
      .trim()
      .toLocaleLowerCase("es-MX")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ");
  }

  /* =======================================================
     VALIDACIONES
  ======================================================= */

  function clearErrors() {
    if (nameError) {
      nameError.textContent = "";
    }

    if (guestCountError) {
      guestCountError.textContent = "";
    }

    if (formStatus) {
      formStatus.textContent = "";
    }
  }

  function validateForm() {
    clearErrors();

    let isValid = true;

    const guestName = guestNameInput ? guestNameInput.value.trim() : "";

    const guestCount = getGuestCount();

    if (!guestName) {
      if (nameError) {
        nameError.textContent = "Por favor escribe tu nombre.";
      }

      isValid = false;
    } else if (guestName.length < 2) {
      if (nameError) {
        nameError.textContent = "Escribe un nombre válido.";
      }

      isValid = false;
    }

    if (
      !Number.isInteger(guestCount) ||
      guestCount < 1 ||
      guestCount > MAX_GUESTS
    ) {
      if (guestCountError) {
        guestCountError.textContent = `Selecciona entre 1 y ${MAX_GUESTS} asistentes.`;
      }

      isValid = false;
    }

    return isValid;
  }

  /* =======================================================
    GUARDAR CONFIRMACIÓN EN GOOGLE SHEETS
  ======================================================= */

  async function saveConfirmationToGoogle(name, guests) {
    const payload = {
      action: "confirm",
      name: name,
      guests: guests,
    };

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",

      /*
       * Usamos text/plain para evitar una petición
       * CORS preflight con Google Apps Script.
       */

      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },

      body: JSON.stringify(payload),

      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(
        result.message || "No fue posible registrar tu asistencia.",
      );
    }

    return result;
  }

  /* =======================================================
     MENSAJE DE CONFIRMACIÓN
  ======================================================= */

  function createConfirmationMessage(name, guests, wasUpdated) {
    const personsText = guests === 1 ? "1 persona" : `${guests} personas`;

    if (wasUpdated) {
      return (
        `¡Gracias, ${name}! ` +
        `Hemos actualizado tu asistencia para ${personsText}. 💕`
      );
    }

    return (
      `¡Gracias, ${name}! ` +
      `Hemos registrado tu asistencia para ${personsText}. 💕`
    );
  }

  /* =======================================================
    ENVÍO DEL FORMULARIO
  ======================================================= */

  if (confirmationForm) {
    confirmationForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      /*
       * Evitar doble envío.
       */

      if (isSubmitting) {
        return;
      }

      if (!validateForm()) {
        return;
      }

      isSubmitting = true;

      if (submitConfirmation) {
        submitConfirmation.disabled = true;

        submitConfirmation.textContent = "Confirmando...";
      }

      if (formStatus) {
        formStatus.textContent = "Estamos registrando tu asistencia...";
      }

      try {
        const guestName = guestNameInput.value.trim().replace(/\s+/g, " ");

        const guestCount = getGuestCount();

        /*
         * Guardar realmente en Google Sheets.
         */

        const result = await saveConfirmationToGoogle(guestName, guestCount);

        /*
         * Apps Script nos indica si fue una
         * nueva confirmación o una actualización.
         */

        const wasUpdated = result.updated === true;

        const finalName = result.confirmation?.name || guestName;

        const finalGuests = Number(result.confirmation?.guests ?? guestCount);

        const message = createConfirmationMessage(
          finalName,
          finalGuests,
          wasUpdated,
        );

        if (confirmationMessage) {
          confirmationMessage.textContent = message;
        }

        if (confirmationSuccess) {
          confirmationSuccess.hidden = false;
        }

        /*
         * Limpiar mensaje temporal.
         */

        if (formStatus) {
          formStatus.textContent = "";
        }

        /*
         * Ocultar formulario después
         * de confirmar.
         */

        confirmationForm.hidden = true;

        /*
         * Llevar suavemente al mensaje.
         */

        setTimeout(() => {
          confirmationSuccess?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 150);
      } catch (error) {
        console.error("Error al guardar confirmación:", error);

        if (formStatus) {
          formStatus.textContent =
            error.message ||
            "No fue posible registrar la confirmación. Intenta nuevamente.";
        }

        if (submitConfirmation) {
          submitConfirmation.disabled = false;

          submitConfirmation.textContent = "Confirmar asistencia";
        }

        isSubmitting = false;
      }
    });
  }

  /* =======================================================
     LIMPIAR ERROR AL ESCRIBIR
  ======================================================= */

  if (guestNameInput) {
    guestNameInput.addEventListener("input", () => {
      if (nameError) {
        nameError.textContent = "";
      }
    });
  }

  /* =======================================================
     ESTADO INICIAL DEL BOTÓN DE MÚSICA
  ======================================================= */

  updateMusicButton();
});
