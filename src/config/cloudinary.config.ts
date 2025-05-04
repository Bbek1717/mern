import { v2 as cloudinary } from 'cloudinary';

   // Configuration
   cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:  process.env.CLOUDINARY_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});
export const deleteImages = async (publicIDs: string[]) => {
    publicIDs.forEach(async (public_id) => {
        await cloudinary.uploader.destroy(public_id)
    })
}

export {cloudinary}