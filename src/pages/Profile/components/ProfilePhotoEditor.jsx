import React, { useEffect, useRef, useState } from "react";

export default function ProfilePhotoEditor({ onSave, initialImage }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [preview, setPreview] = useState(initialImage || null);

  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());
  const profileImgRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialImage) {
      const img = imgRef.current;
      img.onload = () => {
        setImageLoaded(true);
        setOffset({ x: 0, y: 0 });
        setScale(1);
        setPreview(initialImage);
        draw();
      };
      img.src = initialImage;
    }
  }, [initialImage]);


  // Resize canvas dynamically
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = Math.min(
      canvas.parentElement.offsetWidth,
      window.innerHeight * 0.6
    );
    canvas.width = size;
    canvas.height = size;
    draw();
  };

  // Draw image on canvas
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.clip();

    if (imageLoaded) {
      const img = imgRef.current;
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const x = centerX - scaledWidth / 2 + offset.x;
      const y = centerY - scaledHeight / 2 + offset.y;
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

      const dataUrl = canvas.toDataURL("image/png");
      setPreview(dataUrl);
    }
    ctx.restore();
  };

  // Handle file upload
  // Handle file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = imgRef.current;
      img.onload = () => {
        setImageLoaded(true);
        setOffset({ x: 0, y: 0 });
        setScale(1);
        setPreview(event.target.result);
        draw();
        setModalOpen(true); // 👈 Open modal immediately
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };


  // Save and update profile picture
  // const handleSave = () => {
  //   if (!imageLoaded) return;
  //   const canvas = canvasRef.current;
  //   const dataUrl = canvas.toDataURL("image/png");
  //   profileImgRef.current.src = dataUrl;
  //   setPreview(dataUrl);
  //   onSave(dataUrl); // send cropped photo back to parent
  //   setModalOpen(false);
  // };

  function dataURLtoFile(dataUrl, filename) {
    let arr = dataUrl.split(","), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  const handleSave = () => {
    if (!imageLoaded) return;
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");

    // Convert Base64 → File
    const file = dataURLtoFile(dataUrl, "photo.png");

    // Send file back to parent
    onSave(file);

    profileImgRef.current.src = dataUrl;
    setPreview(dataUrl);
    onSave(dataUrl); // send cropped photo back to parent
    setModalOpen(false);
  };

  // Mouse drag events
  const handleMouseDown = (e) => {
    if (!imageLoaded) return;
    setDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseMove = (e) => {
    if (!dragging || !imageLoaded) return;
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setStartPos({ x: e.clientX, y: e.clientY });
    draw();
  };
  const handleMouseUp = () => setDragging(false);

  // Zoom with wheel
  const handleWheel = (e) => {
    if (!imageLoaded) return;
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((prev) => Math.max(0.1, prev * factor));
  };

  // Keep canvas responsive
  useEffect(() => {
    if (modalOpen) {
      setTimeout(resizeCanvas, 0);
    }
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [modalOpen]);

  // Redraw when state changes
  useEffect(() => {
    if (imageLoaded) draw();
  }, [offset, scale, imageLoaded]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-18 h-18 rounded-full mb-1">
        {/* Hidden input for file upload */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Profile image */}
        <img
          ref={profileImgRef}
          src={preview || "/media/avatars/default-profile.jpeg"}
          alt="Profile"
          className="w-full h-full border-2 border-green-500 rounded-full object-cover cursor-pointer shadow-sm"
          onClick={() => fileInputRef.current.click()}
        />

        {/* Pencil button */}
        <button
          onClick={() => setModalOpen(true)}
          className="absolute bottom-0 right-0 flex items-center justify-center w-5 h-5 bg-blue-400 rounded-full text-white text-xs shadow hover:bg-blue-500"
        >
          ✎
        </button>
      </div>



      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
          <div className="bg-neutral-800 rounded-2xl shadow-xl max-w-4xl w-full p-6">
            <div className="flex justify-between items-center border-b border-gray-600 pb-4 mb-6">
              <h1 className="text-xl font-semibold">Edit photo</h1>
              <button onClick={() => setModalOpen(false)}>✖</button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="w-full aspect-square relative flex items-center justify-center mb-6">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onWheel={handleWheel}
                    className="rounded-full absolute inset-0"
                  />
                  {!imageLoaded && (
                    <div className="text-center text-gray-400">
                      Load an image to start.
                    </div>
                  )}
                </div>

                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full max-w-sm"
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col">
                <p className="text-lg mb-4">
                  Show clients the best version of yourself!
                </p>
                <div className="flex gap-2 mb-6">
                  {[64, 40, 32].map((size, i) => (
                    <div
                      key={i}
                      className="rounded-full border-2 border-white overflow-hidden"
                      style={{ width: size, height: size }}
                    >
                      <img
                        src={
                          preview ||
                          `https://placehold.co/${size}x${size}/2e2e2e/e5e7eb?text=Preview`
                        }
                        alt="Preview"
                        className="rounded-full w-full h-full"
                      />
                    </div>
                  ))}
                </div>

                {/* Upload button inside modal (optional) */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-4"
                />

                <button
                  onClick={handleSave}
                  disabled={!imageLoaded}
                  className="bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-500"
                >
                  Save Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
