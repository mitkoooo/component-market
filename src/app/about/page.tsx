export default function Page(): React.JSX.Element {
  return (
    <div className="my-16 mx-12 sm:mx-24 md:mx-48">
      <h1 className="font-semibold my-3">About the author</h1>
      <p className="mb-3">
        My name is Vadim Mitko, I am a student in University of York currently
        pursuing a Bachelor&apos;s degree of Engineering in Computer Science.
      </p>
      <p className="mb-3">
        In autumn of 2023, I found a new born passion for web development and
        since then I have been learning and utilising new tools in the world of
        Javascript, CSS and HTML.
      </p>
      <div className="mt-20">
        <h2 className="font-semibold my-3">About the website</h2>
        <p>
          This website is dedicated to the standalone components I have created
          over my career as a web developer. Component market is written in
          Typescript, using Supabase for back-end and Vercel for hosting, and
          created using Next-js framework.
        </p>
      </div>
    </div>
  );
}
