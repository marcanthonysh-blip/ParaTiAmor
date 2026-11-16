      const btn = document.getElementById("btnEntrar");
      const inicio = document.getElementById("inicio");
      const contenedor = document.getElementById("videoContainer");
      const video = document.getElementById("miVideo");

      async function entrarPantallaCompleta() {
        const el = document.documentElement;
        try {
          if (el.requestFullscreen) {
            await el.requestFullscreen();
          } else if (el.webkitRequestFullscreen) {
            await el.webkitRequestFullscreen();
          } else if (el.msRequestFullscreen) {
            await el.msRequestFullscreen();
          }
        } catch (err) {
          console.warn("Pantalla completa no disponible:", err);
        }
      }

      btn.addEventListener("click", async () => {
        btn.disabled = true;

        const sinAnimacion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        await entrarPantallaCompleta();

        video.muted = false;
        video.currentTime = 0;
        video.play().catch(() => {});

        inicio.classList.add("saliendo");

        setTimeout(
          () => {
            inicio.style.display = "none";
            contenedor.style.display = "block";
            requestAnimationFrame(() => contenedor.classList.add("visible"));
          },
          sinAnimacion ? 0 : 700
        );
      });
