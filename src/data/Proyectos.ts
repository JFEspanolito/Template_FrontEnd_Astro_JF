const imgPortadas = import.meta.glob<{ default: ImageMetadata }>("/src/assets/Portadas/*.{jpeg,jpg,png,gif,webp}", { eager: true });

export const proyectos = [
  {
    nombre: "Project Name",
    url: null,
    pageID: "ProjectName",
    imgfolder: "/src/assets/Projects/p1",
    imgBgPos: "background-size: 100%; background-position: 50% 50%;",
    imgbanner: imgPortadas["/src/assets/Portadas/Portada.webp"]?.default,

    /* Info Translate */
    ES: {
      descripcion: "Descripción en español.",
      title: "PlaceHolder",
      props: ["PlaceHolder"],
    },
    EN: {
      descripcion: "English Description",
      title: "PlaceHolder",
      props: ["PlaceHolder"],
    },
  },
];
