import Swal from "sweetalert2"
import logo from "../../assets/img/logo.png"
export default function Footer() {
   const handleInfo = ()=>{
    Swal.fire({
        title: "Esta página fue echa a modo de proyecto usando de referencia otras fuentes.",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          left top
          no-repeat
        `
      });
   }
  return (
    <>
    <footer className="p-8 mb-40 mt-10">
        <div className="">
            <table className="">
                <tbody>

                <tr>
                    <td className="p-2 font-bold text-lg">
                    <h2><a className="text-xl" href="#"><span><img className="w-12 mr-2 rounded-lg inline" src={logo} alt="logo" /></span>metaGenerator</a></h2>
                    </td>
                    <td className="p-4 font-medium">
                        <p>Links</p>
                    </td>
                </tr>
                <tr>
                    <td className="p-2">
                        <p>Ivan Iraldi - 2023 | <span className=" text-cyan-700 underline cursor-pointer" onClick={handleInfo}>Politicas de privacidad</span> | <a className=" text-cyan-700 underline" href="https://iraldidev.vercel.app/#contact" target="_blank">Contacto</a> </p>
                    </td>
                    <td className="p-4">
                        <p className="cursor-pointer text-cyan-700 underline" onClick={handleInfo}>Info</p>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </footer>
    </>
  )
}
