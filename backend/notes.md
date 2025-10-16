if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile, {
        resource_type: "image",
        transformation: [
          { width: 500, height: 500, crop: "limit" },
          { quality: "auto" },
        ],
      });






       const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData) 
        
        await newAppointment.save();


 // how it salt 
 //hasing use password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


           const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

onst token_decode = jwt.verify(admintoken, process.env.JWT_SECRET);

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile, {
        resource_type: "image",
        transformation: [
          { width: 500, height: 500, crop: "limit" },
          { quality: "auto" },
        ],
      });

      const imageURL = imageUpload.secure_url;           2


?? what is middle ware




cloudinar mongodb becrypt validator jwt razorpay
cloudinary  transformation: [
          { width: 500, height: 500, crop: "limit" },
          { quality: "auto" },
        ],



import multer from 'multer';

const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null,file.originalname)
    }
})

const upload = multer({storage})

export default upload        