/* === FUNCIONES JAVASCRIPT === */
/* Función para compartir el enlace en móviles */
function compartirEnlace() {
  const url = "https://caroldianeha.github.io/";
  const title = document.title || "Business Card";
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url
    }).catch(() => {
      // Si falla el share, intentar copiar solo el enlace
      copiarEnlaceAlPortapapeles(url);
    });
  } else {
    // Fallback para desktop o navegadores sin soporte
    copiarEnlaceAlPortapapeles(url);
  }
}

// Función auxiliar para copiar el enlace al portapapeles con manejo de errores
function copiarEnlaceAlPortapapeles(url) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
      .then(() => {
        // alert("Enlace copiado al portapapeles");
      })
      .catch(() => {
        // Fallback para navegadores que no permiten clipboard
        copiarManual(url);
      });
  } else {
    copiarManual(url);
  }
}

// Fallback manual para copiar el enlace en navegadores antiguos o móviles
function copiarManual(url) {
  const tempInput = document.createElement('input');
  tempInput.value = url;
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // Para móviles
  try {
    document.execCommand('copy');
    // alert("Enlace copiado al portapapeles");
  } catch (err) {
    alert("No se pudo copiar el enlace. Copia manualmente: " + url);
  }
  document.body.removeChild(tempInput);
}

/* Función que muestra la lista de servicios disponibles */
/* PARA EDITAR: Cambiar el texto dentro de alert() por tus servicios */
function mostrarServicios() {
  alert("Servicios disponibles:\n\n• Chatbots\n• Automatizaciones con IA\n• Desarrollo Web\n• Aplicaciones Moviles\n• Business Intelligence (Reportes PowerBI)\n• Digital Business Cards\n• Tarjetas NFC Personalizadas");
}

/* Función para agregar contacto - Compatible con móviles */
function agregarContacto() {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Carol Diane Hernández-Andaluz
N:Hernández-Andaluz;Carol Diane;;;
ORG:HA Technologies
TEL;TYPE=CELL:787-586-8170
EMAIL:carol.d.hernandez@outlook.com
URL:https://hatechnologiespr.github.io/
ADR:;;San Lorenzo;Puerto Rico;;;
NOTE:Servicios: Chatbots, Automatizaciones con IA, Desarrollo Web, Apps Móviles, Business Intelligence, Tarjetas Digitales y NFC
END:VCARD`;

  // Detectar si es un dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Para dispositivos móviles, crear un enlace temporal y hacer click
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CarolDianeHA_Contacto.vcf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    // Limpiar después de un breve delay
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  } else {
    // Para desktop, usar el método tradicional
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CarolDianeHA_Contacto.vcf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
