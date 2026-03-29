import Link from "next/link";
import { useAppConfig } from "@/hooks/useAppConfig";

export const Hero = () => {
  const { appName, getTerminology } = useAppConfig();

  return (
    <div className="relative isolate overflow-hidden bg-white dark:bg-gray-950 px-6 pt-14 lg:px-8">
      {/* Background gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-3xl py-16 sm:py-24 lg:py-32 flex flex-col items-center text-center">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-5 py-2 text-sm text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-white/20 hover:ring-gray-900/20 dark:hover:ring-white/40 shadow-sm transition-all duration-300">
            Announcing our next-generation platform.{' '}
            <Link href="#" className="font-bold text-black dark:text-white group relative">
              <span aria-hidden="true" className="absolute inset-0" />
              Read more <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>

        <h1 className="text-5xl font-black tracking-tight text-gray-900 dark:text-white sm:text-7xl mb-6 leading-tight">
          Discover Premium <br className="hidden sm:block" />
          <span className="text-black dark:text-white">
            {getTerminology(2)}
          </span>
        </h1>

        <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400 max-w-xl mb-10">
          The most secure and elevated marketplace for your curated collection. 
          Buy, sell, and build seamlessly with {appName}.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#browse"
            className="rounded-full bg-black dark:bg-white text-white dark:text-black px-10 py-4 text-sm font-bold shadow-xl hover:bg-gray-900 dark:hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:ring-4 focus:ring-black/10 active:scale-95 w-full sm:w-auto text-center"
          >
            Start Exploring
          </Link>
          <Link href="/login" className="text-sm font-bold text-gray-900 dark:text-white px-8 py-4 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all group flex items-center justify-center gap-2 w-full sm:w-auto">
            Become a Seller
            <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
};
