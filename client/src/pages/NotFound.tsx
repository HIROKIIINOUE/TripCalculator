import { useTranslation } from "react-i18next";
import ToHomeButton from "../components/buttons/ToHomeButton";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[calc(100vh-10rem)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute inset-0" />
      <div className="w-full max-w-3xl rounded-[2rem] border border-orange-100 bg-white p-6 shadow-[0_30px_80px_-32px_rgba(120,53,15,0.35)] sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-bold tracking-[0.35em] text-orange-500">
              {t("notFound.eyebrow")}
            </p>
            <h1 className="mt-4 text-4xl font-black  text-stone-900 sm:text-5xl">
              {t("notFound.title")}
            </h1>
            <p className="mt-4 max-w-lg text-sm text-stone-600 sm:text-base">
              {t("notFound.description")}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ToHomeButton />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
