let choice;
let registeredMembers = [];
let totalRevenue = 0;
let checkInCount = 0;
let currentYear = new Date().getFullYear();

do {
  console.log("---------- GYM FITNESS ----------");
  console.log("1. Dang ky hoi vien moi");
  console.log("2. Tinh tien goi tap");
  console.log("3. Quet ma the check-in");
  console.log("4. Bao cao va thoat");
  console.log("---------------------------------");

  choice = prompt("Nhap lua chon cua ban:");

  switch (choice) {
    case "1": {
      let name = prompt("Nhap ho ten hoi vien:");
      name = name.trim();

      let cardCode = prompt("Nhap ma the hoi vien:");
      cardCode = cardCode.trim().toUpperCase();

      let packageType = prompt("Nhap goi tap (STANDARD/VIP):");
      packageType = packageType.trim().toUpperCase();

      if (name === "") {
        console.log("Ho ten khong duoc de trong!");
        break;
      }

      if (
        !cardCode.startsWith("GYM-") ||
        !cardCode.endsWith(String(currentYear))
      ) {
        console.log("Ma the khong hop le!");
        break;
      }

      if (packageType !== "STANDARD" && packageType !== "VIP") {
        console.log("Goi tap khong hop le!");
        break;
      }

      let duplicate = false;

      for (let i = 0; i < registeredMembers.length; i++) {
        if (registeredMembers[i].cardCode === cardCode) {
          duplicate = true;
          break;
        }
      }

      if (duplicate) {
        console.log("Ma the da duoc dang ky!");
        break;
      }

      let months = Number(prompt("Nhap so thang dang ky:"));

      if (months <= 0 || !Number.isInteger(months)) {
        console.log("So thang khong hop le!");
        break;
      }

      let ptSessions = Number(prompt("Nhap so buoi PT (0 neu khong co):"));

      if (ptSessions < 0 || !Number.isInteger(ptSessions)) {
        console.log("So buoi PT khong hop le!");
        break;
      }

      let member = {
        name: name,
        cardCode: cardCode,
        packageType: packageType,
        months: months,
        ptSessions: ptSessions,
        paid: false,
      };

      registeredMembers.push(member);

      console.log("Dang ky hoi vien thanh cong!");
      console.log("Ho ten: " + name);
      console.log("Ma the: " + cardCode);
      console.log("Goi tap: " + packageType);

      break;
    }

    case "2": {
      if (registeredMembers.length === 0) {
        console.log("Vui long dang ky hoi vien truoc!");
        break;
      }

      let searchCode = prompt("Nhap ma the hoi vien can thanh toan:");
      searchCode = searchCode.trim().toUpperCase();

      let member = null;

      for (let i = 0; i < registeredMembers.length; i++) {
        if (registeredMembers[i].cardCode === searchCode) {
          member = registeredMembers[i];
          break;
        }
      }

      if (member === null) {
        console.log("Khong tim thay hoi vien!");
        break;
      }

      if (member.paid) {
        console.log("Hoi vien nay da thanh toan!");
        break;
      }

      let monthlyFee;

      if (member.packageType === "STANDARD") {
        monthlyFee = 500000;
      } else {
        monthlyFee = 800000;
      }

      let packageTotal = monthlyFee * member.months;
      let ptTotal = member.ptSessions * 300000;
      let discountRate = 0;

      if (member.months >= 12) {
        discountRate = 0.25;
      } else if (member.months >= 6) {
        discountRate = 0.15;
      }

      let discount = packageTotal * discountRate;
      let finalTotal = packageTotal - discount + ptTotal;

      console.log("          HOA DON GYM FITNESS");
      console.log("Hoi vien: " + member.name);
      console.log("Ma the: " + member.cardCode);
      console.log("Goi tap: " + member.packageType);
      console.log("So thang: " + member.months);
      console.log(
        "Tien goi tap: " + packageTotal.toLocaleString("vi-VN") + " VND",
      );
      console.log("So buoi PT: " + member.ptSessions);
      console.log("Tien PT: " + ptTotal.toLocaleString("vi-VN") + " VND");
      console.log("Giam gia: " + discountRate * 100 + "%");
      console.log("Tien giam: " + discount.toLocaleString("vi-VN") + " VND");
      console.log(
        "Tong thanh toan: " + finalTotal.toLocaleString("vi-VN") + " VND",
      );

      member.paid = true;
      totalRevenue += finalTotal;

      console.log("Thanh toan thanh cong!");

      break;
    }

    case "3": {
      let checkInCode = prompt("Quet ma the hoi vien:");
      checkInCode = checkInCode.trim().toUpperCase();

      let validMember = null;

      for (let i = 0; i < registeredMembers.length; i++) {
        if (registeredMembers[i].cardCode === checkInCode) {
          validMember = registeredMembers[i];
          break;
        }
      }

      if (
        !checkInCode.startsWith("GYM-") ||
        !checkInCode.endsWith(String(currentYear)) ||
        validMember === null
      ) {
        console.log("Ma the khong hop le hoac chua dang ky!");
        break;
      }

      checkInCount++;

      console.log("Check-in thanh cong!");
      console.log("Hoi vien: " + validMember.name);
      console.log("Ma the: " + validMember.cardCode);
      console.log("Tong luot check-in: " + checkInCount);

      break;
    }

    case "4": {
      console.log("       BAO CAO CA TRUC GYM FITNESS");
      console.log("Tong so hoi vien: " + registeredMembers.length);
      console.log("Tong luot check-in: " + checkInCount);
      console.log(
        "Tong doanh thu: " + totalRevenue.toLocaleString("vi-VN") + " VND",
      );
      console.log("Ket thuc ca truc. Hen gap lai!");

      break;
    }

    default:
      console.log("Lua chon khong hop le! Vui long chon tu 1 den 4");
  }
} while (choice !== "4");
