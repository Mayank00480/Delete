import Questions from '../models/Questions.js'
export const AskQuestion = async(req,res) => {
const postQuestionData =req.body;
const postQuestion = new Questions(postQuestionData)
try{
    await postQuestion.save()
    res.status(200).json("Question Posted Successfully")
}
catch(error)
{
    console.log(error)
    res.status(409).json("Couldn't Post a Question")
}
}
export const getAllQuestions = async(req,res) =>{
    try {
        const questionList = await Questions.find()
        
        res.status(200).json(questionList)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}
export const deleteQuestion = async(req, res) =>{
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        console.log(_id)
        return res.status(501).send('Question Unavaiable')
    }
    try {
        await Questions.findByIdAndRemove( _id );
        res.status(200).json({message : "Successfully Deleted ..."})
    } catch (error) {
        console.log(error);
        res.status(509).json({message : error.message})
    }
}