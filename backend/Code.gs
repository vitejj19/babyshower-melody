"use strict";

/* =========================================================
   BABY SHOWER - MELODY ELIANNA
   API DE CONFIRMACIONES
========================================================= */

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const SPREADSHEET_ID = "1T0xTPjkfaKQ4noybWdxj2ESz6dFi7GpVRhiMaz-I7Xw";

const SHEET_NAME = "Confirmaciones";

const TIME_ZONE = "America/Mexico_City";

const MAX_GUESTS = 20;

/*
 * Se permiten confirmaciones hasta el
 * domingo 25 de octubre de 2026.
 *
 * El bloqueo comienza:
 * 26 de octubre de 2026 a las 00:00.
 */

const CONFIRMATION_DEADLINE = new Date("2026-10-26T00:00:00-06:00");

const DEADLINE_MESSAGE = "El periodo de confirmación ha finalizado.";

/* =========================================================
   COLUMNAS
========================================================= */

const COLUMNS = {
  NAME: 1,
  NORMALIZED_NAME: 2,
  GUESTS: 3,
  FIRST_CONFIRMATION: 4,
  LAST_UPDATE: 5,
};

/* =========================================================
   GET
========================================================= */

function doGet(e) {
  try {
    const action = cleanText_(e?.parameter?.action).toLowerCase();

    /*
     * Prueba de funcionamiento:
     *
     * /exec?action=health
     */

    if (action === "health") {
      return jsonResponse_({
        success: true,
        message: "API Baby Shower Melody activa",
      });
    }

    return jsonResponse_({
      success: false,
      message: "Acción GET no reconocida.",
    });
  } catch (error) {
    console.error(error);

    return jsonResponse_({
      success: false,
      message: "Ocurrió un error al procesar la solicitud.",
    });
  }
}

/* =========================================================
   POST
========================================================= */

function doPost(e) {
  const lock = LockService.getScriptLock();

  let lockAcquired = false;

  try {
    /*
     * Evita que dos personas escriban
     * simultáneamente en la misma fila.
     */

    lock.waitLock(10000);

    lockAcquired = true;

    const payload = parsePayload_(e);

    const action = cleanText_(payload.action).toLowerCase();

    if (action !== "confirm") {
      return jsonResponse_({
        success: false,
        message: "Acción POST no reconocida.",
      });
    }

    return saveConfirmation_(payload);
  } catch (error) {
    console.error(error);

    return jsonResponse_({
      success: false,

      message:
        error && error.message
          ? error.message
          : "No fue posible procesar la confirmación.",
    });
  } finally {
    if (lockAcquired) {
      try {
        lock.releaseLock();
      } catch (error) {
        console.error(error);
      }
    }
  }
}

/* =========================================================
   GUARDAR / ACTUALIZAR CONFIRMACIÓN
========================================================= */

