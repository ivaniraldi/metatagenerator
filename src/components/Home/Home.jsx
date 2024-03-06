import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import cardImg from "../../assets/img/card.png";
import axios from "axios";
import Swal from "sweetalert2";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

export default function Home() {
  const [titleLength, setTitleLength] = useState(0);
  const [descLength, setDescLength] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [url, setUrl] = useState("https://metatagenerator.vercel.app");
  const [titlePrev, setTitlePrev] = useState(
    "MetataGenerator || Tu generador de metaetiquetas de confianza!"
  );
  const [previewDesc, setPreviewDesc] = useState(
    "Con las Metaetiquetas, puedes editar y experimentar con tu contenido, luego previsualizar cómo se verá tu página web en Google, Facebook, Twitter y ¡mucho más!"
  );
  const [fetchResponse, setFetchResponse] = useState(null);

  let form = [
    `<!-- Primary Meta Tags -->`,
    `<meta name="title" content="${title}" />`,
    `<meta name="description" content="${desc}" />`,
    ``,
    `<!-- Open Graph / Facebook -->`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${desc}" />`,
    `<meta property="og:image" content="URL-DE-TU-IMAGEN" />`,
    ``,
    `<!-- Twitter -->`,
    `<meta property="twitter:card" content="summary_large_image" />`,
    `<meta property="twitter:url" content="${url}" />`,
    `<meta property="twitter:title" content="${title}" />`,
    `<meta property="twitter:description" content="${desc}" />`,
    `<meta property="twitter:image" content="URL-DE-TU-IMAGEN" />`,
  ];

  let imgUrl =
    selectedImage != null ? URL.createObjectURL(selectedImage) : cardImg;

  const handleToggleCard = () => {
    setShowCard(!showCard);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let newMeta = {
      title: title,
      description: desc,
      images: [imgUrl],
    };
    setUrl("https://metatagenerator.vercel.app");
    setFetchResponse(newMeta);
    setShowCard(!showCard);
  };

  const handleFetch = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          url: url,
          api_key: apiKey,
        },
      });

      console.log(response.data); // Process the Axios response
      setFetchResponse(response.data); // Save the fetch response to state
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleTitleChange = (event) => {
    setTitleLength(event.target.value.length);
    setTitlePrev(event.target.value);
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const handleDescChange = (event) => {
    setDescLength(event.target.value.length);
    setPreviewDesc(event.target.value);
    setDesc(event.target.value);
  };
  const handleCopyToClipboard = () => {
    const formString = form.join("\n");

    // Copy to clipboard
    navigator.clipboard
      .writeText(formString)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Copiado al portapapeles!",
          showConfirmButton: false,
          timer: 1000,
        });
        console.log("Text successfully copied to clipboard");
        // You can also provide user feedback here if needed
      })
      .catch((err) => {
        console.error("Unable to copy to clipboard", err);
        // Handle the error, such as displaying an error message to the user
      });
  };

  return (
    <>
      <NavBar />
      <h1 className="text-center font-bold text-3xl">Meta Tags Generator</h1>
      <h2 className="text-center text-xl mt-4">Visualiza, edita y genera.</h2>
      <form
        className="mt-4 flex justify-center p-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleFetch();
        }}
      >
        <input
          placeholder="https://app.com"
          className="border border-gray-300 p-2 rounded-lg"
          type="url"
          name="url"
          id="urlInput"
          onChange={handleUrlChange}
        />
        <button
          id="urlButton"
          className="border p-2 rounded-lg ml-3 text-center font-semibold text-cyan-700 border-cyan-700 w-24"
        >
          Generar
        </button>
      </form>

      <section id="results" className="flex flex-col md:flex-row w-full">
        <div id="metadata" className="p-5 mt-3 md:w-3/5 ml-0 md:ml-24">
          <div className="box  ">
            <h2 className="font-semibold text-sm">METADATA</h2>

            <form className="mt-6 w-full md:w-3/4 " action="">
              <div className="flex text-gray-400 justify-between text-sm mt-4 mb-2">
                <span>Imagen</span>
                <span>Recomendado 1200x628</span>
              </div>

              {selectedImage ? (
                <div
                  onClick={() => setSelectedImage(null)}
                  className="flex items-center justify-center w-full mb-6"
                >
                  <label
                    style={{
                      backgroundImage: `url(${URL.createObjectURL(
                        selectedImage
                      )})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="flex flex-col items-center justify-center w-full h-48 border rounded-lg cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-300 dark:text-gray-200"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-300 dark:text-gray-200">
                        <span className="font-semibold">Click para subir</span>{" "}
                        o arrastra un archivo
                      </p>
                      <p className="text-xs text-gray-300 dark:text-gray-200">
                        SVG, PNG o JPG (Max 200mb)
                      </p>
                    </div>
                    <input
                      onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                      }}
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full mb-6">
                  <label className="flex flex-col items-center justify-center w-full h-48 border rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-cyan-800 hover:bg-gray-100 dark:hover:border-cyan-900 dark:hover:bg-cyan-900">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-300">
                        <span className="font-semibold">Click para subir</span>{" "}
                        o arrastra un archivo
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">
                        SVG, PNG o JPG (Max 200mb)
                      </p>
                    </div>
                    <input
                      onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                      }}
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              <div className="flex text-gray-400 justify-between mb-1 text-sm">
                <span>Titulo</span>
                <span>{titleLength}</span>
              </div>
              <textarea
                id="title"
                type="text"
                className="h-16 p-2 rounded-md border w-full"
                onChange={handleTitleChange}
              />
              <div className="flex text-gray-400 justify-between mb-1 mt-4 text-sm">
                <span>Descripcion</span>
                <span>{descLength}</span>
              </div>
              <textarea
                id="desc"
                type="text"
                className="h-16 p-2 rounded-md border w-full"
                onChange={handleDescChange}
              />
              <button
                onClick={handleSubmit}
                className="w-full p-2 mt-3 bg-cyan-700 text-white font-bold rounded-md"
              >
                {"</> Codear"}
              </button>
            </form>
            {showCard ? (
              <div className="w-full cursor-pointer md:w-3/4 p-4 border mt-4 rounded-md">
                <div>
                  <h2
                    onClick={handleCopyToClipboard}
                    className="cursor-pointer text-center font-medium text-lg my-3 underline"
                  >
                    Click para copiar
                  </h2>
                  <p
                    onClick={handleCopyToClipboard}
                    className="cursor-pointer text-center text-xs p2 rounded-md border border-red-500 my-2 bg-red-100"
                  >
                    <strong>CUIDADO:</strong> Deberas cambiar las{" "}
                    <strong>imagenes</strong> y/o <strong>URL</strong>.
                  </p>
                  <div
                    onClick={handleCopyToClipboard}
                    className="cursor-pointer border rounded-md p-2 text-xs"
                  >
                    <p>
                      {form.map((item, index) => (
                        <span className="block" key={index}>
                          {item}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="flex justify-center my-4">
                    <button
                      onClick={handleToggleCard}
                      className=" p-2 w-10 rounded-md text-center border hover:border-red-600 hover:bg-red-700 border-red-500 font-extrabold bg-red-600 text-white"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div id="previews" className="pt-5 w-full mt-3 px-10">
          <div>
            <h2 className=" font-semibold text-sm">PREVISUALIZACION</h2>
            <div className="w-full md:w-4/5">
              {" "}
              <h5 className="text-gray-400 font-medium mt-12 mb-2">Google</h5>
              <div className="w-full">
                <p className=" text-blue-700 text-lg font-medium mb">
                  {fetchResponse?.title != null
                    ? fetchResponse.title
                    : titlePrev}
                </p>
                <p className="text-sm underline text-green-700">
                  {url}
                  <span className="font-md font-bold">▾</span>
                </p>
                <p className="text-gray-600 text-sm">
                  {fetchResponse?.description != null
                    ? fetchResponse.description
                    : previewDesc}
                </p>
              </div>
            </div>
            <div>
              {" "}
              <h5 className="text-gray-400 font-medium mt-6 mb-4 ">Twitter</h5>
              <div
                style={{
                  borderRadius: "12px 12px 12px 12px",
                  minHeight: "350px",
                }}
                className="transition ease-in-out hover:bg-slate-100 border w-full md:w-3/5"
              >
                <img
                  src={
                    fetchResponse?.images[0] != null
                      ? fetchResponse.images[0]
                      : imgUrl
                  }
                  style={{
                    borderRadius: "0",
                    height: "270px",
                    objectFit: "cover",
                  }}
                  className=" w-full"
                ></img>
                <div className="cardTwitter flex flex-col justify-between">
                  <div className="p-3">
                    <h3 className="font-bold text-sm mb-1">
                      {fetchResponse?.title != null
                        ? fetchResponse.title
                        : titlePrev}
                    </h3>
                    <p className="text-gray-600 text-sm overflow-hidden h-10 text-ellipsis">
                      {fetchResponse?.description != null
                        ? fetchResponse.description
                        : previewDesc}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {url.replace("https://", "")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {" "}
              <h5 className="text-gray-400 font-medium mt-6 mb-4">Facebook</h5>
              <div
                style={{ borderRadius: "0", minHeight: "340px" }}
                className="transition ease-in-out hover:bg-slate-100 bg-gray-200 border w-full md:w-7/12"
              >
                <img
                  src={
                    fetchResponse?.images[0] != null
                      ? fetchResponse.images[0]
                      : imgUrl
                  }
                  style={{
                    borderRadius: "0",
                    height: "270px",
                    objectFit: "cover",
                    backgroundColor: "white",
                  }}
                  className=" w-full"
                ></img>
                <div className="cardTwitter flex flex-col justify-between">
                  <div className="p-2">
                    <p className="text-gray-600 text-xs">
                      {url.replace("https://", "").toUpperCase()}
                    </p>
                    <h3 className="font-bold mb-1">
                      {fetchResponse?.title != null
                        ? fetchResponse.title
                        : titlePrev}
                    </h3>
                    <p className="text-gray-600 text-sm overflow-hidden h-5 text-ellipsis">
                      {fetchResponse?.description != null
                        ? fetchResponse.description
                        : previewDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {" "}
              <h5 className="text-gray-400 font-medium mt-6 mb-4">LinkedIn</h5>
              <div
                style={{ borderRadius: "0", minHeight: "320px" }}
                className="transition ease-in-out hover:bg-slate-100 bg-gray-200 border w-full md:w-4/6"
              >
                <img
                  src={
                    fetchResponse?.images[0] != null
                      ? fetchResponse.images[0]
                      : imgUrl
                  }
                  style={{
                    borderRadius: "0",
                    height: "270px",
                    objectFit: "cover",
                    backgroundColor: "white",
                  }}
                  className=" w-full"
                ></img>
                <div className="cardTwitter flex flex-col justify-between">
                  <div className="p-2">
                    <h3 className="font-bold text-sm mb-1">
                      {fetchResponse?.title != null
                        ? fetchResponse.title
                        : titlePrev}
                    </h3>
                    <p className="text-gray-600 text-xs">
                      {url.replace("https://", "")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
