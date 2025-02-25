import User from '../models/User.js'

export const Preferences = async( req , res ) => {
    try {
        const {id} = req.params ;
        const {preferences} = req.body ;
        console.log(preferences);
        
        const user = await User.findById(id)
        console.log(user);

        user.preferences = [...preferences]
        await user.save()

        res.status(200).json({
            message : "Preferences save successfully"
        })
        
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
        
    }

}