// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImage } from '@fortawesome/free-solid-svg-icons';

// const ImageUpload = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageChange = (event) => {
//     const image = event.target.files[0];
//     setSelectedImage(URL.createObjectURL(image));
//     // setSelectedImage(null);
//   };

//   return (
//     <div>
//       <div className="Member-Upload__Img">
//         <FontAwesomeIcon className="Member__Img-icon" icon={faImage} />
//         {selectedImage && (
//           <img
//             className="Member-Uploaded-Img"
//             src={selectedImage}
//             alt="Uploaded"
//           />
//         )}
//       </div>
//       <input
//         className="Member-Upload__Img__icon"
//         type="file"
//         onChange={handleImageChange}
//       />
//     </div>
//   );
// };

// export default ImageUpload;
