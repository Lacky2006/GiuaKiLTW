"use strict";

document.documentElement.classList.add("co-javascript");

document.addEventListener("DOMContentLoaded", () => {
  const dauTrang = document.querySelector(".dau-trang");
  const trinhDonDieuHuong = document.querySelector("#trinh-don-dieu-huong");
  const nutMoDieuHuong = document.querySelector("#nut-mo-dieu-huong");
  const cacLienKetDieuHuong = document.querySelectorAll(".dieu-huong__lien-ket");
  const nutDoiGiaoDien = document.querySelector("#nut-doi-giao-dien");
  const nutLenDau = document.querySelector("#nut-len-dau");

  
  const dongTrinhDonDiDong = () => {
    trinhDonDieuHuong.classList.remove("dang-mo");
    nutMoDieuHuong.classList.remove("dang-chon");
    nutMoDieuHuong.setAttribute("aria-expanded", "false");
    nutMoDieuHuong.setAttribute("aria-label", "Mở menu điều hướng");
    document.body.classList.remove("trinh-don-dang-mo");
  };

  nutMoDieuHuong.addEventListener("click", () => {
    const dangMo = trinhDonDieuHuong.classList.toggle("dang-mo");
    nutMoDieuHuong.classList.toggle("dang-chon", dangMo);
    nutMoDieuHuong.setAttribute("aria-expanded", String(dangMo));
    nutMoDieuHuong.setAttribute("aria-label", dangMo ? "Đóng menu điều hướng" : "Mở menu điều hướng");
    document.body.classList.toggle("trinh-don-dang-mo", dangMo);
  });

  cacLienKetDieuHuong.forEach((lienKet) => lienKet.addEventListener("click", dongTrinhDonDiDong));
  document.addEventListener("keydown", (suKien) => {
    if (suKien.key === "Escape") dongTrinhDonDiDong();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) dongTrinhDonDiDong();
  });

  
  const capNhatNutGiaoDien = (giaoDien) => {
    const nhanNutGiaoDien = giaoDien === "toi" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối";
    nutDoiGiaoDien.setAttribute("aria-label", nhanNutGiaoDien);
    const mauThanhTrinhDuyet = giaoDien === "toi" ? "#11141b" : "#f4f2eb";
    document.querySelector('meta[name="theme-color"]').setAttribute("content", mauThanhTrinhDuyet);
  };

  capNhatNutGiaoDien(document.documentElement.dataset.giaoDien || "sang");

  nutDoiGiaoDien.addEventListener("click", () => {
    const giaoDienKeTiep = document.documentElement.dataset.giaoDien === "toi" ? "sang" : "toi";
    document.documentElement.dataset.giaoDien = giaoDienKeTiep;
    capNhatNutGiaoDien(giaoDienKeTiep);

    try {
      localStorage.setItem("giao-dien-portfolio", giaoDienKeTiep);
    } catch (loi) {

      console.info("Không thể lưu giao diện vào localStorage.");
    }
  });

  
  const xuLyCuonTrang = () => {
    dauTrang.classList.toggle("da-cuon", window.scrollY > 20);
    nutLenDau.classList.toggle("da-hien", window.scrollY > 600);
  };

  xuLyCuonTrang();
  window.addEventListener("scroll", xuLyCuonTrang, { passive: true });
  nutLenDau.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const boTheoDoiPhan = new IntersectionObserver(
    (cacMucQuanSat) => {
      cacMucQuanSat.forEach((mucQuanSat) => {
        if (!mucQuanSat.isIntersecting) return;
        cacLienKetDieuHuong.forEach((lienKet) => {
          lienKet.classList.toggle("dang-chon", lienKet.getAttribute("href") === `#${mucQuanSat.target.id}`);
        });
      });
    },
    { rootMargin: "-35% 0px -55%", threshold: 0 }
  );
  document.querySelectorAll("main section[id]").forEach((phanNoiDung) => boTheoDoiPhan.observe(phanNoiDung));

  
  const cacNutBoLoc = document.querySelectorAll(".bo-loc-du-an__nut");
  const cacTheDuAn = document.querySelectorAll(".the-du-an");

  cacNutBoLoc.forEach((nutLoc) => {
    nutLoc.addEventListener("click", () => {
      const boLocDaChon = nutLoc.dataset.boLoc;

      cacNutBoLoc.forEach((nutTrongNhom) => {
        const dangDuocChon = nutTrongNhom === nutLoc;
        nutTrongNhom.classList.toggle("dang-chon", dangDuocChon);
        nutTrongNhom.setAttribute("aria-pressed", String(dangDuocChon));
      });

      cacTheDuAn.forEach((theDuAn) => theDuAn.classList.add("dang-loc"));
      window.setTimeout(() => {
        cacTheDuAn.forEach((theDuAn) => {
          const cacDanhMuc = theDuAn.dataset.danhMuc.split(" ");
          const phuHopBoLoc = boLocDaChon === "tat-ca" || cacDanhMuc.includes(boLocDaChon);
          theDuAn.classList.toggle("dang-an", !phuHopBoLoc);
          theDuAn.classList.remove("dang-loc");
        });
      }, 180);
    });
  });

  const cacPhanTuHienKhiCuon = document.querySelectorAll(".hien-khi-cuon");
  const muonGiamChuyenDong = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (muonGiamChuyenDong || !("IntersectionObserver" in window)) {
    cacPhanTuHienKhiCuon.forEach((phanTu) => phanTu.classList.add("da-hien"));
  } else {
    const boTheoDoiHienThi = new IntersectionObserver(
      (cacMucQuanSat, boTheoDoi) => {
        cacMucQuanSat.forEach((mucQuanSat) => {
          if (mucQuanSat.isIntersecting) {
            mucQuanSat.target.classList.add("da-hien");
            boTheoDoi.unobserve(mucQuanSat.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px" }
    );
    cacPhanTuHienKhiCuon.forEach((phanTu) => boTheoDoiHienThi.observe(phanTu));
  }

  document.querySelector("#nam-hien-tai").textContent = new Date().getFullYear();
});
