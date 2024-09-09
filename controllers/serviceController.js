import Service from '../models/service.js'

//Get all documents from Service
export async function getService (req, res){
    const service = await Service.find()
    res.json(service)
}

//Post Create a document in the collection Service
export async function postService (req, res){
    const body = req.body //Get the body send from postman or a form
    let msg = 'Service inserted succesful'
    try {
        const service = new Service(body)//create the object Service in RAM
        await service.save()//insert object at the collection 
    } catch (error) {
        msg = error
    }
    res.json({msg:msg})
}

export async function putService (req,res){
    const {_id, nameService, price} = req.body //Destructuring
    let msg = 'Service update succesful'
    try {
        await Service.findByIdAndUpdate({_id:_id},{nameService:nameService, price:price})
    } catch (error) {
        msg = error
    }
    res.json({msg:msg})
}

export async function deleteService (req,res){
    const _id = req.params.id //Get param _id
    try {
        await Service.findByIdAndDelete({_id:_id})
        res.json('Service deleted succesfully')
    } catch (error) {
        res.status(500).json(error,{msg:'There was a problem deleting the service'})
    }
}
