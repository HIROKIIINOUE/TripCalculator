import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const ContactForm = () => {
  const { t } = useTranslation();
  const contactEmail =
    import.meta.env.VITE_CONTACT_EMAIL ?? "your-email@example.com";
  const contactSubject = encodeURIComponent("From Trip Calculator");
  const mailToHref = `mailto:${contactEmail}?subject=${contactSubject}`;

  return (
    <section className="mx-auto w-full max-w-3xl px-1 py-2 sm:mt-10">
      <div className="relative mt-6 overflow-hidden rounded-4xl border border-slate-100 bg-slate-50 shadow-[0_30px_80px_rgba(234,88,12,0.16)]">
        <div className="relative z-10 flex flex-col p-5 sm:p-8">
          <div>
            <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
              {t("contactPage.title")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              {t("contactPage.description")}
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-orange-100 bg-white p-5 shadow-[0_20px_50px_rgba(251,146,60,0.12)]">
            <p className="text-sm font-bold text-slate-700">
              {t("contactPage.email")}
            </p>
            <p className="mt-2 break-all text-base text-slate-900">
              {contactEmail}
            </p>
          </div>

          <a
            href={mailToHref}
            className="mt-7 inline-flex h-13 items-center justify-center rounded-2xl bg-orange-500 px-6 text-base font-black text-white shadow-[0_20px_40px_rgba(249,115,22,0.34)] transition hover:-translate-y-0.5 hover:bg-orange-600 active:translate-y-0 cursor-pointer"
          >
            {t("contactPage.submit")}
          </a>
          <Link
            to="/home"
            className="mt-4 inline-flex h-13 items-center justify-center rounded-2xl bg-orange-700 px-6 text-base font-black text-white shadow-[0_20px_40px_rgba(194,65,12,0.24)] transition hover:-translate-y-0.5 hover:bg-orange-800 active:translate-y-0 cursor-pointer"
          >
            {t("navigation.home")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
