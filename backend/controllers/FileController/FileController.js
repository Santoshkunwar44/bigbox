const FileModel = require("../../models/FileModel/FileModel")
const RoomModel = require("../../models/RoomModel/RoomModel")






class FileControllers{


    // add room 
        async createFile(req,res,next){
        try {

            let newFile  =    await FileModel.create(req.body)
            await RoomModel.findByIdAndUpdate(req.body.room,{$set:{}})
            
            newFile =  await newFile.populate(["user","room"]);
            return res.status(200).json({message:newFile,success:true});


        } catch (error) {
            next(error)
        }
        }

        async getFile(req,res,next){

        const query = req.query;

        console.log(query)
        

        try {
            const files = await FileModel.find({...query}).populate(["user","room"]);
            return res.status(200).json({message:files,success:true})
        } catch (error) {
            next(error)
        }
        }


        // update room 

        async updateFile(req,res,next){

        const {id} = req.params;

        

        try {
            let  updatedFile = await FileModel.findByIdAndUpdate(id,
                {
                   $set:req.body 
                },
                {
                    new:true,
                    returnOriginal:false,
                    returnDocument:true
                });
            return res.status(200).json({message:updatedFile,success:true})
        } catch (error) {
            next(error)
        }
       }

        // delete room 
         async deleteFile(req,res,next){

        const {id} = req.params;

        try {
            await FileModel.deleteOne({_id:id})
            return res.status(200).json({message:"successfully deleted",success:true})
        } catch (error) {
            next(error)
        }
    }

}
module.exports= new FileControllers()