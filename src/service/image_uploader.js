class ImageUploader {
  async upload(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "shortTIL");
    const result = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });
    return await result.json();
  }
}

export default ImageUploader;
