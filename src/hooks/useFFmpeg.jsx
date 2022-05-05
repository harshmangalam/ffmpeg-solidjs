import { createStore } from "solid-js/store";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

export default function useFFmpeg() {
  const [store, setStore] = createStore({
    progress: null,
    videoURL: null,
  });

  const ffmpeg = createFFmpeg({ progress: (e) => setStore("progress", e) });

  const transcode = async (file) => {
    const { name } = file;
    await ffmpeg.load();
    ffmpeg.FS("writeFile", name, await fetchFile(file));
    await ffmpeg.run("-i", name, "output.mp4");
    const data = ffmpeg.FS("readFile", "output.mp4");
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );

    setStore("videoURL", url);
    setStore("progress", null);
  };

  const handleFileChange = (e) => {
    transcode(e.target.files[0]);
  };
  return {
    store,
    handleFileChange,
  };
}
