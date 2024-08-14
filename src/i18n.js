import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "translate": "English",
          "position": "Move Shape",
          "positionTop": "Move Position",
        //   SPA
          "table":"FORM & TABLE",
          "title": "Title :",
          "mr":"Mr.",
          "ms":"Ms.",
          "mrs":"Mrs.",
          "name": "Name",
          "selectTitle": "selected",
          "firstname": "Firstname",
          "lastname": "Lastname",
          "thai":"Thai",
          "usa":"USA",
          "birthday": "Birthday",
          "nationality":"Nationality",
          "thai": "Thai",
          "french":"French",
          "citizenID": "CitizenID",
          "gender": "Gener",
          "male": "Male",
          "female":"Female",
          "unsex":"Unsex",
          "phone":"Mobile Phone",
          "passport" :"Passport No",
          "salary":"Expected Salary",
          "reset":"RESET",
          "submit":"SUBMIT",
          "delete":" DELETE",
          "all":"Select All",
          "manage":"MANAGE",
        }
      },
      th: {
        translation: {
          "translate": "ไทย",
          "position": "เลื่อนรูปแบบ",
          "positionTop": "เปลี่ยนตำแหน่ง",
        //   SPA
          "table":"การจัดการหน้าฟอร์ม",
          "title": "คำนำหน้า:",
          "name": "ชื่อ",
          "selectTitle": "คำนำหน้าชื่อ",
          "firstname": "ชื่อจริง:",
          "lastname": "นามสกุล:",
          "birthday": "วันเกิด:",
          "nationality":"สัญชาติ:",
          "thai":"ไทย",
          "usa":"สหรัฐอเมิรกา",
          "citizenID": "เลขบัตรประชาชน:",
          "gender": "เพศ:",
          "male": "ผู้ชาย",
          "female":"ผู้หญิง",
          "unsex":"ไม่ระบุ",
          "phone":"หมายเลขโทรศัพท์มือถือ:",
          "passport" :"หนังสือเดินทาง:",
          "salary":"เงินเดือนที่คาดหวัง",
          "reset":"ล้างข้อมูล",
          "submit":"ส่งข้อมูล",
          "delete":" ลบข้อมูล",
          "all":"เลือกทั้งหมด",
          "manage":"การจัดการ",
        }
      }
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
