import type { AppTranslation } from "../types/app-translation";

export const AR: AppTranslation = {
  devices: "الأجهزة",
  connections: "الاتصالات",
  settings: "الإعدادات",
  add: "إضافة",
  edit: "تعديل",
  delete: "حذف",
  noConnection: "غير متصل",

  deleteConfirmation: "هل أنت متأكد من أنك تريد حذف هذا العنصر؟",
  cancel: "إلغاء",

  addDevice: "إضافة جهاز",
  editDevice: "تعديل الجهاز",
  deleteDevice: "حذف الجهاز",
  name: "الاسم",
  macAddress: "عنوان MAC",
  ipAddressIOptional: "عنوان IP (اختياري: يُستخدم للـ Ping)",

  addConnection: "إضافة اتصال",
  editConnection: "تعديل الاتصال",
  deleteConnection: "حذف الاتصال",
  authenthication: "المصادقة",
  useAuthenthication: "استخدام المصادقة",
  username: "اسم المستخدم",
  connectionAuthenthication: "مصادقة الاتصال",
  password: "كلمة المرور",
  connect: "اتصال",
  connected: "متصل",
  disconnected: "غير متصل",
  close: "إغلاق",

  theme: "المظهر",
  system: "النظام",
  light: "فاتح",
  dark: "داكن",
  language: "اللغة",

  powerStatus: "حالة التشغيل",
  deviceOn: "الجهاز قيد التشغيل",
  deviceOff: "الجهاز متوقف",
  loading: "جارٍ التحميل...",
  error: "خطأ",
  errorOccured: "حدث خطأ",
  noContent: "لا يوجد محتوى",
  connectionError:
    "حدث خطأ أثناء الاتصال. يرجى التحقق من بيانات الدخول والشبكة.",
  noResponse: "لا توجد استجابة",
  timeoutMessage: "انتهت المهلة ولم يتم استلام أي استجابة",
  wolSent: "تم إرسال WOL (Wake-on-LAN)",
  install: "تثبيت",

  notFound: "غير موجود",
  landingPage: "الصفحة الرئيسية",

  noDevices: {
    title: "لا توجد أجهزة",
    subTitle: "ابدأ بإضافة أجهزة",
  },
  noConnections: {
    title: "لا توجد اتصالات",
    subTitle: "ابدأ بإضافة اتصالات إلى وسيط MQTT",
  },
};
