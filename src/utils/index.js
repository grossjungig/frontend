export const generateBase64FromImage = imageFile => {
  const reader = new FileReader();
  const promise = new Promise((resolve, reject) => {
    reader.onload = e => resolve(e.target.result);
    reader.onerror = err => reject(err);
  });

  reader.readAsDataURL(imageFile);
  return promise;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const berlinDistricts = [
  "Charlottenburg-Wilmersdorf",
  "Friedrichshain-Kreuzberg",
  "Lichtenberg",
  "Marzahn-Hellersdorf",
  "Mitte",
  "Neukölln",
  "Pankow",
  "Reinickendorf",
  "Spandau",
  "Steglitz-Zehlendorf",
  "Tempelhof-Schöneberg",
  "Treptow-Köpenick"
];