function saveConfirmation_(payload) {
  /*
   * Validar fecha límite.
   */

  if (new Date().getTime() >= CONFIRMATION_DEADLINE.getTime()) {
    return jsonResponse_({
      success: false,
      expired: true,
      message: DEADLINE_MESSAGE,
    });
  }

  /*
   * Obtener valores enviados.
   */

  const name = cleanText_(payload.name);

  const guests = Number(payload.guests);

  /*
   * Validar nombre.
   */

  if (!name) {
    return jsonResponse_({
      success: false,
      message: "Por favor escribe tu nombre.",
    });
  }

  if (name.length < 2) {
    return jsonResponse_({
      success: false,
      message: "Escribe un nombre válido.",
    });
  }

  /*
   * Validar asistentes.
   */

  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS) {
    return jsonResponse_({
      success: false,

      message: "El número de asistentes no es válido.",
    });
  }

  const normalizedName = normalizeName_(name);

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

  const sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('No se encontró la hoja "' + SHEET_NAME + '".');
  }

  const now = new Date();

  const lastRow = sheet.getLastRow();

  let existingRow = 0;

  /* =======================================================
     BUSCAR NOMBRE EXISTENTE
  ======================================================= */

  if (lastRow >= 2) {
    const normalizedNames = sheet
      .getRange(2, COLUMNS.NORMALIZED_NAME, lastRow - 1, 1)
      .getDisplayValues();

    for (let index = 0; index < normalizedNames.length; index++) {
      const storedName = normalizeName_(normalizedNames[index][0]);

      if (storedName === normalizedName) {
        existingRow = index + 2;

        break;
      }
    }
  }

  /* =======================================================
     ACTUALIZAR REGISTRO EXISTENTE
  ======================================================= */

  if (existingRow > 0) {
    /*
     * Actualizar nombre visible.
     */

    sheet.getRange(existingRow, COLUMNS.NAME).setValue(safeSheetText_(name));

    /*
     * Mantener clave normalizada.
     */

    sheet
      .getRange(existingRow, COLUMNS.NORMALIZED_NAME)
      .setValue(safeSheetText_(normalizedName));

    /*
     * Actualizar asistentes.
     */

    sheet.getRange(existingRow, COLUMNS.GUESTS).setValue(guests);

    /*
     * Actualizar fecha.
     */

    sheet.getRange(existingRow, COLUMNS.LAST_UPDATE).setValue(now);

    SpreadsheetApp.flush();

    return jsonResponse_({
      success: true,

      updated: true,

      message: "Hemos actualizado tu confirmación.",

      confirmation: {
        name: name,

        guests: guests,

        status: "updated",

        lastUpdate: formatDate_(now),
      },
    });
  }

  /* =======================================================
     NUEVA CONFIRMACIÓN
  ======================================================= */

  const newRow = Math.max(2, lastRow + 1);

  sheet
    .getRange(newRow, 1, 1, 5)
    .setValues([
      [safeSheetText_(name), safeSheetText_(normalizedName), guests, now, now],
    ]);

  SpreadsheetApp.flush();

  return jsonResponse_({
    success: true,

    updated: false,

    message: "Hemos registrado tu confirmación.",

    confirmation: {
      name: name,

      guests: guests,

      status: "created",

      firstConfirmation: formatDate_(now),

      lastUpdate: formatDate_(now),
    },
  });
}

/* =========================================================
   NORMALIZAR NOMBRE
========================================================= */

function normalizeName_(value) {
  return cleanText_(value)
    .toLocaleLowerCase("es-MX")

    .normalize("NFD")

    .replace(/[\u0300-\u036f]/g, "")

    .replace(/\s+/g, " ")

    .trim();
}

/* =========================================================
   LIMPIAR TEXTO
========================================================= */

function cleanText_(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim().replace(/\s+/g, " ");
}

/* =========================================================
   EVITAR FÓRMULAS EN SHEETS
========================================================= */

function safeSheetText_(value) {
  const text = cleanText_(value);

  if (!text) {
    return "";
  }

  /*
   * Evita que un nombre introducido por
   * un visitante se interprete como fórmula.
   */

  if (/^[=+\-@]/.test(text)) {
    return "'" + text;
  }

  return text;
}

/* =========================================================
   LEER PAYLOAD
========================================================= */

function parsePayload_(e) {
  /*
   * El sitio enviará JSON como text/plain.
   *
   * Esto replica el mecanismo usado por
   * nuestra invitación anterior.
   */

  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (error) {
      /*
       * Si no era JSON, intentamos parámetros.
       */
    }
  }

  return e?.parameter || {};
}

/* =========================================================
   RESPUESTA JSON
========================================================= */

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/* =========================================================
   FORMATO DE FECHA
========================================================= */

function formatDate_(date) {
  return Utilities.formatDate(date, TIME_ZONE, "dd/MM/yyyy HH:mm");
}

/* =========================================================
   PRUEBA DE CONFIGURACIÓN
========================================================= */

function probarConfiguracion() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

  const sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('No se encontró la hoja "' + SHEET_NAME + '".');
  }

  Logger.log("Archivo: " + spreadsheet.getName());

  Logger.log("Hoja: " + sheet.getName());

  Logger.log("Última fila: " + sheet.getLastRow());

  Logger.log("Zona horaria: " + TIME_ZONE);
}
