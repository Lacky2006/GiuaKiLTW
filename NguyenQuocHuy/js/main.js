const nutMenu = document.getElementById("nut-menu");
const danhSachMenu = document.getElementById("danh-sach-menu");

nutMenu.addEventListener("click", function () {
  danhSachMenu.classList.toggle("mo");

  if (danhSachMenu.classList.contains("mo")) {
    nutMenu.setAttribute("aria-expanded", "true");
  } else {
    nutMenu.setAttribute("aria-expanded", "false");
  }
});

const cacNutLoc = document.querySelectorAll(".nut-loc");
const cacDuAn = document.querySelectorAll(".du-an");

cacNutLoc.forEach(function (nut) {
  nut.addEventListener("click", function () {
    const loaiCanHien = nut.getAttribute("data-loai");

    cacNutLoc.forEach(function (nutKhac) {
      nutKhac.classList.remove("dang-chon");
    });
    nut.classList.add("dang-chon");

    cacDuAn.forEach(function (duAn) {
      const congNghe = duAn.getAttribute("data-cong-nghe");

      if (loaiCanHien === "tat-ca" || congNghe.includes(loaiCanHien)) {
        duAn.classList.remove("an");
      } else {
        duAn.classList.add("an");
      }
    });
  });
});

document.getElementById("nam-hien-tai").textContent = new Date().getFullYear();
