import logo from "../../assets/img/logo.png";

export default function NavBar() {
  return (
    <>
      <nav className="p-8 font-bold flex justify-between align-middle">
        <a className="text-xl" href="/">
          <span>
            <img
              className="w-12 mr-2 rounded-lg inline"
              src={logo}
              alt="logo"
            />
          </span>
          metaGenerator
        </a>
        <a href="https://iraldidev.vercel.app" target="_blank">
          About
        </a>
      </nav>
    </>
  );
}
