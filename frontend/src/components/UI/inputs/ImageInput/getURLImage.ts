// don't work
const getURLImage = async (file: File): Promise<string> => {
    const reader: FileReader = new FileReader();
    let URL: string = "";
    await reader.readAsDataURL(file);
    reader.addEventListener("loadend", () => {
        URL = reader.result;
        console.log(URL);
    });

    return URL;
};

export default getURLImage;
