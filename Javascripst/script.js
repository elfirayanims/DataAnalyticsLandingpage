const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector(".menu");

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('is-active');
  menu.classList.toggle("menu-active");
});

document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("banner");

  const images = [
    "Image/Banner1.png",
    "Image/Banner2.png",
    "Image/Banner3.png"
  ];

  // Preload all images
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  let index = 0;

  // Set the initial image
  banner.style.backgroundImage = `url('${images[index]}')`;

setInterval(() => {
  index = (index + 1) % images.length;
  banner.style.backgroundImage = `url('${images[index]}')`;
}, 5000); // 5 detik
});


//Section Fun Fact
  const counters = document.querySelectorAll('.FunFact__number');

  const animateCounter = (el) => {
    const target = +el.getAttribute('data-target');
    let start = 0;
    const duration = 1500; // animasi 1.5 detik
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * target);

      el.innerText = currentValue;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.innerText = target;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          counter.innerText = "0"; // reset dulu biar animasinya ulang
          animateCounter(counter);
        });
      }
    });
  }, {
    threshold: 0.5
  });

  const section = document.querySelector('.KeyFigure');
  if (section) observer.observe(section);

//animasi fade in per section
document.addEventListener("DOMContentLoaded", function () {
  const observers = document.querySelectorAll(".animate-fadein");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show"); // supaya bisa muncul ulang
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  observers.forEach((el) => observer.observe(el));
});

//emailjs
  document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm("service_2d5iijo", "template_7994unc", this)
      .then(function(response) {
        alert("Pesan berhasil dikirim!");
        console.log("SUCCESS!", response.status, response.text);
        document.getElementById("contact-form").reset(); // Reset form setelah berhasil
      }, function(error) {
        alert("Gagal mengirim pesan. Coba lagi.");
        console.log("FAILED...", error);
      });
  });
