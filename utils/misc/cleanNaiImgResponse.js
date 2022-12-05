export default function cleanNaiImgResponse(img) {
  const img2 = img.split("id: 1")[1];
  const img3 = img2.replace("data:", "");
  const img4 = img3.replace(" ", "");
  const img5 = img4.replace("\n", "");
  return img5;
}
