import Link from "next/link";
import ImageShowCase from "./ImageShowCase";
import RevealOnScroll from "./RevealOnScroll";

const LandingDescription = (): React.JSX.Element => (
  <div className="mt-32 w-full max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
    <div className="relative inline-block mx-8 sm:mx-12 my-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-4">
        Harvest Your UI: A Crop of Fresh Components
      </h1>
      <div className="absolute -top-10 -left-10 sm:-top-16 sm:-left-16 w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 sm:w-10 sm:h-10 text-green-600"
        >
          <path d="M12 2c-5.5 0-10 4.5-10 10 0 5.5 4.5 10 10 10s10-4.5 10-10c0-5.5-4.5-10-10-10zm-1 15v-4H7l5-7 5 7h-4v4h-2z" />
        </svg>
      </div>
      <div className="absolute -bottom-6 -right-6 sm:-bottom-12 sm:-right-12 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600"
        >
          <path d="M12 2c-5.5 0-10 4.5-10 10 0 5.5 4.5 10 10 10s10-4.5 10-10c0-5.5-4.5-10-10-10zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      </div>
    </div>
    <p className="text-lg sm:text-xl text-muted-foreground mt-4 mb-8">
      Cultivate your design with our handpicked selection of UI components
    </p>
    <div className="my-36 mx-auto w-80 md:w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 ">
      <RevealOnScroll>
        <div className="max-w-96 py-10 inline-flex items-center justify-center text-primary-foreground bg-primary rounded-lg px-6 shadow-lg mb-20 md:mb-0 w-full">
          <ImageShowCase />
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="flex flex-col justify-center gap-16">
          <p className="mx-auto max-w-96 font-medium text-center">
            In the realm of modern web development, your power lies not in the
            brute force of monolithic code, but in the artful assembly of
            components. Each button, form, and carousel is a building block of
            potential, waiting for your skilled hand to bring it to life. Your
            mission is to gather these elements and weave them into a tapestry
            of functionality and beauty that will captivate users.
          </p>
          <Link
            className="transition-all ease-in-out hover:font-bold font-semibold hover:-translate-y-1 delay-15 duration-300 text-[#005b90] hover:animate-pulse"
            href="/components"
          >
            Check out our components
          </Link>
        </div>
      </RevealOnScroll>
    </div>
  </div>
);

export default LandingDescription;
